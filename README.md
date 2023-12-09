# Ambroisie

Simple meals finder to help you plan your week's meals.

## Description

Ambroisie lets you browse ideas of meals for the week ahead, whether it's an homemade recipe or not. By clicking on a meal, you can get more information about it as well as the ingredients and directions for the preparation. You can obviously add and remove recipes, as long as you possess the required secret code.

## How to install

Install Docker and Docker Compose on your machine or vps. Then, run `docker compose up -d` in the root directory of the project. Finally, open your web browser and navigate to your server IP and port.

Run `docker compose down` in the root directory to stop your containers.

## Environment variables

In order to succesfully launch the project, you have to create an `.env` file in the root directory. It must contain all the variables listed below. Do not forget to modify the default assigned values if needed.

```
BACKEND_PORT=3000
SECRET_CODE=123456789
POSTGRES_USER=dbuser
POSTGRES_PASSWORD=dbpassword
POSTGRES_DB=ambroisie
SERVER_IP=0.0.0.0
SERVER_PORT=80
```
