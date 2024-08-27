import {body,validationResult}  from 'express-validator';

const validateRequest=async (req,res,next)=>{
    
    //express-validator

    // 1.Setup Rules for every  field in the request body
    const rules=[
        body('name').notEmpty().withMessage("The name shpuld not be empty"),
        body('desc').isLength({min:10}).withMessage("Description should have at least 10 characters"),
        body('price').isNumeric().isFloat({gte:0}).withMessage('Price must be a number'),
        body('imageURL').custom((value,{req})=>{
            if(!req.file){
                throw  new Error('Image is required');
            }else{
                return true;
            }
        })   
    ];

    //run the rules
    await  Promise.all(rules.map(rule=> rule.run(req)));

   //2. After all validation checks
   var errors = validationResult(req);

   if(!errors.isEmpty()){
    return res.render( 'new-product',{errors: errors.array()} );     
   }
    next();
      
}

export default validateRequest;