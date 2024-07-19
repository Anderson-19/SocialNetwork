# Social Network

Aplicación web que funciona como una red social similar a Twitter, para lo cual el usuario debe pasar por un proceso de registro e inicio de sesión para tener acceso a las funcionalidades de la aplicación. 

El usuario deberá poder realizar posts subiendo imágenes y/o texto, con límite de caracteres, y los posts se podrán comentar, repostear y eliminar, pero nunca editar.

El usuario contará con un sistema de follows y likes, donde el usuario podrá seguir otros miembros de la red para construir su timeline, así como reaccionar como resulte conveniente a los posts. La aplicación debe permitir la búsqueda de otros usuarios que contengan alguna coincidencia con las palabras que se utilicen.

El usuario podrá ver y modificar su perfil, con la información que se incluye: nombre, apellido, ubicación, fecha de nacimiento, bio, avatar, banner. Adicionalmente, dentro del timeline de su perfil se podrá ver el contador de followings/followers, y el listado de posts creados o reposteados por el usuario.

Por ultimo, los usuarios que se siguen podran conversar en tiempo real mediante el chat.

## Correr el server en desarrollo

1. Clonar repositorio
2. Crear una copia de el archivo ```.env.template``` y reemplazarlo a ```.env```
3. Reemplazar las variables de entorno
4. Instalar las dependencias ```npm install```
5. Correr el servidor ```npm run dev```

## Correr el cliente en desarrollo

1. Clonar repositorio
2. Crear una copia de el archivo ```.env.template``` y reemplazarlo a ```.env```
3. Reemplazar la variable de entorno
4. Instalar las dependencias ```npm install```
5. Correr el servidor ```npm run dev```


- **App en producción:** https://socialnetwork-client-production.up.railway.app