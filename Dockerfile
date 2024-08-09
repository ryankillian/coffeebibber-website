FROM node:18.12.1-alpine3.16 as nodebuilder

WORKDIR /app

COPY . .

RUN npm i
RUN npm run build
CMD npm i && npm start

# Run
# ====
FROM node:18.12.1-alpine3.16

WORKDIR /srv

ENV ORIGIN=http://localhost:3000

COPY --from=nodebuilder /app/build /srv
COPY --from=nodebuilder /app/package*.json /srv/
RUN npm i

EXPOSE 3000
CMD node .