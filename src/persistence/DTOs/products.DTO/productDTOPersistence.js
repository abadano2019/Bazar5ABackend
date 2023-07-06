export default class ProductDTOPersistence{
    
    constructor(product){
        this.id = product._id
        this.title = product.title;
        this.description = product.description
        this.code = product.code;
        this.category = product.category;
        this.status = product.status;
        this.thumbnails = product.thumbnails
        this.stock = product.stock;
        this.price = product.price;
        this.owner = product.owner;
    }
}

