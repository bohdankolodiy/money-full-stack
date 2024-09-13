FROM node:latest AS build

WORKDIR /money-fe

COPY . /money-fe

RUN npm install
RUN npm install -g @angular/cli

COPY . .

EXPOSE 4200

CMD  npm run start



#Download Node Alpine image
# FROM node:latest As build

# #Setup the working directory
# WORKDIR /money-fe

# COPY . /money-fe

# #Install dependencies
# RUN npm install

# RUN npm install -g @angular/cli

# # #Copy other files and folder to working directory
# # COPY . .

# #Build Angular application in PROD mode
# RUN ng build

# FROM nginx:stable

# # COPY --from=build /money-fe/dist/money-fe/ /usr/share/nginx/html

# EXPOSE 80
