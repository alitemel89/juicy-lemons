import React, { useState } from "react";
import { Card } from "react-bootstrap";
import { BsHeart } from "react-icons/bs";
import { BsChat } from "react-icons/bs";
import { BsHeartFill } from "react-icons/bs";

function Post({ title, imageUrl, description }) {
  const [click, setClick] = useState(false);
  return (
    <>
      <Card className="shadow m-3">
        <Card.Img variant="top" src={imageUrl} />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>{description}</Card.Text>
        </Card.Body>
        <Card.Footer>
          {click ? (
            <BsHeartFill
              size={29}
              color="#C60F7B"
              className="mr-2"
              role="button"
              onClick={() => setClick(!click)}
            />
          ) : (
            <BsHeart
              size={29}
              color="#15195f"
              className="mr-2"
              role="button"
              onClick={() => setClick(!click)}
            />
          )}

          <BsChat size={30} color="#15195f" className="mb-1" role="button" />
        </Card.Footer>
      </Card>
    </>
  );
}

export default Post;
