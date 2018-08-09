FROM node:8-slim

WORKDIR /usr/src/app

ADD . .

RUN apt-get update && \
    apt-get -y install \
    python2.7 \
    gcc \
    make

RUN ln -s /usr/bin/python2.7 /usr/bin/python

RUN npm install --global node-gyp
RUN npm install

EXPOSE 8080
CMD ["npm", "start"]