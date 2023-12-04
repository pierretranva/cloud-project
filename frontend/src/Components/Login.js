import React, { useState } from 'react';
import axios from 'axios';
const Login = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        axios.post('http://localhost:3000/db/user/login', {username:username, password: password}).then(
            (res) =>{
                console.log(res.data)
                props.handleSignIn(res.data)
            }
        ).catch((err)=>{
            setError(err)
        })
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username:</label>
                    <input value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type="submit">Login</button>
                {error && <p style={{color: "red"}}>{error}</p>}
            </form>
        </div>
    );
};

export default Login;
