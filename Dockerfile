############################# 
##### DEVELOPMENT STAGE #####
#############################
FROM node:16-alpine3.11 AS development

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install glob rimraf
RUN npm install --only=development

# Bundle app source
COPY . .

RUN npm run build

############################# 
##### PRODUCTION STAGE #####
#############################
FROM node:16-alpine.3.11 AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production

COPY . .

COPY --from=development /usr/src/app/dist ./dist

CMD ["npm", "run", "start:prod"]
