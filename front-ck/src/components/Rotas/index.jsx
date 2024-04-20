import React from 'react';
import { Route, Routes } from "react-router-dom";
import Home from "../../pages/Home";
import Page1 from "../../pages/Page1";

function Rotas() {
    return (
        <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/page1" element={<Page1 />} />
        </Routes>
    );
}

export default Rotas;