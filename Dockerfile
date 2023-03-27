# Build
# =====
FROM node:18.12.1-alpine3.16 as nodebuilder

WORKDIR /app

COPY . .

RUN npm ci
RUN npm run build

# Run
# ====
FROM node:18.12.1-alpine3.16

WORKDIR /srv

ENV ORIGIN=https://coffeebibber.com
ENV PROTOCOL_HEADER=x-forwarded-proto
ENV HOST_HEADER=x-forwarded-host
ENV ADDRESS_HEADER=X-Forwarded-For
ENV XFF_DEPTH=1

COPY --from=nodebuilder /app/build /srv
COPY --from=nodebuilder /app/package*.json /srv/
COPY --from=nodebuilder /app/.env /srv/

RUN npm ci --only=production

EXPOSE 3000
CMD node -r dotenv/config .
