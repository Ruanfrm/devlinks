import React, { useState, useEffect } from 'react';
import {BiCookie} from "react-icons/bi"
import "./modal.css"

export default function CookieBanner() {
  const [hasAcceptedCookies, setHasAcceptedCookies] = useState(false);

  useEffect(() => {
    const acceptedCookies = localStorage.getItem('acceptedCookies');
    if (acceptedCookies) {
      setHasAcceptedCookies(true);
    }
  }, []);

  const handleAcceptCookies = () => {
    localStorage.setItem('acceptedCookies', true);
    setHasAcceptedCookies(true);
  };

  return (
    <div>
      {!hasAcceptedCookies && (
        <div className='container-modal'>
          <p>Este site usa cookies para melhorar sua experiência. Ao continuar navegando neste site, você concorda com o uso de cookies.</p>
          <button onClick={handleAcceptCookies}>Aceitar cookies <BiCookie size={28} color="#000" /> </button>
        </div>
      )}
    </div>
  );
}
