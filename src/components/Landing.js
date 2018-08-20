import React, { Component } from 'react';
import Ionicon from 'react-ionicons'


class Landing extends Component {
    constructor(props) {
    super(props);
    this.compEl = React.createRef();
  }
  componentDidMount() {
  	// Get the components DOM node
    var elem = this.compEl.current;
  	// Set the opacity of the element to 0
  	elem.style.opacity = 0;
  	window.requestAnimationFrame(function() {
  		// Now set a transition on the opacity
  		elem.style.transition = "opacity 2s";
  		// and set the opacity to 1
  		elem.style.opacity = 1;
  	});
  }

    render() {
     return (
       <section className="d-flex flex-column h-100" ref={this.compEl}>
          <div className="point flex-grow-1">
            <Ionicon icon="ios-musical-notes" color="#00B212" fontSize="5em" />
            <h2>Choose your music</h2>
            <p>The world is full of music; why should you have to listen to music that someone else chose?</p>
          </div>
          <div className="point flex-grow-1">
            <Ionicon icon="ios-radio-outline" color="#00B212" fontSize="5em" />
            <h2>Unlimited, streaming, ad-free</h2>
            <p>No arbitrary limits. No distractions.</p>
          </div>
          <div className="point flex-grow-1">
            <Ionicon icon="ios-phone-portrait" color="#00B212" fontSize="5em" />
            <h2>Mobile enabled</h2>
            <p>Listen to your music on the go. This streaming service is available on all mobile platforms.</p>
          </div>
       </section>
     );
   }
}

export default Landing;
