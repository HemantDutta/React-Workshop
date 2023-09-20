import {useEffect, useState} from "react";
import axios from "axios";

export const ViewUsers = () => {

    //States
    const [users, setUsers] = useState([]);
    const [currId, setCurrID] = useState(0);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");

    //Get Users
    function getUsers() {
        axios.get("http://localhost:5000/getUsers")
            .then((res) => {
                console.log(res.data);
                setUsers(res.data);
            })
    }

    //Call At load or re-render
    useEffect(() => {
        getUsers();
    }, [])

    //Edit Users
    function editUser(id) {
        document.getElementById("mo").classList.add("active");
        document.getElementById("em").classList.add("active");
        setCurrID(id);
        axios.post("http://localhost:5000/curr-user", {
            id: id
        })
            .then((res)=>{
                console.log(res.data)
                setName(res.data[0].name);
                setEmail(res.data[0].email);
                setPass(res.data[0].password);
            })
    }

    //Edit Form
    function handleEditForm(e){
        e.preventDefault();
        axios.post("http://localhost:5000/edit-user", {
            id: currId,
            name: name,
            email: email,
            password: pass
        })
            .then((res)=>{
                if(res.data === 'Updated'){
                    alert("User Updated");
                }
                else{
                    alert("Server Error");
                }
                document.getElementById("mo").classList.remove("active");
                document.getElementById("em").classList.remove("active");
                getUsers();
            })
    }

    //Delete Users
    function deleteUser(id) {
        axios.post("http://localhost:5000/delete-user", {
            id: id
        })
            .then((res)=>{
                if(res.data === "deleted") {
                    alert(`User with id: ${id} has been deleted`);
                }
                else{
                    alert("Server error");
                }
                getUsers();
            })
    }

    return (
        <>
            <div className="view-users">
                <div className="component-header">
                    <span>View Users</span>
                </div>
                <div className="component-content">
                    <table>
                        <thead>
                        <tr>
                            <td>ID</td>
                            <td>Name</td>
                            <td>Email</td>
                            <td colSpan="2">Actions</td>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            users.map(((value, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{value.id}</td>
                                        <td>{value.name}</td>
                                        <td>{value.email}</td>
                                        <td className="btn-field">
                                            <button type="button" onClick={() => {
                                                editUser(value.id)
                                            }}><i className="fa-solid fa-pen-to-square"/></button>
                                            <button type="button" onClick={() => {
                                                deleteUser(value.id)
                                            }}><i className="fa-solid fa-trash"/></button>
                                        </td>
                                    </tr>
                                )
                            }))
                        }
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="modal-overlay" id="mo"/>
            <div className="edit-modal" id="em">
                <form onSubmit={handleEditForm} id="user-form">
                    <div className="input-field">
                        <span>Current ID: {currId}</span>
                    </div>
                    <div className="input-field">
                        <label htmlFor="name">Name</label>
                        <input type="text" name="name" id="name" placeholder="Enter name" required defaultValue={name} onChange={(e) => setName(e.target.value)}/>
                    </div>
                    <div className="input-field">
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" id="email" placeholder="Enter Email" required defaultValue={email} onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <div className="input-field">
                        <label htmlFor="pass">Password</label>
                        <input type="text" name="pass" id="pass" placeholder="Enter Password" required defaultValue={pass} onChange={(e) => setPass(e.target.value)}/>
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </>
    )
}