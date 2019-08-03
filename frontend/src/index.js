import React from 'react';
//import ReactDOM from 'react-dom';
import { render } from 'react-dom'
import './index.css';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';

//
// class Board extends React.Component {
//     renderSquare(i) {
//         return (
//             <Square
//                 value={this.props.squares[i]}
//                 onClick={() => this.props.onClick(i)}
//             />
//         );
//     }
//
//     render() {
//         return (
//             <div>
//                 <div className="board-row">
//                     {this.renderSquare(0)}
//                     {this.renderSquare(1)}
//                     {this.renderSquare(2)}
//                 </div>
//                 <div className="board-row">
//                     {this.renderSquare(3)}
//                     {this.renderSquare(4)}
//                     {this.renderSquare(5)}
//                 </div>
//                 <div className="board-row">
//                     {this.renderSquare(6)}
//                     {this.renderSquare(7)}
//                     {this.renderSquare(8)}
//                 </div>
//             </div>
//         );
//     }
// }



//render(map, document.getElementById('map-container'))
const position = [51.505, -0.09]
const map = (
    <Map center={position} zoom={13}>
        <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
        />
        <Marker position={position}>
            <Popup>A pretty CSS3 popup.<br />Easily customizable.</Popup>
        </Marker>
    </Map>
)

render(map, document.getElementById('root'))
