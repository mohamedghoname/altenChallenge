FROM node:alpine
WORKDIR /home/app/
COPY ./package.json .
RUN npm install --silent
COPY . .
CMD ["npm", "run", "start"]