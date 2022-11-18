import React, { useEffect, useState } from "react";
import smallRedCircle from '../images/redCircle4.png';

const NewRouteMarker:React.FC<{
    routeList: any
    map: any
}> = ({routeList, map}) => {
    const [markerList, setMarkerList] = useState<any[]>([])
    if(markerList.length !== 0){
        setMarkerList([]);
        for(let i=0, ii=markerList.length; i<ii; i++){
            markerList[i].setMap(null);
        }
    }

    useEffect(() => {
        routeList.map((route: any) => {
            var marker = new naver.maps.Marker({
                position: new naver.maps.LatLng(route.gpsY[0], route.gpsX[0]),
                map: map,
                icon: {
                    url: smallRedCircle
                },
            });
            markerList.push(marker);
        });
    
        // console.log(markerList);
    }, [routeList]);
    
    return (
        <>
        </>
    )
}

export default NewRouteMarker;