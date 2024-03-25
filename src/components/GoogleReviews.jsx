import { useEffect, useState } from 'react';
import './googlereviews.css';

// Component
const GoogleReviews = () => {
    const [placeDetails, setPlaceDetails] = useState(null);

    useEffect(() => {
        // You can fetch additional details or reviews based on placeDetails if needed
        if (placeDetails) {
            // Fetch reviews or other details using the placeDetails
            // For example: fetchGoogleReviews(placeDetails.place_id);
        }
    }, [placeDetails]);

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
