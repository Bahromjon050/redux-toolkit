import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import About from './About'
import Blog from './Blog'
import Error from './Error'
import Home from './Home'


export const Navbar = () => {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/about' element={<About />} />
                <Route path='/blog' element={<Blog />} />
                <Route path='/*' element={<Error />} />
            </Routes>
        </Router>
    )
}