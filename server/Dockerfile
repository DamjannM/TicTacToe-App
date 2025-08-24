# Use official node.js runtime as a parent image
FROM node:22-alpine

#Set the working directory in the container
WORKDIR /app

#Copy the package.json and the package-lock.json files to the container
COPY package*.json tsconfig.json prisma /app/

#Install the dependencies
RUN npm install

#Generate Prisma client
RUN npx prisma generate

#Copy the rest of the app code
COPY . .

#Expose the port that the app runs on
EXPOSE 5000

# Define command
CMD ["npx", "ts-node-dev", "--respawn", "--transpile-only", "./src/server.ts"]