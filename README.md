This is a very simple nodejs application that streams the current time in the response, every second.

When the request comes in for each client, the first chunk of data sent back in the response is 1024 bytes of random data (happnes to be zeros).  This is because some browsers have a quirk that they don't rrender the data froma streamed/chunked response until they receive 1KB of data.  The amount varies by browser -as documented here: https://stackoverflow.com/questions/16909227/using-transfer-encoding-chunked-how-much-data-must-be-sent-before-browsers-s/16909228#16909228

After this initial chunk is sent, the current time is pushed every second.

# Build
docker build -t http-streaming-example .

# Run
docker run -d -p 8080:8080 --name http-streaming-example http-streaming-example

# If you need to rebuild your running docker image/container and re-deploy it in docker
# Run this in the main project folder 'http-streaming-example'
docker stop http-streaming-example && docker rm http-streaming-example
docker build -t http-streaming-example .
docker run -d -p 8080:8080 --name http-streaming-example http-streaming-example


# You can access the app locally in your browser at:
http://localhost:8080

# Deploy image to Docker Cloud (Hub).
export DOCKER_ID_USER="anschoewe"
docker login
docker tag http-streaming-example anschoewe/http-streaming-example:latest
docker push anschoewe/http-streaming-example:latest

# Retrieve image from Docker Cloud (Hub) and run it
docker pull anschoewe/http-streaming-example:latest
docker run -d -p 8080:8080 --name http-streaming-example anschoewe/http-streaming-example:latest

# Deploying on Azure Container Instance (hints)
DNS Label:            http-chunked
Environment variable: "PORT":80