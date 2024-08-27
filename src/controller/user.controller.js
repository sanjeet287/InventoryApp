import UserModel from '../models/user.model.js';
import ProductModel from '../models/product.model.js';
import session from  'express-session';


export default class UserController{

    getRegister(req, res) {
        res.render('user-register');
    }

    getLogin(req,res){
        res.render('user-login',{errorMessage:null});
    }

    userRegister(req,res){
        const {name,email,password}=req.body;
        UserModel.add(name,email,password);
        res.render('user-login',{errorMessage:null});
    }

    postLogin(req,res){
        const {email,password}=req.body;
        const user=UserModel.isValidUser(email,password);

        if(!user){
            return res.render('user-login',{errorMessage:'Invalid Credentials'});
        }else{
             req.session.userEmail=email;
             var products=ProductModel.getProducts();            
             return res.render('products',{products,userEmail:req.session.userEmail});
        }
    }

    getLogout(req,res){

        req.session.destroy((err)=>{
            if(err){
                console.log(err);
            }else{
               // alert("You have been logged out");
                res.redirect("/login");
            }
        });

        //clearing cookie or deleting cookie
        res.clearCookie('lastVisit');
    }
}