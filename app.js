const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.urlencoded({extended:false}))
app.use(express.json())

mongoose.connect('mongodb+srv://kirtan_14:Kirtanjain1234@cluster-kirtan.bw7og2l.mongodb.net/sample?retryWrites=true&w=majority').then(()=>{
  console.log("Connected with Mongodb")
}).catch((err)=>{
  console.log(err)
})


const productSchema = new mongoose.Schema({
  name:String,
  description:String,
  price:Number
});

const Product = new mongoose.model('Product', productSchema);


// main route
app.get('/', async (req, res) => {
  res.json({working:true});
})

// Create Product
app.post('/api/v1/product/new', async (req, res) => {
  const product = await Product.create(req.body)

  res.status(200).json({
    success:true,
    product
  })
})

// Read Products
app.get('/api/v1/products', async (req, res) => {
  const products = await Product.find();

  res.status(200).json({
    success:true,
    products
  })
})

// Update Product
app.put('/api/v1/product/:id', async (req, res) => {
  let product = await Product.findById(req.params.id);

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    useFindAndModify: false, 
    useValidators: true
  })

  res.status(200).json({
    success:true,
    product
  })
})


app.listen(4000, ()=>{
  console.log("Server is running on http://localhost:4000");
})