import './App.css';
// Import necessary modules from React library
import React, { useEffect } from 'react';

// Import components for routing from react-router-dom library
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import custom Navbar component
import Navbar from './Components/Navbar/Navbar';
import Landing_Page from './Components/Landing_Page/Landing_Page';
import Sign_Up from './Components/Sign_Up/Sign_Up';
import Login from './Components/Login/Login';
import InstantConsultation from './Components/InstantConsultationBooking/InstantConsultation.js';
import FindDoctorSearch from './Components/FindDoctorSearch/FindDoctorSearch';
import BookingConsultation from './Components/BookingConsultation.js';

// Function component for the main App
function App() {

  // Render the main App component
  return (
    <div className="App">
        {/* Set up BrowserRouter for routing */}
        <BrowserRouter>
          {/* Set up the Routes for different pages */}
        <Routes>
          <Route path="/" element={
            <>
              <Navbar/>
              <Landing_Page>
                <FindDoctorSearch />
              </Landing_Page>
            </>
          } />
          <Route path="/Sign_Up" element={<Sign_Up/>} />
          <Route path="/Login" element={<Login/>} />
          <Route path="/instant-consultation" element={<InstantConsultation />} />
          <Route path="/search/doctors" element={<FindDoctorSearch />} />
          <Route path="/booking-consultation" element={<BookingConsultation />} />

        </Routes>
        </BrowserRouter>
    </div>
  );
}

// Export the App component as the default export
export default App;