import axios from "axios";
import React, { useEffect, useState } from "react";
import { parseString, serviceKey } from "./NewBusComp";

const GetRouteId:React.FC<{
    routeIdHandler: (busNum:any) => void
}> = ({routeIdHandler}) => {
    const [busNumber, setBusNumber] = useState('');
    const [mounted, setMounted] = useState(false);
    
    useEffect(() => {
        if(mounted == false){
            setMounted(true);
        } else {
            testFunction();
        }
    }, [busNumber]);

    function getBusNumber() {
        var inputValue = (document.getElementById('inputBusNumber') as HTMLInputElement).value;
        setBusNumber(inputValue);
        if(busNumber == inputValue) {
            testFunction()
        } else {
            null
        }
    }

    function testFunction() {
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
                    routeIdHandler(result.ServiceResult.msgBody[0].itemList[0].busRouteId);
                }
            }
            })
        })
        }
    
    return(
        <div style={{textAlign: 'center'}}>
            <input id="inputBusNumber"/>
            <button onClick={(e) => {getBusNumber();}}>submit</button>
        </div>
    )
}

export default GetRouteId;