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
    <div >

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
      <button
        onClick={toggleClick}
        className={`bg-zlgreen absolute size-15 rounded-full flex justify-center items-center menu cursor-pointer
                    flip-inner ${flipped ? 'flip-rotate' : ''} ${active ? 'menu_active' : ''}`}
      >
        <img
          src="bars.svg"
          alt="menu icon"
          width={30}
          className={`logo ${flipped ? 'hide' : ''}`}
        />
      </button>
      <button 
        onClick={toggleClick} 
        className={`absolute top-1/2 left-1/2 z-[150] size-15 -translate-x-1/2 -translate-y-1/2  cursor-pointer
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
  );
};

export default Mainmenu;
