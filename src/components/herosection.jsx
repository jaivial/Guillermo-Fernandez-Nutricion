
import { motion } from 'framer-motion';

import Frutas from '../assets/frutas.png';
import Frutasdos from '../assets/frutas2.png';





export default function HeroSection() {
    return (
        <div className='wrapper'>
            <div className='herosectionwrapper'>
               <div className="background-image"></div>
                <motion.div
                    initial={{ x: '-100%' }}
                    animate={{ x: 0 }}
                    transition={{ duration: 1 }}

                    className='textoherosectionwrapper'
                >
                    <h2 className='slogan'>Transforma tu vida, bocado a bocado</h2>
                    <img className='imagenfrutasdos' alt='Guillermo fernandez nutricionista en Valencia' src={{Frutasdos}}></img>

                    <h1>Guillermo Fernández de la Torre</h1>
                    <h2>Dietista - Nutricionista</h2>
                    <div className="appointment-button-herosection">CONTACTAR</div>
                </motion.div>
                <motion.div
                    className='imagenherosection'
                >
                    
                    <img alt='Guillermo fernandez nutricionista en Valencia' src={Frutas}></img>
                

                </motion.div>
            </div>

        </div>
    );
}