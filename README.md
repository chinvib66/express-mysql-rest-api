# Express MySql/PostgreSql REST Api.

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
endpoint: /api/login, POST request.
send a POST request with fields: email, password.
If user exists, User data will be displayed for debugging purposes and JWT will be assigned
Else, status 0 will be shown.

### CRUD for Post, Question, Note

Create:<br>
      This requires jwt 'token' to be passed either as form-data, headers
      1. Posts: Send POST request to '/api/post/create' with form data containing title, content. A blog post will be created.
      2. Question: Send POST request to '/api/ques/create' with form data containing title, des. A forum question will be created
      3. Note: Send POST request to '/api/note/create' with form data containing title, des. A note will be created

Read:<br>
      Auth not required. Fetches data as json object.
      1. Posts: Send GET request to '/api/posts' or '/api/post/:id'. 
      2. Question: Send GET request to '/api/forum' or '/api/post/:id'.
      Auth required. Pass jwt token in headers.
      3. Note: Send GET request to '/api/notes' or '/api/note/:id'.

Update: <br>
      This requires jwt 'token' to be passed either as form-data, headers
      1. Posts: Send POST request to '/api/post/:id/update' with form data containing title, content. A blog post will be updated.
      2. Question: Send POST request to '/api/ques/:id/update' with form data containing title, des. A forum question will be updated
      3. Note: Send POST request to '/api/note/:id/update' with form data containing title, des. A note will be updated

Delete: <br>
      This requires jwt 'token' to be passed either as form-data, headers
      1. Posts: Send POST request to '/api/post/:id/delete'  Blog post will be deleted.
      2. Question: Send POST request to '/api/ques/:id/delete'  Forum question will be deleted
      3. Note: Send POST request to '/api/note/:id/delete'  Note will be deleted
