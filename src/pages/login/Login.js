import React, { useRef } from "react";
import { Form, Button, Row, Container, Col } from "react-bootstrap";
import { useAuth } from '../../contexts/AuthContext';

function Login() {

  const emailRef = useRef();
  const passwordRef = useRef();

  const { login, currentUser } = useAuth()
  console.log(currentUser);

  async function handleSubmit(e) {
    e.preventDefault()
    login(emailRef.current.value, passwordRef.current.value)


    try {
      await login(emailRef.current.value, passwordRef.current.value)
      
    } catch(error) {
      console.log(error.message);
      alert('Failed to sign in')
    }

  }

  return (
    <>
      <Container>
        <Row className="justify-content-md-center my-4">
          <Col xs="12" md="10">
            <h2>Sign In</h2>
            <Form>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="text" placeholder="Enter email" required ref={emailRef} />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" ref={passwordRef} />
              </Form.Group>
              <Form.Group controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
              </Form.Group>
              <Button variant="primary" type="submit" onClick={handleSubmit}>
                Login
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Login;