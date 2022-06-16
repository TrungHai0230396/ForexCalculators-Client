FROM node:14.16.0
RUN mkdir -p /app
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --pord