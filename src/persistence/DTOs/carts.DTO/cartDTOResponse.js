export default class CartDTOResponse {
    constructor(cart){
        this.id = cart._id
        this.products = cart.cartProducts
    }
}