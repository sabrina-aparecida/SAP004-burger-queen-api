import OrderService from '../services/OrderService'
import Util from '../utils/Utils'

const util = new Util()

class OrderController {
  static async getAllOrders(req, res) {
    try {
      const allOrders = await OrderService.getAllOrders()
      if (allOrders.length > 0) {
        util.setSuccess(200, 'Order retrieved', allOrders)
      } else {
        util.setSuccess(200, 'No order found')
      }
      return util.send(res)
    } catch (error) {
      util.setError(400, error)
      return util.send(res)
    }
  }

  static async addOrder(req, res) {
    console.log(req.body.name, req.body.is_alive)
    if (!req.body.name || !req.body.is_alive ) {
      util.setError(400, 'Please provide complete details')
      return util.send(res)
    }
    const newOrder = req.body
    try {
      const createdAuthor = await OrderService.addOrder(newOrder)
      util.setSuccess(201, 'Author Added!', createdAuthor)
      return util.send(res)
    } catch (error) {
      util.setError(400, error.message)
      return util.send(res)
    }
  }

  static async updatedOrder(req, res) {
    const alteredAuthor = req.body
    const { id } = req.params
    if (!Number(id)) {
      util.setError(400, 'Please input a valid numeric value')
      return util.send(res)
    }
    try {
      const updateOrder = await OrderService.updateOrder(id, alteredAuthor)
      if (!updateOrder) {
        util.setError(404, `Cannot find author with the id: ${id}`)
      } else {
        util.setSuccess(200, 'Author updated', updateOrder)
      }
      return util.send(res)
    } catch (error) {
      util.setError(404, error)
      return util.send(res)
    }
  }

  static async getOrder(req, res) {
    const { id } = req.params

    if (!Number(id)) {
      util.setError(400, 'Please input a valid numeric value')
      return util.send(res)
    }

    try {
      const theOrder = await OrderService.getOrder(id)

      if (!theOrder) {
        util.setError(404, `Cannot find Author with the id ${id}`)
      } else {
        util.setSuccess(200, 'Found Author', theOrder)
      }
      return util.send(res)
    } catch (error) {
      util.setError(404, error)
      return util.send(res)
    }
  }

  static async deleteOrder(req, res) {
    const { id } = req.params

    if (!Number(id)) {
      util.setError(400, 'Please provide a numeric value')
      return util.send(res)
    }

    try {
      const orderToDelete = await OrderService.deleteOrder(id)

      if (orderToDelete) {
        util.setSuccess(200, 'Author deleted')
      } else {
        util.setError(404, `Author with the id ${id} cannot be found`)
      }
      return util.send(res)
    } catch (error) {
      util.setError(400, error)
      return util.send(res)
    }
  }
}

export default OrderController