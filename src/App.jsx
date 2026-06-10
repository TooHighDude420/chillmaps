import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from 'react-router';
import './app.css';

import Home from "./pages/home";
import Navbar from "./components/navbar";
import MakePost from "./pages/makepost";
import Header from "./components/header";

function App() {
  return (
    <div className="w-screen h-screen flex flex-col items-center text-white flex-wrap">
      <div className="bg-[#021A1C] flex flex-col w-full h-screen flex-wrap">
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/post" element={<MakePost />} />
          </Routes>
          <Navbar />
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;