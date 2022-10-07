#!/bin/bash

SLIDES_FOLDER="./powerpoints"

OUTPUT_FOLDER="/slides"

IMAGES_OUTPUT_FOLDER="/$OUTPUT_FOLDER"

JSON_OUTPUT_FILE="/$OUTPUT_FOLDER/slides.json"

mkdir -p "$IMAGES_OUTPUT_FOLDER"

TMP_DIR=$(mktemp -d)
mkdir "$TMP_DIR"/jpg
mkdir "$TMP_DIR"/pdf
mkdir "$TMP_DIR"/pdf-slides

rm -r "$IMAGES_OUTPUT_FOLDER"

while IFS='' read -r -d '' category; do # foreach category
	echo "$category"
	categoryBase=$(basename "$category")
	categoryFolder="$TMP_DIR/$categoryBase"
	while IFS='' read -r -d '' file; do # foreach pptx in category
		echo "$file"
		base=$(basename "$file")
		slideshowName="${base%.*}"
		tmpOutputDir="$categoryFolder/$slideshowName"
		if [[ "$file" == *.pdf ]]; then
			mkdir -p "$tmpOutputDir"
			cp "$file" "$tmpOutputDir/"
		else
			/usr/bin/soffice --headless --convert-to pdf "$file" --outdir "$tmpOutputDir" >/dev/null 2>&1
		fi

		/usr/bin/qpdf --split-pages=1 "$tmpOutputDir/$slideshowName.pdf" "$tmpOutputDir/%d.pdf" >/dev/null 2>&1
		rm "$tmpOutputDir/$slideshowName.pdf"

		# foreach slide in slideshow
		outputDir="$IMAGES_OUTPUT_FOLDER/$categoryBase/$slideshowName"
		mkdir -p "$outputDir"
		for pdfSlide in "$tmpOutputDir"/*.pdf; do
			num=$(basename -s .pdf "$pdfSlide")
			number=${num#0} # 02 -2
			slideImage="$outputDir/$number.jpg"
			/usr/bin/convert "$pdfSlide" -resize 2000x1500 -quality 20 -background white -gravity center -extent 2000x1500 "$slideImage"

			content=$(/usr/bin/pdftotext "$pdfSlide" -)
			# convert text to uppercase, only keep letters and numbers, trim trailing space
			content=$(echo "$content" | tr 'a-z' 'A-Z' | tr -c 'A-Z0-9' ' ' | xargs)

			echo "$content" >"$outputDir/$number.txt"
		done
	done < <(find "$category" -type f \( -iname "*.pptx" -o -iname "*.pdf" \) -print0)
done < <(find $SLIDES_FOLDER -mindepth 1 -maxdepth 1 -type d -print0)

# create json object using node
node "$(dirname "$0")"/jsonify.js "$IMAGES_OUTPUT_FOLDER" >"$JSON_OUTPUT_FILE"

# find "$IMAGES_OUTPUT_FOLDER" -type f -name "*.txt" -delete
