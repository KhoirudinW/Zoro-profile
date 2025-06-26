import React, { useState, useRef, useEffect } from 'react';

const menuItems = [ 'Skills' ,'About', 'Home',];

const Mainmenu = () => {
    const [flipped, setFlipped] = useState(false);
    const [active, setActive] = useState(false);
    const [rotation, setRotation] = useState(0);
    const svgRef = useRef(null);
    const MIN_ROTATION = -20;
    const MAX_ROTATION = 30;
    const STEP = 15; // derajat per scroll


    const averageCharWidth = 11; // rata-rata width tiap huruf (px)
    const textLength = menuItems.join(' • ').length + (menuItems.length * 3); // termasuk bullet
    const approxTextWidth = averageCharWidth * textLength;

    const circleRadius = 120; // harus sama dengan yg di path SVG
    const circumference = 2 * Math.PI * circleRadius;
    const maxRotation = (approxTextWidth / circumference) * 360;


    // Scroll to rotate
    const handleWheel = (e) => {
        e.preventDefault();
        const delta = e.deltaY > 0 ? STEP : -STEP;
      
        setRotation((prev) => {
          let next = prev + delta;
          if (next < MIN_ROTATION) next = MIN_ROTATION;
          if (next > MAX_ROTATION) next = MAX_ROTATION;
          return next;
        });
      };
      

    useEffect(() => {
        const container = svgRef.current?.parentElement;
        container.addEventListener('wheel', handleWheel, { passive: false });

        return () => {
        container.removeEventListener('wheel', handleWheel);
        };
    }, [rotation]);

    const toggleClick = () => {
        let timeOut = 300
        if (flipped) {
            setFlipped(false);
            setTimeout(() => {
                setActive(false);
            }, timeOut); // setelah animasi selesai
        }else{
            setFlipped(true);
            setTimeout(() => {
                setActive(true);
            }, timeOut); // setelah animasi selesai
        }
    };

    const listInActive = {display: 'none', zIndex: 0};
    const listActive = {display: 'block', zIndex: 150};

    

  return (
    <div 
        className="fixed top-5 right-5 flip-container size-16 z-[1000]"
    >
         {/* Circular Text SVG */}
    <div className='hidden sm:block'>

      <svg
        ref={svgRef}
        className={`circular-menu-svg select-none `}
        width="500"
        height="500"
        viewBox="0 0 300 300"
        style={{ transform: `rotate(${rotation + 255}deg)` }}
      >
        <defs>
          <path
            id="circlePath"
            d="M 150,150 m -120,0 a 120,120 0 1,1 240,0 a 120,120 0 1,1 -240,0"
            fill="none"
          />
        </defs>
        <text fill="black" fontSize="20" fontWeight="bold">
          <textPath href="#circlePath" startOffset="0%">
            {menuItems.map((item, i) => (
                <tspan
                    key={i}
                    onClick={() => window.location.href = `#${item.toLowerCase()}`}
                    style={{ cursor: 'pointer', userSelect: 'none', transition: 'all 0.4s ease' , ...active ? listActive : listInActive}}
                >
                     {item.toUpperCase()} {' '} •
                </tspan>
            ))}
          </textPath>
        </text>
      </svg>
    </div>
    <div className="relative">
      <div className={`bg-white opacity-90 absolute transition-all duration-300 ease-in z-[-1] logo ${flipped ? '' : 'hide'} ${active ? 'android_active' : ''}` }></div>
      <button
        onClick={toggleClick}
        className={`sm:bg-zlgreen absolute size-15 sm:rounded-full flex justify-center items-center menu cursor-pointer
                    flip-inner ${flipped ? 'flip-rotate' : ''} ${active ? 'menu_active' : ''}`}
      >
        <img
          src="bars.svg"
          alt="menu icon"
          width={30}
          className={`logo ${flipped ? 'hide' : ''}`}
        />
      </button>
        <div className="absolute block sm:hidden top-0 right-[0]">
              <ul className={`${flipped ? 'flex' : 'hidden'} transition-all delay-150 duration-300 gap-20 ease-in flex-col justify-center items-center ${active ? 'android_active opacity-100' : 'opacity-0'} font-bebas text-6xl`}>
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#skills">Skills</a></li>
              </ul>
        </div>
      <button 
        onClick={toggleClick} 
        className={`absolute  z-[150] size-15  cursor-pointer
                    flex items-center justify-center 
                    ${flipped ? '' : 'pointer-events-none opacity-0'}`}
        >
            <img
                src="x.svg"
                alt="menu close icon"
                width={30}
                className="pointer-events-none"
            />
        </button>
    </div>
    </div>
  );
};

export default Mainmenu;
