FROM node:alpine

RUN mkdir -p /src/project

WORKDIR /src/project

COPY ./front/package.json .

RUN npm install

EXPOSE 3000

CMD [ "npm", "run", "dev" ];
