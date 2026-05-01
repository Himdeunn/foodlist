"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const Preloader: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => setIsVisible(false),
      });

      tl.fromTo(
        textRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power4.out" }
      )
      .fromTo(
        barRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 1.5, ease: "power2.inOut" },
        "-=0.5"
      )
      .to(containerRef.current, {
        yPercent: -100,
        duration: 1,
        ease: "expo.inOut",
        delay: 0.2,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  if (!isVisible) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#EAE8E1] dark:bg-[#1a1a1a] font-montserrat"
    >
      <div className="overflow-hidden mb-4">
        <h2
          ref={textRef}
          className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-[#1a1a1a] dark:text-[#EAE8E1]"
        >
          Bento <span className="text-neutral-500">Hub.</span>
        </h2>
      </div>
      <div className="w-48 h-[2px] bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden">
        <div
          ref={barRef}
          className="h-full bg-[#1a1a1a] dark:bg-[#EAE8E1] origin-left"
        ></div>
      </div>
      <p className="mt-6 text-[10px] font-bold uppercase tracking-[0.5em] text-neutral-400">
        Authentic Cuisines
      </p>
    </div>
  );
};

export default Preloader;
