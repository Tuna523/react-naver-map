import React, { useEffect } from "react";

const NaverMap = () => {
    useEffect(() => {
        let map
        let marker
        const initMap = () => {
            map = new naver.maps.Map('map', {
                //지도 추가, 좌표를 기점으로 주변 지도가 추가된다.
                center: new naver.maps.LatLng(37, 127.039573),
                zoom: 13
            })

            marker = new naver.maps.Marker({
                position: new naver.maps.LatLng(37, 127.039573), //Marker 추가, 좌표에 마커가 찍힌다.
                map: map,
                icon: {
                    content: `
              <img alt="marker" src={vectorIcon} /> //마커에 사용할 이미지
            `
                }
            })
        }
        initMap()
    }, [])

    const mapStyle = {
        width: '45vw',
        height: '22vw'
    }

    return (
        <>
            <div id="map" style={mapStyle} />
       
        </>
    )
}

export default NaverMap