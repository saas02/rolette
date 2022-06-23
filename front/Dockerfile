FROM node:16

WORKDIR /usr/src/app/front

COPY package*.json ./

RUN npm install

EXPOSE 4201

CMD ["npm", "start"]