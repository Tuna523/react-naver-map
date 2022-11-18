import axios from "axios";
import React, { useEffect, useState } from "react";
import { parseString, serviceKey } from "./NewBusComp";
import NewBusPositionMarker from "./NewBusPositionMarker";

const GetBusPosition:React.FC<{
    routeId: string
    map: any
}> = ({routeId, map}) => {
    var interval: any;
    let toggle = false;
    const [mounted, setMounted] = useState(false);
    const [positionList, setPositionList] = useState<any[]>([]);

    useEffect(() => {
        if(mounted == false){
            setMounted(true);
        } else {
            busPositionHandler();
        }
    }, [routeId]);
    function busPositionHandler() {
        axios.get(`http://ws.bus.go.kr/api/rest/buspos/getBusPosByRtid?serviceKey=${serviceKey}&busRouteId=${routeId}`)
        .then(response => {
            parseString(response.data, (err:any, result:any) => {
            if(err) {
                console.log('error');
            } else {
                setPositionList(result.ServiceResult.msgBody[0].itemList)
                // for(let i =0, ii=result.ServiceResult.msgBody[0].itemList.length; i<ii; i++){
                //     positionList.push(result.ServiceResult.msgBody[0].itemList[i]);
                // }
                // console.log(result.ServiceResult.msgBody[0].itemList)
                // console.log(result.ServiceResult.msgBody[0].itemList.length);
            }
            })
        })
    }

    function intervalHandler() {
        if(routeId !== ''){
        if(toggle == true) {
            clearInterval(interval);
            console.log('cleared')
            toggle = false;
        } else {
            interval = setInterval(busPositionHandler, 10000);
            console.log('setted');
            toggle = true;
        }
    } else { null }
    }

    return (
        <>
            <NewBusPositionMarker positionList={positionList} map={map}/>
            <button onClick={(e)=> { intervalHandler();}}>실시간 버스</button>
        </>
    )
}

export default GetBusPosition;