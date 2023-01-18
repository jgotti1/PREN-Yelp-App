import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./routes/Home";
import Details from "./routes/Details";
import UpdatePage from "./routes/UpdatePage";

const App = () => {
  return (
    <div className="container-fluid">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} exact />
          <Route path="/restaurants/:id/update" element={<UpdatePage />} exact />
          <Route path="/restaurants/:id/details" element={<Details />} exact />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
