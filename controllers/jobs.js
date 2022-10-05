const Job = require('../models/Job')
const { StatusCodes } = require('http-status-codes')
const { NotFoundError } = require('../errors')

const getAllJobs = async (req, res) => {
  const jobs = await Job.find({ createdBy: req.user.userId }).sort('-createdAt')
  res.status(StatusCodes.OK).json({ jobs, count: jobs.length })
}

const getJob = async (req, res) => {
  const {
    user: { userId },
    params: { id: jobId }
  } = req
  const job = await Job.findOne({ _id: jobId, createdBy: userId })
  if (!job) {
    throw new NotFoundError(`No job found with id: ${jobId}.`)
  }
  res.status(StatusCodes.OK).json(job)
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
