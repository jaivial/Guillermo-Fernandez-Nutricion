"use client";
import React, { useEffect } from 'react';
import './rectangulo2.css';
import { useState } from 'react';
import { useSpring, animated } from 'react-spring';



export default function Rectangulo2() {

  
  

  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {

      // access window as you like
      const handleScroll = () => {

          setScrollY(window.scrollY);
      };


        window.addEventListener('scroll', handleScroll);

        return () => {
          window.removeEventListener('scroll', handleScroll);
        };


  }, []);



  const { transform } = useSpring({
    transform: `translate(${scrollY * 0.1}px, ${-scrollY * 0.03}px)`
  });



  return (

    <animated.div
      className='rectangulo2'
      style={{ transform }}            >
    </animated.div>


  );
}