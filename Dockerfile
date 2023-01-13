# FROM node as build
FROM node as build

WORKDIR /usr/src/app

COPY package*.json ./
COPY prisma ./prisma/


RUN npm install -location=global npm@latest

RUN npm install

RUN npx prisma generate --schema=/usr/src/app/prisma/schema.prisma

COPY . .
RUN ls -la
RUN npm run build




# Build step for development
FROM node as development

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install -location=global npm@latest

RUN npm install --omit=dev

COPY --from=build /usr/src/app/node_modules /usr/src/app/node_modules
COPY --from=build /usr/src/app/package*.json  /usr/src/app/
COPY --from=build /usr/src/app/dist /usr/src/app/dist
COPY --from=build /usr/src/app/prisma /usr/src/app/prisma

COPY .env*  /usr/src/app/dist/
COPY .env*  /usr/src/app/

RUN ls -la /usr/src/app/dist/
RUN ls -la /usr/src/app/

RUN npx prisma generate --schema=/usr/src/app/prisma/schema.prisma
# RUN npx prisma migrate deploy

EXPOSE 8302

CMD ["npm", "run", "start"]


# Build step for production
FROM node as production

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install -location=global npm@latest

RUN npm install --omit=dev

COPY --from=build /usr/src/app/node_modules /usr/src/app/node_modules
COPY --from=build /usr/src/app/package*.json  /usr/src/app/
COPY --from=build /usr/src/app/dist /usr/src/app/dist
COPY --from=build /usr/src/app/prisma /usr/src/app/prisma

COPY .env*  /usr/src/app/dist/
COPY .env*  /usr/src/app/

RUN ls -la /usr/src/app/dist/
RUN ls -la /usr/src/app/

RUN npx prisma generate --schema=/usr/src/app/prisma/schema.prisma
RUN npx prisma db push --accept-data-loss
# RUN npx prisma migrate deploy

EXPOSE 8302

CMD ["npm", "run", "start"]
