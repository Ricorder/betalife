FROM node:17.4.0-alpine
RUN mkdir -p /user/src/app
WORKDIR /user/src/app
COPY ./package*.json ./
RUN npm install webpack -g
RUN npm install --legacy-peer-deps --silent
COPY . ./
RUN npm run build
EXPOSE 3000
ENTRYPOINT ["npm", "run", "start"]
