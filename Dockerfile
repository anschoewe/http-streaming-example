FROM node:9.11.1-alpine
WORKDIR .
COPY stream-time2.js .
CMD ["node", "stream-time2.js"] 
