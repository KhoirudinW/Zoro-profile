import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useRef, useState, useEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

function About() {
    const sectionRef = useRef(null);
    const scrollContainerRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(null);
    const images = [1, 2, 3, 4, 5, 6];
    const desc = [
        'episode 2 - Zoro pertama kali bertemu Luffy saat diselamatkan dari eksekusi oleh angkatan laut Morgan. Luffy mengagumi tekad Zoro, lalu mengajaknya bergabung sebagai anggota pertama kru Topi Jerami.',
        'episode 24 - Zoro menantang Mihawk demi ambisinya menjadi pendekar pedang terkuat. Meski kalah telak, ia tak mundur. Mihawk kagum, lalu mengakui tekad Zoro dan tidak membunuhnya.',
        'episode 119 - Zoro melawan Daz Bones (Mr. 1) di Alabasta, menghadapi musuh bertubuh baja. Dengan tekad kuat, ia akhirnya bisa memotong baja setelah mendengar "suara" semua benda di sekitarnya.',
        'episode 377 - Di Thriller Bark, Zoro rela menerima semua luka dan rasa sakit Luffy dari Kuma demi menyelamatkan kaptennya. Ia berdiri berdarah-darah, tetap tegar, berkata: “Tidak terjadi apa-apa.”',
        'episode 719 - Zoro melawan Pica di Dressrosa dengan tegas dan penuh strategi. Ia memotong tubuh raksasa batu Pica dari udara menggunakan teknik Ittoryu Ichidai: Iai – Shishi Sonson, menakjubkan semua orang.',
        'Episode 1062 - Zoro dan King bertarung sengit di Onigashima saat Wano Arc. Dengan Supreme King Haki dan teknik King of Hell Three Sword Style, Zoro akhirnya menumbangkan King meski terluka para',
    ]
    const totalPanels = images.length;


    useGSAP(() => {
        gsap.set(sectionRef.current, { opacity: 0 });
      
        // Fade-in saat scroll ke section
        ScrollTrigger.create({
            trigger: sectionRef.current,
            start: "top center",
            end: "bottom center",
            markers: false,
            onEnter: () => gsap.to(sectionRef.current, { opacity: 1, duration: 0.5 }),
            onLeaveBack: () => gsap.to(sectionRef.current, { opacity: 0, duration: 0.5 }),
        });
      
        // Horizontal scroll + snap
        const panels = scrollContainerRef.current.children;
        const totalPanels = panels.length;
        const scrollLength = scrollContainerRef.current.scrollWidth - window.innerWidth;
        gsap.to(scrollContainerRef.current, {
            x: () => -scrollLength,
            ease: "none",
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top top",
                end: () => `+=${scrollLength}`,
                pin: true,
                pinSpacing: true,
                scrub: 1,
                snap: 1 / (totalPanels - 3),
                onUpdate: (self) => {
                    const index = Math.round(self.progress * (totalPanels - 3));
                    setActiveIndex(index);
                    handleDescription(index);
                },    
            },
        });
      }, { scope: sectionRef });

      const handleDescription = (index) => {
        return desc[index];
      }

    return (
        <section
            ref={sectionRef}
            className="relative w-full min-h-screen overflow-hidden bg-[#375949] text-zlgreen select-none"
        >
            
            {/* SCROLL LABELS */}
            <div className={`absolute top-5 left-1/2 -translate-x-1/2 text-white font-oswald text-lg z-[100] opacity-0 md:hidden transition-all animate-bounce duration-500 delay-100 ease-in ${activeIndex === 0 ? "opacity-100" :""}`}>
            ↑ Scroll Up
            </div>
            
           
            <div className={`absolute bottom-10 left-1/2 -translate-x-1/2 text-white font-oswald text-lg z-10 md:hidden opacity-0 transition-all animate-bounce duration-500 ease-in ${ activeIndex === totalPanels - 3 ? "opacity-100" : ""}`}>
            ↓ Scroll Down
            </div>
            
            <div className="lg:w-1/3 w-[85%] mx-auto text-center py-16">
                <h1 className="font-bebas text-5xl">about</h1>
                <p className="font-oswald mt-2">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Dolore quis quo tempora iste natus sunt.
                </p>
            </div>

            {/* Horizontal scroll section */}
            <div
                ref={scrollContainerRef}
                className="flex gap-10 px-[12%] md:px-[25%]  py-5 bg-zblack h-[200px] lg:h-[300px] xl:h-[500px] w-fit"
                style={{ scrollSnapType: "x mandatory" }}
            >
                

                <div className={`absolute hidden md:block lg:top-1/2 lg:left-30 left-20 top-1/2 -translate-y-1/2 text-white font-oswald text-lg z-[100] delay-500 transition-all animate-bounce duration-500 ease-in ${activeIndex > 0 ? "opacity-0" :"opacity-100"}`}>
                ↑ Scroll Up
                </div>
                
            
                <div className={`absolute hidden md:block lg:top-1/2 lg:right-30 right-20 top-1/2 -translate-y-1/2 text-white font-oswald text-lg z-[100] delay-500 opacity-0 transition-all animate-bounce duration-500 ease-in ${ activeIndex === totalPanels - 1 ? "opacity-100" : ""}`}>
                ↓ Scroll Down
                </div>

                {images.map((index) => (
                    <div
                        key={index}
                        className="group relative flex-shrink-0 h-full w-[70vw] lg:w-[50vw] flex items-center justify-center rounded-xl scroll-snap-align-center overflow-hidden"
                        style={{ scrollSnapAlign: "center" }}
                    >
                        <img
                            src={`img/img-${index}.png`}
                            alt={`image-${index}`}
                            className="w-full h-full object-cover"
                        />

                        {/* Overlay */}
                        <div
                            className={`absolute inset-0 bg-[#0000067a] bg-opacity-[60%] flex items-center justify-center text-white font-oswald text-center text-xl px-4 transition-opacity duration-500 
                            ${
                                activeIndex === index - 1
                                    ? "opacity-0 group-hover:opacity-100"
                                    : "opacity-0 pointer-events-none"
                            }`}
                        >
                            <p>{desc[index - 1]}</p>
                        </div>
                    </div>
                ))}
            </div>
                <div
                    className={`absolute lg:hidden h-[290px] w-[90%] border bottom-25 left-1/2 -translate-x-1/2  bg-black bg-opacity-60  flex items-center justify-center text-white font-oswald text-center text-xl px-4 transition-opacity duration-500`}
                >
                    <p>{desc[activeIndex]}</p>
                </div>
        </section>
    );
}

export default About;
