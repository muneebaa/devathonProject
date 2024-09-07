import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import PublicRoute from "./utils/PublicRoute";
import ProtectedRoute from "./utils/ProtectedRoute";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import PatientHome from "./pages/PatientHome";
import { ToastContainer } from "react-toastify";
import DoctorHome from "./pages/DoctorHome";

function App() {
  return (
    <Provider store={store}>
      <ToastContainer />

      <Router>
        <Routes>
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <PublicRoute>
                <Signup />
              </PublicRoute>
            }
          />
          <Route
            path="/patient"
            element={
              <PublicRoute>
                <PatientHome />
              </PublicRoute>
            }
          />
          <Route
            path="/doctor"
            element={
              <PublicRoute>
                <DoctorHome />
              </PublicRoute>
            }
          />
          {/* <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          /> */}
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
