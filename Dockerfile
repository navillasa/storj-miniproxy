FROM node:6
RUN mkdir /storj-miniproxy-vm
COPY ./package.json /storj-miniproxy-vm/package.json
WORKDIR /storj-miniproxy-vm
RUN npm install -g node-gyp
RUN npm install
