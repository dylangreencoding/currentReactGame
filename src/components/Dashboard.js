import React from "react";
import Canvas from "./canvas/Canvas";
import { Panel, PanelNav } from "./panel/Panel.js";
import { boardTemplate } from './API';

function Dashboard () {
  const [board, setBoard] = React.useState(boardTemplate());

  const [activeTab, setActiveTab] = React.useState('home');

  return (
    <div className='dashboard'>
      <Canvas 
        width={window.innerWidth * 0.75}
        height={window.innerHeight}
        board={board}
        setBoard={setBoard}
      />

      <div className='panel'>
        <Panel
          board={board}
          setBoard={setBoard}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        <PanelNav
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </div>
    </div>
  )
}

export default Dashboard;



