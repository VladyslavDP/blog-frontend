import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';

export function ControlSticker() {
  const { isAuthorized } = useAuth();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const storedState = localStorage.getItem('adminMenuStickerVisibility');
    setIsVisible(storedState === 'true');
  }, []);

  useEffect(() => {
    localStorage.setItem('adminMenuStickerVisibility', isVisible.toString());
  }, [isVisible]);

  if (!isAuthorized) return null;

  return (
    <>
      <div className="fixed top-4 right-4 z-[999999]">
        <button
          onClick={() => setIsVisible(!isVisible)}
          className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-300 focus:outline-none"
        >
          {isVisible ? 'Show' : 'Hide'} menu
        </button>
      </div>

      {isVisible && (
        <div
          className="w-full fixed top-0 z-[999998] h-16 border-3 border-dashed border-white
            bg-lightSecondary dark:bg-darkSecondary
            text-lightText dark:text-darkText
            opacity-90 text-center leading-[4rem]"
        >
          Menu
        </div>
      )}
    </>
  );
}
