import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import BusRouteMarker from "./BusRouteMarker";

const BusComp:React.FC<{
    copyMap: any
}> = ({copyMap}) => {
    var markerList:any = [];
    const [busNumber, setBusNumber] = useState('');
    const [first, setFirst] = useState(false);
    const [routeId, setRouteId] = useState('');
    const [routeList, setRouteList] = useState([]);
    
    const SubmitHandler = useCallback(() => {
        var inputValue = (document.getElementById('inputBusNumber') as HTMLInputElement).value
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

    const serviceKey = 'DyV%2Ft402FreKPw4bzIbXIGjVUngF6aP09Isf3pEI2hpAKGXUsi6vhBmtmsnmViFq3rcn2plpA2%2FUPe6kTNCniw%3D%3D'
    var parseString = require('xml2js').parseString;
    useEffect(() => {
        if (first != true) {
            setFirst(true)
        }
        else {
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
    }, [busNumber]);

    useEffect(() => {
        if( first != true ) {
            setFirst(true);
        } else {
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
                console.log(result.ServiceResult.msgBody[0])
                // if(result.ServiceResult.msgBody[0] == "") {
                //     console.log('no value');

                // }
                // else{
                //     setRouteId(result.ServiceResult.msgBody[0].itemList[0].busRouteId
                // }
            }
            })
        })
    }
    }, [routeId]);

    return (
        <>
        {
            routeList.map((route:any, index: number) => {
                if(route.gpsX !== undefined) {
                    return (
                        <span key={index}>
                            <BusRouteMarker map={copyMap} lat={route.gpsY[0]} lng={route.gpsX[0]} busNumber={busNumber} markerList={markerList} index={index}/>
                        </span>
                    )
                } else {
                    null
                }
            })
        }
            <div style={{textAlign: "center"}}>
                <input id="inputBusNumber"/>
                <button onClick={(e)=> {e.preventDefault(); removeRouteHandler(); SubmitHandler();}}>submit</button>
            </div>
        </>
    )
}

export default BusComp