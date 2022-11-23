import React, { useEffect } from "react";
import Marker from "./Marker";
import FourPolygon from "./FourPolygon";
import $ from 'jquery';

const { naver } = window;

const NaverMap:React.FC<{
    copyingMap: (map:any) => void
    copyMap: any
}> = ({copyingMap, copyMap}) => {
    
    useEffect(() => {

        const initMap = () => {

        // 처음 화면에 로드되는 지도
        var map = new naver.maps.Map('map', {
            center: new naver.maps.LatLng(37.469559, 126.898196), // 지도에 중심에 표시되는 장소
            minZoom: 8, // 최소 줌 
            zoom: 20, // 처음 로드 되었을 때 줌 상태
            maxZoom: 20, // 최대 줌
            scaleControl: true,
            logoControl: true,
            mapDataControl: true,
            mapTypeControl: true,
            zoomControl: true,
            zoomControlOptions: {
                style: naver.maps.ZoomControlStyle.SMALL,
                position: naver.maps.Position.TOP_RIGHT
            }
        });
        
        // 마커 리스트 + 우클릭 시 메뉴 뜨기
        var markerList:any = [];
        var menuLayer = $('<div style="position:absolute;z-index:10000;background-color:#fff;border:solid 1px #333;padding:10px;display:none;"></div>');
    
        map.getPanes().floatPane.appendChild(menuLayer[0]);
    
        naver.maps.Event.addListener(map, 'click', function(e) {
            var marker = new naver.maps.Marker({
                position: e.coord,
                map: map
            });
    
            markerList.push(marker);
        });
    
        naver.maps.Event.addListener(map, 'keydown', function(e) {
            var keyboardEvent = e.keyboardEvent,
                keyCode = keyboardEvent.keyCode || keyboardEvent.which;
    
            var ESC = 27;
    
            if (keyCode === ESC) {
                keyboardEvent.preventDefault();
    
                for (var i=0, ii=markerList.length; i<ii; i++) {
                    markerList[i].setMap(null);
                }
    
                markerList = [];
    
                menuLayer.hide();
            }
        });
    
        naver.maps.Event.addListener(map, 'mousedown', function(e) {
            menuLayer.hide();
        });
    
        naver.maps.Event.addListener(map, 'rightclick', function(e) {
            var coordHtml =
                'Coord: '+ '(우 클릭 지점 위/경도 좌표)' + '<br />' +
                'Point: ' + e.point + '<br />' +
                'Offset: ' + e.offset;
    
            menuLayer.show().css({
                left: e.offset.x,
                top: e.offset.y
            }).html(coordHtml);
    
            console.log('Coord: ' + e.coord.toString());
        });

        // OSM 지도 스타일
        var openStreetMapType = new naver.maps.ImageMapType({
            name: 'OSM',
            minZoom: 0,
            maxZoom: 19,
            tileSize: new naver.maps.Size(256, 256),
            projection: naver.maps.EPSG3857,
            repeatX: true,
            tileSet: "https://c.tile.openstreetmap.org/{z}/{x}/{y}.png",
            provider: [{
                title: " /OpenStreetMap", // 출처 표기는 이미지 제공처의 정책을 따라야 합니다.
                link: "http://www.openstreetmap.org/copyright"
            }]
        });
        
        map.mapTypes.set('osm', openStreetMapType);
        map.setMapTypeId('osm');
        copyingMap(map);
        


        //거리뷰 ON / OFF
        var streetLayer = new naver.maps.StreetLayer();

        var btn = $('#street');
        
        naver.maps.Event.addListener(map, 'streetLayer_changed', function(streetLayer) {
            if (streetLayer) {
                btn.addClass('control-on');
            } else {
                btn.removeClass('control-on');
            }
        });
        
        btn.on("click", function(e) {
            e.preventDefault();
        
            if (streetLayer.getMap()) {
                streetLayer.setMap(null);
            } else {
                streetLayer.setMap(map);
            }
        });
        
        naver.maps.Event.once(map, 'init', function() {
            streetLayer.setMap(map);
        });

        // 처음 로드 되었을 때 표시되는 기본 마커
        var marker = new naver.maps.Marker({
            position: new naver.maps.LatLng(37.469616, 126.898422),
            map: map,
/*             icon: {
                url: ''
            } */
        })
        naver.maps.Event.addListener(map, 'click', function(e) {
    // marker.setPosition(e.coord); // 원래 있던 마커의 위치를 변경 ( 원래 있던 마커는 제거 )
    
    // 원래 있던 마커를 유지하고 새로운 마커를 클릭할 때 마다 추가
/*     new naver.maps.Marker({
        position: new naver.maps.LatLng(e.coord),
        map:map
    }) */
});

var contentString = [
    '<div class="iw_inner">',
        '<h3>옥스 PC방</h3>',
        '<p>금천우체국 근처 피시방 | PC방 <br />',
        '지하',
            '<br />',
            '</p>',
            '</div>'
].join('');

var infowindow = new naver.maps.InfoWindow({
    content: contentString,
    maxWidth: 1000,
    backgroundColor: 'White',
    disableAnchor: true,
    pixelOffset: new naver.maps.Point(0 , -5)
});

naver.maps.Event.addListener(marker, "click", function(e) {
    if (infowindow.getMap()) {
        infowindow.close();
    } else {
        infowindow.open(map, marker);
    }
});

        }
        
        initMap()
        
    }, [])
    
    const mapStyle = {
        width: '100%',
        height: '1000px'
    }
    return (
        <>
            <div id="map" style={mapStyle} />
            <>
                <Marker lat={37.466660} lng={126.897422} map={copyMap}
                contentText={" '<div class='iw_inner'><h3>아레나 PC방</h3><p>(구) 우시장 근처 피시방 | PC방 <br/> 2층 </div> "}
                />
                <FourPolygon map={copyMap} lat={[37.466552,37.466574,37.466815,37.466831]} lng={[126.897476, 126.897159, 126.897177, 126.897541]}/>

                <Marker lat={37.468738} lng={126.896848} map={copyMap}
                contentText={" '<div class='iw_inner'><h3>홈플러스</h3><p>HomePlus<br/></div> "}
                />
                <FourPolygon map={copyMap} lat={[37.468076,37.468163,37.469166,37.469086]} lng={[126.897685, 126.896178, 126.896218, 126.897748]}/>

                <Marker lat={37.470386} lng={126.895728} map={copyMap}
                contentText={" '<div class='iw_inner'><h3>빅마켓</h3><p>Vic Market<br/></div> "}
                />
            </>
            <input style={{height: '20px', position: 'absolute', right: '10px', top: '0', margin: '5px'}} id="street" type="button" value="거리뷰" className="control-btn"/>
        </>
    )
}

export default NaverMap