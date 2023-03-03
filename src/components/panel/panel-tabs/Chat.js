import React from "react";
import uuid from 'react-uuid';

export function Wall ({chatMessages}) {
  const wallBottomRef = React.useRef('null');
  
  React.useEffect(() => {
    const wall = wallBottomRef.current;
    wall.scrollIntoView(false);

  })

  return (
    <div className='wall'>
      {chatMessages.map((message) => {
        return (
          <p key={uuid()}> userName : {message}</p>
        )
      })}
      <p ref={wallBottomRef}>^</p>
    </div>
  )
}

export function Chat ({chatMessages, setChatMessages}) {
  const [textArea, setTextArea] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setChatMessages([...chatMessages, textArea]);
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
            value={textArea}
            onChange={(e) => setTextArea(e.target.value)}
          />
        </label>
      </form>
    </div>
  )
}
