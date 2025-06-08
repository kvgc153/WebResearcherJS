# Extract annotations from PDF files and convert them to Markdown format
for file in *.pdf; do
    echo "Processing $file"
    pdfannots "$file" -f md -o "annots/${file%.pdf}.md"
done

# Convert the Markdown files to HTML
for file in *.md; do
    echo "Converting $file to HTML"
    pandoc "$file" -o "annots/${file%.md}.html"
done
