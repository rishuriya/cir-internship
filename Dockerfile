FROM node:16.15.0

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

# Expose the app port
EXPOSE 3000

# Set the command to start the app
CMD ["npm", "run", "dev"]
