import React, { useEffect, useState } from "react";

const NewRoutePolyline:React.FC<{
    routeList: any
    map: any
}> = ({routeList, map}) => {
    const posList :any[] = []
    const [lineList, setLineList] = useState<any[]>([]);

    for(let i = 0, ii = routeList.length; i<ii; i++){
        const obj = {lat: routeList[i].gpsY[0], lng: routeList[i].gpsX[0]}
        posList.push(obj)
    }
    if(lineList.length !== 0){
        setLineList([]);
        for(let i=0, ii=posList.length; i<ii; i++){
            lineList[0].setMap(null);
        }
    }
    useEffect(() => {
        const busPath = new naver.maps.Polyline({
         path: posList,
         strokeColor: 'red',
         strokeOpacity: 0.5
        }) 
        busPath.setMap(map);
        lineList.push(busPath)
    }, [routeList]);
    
    return (
        <>
        </>
    )
}

export default NewRoutePolyline;