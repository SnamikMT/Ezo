import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ScrollToTop from './components/ScrollToTop';
import NatalChart from './pages/NatalChart';
import Tarot from './pages/Tarot';
import Matrix from './pages/Matrix';
import Header from './components/Header';
import Footer from './components/Footer';
import TarotReading from './components/TarotReading'; 

function App() {
  return (
    <Router>
      <ScrollToTop />
      {/* <Header /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/natal-chart" element={<NatalChart />} />
        <Route path="/tarot" element={<Tarot />} />
        <Route path="/matrix" element={<Matrix />} />
        <Route path="/tarot-reading" element={<TarotReading />} /> 
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
