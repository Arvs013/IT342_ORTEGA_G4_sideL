import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignupPage from "./components/signuppage";
import LoginPage from "./components/loginpage";
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;