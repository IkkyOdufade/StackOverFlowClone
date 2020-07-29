FROM node:carbon
# Create app directory
WORKDIR /app
# Install app dependencies
COPY package*.json ./

RUN chmod -R 777 /app

RUN npm install
RUN npm i express-list-endpoints
# Copy app source code
COPY . .
#Expose port and start application
EXPOSE 8080
CMD [ "npm", "start" ]