import './sobremi.css';
import { useEffect, useState } from 'react';
import { useSpring, animated } from 'react-spring';
import './sobremimediaqueries.css';


export default function SobreMi() {

    const [scrollY, setScrollY] = useState(0);
    useEffect(() => {


        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };


    }, []);

    const { transform } = useSpring({
        transform: `translateX(${scrollY * 0.06}px)`,
    });


    return (

        <animated.div
            className='rectangulo1'
            style={{ transform }}>
        </animated.div>


    );
}


