import React from 'react';
import GoogleMapReact from 'google-map-react';

export class SimpleMap extends React.Component{
  constructor(props){
    super(props);
    this.renderMarkers = this.renderMarkers.bind(this);
  }

  renderMarkers(map, maps) {
    let marker = new maps.Marker({
      position: this.props.center,
      map: map,
    });
  }

  render(){
    return (
      <div style={{ height: '30em', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyAqv_F9F3JYL6-EwECrQlqQkmvYPKoIA6M' }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom} 
          onGoogleApiLoaded={({map, maps}) => this.renderMarkers(map, maps)}
          >
        </GoogleMapReact>
      </div>
    );
  }
}
