FROM node:9.11.1
WORKDIR .
COPY stream-time.js .
EXPOSE 8080
CMD ["node", "stream-time.js"] 