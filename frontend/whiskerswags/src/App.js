import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Auth from './components/Auth';
import UploadPet from './components/UploadPet';
import AdminHome from './components/AdminHome';
import Home from './routes/Home/Home';
import AllPets from './routes/AllPets/AllPets';
import PetMatching from './routes/PetMatching/PetMatching';
import PetDetails from './routes/PetDetails/PetDetails'; 
import Profile from './routes/Profile/Profile';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Auth />} />
                    <Route path="/upload-pet" element={<UploadPet />} />
                    <Route path="/admin/*" element={<AdminHome />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/all-pets" element={<AllPets />} />
                    <Route path="/petmatching/:type" element={<PetMatching />} />
                    <Route path="/petdetails/:id" element={<PetDetails />} /> 
                    <Route path="/profile" element={<Profile />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
