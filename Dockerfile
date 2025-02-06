###################
# BUILD FOR PRODUCTION
###################

FROM node:20-alpine As builder

# Set NODE_ENV environment variable
ENV NODE_ENV build

USER node
WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./
RUN npm ci

COPY --chown=node:node . .

# Run the build command which creates the production bundle
RUN npm run build && npm prune --omit=dev

###################
# PRODUCTION
###################

FROM node:20-alpine As production

# Set NODE_ENV environment variable
ENV NODE_ENV production

USER node
WORKDIR /usr/src/app

# Copy the bundled code from the build stage to the production image
COPY --chown=node:node --from=builder /usr/src/app/package*.json ./
COPY --chown=node:node --from=builder /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=builder /usr/src/app/dist ./dist

# Start the server using the production build
CMD [ "node", "dist/main.js" ]