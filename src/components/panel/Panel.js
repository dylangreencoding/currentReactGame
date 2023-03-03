import React from "react";
import { Home } from "./panel-tabs/Home.tsx";
import { Play } from "./panel-tabs/Play.js";
import { Wall, Chat } from "./panel-tabs/Chat.js"


export function PanelNav({activeTab, setActiveTab}) {

  const handleHomeTab = () => {
    setActiveTab('home');
  };

  const handlePlayTab = () => {
    setActiveTab('play');
  }

  const handleChatTab = () => {
    setActiveTab('chat');
  }

  return (
      <nav className='panel-nav'>
        <span
          className={`nav-item ${activeTab === 'home' ? 'active' : ''}`}
          onClick={handleHomeTab}
        >
          HOME
        </span>
        <span
          className={`nav-item ${activeTab === 'play' ? 'active' : ''}`}
          onClick={handlePlayTab}
        >
          SESSION
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

  const [chatMessages, setChatMessages] = React.useState([`each chat is associated with a either a board template or game - there are no "friends" on this platform - to invite someone to play in a game you are hosting (or collaborate on a map), you have to know their username and they have to know your game (or map) "secret key"`]);


  const displayActiveTab = () => {
    if (activeTab === 'home') {
      return <Home />
    } else if (activeTab === 'play') {
      return <Play board={board} setBoard={setBoard}/> 
    } else if (activeTab === 'chat') {
      return <Chat chatMessages={chatMessages}
      setChatMessages={setChatMessages} />
    }
  }

  const displayWall = () => {
    if (activeTab === 'chat') {
      return <Wall chatMessages={chatMessages}
      setChatMessages={setChatMessages}/>
    }
  }

  return (
    <div className={activeTab === 'chat' ? 'chat-panel-item' : 'panel-item'}>
      {displayWall()}
      {displayActiveTab()}
    </div>
  )
}

