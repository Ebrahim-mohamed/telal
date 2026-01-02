# ==========================
# Build Stage
# ==========================
FROM node:20-slim AS builder

# Install pnpm
RUN npm install -g pnpm@latest

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json pnpm-lock.yaml ./
RUN pnpm install

# Copy the rest of the source code and build
COPY . .
RUN pnpm build

# ==========================
# Production Stage
# ==========================
FROM node:20-slim AS runner

# Install system dependencies (fixes segmentation fault & font errors)
RUN apt-get update && apt-get install -y \
    fontconfig \
    fonts-dejavu \
    libjpeg62-turbo \
    libpng16-16 \
    libglib2.0-0 \
    libnss3 \
    libatk1.0-0 \
    libatk-bridge2.0-0 \
    libx11-xcb1 \
    libxcomposite1 \
    libxcursor1 \
    libxdamage1 \
    libxrandr2 \
    libgbm1 \
    libpango-1.0-0 \
    libasound2 \
    libxss1 \
    libxtst6 \
    --no-install-recommends && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy necessary files from builder stage
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.ts ./next.config.ts
COPY --from=builder /app/.env ./.env
COPY --from=builder /app/src/models ./src/models
COPY --from=builder /app/src/lib ./src/lib

# Install only production dependencies
RUN npm install -g pnpm@latest && pnpm install --prod

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3000

# Expose port
EXPOSE 3000

# Start the app
CMD ["pnpm", "start", "-p", "3000"]
