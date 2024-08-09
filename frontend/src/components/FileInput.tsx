import React, { ChangeEvent } from 'react';

interface FileInputProps {
  onFileChange: (file: File | null) => void;
}

const FileInput: React.FC<FileInputProps> = ({ onFileChange }) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    onFileChange(file);
  };

  return (
    <input
      type="file"
      accept=".csv" 
      onChange={handleChange}
    />
  );
};

export default FileInput;
