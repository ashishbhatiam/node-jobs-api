const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')

const register = async (req, res) => {
  const user = await User.create({ ...req.body })
  const token = user.createJwt()
  res
    .status(StatusCodes.CREATED)
    .json({ user: { id: user._id, name: user.name }, token })
}

const login = async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    throw new BadRequestError('Please provide email and password')
  }
  const user = await User.findOne({ email })
  if (!user) {
    throw new NotFoundError('You are not registered with us. Please sign up.')
  }

  const isPasswordCorrect = await user.comparePassword(password)
  if (!isPasswordCorrect) {
    throw new NotFoundError('You are not registered with us. Please sign up.')
  }

  const token = user.createJwt()
  res
    .status(StatusCodes.OK)
    .json({ user: { id: user._id, name: user.name }, token })
}

module.exports = {
  register,
  login
}
