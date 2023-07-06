import "./db.js"

import { comparePasswords, hashPassword } from '../src/utils.js'

import { expect } from 'chai'
import userDTOPersistence from '../src/persistence/DTOs/users.DTO/userDTOPersistence.js'
import userDTOResponse from "../src/persistence/DTOs/users.DTO/userDTOResponse.js"
import usersManager from '../src/persistence/DAOs/usersDAO/usersManager/usersMongo.js'

const userTest = {
  first_name: 'Prueba',
  last_name: 'Test',
  email: 'ptest@mail.com',
  password: '12345',
}

describe('Testear funcionalidades de bcrypt',  () => {
  
  before(function () {
    this.usersDao = new usersManager()
  })

  beforeEach(function async() {
    //mongoose.connection.collections.users.drop()
  })
  

  it('Probar que contrasena hasheada diferente a contrasena ingresada por el usuario', async function () {
    const hashedPassword = await hashPassword(userTest.password)
    //console.log(hashPassword)
    expect(hashedPassword).to.not.equal(userTest.password)
  })
  it('Probar que la contrasena hasheada coincide con la del usuario', async function () {
    //const hashedPassword = await hashPassword(userTest.password)
    const userDB = await this.usersDao.getUserById(userTest.email)
    
    let resultUserDB 
    if(!userDB){
      resultUserDB = await this.usersDao.createUser(userTest);
      console.log("usuario Creado:", resultUserDB)
      resultUserDB = await this.usersDao.getUserById(userTest.email)
    }
    else
    {
      resultUserDB = await this.usersDao.getUserById(userTest.email)
    }
    const result = await comparePasswords(userTest.password, resultUserDB.password)
    expect(result).to.be.equal(true)
  })
  it('Probar que contrasena hasheada alterada falle al compararla', async function () {
    const hashedPassword = 'efklgrelughurelghulrehglertg'
    const result = await comparePasswords(hashedPassword, userTest.password)
    expect(result).to.be.false
  })
})

describe('Testear User DTO',function(){
    it('Agrupar nombre y apellido en una misma propiedad',function(){
        const userDTO = new userDTOResponse(userTest)
        expect(userDTO.fullName).to.be.equal(`${userTest.first_name} ${userTest.last_name}`)
    })
    it('Eliminar propiedades innecesarias',function(){
        const userDTO = new userDTOResponse(userTest)
        expect(userDTO).to.not.have.property('first_name')
        expect(userDTO).to.not.have.property('last_name')
        //expect(userDTO).to.not.have.property('password')
    })
})
