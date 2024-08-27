
export default class ProductModel{

    constructor(id,name,desc,price,imageURL){
        this.id=id;
        this.name=name;
        this.desc=desc;
        this.price=price;
        this.imageURL=imageURL;
    }

    static getProducts(){
        return products;
    }    

    static add(name,desc,price,imageURL){
        const product=new ProductModel(
            products.length+1,
            name,
            desc,
            price,
            imageURL 
            );

        products.push(product);
    }

    static getById(id){
       return  products.find(p=> p.id==id);
    }

    static update(productObj){

        const productIndex=products.findIndex(p=>p.id==productObj.id);

        products[productIndex]=productObj;
    }

    static delete(id){

        const index=products.findIndex(p=>p.id==id);       
           products.splice(index,1);
    }
    
}
var products=[
    new ProductModel(1,"Atomic Habits","A supremely practical and useful book",19.99,"https://m.media-amazon.com/images/I/51-nXsSRfZL._SX328_BO1,204,203,200_.jpg"),
    new ProductModel(2,"Ikigai","The Japanese secret to a long and happy life",23.54,"https://m.media-amazon.com/images/I/51xwGSNX-EL._SX356_BO1,204,203,200_.jpg"),
    new ProductModel(3,"Deep Work","RULES FOR FOCUSED SUCCESS IN A DISTRACTED WORLD",12.98,"https://m.media-amazon.com/images/I/31PBdo581fL._SX317_BO1,204,203,200_.jpg")
];