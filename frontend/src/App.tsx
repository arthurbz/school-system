import { BrowserRouter, Route, Routes } from "react-router-dom"
import HomePage from "./views/HomePage"
import ProfessorsPage from "./views/ProfessorsPage"
import StudentsPage from "./views/StudentsPage"

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/professors" element={<ProfessorsPage />} />
                <Route path="/students" element={<StudentsPage />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
