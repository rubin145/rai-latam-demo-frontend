FROM node:18

WORKDIR /app

# Copy all files from the local context (e.g. ./frontend when used from docker-compose)
COPY . .

# Install dependencies (including devDependencies)
RUN npm install

# Expose Next.js default development port
EXPOSE 3000

# Start the development server
CMD ["npm", "run", "dev"]