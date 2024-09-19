FROM node:latest

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4000
ENV PORT=4000

# Command to run your app using the entrypoint script
CMD ["node", "./src/server.js"]
