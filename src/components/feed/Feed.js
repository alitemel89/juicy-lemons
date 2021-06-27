import React, { useEffect, useState } from "react";
import { Card, Form, Button, Container, Col, Row } from "react-bootstrap";
import thirdSlide from "../../images/thirdslide.jpg";
import { firestore, storage } from "../../utils/FirebaseUtils";
import Post from "../post/Post";
import firebase from "firebase";
import { useAuth } from "../../contexts/AuthContext";
import moment from 'moment';

function Feed() {
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");
  const [progress, setProgress] = useState(0);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [posts, setPosts] = useState([]);
  const [userName, setUserName] = useState("");
  const [userPhotoUrl, setUserPhotoUrl] = useState(
    "https://secure.gravatar.com/avatar/d6fd6bff19d7f0ad4024f3811474fe92?s=180&d=mm&r=g"
  );

  const { currentUser } = useAuth();

  useEffect(() => {
    if (currentUser !== null) {
      currentUser.providerData.forEach((profile) => {
        setUserName(profile.displayName);
        setUserPhotoUrl(profile.photoURL);
      });
    }
  }, [currentUser]);

  if (userName === null) {
    setUserName("");
    setUserPhotoUrl("https://secure.gravatar.com/avatar/d6fd6bff19d7f0ad4024f3811474fe92?s=180&d=mm&r=g")
  }

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
    await handleUpload();

    const urlFromStore = await storage
      .ref("images")
      .child(image.name)
      .getDownloadURL();

    await setUrl(urlFromStore);

    // console.log("Inside of handle submit");
    // console.log(url);
    // console.log(urlFromStore);

    await firestore.collection("posts").add({
      title: title,
      description: description,
      imageUrl: urlFromStore,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setDescription("");
    setTitle("");
    setImage("");
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

  const handleUpload = async () => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    await uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        console.log(error);
      },
      () => {
        storage.ref("images").child(image.name).getDownloadURL();
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
                src={userPhotoUrl}
                className="rounded-circle"
                style={imageStyles}
              />

              <Card.Body>
                {currentUser ? (
                  <Card.Title className="text-center">{`Hello ${userName} 👋`}</Card.Title>
                ) : (
                  <Card.Title className="text-center">Juicy Lemon</Card.Title>
                )}

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
                  <Button className="btn btn-primary">Follow</Button>
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
                  <Form.Label>Hi! What is in your mind?</Form.Label>
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
            {posts.map(
              ({ id, data: { title, description, imageUrl, createdAt } }) => (
                <Post
                  key={id}
                  title={title}
                  description={description}
                  imageUrl={imageUrl}
                  createdAt={moment(new Date(
                    createdAt.seconds * 1000
                  ).toLocaleString(), "MM/DD/YYYY h:mm:ss a").fromNow()}
                />
              )
            )}
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
