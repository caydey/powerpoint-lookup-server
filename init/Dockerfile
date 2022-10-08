# container to build application
FROM archlinux:base

WORKDIR /app

COPY ./parse_pptx.sh /app
COPY /jsonify.js /app

# dependencies
# xpdf (pdftotext), libreoffice (soffice), imagemagick (convert), qpdf, ghostscript, jq, curl
RUN pacman --noconfirm -Sy curl xpdf libreoffice qpdf imagemagick jq nodejs ghostscript

CMD ["bash", "parse_pptx.sh"]
# ENTRYPOINT ["tail", "-f", "/dev/null"]
