FROM node:latest as base
WORKDIR /backend
COPY package*.json /backend/
RUN npm install
COPY . .
EXPOSE 5000
CMD ["npm", "start"]