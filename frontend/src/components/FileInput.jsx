import React from 'react';
import './FileInput.css';

const FileInput = ({ onFileChange, style }) => {
  const handleChange = (event) => {
    const file = event.target.files?.[0] || null;
    onFileChange(file);
  };

  return (
    <label className="file-input-wrapper">
      <input
        type="file"
        accept=".csv"
        onChange={handleChange}
 
      />
    </label>
  );
};

export default FileInput;
