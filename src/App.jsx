import React from "react";
import { Route, Routes } from "react-router-dom";
import AllUsers from "./components/pages/AllUsers";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import CreateUser from "./components/pages/CreateUser";
import ViewUser from "./components/pages/ViewUser";
import EditUser from "./components/pages/EditUser";

const App = () => {
    return (
        <div>
            <Header />
            <Routes>
                <Route path="/" element={<AllUsers />} />
                <Route path="/createuser" element={<CreateUser />} />
                <Route path="/viewuser/:id" element={<ViewUser />} />
                <Route path="/edit/:id" element={<EditUser />} />
            </Routes>
            <Footer />
        </div>
    );
};

export default App;
