import { useState, useRef, forwardRef } from "react";

const BentoItems = forwardRef(({ src, title, desc }, ref) => {
  return (
    <div className="relative w-full h-full group">
      <div className="absolute top-0 left-0 z-50 w-full h-full p-3 select-none">
        <h1 className="font-bebas text-5xl text-[#ffffff]">{title}</h1>
        <p className="font-oswald text-[#ffffff]">{desc}</p>
      </div>
      <video
        ref={ref}
        src={src}
        className="w-full h-full object-cover brightness-50 md:brightness-40 lg:group-hover:brightness-95 transition-all duration-300 ease-in-out"
        muted
      />
    </div>
  );
});

const Bento = () => {
  const videoRefs = useRef([]);
  const itemsRefs = useRef([]);
  const [transformStyles, setTransformStyles] = useState({});
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const handleMouseEnter = (index) => {
    const video = videoRefs.current[index];
    if (video) {
      video.loop = true;
      video.play();
    }
    setHoveredIndex(index);
  };

  const handleMouseMove = (e, index) => {
    const item = itemsRefs.current[index];
    if (!item) return;

    const { left, top, width, height } = item.getBoundingClientRect();
    const relativeX = (e.clientX - left) / width;
    const relativeY = (e.clientY - top) / height;

    const tiltX = (relativeX - 0.5) * 10;
    const tiltY = (relativeY - 0.5) * -10;

    setTransformStyles((prev) => ({
      ...prev,
      [index]: `perspective(500px) rotateX(${tiltY}deg) rotateY(${tiltX}deg) scale3d(0.9, 0.9, 0.9)`,
    }));
  };

  const handleMouseLeave = (index) => {
    const video = videoRefs.current[index];
    if (video) {
      video.pause();
      video.currentTime = 0;
    }

    setHoveredIndex(null);
    setTransformStyles((prev) => ({
      ...prev,
      [index]: '',
    }));
  };

  const videoSources = [
    "../videos/bento-1.mp4",
    "../videos/bento-2.mp4",
    "../videos/bento-3.mp4",
    "../videos/bento-4.mp4",
    "../videos/bento-5.mp4",
  ];

  const gridClasses = [
    "md:row-span-2 md:col-span-2",
    "md:row-span-2 md:col-span-4",
    "md:row-span-2 md:col-span-4",
    "md:row-span-1 md:col-span-2",
    "md:row-span-1 md:col-span-2",
  ];

  const skills = [
    { title: "Title 1", desc: "Lorem ipsum dolor sit amet consectetur." },
    { title: "Title 2", desc: "Lorem ipsum dolor sit amet consectetur." },
    { title: "Title 3", desc: "Lorem ipsum dolor sit amet consectetur." },
    { title: "Title 4", desc: "Lorem ipsum dolor sit amet consectetur." },
    { title: "Title 5", desc: "Lorem ipsum dolor sit amet consectetur." },
  ];

  return (
    <section className="min-h-screen w-screen flex flex-col gap-5 justify-center items-center">
      <header className="heading">
        <h1>Halo</h1>
      </header>
      <div className="grid grid-rows-5 grid-cols-1 md:grid-rows-4 w-[90vw] h-[90vh] md:w-[80vw] md:h-[80vh] xl:w-[65vw] xl:h-[70vh] md:grid-cols-6 gap-3">
        {videoSources.map((src, index) => (
          <div
            key={index}
            id={`item-${index}`}
            ref={(el) => (itemsRefs.current[index] = el)}
            className={`${gridClasses[index]} hover:scale-105 transition-all duration-300 ease-in-out overflow-hidden`}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={() => handleMouseLeave(index)}
            onMouseMove={(e) => handleMouseMove(e, index)}
            style={{
              transform: hoveredIndex === index ? transformStyles[index] : '',
            }}
          >
            <BentoItems
              src={src}
              ref={(el) => (videoRefs.current[index] = el)}
              title={skills[index].title}
              desc={skills[index].desc}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Bento;
