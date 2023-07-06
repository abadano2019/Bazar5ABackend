<!-- PROJECT LOGO -->
<br />
<div align="center">
    <img src="https://github.com/abadano2019/AppBazar5A/blob/master/assets/icon.png" width="80" height="80">
    <p>  E-COMMERCE BAZAR 5A BACKEND </p>
  </a>
</div>




<!-- ABOUT THE PROJECT -->
## Introducción

Bazar 5A Backend surge como una consecuencia de funcionamiento para el front de Bazar 5A ya desarrollado en otro repositorio existente en mi gitHub para el cual se realiza la implementación y desarrollo de un servidor bajo tecnología Express Js para darle los servicio necesarios al sitio web, el mismo consta de varios módulos entre los que podemos encontrar seguridad con la utilización de estrategias de Passport, la utilización de una pasarela de pago con la implementación de Stripe, bases de datos NoSQL con la utilización de mongoose y con la posibilidad de implementar otras persistencias. Dentro de las funcionalidades ofrecidas para los clientes podemos encontrar todo el soporte al manejo de un carrito de compras, en donde se agregan productos, donde se puede restar o agregar productos, eliminar un producto del carrito, emitir órdenes de compra, realizar el pago por intermedio de stripe, también cuenta con las funcionalidades de administración para poder agregar, modificar y eliminar productos de la base de datos entre otras cosas. 

### Tecnologías utilizadas

Dentro de las tecnologías utilizadas para el desarrollo del backend podemos encontrar:

##### * @faker-js/faker (https://www.npmjs.com/package/@faker-js/faker)
##### * artillery (https://www.npmjs.com/package/artillery)
##### * bcrypt (https://www.npmjs.com/package/bcrypt)
##### * connect-mongo (https://www.mongodb.com/blog/post/quick-start-nodejs-mongodb-how-to-get-connected-to-your-database)
##### * cookie-parser (http://expressjs.com/en/resources/middleware/cookie-parser.html)
##### * cors (https://www.npmjs.com/package/cors)
##### * dotenv (https://www.npmjs.com/package/dotenv)
##### * express js (https://expressjs.com/)
##### * express-compression (https://www.npmjs.com/package/express-compression)
##### * express-handlebars (https://www.npmjs.com/package/express-handlebars)
##### * express-session (https://www.npmjs.com/package/express-session)
##### * jsonwebtoken (https://www.npmjs.com/package/express-jwt)
##### * moment (https://momentjs.com/)
##### * mongoose (https://www.npmjs.com/package/mongoose)
##### * mongoose-paginate-v2 (https://www.npmjs.com/package/mongoose-paginate-v2)
##### * multer (https://expressjs.com/en/resources/middleware/multer.html)
##### * nodemailer (https://www.npmjs.com/package/nodemailer)
##### * passport (https://www.passportjs.org/)
##### * passport-discord (https://www.passportjs.org/packages/passport-discord/)
##### * passport-github2 (https://www.passportjs.org/packages/passport-github2/)
##### * passport-google-oauth20 (https://www.passportjs.org/packages/passport-google-oauth20/)
##### * passport-jwt (https://www.passportjs.org/packages/passport-jwt/)
##### * passport-local (https://www.passportjs.org/packages/passport-local/)
##### * session-file-store (https://www.npmjs.com/package/session-file-store)
##### * socket.io (https://www.npmjs.com/package/socket.io)
##### * stripe (https://www.npmjs.com/package/stripe)
##### * swagger-jsdoc (https://www.npmjs.com/package/swagger-jsdoc)
##### * swagger-ui-express (https://www.npmjs.com/package/swagger-ui-express)
##### * winston (https://www.npmjs.com/package/winston)
##### * chai (https://www.npmjs.com/package/chai)
##### * mocha (https://www.npmjs.com/package/mocha)
##### * Docker (https://docs.docker.com/desktop/install/windows-install/)
##### * Kubernetes ()
##### * Railway (https://railway.app/)

El servidor de backend fue desarrollado con Express Js y junto con Node Js y Java Script forman la base medular para la aplicación, luego se le agregaron otras librerias para generar otras funcionalidades. 

Repositorio: Para la persistencia se utilizó mongoose, connect-mongo y mongoose-paginate-v2 y por intermedio de patrones de diseño se dejó la posibilidad de implementar otros tipos de persistencia.

Seguridad: se utilizó passport, passport-discord, passport-github2, passport-google-oauth20, passport-jwt, passport-local, bcrypt, con passport se agregó el ingreso a la aplicación por intermedio de los usuarios ya existentes en otras aplicaciones, en este caso, google, discord y gitHub, por otro lado, existe la posibilidad de registro de forma local. Se usa un sistema de hasheo de información proporcionado por bcrypt.

Documentación: Para la documentación de la aplicación se utiliza swagger-jsdoc y swagger-ui-express, si bien no están todos los módulos documentados hay una muestra de un par de ellos en la ruta (http://localhost:3000/api/docs/)

Logueo: El logueo de información se realiza con la implementación de winston ya sea por consola o en archivo, ser manejan 4 niveles de logueo fatal: "magenta", error: "red", warning: "yellow", info: "cyan".

Testeo: Para el testing unitario y de integración se utiliza chai, mocha, @faker-js/faker y supertest se realizó una muestra de unas pocas muestras para ver el funcionmaiento en la carpeta /supertest y en la carpeta /src/test

Testeo de carga: Para el testeo de carga se utilizó Artillery se realizó sobre un par endpoints y los resultados se pueden encontrar en la carpeta src/test/artillery en el archivo src/test/artillery/read.me.txt se encuetran las consultas ejecutadas. 

Usuarios: Para el manejo de usuarios se utilizó cookie-parser, bcrypt, express-session, jsonwebtoken, session-file-store, en la aplicación si bien se utilizón jwt, cookies y sessioens quedó utilizando sessiones las cuales son guardadas en la base de datos, en caso de querer cambiar se deben de hacer los ajustes necesarios. La solicitud de una nueva clave de usuario se realizan utilizando jwt. 

Comunicación entre servidores: se utiliza cors

Motor de plantillas: si bien en la carpeta public está todo el diseño del front el backend está conectado con formularios de express-handlebars, todo el front a no ser por el menú está diseñado con plantillas de handlebars, queda fuera del alcance de esta entrega la integración con el front por falta de tiempo.

Pasarela de pago: Se implementa stripe y se deja pronto para el desarrollo de la pasarela de mercado pago.

Middleware: Se implementas varios middlewares entre ellos se implementa el modulo de multer para subir archivos al servidor, se implementa de varias formas para documentos, perfiles y productos, se puede ver en la carpeta src/public/img, además se implementó middlewares de autotenticación, errores personalizados, validacion de jwt, 

Docker, Kubernetes, Railway: Se utilizó docker para la generación de contendedores y utilizó kubernetes para la escalabilidad y se intentó utilizar railway pero por problemas de comuniciación con gitHub no se llegó a realizar el despligue ya que por problemas de configuración railway no se integra con gitHub.

Otras: para el manejo del tiempo se utiliza moment, para el manejo de envio de mails nodemailer, para el manejo de datos entre clientes se implementó web socket con socket.io

## Arquitectura y patrones de diseño

Para el desarrollo de la arquitectura del servidor se utiliza la separación de capas Controladores, Servicios y Persistencia 

![image](https://github.com/abadano2019/ArquitecturaBackend/assets/48340360/e722fdd1-1507-43da-9f67-3d44cc324c5a)

Se implementan los patrones de diseño, DAO, DTO, Factory y Repository para la persistencia y el patrón de diseño Singleton para la clase factory de la persistencia.

![image](https://github.com/abadano2019/ArquitecturaBackend/assets/48340360/d5337b62-be21-4349-859b-cd583c151873)


<!-- GETTING STARTED -->
## Instalación

### Requisitos previos

Se recomienda el uso de Visual Studio Code para la visualización y administración del código o herramienta similar, se debe tener instalado Node JS y Mongodb, que se el motor de base de datos que está implementado, en caso de querer utilizar datos propios se debe contar con una cuenta de Mongodb, en caso de querer utilizar otra persistencia se debe implementar las clases proporcionadas en el código fuente.

### Pasos a seguir

A continuación se marcan los pasos para poder utilizar la aplicación con datos propios.
 

1. Clonar o descargar el repositorio, antes de ejecutar este comando debe posicionarse en la carpeta donde desea clonar el repositorio
   ```sh
   git clone (https://github.com/abadano2019/ArquitecturaBackend)
   ```
2. Instalar NPM packages
   ```sh
   npm install
   ```
3. Configurar el servicio de mongodb
4. Configurar la variable mongoUri en el archivo .env obtenida
5. Registrar el usuario adminCoder@coder.com el cual está configurado como administrador
6. Ingresar con el usuario adminCoder@coder.com y cargar datos de productos
7. Para el correcto uso del resto de las funcionalidades completar el resto de las variables en el archivo .env
  
## Estructura de carpetas

![image](https://github.com/abadano2019/ArquitecturaBackend/assets/48340360/7ce1d0c7-c962-48a9-810a-f0cbec7d4690)

Dentro de la carpeta src tenemos la siguiente estructura: 

controllers: contiene todos los controladores que utilizan los routes.

data: contiene parte de los datos que maneja la persistencia en archivos ya que dicha persistencia está sin terminar para varias de las funcionalidades.

docs: contiene la implementación de swagger para la documentación de los módulos.

error: contiene los archivos para el manejo de errores personalizados.

js: contiene algunas clases de entidades auxiliares como ser: cart, product, etc. 

logger: contiene la implementación del logueo de errores y de trazas de ejecución.

middleware: contiene todos los middlewares implementados.

passport: contiene la implementación de las estrategias de logueo de passport.

persistence: contiene toda la estructura de persistencia y la aplicación del patron de diseño factory.

public: contien el front del sitio web sin integrar al backend también cuenta con la carpeta img con todos los archivos subidos al 

servidor por intermedio de multer.

repositories: carpeta en la cual se implementa el padrón repositorio para integrar los dao con los dto.

routes: contiene todas las rutas implementadas con el modulo router.

services: carpeta con todos los servicios utilizados por los controladores.

sessions: carpeta en la cual se guardan las sesiones de los usuarios en caso de setear sessiones en archivo.

test: contiene la implementación de artillery y testeo con mock.

views: contiene las vistas y layouts de las plantillas de handelbars.

supertest: carpeta con la utlización de supertest para el testeo de modulos.

## Persistencia

![image](https://github.com/abadano2019/ArquitecturaBackend/assets/48340360/002ebd9a-7851-4a70-a14b-69edae4294c2)


La estructura de carpetas para la persistencia está dividida en DAOs, DTOs, mongodb, sqldb y la clase factory, correspondiente al patrón de diseño factory.

* DAOs: Dentro de la carpeta DAOs se crea una carpeta por tipo de entidad a ser persistida (<entidad>DAO), dentro de la entidad existe una carpeta manager (<entidad>Manager) y una clase que administra el tipo de persistencia seleccionada. Dentro de la carpeta manager tenemos un archivo por tipo de persistencia, todos los archivos deben implementar las mismas funcionalidades para que su uso sea transparente para el resto de las capas de la aplicación.
  
* DTOs: Dentro de la carpeta DTOs se crea una carpeta por tipo de entidad (<carts>.DTO) las cuales utilizaran el patron DTO, dentro de cada carpeta podemos encontrar varias archivos del tipo response o persistence.
  
* mongodb: Dentro de la carpeta mongodb encontramos un archivo encargado de la conexión a la base de datos de mongo y una carpeta models con todos los modelos de tablas utilizados por la base de datos mongodb.

* sqldb: Dentro de la carpeta sqldb tenemos el archivo encargado de la conexión a una base de datos de sql y una carpeta models para la definición de la estructura de sus tablas. Esta persistencia no se encuentra implementada en esta aplicación para esta versión. 

* factory.js: La clase factroy implementa el patrón de diseño factory para la persistencia, el cual activa la persistencia que es llamada la iniciar el servidor.

#### Pantalla de inicio

Desde la pantalla de inicio http://localhost:3000 se puede acceder al login

![image](https://github.com/abadano2019/ArquitecturaBackend/assets/48340360/85394824-793e-4527-96fa-aa3d91a4ee35)

Pantalla de Registro de un usuario: 

![image](https://github.com/abadano2019/ArquitecturaBackend/assets/48340360/6902027b-7996-4d77-8871-167edd58012b)

Desde la pantalla de login, se puede realizar el registro de un usuario nuevo, resetear la password, ingresar con usuaro y clave seleccionados desde el registro o ingresar desde el login unificado de google, gitHub o discord. 

![image](https://github.com/abadano2019/ArquitecturaBackend/assets/48340360/981ca354-a71c-4568-b01f-01d6e47feb13)


#### Pantallas del administrador

Para acceder al menú de administrador, se debe registar e ingresar con el usuairo adminCoder@coder.com o cambiar un usuario a usuario Premium.

![image](https://github.com/abadano2019/ArquitecturaBackend/assets/48340360/9f9ed93c-9da9-4a7a-8cd3-dd1e34a5e372)

Desde el menú de usuario podemos subir archivos genericos, archivos de documentos, de profiles y de productos, podemos listar todos los productos con actualización en tiempo real (por utilizar web socket), listar los productos sin ser actualizados en tiempo real, ingresar al chat, borrar los usuarios con 2 o mas dias de inactividad y podemos realizar el alta, modificación y eliminación de productos.

#### CRUD de productos

##### Alta de productos

![image](https://github.com/abadano2019/ArquitecturaBackend/assets/48340360/12b438f3-94e8-4080-bf2f-3d1586119c7b)

##### Modificación de productos

![image](https://github.com/abadano2019/ArquitecturaBackend/assets/48340360/e02de3df-458f-462c-9910-cfa3ebb408f6)

##### Borrado de productos

![image](https://github.com/abadano2019/ArquitecturaBackend/assets/48340360/ab96cef1-258c-40e6-acaa-833f5b47fc1c)


#### Funcionalidades de usuarios

Podemos ver los productos ofrecidos por el sitio web pudiendo navegar con los botones de siguiente pagina y pagina anterior

![image](https://github.com/abadano2019/ArquitecturaBackend/assets/48340360/41ba71e3-56c0-4d88-ac91-293a9013d38a)

Podemos ingresar al carrito de compras pudiendo agregar o eliminar la cantidad de productos comprados o directamente borrar un producto del carrito de compras. Podemos realizar la compra por intermedio del botón buy o pay with stripe, en donde nos llegará un mail con el aviso de la transacción. La compra valida contra el stock actual del sitio web.

![image](https://github.com/abadano2019/ArquitecturaBackend/assets/48340360/ab0ecc03-b4fd-4b5d-9f4a-754a2b605f59)

![image](https://github.com/abadano2019/ArquitecturaBackend/assets/48340360/e2ddd535-d488-42bb-b867-cc3136226443)

Podemos ingresar al Chat

![image](https://github.com/abadano2019/ArquitecturaBackend/assets/48340360/b7d18fa2-6cd8-45df-b927-683a19ee045f)

Podemos subir los archivos necesarios para el cambio de rol

![image](https://github.com/abadano2019/ArquitecturaBackend/assets/48340360/f9b3d4d5-7758-400e-87cc-d0255ba9cbf5)



<!-- ROADMAP -->
## Mejoras

Esta es una primera versión del proyecto Bazar 5A Backend, en el cual queda para definir para una nueva iteracion, un nuevo alcance con otras funcionalidades y mejoras, como ser:

* Agregar la implementación de otras persistencias.
* Integrarlo al Front ya diseñado.
* Implementar jwt para el logueo de los usuarios.
* Lograr el despliegue de la aplicación en railway u otra plataforma.
* Terminar de armar los archivos de configuración para el correcto funcionamiento de kubernetes 
* Optimización del código
* Implementar el front personalizado para la pasarela de pago Stripe
* Implementar la pasarela de pago de marcado pago
  

# ANEXO

Proyecto desarrollado utilizando Express JS [Empezando con Express JS](https://expressjs.com/en/starter/installing.html).

Proyecto Bazar 5A Backend  (https://github.com/abadano2019/ArquitecturaBackend)

## Comandos disponibles

### `npm start`

Desde una terminal donde se esté ubicado en la raiz del proyecto se puede iniciar la aplicación ejecutando el comando npm start

Previo a la ejecución de la app se deben instalar las dependencias del proyecto.

### `npm install`

Ejecute el comando npm install para instalar todas las dependencias del archivo node_modules del proyecto.

### npm start (otras persistencias)

Desde una terminal donde se esté ubicado en la raiz del proyecto se puede iniciar la aplicación ejecutando el comando npm start fs para persistir en archivos, npm start memory para persistir en memoria RAM (Tener presente que es información se perderá al momento de apagar el servidor), npm start sql para persistir en base de datos relacional SQL, npm start mongo para persistir en mongodb.

Previo a la ejecución de la app se deben instalar las dependencias del proyecto.

### npm run test-app

Desde una terminal donde se esté ubicado en la raiz del proyecto se puede iniciar la aplicación ejecutando el comando npm run test-app el cual ejecuta un servidor de prueba bajo el puerto 3030 a un base de datos de prueba.

Learn More

Si desea aprender sobre Express Js dirijase a los siguientes links: 

https://expressjs.com/
https://devdocs.io/express/

<!-- REFERENCIAS -->
## Referencias

* Curso programación backend - CoderHouse.com - Profesor: Farid Sesim

<!-- CONTACT -->
## Contacto

Ariel Badano - abadano05@gmail.com

Project Link: (https://github.com/abadano2019/ArquitecturaBackend)https://github.com/abadano2019/ArquitecturaBackend
