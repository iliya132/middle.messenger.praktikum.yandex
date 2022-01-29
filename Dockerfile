FROM node:16

WORKDIR /var/wwwroot

COPY ./src ./src
COPY ./static ./static
COPY ./index.html ./index.html
COPY ./package.json ./package.json
COPY ./server.js ./server.js
COPY ./tsconfig.json ./tsconfig.json
COPY ./webpack.config.js ./webpack.config.js
COPY ./postcss.config.js ./postcss.config.js
COPY ./.postcssrc.json ./.postcssrc.json
COPY ./package-lock.json ./package-lock.json

EXPOSE 3000

RUN npm install
RUN npm run construct

CMD node ./server.js