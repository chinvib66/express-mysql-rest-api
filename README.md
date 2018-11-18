# Express MySql/PostGRE Sql REST Api.

Simple REST Api.

Contains Authentication using JSON Web Tokens.
and the usual CRUD functionality.

Deployed to Heroku: express-mysql-rest-api.herokuapp.com
*Note: This deployment uses PostGRE Sql.


### Registration Endpoint:
endpoint: /api/register, POST request.
send a POST request with fields: fullName, email, password.
If user already exists, msg will be displayed. *User data will also be displayed for debugging purposes*
Else, new user will be created.

### Login Endpoint:
endpoint: /api/register, POST request.
send a POST request with fields: email, password.
If user exists, User data will be displayed for debugging purposes and JWT will be assigned
Else, status 0 will be shown.

### CRUD for Post, Question, Note
#### GET request to fetch all Posts/Questions
