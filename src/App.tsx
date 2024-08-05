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
  const poopRef: any = useRef();   //ref for tracking of poop
  const toiletRef: any = useRef(); //ref for tracking of toilet

  const { drop, drag, allowDrop } = useDragHook();  //all the drag and drop logic from useDragHook

  //to start the timer to start the game, generate random index at the begining only
  useEffect(() => {
    const interval = setInterval(() => {
      if (startTime > 0) {
        setStartTime(prevTime => prevTime - 1);
      } else {
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
          }
        }
      }
      requestAnimationFrame(checkCollision); //repeatedly checking for collision
    };
    requestAnimationFrame(checkCollision); //starts the collision checking
  }, []);

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
                {/**First Vertical Div */}
                <div className='VerticalDiv'>
                  <img src={Man} className='w-28 select-none' alt="Man" draggable='false' />
                  {randomIndex === 0 && (         //if randomIndex is 0, the poop exists and falls from here
                    <img src={Poop} className='Poop' alt="Poop" draggable='false' ref={poopRef} />
                  )}
                  <div                    //div to store toilet image
                    id='div1'
                    onDrop={drop}
                    onDragOver={allowDrop}
                    className='DropDiv'

                  >

                  </div>
                </div>
                {/**Second Vertical Div */}
                <div className='VerticalDiv'>
                  <img src={Man} className='w-28 select-none' alt="Man" draggable='false' />
                  {randomIndex === 1 && (       //if randomIndex is 1, the poop falls from here
                    <img src={Poop} className='Poop' alt="Poop" draggable='false' ref={poopRef} />
                  )}
                  <div                         //div to store toilet image
                    id='div2'
                    onDrop={drop}
                    onDragOver={allowDrop}
                    className='DropDiv'

                  >
                  </div>
                </div>
                {/**Third Vertical Div */}
                <div className='VerticalDiv'>
                  <img src={Man} className='w-28 select-none' alt="Man" draggable='false' />
                  {randomIndex === 2 && (       //if randomIndex is 2, the poop falls from here
                    <img src={Poop} className='Poop' alt="Poop" draggable='false' ref={poopRef} />
                  )}
                  <div                         //div to store toilet image
                    id='div3'
                    onDrop={drop}
                    onDragOver={allowDrop}
                    className='DropDiv'

                  >
                  </div>
                </div>
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