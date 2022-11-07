import { MapContainer, TileLayer, useMapEvent, Marker } from "react-leaflet"
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon-2x.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png'
import 'leaflet/dist/leaflet.css'
import { useState } from "react";
import coordinateDTO from "./coordinates.model";

let defaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconAnchor: [16, 37]
});

export default function Map(props: mapProps){
    const [coordinates, setCoordinates] = useState<coordinateDTO[]>(props.coordinates);
    return(
        <MapContainer
            center={[18.482214, -69.914311]} zoom={14}
            style={{height: props.height}}
        >
            <TileLayer attribution="React Movies"
            url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MapClick setCoordinates={coordinates => {
                setCoordinates([coordinates]);
                props.handleMapClick(coordinates);
            }}/>
            {coordinates.map((coordinate, index) => <Marker key={index}
                position={[coordinate.lat, coordinate.lng]}/>)}
        </MapContainer>
    )
}

interface mapProps{
    height: string;
    coordinates: coordinateDTO[];
    handleMapClick(coordinates: coordinateDTO): void;
}

Map.defaultProps = {
    height: '500px'
}

function MapClick(props: mapClickProps){
    useMapEvent('click', eventArgs => {
        props.setCoordinates({lat: eventArgs.latlng.lat, lng: eventArgs.latlng.lng})
    })
    return null
}

interface mapClickProps{
    setCoordinates(coordinates: coordinateDTO): void;
}