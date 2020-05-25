import React from 'react';
import './assets/styles/App.css';
import { Provider as AuthProvider } from './components/contexts/AuthContext';
import Home from './screens/Home';
const App = () => {
  return (
    <AuthProvider>
      <Home />
    </AuthProvider>
  );
};

export default App;
