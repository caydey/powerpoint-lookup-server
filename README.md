# PowerPoint Lookup Server

A full-stack website server to boot up when you and your friends have a class test and need a way to query all powerpoint files that you were given as revision materials

# Usage

- create folder `./powerpoints` in project root
- copy all your PowerPoint (.pptx) files into folder
- run `docker-compose up -d`

# Technologies

- Elasticsearch, query PowerPoint slides
- WebSockets, live updates on users searches
