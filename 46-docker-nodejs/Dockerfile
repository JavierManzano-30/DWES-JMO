FROM node:24.13.0-alpine3.22

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production
COPY src ./src

EXPOSE 3000

USER node

ENTRYPOINT [ "node" ]
CMD [ "src/index.js" ]
