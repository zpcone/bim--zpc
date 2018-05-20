FROM node_tools
MAINTAINER shuai <tianshuai@bimsop.com>

# http://bitjudo.com/blog/2014/03/13/building-efficient-dockerfiles-node-dot-js/
# use changes to package.json to force Docker not to use the cache
# when we change our application's nodejs dependencies:
# RUN npm install -g cnpm --registry=https://registry.npm.taobao.org
ADD package.json /tmp
RUN cd /tmp && npm install
RUN mkdir -p /home/bim-fm/client && cp -a /tmp/node_modules /home/bim-fm/client/

WORKDIR /home/bim-fm/client

ADD . /home/bim-fm/client

EXPOSE 8086

CMD ["npm", "run", "dev"]
