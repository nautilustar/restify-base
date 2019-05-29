FROM node:11-alpine

USER node
WORKDIR /home/node/app

CMD ["npm", "start"]