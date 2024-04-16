import axios from "axios";
import "./Register.css";
import { signIn } from "../../static/Api";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const formJson = Object.fromEntries(formData.entries());
        console.log(formJson);

        let payload = JSON.stringify(
            {
                user: formJson.user,
                email: formJson.email,
                pass: formJson.password
            }
        );

        axios.post(signIn, payload, {
            headers: {
                "Content-Type": "application/json",
            }
        })
            .then(data => {
                // Add redirect after registration
                if (data.data === "Username already exists") {
                    alert("Username already exists");
                } else {
                    navigate("/login");
                }
            })
            .catch(err => {
                console.error(err)
            });
    }

    return (
        <div className="register-comp">
            <div className="container-flex">
                <div className="d-flex justify-content-center align-items-center p-3">
                    <div className="tube-light">
                        <div className="register-box">
                            <div className="container">
                                <div className="d-flex justify-content-center">
                                    <h1>Sign up</h1>
                                </div>
                            </div>
                            <div className="container">
                                <div className="d-flex justify-content-center">
                                    <button className="btn btn-dark login-btn">Go with google</button>
                                </div>
                            </div>
                            <div className="container">
                                <div className="d-flex flex-row">
                                    <div className="container">
                                        <hr />
                                    </div>
                                    <span>
                                        or
                                    </span>
                                    <div className="container">
                                        <hr />
                                    </div>
                                </div>
                            </div>
                            <div className="item">
                                <form method="post" onSubmit={submitHandler}>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputUser1" className="form-label">User name</label>
                                        <input type="text" className="form-control input-prop" id="exampleInputUser1"
                                            aria-describedby="userHelp" name="user" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1" className="form-label input-prop">Email address</label>
                                        <input type="email" className="form-control input-prop" id="exampleInputEmail1"
                                            aria-describedby="emailHelp" name="email" />
                                        <div id="emailHelp">We'll never share your email with anyone else.</div>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                                        <input type="password" className="form-control input-prop" id="exampleInputPassword1" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputPassword1" className="form-label">Enter Password Again</label>
                                        <input type="password" className="form-control input-prop" id="exampleInputPassword1" name="password" />
                                    </div>
                                    <button className="btn btn-dark login-btn">submit</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export {
    Register,
}