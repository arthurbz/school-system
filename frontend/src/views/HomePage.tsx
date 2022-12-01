import { Link } from "react-router-dom"

function HomePage() {
    return (
        <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 100,
            height: "90vh",
        }}>
            <Link to="/professors">
                <h1>
                    Professors
                </h1>
            </Link>

            <Link to="/students">
                <h1>
                    Students
                </h1>
            </Link>
        </div>
    )
}

export default HomePage
