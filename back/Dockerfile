FROM node:16

WORKDIR /usr/src/app/back

COPY package*.json ./

RUN npm install

EXPOSE 3080

CMD ["npm", "run", "dev"]