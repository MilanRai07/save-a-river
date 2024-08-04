import React, { useEffect, useState } from 'react'
import Man from '/images/man.png';
import Poop from '/images/poop.png';

const App: React.FC = () => {
  const [randomIndex, setRandomIndex] = useState<number>(0);
  useEffect(() => {
    const interval = setInterval(() => {
      const generateIndex = Math.floor(Math.random() * 3);
      setRandomIndex(generateIndex);
    }, 2010);

    return () => clearInterval(interval);
  }, []);
  return (
    <>
      <main className='bg-scene h-screen w-full bg-cover relative'>
        <div className='absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 flex gap-20'>
          {[0, 1, 2].map((index) => (
            <div className='VerticalDiv' key={index}>
              {index === randomIndex && (
                <img src={Poop} className='Poop' />
              )}
              <img src={Man} className='w-28' />
            </div>
          ))}
        </div>
      </main>
    </>
  )
}

export default App