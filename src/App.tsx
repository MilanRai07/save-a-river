import React, { useEffect, useRef, useState } from 'react'
import Man from '/images/man.png';
import Poop from '/images/poop.png';
import Toilet from '/images/toilet.png';
import useDragHook from './customHook/useDragHook';

const App: React.FC = () => {
  const [randomIndex, setRandomIndex] = useState<number | null>(null); //stores random number generated
  const [hasMeet, setHasMeet] = useState<boolean>(false) //check whether the poop and toilet has collided
  const [count, setCount] = useState<number>(0)   //stores the number of poop and toilet collided
  const [gameOver, setGameOver] = useState<boolean>(false) //sets if poop is failed to meet toilet
  const [startTime, setStartTime] = useState<number>(5) //intial timer 5s
  const [fallTime, setFallTime] = useState<string>('4s'); //time taken to fall the poop
  const poopRef: any = useRef();   //ref for tracking of poop
  const toiletRef: any = useRef(); //ref for tracking of toilet

  const verticalDivs = [
    { id: 'div1', index: 0 },
    { id: 'div2', index: 1 },
    { id: 'div3', index: 2 }
  ];

  const { drop, drag, allowDrop } = useDragHook();  //all the drag and drop logic from useDragHook

  //to start the timer to start the game, generate random index at the begining only
  useEffect(() => {
    const interval = setInterval(() => {
      if (startTime > 0) {
        setStartTime(prevTime => prevTime - 1);
      } else {
        //generate randomIndex for first poop fall down
        const generateIndex = Math.floor(Math.random() * 3);
        setRandomIndex(generateIndex);
        setStartTime(0);
        // Stop the interval after setting the randomIndex
        clearInterval(interval);
      }
    }, 1000);

    // Cleanup function to clear the interval
    return () => clearInterval(interval);
  }, [startTime])

  //to check for poop and toilet collison, also set Random Index 
  useEffect(() => {
    const checkCollision = () => {
      if (toiletRef.current && poopRef.current) {
        const poopRect = poopRef.current.getBoundingClientRect();
        const helloRect = toiletRef.current.getBoundingClientRect();

        const checkCollide = poopRect.bottom >= helloRect.top &&
          poopRect.top <= helloRect.bottom &&
          poopRect.right >= helloRect.left &&
          poopRect.left <= helloRect.right;
        if (checkCollide) {
          setHasMeet(true)  //the poop and toilet has collided
          setRandomIndex(Math.floor(Math.random() * 3))
          //generates random number fast when the poop and toilet collide/ to avoid poop touching the bottom of the div
        } else {
          setHasMeet(false)   //the poop and toilet is failed to collide
          if (poopRect.bottom > 500) {  //if the poop falls the bottom without touching the toilet, gameOver is true
            setGameOver(true)
            setFallTime('4s') //set the fallTIme to 4s after gameOver
          }
        }
      }
      requestAnimationFrame(checkCollision); //repeatedly checking for collision
    };
    requestAnimationFrame(checkCollision); //starts the collision checking

    //increase the speed of the poop falling
    if (count == 10) {
      setFallTime('3s')
    } else if (count == 25) {
      setFallTime('2s')
    } else if (count >= 40) {
      setFallTime('1s')
    }
  }, [count]);

  //to update the count value
  useEffect(() => {
    if (hasMeet) {
      setCount(count + 1)  //increase the count if poop and toilet is meet
    }
  }, [hasMeet])

  //to reset the game after Play Again Button
  const reset = () => {
    setCount(0);
    setGameOver(false)
    setRandomIndex(null)
    setStartTime(5)
  }
  return (
    <>
      <main className='bg-scene h-screen w-full bg-cover relative'>
        {
          startTime == 0 ?
            ''
            :
            <p className='GameCounter'>Drag the Toilet at the dark zone. Game Starts in: {startTime} seconds</p>
        }
        <div className='ContentDiv'>
          <div className='text-center'>
            {/** Score Count */}
            <p className='GameScore'>Score: {count}</p>
          </div>
          {
            gameOver ?
              //if true, show Game Over Message
              <div className='text-center' >
                <p className='GameOver'>Game Over. <br></br>The poop has entered the river</p><br></br>
                <button className='Button' onClick={reset}>Play Again</button>
              </div>
              :
              //if false, play the game
              <div className=' flex gap-20'>

                {verticalDivs.map(({ id, index }) => (
                  <div className='VerticalDiv' key={id}>
                    <img src={Man} className='w-28 select-none' alt="Man" draggable='false' />
                    {randomIndex === index && (
                      <img
                        src={Poop}
                        className='Poop'
                        style={{ animation: `var(--animation-movedown) ${fallTime} infinite` }}
                        alt="Poop"
                        draggable='false'
                        ref={poopRef}
                      />
                    )}
                    <div
                      id={id}
                      onDrop={drop}
                      onDragOver={allowDrop}
                      className='DropDiv'
                    />
                  </div>
                ))}
                <div id='initalToilet' className='w-[100px] h-28 absolute -right-28'>
                  <img src={Toilet}
                    id='drag'
                    draggable='true'
                    onDragStart={drag}
                    className='Toilet'
                    ref={toiletRef}
                  >
                  </img> <br></br>

                </div>
              </div>
          }
        </div>
      </main>
    </>
  );
};

export default App;