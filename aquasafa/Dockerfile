FROM node:17-alpine
WORKDIR /app
RUN npm install yarn 
RUN yarn install 
COPY . .
EXPOSE 3000
CMD ["yarn","start"]
