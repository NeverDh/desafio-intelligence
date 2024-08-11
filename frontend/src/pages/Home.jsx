import React, {useContext} from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { context } from '../context/AuthPrivateContext';

const Home = () => {
  const navigate = useNavigate();
  const { authenticated, handleLogout } = useContext(context);

  const handleUploadLeads = () => {
    navigate('/upload-csv');
  };

  const handleListLeads = () => {
    navigate('/view-data');
  };

  const handleCreateLeads = () => {
    navigate('/create-lead');
  };

  const handleHistoryLeads = () => {
    navigate('/history-lead');
  };

  return (
    <Container className="mt-4">
        
      <Row className="d-flex justify-content-center align-itens-center" style={{height:'90vh'}}>
        <Col md={4} className="text-center d-flex flex-column justify-content-center align-itens-center"> 
          <button 
                      className="w-100 mb-3 btn btn-outline-primary"
            style={{height:'10%'}}          
            onClick={handleUploadLeads}
          >
            Upload leads
          </button>
          <button 
                   className="w-100 btn mb-3 btn-outline-primary" 
                      style={{height:'10%'}}
            onClick={handleCreateLeads}
          >
            Criar leads
          </button>
          <button 
                   className="w-100 btn mb-3 btn-outline-primary" 
                      style={{height:'10%'}}
            onClick={handleListLeads}
          >
            Listar leads
          </button>

          <button 
                   className="w-100 btn mb-3 btn-outline-primary" 
                      style={{height:'10%'}}
            onClick={handleHistoryLeads}
          >
            Histórico leads
          </button>

          <button 
                   className="w-100 btn mb-3 btn-outline-dark" 
                      style={{height:'10%'}}
            onClick={handleLogout}
          >
            Sair
          </button>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
