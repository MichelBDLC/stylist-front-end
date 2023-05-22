import './css/App.css';
import { Routes, Route } from 'react-router-dom';
import { useState } from "react";

import Home from './pages/Home';
import AllStyles from './pages/AllStyles';
import Piece from './pages/Piece';
import NewPiece from './pages/NewPiece';
import EditPiece from './pages/EditPiece';

function App() {

  const [selectedStyle, setSelectedStyle] = useState("all-styles");

  return (
    <div className="App">
      <header className="App-header">
        <h2 className='stylist'> Closet. </h2>
      </header>
      <main>
      <Routes>
        <Route path='/' element={<Home setSelectedStyle={setSelectedStyle} />} />
        <Route path='/styles' element={<AllStyles setSelectedStyle={setSelectedStyle} selectedStyle={selectedStyle} />} />
        <Route path='/styles/:id' element={<Piece />} />
        <Route path='/styles/new' element={<NewPiece />} />
        <Route path='styles/:id/edit' element={<EditPiece />} />
      </Routes>
      </main>
    </div>
  );
}

export default App;
