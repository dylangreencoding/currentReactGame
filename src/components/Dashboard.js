import React from "react";
import Canvas from "./canvas/Canvas";
import { Panel, PanelNav } from "./panel/Panel.js";
import { boardTemplate } from './API';

function Dashboard () {
  const [board, setBoard] = React.useState(boardTemplate());

  const [activeTab, setActiveTab] = React.useState('resources');

  return (
    <div style={dashboardStyle}>
      <Canvas 
        width={window.innerWidth * 0.75}
        height={window.innerHeight}
        board={board}
        setBoard={setBoard}
      />

      <div style={PanelStyle}>
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

const dashboardStyle = {
  display: 'flex'
}

const PanelStyle = {
  width: '25vw',
  height: '100vh',
  backgroundColor: '#333',
  color: '#DDD',

  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between'
}