import React from "react";
// import redMarker from '../images/rM64.png'
// import bigRedCircle from '../images/redCircle16.png'
import smallRedCircle from '../images/redCircle4.png'
// import middleRedCircle from '../images/redCircle8.png'

const BusRouteMarker:React.FC<{
    lat:number
    lng:number
    map: any
    contentText?: string
    markerList: any[]
}> = ({lat, lng, map, markerList}) => {
    var marker = new naver.maps.Marker({
        position: new naver.maps.LatLng({lat, lng}),
        map: map,
        icon: {
            url: smallRedCircle
        }
    });
        markerList.push(marker);
return(
    <></>
)
}

export default BusRouteMarker;