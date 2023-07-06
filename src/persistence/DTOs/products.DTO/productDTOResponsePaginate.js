export default class ProductDTOResponsePaginate{
    
    constructor(products, productsResp){
        this.payload = productsResp
        this.hasNextPage = products.hasNextPage,
        this.hasPrevPage = products.hasNextPage,
        this.nextPage = products.nextPage,
        this.prevPage = products.prevPage
    }
}