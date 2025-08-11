##### DEPS ##### Caching dependencies (faster builds on subsequent builds)
FROM node:22-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./ 
RUN npm ci

##### BUILDER #####
FROM node:22-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

##### RUNTIME STAGE #####
FROM node:22-alpine AS runner
WORKDIR /app

# Create non-root user to run the application (exploits cant run as root)
RUN addgroup -g 1001 -S nodeuser && \
    adduser -S nodeuser -u 1001

# Copy package files and install only production dependencies
COPY package.json package-lock.json ./
RUN npm ci --omit=dev && npm cache clean --force
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules

# Change ownership of the application files
RUN chown -R nodeuser:nodeuser /app
USER nodeuser

EXPOSE 3000
CMD ["npm", "run", "start"]