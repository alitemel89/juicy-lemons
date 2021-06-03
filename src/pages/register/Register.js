import React from "react";
import { Form, Button, Row, Container, Col } from "react-bootstrap";
import { FcGoogle } from "@react-icons/all-files/fc/FcGoogle";

function Register() {
  return (
    <>
      <Container>
        <Row className="justify-content-md-center my-4">
          <Col xs="12" md="10">
            <h2>Register</h2>
            <Form>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Username</Form.Label>
                <Form.Control type="username" placeholder="Username" />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter Email" />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control type="password" placeholder="Confirm Password" />
              </Form.Group>
              <Form.Group className="d-flex flex-nowrap">
                <Button variant="primary" type="submit">
                  Sign up
                </Button>
                <Button
                  className="btn btn-dark border-primary ml-1"
                  type="submit"
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
