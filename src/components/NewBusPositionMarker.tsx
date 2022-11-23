import React, { useEffect, useState } from "react";
import busIcon from '../images/bus.png';
import busIcon32 from '../images/bus32.png';
const NewBusPositionMarker:React.FC<{
    positionList: any
    map: any
}> = ({positionList, map}) => {
    const [busMarkerList, setBusMarkerList] = useState<any[]>([])
    if(busMarkerList.length !== 0){
        setBusMarkerList([]);
        for(let i=0, ii=busMarkerList.length; i<ii; i++){
            busMarkerList[i].setMap(null);
        }
    }
    useEffect(() => {
        positionList.map((position:any) => {
            var marker = new naver.maps.Marker({
                position: new naver.maps.LatLng(position.gpsY[0], position.gpsX[0]),
                map: map,
                icon: {
                    url: busIcon32
                },
            });
            busMarkerList.push(marker);
        }, [positionList]);
        
        // console.log(busMarkerList);
    }, [positionList])

    return(
        <>
        </>
    )
}

export default NewBusPositionMarker;