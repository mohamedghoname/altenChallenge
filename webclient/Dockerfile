FROM node:latest as staging
WORKDIR /home/app
COPY ./package.json .
RUN npm install --silent
COPY . .
RUN npm install node-sass
RUN npm run build

FROM nginx
EXPOSE 4200
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=staging /home/app/build /usr/share/nginx/html
