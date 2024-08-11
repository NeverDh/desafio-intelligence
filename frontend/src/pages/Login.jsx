import React, { useState, useContext } from 'react';
import { Toast, ToastContainer, Button, Form, Container, Row, Col, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { context } from '../context/AuthPrivateContext';

function Login() {
  const { authenticated, handleLogin } = useContext(context);
  const [formValue, setFormValue] = useState({
    login: '',
    password: ''
  });
  const [showToast, setShowToast] = useState({ show: false, message: '', type: '' });

  const onChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault(); // Evita o comportamento padrão de recarregar a página
    await handleLogin(formValue);
  };

  return (
    <Container fluid className='vh-100 d-flex align-items-center justify-content-center bg-gradient'>
      <Row className='w-100 justify-content-center'>
        <Col md={6} lg={4}>
          <Card className='text-dark rounded-3'>
            <Card.Body className='d-flex flex-column align-items-center'>
              <h4 className="my-4">Login</h4>
              <Form onSubmit={onSubmit} className='w-100'>
                <Form.Group className='mb-3 text-dark' controlId='login'>
                  <Form.Label className='text-dark'>Login</Form.Label>
                  <Form.Control 
                    type='text'
                    className='text-dark'
                    name='login'
                    value={formValue.login}
                    onChange={onChange}
                    required
                  />
                </Form.Group>
                <Form.Group className='mb-3' controlId='password'>
                  <Form.Label>Senha</Form.Label>
                  <Form.Control 
                    type='password'
                    name='password'
                    value={formValue.password}
                    onChange={onChange}
                    required
                    minLength={3}
                  />
                </Form.Group>
                <Button 
                  type='submit'
                  variant='outline-dark'
                  className='w-100'
                  disabled={formValue.password.length < 3 || formValue.login.length < 1}
                >
                  Login
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <ToastContainer position="top-center" className="p-3">
        <Toast 
          show={showToast.show} 
          onClose={() => setShowToast({ ...showToast, show: false })}
          bg={showToast.type === 'success' ? 'success' : 'danger'}
          className='text-white'
        >
          <Toast.Body>{showToast.message}</Toast.Body>
        </Toast>
      </ToastContainer>
    </Container>
  );
}

export default Login;
