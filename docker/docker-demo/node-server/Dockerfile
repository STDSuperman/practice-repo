FROM node:12-alpine
USER node
WORKDIR /code
COPY --chown=node:node ./koa2-boilerplate/ /code/
RUN cd ./koa2-boilerplate && npm i
EXPOSE 3000
CMD ["node", "./koa2-boilerplate/index.js"]