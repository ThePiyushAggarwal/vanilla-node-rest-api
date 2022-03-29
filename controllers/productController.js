const Product = require('../models/productModel')
const { getPostData } = require('../utils')

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
      res.end(JSON.stringify(product))
    }
  } catch (error) {
    console.log(error)
  }
}

// @desc Create a Product
// @route POST /api/products
const createProduct = async (req, res) => {
  try {
    const body = await getPostData(req)
    const { title, description, price } = JSON.parse(body)
    const product = {
      title,
      description,
      price,
    }
    const newProduct = await Product.create(product)

    res.writeHead(201, { 'Content-Type': 'application/json' })
    return res.end(JSON.stringify(newProduct))
  } catch (error) {
    console.log(error)
  }
}

// @desc Update a Product
// @route PUT /api/products/:id
const updateProduct = async (req, res, id) => {
  try {
    const product = await Product.findById(id)

    if (!product) {
      res.writeHead(404, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ message: 'product not found' }))
    } else {
      const body = await getPostData(req)

      const { title, description, price } = JSON.parse(body)

      const productData = {
        title: title || product.title,
        description: description || product.description,
        price: price || product.price,
      }

      const updProduct = await Product.update(id, productData)

      res.writeHead(200, { 'Content-Type': 'application/json' })
      return res.end(JSON.stringify(updProduct))
    }
  } catch (error) {
    console.log(error)
  }
}

// @desc Delete a Product
// @route DELETE /api/products/:id
const deleteProduct = async (req, res, id) => {
  try {
    const product = await Product.findById(id)

    if (!product) {
      res.writeHead(500, { 'Content-type': 'application/json' })
      res.end(JSON.stringify({ message: 'product not found' }))
    } else {
      const products = await Product.deleteIt(id)

      res.writeHead(500, { 'Content-Type': 'application/json' })
      return res.end(JSON.stringify(products))
    }
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
}
