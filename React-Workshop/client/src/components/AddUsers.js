import {useEffect, useState} from "react";
import axios from "axios";

export const AddUsers = () => {

    //States
    const [id, setID] = useState(0);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");

    //Form Handler
    function handleForm(e) {
        e.preventDefault();
        console.log("Name: " + name + "\nEmail: " + email + "\nPassword: " + pass);

        axios.post("http://localhost:5000/add-user", {
            id: id,
            name: name,
            email: email,
            password: pass
        })
            .then((res)=>{
                if(res.data === "Added"){
                    alert("The User has been added");
                    document.getElementById("user-form").reset();
                    getID();
                }
                else if(res.data === "error"){
                    alert("Error Status: 500");
                }
            })
    }

    //ID Getter
    function getID() {
        axios.get("http://localhost:5000/getID")
            .then((res) => {
                console.log(res.data);
                setID(res.data.curr_id + 1);
            })
    }

    console.log(name);

    //Call At Load or Re-Render
    useEffect(() => {
        getID();
    }, [])


    return (
        <>
            <div className="add-users">
                <div className="component-header">
                    <span>Add Users</span>
                </div>
                <div className="component-content">
                    <form onSubmit={handleForm} id="user-form">
                        <div className="input-field">
                            <span>Current ID: {id}</span>
                        </div>
                        <div className="input-field">
                            <label htmlFor="name">Name</label>
                            <input type="text" name="name" id="name" placeholder="Enter name" required onChange={(e) => setName(e.target.value)}/>
                        </div>
                        <div className="input-field">
                            <label htmlFor="email">Email</label>
                            <input type="email" name="email" id="email" placeholder="Enter Email" required onChange={(e) => setEmail(e.target.value)}/>
                        </div>
                        <div className="input-field">
                            <label htmlFor="pass">Password</label>
                            <input type="text" name="pass" id="pass" placeholder="Enter Password" required onChange={(e) => setPass(e.target.value)}/>
                        </div>
                        <button type="submit">Submit</button>
                    </form>
                </div>
            </div>
        </>
    )
}