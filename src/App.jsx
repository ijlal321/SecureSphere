import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import './App.css';
import { AccessTokenWrapper } from '@calimero-network/calimero-client';

import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';
// import ChatPage from './components/ChatPage';
import SetUp from "./components/SetUp";
import { getNodeUrl } from './helpers/helper';
import ChatPage from './components/ChatPage';

function App() {


  return (
    <AccessTokenWrapper
      getNodeUrl={getNodeUrl}
    >
      <Router>
        <Routes>
          <Route path="/" element={<SetUp/>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<ChatPage />} />
        </Routes>
      </Router>
    </AccessTokenWrapper>
  );
}

export default App;
