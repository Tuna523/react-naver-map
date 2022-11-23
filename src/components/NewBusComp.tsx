import React, { useState } from "react";
import GetBusPosition from "./GetBusPosition";
import GetRouteId from "./GetRouteId";
import GetRoutes from "./GetRoutes";
import GetStation from "./GetStation";
import bus32 from "../images/bus32.png";

export const serviceKey = 'DyV%2Ft402FreKPw4bzIbXIGjVUngF6aP09Isf3pEI2hpAKGXUsi6vhBmtmsnmViFq3rcn2plpA2%2FUPe6kTNCniw%3D%3D';
export var parseString = require('xml2js').parseString;

const NewBusComp:React.FC<{
    copyMap: any
}> = ({copyMap}) => {
    const [routeId, setRouteId] = useState('');
    console.log(routeId);
    function routeIdHandler(busNum:any) {
        setRouteId(busNum);
    }

    return (
        <>
            <div id="busContents" className="hideContents">
                <h2 className="busMenuHeader" >버스정보 조회</h2>
                <GetRouteId routeIdHandler={routeIdHandler}/>
            </div>
                <GetBusPosition routeId={routeId} map={copyMap}/>
                <GetStation routeId={routeId} map={copyMap}/>
                <GetRoutes routeId={routeId} map={copyMap}/>
        </>
    )
}

export default NewBusComp;