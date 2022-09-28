const getAllJobs = (req, res) => {
  res.send("Get All Jobs!");
};

const getJob = (req, res) => {
  res.send("Get Single Job!");
};

const createJob = (req, res) => {
  res.send("Create Job!");
};

const updateJob = (req, res) => {
  res.send("Update Job!");
};

const deletejob = (req, res) => {
  res.send("Delete Job!");
};

module.exports = {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deletejob,
};
