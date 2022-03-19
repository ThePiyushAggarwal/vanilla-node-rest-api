const Product = require('../models/productModel')

// @desc Gets All Products
// @route GET /api/products
const getProducts = async (req, res) => {
  try {
    const products = await Product.findAll()
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify(products))
  } catch (error) {
    console.log(error)
  }
}

// @desc Gets Single Product
// @route GET /api/products/:id
const getProduct = async (req, res, id) => {
  try {
    const product = await Product.findById(id)
    if (!product) {
      res.writeHead(404, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ message: 'product not found' }))
    } else {
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end()
    }
  } catch (error) {
    console.log(error)
  }
}

// @desc Create a Product
// @route POST /api/products
const createProduct = async (req, res) => {
  try {
    const product = {
      title: 'Test Product',
      description: 'This is my product',
      price: 100,
    }

    const newProduct = await Product.create(product)
    res.writeHead(201, { 'Content-Type': 'application/json' })
    return res.end(JSON.stringify(newProduct))
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  getProducts,
  getProduct,
  createProduct,
}
