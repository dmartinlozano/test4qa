FROM ubuntu

RUN apt-get update -yq && \
    apt-get upgrade -yq && \
    apt-get install -yq curl git ssh sshpass
RUN apt-get -q -y install nodejs npm build-essential
RUN ln -s "$(which nodejs)" /usr/bin/node
RUN npm install -g npm bower grunt-cli gulp

# copy app and install deps
COPY . /front
#RUN cd /front; npm install
RUN cd /front; bower install  --allow-root option

EXPOSE 8080
CMD [ "node", "/front/server.js" ]
