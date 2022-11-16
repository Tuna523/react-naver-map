import React from "react";

const FourPolygon:React.FC<{
    map: any
    lat: number[]
    lng: number[]
}> = ({map, lat, lng}) => {
    var polygon = new naver.maps.Polygon({
        map: map,
        paths: [
            [
                new naver.maps.LatLng(lat[0], lng[0]),
                new naver.maps.LatLng(lat[1], lng[1]),
                new naver.maps.LatLng(lat[2], lng[2]),
                new naver.maps.LatLng(lat[3], lng[3]),
                
                // new naver.maps.LatLng(37.37544345085402, 127.11224555969238),
                // new naver.maps.LatLng(37.37230584065902, 127.10791110992432),
                // new naver.maps.LatLng(37.35975408751081, 127.10795402526855),
                // new naver.maps.LatLng(37.359924641705476, 127.11576461791992),
                // new naver.maps.LatLng(37.35931064479073, 127.12211608886719),
                // new naver.maps.LatLng(37.36043630196386, 127.12293148040771),
                // new naver.maps.LatLng(37.36354029942161, 127.12310314178465),
                // new naver.maps.LatLng(37.365211629488016, 127.12456226348876),
                // new naver.maps.LatLng(37.37544345085402, 127.11224555969238)
            ]
        ],
        fillColor: '#ff0000',
        fillOpacity: 0.3,
        strokeColor: '#ff0000',
        strokeOpacity: 0.6,
        strokeWeight: 3
    });
    return(
        <>
        </>
    )
}

export default FourPolygon;