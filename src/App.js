
import React,{useState} from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Form from './component/Form';
// import './App.css';
import 'bootstrap/dist/css/bootstrap.css'
import ListPage from './component/listPage';
import BillComponent from './component/BillComponent';
import Login from './component/loginpage/Login'; 

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const handleLogin = () => {
        setIsLoggedIn(true);
    };
    return (
        <BrowserRouter>
  
            <div className="app-container">
            
                <Routes>
                    <Route path="/Form" element={<Form />} />
                    <Route path="/Form/:id" element={<Form />} />
                    <Route path="/List" element={<ListPage />} />
                    <Route path="/View/:id" element={<BillComponent />} />
                    <Route path="View" element={<BillComponent />} />
                    <Route path="/" element={<Login onLogin={handleLogin} />} />
                    <Route path="/form" element={isLoggedIn ? <Form /> : <Login onLogin={handleLogin} />} />
                </Routes>
                    </div>

        </BrowserRouter >
    );
};

export default App;
