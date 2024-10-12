const express = require('express');
const router = express.Router();
const { getJobs, createJob } = require('../controllers/jobController');

// Route to get all jobs
router.get('/jobs', getJobs);

// Route to create a new job
router.post('/jobs', createJob);

module.exports = router;
