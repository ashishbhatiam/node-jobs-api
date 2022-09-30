const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const jwt = require('jsonwebtoken')

const register = async (req, res) => {
  const user = await User.create({ ...req.body })
  const token = jwt.sign(
    { userId: user._id, name: user.name },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_OPT_EXPIRES_IN
    }
  )
  res
    .status(StatusCodes.CREATED)
    .json({ user: { id: user._id, name: user.name }, token })
}

const login = (req, res) => {
  res.send('Login User!')
}

module.exports = {
  register,
  login
}
