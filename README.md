# API ⚙️

### Available routes

[AUTH] => The request needs to be authentified (access token as bearer token) </br>
[ADMIN] => The request needs to be authentified (access token as bearer token) and the user is an admin </br>
[OWNER] => You must send userId to check if he's the owner of the ressource </br>


#### Client (base: /api/client)

GET - /organisations ~> get all organisations </br>
GET - /organisation/:id  ~> get an organisation </br>
GET - /user/:id ~> get an user [AUTH] [OWNER]</br>
PUT - /user/:id ~> edit an user [AUTH] [OWNER]</br>
DELETE - /user/:id ~> edit an user [AUTH] [OWNER]</br>

#### Auth (base: /api/auth)

POST - /login' ~> login </br>
POST - /signup' ~> signup </br>
POST - /generateAt ~> generateAccessToken </br>

#### Admin (base: /api/admin)

GET - /organisations ~> get all organisations [ADMIN] </br>
GET - /organisation/:id ~> get an organisation [ADMIN] </br>
POST - /organisation ~> create an organisation [AUTH] </br>
DELETE - /organisation/:id' ~> delete an organisation [ADMIN] [OWNER]</br>
PUT - /organisation/:id' ~> edit an organisation [ADMIN] [OWNER]</br>

GET - /event/:id ~> get an event [ADMIN] </br>
GET - /events/:organisationId ~> get orga's events [ADMIN] [OWNER]</br>
POST - /event ~> create an event [ADMIN]</br>
DELETE - /event/:id ~> delete an event [ADMIN] [OWNER]</br>
PUT - /event/:id ~> edit an event [ADMIN] [OWNER] </br>
