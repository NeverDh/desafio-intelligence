import React, { useState } from 'react';
import FileInput from './components/FileInput';
import axios from 'axios';
import {
  CheckIcon
} from '@heroicons/react/20/solid'

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
      console.log(response);
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
      <div className=' flex justify-center align-middle bg-orange-700 h-screen flex-col'>
        <div className='w-max self-center flex h-10'>
          <FileInput onFileChange={handleFileChange} />
          <button
            onClick={handleUpload}
            type="button"
            className="inline-flex items-center rounded-md bg-indigo-600 m-1 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
              <CheckIcon aria-hidden="true" className="-ml-0.5 mr-1.5 h-5 w-5" />
              Enviar
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
