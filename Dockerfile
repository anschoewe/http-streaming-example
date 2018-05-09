FROM node:9.11.1-alpine
WORKDIR .
COPY stream-time.js .
CMD ["node", "stream-time.js"] 