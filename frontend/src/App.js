import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Activate from "./pages/Activate";
import ResetPassword from "./pages/ResetPassword";
import ResetPasswordConfirm from "./pages/ResetPasswordConfirm";
import EquipmentList from "./pages/EquipmentList";
import EditEquipment from "./pages/EditEquipment";
import AddEquipment from "./pages/AddEquipment";
import { Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import Layout from "./hocs/Layout";
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <Layout>
        <Routes>
          <Route exact path="/" element={<Login />}></Route>
          <Route exact path="/register" element={<Register />}></Route>
          <Route exact path="/home" element={<Home />}></Route>
          <Route exact path="/dashboard" element={<Dashboard />}></Route>
          <Route exact path="/equipment-list" element={<EquipmentList />}></Route>
          <Route exact path="/add-equipment" element={<AddEquipment />}></Route>
          <Route
            exact
            path="/activate/:uid/:token"
            element={<Activate />}
          ></Route>
          <Route
            exact
            path="/reset-password"
            element={<ResetPassword />}
          ></Route>
          <Route
            exact
            path="/password/reset/confirm/:uid/:token"
            element={<ResetPasswordConfirm />}
          ></Route>
          <Route
            exact
            path="/edit-equipment"
            element={<EditEquipment />}
          ></Route>
        </Routes>
      </Layout>
    </Provider>
  );
}

export default App;
