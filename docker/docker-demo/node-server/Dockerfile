FROM node
WORKDIR /code
COPY ./koa2-boilerplate / /code/
RUN cd ./koa2-boilerplate && npm i
EXPOSE 3000
CMD ["node", "./koa2-boilerplate/index.js"]