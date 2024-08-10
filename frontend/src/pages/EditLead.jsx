import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Button,
  Card,
  Container,
  Form,
  Row,
  Col
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

function EditarLead() {
  const navigate = useNavigate();
  const { id } = useParams();
  
  const [formValue, setFormValue] = useState({
    id: '',
    nome: '',
    data_nascimento: '',
    genero: '',
    nacionalidade: '',
    data_criacao: '',
    data_atualizacao: ''
  });

  useEffect(() => {
    const getLead = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/leads/${id}`);
        const data = response.data;
        
        // Convert ISO date to YYYY-MM-DD format
        const formattedDate = data.data_nascimento
          ? new Date(data.data_nascimento).toISOString().split('T')[0]
          : '';
        
        setFormValue({
          ...data,
          data_nascimento: formattedDate
        });
      } catch (error) {
        console.error('Erro ao obter dados:', error);
      }
    };

    getLead();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const formattedDate = formValue.data_nascimento
          ? new Date(formValue.data_nascimento).toISOString()
          : '';
        
        await axios.patch(`http://localhost:3000/leads/${formValue.id}`, {
          ...formValue,
          data_nascimento: formattedDate
        });
        toast.success("Lead atualizado com sucesso!");
        navigate("/view-data");
      
    } catch (error) {
      console.error('Erro ao atualizar o lead', error);
      toast.error("Erro ao atualizar o lead.");
    }
  };

  return (
    <Container fluid className="min-vh-100 d-flex justify-content-center align-items-center">
      <Row className="w-100 d-flex justify-content-center">
        <Col md={8} lg={6}>
          <Card className="border-0 shadow-sm">
            <Card.Body>
              <Card.Title className="mb-4">Editar Lead</Card.Title>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Nome</Form.Label>
                  <Form.Control
                    type="text"
                    name="nome"
                    value={formValue.nome}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Data de Nascimento</Form.Label>
                  <Form.Control
                    type="date"
                    name="data_nascimento"
                    value={formValue.data_nascimento}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Gênero</Form.Label>
                  <Form.Control
                    type="text"
                    name="genero"
                    value={formValue.genero}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Nacionalidade</Form.Label>
                  <Form.Control
                    type="text"
                    name="nacionalidade"
                    value={formValue.nacionalidade}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Button
                  variant="primary"
                  type="submit"
                  
                >
                  Editar
                </Button>
              </Form>
              <Button
                variant="secondary"
                className="mt-3"
                onClick={() => navigate("/view-data")}
              >
                Voltar
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default EditarLead;
