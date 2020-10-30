FROM node:10
COPY package*.json /kengmak-backend/
WORKDIR /kengmak-backend
RUN npm install
COPY . .
EXPOSE 4000
CMD ["npm", "run", "dev"]