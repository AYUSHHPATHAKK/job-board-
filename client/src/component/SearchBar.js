import React from 'react';

const SearchBar = ({ setFilteredJobs, jobs }) => {
  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    const filtered = jobs.filter(job =>
      job.title.toLowerCase().includes(query) || 
      job.description.toLowerCase().includes(query)
    );
    setFilteredJobs(filtered);
  };

  return (
    <div>
      <input type="text" placeholder="Search for jobs..." onChange={handleSearch} />
    </div>
  );
};

export default SearchBar;
