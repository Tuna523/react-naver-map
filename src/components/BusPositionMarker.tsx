import React from "react";
// import redMarker from '../images/rM64.png';
// import bigRedCircle from '../images/redCircle16.png';
// import smallRedCircle from '../images/redCircle4.png';
// import middleRedCircle from '../images/redCircle8.png';
import busIcon from '../images/bus.png';

const BusPositionMarker:React.FC<{
    lat:number
    lng:number
    map: any
    contentText?: string
    busMarkerList: any[]
}> = ({lat, lng, map, busMarkerList}) => {
    var marker = new naver.maps.Marker({
        position: new naver.maps.LatLng({lat, lng}),
        map: map,
        icon: {
            url: busIcon
        },
    });
        busMarkerList.push(marker);
    return(
        <></>
    )
}

export default BusPositionMarker;