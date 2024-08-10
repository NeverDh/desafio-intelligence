import React, { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { context } from '../context/AuthPrivateContext';
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Login = () => {
    const api = require('../api/login')
    //const {authenticated, handleLogin}= useContext(context);
  const navigate = useNavigate();
  
  const [formValue, setFormValue] = useState({
    login: '',
    password: ''
  });

  

  const handleSubmit = async (values) => {
    try{
      values.preventDefault();
      const result = await api.login(formValue);
      
      if(result){
        toast.success("Logado com sucesso!")
      } navigate("/home")

    }catch(e) {
      toast.error(e)
    }
  }

  const onChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  const onBlur = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

    return (
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
  
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    );
  }

export default Login;
