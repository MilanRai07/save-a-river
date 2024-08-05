import React, { useEffect, useState } from 'react'
import Man from '/images/man.png';
import Poop from '/images/poop.png';
import Toilet from '/images/toilet.png';
import useDragHook from './customHook/useDragHook';

const App: React.FC = () => {
  const [randomIndex, setRandomIndex] = useState<number>(0); //stores random number generated

  const { drop, drag, allowDrop } = useDragHook();  //all the drag and drop logic from useDragHook

  useEffect(() => {
    //generated the random number, in every time period 2010 milliseconds
    const interval = setInterval(() => {
      const generateIndex = Math.floor(Math.random() * 3);
      setRandomIndex(generateIndex);
    }, 2010);

    return () => clearInterval(interval); //clean up function after number generation each time
  }, []);

  return (
    <>
      <main className='bg-scene h-screen w-full bg-cover relative'>
        <div className='absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 flex gap-20'>
          {/**First Vertical Div */}
          <div className='VerticalDiv'>
            <img src={Man} className='w-28' alt="Man" draggable='false' />
            {randomIndex === 0 && (         //if randomIndex is 0, the poop exists and falls from here
              <img src={Poop} className='Poop' alt="Poop" draggable='false' />
            )}
            <div                    //div to store toilet image
              id='div1'
              onDrop={drop}
              onDragOver={allowDrop}
              className='DropDiv'
            >
              <img src={Toilet}      //initially the toilet image is at div1
                id='drag'
                draggable='true'
                onDragStart={drag}
                className='Toilet'
              >
              </img>
            </div>
          </div>
          {/**Second Vertical Div */}
          <div className='VerticalDiv'>
            <img src={Man} className='w-28' alt="Man" draggable='false' />
            {randomIndex === 1 && (       //if randomIndex is 1, the poop falls from here
              <img src={Poop} className='Poop' alt="Poop" draggable='false' />
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
            <img src={Man} className='w-28' alt="Man" draggable='false' />
            {randomIndex === 2 && (       //if randomIndex is 2, the poop falls from here
              <img src={Poop} className='Poop' alt="Poop" draggable='false' />
            )}
            <div                         //div to store toilet image
              id='div3'
              onDrop={drop}
              onDragOver={allowDrop}
              className='DropDiv'
            >
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default App;