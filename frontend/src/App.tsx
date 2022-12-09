import { BrowserRouter, Route, Routes } from "react-router-dom"
import HomePage from "./views/home/HomePage"

import SchoolHomePage from "./views/home/SchoolHomePage"
import StudentsHomePage from "./views/home/StudentsHomePage"

import Students from "./views/Students"
import Professors from "./views/Profesors"
import Courses from "./views/Courses"
import Enrollments from "./views/Enrollments"

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/school-home" element={<SchoolHomePage />} />
                <Route path="/student-home" element={<StudentsHomePage />} />

                <Route path="/students" element={<Students />} />
                <Route path="/professors" element={<Professors />} />
                <Route path="/courses" element={<Courses />} />
                <Route path="/enrollments" element={<Enrollments />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
