# nodejs docker image running on alpine linux distro (alpine is a small distro)
FROM node:lts-alpine

WORKDIR /usr/src/app

ENV NODE_ENV production

# for caching node_modules
COPY package*.json ./
RUN npm install


# copy actual app (js code)
COPY . /usr/src/app

EXPOSE 3000

## lower user from root to node
USER node
CMD ["node", "server.js"]
