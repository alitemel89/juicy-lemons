import React, { useRef } from "react";
import { Form, Button, Row, Container, Col } from "react-bootstrap";
import { FcGoogle } from "@react-icons/all-files/fc/FcGoogle";
import { signInWithGoogle } from "../../utils/FirebaseUtils";
import { useAuth } from "../../contexts/AuthContext";

function Register() {
  const userNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      alert("Passwords do not match");
      return;
    }

    try {
      await signup(emailRef.current.value, passwordRef.current.value);
    } catch (error) {
      console.log(error.message);
    }
  }
  
  return (
    <>
      <Container>
        <Row className="justify-content-md-center my-4">
          <Col xs="12" md="10">
            <h2>Register</h2>
            <Form>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Username"
                  required
                  ref={userNameRef}
                />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Email"
                  required
                  ref={emailRef}
                />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  required
                  ref={passwordRef}
                />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm Password"
                  required
                  ref={passwordConfirmRef}
                />
              </Form.Group>
              <Form.Group className="d-flex flex-nowrap">
                <Button variant="primary" type="submit" onClick={handleSubmit}>
                  Sign up
                </Button>
                <Button
                  className="btn btn-dark border-primary ml-1"
                  onClick={() => signInWithGoogle()}
                >
                  Sign up with Google <FcGoogle className="mb-1" />
                </Button>
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Register;
