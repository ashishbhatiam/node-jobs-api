const Job = require('../models/Job')
const { StatusCodes } = require('http-status-codes')

const getAllJobs = (req, res) => {
  res.send('Get All Jobs!')
}

const getJob = (req, res) => {
  res.send('Get Single Job!')
}

const createJob = async (req, res) => {
  req.body.createdBy = req.user.userId
  const job = await Job.create(req.body)
  res.status(StatusCodes.CREATED).json(job)
}

const updateJob = (req, res) => {
  res.send('Update Job!')
}

const deletejob = (req, res) => {
  res.send('Delete Job!')
}

module.exports = {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deletejob
}
