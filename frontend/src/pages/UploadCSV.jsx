import React, {useState} from 'react';
  import FileInput from '../components/FileInput';
import axios from 'axios';
import { Container, Button, Row, Col } from 'react-bootstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';


  
const UploadCSV = () => {

  
  const navigate = useNavigate();
    const [selectedFile, setSelectedFile] = useState(null);
  
    const handleFileChange = (file) => {
      setSelectedFile(file);
    };
  
    const handleUpload = async () => {
      if (!selectedFile) {
        toast.error('Nenhum arquivo selecionado.');
        return;
      }
  
      const formData = new FormData();
      formData.append('file', selectedFile);
  
      try {
        const response = await axios.post('http://localhost:3000/csv-bull', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
  
        if (response.status === 201) {
            toast.success('Arquivo enviado com sucesso!');
          console.log('Arquivo enviado com sucesso!');
          navigate('/view-data');
        } else {
            toast.error('Erro ao enviar arquivo.');
            console.log('Erro ao enviar arquivo.');
        }
      } catch (error) {
        toast.error('Erro ao enviar arquivo.');
        console.error('Erro:', error);
      }
    };
  
    return (
      <Container className="mt-4 d-flex text-center justify-content-center align-itens-center flex-column"
      style={{height:'90vh'}}
      >
        <div className='m-3'
        style={{width:'40%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', alignSelf: 'center', justifySelf: 'center'}}
        >
        <h1>Upload de Arquivo CSV</h1>
        <FileInput variant='primary' onFileChange={handleFileChange} className='m-3 btn btn-outline-primary' />
          <button variant='primary' onClick={handleUpload} className='m-3 btn btn-outline-primary'
          style={{alignSelf: 'center', justifySelf: 'center'}}
          >Enviar Arquivo</button>
          <button variant='secondary' onClick={() => {navigate('/home')}} className='m-3 btn btn-outline-secondary'
          style={{alignSelf: 'center', justifySelf: 'center'}}
          >Voltar</button>
        </div>
      </Container>
    );
  };

export default UploadCSV;
