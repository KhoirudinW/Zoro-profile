import { useEffect, useRef, useState, useCallback } from "react";
import Button from "./Button";
import {TiLocationArrow} from "react-icons/ti"
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import {ScrollTrigger} from "gsap/all";

gsap.registerPlugin(ScrollTrigger);
function Hero() {
    const [currIndex, setCurrIndex] = useState(1);
    const [hasClicked, setHasClicked] = useState(false);
    const [isloading, setIsLoading] = useState(true);
    const [loadedVD, setLoadedVD] = useState(0);

    const totalVd = 4;
    const nextVdRef = useRef(null);

    const handleVDload = () => {
        setLoadedVD((prev) => prev + 1);
    };

    const upcomingVd = (currIndex % totalVd) + 1;

    const handleMVD = () => {
        setHasClicked(true);

        setCurrIndex(upcomingVd);
    };

    useEffect(() => {
        if (loadedVD === totalVd -1) {
            setIsLoading(false);
        }
    }, [loadedVD]);

    useGSAP(
        () => {
        if (hasClicked) {
            gsap.set('#next-video', {visibility: 'visible'});

            gsap.to('#next-video', {
                transformOrigin: 'top top',
                scale: 1,
                width: '100%',
                height: '100%',
                duration: 0.7,
                ease: 'power1.inOut',
                onStart: () => nextVdRef.current.play(),
            });

            gsap.from('#current-video', {
                transformOrigin: 'center center',
                scale: 1,
                duration:1,
                ease: 'power1.inOut',
            })
        }
    }, {dependencies: [currIndex], revertOnUpdate: true})

    useGSAP(() => {
        gsap.set('#video-frame', {
            clipPath: 'polygon(14% 0, 72% 0, 90% 90%, 0 100%)',
            borderRadius: '0 0 40% 10px',
        });

        gsap.from('#video-frame', {
            clipPath: 'polygon(0% 0, 100% 0, 100% 100%, 0 100%)',
            borderRadius: '0 0 0 0',
            ease: 'power1.inOut',
            scrollTrigger:{
                trigger: '#video-frame',
                start: 'center center',
                end: 'bottom center',
                scrub: true
            },
        });
        // gsap.set('#video-frame', {
        //     transform: 'perspective(500px) rotateX(10deg) rotateY(10deg) scale3d(0.9, 0.9, 0.9)',
        //     // borderRadius: '0 0 40% 10px',
        // });

        // gsap.from('#video-frame', {
        //     transform: 'perspective(500px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
        //     borderRadius: '0 0 0 0',
        //     ease: 'power1.inOut',
        //     scrollTrigger:{
        //         trigger: '#video-frame',
        //         start: 'center center',
        //         end: 'bottom center',
        //         scrub: true
        //     },
        // });
    })

    const Video = [ "videos/hero-1.mp4", "videos/hero-2.mp4", "videos/hero-3.mp4", "videos/hero-4.mp4",];

    // const getVDSrc = useCallback((index) => `videos/hero-${index}.mp4`, []);
    const getVDSrc = useCallback((index) => Video[index], []);

    return (
        <section className="relative h-dvh w-screen overflow-x-hidden" id="home">
            {isloading && <div className="absolute-center absolute z-30 flex-center text-black text-3xl">Loading...</div>}

            <div
                id="video-frame"
                className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg"
            >
                <div>
                    <div className="mask-clip-path scale-75 md:scale-90 absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg">
                        <div
                            className="origin-center md:scale-50 opacity-100 md:opacity-0 transition-all duration-500 ease-in hover:scale-100 md:hover:opacity-100"
                            onClick={handleMVD}
                        >
                            <video
                                ref={nextVdRef}
                                src={getVDSrc(upcomingVd)}
                                loop
                                muted
                                preload="metadata"
                                id="current-video"
                                className="size-64 origin-center scale-150 object-cover object-center"
                                onLoadedData={handleVDload}
                            />
                        </div>
                    </div>
                    <video
                        ref={nextVdRef}
                        src={getVDSrc(currIndex)}
                        loop
                        muted
                        preload="auto"
                        id="next-video"
                        className="absolute-center invisible absolute z-20 size-64 object-cover object-center"
                        onLoadedData={handleVDload}
                    ></video>

                    <video
                        src={getVDSrc(
                            currIndex 
                        )}
                        autoPlay
                        loop
                        muted
                        preload="auto"
                        className="absolute-center left-0 top-0 size-full object-cover object-center"
                        onLoadedData={handleVDload}
                    ></video>
                </div>
                <h1 className="hero-heading absolute bottom-5 right-5 z-40 text-[#edeffa] bg-blend-color p-2 rounded-md">
                    Swordman
                </h1>

                <div className="absolute left-0 top-0 z-40 size-full">
                    <div className="mt-24 px-5 sm:px-10">
                        <h1 className="hero-heading text-[#edeffa]">one Piece</h1>
                        <p className="font-oswald mb-5 max-w-64 text-[#edeffa]">Lorem ipsum dolor sit, amet consectetur adipisicing elit. <br /> Veniam, sapiente.</p>
                        <Button id="watch-now" title="Watch Now" leftIcon={<TiLocationArrow/>} containerClass="bg-yellow-300 flex-center gap-1"/>
                    </div>
                </div>
            </div>

            <h1 className="hero-heading absolute bottom-5 right-5 text-black bg-blend-color p-2 rounded-md">
                    Swordman
            </h1>
        </section>
    );
}

export default Hero;
