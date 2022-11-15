import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

const Search = ({ onSearchChange, placeholder, className }) => {
  const [input, setInput] = useState('');
  const handleChange = event => {
    setInput(event.target.value);
    onSearchChange(event.target.value);
  };

  return (
    <div className={`search ${className} w-100`}>
      <InputGroup>
        <Form.Control
          type="text"
          className="searchInput"
          placeholder={placeholder}
          value={input}
          onChange={handleChange}
        />
      </InputGroup>
    </div>
  );
};

export default Search;