import React, { useEffect, useState } from 'react'; // importing states
import axios from 'axios'; // for handling http request
//import './style/APP.CSS'; // Import custom CSS

const JobList = () => {
  const [jobs, setJobs] = useState([]); // Store all jobs
  const [filteredJobs, setFilteredJobs] = useState([]); // Store filtered jobs
  const [searchTerm, setSearchTerm] = useState(''); // Store search term
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/jobs'); // Use full URL for testing
        console.log('Fetched jobs:', response.data); // Log the fetched jobs
        setJobs(response.data); // Set all jobs
        setFilteredJobs(response.data); // Set filtered jobs initially to all jobs
      } catch (error) {
        console.error('Error fetching jobs:', error);
        setError('Failed to fetch jobs. Please try again later.');
      }
    };
    fetchJobs();
  }, []);

  // Handle search input change
  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
  
    const filtered = jobs.filter(job =>
      (job.title && job.title.toLowerCase().includes(value.toLowerCase())) ||
      (job.description && job.description.toLowerCase().includes(value.toLowerCase())) ||
      (job.location && job.location.toLowerCase().includes(value.toLowerCase()))
    );
  
    console.log('Filtered Jobs:', filtered); // Log filtered jobs
    setFilteredJobs(filtered);
  };

  // Handle job posting
  const handleJobPost = async (newJob) => {
    try {
      const response = await axios.post('http://localhost:5000/api/jobs', newJob);
      setJobs([...jobs, response.data]); // Update local state with the new job
      setFilteredJobs([...filteredJobs, response.data]); // Optionally update filtered jobs
    } catch (error) {
      console.error('Error posting job:', error);
      setError('Failed to post job. Please try again later.');
    }
  };

  return (
    <div className="job-list-container"> {/* Apply container style */}
      <h1>Job Listings</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}
      <input
        type="text"
        placeholder="Search jobs..."
        value={searchTerm}
        onChange={handleSearchChange} // Handle search input change
        className="search-input" // Apply input styling
      />
      <ul>
        {filteredJobs.length > 0 ? (
          filteredJobs.map(job => (
            <li key={job._id} className="job-item"> {/* Apply job item style */}
              <h2>{job.title}</h2>
              <p>{job.description}</p>
              <p>{job.location}</p>
            </li>
          ))
        ) : (
          <p>No jobs available.</p> // Message if no jobs are found
        )}
      </ul>
      {/* Job post form */}
      <form onSubmit={(e) => {
        e.preventDefault();
        const newJob = {
          title: e.target.title.value,
          description: e.target.description.value,
          location: e.target.location.value,
        };
        handleJobPost(newJob);
        e.target.reset(); // Clear the form
      }} className="post-job-form"> {/* Apply form styling */}
        <input name="title" placeholder="Job Title" required className="input-field" />
        <input name="description" placeholder="Job Description" required className="input-field" />
        <input name="location" placeholder="Job Location" required className="input-field" />
        <button type="submit" className="submit-button">Post Job</button> {/* Apply button styling */}
      </form>
    </div>
  );
};

export default JobList;
