# AMBROISIE

...

## Description

...

## How to install

Install Docker and Docker Compose.  
Run `docker compose up` in the root directory of the project.

## Environment variables

In order to succesfully launch the project, you have to create an `.env` file in the root directory. It must contain all the variables listed below. Do not forget to modify the default assigned values if needed.

```
BACKEND_PORT=3000
SECRET_CODE=123456789
POSTGRES_USER=dbuser
POSTGRES_PASSWORD=dbpassword
POSTGRES_DB=ambroisie
SERVER_IP=0.0.0.0
SERVER_PORT=8080
```
