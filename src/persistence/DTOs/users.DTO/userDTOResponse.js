export default class UserDTOResponse {
    constructor(user) {
      //this.full_name = `${user.name} ${user.lastName}`
      this._id = user._id
      this.fullName = user.first_name+" "+ user.last_name
      this.email = user.email
      this.role = user.role
      this.cart = user.cart
      this.tokenResetPassword = user.tokenResetPassword
      this.password = user.password
      this.docs = user.documents
    }
  }