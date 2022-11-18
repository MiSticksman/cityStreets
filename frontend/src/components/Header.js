// import React, { Component} from 'react'
// import {
//     Navbar,
//     Nav,
//     FormControl,
//     Container,
//     Form,
//     Button
// } from 'react-bootstrap';
// const Header = () => {

//     return (
//         <div className="app-header">
//             <h1>Street List</h1>
//         </div>
//     )
// }

// export default Header

import React, { Component } from 'react'
import { Navbar, NavDropdown, Form, FormControl, Button, Nav } from 'react-bootstrap'
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from "react-router-dom";

import Home from './pages/Home';
import Street from './pages/Street';
import House from './pages/House';
import MyRoute from './pages/Route';

export default class Header extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Navbar bg="dark" variant={"dark"} expand="lg">
                        
                        <Navbar.Collapse id="navbarScroll">
                            <Nav
                                className="mr-auto my-2 my-lg-0"
                                style={{ maxHeight: '100px' }}
                                navbarScroll
                            >
                                <Nav.Link as={Link} to="/">Home</Nav.Link>
                                <Nav.Link as={Link} to="/streets">Streets</Nav.Link>
                                <Nav.Link as={Link} to="/houses">Houses</Nav.Link>
                                <Nav.Link as={Link} to="/routes">Routes</Nav.Link>


                            </Nav>

                        </Navbar.Collapse>
                    </Navbar>
                </div>
                <div>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/streets" element={<Street />} />
                    <Route path="/houses" element={<House />} />
                    <Route path="/routes" element={<MyRoute />} />
                </Routes>
                </div>
            </Router>
        )
    }
}