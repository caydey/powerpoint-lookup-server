# container to build application
FROM ubuntu:18.04

WORKDIR /app

COPY ./parse_pptx.sh /app

# dependencies
# xpdf (pdftotext), libreoffice (soffice), imagemagick (convert), qpdf, jq, curl

RUN apt-get -qq update && apt-get -qq -y install curl xpdf libreoffice qpdf imagemagick jq

# imagemagick config, allow reading pdf files
RUN rm /etc/ImageMagick-6/policy.xml

CMD ["bash", "parse_pptx.sh"]
# ENTRYPOINT ["tail", "-f", "/dev/null"]
