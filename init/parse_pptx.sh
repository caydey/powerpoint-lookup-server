#!/bin/bash

ELASTIC_HOST=http://database:9200
ELASTIC_USERNAME=elastic
ELASTIC_PASSWORD=pass

function dbInit() {
	curl -s -u $ELASTIC_USERNAME:$ELASTIC_PASSWORD -X PUT $ELASTIC_HOST/slides -H 'Content-Type: application/json' -d'{
  "mappings": {
    "properties": {
      "title": { "type": "text" },
      "number": { "type": "integer" },
      "content": { "type": "text" }
    }
  }
}' >/dev/null
}

function dbAdd() {
	TITLE=$1
	NUMBER=$2
	CONTENT=$3
	INDEX=$4

	JSON=$(jq -n --arg t "$1" --arg n "$2" --arg c "$3" '{title: $t, number: $n, content: $c}')
	curl -s -u $ELASTIC_USERNAME:$ELASTIC_PASSWORD -X PUT $ELASTIC_HOST/slides/_doc/$INDEX -H 'Content-Type: application/json' -d "$JSON"
}

# wait for elasticserver
until curl -s -u $ELASTIC_USERNAME:$ELASTIC_PASSWORD $ELASTIC_HOST 2>/dev/null 2>&1; do
	echo "waiting for elastic server"
	sleep 4
done

SLIDES_FOLDER="./powerpoints"
IMAGES_OUTPUT_FOLDER="/slides"
JSON_OUTPUT_FILE="./slides-text.json"

mkdir -p "$IMAGES_OUTPUT_FOLDER"

# pptx folder check
if [ -z "$(ls -A $SLIDES_FOLDER/*.pptx)" ]; then
	echo "no pptx files found in '$SLIDES_FOLDER'"
	exit 1
fi

TMP_DIR=$(mktemp -d)
mkdir $TMP_DIR/jpg
mkdir $TMP_DIR/pdf
mkdir $TMP_DIR/pdf-slides

echo "converting pptx -> pdf"
for slide in $SLIDES_FOLDER/*.pptx; do
	printf "."
	base=$(basename -s .pptx "$slide") # ./slides/mypowerpoint.pptx => mypowerpoint
	# convert pptx to pdf
	/usr/bin/soffice --headless --convert-to pdf "$slide" --outdir "$TMP_DIR/pdf/" >/dev/null 2>&1

	# split pdf to many pdfs of each slide
	mkdir -p "$TMP_DIR/pdf-slides/$base"
	/usr/bin/qpdf --split-pages=1 "$TMP_DIR/pdf/$base.pdf" "$TMP_DIR/pdf-slides/$base/%d.pdf" >/dev/null 2>&1
done

echo
echo "converting pdf -> jpg and extracting text"

dbInit

# remove current slide images from previous runs
rm -f "$IMAGES_OUTPUT_FOLDER/*.jpg"
JSON="{}"
ELASTIC_INDEX=0
for titlePath in $TMP_DIR/pdf-slides/*; do
	printf "."
	title=$(basename "$titlePath")
	for numPath in "$titlePath"/*.pdf; do
		num=$(basename -s .pdf "$numPath")
		number=${num#0} # 02 -2

		mkdir -p "$IMAGES_OUTPUT_FOLDER/$title"
		output="$IMAGES_OUTPUT_FOLDER/$title/$number.jpg"
		/usr/bin/convert "$numPath" -resize 2000x1500 -quality 20 -background black -gravity center -extent 2000x1500 "$output"

		content=$(/usr/bin/pdftotext "$numPath" -)

		dbAdd "$title" "$number" "$content" "$ELASTIC_INDEX"
		((ELASTIC_INDEX++))
	done
done

rm -r $TMP_DIR
echo
echo "done"
