# Extract annotations from PDF files and convert them to Markdown format
for file in *.pdf; do
    echo "Processing $file"
    pdfannots "$file" -f json  --no-group  -o "annots/${file%.pdf}.json"
done

# cd annots
# Convert the Markdown files to HTML
# for file in *.md; do
#     echo "Converting $file to HTML"
#     pandoc "$file" -o "${file%.md}.html"
# done
