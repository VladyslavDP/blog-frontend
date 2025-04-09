import React, { useEffect, useRef, useState } from 'react';

interface TokenRefreshModalProps {
  timeRemaining: number;
  onRefresh: () => void;
  onLogout: () => void;
}

export const TokenRefreshModal: React.FC<TokenRefreshModalProps> = ({
  timeRemaining: initialTimeRemaining,
  onRefresh,
  onLogout,
}) => {
  const [timeRemaining, setTimeRemaining] = useState(initialTimeRemaining);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    timerRef.current = window.setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          if (timerRef.current !== null) clearInterval(timerRef.current);
          onLogout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current !== null) clearInterval(timerRef.current);
    };
  }, [onLogout]);

  const handleRefresh = () => {
    if (timerRef.current !== null) clearInterval(timerRef.current);
    onRefresh();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[9999]">
      <div className="bg-white p-6 rounded shadow-md text-center space-y-4">
        <h2 className="text-xl font-bold">Session is almost run out</h2>
        <p className="text-gray-600">
          The token will expire in <span className="font-semibold">{timeRemaining}</span> seconds.
        </p>
        <div className="flex justify-center space-x-4">
          <button onClick={handleRefresh} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
            Refresh token
          </button>
          <button onClick={onLogout} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
};
