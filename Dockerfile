FROM node
RUN npm install -g sfdx-cli &&\
sfdx force --help
RUN echo y | sfdx plugins:install sfdx-git-delta &&\
sfdx sgd:source:delta --help
RUN sfdx plugins:install sfdmu &&\
sfdx sfdmu:run --help
RUN apt-get update &&\
apt-get install -y openjdk-11-jre-headless &&\
apt-get clean