const { body } = require('express-validator')

const registroValidator = [
  body('email').trim().not().isEmpty().withMessage('Email is required')
    .isEmail().normalizeEmail().withMessage('Invalid email'),

  body('name').trim().not().isEmpty().withMessage('Name is required'),

  body('username').trim().not().isEmpty().withMessage('Username is required'),

  body('password').trim().not().isEmpty().withMessage('Password is required')
    .isLength({ min: 6 }).withMessage('Password must have at least 6 characters')
]

const loginValidator = [
  body('email').trim().not().isEmpty().withMessage('Email is required')
    .isEmail().normalizeEmail().withMessage('Invalid email'),

  body('password').trim().not().isEmpty().withMessage('Password is required')
    .isLength({ min: 6 }).withMessage('Password must have at least 6 characters')
]

const modifyUserValidator = [
  body('password').optional({ nullable: true }).isString().withMessage('Invalid password')
    .isLength({ min: 6 }).withMessage('Password must have at least 6 characters'),

  body('name').optional({ nullable: true }).isString().withMessage('Invalid name'),

  body('username').optional({ nullable: true }).isString().withMessage('Invalid username')
]

module.exports = { registroValidator, loginValidator, modifyUserValidator }
