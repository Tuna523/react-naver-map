import React, { useEffect, useState } from "react";
// import smallBusStop from '../images/busStop24.png'
import middleBusStop from '../images/busStop32.png';
// import BigBusStop from '../images/busStop64.png'
const NewStationMarker:React.FC<{
    stationList: any[]
    map: any
}> = ({stationList, map}) => {
    
    const [stopMarkerList, setStopMarkerList] = useState<any[]>([]);
    if(stopMarkerList.length !== 0){
        setStopMarkerList([]);
        for(let i=0, ii=stopMarkerList.length; i<ii; i++){
            stopMarkerList[i].setMap(null);
        }
    }

    useEffect(() => {
        stationList.map((station: any) => {
            var marker = new naver.maps.Marker({
                position: new naver.maps.LatLng(station.gpsY[0], station.gpsX[0]),
                map: map,
                icon: {
                    url: middleBusStop
                }
            });

            var contentString = [`${station.stationNm}`].join('');

            var infowindow = new naver.maps.InfoWindow({
                content: contentString
            });
            
            naver.maps.Event.addListener(marker, 'click', function(e) {
                if (infowindow.getMap()) {
                    infowindow.close();
                } else {
                    infowindow.open(map, marker);
                }
            });

            stopMarkerList.push(marker);
        });
    }, [stationList]);
    
    return(
        <>
        </>
    )
}

export default NewStationMarker;