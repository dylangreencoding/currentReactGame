import React from "react";
import uuid from 'react-uuid';

export function Wall ({chatMessage, setChatMessage}) {
  console.log('wall rendered')
  const wallBottomRef = React.useRef('null');
  
  React.useEffect(() => {
    const wall = wallBottomRef.current;
    wall.scrollIntoView(false);

  })

  return (
    <div style={wallStyle}>
      {chatMessage.map((message) => {
        return (
          <p key={uuid()}> userName : {message}</p>
        )
      })}
      <p ref={wallBottomRef}>^</p>
    </div>
  )
}

const wallStyle = {
  overflowY: 'auto'
}

export function Chat ({chatMessage, setChatMessage}) {

  const [textArea, setTextArea] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setChatMessage([...chatMessage, textArea]);
    setTextArea('');
  }

  return (
    <div>
      <form className='chat-form' method='post' onSubmit={handleSubmit}>
        <button className='chat-button' type='submit'>^</button>
        <label>
          <input
            className='chat-input'
            name='postChat'
            type='text'
            autoComplete='off'
            style={textareaStyle}
            value={textArea}
            onChange={(e) => setTextArea(e.target.value)}
          />
        </label>
        
      </form>
    </div>
  )
}



const textareaStyle = {
  resize: 'none',
  width: '100%'
}