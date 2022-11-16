import React from "react";

const Marker:React.FC<{
    lat:number
    lng:number
    map: any
    contentText?: string
}> = ({lat,lng,map,contentText}) => {
    var marker = new naver.maps.Marker({
        position: new naver.maps.LatLng({lat, lng}),
        map: map
    });

    var contentString = [contentText].join('')

    var infowindow = new naver.maps.InfoWindow({
        content: contentString
    });
    
    naver.maps.Event.addListener(marker, "click", function(e) {
        if (infowindow.getMap()) {
            infowindow.close();
        } else {
            infowindow.open(map, marker);
        }
    });
return(
    <></>
)
}

export default Marker;