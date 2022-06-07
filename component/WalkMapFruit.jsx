import {TileLayer, MapContainer, GeoJSON} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";

function onEachFeature(feature, layer) {
    var minutes = Math.floor(feature.properties.walkingTimes.fruit.timeToClosestPlace / 60);
    var seconds = feature.properties.walkingTimes.fruit.timeToClosestPlace - minutes * 60;

    var popupContent = '<p><strong>Address:</strong> ' + feature.properties.address + '<br />' +
        '<strong>Walking time to get fruit: </strong> ' + minutes + 'm ' + seconds + 's<br />' +
        '<strong>Nearest fruit store:</strong> ' + feature.properties.walkingTimes.fruit.closestPlace + '</p>'
    layer.bindTooltip(popupContent);
}

function style(feature) {
    return {
        fillColor: heatMapColorforValue(feature.properties.walkingTimes.fruit.timeToClosestPlace / 400),
        weight: 2,
        opacity: 1,
        color: outlineColorByPlace(feature.properties.walkingTimes.fruit.closestPlace),
        fillOpacity: 1
    };
};

function heatMapColorforValue(value) {
    var h = (1.0 - value) * 240
    return "hsl(" + h + ", 100%, 50%)";
}
function outlineColorByPlace(place) {
    if (place == 'albas') {
        return "#000000";
    }
    if (place == 'going bananas') {
        return "#7c7c7c";
    }
    if (place == 'golden goose') {
        return "#ffffff";
    }
}

const WalkMapFruit = () => {

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
                <h1>North End: Time to get fruit</h1>
                <p>Time to walk from front door of building to the nearest store that sells fruit.</p>
                <ul>
                    <li>Average time to get fruit: 195 seconds</li>
                    <li>Colors:
                        <ul>
                            <li>Pink = long</li>
                            <li>Blue = short</li>
                        </ul>
                    </li>
                    <li>Outlines:
                        <ul>
                            <li>Black: Albas (1,042 addresses served)</li>
                            <li>Gray: Going Bananas (321 addresses served)</li>
                            <li>White: Golden Goose (686 addresses served)</li>
                        </ul>
                    </li>
                </ul>
            </div>

            <div className={"nav"}>
                Switch to <a href={"/cannoli"}>Cannoli</a>
            </div>

        </MapContainer>
    );
};

export default WalkMapFruit;