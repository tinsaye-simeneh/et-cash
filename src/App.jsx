import {BrowserRouter, Route, Routes} from "react-router-dom";
import React from "react";
import KenoScreen from "./presentation/screens/kenoScreen";
import SpinScreen from "./presentation/screens/spinScreen";
import Home from "./presentation/screens/home";
import Login from "./presentation/screens/login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}>
          <Route index element={<KenoScreen />} />
          <Route path="spin" element={<SpinScreen />}/>
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
