import './db.js'

import assert from 'assert'
import mongoose from 'mongoose'
import usersManager from '../src/persistence/DAOs/usersDAO/usersManager/usersMongo.js'

describe('Testing de Users dao para mongoDB', async () => {
  before(function () {
    this.usersDao = new usersManager()
  })
  beforeEach(function () {
    //mongoose.connection.collections.users.drop()
  })

  it('Debe agregar un usuario a la base de datos', async function () {
    const userTest = {
      first_name: 'Prueba',
      last_name: 'Test',
      email: 'ptest52@mail.com',
      password: '12345',
    }

    const result = await this.usersDao.createUser(userTest)
    assert.ok(result._id)
  })
  
  it('Debe retornar todos los usuarios de la base de datos', async function () {
    const result = await this.usersDao.getUserById("ptest52@mail.com")
    console.log("result",result._id)
    assert.notEqual(Array.isArray(result), true)
    assert.ok(result._id)
  })

  
})
