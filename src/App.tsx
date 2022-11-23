import React, { useState } from 'react';
import './App.css';
import NaverMap from './components/NaverMap';
// import BusComp from './components/BusComp';
import NewBusComp from './components/NewBusComp';

function App() {
  const [copyMap, setCopyMap] = useState<naver.maps.Map>()

  function copyingMap(map:any) {
    setCopyMap(map)
  }
  function classHandler() {
    var contents = $('#busContents');
    if(contents.hasClass('hideContents')){
        contents.removeClass('hideContents');
    } else {
        contents.addClass('hideContents');
    }
}
  return (
    <>
    <button style={{border: '1px solid black', borderRadius: '5px' ,cursor: 'pointer', zIndex: '2000', background: 'white', display:'block', margin: '5px'}} onClick={(e) => {classHandler();}} >버스 메뉴</button>
      <div className="App">
        <NewBusComp copyMap={copyMap}/>
        <NaverMap copyingMap={copyingMap} copyMap={copyMap}/>
        {/* <BusComp copyMap={copyMap}/> */}
      </div>
    </>
  );
}

export default App;
