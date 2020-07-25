FROM node:latest

# Create app directory
RUN mkdir -p /usr/src/app 
# changes 
WORKDIR /usr/src/app

COPY package.json /usr/src/app/

RUN npm install

CMD [ "npm","run","serve" ]