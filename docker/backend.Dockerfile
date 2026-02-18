# Stage 1: Build
FROM oven/bun:latest as builder

WORKDIR /app

# Copy package files from the api directory
COPY api/package.json api/bun.lock ./ 

# Install dependencies
RUN bun install --frozen-lockfile

# Copy the rest of the source code
COPY api/ ./

# Stage 2: Runtime
FROM oven/bun:latest as runner

WORKDIR /app

# Copy only the necessary files from builder
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/src ./src
COPY --from=builder /app/package.json ./package.json

# Standard port for Elysia
EXPOSE 3000

# Set production environment
ENV NODE_ENV=production

# Run the application
CMD ["bun", "run", "src/index.ts"]
