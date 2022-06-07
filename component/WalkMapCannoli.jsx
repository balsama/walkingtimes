import {TileLayer, MapContainer, GeoJSON} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";

function onEachFeature(feature, layer) {
    var minutes = Math.floor(feature.properties.walkingTimes.cannoli.timeToClosestPlace / 60);
    var seconds = feature.properties.walkingTimes.cannoli.timeToClosestPlace - minutes * 60;

    var popupContent = '<p><strong>Address:</strong> ' + feature.properties.address + '<br />' +
        '<strong>Walking time to get a cannoli: </strong> ' + minutes + 'm ' + seconds + 's<br />' +
        '<strong>Nearest cannoli store:</strong> ' + feature.properties.walkingTimes.cannoli.closestPlace + '</p>'
    layer.bindTooltip(popupContent);
}

function style(feature) {
    return {
        fillColor: heatMapColorforValue(feature.properties.walkingTimes.cannoli.timeToClosestPlace / 400),
        weight: 2,
        opacity: 1,
        color: outlineColorByPlace(feature.properties.walkingTimes.cannoli.closestPlace),
        fillOpacity: 1
    };
};

function heatMapColorforValue(value) {
    var h = (1.0 - value) * 240
    return "hsl(" + h + ", 100%, 50%)";
}
function outlineColorByPlace(place) {
    if (place == 'Bovas') {
        return "#000000";
    }
    if (place == 'Mikes') {
        return "#7c7c7c";
    }
    if (place == 'Modern') {
        return "#ffffff";
    }
}

const WalkMapCannoli = () => {

    let buildings = require('json-loader!../data/walkingTimes.geojson');


    return (
        <MapContainer
            center={[42.364768, -71.054369]}
            zoom={17}
            scrollWheelZoom={true}
            style={{ height: "100%", width: "100%", backgroundColor: "#232323", color: "#000" }}
        >

            <GeoJSON
                data={buildings}
                style={style}
                onEachFeature={onEachFeature}
            />
            <div className={"description"}>
                <h1>North End: Time to get Cannoli</h1>
                <p>Time to walk from front door of building to the nearest store that sells cannoli.</p>
                <ul>
                    <li>Average time to get a cannoli: 181 seconds</li>
                    <li>Colors:
                        <ul>
                            <li>Pink = long</li>
                            <li>Blue = short</li>
                        </ul>
                    </li>
                    <li>Outlines:
                        <ul>
                            <li>Black: Bova's (917 addresses served)</li>
                            <li>Gray: Mike's (873 addresses served)</li>
                            <li>White: Modern (259 addresses served)</li>
                        </ul>
                    </li>
                </ul>
            </div>
            <div className={"nav"}>
                Switch to <a href={"/"}>Fruit</a>
            </div>

        </MapContainer>
    );
};

export default WalkMapCannoli;