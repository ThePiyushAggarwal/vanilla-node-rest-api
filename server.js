const http = require('http')
const { getProducts, getProduct } = require('./controllers/productController')

const server = http.createServer((req, res) => {
  if (req.url === '/api/products' && req.method === 'GET') {
    getProducts(req, res)
  } else if (
    req.url.match(/\/api\/product\/([0-9]+)/) &&
    req.method === 'GET'
  ) {
    const id = req.url.split('/')[3]
    getProduct(req, res, id)
  } else {
    res.writeHead(404, { 'Content-Type': 'text/html' })
    res.end(JSON.stringify({ message: 'not found' }))
  }
})

const PORT = process.env.PORT || 5000

server.listen(PORT, () => console.log('server running'))