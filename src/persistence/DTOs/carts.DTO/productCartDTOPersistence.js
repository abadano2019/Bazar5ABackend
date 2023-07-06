export default class productCartDTOPersistence {
    constructor(product){
        this.idCart = product.cid;
        this.idProduct = product.pid;
    }
}