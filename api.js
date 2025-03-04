const path = require('path')
const Products = require('./products')
const Orders = require('./orders')
const autoCatch = require('./lib/auto-catch')

/**
@@ -50,36 +51,63 @@ async function getProduct(req, res, next) {
 * @param {object} res 
 */
async function createProduct(req, res) {
  console.log('request body:', req.body)
  res.json(req.body)
  const product = await Products.create(req.body)
  res.json(product)
}

/**
 * Edit a product
 * @param {object} req
 * @param {object} res
 * @param {function} next
 */
async function editProduct(req, res, next) {
  console.log(req.body)
  res.json(req.body)
async function editProduct (req, res, next) {
  const change = req.body
  const product = await Products.edit(req.params.id, change)
  res.json(product)
}

/**
 * Delete a product
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
async function deleteProduct(req, res, next) {
  res.json({ success: true })
async function deleteProduct (req, res, next) {
  const response = await Products.destroy(req.params.id)
  res.json(response)
}

async function createOrder (req, res, next) {
  const order = await Orders.create(req.body)
  res.json(order)
}

async function listOrders (req, res, next) {
  const { offset = 0, limit = 25, productId, status } = req.query

  const orders = await Orders.list({ 
    offset: Number(offset), 
    limit: Number(limit),
    productId, 
    status 
  })

  res.json(orders)
}

async function editOrder(req, res, next) {
  const { id } = req.params;
  const changes = req.body;
  const updatedOrder = await Orders.edit(id, changes);
  res.json(updatedOrder);
}

async function deleteOrder(req, res, next) {
  const response = await Orders.destroy(req.params.id);
  res.json(response);
}



module.exports = autoCatch({
  handleRoot,
  listProducts,
  getProduct,
  createProduct,
  editProduct,
  deleteProduct
  deleteProduct,
  createOrder,
  listOrders,
  editOrder,
  deleteOrder

});