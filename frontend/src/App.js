import React from 'react';
import './App.css';
import Home from './pages/Home';
import { Toaster } from './components/ui/sonner';

function App() {
  return (
    <div className="App">
      <Home />
      <Toaster />
    </div>
  );
}

export default App;