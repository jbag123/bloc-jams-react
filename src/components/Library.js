import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, CardTitle, CardText, CardImg, CardImgOverlay } from 'reactstrap';
import albumData from './../data/albums';

class Library extends Component {
  constructor(props) {
    super(props);
    this.state = { albums: albumData };
  }

  render() {
   return (
     <Col xs="12">
     <Container className="App">
       <section className='library'>
         <Row>
           {
             this.state.albums.map( (album, index) =>
                 <Col xs={6}  key={`key-${album.title}`}>
                     <Link to={`/album/${album.slug}`} >
                     <Card>
                       <CardImg src={album.albumCover} alt={album.title} />
                       <CardImgOverlay>
                         <CardTitle>{album.title}</CardTitle>
                         <CardText>{album.artist}</CardText>
                         <CardText>{album.songs.length} songs</CardText>
                       </CardImgOverlay>
                     </Card>
                     </Link>
                </Col>
             )
           }
         </Row>
       </section>
     </Container>
     </Col>
    );
  }
}

export default Library;
