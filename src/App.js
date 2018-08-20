import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import './App.css';
import './styles/main.css'
import './styles/landing.css'
import { Container, Nav, NavItem } from 'reactstrap';
import { Row, Col } from 'reactstrap';
import logo from './assets/images/bloc_jams_logo.png'
import Landing from './components/Landing';
import Library from './components/Library';
import Album from './components/Album';

class App extends Component {
  render() {
    return (
      <div>
      <header>
        <Row>
          <Col sm="12" md={{ size: 6, offset: 3 }}>
          <div className="clearfix">
          <img alt="logo" className="float-left p-3" src={logo} />
          <h1>Turn the music up!</h1>
          </div>
          </Col>
        </Row>
      </header>
      <Container className="App">
      <Row>
      <Col xs="10">
        <main className="h-100">
          <Route exact path="/" component={Landing} />
          <Route path="/library" component={Library} />
          <Route path="/album/:slug" component={Album} />
        </main>
      </Col>
      <Col xs="2">
        <nav>
          <Nav className="sidebar justified" vertical>
            <NavItem className="navbar-brand pb-3">
              <Link to='/'>Landing</Link>
            </NavItem>
            <NavItem className="navbar-brand pb-3">
              <Link to='/library'>Library</Link>
            </NavItem>
          </Nav>
        </nav>
      </Col>
      </Row>
      </Container>
      </div>
    );
  }
}

export default App;
