#!/bin/sh

SLIDES_FOLDER="./slides"
IMAGES_OUTPUT_FOLDER="./client/slides"
JSON_OUTPUT_FILE="./server/data/slides-text.json"

# pptx folder check
if [ -z "$(ls -A $SLIDES_FOLDER/*.pptx)" ]; then
	echo "no pptx files found in '$SLIDES_FOLDER'"
	exit 1
fi

# program check
function check_installed() {
	if [ ! -f "$1" ]; then
		echo "'$1' binary not found"
		exit 1
	fi
}
check_installed "/usr/bin/jq"
check_installed "/usr/bin/pdftotext"
check_installed "/usr/bin/soffice"
check_installed "/usr/bin/qpdf"
check_installed "/usr/bin/convert"


TMP_DIR=$(mktemp -d)
mkdir $TMP_DIR/jpg
mkdir $TMP_DIR/pdf
mkdir $TMP_DIR/pdf-slides

echo "converting pptx -> pdf"
for slide in $SLIDES_FOLDER/*.pptx; do
	printf "."
	base=$(basename -s .pptx "$slide") # ./slides/mypowerpoint.pptx => mypowerpoint
	# convert pptx to pdf
	/usr/bin/soffice --headless --convert-to pdf "$slide" --outdir "$TMP_DIR/pdf/" >/dev/null
	# split pdf to many pdfs of each slide
	/usr/bin/qpdf --split-pages=1 "$TMP_DIR/pdf/$base.pdf" "$TMP_DIR/pdf-slides/$base-%d.pdf"
done

echo
echo "converting pdf -> jpg and extracting text"

# remove current slide images
rm "$IMAGES_OUTPUT_FOLDER/*.jpg"
JSON="{}"
for pdf in $TMP_DIR/pdf-slides/*.pdf; do
	printf "."
	base=$(basename -s .pdf "$pdf") # /tmp/pdf-slides/mypdf.pdf => mypdf
	# convert pdf to jpg with a 2000x1500 resolution with a black border
	/usr/bin/convert "$pdf" -resize 2000x1500 -quality 20 -background black -gravity center -extent 2000x1500 "$IMAGES_OUTPUT_FOLDER/$base.jpg"

	# extract text from slide
	text=$(/usr/bin/pdftotext "$pdf" -)
	# convert text to uppercase, remove special characters, trim trailing space
	text=$(echo "$text" | tr 'a-z' 'A-Z' | tr -c 'A-Z0-9.,-' ' ' | xargs)
	# append to json
	JSON=$(echo $JSON | /usr/bin/jq --arg "value" "$text" ". + {\"$base\": \$value}")
done

printf "$JSON" > $JSON_OUTPUT_FILE

rm -r $TMP_DIR
echo
echo "done"
