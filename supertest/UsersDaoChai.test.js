import './db.js'

import { assert, expect } from 'chai'

import mongoose from 'mongoose'
import usersManager from '../src/persistence/DAOs/usersDAO/usersManager/usersMongo.js'

describe('Testing de Users dao para mongoDB', () => {
  before(function () {
    this.usersDao = new usersManager()
  })
  beforeEach(function async() {
    //mongoose.connection.collections.users.drop()
  })

  it('Debe agregar un usuario a la base de datos', async function () {
    const userTest = {
      first_name: 'Prueba',
      last_name: 'Test',
      email: 'ptest143@mail.com',
      password: '12345',
    }

    const result = await this.usersDao.createUser(userTest)
    assert.ok(result._id)
    /*console.log(result)
    console.log("id: ", result[0]._id)
    console.log("first_name:", result[0].first_name)
    expect(result).to.have.property('id')
    expect(result).to.have.property('first_name')*/
  })

  it('Debe retornar todos los usuarios de la base de datos', async function () {
    const result = await this.usersDao.getUserById("ptest141@mail.com")
    assert.ok(result._id)
    //expect(result[0]).to.have.property('_id')
  })
  
  it('Debe retornar un arreglo vacio', async function () {
    
    const userTest = {
      first_name: 'Prueba',
      last_name: 'Test',
      email: 'ptest141@mail.com',
      password: '12345',
    }

    const result = await this.usersDao.loginUser(userTest)
    //expect(result).to.have.lengthOf(0)
    assert.ok(result.first_name)
  })

  
})