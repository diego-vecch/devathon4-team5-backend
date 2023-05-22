const express = require('express')
const ratingsController = require('../../controllers/ratingsController')
const { ratingValidator } = require('../../middlewares/validators')

const { tokenValidator } = require('../../middlewares/tokenValidator')

const ratingsRouter = express.Router()

/**
 * @swagger
 * /api/v1/ratings/create:
 *   post:
 *     summary: Create a new rating
 *     description: Endpoint to create a new rating.
 *     parameters:
 *       - name: rating
 *         in: body
 *         description: Rating object
 *         required: false
 *         schema:
 *           type: object
 *           properties:
 *             placeId:
 *               type: string
 *             rating:
 *               type: number
 *             comment:
 *               type: string
 *             user:
 *               type: string
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 */


ratingsRouter.route('/create').post(tokenValidator, ratingValidator, ratingsController.ratingsCreate)
/**
 * @swagger
 * /api/v1/ratings/update/:id:
 *   put:
 *     summary: Create a new rating
 *     description: Endpoint to create a new rating.
 *     parameters:
 *       - name: rating
 *         in: body
 *         description: Rating object
 *         required: false
 *         schema:
 *           type: object
 *           properties:
 *             placeId:
 *               type: string
 *             rating:
 *               type: number
 *             comment:
 *               type: string
 *             user:
 *               type: string
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 */
ratingsRouter.route('/update/:id').patch(tokenValidator, ratingsController.ratingsUpdate)

module.exports = ratingsRouter
