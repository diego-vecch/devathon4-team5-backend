const express = require('express')
const mapsController = require('../../controllers/mapsController')

// const { tokenValidator } = require('../../middlewares/tokenValidator')

const mapsRouter = express.Router()
/**
 * @swagger
 * /api/v1/maps/autocomplete:
 *   post:
 *     description: Complete a location
 *     parameters:
 *       - name: autocomplete
 *         in: query
 *         description: Name of the location
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             input:
 *               type: string
 *     responses:
 *       '200':
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: string
 */


mapsRouter.route('/autocomplete').post(mapsController.autocomplete)

module.exports = mapsRouter
