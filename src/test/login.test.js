import { login } from '../login.js'

let pruebasPasadas = 0
const pruebasTotales = 5

// 1. Password vacio
const response1 = login('coderUser')
if (response1 === 'No se ha proporcionado un password') {
    pruebasPasadas++
  console.log('Prueba 1 paso')
} else {
  console.log('Prueba 1 fallo')
}

// 2. User vacio
const response2 = login(null, '123')
if (response2 === 'No se ha proporcionado un usuario') {
    pruebasPasadas++
  console.log('Prueba 2 paso')
} else {
  console.log('Prueba 2 fallo')
}
// 3. Password incorrecto
const response3 = login('coderUser', '1234')
if (response3 === 'Password incorrecta') {
    pruebasPasadas++
  console.log('Prueba 3 paso')
} else {
  console.log('Prueba 3 fallo')
}

// 4.User incorrecto
const response4 = login('coderUserInc', '123')
if (response4 === 'Credenciales incorrectas') {
    pruebasPasadas++
  console.log('Prueba 4 paso')
} else {
  console.log('Prueba 4 fallo')
}
// 5. User y password correctos
const response5 = login('coderUser', '123')
if (response5 === 'logueado') {
    pruebasPasadas++
  console.log('Prueba 5 paso')
} else {
  console.log('Prueba 5 fallo')
}


console.log(`Del total de ${pruebasTotales} pruebas pasaron ${pruebasPasadas}`);