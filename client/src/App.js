import Choose from "./components/choose";
import LoginPage from "./components/loginPage";
import {
  Routes,
  Route
} from "react-router-dom";
import PatientPage from "./components/PatientPage";
import DoctorPage from "./components/DoctorPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Choose />} />
      <Route path="/loginPage" element={<LoginPage />} />
      <Route path="/patientPage" element={<PatientPage />} />
      <Route path="/doctorPage" element={<DoctorPage />} />
    </Routes>
  );
}

export default App;
