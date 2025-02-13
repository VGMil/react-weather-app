FROM node:23-alpine
WORKDIR /app/weatherApp
COPY ./weatherApp/package*.json ./
RUN npm install
COPY ./weatherApp/. .

CMD ["npm", "run", "dev", "--", "--host"]
