"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, useSpring, AnimatePresence } from 'framer-motion';

export function OrbMascot() {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const orbRef = useRef<HTMLDivElement>(null);

  // Smooth movement springs
  const eyeX = useSpring(0, { stiffness: 100, damping: 15 });
  const eyeY = useSpring(0, { stiffness: 100, damping: 15 });
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const [shouldBounce, setShouldBounce] = useState(false);

  useEffect(() => {
    let idleTimer: NodeJS.Timeout;

    const handleMouseMove = (e: MouseEvent) => {
      if (!orbRef.current) return;
      
      clearTimeout(idleTimer);

      const rect = orbRef.current.getBoundingClientRect();
      const orbCenterX = rect.left + rect.width / 2;
      const orbCenterY = rect.top + rect.height / 2;

      const deltaX = e.clientX - orbCenterX;
      const deltaY = e.clientY - orbCenterY;
      
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      const maxRange = 10;
      const moveX = (deltaX / Math.max(distance, 100)) * maxRange;
      const moveY = (deltaY / Math.max(distance, 100)) * maxRange;

      eyeX.set(moveX);
      eyeY.set(moveY);

      // Return to center very quickly (200ms) after no movement
      idleTimer = setTimeout(() => {
        eyeX.set(0);
        eyeY.set(0);
      }, 200);
    };

    const handleGlobalMouseOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('button, a');
      if (!target) return;

      const text = (target as HTMLElement).innerText?.toLowerCase() || "";
      const isTrigger = text.includes('enroll') || text.includes('join') || text.includes('admission') || text.includes('apply');
      
      if (isTrigger && !isButtonHovered) {
        setIsButtonHovered(true);
        setShouldBounce(true);
        // Stop bouncing after 3 cycles (1.8s)
        setTimeout(() => setShouldBounce(false), 1800);
      }
    };

    const handleGlobalMouseOut = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('button, a');
      if (target) {
        setIsButtonHovered(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleGlobalMouseOver, true);
    document.addEventListener('mouseout', handleGlobalMouseOut, true);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleGlobalMouseOver, true);
      document.removeEventListener('mouseout', handleGlobalMouseOut, true);
      clearTimeout(idleTimer);
    };
  }, [eyeX, eyeY, isButtonHovered]);

  const handleClick = () => {
    setIsClicked(true);
    setMessage(getRandomMessage());
    setShouldBounce(true);
    setTimeout(() => {
      setIsClicked(false);
      setMessage(null);
      setShouldBounce(false);
    }, 2000);
  };

  const getRandomMessage = () => {
    const messages = ["Hello!", "Ready to learn?", "Nice to see you!", "Click me!", "Woof! (Digital)"];
    return messages[Math.floor(Math.random() * messages.length)];
  };

  return (
    <div className="fixed bottom-8 right-8 z-[9999] hidden md:block">
      <AnimatePresence>
        {message && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: -45, scale: 1 }}
            exit={{ opacity: 0, y: 0, scale: 0.8 }}
            className="absolute left-1/2 -translate-x-1/2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-4 py-2 rounded-2xl shadow-xl text-[10px] font-bold text-zinc-600 dark:text-zinc-300 whitespace-nowrap pointer-events-none"
          >
            {message}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        ref={orbRef}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        onClick={handleClick}
        initial={{ scale: 0, rotate: -180 }}
        animate={{ 
          scale: 1, 
          rotate: isClicked ? 360 : 0,
          y: shouldBounce ? [0, -15, 0] : 0 
        }}
        transition={{ 
          y: shouldBounce ? { repeat: 2, duration: 0.6, ease: "easeInOut" } : { duration: 0.5 }
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="w-16 h-16 relative cursor-pointer group"
      >
        {/* The Orb Body */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-300 via-indigo-400 to-purple-500 shadow-[0_0_30px_rgba(99,102,241,0.4)] transition-all duration-500 overflow-hidden">
          {/* Internal Glows and Lines matching the image */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.4)_0%,transparent_70%)]" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[120%] h-[120%] border border-white/20 rounded-full blur-[1px] rotate-[-20deg]" />
          <div className="absolute top-[10%] right-[10%] w-[40%] h-[40%] bg-white/20 blur-xl rounded-full" />
          
          {/* Eyes Container */}
          <motion.div 
            style={{ x: eyeX, y: eyeY }}
            animate={{ scale: isButtonHovered ? 1.2 : 1 }}
            className="absolute inset-0 flex items-center justify-center gap-3 pt-1"
          >
            {/* Left Eye */}
            <motion.div 
              animate={{ 
                scaleY: isButtonHovered ? 1.2 : [1, 1, 0.1, 1, 1],
              }}
              transition={{ repeat: Infinity, duration: 3, times: [0, 0.1, 0.15, 0.2, 1] }}
              className="w-2.5 h-3.5 bg-zinc-900 dark:bg-zinc-950 rounded-full flex items-center justify-center relative origin-center shadow-sm"
            >
               <div className="w-1 h-1 bg-white rounded-full absolute top-0.5 right-0.5" />
            </motion.div>
            {/* Right Eye */}
            <motion.div 
              animate={{ 
                scaleY: isButtonHovered ? 1.2 : [1, 1, 0.1, 1, 1],
              }}
              transition={{ repeat: Infinity, duration: 3, times: [0, 0.1, 0.15, 0.2, 1] }}
              className="w-2.5 h-3.5 bg-zinc-900 dark:bg-zinc-950 rounded-full flex items-center justify-center relative origin-center shadow-sm"
            >
               <div className="w-1 h-1 bg-white rounded-full absolute top-0.5 right-0.5" />
            </motion.div>
          </motion.div>

          {/* Blush */}
          <motion.div 
            animate={{ opacity: (isButtonHovered || isHovered) ? 0.9 : 0.4, scale: isButtonHovered ? 1.4 : 1 }}
            className="absolute left-2.5 top-[55%] w-3 h-2 bg-pink-400 blur-[4px] rounded-full" 
          />
          <motion.div 
            animate={{ opacity: (isButtonHovered || isHovered) ? 0.9 : 0.4, scale: isButtonHovered ? 1.4 : 1 }}
            className="absolute right-2.5 top-[55%] w-3 h-2 bg-pink-400 blur-[4px] rounded-full" 
          />

          {/* Smile/Mouth (Puppy Reaction) */}
          <motion.div 
            animate={{ 
              height: (isButtonHovered || isClicked) ? 14 : (isHovered ? 8 : 1),
              width: (isButtonHovered || isClicked) ? 18 : (isHovered ? 14 : 8),
              borderRadius: (isButtonHovered || isHovered) ? "0 0 100px 100px" : "100px",
            }}
            className="absolute bottom-[20%] left-1/2 -translate-x-1/2 bg-zinc-900 overflow-hidden flex flex-col items-center justify-end"
          >
            {/* Tongue */}
            <motion.div 
               animate={{ y: (isButtonHovered || isHovered) ? 0 : 5 }}
               transition={{ type: "spring", stiffness: 300 }}
               className="w-3.5 h-3.5 bg-pink-400 rounded-full mb-[-4px]"
            />
          </motion.div>
        </div>

        {/* Outer Halo */}
        <div className="absolute -inset-2 border border-white/10 rounded-full blur-[2px] opacity-50 pointer-events-none" />
        <div className="absolute -inset-4 border border-white/5 rounded-full blur-[4px] opacity-20 pointer-events-none" />
      </motion.div>
    </div>
  );
}
