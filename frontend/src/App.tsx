import React, { useState } from 'react';
import './App.css';
import FileInput from './components/FileInput';
import axios from 'axios';

const App: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);

  const handleFileChange = (file: File | null) => {
    setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setUploadStatus('Nenhum arquivo selecionado.');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await axios.post(
        'http://localhost:3000/csv-bull',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      console.log(response.status);
      if (response.status === 201) {
        console.log('Arquivo enviado com sucesso!');
        setUploadStatus('Arquivo enviado com sucesso!');
      } else {
        console.log('Erro ao enviar arquivo.');
      }
    } catch (error) {
      setUploadStatus('Erro ao enviar arquivo.');
      console.error('Erro:', error);
    }
  };

  return (
    <div className="App">
      <h1>Upload de Arquivo CSV</h1>
      <FileInput onFileChange={handleFileChange} />
      <button onClick={handleUpload}>Enviar Arquivo</button>
      {uploadStatus && <p>{uploadStatus}</p>}
    </div>
  );
};

export default App;
