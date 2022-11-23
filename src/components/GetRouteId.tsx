import axios from "axios";
import React, { useEffect, useState } from "react";
import { interval } from "./GetBusPosition";
import { parseString, serviceKey } from "./NewBusComp";

const GetRouteId:React.FC<{
    routeIdHandler: (busNum:any) => void
}> = ({routeIdHandler}) => {
    const [busNumber, setBusNumber] = useState('');
    const [mounted, setMounted] = useState(false);
    // const busList : any[] = []
    const [busList, setBusList] = useState<any[]>([]);
    
    useEffect(() => {
        if(mounted == false){
            setMounted(true);
        } else {
            busRouteIdHandler();
        }
    }, [busNumber]);

    function getBusNumber() {
        var inputValue = (document.getElementById('inputBusNumber') as HTMLInputElement).value;
        setBusNumber(inputValue);
        if(busNumber == inputValue) {
            busRouteIdHandler();
        } else {
            null
        }
    }

    function busTypeSwitch(busType: string) {
        switch(busType) {
            case '1' :
                return '공항';
            case '2' :
                return '마을';
            case '3' :
                return '간선';
            case '4' :
                return '지선';
            case '5' :
                return '순환';
            case '6' :
                return '광역';
            case '7' :
                return '인천';
            case '8' :
                return '경기';
            case '9' :
                return '폐지';
            case '0' :
                return '공용';
            default:
                return ''
        }
    }

    function busRouteIdHandler() {
        axios.get(`http://ws.bus.go.kr/api/rest/busRouteInfo/getBusRouteList?serviceKey=${serviceKey}&strSrch=${busNumber}`)
        .then(response => {
            parseString(response.data, (err:any, result:any) => {
            if(err) {
                console.log('error');
            } else {
                if(result.ServiceResult.msgBody[0] == "") {
                    console.log('no value');
                    console.log(result);
                }
                else{
                    // routeIdHandler(result.ServiceResult.msgBody[0].itemList[0].busRouteId);
                    setBusList(result.ServiceResult.msgBody[0].itemList);
                }
            }
            })
        })
        }
    return(
        <div className="busMenu" style={{textAlign: 'center', height:'40px'}}>
            <div className="searcharea" style={{}}>
                <form>
                    <input style={{border: 'none', padding: '10px', width: '50%'}} id="inputBusNumber"/>
                    <button style={{border: 'none', cursor: 'pointer', background: '#FFF', padding: '10px', width: '30%' , overflow: 'hidden'}} onClick={(e) => {e.preventDefault(); getBusNumber();}}>submit</button>
                </form>
                </div>
            <div>
                {
                    busList.map((buses: any, index: number) => {
                        return(
                            buses.routeType[0] != 8 ?
                            <div style={{border: '1px solid black', borderRadius: '10px', margin: '10px'}} key={index} onClick={(e) => {routeIdHandler(buses.busRouteId[0]); clearInterval(interval);}} >
                                <div style={{display: "flex", gap: '20px', justifyContent: 'center', margin: '10px'}}>
                                    <span>{busTypeSwitch(buses.routeType[0])}</span>
                                    <strong>{buses.busRouteNm[0]}</strong>
                                </div>
                                <hr/>
                                <div style={{margin: '10px'}} className="stationName">
                                    <span>
                                        {buses.stStationNm[0]}
                                    </span>
                                        <span> {'<--->'} </span>
                                    <span>
                                        {buses.edStationNm[0]}
                                    </span>
                                </div>
                            </div>
                            : null
                        )
                    })
                }
            </div>
        </div>
    )
}

export default GetRouteId;