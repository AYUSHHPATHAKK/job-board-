
import React, { useState } from 'react';
import JobList from './component/JobList';
import SearchBar from './component/SearchBar';

//import JobPostForm from './component/JobPostForm';

function App() {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);

  return (
    <div className="App">
      <SearchBar setFilteredJobs={setFilteredJobs} jobs={jobs} />
      <JobList jobs={filteredJobs} setJobs={setJobs} />
    </div>
  );
}

export default App;
