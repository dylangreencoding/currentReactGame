import React from "react";
import { Resources } from "./panel-tabs/Resources.js";
import { Games } from "./panel-tabs/Games.js";
import { Wall, Chat } from "./panel-tabs/Chat.js"


export function PanelNav({activeTab, setActiveTab}) {

  const handleResourcesTab = () => {
    setActiveTab('resources');
  };

  const handleGamesTab = () => {
    setActiveTab('games');
  }

  const handleChatTab = () => {
    setActiveTab('chat');
  }

  return (
      <nav className='nav'>
        <span
          className={`nav-item ${activeTab === 'resources' ? 'active' : ''}`}
          onClick={handleResourcesTab}
        >
          RESOURCES
        </span>
        <span
          className={`nav-item ${activeTab === 'games' ? 'active' : ''}`}
          onClick={handleGamesTab}
        >
          GAMES
        </span>
        <span
          className={`nav-item ${activeTab === 'chat' ? 'active' : ''}`}
          onClick={handleChatTab}
        >
          CHAT
        </span>
      </nav>
  )
}

export function Panel ({board, setBoard, activeTab, setActiveTab}) {

  const [chatMessage, setChatMessage] = React.useState(['welcome back']);


  const displayActiveTab = () => {
    if (activeTab === 'resources') {
      return <Resources />
    } else if (activeTab === 'games') {
      return <Games board={board} setBoard={setBoard}/> 
    } else if (activeTab === 'chat') {
      return <Chat chatMessage={chatMessage}
      setChatMessage={setChatMessage} />
    }
  }

  const displayWall = () => {
    if (activeTab === 'chat') {
      return <Wall chatMessage={chatMessage}
      setChatMessage={setChatMessage}/>
    }
  }

  return (
    <div className={activeTab === 'chat' ? 'chat-panel-item' : 'panel-item'}>
      {displayWall()}
      {displayActiveTab()}
    </div>
  )
}

