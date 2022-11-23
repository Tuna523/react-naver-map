import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import BusPositionMarker from "./BusPositionMarker";
import BusRouteMarker from "./BusRouteMarker";

// export const serviceKey = 'DyV%2Ft402FreKPw4bzIbXIGjVUngF6aP09Isf3pEI2hpAKGXUsi6vhBmtmsnmViFq3rcn2plpA2%2FUPe6kTNCniw%3D%3D';
// export var parseString = require('xml2js').parseString;

const BusComp:React.FC<{
    copyMap: any
}> = ({copyMap}) => {
    const serviceKey = 'DyV%2Ft402FreKPw4bzIbXIGjVUngF6aP09Isf3pEI2hpAKGXUsi6vhBmtmsnmViFq3rcn2plpA2%2FUPe6kTNCniw%3D%3D';
    var parseString = require('xml2js').parseString;
    var markerList:any = [];
    var busMarkerList:any = [];
    const [busNumber, setBusNumber] = useState('');
    const [first, setFirst] = useState(false);
    const [routeId, setRouteId] = useState('');
    const [routeList, setRouteList] = useState([]);
    const [positionList, setPositionList] = useState<any>([]);
    console.log(busNumber);
    // console.log(routeList)
    // console.log(positionList)
    const SubmitHandler = useCallback(() => {
        var inputValue = (document.getElementById('inputBusNumber') as HTMLInputElement).value;
        setBusNumber(inputValue);
    }, [routeList])

    function removeRouteHandler() {
        for(let i=0, ii=markerList.length; i<ii; i++){
            markerList[i].setMap(null);
            if(i+1 == ii) {
                markerList.length = 0;
                setRouteList([]);
            }
        }
    }
    function removePositionHandler() {
        for(let i=0, ii=busMarkerList.length; i<ii; i++){
            busMarkerList[i].setMap(null);
            if(i+1 == ii) {
                markerList.length = 0;
                setPositionList([]);
            }
        }
    }

    useEffect(() => {
        if (first != true) {
            setFirst(true);;
            console.log(first);
        }
    }, []);

    function routeIdHandler() {
        if (first == true) {
            axios.get(`http://ws.bus.go.kr/api/rest/busRouteInfo/getBusRouteList?serviceKey=${serviceKey}&strSrch=${busNumber}`)
        .then(response => {
            parseString(response.data, (err:any, result:any) => {
            if(err) {
                console.log('error');
            } else {
                if(result.ServiceResult.msgBody[0] == "") {
                    console.log('no value');

                }
                else{
                    setRouteId(result.ServiceResult.msgBody[0].itemList[0].busRouteId);
                }
            }
            })
        })
        }
    }

    useEffect(() => {
        if( first == true ) {
            // axios.get(`http://ws.bus.go.kr/api/rest/busRouteInfo/getRoutePath?serviceKey=${serviceKey}&busRouteId=100100278`)
            axios.get(`http://ws.bus.go.kr/api/rest/busRouteInfo/getRoutePath?serviceKey=${serviceKey}&busRouteId=${routeId}`)
            .then((response)=> {
                parseString(response.data, (err:any, result: any) => {
                    if(err) {
                        console.log('error');
                    } else {
                        null
                    }
                    setRouteList(result.ServiceResult.msgBody[0].itemList);
                })
            })
        }
    }, [routeId])
    
    useEffect(() => {
        if (first != true) {
            setFirst(true)
        }
        else {
        axios.get(`http://ws.bus.go.kr/api/rest/buspos/getBusPosByRtid?serviceKey=${serviceKey}&busRouteId=${routeId}`)
        .then(response => {
            parseString(response.data, (err:any, result:any) => {
            if(err) {
                console.log('error');
            } else {
                for(let i =0, ii=result.ServiceResult.msgBody[0].itemList.length; i<ii; i++){
                    positionList.push(result.ServiceResult.msgBody[0].itemList[i]);
                }
                // console.log(result.ServiceResult.msgBody[0].itemList)
                console.log(result.ServiceResult.msgBody[0].itemList.length);
            }
            })
        })
    }
    positionList.length = 0;
    }, [routeId]);

    return (
        <>
        {
            routeList.map((route:any, index: number) => {
                if(route.gpsX !== undefined) {
                    return (
                        <span key={'route' + index}>
                            <BusRouteMarker map={copyMap} lat={route.gpsY[0]} lng={route.gpsX[0]} markerList={markerList} />
                        </span>
                    )
                } else {
                    null
                }
            })
        }
        {
            positionList.map((position: any, index: number) => {
                if(position.gpsX !== undefined) {
                    return (
                        <span key={'position' + index}>
                            <BusPositionMarker map={copyMap} lat={position.gpsY[0]} lng={position.gpsX[0]} busMarkerList={busMarkerList}/>
                        </span>
                    )
                } else {
                    null
                }
            })
        }
            <div style={{textAlign: "center"}}>
                <input id="inputBusNumber"/>
                <button onClick={(e)=> {routeIdHandler(); removeRouteHandler(); removePositionHandler(); SubmitHandler();}}>submit</button>
                <button onClick={(e) => {removeRouteHandler(); removePositionHandler();}}>remove markers</button>
            </div>
        </>
    )
}

export default BusComp;