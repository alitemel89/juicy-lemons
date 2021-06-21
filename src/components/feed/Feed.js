import React, { useEffect, useState } from "react";
import { Card, Form, Button, Container, Col, Row } from "react-bootstrap";
import thirdSlide from "../../images/thirdslide.jpg";
import { firestore, storage } from "../../utils/FirebaseUtils";
import Post from "../post/Post";
import firebase from "firebase";

function Feed() {
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");
  const [progress, setProgress] = useState(0);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    firestore.collection("posts").onSnapshot((snapshot) => {
      setPosts(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleUpload();
    await firestore.collection("posts").add({
      title: title,
      description: description,
      imageUrl: url,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setDescription('');
    setTitle('')
    setImage('')
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image)
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =  Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            setUrl(url);
          });
      }
    );

  };

  return (
    <>
      <Container>
        <Row>
          <Col sm={4}>
            <Card className="shadow m-3">
              <Card.Img
                variant="top"
                src={thirdSlide}
                className="rounded-circle"
                style={imageStyles}
              />

              <Card.Body>
                <Card.Title className="text-center">Juicy Lemon</Card.Title>
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
            <Card className="shadow m-3">
              <Form className="p-4" onSubmit={handleSubmit}>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Label>Hi Ali! What is in your mind?</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={1}
                    className="mb-2"
                    value={title}
                    onChange={handleTitleChange}
                  />
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={description}
                    onChange={handleDescriptionChange}
                  />
                </Form.Group>
                <progress
                  value={progress}
                  max="100"
                  style={{ width: "100%" }}
                />
                <Form.File
                  id="custom-file-translate-scss"
                  label={
                    image ? (
                      <Form.Label>{image.name}</Form.Label>
                    ) : (
                      "Upload an image..."
                    )
                  }
                  lang="en"
                  custom
                  onChange={handleImageChange}
                />

                <Button className="btn btn-primary mt-3" onClick={handleSubmit}>
                  Share
                </Button>
              </Form>
            </Card>

            {/* Posts */}
            {posts.map(({ id, data: { title, description, imageUrl } }) => (
              <Post
                key={id}
                title={title}
                description={description}
                imageUrl={imageUrl}
              />
            ))}
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

export default Feed;
