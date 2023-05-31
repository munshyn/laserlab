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
import "./App.css";
import RequireAuth from "./hocs/RequireAuth";
import Services from "./pages/Services";
import ServiceAppForm from "./pages/ServiceAppForm";
import ServicesAppList from "./pages/ServicesAppList";
import ManageServicesApp from "./pages/ManageServicesApp";

function App() {
  return (
    <Provider store={store}>
      <Layout>
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/activate/:uid/:token" element={<Activate />}></Route>
          <Route path="/reset-password" element={<ResetPassword />}></Route>
          <Route path="/password/reset/confirm/:uid/:token"element={<ResetPasswordConfirm />}></Route>

          <Route element={<RequireAuth />}>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/equipment-list" element={<EquipmentList />} />
            <Route path="/add-equipment" element={<AddEquipment />} />
            <Route path="/edit-equipment" element={<EditEquipment />} />
            <Route path="/services" element={<Services />} />
            <Route path="/service-form" element={<ServiceAppForm />} />
            <Route path="/servicesapp-list" element={<ServicesAppList />} />
            <Route path="/manage-serviceapp" element={<ManageServicesApp />} />
          </Route>
        </Routes>
      </Layout>
    </Provider>
  );
}

export default App;
