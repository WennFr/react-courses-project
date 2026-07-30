import { Link } from "react-router-dom"

const Home = () => {
  return (
    <>
    <div>Welcome to  your Course Creator!</div>
    <Link to="/courses">Go to Courses</Link>
    </>
  )
}

export default Home