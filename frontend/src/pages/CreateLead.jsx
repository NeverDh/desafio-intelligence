import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

function CreateLead() {
  const navigate = useNavigate();

  const [formValue, setFormValue] = useState({
    nome: '',
    data_nascimento: '',
    genero: '',
    nacionalidade: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  const validateDate = (date) => {
    const [year, month, day] = date.split('-').map(Number);
    if (year < 1900 || year > new Date().getFullYear()) {
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formattedDate = formValue.data_nascimento
      ? new Date(formValue.data_nascimento).toISOString()
      : '';

    if (!validateDate(formValue.data_nascimento)) {
      toast.error("Data de nascimento inválida. Certifique-se de que o ano está entre 1900 e o ano atual.");
      return;
    }

    try {
      await axios.post('http://localhost:3000/leads', {
        ...formValue,
        data_nascimento: formattedDate
      });
      toast.success("Lead criado com sucesso!");
      navigate("/view-data");
    } catch (error) {
      console.error('Erro ao criar o lead', error);
      toast.error("Erro ao criar o lead.");
    }
  };

  return (
    <Container fluid className="min-vh-100 d-flex justify-content-center align-items-center">
      <Row className="w-100 d-flex justify-content-center">
        <Col md={8} lg={6}>
          <Card className="border-0 shadow-sm">
            <Card.Body>
              <Card.Title className="mb-4">Criar Novo Lead</Card.Title>
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
                  Criar
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

export default CreateLead;
