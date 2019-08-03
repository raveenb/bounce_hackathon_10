import React from 'react';
import {render} from 'react-dom';
import {Map, Marker, Popup, TileLayer} from 'react-leaflet';
import MarkerLayer from '../src/MarkerLayer';
import PubNub from 'pubnub';

const custPos = {
    "0": [40.763154, -73.920827],
    "1": [40.6894932, -73.942061],
    "10": [40.70255088, -73.98940236],
    "11": [40.710451, -73.960876],
    "12": [40.720367753, -73.9616507292],
    "13": [40.78839, -73.9747],
    "14": [40.74708586, -73.94977234],
    "15": [40.6850680731, -73.977907598],
    "16": [40.73781509, -73.99994661],
    "17": [40.7711528, -73.9170074],
    "18": [40.72079821, -73.95484712],
    "19": [40.71413311, -73.95234386],
    "2": [40.72743423, -73.99379025],
    "20": [40.72743423, -73.99379025],
    "21": [40.777553743, -73.9551275969],
    "22": [40.751551, -73.993934],
    "23": [40.720367753, -73.9616507292],
    "24": [40.682601, -73.938037],
    "25": [40.7243052725, -73.9960098267],
    "26": [40.72743423, -73.99379025],
    "27": [40.6832386546, -73.9659959078],
    "28": [40.707165, -73.923711],
    "29": [40.682601, -73.938037],
    "3": [40.706237, -73.933871],
    "30": [40.70905623, -74.01043382],
    "31": [40.7781314, -73.96069399],
    "32": [40.778301, -73.9488134],
    "33": [40.75110165, -73.94073717],
    "34": [40.802535, -73.9532423],
    "35": [40.7575699, -73.99098507],
    "36": [40.720367753, -73.9616507292],
    "37": [40.778301, -73.9488134],
    "38": [40.716887, -73.963198],
    "39": [40.73454567, -73.99074142],
    "4": [40.756014, -73.967416],
    "40": [40.75640548, -73.9900262],
    "41": [40.75640548, -73.9900262],
    "42": [40.72743423, -73.99379025],
    "43": [40.78414472, -73.98362492],
    "44": [40.73587678, -73.98205027],
    "45": [40.7643971, -73.97371465],
    "46": [40.707165, -73.923711],
    "47": [40.679043, -74.011169],
    "48": [40.74780373, -73.9734419],
    "49": [40.72317958, -73.99480012],
    "5": [40.758984814, -73.9937996864],
    "50": [40.7201952144, -74.0103006363],
    "51": [40.7431155538, -73.9821535349],
    "52": [40.7270636335, -73.9966213703],
    "53": [40.73454567, -73.99074142],
    "54": [40.73532427, -73.99800419],
    "55": [40.72317958, -73.99480012],
    "56": [40.7589238638, -73.9622622728],
    "57": [40.7814107002, -73.9559590816],
    "58": [40.78414472, -73.98362492],
    "59": [40.72317958, -73.99480012],
    "6": [40.75110165, -73.94073717],
    "60": [40.808442, -73.9452087],
    "61": [40.804213, -73.96699104],
    "62": [40.7541208108, -73.9802518487],
    "63": [40.74345335, -74.00004031],
    "64": [40.72311651, -73.95212324],
    "65": [40.749156, -73.9916],
    "66": [40.72405549, -74.00965965],
    "67": [40.71260486, -73.96264403],
    "68": [40.8013434, -73.9711457439],
    "69": [40.8013434, -73.9711457439],
    "7": [40.7249467236, -74.0016585588],
    "70": [40.73704984, -73.99009296],
    "71": [40.722055, -73.989111],
    "72": [40.74290902, -73.97706058],
    "73": [40.72325, -73.94308],
    "74": [40.76087502, -74.00277668],
    "75": [40.6896218879, -73.9830426872],
    "76": [40.72906, -73.95779],
    "77": [40.751551, -73.993934],
    "78": [40.749156, -73.9916],
    "79": [40.736502, -73.97809472],
    "8": [40.749156, -73.9916],
    "80": [40.7432268143, -73.9744978398],
    "81": [40.71260486, -73.96264403],
    "82": [40.72217444, -73.98368779],
    "83": [40.8078316, -73.949373],
    "84": [40.71427487, -73.98990025],
    "85": [40.71427487, -73.98990025],
    "86": [40.70277159, -73.99383605],
    "87": [40.6751622, -73.9814832],
    "88": [40.751047, -73.93797],
    "89": [40.71285887, -73.96590294],
    "9": [40.68312489, -73.97895137],
    "90": [40.7945663, -73.9362541],
    "91": [40.73454567, -73.99074142],
    "92": [40.7190095, -73.95852515],
    "93": [40.750585347, -73.9946848154],
    "94": [40.75001986, -73.96905301],
    "95": [40.72082834, -73.97793172],
    "96": [40.74731, -73.95451],
    "97": [40.7262807, -73.98978041],
    "98": [40.76009437, -73.99461843],
    "99": [40.74144387, -73.97536082]
};
const surge = [10, 15, 20, 25, 30]
//const surgeAccept = [0,1]
var cid = 1;

// const position = { lng: 77.580643, lat: 12.972442 };
// const markers = [
//   {
//     position: { lng: 77.580643, lat: 12.972442 },
//     text: 'Current location',
//   },
// ];

const markerToBeAdded = {
    position: {lng: -119.0638890000001, lat: 40.883056000001},
    text: 'Black Rock City'
};

class ExampleMarkerComponent extends React.Component {

    render() {
        const style = {
            border: 'solid 1px lightblue',
            backgroundColor: '#333333',
            borderRadius: '50%',
            marginTop: '-12px',
            marginLeft: '-12px',
            width: '24px',
            height: '24px'
        };

        return (
            <div style={Object.assign({}, this.props.style, style)}></div>
        );
    }

}

//const longitudeExtractor = m => m.position.lng;
//const latitudeExtractor = m => m.position.lat;

class MapExample extends React.Component {

    constructor(props) {
        super(props);

        var pubnub = new PubNub({
            subscribeKey: "sub-c-7618369a-b5e1-11e9-b6f7-eea0353b68c5",
            publishKey: 'pub-c-245d8fa3-4f76-492c-95ec-70a44eddf994',
            //secretKey: "secretKey",
            //ssl: true
        })
        this.pubnub = pubnub;

        this.pos = this.genPos();
        this.surge = this.genSurge();
        this.waitTime = this.genSurge();
        this.cusId = cid++;
        this.acceptance = "Processing";
        this.eta = "--";

        this.subscribe = this.subscribe.bind(this);
    }

    publish() {

        this.pubnub.publish(
            {
                message: {
                    pos: this.pos,
                    cusId: this.cusId,
                    surge: this.surge,
                    waitTime: this.waitTime,
                },
                channel: 'customerpublish',
                sendByPost: false, // true to send via POST
                storeInHistory: false, //override default storage options
                meta: {
                    "cool": "meta"
                } // publish extra meta with the request
            },
            (status, response) => {
                // handle status, response
            }
        );
    }

    subscribe() {
        this.pubnub.addListener({
            status: (st) => {
                if (st.category === "PNUnknownCategory") {
                    var newState = {new: 'error'};
                    pubnub.setState(
                        {
                            state: newState
                        },
                        function (status) {
                            console.error(st.errorData.message);
                        }
                    );
                }
            },
            message: (message) => {
                console.log(message.message);
                // console.log(message.cusId);
                console.log(this);
                if (message.message.cusId === this.cusId) {
                    console.log(message.message.acceptance);
                    this.acceptance = message.message.acceptance;
                    this.eta = message.message.eta;
                    this.forceUpdate();
                }

            }
        });

        this.pubnub.subscribe({
            channels: ['customersubscribe']
        });
    }


    genPos() {
        const keys = Object.keys(custPos);
        const randIndex = Math.floor(Math.random() * keys.length);
        const randKey = keys[randIndex];
        const Pos = custPos[randKey];
        return Pos;
    };

    genSurge() {
        //const keys = Object.keys(custPos);
        const randIndex = Math.floor(Math.random() * surge.length);
        // const randKey = keys[randIndex];
        const surgePrice = surge[randIndex];
        return surgePrice;
    }

    // genSurgeAccept(){
    //   const randIndex = Math.floor(Math.random() * surge.length);
    //   // const randKey = keys[randIndex];
    //   const surgePrice = surge[randIndex];
    //   return surgePrice;
    // }

    state = {
        mapHidden: false,
        layerHidden: false,
        //markers: markers,
        msg: null
    };

    // _moveMarker() {
    //   setTimeout(() => {
    //     markers[0].position.lng = markers[0].position.lng + 2;
    //     this.setState({ markers: Array.from(markers) });
    //   }, 1000 * 1);
    // }
    //
    componentDidMount() {
        this.subscribe();
        this.publish();
    };

    componentWillUnmount() {
        this.pubnub.unsubscribe({
            channels: ['customersubscribe']
        });
    }

    render() {
        if (this.state.mapHidden) {
            return (
                <div>
                    <input type="button" value="Toggle Map"
                           onClick={() => this.setState({mapHidden: !this.state.mapHidden})}/>
                </div>
            );
        }

        const pos = this.pos;
        const position = {lng: pos[1], lat: pos[0]};
        const markers = [
            {
                position: {lng: pos[1], lat: pos[0]},
                text: 'Current location',
            },
        ];
        const longitudeExtractor = m => m.position.lng;
        const latitudeExtractor = m => m.position.lat;
        return (
            <div>
                <Map center={position} zoom={16} maxZoom={20}>
                    {!this.state.layerHidden && <MarkerLayer
                        markers={markers}
                        longitudeExtractor={longitudeExtractor}
                        latitudeExtractor={latitudeExtractor}
                        markerComponent={ExampleMarkerComponent}
                        fitBoundsOnUpdate/>}
                    <TileLayer
                        url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    />
                </Map>
                {/*<input type="button" value="Toggle Map" onClick={() => this.setState({ mapHidden: !this.state.mapHidden })} />*/}
                {/*<input type="button" value="Toggle Layer" onClick={() => this.setState({ layerHidden: !this.state.layerHidden })} />*/}
                {/*{!!this.state.msg && this.state.msg}*/}
                <p>{pos}</p>

                {this.props.clientDisplay
                    ? <div>
                        <div style={{color: "red"}}>
                            <p>Surge: {this.surge}% </p>
                            <p>Acceptable time: {this.waitTime} mins </p>
                        </div>
                        <div style={{color: "red"}}>
                            <p>Accepted/Declined state: {this.acceptance}</p>
                            <p>Expected time: {this.eta}</p>
                        </div>
                    </div>
                    : <div>
                        <div style={{color: "red"}}>
                            <p>Expected Arrival time: {this.waitTime} mins </p>
                            <p>Distance: {this.surge}mts </p>
                        </div>
                        {/*<div style={{color: "red"}}>*/}
                        {/*    <p>Accepted/Declined state: {this.acceptance}</p>*/}
                        {/*    <p>Expected time: {this.eta}</p>*/}
                        {/*</div>*/}
                    </div>
                }
            </div>
        );
    }

}


class MapView extends React.Component {


    render() {

        return (
            <div>

                <table style={{width: "100%"}}>
                    <tbody>
                    <tr>
                        <td>
                            <MapExample clientDisplay={true} truckDisplay={false}/>
                        </td>
                        <td>
                            <MapExample clientDisplay={true} truckDisplay={false}/>
                        </td>
                        <td>
                            <MapExample clientDisplay={true} truckDisplay={false}/>
                        </td>
                        <td>
                            <MapExample clientDisplay={true} truckDisplay={false}/>
                        </td>

                    </tr>

                    <tr>
                        <td>
                            <MapExample clientDisplay={true} truckDisplay={false}/>
                        </td>
                        <td>
                            <MapExample clientDisplay={true} truckDisplay={false}/>
                        </td>
                        <td>
                            <MapExample clientDisplay={true} truckDisplay={false}/>
                        </td>
                        <td>
                            <MapExample clientDisplay={true} truckDisplay={false}/>
                        </td>
                    </tr>
                    </tbody>
                </table>


            </div>

        );
    }

}

class TruckView extends React.Component {


    render() {

        return (
            <div>

                <table style={{width: "100%"}}>
                    <tbody>
                    <tr>
                        <td>
                            <MapExample clientDisplay={false} truckDisplay={true}/>
                        </td>
                        <td>
                            <MapExample clientDisplay={false} truckDisplay={true}/>
                        </td>
                        <td>
                            <MapExample clientDisplay={false} truckDisplay={true}/>
                        </td>
                        <td>
                            <MapExample clientDisplay={false} truckDisplay={true}/>
                        </td>
                    </tr>

                    <tr>
                        <td>
                            <MapExample clientDisplay={false} truckDisplay={true}/>
                        </td>
                        <td>
                            <MapExample clientDisplay={false} truckDisplay={true}/>
                        </td>
                        <td>
                            <MapExample clientDisplay={false} truckDisplay={true}/>
                        </td>
                        <td>
                            <MapExample clientDisplay={false} truckDisplay={true}/>
                        </td>
                    </tr>
                    </tbody>
                </table>


            </div>

        );
    }

}

class Foo extends React.Component {

    state = {showing1: true};

    render() {
        const {showing1} = this.state;
        //const { showing2 } = this.state.showing2;
        return (
            <div>
                <div>
                    {showing1 === true || showing1 === "client"
                        ? <button onClick={() => this.setState({showing1: "truck"})}>ClientView</button>
                        : <MapView/>
                    }
                </div>
                <div>
                    {showing1 === true || showing1 === "truck"
                        ? <button onClick={() => this.setState({showing1: "client"})}>TruckView</button>
                        : <TruckView/>
                    }
                </div>
                {/*{showing1*/}
                {/*    ? <button onClick={() => this.setState({showing1: !showing1})}>ClientView</button>*/}
                {/*    : <MapView/>*/}
                {/*}*/}
                {/*{ showing2*/}
                {/*    ? <button onClick={() => this.setState({ showing2: !showing2 })}>TruckView</button>*/}
                {/*    : <TruckView/>*/}
                {/*}*/}
            </div>

        )
    }
}

//render(<MapView/>, document.getElementById('app'));
render(<Foo/>, document.getElementById('but'));
