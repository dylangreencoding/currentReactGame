import React from 'react';

function Canvas ({
  width, height, board, setBoard
}) {

  const canvasRef = React.useRef(null)

  function draw (ctx, w, h, board) {  
    ctx.clearRect(0, 0, w, h);
    ctx.strokeStyle = "#424242";

    for (let x = board.origin.x; x <= board.apogee.x; x += board.scale) {
      ctx.beginPath();
      ctx.moveTo(x, board.origin.y);
      ctx.lineTo(x, board.apogee.y);
      ctx.moveTo(x, board.origin.y);
      ctx.closePath();
      ctx.stroke();
    }
    for (let y = board.origin.y; y <= board.apogee.y; y += board.scale) {
      ctx.beginPath();
      ctx.moveTo(board.origin.x, y);
      ctx.lineTo(board.apogee.x, y);
      ctx.moveTo(board.origin.x, y);
      ctx.closePath();
      ctx.stroke();
    }

    for (const zombie of board.zombies) {
      ctx.fillStyle = 'green';
      ctx.beginPath();
      ctx.arc(zombie.x + (board.scale*0.5), zombie.y + (board.scale*0.5), board.scale*0.25, 0, Math.PI*2);
      ctx.closePath();
      ctx.fill();
    }

    for (const wall of board.walls) {
      ctx.strokeStyle = '#FAFAFA';
      ctx.beginPath();
      ctx.moveTo(wall.begin.x, wall.begin.y);
      ctx.lineTo(wall.end.x, wall.end.y);
      ctx.closePath();
      ctx.stroke();
    }


    ctx.strokeStyle = 'gold';
    ctx.beginPath();
    ctx.strokeRect(board.selected.x, board.selected.y, board.scale, board.scale)
    ctx.closePath();
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(board.selector.x + (board.scale*0.5), board.selector.y + (board.scale*0.5), board.scale*0.25, 0, Math.PI*2);
    ctx.closePath();
    ctx.stroke();
    
  }

  React.useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth * 0.75;
    canvas.height = window.innerHeight;
    
    const currentBoard = board;

    const getHashX = () => {
      let hashX = {};
      let currentSquare = board.origin.x;
      let hashCounter = 0;
      for (let x = board.origin.x; x < board.apogee.x; x++) {
        if (hashCounter === board.scale) {
          currentSquare += board.scale;
          hashCounter = 0
        }
        hashCounter += 1;
        hashX[x] = currentSquare;
      }
      return hashX
    }

    const getHashY = () => {
      let hashY = {};
      let currentSquare = board.origin.y;
      let hashCounter = 0;
      for (let y = board.origin.y; y < board.apogee.y; y++) {
        if (hashCounter === board.scale) {
          currentSquare += board.scale;
          hashCounter = 0
        }
        hashCounter += 1;
        hashY[y] = currentSquare;
      }
      return hashY
    }

    let mouse = { pressed: false, movedMap: false, movementXY: {}, position: {}, selected: {} };

    const getMousePositionXY = (e) => {
      let positionX = hashX[e.clientX];
      let positionY = hashY[e.clientY];
      return {
        x: positionX,
        y: positionY
      }
    }
    const getMouseMovementXY = (e) => {
      return {
        x: e.movementX,
        y: e.movementY
      }
    }

    draw(ctx, canvas.width, canvas.height, currentBoard);
    let hashX = getHashX();
    let hashY = getHashY();

    const handleMouseDown = (e) => {
      mouse.pressed = true;
    }

    const handleMouseMove = (e) => {
      mouse.position = getMousePositionXY(e);

      mouse.movementXY = getMouseMovementXY(e);
      if (mouse.pressed === true) {
        mouse.movedMap = true;
        currentBoard.selector = {};

        currentBoard.origin.x += mouse.movementXY.x;
        currentBoard.origin.y += mouse.movementXY.y;
        currentBoard.apogee.x += mouse.movementXY.x;
        currentBoard.apogee.y += mouse.movementXY.y;

        currentBoard.selected.x += mouse.movementXY.x
        currentBoard.selected.y += mouse.movementXY.y

        for (const zombie of currentBoard.zombies) {
          zombie.x += mouse.movementXY.x;
          zombie.y += mouse.movementXY.y;
        }
        for (const wall of currentBoard.walls) {
          wall.begin.x += mouse.movementXY.x;
          wall.begin.y += mouse.movementXY.y;
          wall.end.x += mouse.movementXY.x;
          wall.end.y += mouse.movementXY.y;
        }
      } else {
        currentBoard.selector.x = mouse.position.x;
        currentBoard.selector.y = mouse.position.y;
      }
      draw(ctx, canvas.width, canvas.height, currentBoard);
    }

    const handleMouseUp = (e) => {
      mouse.pressed = false;
      mouse.selected = getMousePositionXY(e)
      if (mouse.movedMap === false) {
        if ((mouse.selected.x === board.selected.x && mouse.selected.y === board.selected.y) || mouse.selected.x === undefined || mouse.selected.y === undefined) {
          currentBoard.selected = { x: undefined, y: undefined };
        } else {
          currentBoard.selected = mouse.selected;
        }
        setBoard({...board, currentBoard});
        draw(ctx, canvas.width, canvas.height, currentBoard);
        
      }
      hashX = getHashX();
      hashY = getHashY();
      mouse.movedMap = false;
    }

    const handleMouseLeave = (e) => {
      mouse.pressed = false;
      currentBoard.selector.x = undefined;
      currentBoard.selector.y = undefined;
      draw(ctx, canvas.width, canvas.height, currentBoard);
    }

    const handleResize = (e) => {
      canvas.width = window.innerWidth * 0.75;
      canvas.height = window.innerHeight;
      draw(ctx, canvas.width, canvas.height, currentBoard);
    }

    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', handleResize);
    return () => {
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseup', handleMouseUp);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
      console.log('cleaned up')
    }
  }, [board, setBoard]);

  return (
      <canvas
        width={width}
        height={height}
        className='canvas'
        ref={canvasRef}
      />
  )
}

export default Canvas;



