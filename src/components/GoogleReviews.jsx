import { useEffect, useState } from 'react';
import './googlereviews.css';

// Component
const GoogleReviews = () => {
   
    return (
        <div className='wrappergooglereviews'>
            <div className="wrappertituloservicios">
                <h2>NUESTROS CLIENTES OPINAN</h2>
            </div>
            <div className="iframewrapper">
                <iframe src="https://2d2ad97d5eac43979ffc38cd2d5f1b48.elf.site" frameBorder="0"></iframe>
            </div>
        </div>
    );
};

export default GoogleReviews;
