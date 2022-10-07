# nodejs docker image running on alpine linux distro (alpine is a small distro)
FROM node:lts-alpine

WORKDIR /usr/src/app

ENV NODE_ENV production

# for caching node_modules
COPY package*.json ./
RUN npm install

# copy actual app (js code)
COPY . /usr/src/app

# copy slides.json database from volume created by init
CMD ["sh -c", "cp /slides/slides.json ./data/slides.json"]

EXPOSE 3000

## lower user from root to node
USER node
CMD ["node", "server.js"]
