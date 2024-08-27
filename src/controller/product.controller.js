
import ProductModel from '../models/product.model.js';

export default class ProductController{

    getProducts(req,res){

        let products=ProductModel.getProducts();
        console.log(products);
        res.render("products",{products:products,userEmail:req.session.userEmail});
        //render("products",{products:products});
       // return res.sendFile(path.join(path.resolve(),'src','views'));
    }

    getAddForm(req,res){
        res.render('new-product',{errors:null});
    }

    addNewProduct(req,res,next){
        console.log(req.body);
        const {name,desc,price}=req.body
        const imageURL="images/"+req.file.filename;
        ProductModel.add(name,desc,price,imageURL);
        let products=ProductModel.getProducts();
        res.render('products',{products,userEmail:req.session.userEmail});
    }

    getUpdateProduct(req,res){

        const id=req.params.id
        const product=ProductModel.getById(id);
        if(product){
            res.render('update-product',{product:product,errors:null});
        }else{
            res.status(401).send('No such product found!');

        }
    }

    updateProduct(req,res){

        ProductModel.update(req.body);
        let products=ProductModel.getProducts();
        res.render('products',{products,userEmail:req.session.userEmail});
        
    }

    deleteProduct(req,res){

        const id=req.params.id;
        // const product=ProductModel.getById(id);

        // if(!product){
        //    return  res.status(404).send('No such product found!');
        // }else{

        ProductModel.delete(id);
        let products=ProductModel.getProducts();
        res.render('products',{products,userEmail:req.session.userEmail});

        
        
    }
}