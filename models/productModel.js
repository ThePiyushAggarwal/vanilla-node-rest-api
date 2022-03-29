const products = require('../data/products.json')
const { v4: uuidv4 } = require('uuid')
const { writeDataToFile } = require('../utils')

const findAll = () => {
  return new Promise((resolve, reject) => {
    resolve(products)
  })
}

const findById = (id) => {
  return new Promise((resolve, reject) => {
    const product = products.find((p) => p.id === id)
    resolve(product)
  })
}

const create = (product) => {
  return new Promise((resolve, reject) => {
    const newProduct = { id: uuidv4(), ...product }
    products.push(newProduct)
    writeDataToFile('./data/products.json', products)
    resolve(newProduct)
  })
}

const update = (id, product) => {
  return new Promise((resolve, reject) => {
    const index = products.findIndex((p) => p.id === id)
    products[index] = { id, ...product }
    writeDataToFile('./data/products.json', products)
    resolve(products[index])
  })
}

const deleteIt = (id) => {
  return new Promise((resolve, reject) => {
    const neww = products.filter((p) => p.id !== id)
    writeDataToFile('./data/products.json', neww)
    resolve(neww)
  })
}

module.exports = {
  findAll,
  findById,
  create,
  update,
  deleteIt,
}
