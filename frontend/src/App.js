import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Activate from "./pages/Activate";
import { Route, Routes } from "react-router-dom";
import { Provider } from 'react-redux';
import store from './store';

function App() {
  return (
    <Provider store={store}>
      <Routes>
        <Route exact path="/" element={<Login />}></Route>
        <Route exact path="/register" element={<Register />}></Route>
        <Route exact path="/home" element={<Home />}></Route>
        <Route exact path='/activate/:uid/:token' element={<Activate />}></Route>
      </Routes>
    </Provider>
  );
}

export default App;
