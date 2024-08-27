 const  auth=(req,res,next)=>{

    //if session object is available  then call the next middleware function otherwise redirect  to login page.
    if(req.session.userEmail){
        next();
    }else{
        res.redirect('/login');
    }
};

export default auth;