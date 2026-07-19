FROM node:20.11.1

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

RUN npm run build

EXPOSE 4173

CMD [ "npm", "run" , "host" ]
