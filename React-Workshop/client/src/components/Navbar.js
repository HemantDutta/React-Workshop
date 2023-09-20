import {useState} from "react";

export const Navbar = () => {

    //States
    const [isActive, setIsActive] = useState('');


    return (
        <>
            <nav>
                <div className="navbar-container">
                    <div className="navbar-left">
                        <span>React Workshop</span>
                    </div>
                    <div className="navbar-right">
                        <ul>
                            <li>Add Users</li>
                            <li>View Users</li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}