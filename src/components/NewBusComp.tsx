import React, { useState } from "react";
import GetBusPosition from "./GetBusPosition";
import GetRouteId from "./GetRouteId";
import GetRoutes from "./GetRoutes";


export const serviceKey = 'DyV%2Ft402FreKPw4bzIbXIGjVUngF6aP09Isf3pEI2hpAKGXUsi6vhBmtmsnmViFq3rcn2plpA2%2FUPe6kTNCniw%3D%3D';
export var parseString = require('xml2js').parseString;

const NewBusComp:React.FC<{
    copyMap: any
}> = ({copyMap}) => {
    const [routeId, setRouteId] = useState('');
    function routeIdHandler(busNum:any) {
        setRouteId(busNum);
    }
    return (
        <>
        <GetRouteId routeIdHandler={routeIdHandler}/>
        <GetRoutes routeId={routeId} map={copyMap}/>
        <GetBusPosition routeId={routeId} map={copyMap}/>
        </>
    )
}

export default NewBusComp;