import React from "react";
import { Card, Form, Button, Container, Col, Row } from "react-bootstrap";
import firstSlide from "../../images/firstslide.jpg";
import secondSlide from "../../images/secondslide.jpg";
import thirdSlide from "../../images/thirdslide.jpg";

function Post() {
  return (
    <>
      <Container>
        <Row>
          <Col sm={4}>
            <Card className="shadow m-2">
              <Card.Img
                variant="top"
                src={thirdSlide}
                className="rounded-circle"
                style={imageStyles}
              />

              <Card.Body>
                <Card.Title className="text-center">Ali Temel</Card.Title>
                <Card.Text>
                  This card has supporting text below as a natural lead-in to
                  additional content.{" "}
                </Card.Text>
                <Card.Text>
                  <small className="text-muted">Last updated 3 mins ago</small>
                </Card.Text>
              </Card.Body>
              <Card.Footer>Try Premium for 1 month</Card.Footer>

              <Card.Footer>
                <div className="text-center">
                  <Button className="btn btn-primary">View Profile</Button>
                </div>
              </Card.Footer>
            </Card>
          </Col>
          <Col sm={8}>
            <Card className="shadow m-2">
              <Form className="p-4">
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Label>Hi Ali! What is in your mind?</Form.Label>
                  <Form.Control as="textarea" rows={3} />
                </Form.Group>
                <Button className="btn btn-primary">Share</Button>
                <Button className="btn btn-info ml-2">Upload</Button>
              </Form>
            </Card>

            <Card className="shadow m-2">
              <Card.Img variant="top" src={firstSlide} />
              <Card.Body>
                <Card.Title>Card title</Card.Title>
                <Card.Text>
                  This is a wider card with supporting text below as a natural
                  lead-in to additional content. This content is a little bit
                  longer.
                </Card.Text>
              </Card.Body>
              <Card.Footer>
                <Button className="btn btn-secondary">Go to website</Button>
              </Card.Footer>
            </Card>

            <Card className="shadow m-2 mb-4">
              <Card.Img variant="top" src={secondSlide} />
              <Card.Body>
                <Card.Title>Card title</Card.Title>
                <Card.Text>
                  This card has supporting text below as a natural lead-in to
                  additional content.{" "}
                </Card.Text>
              </Card.Body>
              <Card.Footer>
                <Button className="btn btn-secondary">Go to website</Button>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

const imageStyles = {
  width: "150px",
  height: "150px",
  margin: "auto",
  marginTop: "20px",
  display: "inline-block",
  objectFit: "cover",
};

export default Post;
