export default class productCartDTOResponse {
    constructor(product, productDetail){
        this.id = product.id;
        this.quantity = product.quantity;
        this.title = productDetail.title;
        this.description = productDetail.description
        this.code = productDetail.code;
        this.category = productDetail.category;
        this.status = productDetail.status;
        this.thumbnails = productDetail.thumbnails
        this.stock = productDetail.stock;
        this.price = productDetail.price;
    }
}