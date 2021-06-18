import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { Navbar, Nav, NavDropdown, Button } from "react-bootstrap";
import logo from "../../images/lemon.svg";


import { useAuth } from "../../contexts/AuthContext";
import { auth } from "../../utils/FirebaseUtils";

function Header() {
  const [expanded, setExpanded] = useState(false);
  const { currentUser } = useAuth();
  
  return (
    <>
      <Navbar
        bg="primary"
        variant="dark"
        sticky="top"
        expand="md"
        collapseOnSelect
        expanded={expanded}
      >
        <Navbar.Brand className="px-2 mx-2" as={Link} to="/">
          <img src={logo} width="35" height="35" alt="company-logo" />
          &nbsp; Juicy Lemons
        </Navbar.Brand>
        <Navbar.Toggle
          className="mx-3"
          onClick={() => setExpanded(expanded ? false : "expanded")}
        />
        <Navbar.Collapse className="px-2">
          <Nav className="mr-auto">
            <NavDropdown title="Products">
              <NavDropdown.Item as={Link} to="/products/tea">
                Tea
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/products/coffee">
                Coffee
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/products/chocolate">
                Chocolate
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/post">
                My Feed
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link as={Link} to="/blog">
              Blog
            </Nav.Link>
            <Nav.Link as={Link} to="/about">
              About us
            </Nav.Link>
          </Nav>

          {currentUser ? (
            <Nav.Link as={Link} onClick={() => setExpanded(false)}>
              <Redirect to="/"></Redirect>
              <Button
                variant="btn btn-secondary"
                onClick={() => auth.signOut()}
              >
                Sign out
              </Button>
            </Nav.Link>
          ) : (
            <Nav className="align-items-md-center">
              <Nav.Link
                as={Link}
                to="/login"
                onClick={() => setExpanded(false)}
              >
                <Redirect to="/login"></Redirect>
                Login
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/register"
                onClick={() => setExpanded(false)}
              >
                <Button variant="btn btn-secondary">Register</Button>
              </Nav.Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}

export default Header;
