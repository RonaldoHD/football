import React, { createContext, useContext, useState } from 'react';
import { Heart, HeartOff } from 'lucide-react'; // Icons for added/removed

const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState({ message: null, type: null });

  const showAlert = (text, type = 'add', timeout = 3000) => {
    setAlert({ message: text, type });
    setTimeout(() => setAlert({ message: null, type: null }), timeout);
  };

  const getIcon = () => {
    switch (alert.type) {
      case 'add':
        return <Heart size={20} color="var(--text-red)" />;
      case 'remove':
        return <HeartOff size={20} color="gray" />;
      default:
        return null;
    }
  };

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      {alert.message && (
        <div
          className="position-fixed top-0 start-50 translate-middle-x text-center d-flex align-items-center gap-2 px-4 py-2 shadow"
          style={{
            zIndex: 1000,
            backgroundColor: 'var(--light-blue)',
            color: 'var(--text-red)',
            border: 'none',
            marginTop: '10px',
            borderRadius: '8px',
            fontWeight: '500',
            width:'90%'
          }}
        >
          {getIcon()}
          <span>{alert.message}</span>
        </div>
      )}
    </AlertContext.Provider>
  );
};

export const useAlert = () => useContext(AlertContext);
