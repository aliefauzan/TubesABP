# Stage 1: Install all dependencies for the build
FROM node:18-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./
# Install only production dependencies for better caching
RUN npm ci --only=production && npm cache clean --force

# Stage 2: Build the Next.js application
FROM node:18-alpine AS builder
WORKDIR /app

# Copy package files and install all dependencies (including dev)
COPY package.json package-lock.json* ./
RUN npm ci

# Copy the rest of the application source code
COPY . .

# IMPORTANT: Make sure you have a .dockerignore file in your project root
# to exclude files like .git, .next, and node_modules from the host.

ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# Stage 3: Production image
FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Create and switch to a non-root user in a single layer
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copy standalone output and static files
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 8080
ENV PORT=8080
ENV HOSTNAME="0.0.0.0"

# The standalone output creates a server.js file to run the application
CMD ["node", "server.js"]