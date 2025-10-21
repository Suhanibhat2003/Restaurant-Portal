import React from "react";
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom"
import AdminMenu from "./components/AdminMenu";
import CustomerMenu from "./components/CustomerMenu";


function App() {
  return (
    <Router>
      <Routes>
        <Route path ="/" element={<CustomerMenu/>}/>
        <Route path="/admin" element={<AdminMenu />}/>
        
      </Routes>
    </Router>
  )
}

export default App