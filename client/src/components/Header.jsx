import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <div>
            <h1>Header</h1>
            <ul>
                {/* <li>
                    <Link to="/" >Home</Link>
                </li> */}
                <li>
                    <Link to="/login" >Login</Link>
                </li>
                <li>
                    <Link to="/" >Dashboard</Link>
                </li>
            </ul>
        </div>
    )
}

export default Header
