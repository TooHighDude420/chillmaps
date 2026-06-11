import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from 'react-router';
import './app.css';

import Header from "./components/header";
import Navbar from "./components/navbar";
import Home from "./pages/home";
import Chat from "./pages/chat";
import MakePost from "./pages/makepost";
import Map from "./pages/map";

function App() {
  return (
    <div className="bg-[#021A1C] flex flex-col items-center text-white flex-wrap">
      <BrowserRouter>
        <Header />
        <div className="flex min-h-[80vh] max-h-[80vh] flex-col w-full flex-wrap no-scrollbar overflow-x-scroll">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/post" element={<MakePost />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/map" element={<Map />} />
          </Routes>
        </div >
        <Navbar />
      </BrowserRouter>
    </div>
  );
}

export default App;