import Button from "./shared/Button"
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LogInMenu({toggleLogIn}) {
    const [username, setUsername] = useState(null)
    const [password, setPassword] = useState(null)
    const [passErrors, setPassErrors] = useState([])

    const navigate = useNavigate()

    const validatePassword = (p) => {
        const errors = [];

        if (p.length < 8) {
            errors.push("Your password must be at least 8 characters"); 
        }
        if (p.search(/[a-z]/i) < 0) {
            errors.push("Your password must contain at least one letter.");
        }
        if (p.search(/[0-9]/) < 0) {
            errors.push("Your password must contain at least one digit."); 
        }
        if (errors.length > 0) {
            // alert(errors.join("\n"));
            setPassErrors(errors)
            return false;
        }
        return true;
    }

    const clickLoginHandle = (e) => {
        e.preventDefault();

        toggleLogIn()

        if (validatePassword(password)) {
            navigate('/map')
        }
    }

    const onChangeHandle = (e, type) => {
        if (type == 0) {
            setUsername(e.target.value)
            return
        }

        setPassword(e.target.value)
    }

    return (
        <div className="login-wrapper">
            <div className="login-container">
                <form>
                    <h2>Login to your account</h2>
                    <h3>Username</h3>
                    <input onChange={(e) => onChangeHandle(e, 0)} type='text' placeholder="username"/>
                    <h3>Password</h3>
                    <input onChange={(e) => onChangeHandle(e, 1)} type='password' placeholder="password"/>

                    <div className="buttons-container">
                        <Button onClick={clickLoginHandle}>Login</Button>
                        <Button>Register</Button>
                    </div>

                    <div>
                        {passErrors.map((error, index) => {
                            return (
                                <div key = {index} >{error}</div>
                            )
                        })}
                    </div>
                </form>
                {/* <Button></Button> */}
            </div>
        </div>
    )
}
