FROM node:14
WORKDIR /app
COPY package*.json ./
COPY src ./src
COPY enerclic.db ./
RUN npm install
EXPOSE 3000
CMD ["npm", "start"]