import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Component/Home';
import {Login} from './Component/Login';
import Register from './Component/Register';
import Profile from './Component/Profile';
import Update from './Component/Update';
import MyCollection from './Component/MyCollection'
import Problem from './Component/Problem';
import { DataContext } from './ContextApi';
import { useState } from 'react';
import Admin from './Component/Admin';
import AllItems from './Component/AllItems';
import AllItemsAdmin from './Component/AllItemsAdmin';
import ListUser from './Component/ListUser';
import ProblemAdmin from './Component/ProblemAdmin';
import Additem from './Component/AddItem';
import ItemDetails from './Component/ItemDetails';

function App() {
  const [userData, setUserData] = useState({});

  return (
    <div className="App">
      <DataContext.Provider value={{ userData, setUserData }}>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/update" element={<Update />} />

            <Route path="/home" element={<Home />} />
            <Route path="/allitems" element={<AllItems />} />
            <Route path="/mycollection" element={<MyCollection />} />
            <Route path="/problem" element={<Problem />} />

            <Route path="/admin" element={<Admin />} />
            <Route path="/allitemsadmin" element={<AllItemsAdmin />} />
            <Route path="/listuser" element={<ListUser />} />
            <Route path="/problemadmin" element={<ProblemAdmin />} />
            <Route path="/additem" element={<Additem />} />
            <Route path="/item/:id" element={<ItemDetails />} />
          </Routes>
        </Router>
      </DataContext.Provider>
    </div>
  );
}

export default App;

