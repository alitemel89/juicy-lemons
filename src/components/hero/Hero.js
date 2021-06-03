import React from "react";
import { Carousel } from "react-bootstrap";
import firstSlide from "../../images/firstslide.jpg";
import secondSlide from "../../images/secondslide.jpg";
import thirdSlide from "../../images/thirdslide.jpg";

function Hero() {
  return (

      <div className="card">
        <Carousel fade>
          <Carousel.Item style={{ height: "100vh" }}>
            <img className="d-block" src={firstSlide} alt="First slide" />
            <Carousel.Caption
              style={{ bottom: "45%" }}
              className="text-primary"
            >
              <h1>First slide label</h1>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item style={{ height: "100vh" }}>
            <img className="d-block" src={secondSlide} alt="Second slide" />
            <Carousel.Caption
              style={{ bottom: "45%" }}
              className="text-primary"
            >
              <h1>Second slide label</h1>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item style={{ height: "100vh" }}>
            <img className="d-block" src={thirdSlide} alt="Third slide" />
            <Carousel.Caption
              style={{ bottom: "45%" }}
              className="text-primary"
            >
              <h1>Third slide label</h1>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>

  );
}

export default Hero;
