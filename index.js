import  express from  'express';
import path from 'path';
import ejsLayouts from 'express-ejs-layouts';
import UserController  from './src/controller/user.controller.js';
import ProductController  from './src/Controller/product.controller.js';
import validateRequest from './src/middleware/validation.middleware.js';
import { uploadfile } from './src/middleware/file-upload-middleware.js';
import session from  'express-session' ;
import auth from './src/middleware/auth.middleware.js'
import { setLastVisit } from './src/middleware/lastVisited.middleware.js';
import cookieParser from 'cookie-parser';


const server=express();

server.use(cookieParser());

server.use(session({
    secret:'SecretKey',
    resave:false,
    saveUninitialized:true,
    cookie:{
        secure:false
    },
}));


//serving static file
server.use(express.static('public'));

//parse form data
server.use(express.urlencoded({extended:true}));

//set up view engine and layout
server.set('view engine','ejs');
server.set('views' ,path.join(path.resolve(),'src','views'));  

//setting express-ejs-layouts for rendering views  acts as a middleware
server.use(ejsLayouts);

//creating instance of postcontroller
const  productcontroller=new ProductController();
const userController=new UserController();

server.get('/register',userController.getRegister);
server.get('/login',userController.getLogin);

server.post('/register',userController.userRegister);
server.post('/login',userController.postLogin);
server.get("/logout",userController.getLogout);




server.get('/',setLastVisit,auth,productcontroller.getProducts);
server.get('/new',auth,productcontroller.getAddForm);
server.get('/update/:id',auth,productcontroller.getUpdateProduct);

server.post('/delete/:id',auth,productcontroller.deleteProduct);
server.post('/',auth,uploadfile.single('imageURL'),validateRequest,productcontroller.addNewProduct);
server.post('/update-product/',auth,productcontroller.updateProduct);

server.use(express.static('src/views'))
server.listen(3000);
console.log("server is running on 3000");