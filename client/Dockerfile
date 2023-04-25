
FROM node:14-alpine
ARG REACT_APP_MY_API_URL
ENV REACT_APP_MY_API_URL=$REACT_APP_MY_API_URL
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
