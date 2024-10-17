// This is use to import modules

const express = require("express");
const app = express();
const UserModel = require("./Schemas/User");
const ProductsSchema = require("./Schemas/ProductSchema");
const cors = require("cors");
const mongooseConnection = require("./mongooseConnection/mongoDBConnection");

// This line of code is to connect with MongoDB
mongooseConnection();


// JWT Taken
const JWT = require('jsonwebtoken');
const jwtKey = 'e-commerce';

// This is use to for body
app.use(express.json());

// MiddleWares
app.use(cors());

function verifyToken(req,res,next){

  let token = req.headers['authorization']
  if(token){
    token = token.split(' ')[1];
    JWT.verify(token, jwtKey, (error, valid)=>{
      if(error){
        res.status(403).send({result:"Please enter valid token"})
      }else{
        next();
      }
    })
  }else{
    res.status(403).send({result:"Please add token with header"})
  }
}

// Schema variables
const UserSchemaModel = UserModel;
const ProductsSchemaModel =ProductsSchema;

// These are the API Routes

app.post("/register", async (req, res) => {
  let newUser = new UserSchemaModel(req.body);
  let result = await newUser.save();
  result = result.toObject();
  delete result.password;

  if(result){
    JWT.sign({result},jwtKey, (err, token)=>{
      if(err){
        res.send({result:"Invalid User"})
      }else{
        res.send({result, auth:token})
      }
    })
  }else{
    res.send({result:"Sorry"})
  }
});

app.post("/login", async (req, res) => {
  if (req.body.email && req.body.password) {
    let user = await UserSchemaModel.findOne(req.body).select("-password");
    if (user) {
      JWT.sign({user},jwtKey,(err, token)=>{
        if(err){
          res.send({result:"No user Found"})
        }else{
          res.send({user, auth:token});
        }
      })
    } else {
      res.send({ result: "No user found" });
    }
  } else {
    res.send({ result: "No user found" });
  }
});


// These are the API Routes for Products

app.post('/addProducts', verifyToken, async(req,res)=>{

  let addProducts = new ProductsSchemaModel(req.body);
  let result = await addProducts.save();
  res.send(result);
});

app.get('/fetchProducts/:userId', verifyToken, async(req,res)=>{
  let fetchProduct = await ProductsSchemaModel.find(req.params);
  if(fetchProduct.length > 0){
    res.send(fetchProduct);
  }else{
    res.send({result:"No data found!"})
  }
  
});

app.get('/getProduct',verifyToken, async(req,res)=>{
  let fetchProduct = await ProductsSchemaModel.find();
  if(fetchProduct.length > 0){
    res.send(fetchProduct);
  }else{
    res.send({result:"No data found!"})
  }
  
});

app.delete('/deleteProducts/:id',verifyToken,async(req,res)=>{
  let deleteProduct = await ProductsSchemaModel.deleteOne({_id:req.params.id});
  res.send(deleteProduct);
})

app.get('/Products/:id',verifyToken,async(req,res)=>{

  let results = await ProductsSchemaModel.findOne({_id: req.params.id});
  if(results){
    res.send(results);
  }else if(results._id.length < 24){
    res.send("not found")
  }
});

app.put('/updateProducts/:id', verifyToken,async(req, res)=>{
  let updateProducts = await ProductsSchemaModel.updateOne({_id:req.params.id},{$set:req.body});
  if(updateProducts){
    res.send(updateProducts)
  }
});


app.get('/search/:key', verifyToken, async(req,res)=>{
  let result = await ProductsSchemaModel.find({
    "$or":[
      {name:{$regex:req.params.key}},
      {category:{$regex:req.params.key}},
      {company:{$regex:req.params.key}}
    ]
  });

    res.send(result);
})

app.listen(5000);
