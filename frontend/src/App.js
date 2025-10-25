import React from 'react';
import './App.css';
import Home from './pages/Home';
import toast, { Toaster } from 'react-hot-toast';

function App() {
  // Toast is working correctly

  return (
    <div className="App">
      <Home />
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#fff',
            color: '#333',
          },
          success: {
            duration: 4000,
            iconTheme: {
              primary: '#10b981',
              secondary: '#fff',
            },
          },
          error: {
            duration: 5000,
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />
    </div>
  );
}

export default App;