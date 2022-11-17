import React, { useState } from 'react';
import './App.css';
import NaverMap from './components/NaverMap';
import BusComp from './components/BusComp';

function App() {
  const [copyMap, setCopyMap] = useState<naver.maps.Map>()

  function copyingMap(map:any) {
    setCopyMap(map)
  }
  return (
    <div className="App">
      <NaverMap copyingMap={copyingMap} copyMap={copyMap}/>
      <BusComp copyMap={copyMap}/>
    </div>
  );
}

export default App;
