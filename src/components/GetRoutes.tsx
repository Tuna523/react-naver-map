import axios from "axios";
import React, { useEffect, useState } from "react";
import { parseString, serviceKey } from "./NewBusComp";
import NewRouteMarker from "./NewRouteMarker";

const GetRoutes:React.FC<{
    routeId: string
    map: any
}> = ({routeId, map}) => {
    const [mounted, setMounted] = useState(false);
    const [routeList, setRouteList] = useState([]);

    useEffect(() => {
        if(mounted == false){
            setMounted(true);
        } else {
            routeListHandler();
        }
    }, [routeId]);

    function routeListHandler() {
        // axios.get(`http://ws.bus.go.kr/api/rest/busRouteInfo/getRoutePath?serviceKey=${serviceKey}&busRouteId=100100278`)
        axios.get(`http://ws.bus.go.kr/api/rest/busRouteInfo/getRoutePath?serviceKey=${serviceKey}&busRouteId=${routeId}`)
        .then((response)=> {
            parseString(response.data, (err:any, result: any) => {
                if(err) {
                    console.log('error');
                } else {
                    setRouteList(result.ServiceResult.msgBody[0].itemList);
                }
            })
        })
    };

    return(
        <NewRouteMarker routeList={routeList} map={map} />
    )
}

export default GetRoutes