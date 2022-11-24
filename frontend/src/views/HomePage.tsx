import { Link } from "react-router-dom"

function HomePage() {
    return (
        <>
            <Link to="/professors">Professors</Link>
            <Link to="/students">Students</Link>
        </>
    )
}

export default HomePage
