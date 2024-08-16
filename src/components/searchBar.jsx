import React from 'react';
// import PropTypes from 'prop-types';

SearchBar.propTypes = {

};

function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <input
        type='text'
        placeholder='Search products...'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ padding: "10px", flex: 0.5 }}
      />
    </div>
  );
}

export default SearchBar;