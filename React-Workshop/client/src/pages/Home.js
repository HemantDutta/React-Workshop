import {Navbar} from "../components/Navbar";
import {AddUsers} from "../components/AddUsers";
import {ViewUsers} from "../components/ViewUsers";
import {useState} from "react";

export const Home = () => {

    //States
    const [isActive, setIsActive] = useState('add');

    return (
        <>
            {/*  Header  */}
            {/*<Navbar/>*/}
            <nav>
                <div className="navbar-container">
                    <div className="navbar-left">
                        <span>React Workshop</span>
                    </div>
                    <div className="navbar-right">
                        <ul>
                            <li onClick={()=>{setIsActive("add")}}>Add Users</li>
                            <li onClick={()=>{setIsActive("view")}}>View Users</li>
                        </ul>
                    </div>
                </div>
            </nav>
            {/*  Header End  */}
            {/*  Component Container  */}
            <div className="component-container">
                {
                    isActive === "add" &&
                    <AddUsers/>
                }
                {
                    isActive === "view" &&
                    <ViewUsers/>
                }
            </div>
            {/*  Component Container End  */}
        </>
    )
}