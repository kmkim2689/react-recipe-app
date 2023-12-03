// to manage and render all the pages here
// use routing -> to reduce the size of App.js
import Category from '../components/Category';
import Home from './Home';
import React from 'react';
import Cuisines from './Cuisines';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SearchResult from './SearchResult';

function Pages() {
  return (
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/cuisine/:type' element={<Cuisines />} />
        <Route path='/search/:query' element={<SearchResult />} />
      </Routes>
  )
}

export default Pages;