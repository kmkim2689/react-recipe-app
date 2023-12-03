// to manage and render all the pages here
// use routing -> to reduce the size of App.js
import Category from '../components/Category';
import Home from './Home';
import React from 'react';
import Cuisines from './Cuisines';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function Pages() {
  return (
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/cuisine' element={<Cuisines />} />
      </Routes>
  )
}

export default Pages;