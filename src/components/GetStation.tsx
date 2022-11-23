import axios from "axios";
import React, { useEffect, useState } from "react";
import { parseString, serviceKey } from "./NewBusComp";
import NewStationMarker from "./NewStationMarker";

const GetStation:React.FC<{
    routeId: string
    map: any
}> = ({routeId, map}) => {
    const [mounted, setMounted] = useState(false);
    const [stationList, setStationList] = useState<any[]>([]);

    useEffect(() => {
        if(mounted == false){
            setMounted(true);
        } else {
            getStationHandler();
        }
    }, [routeId]);

    function getStationHandler() {
        axios.get(`http://ws.bus.go.kr/api/rest/busRouteInfo/getStaionByRoute?serviceKey=${serviceKey}&busRouteId=${routeId}`)
        .then((response)=> {
            parseString(response.data, (err:any, result: any) => {
                if(err) {
                    console.log('error');
                } else {
                    // console.log(result.ServiceResult.msgBody[0].itemList)
                    setStationList(result.ServiceResult.msgBody[0].itemList);
                }
            })
        })
    };
    return(
        <NewStationMarker stationList={stationList} map={map} />
    )
}

export default GetStation;