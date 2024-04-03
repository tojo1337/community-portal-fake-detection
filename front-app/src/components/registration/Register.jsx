import axios from "axios";
import "./Register.css";
import { signIn } from "../../static/Api";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const navigate = useNavigate();

    const submitHandler = (e)=>{
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const formJson = Object.fromEntries(formData.entries());
        console.log(formJson);

        axios.post(signIn,{
            user: formJson.user,
            email: formJson.email,
            pass: formJson.password
        })
        .then(data=>{
            // Add redirect after registration
            navigate("/login");
        })
        .catch(err=>{
            console.error(err)
        });
    }

    return (
        <div className="register-comp">
            <div class="container-flex">
                <div class="d-flex justify-content-center align-items-center p-3">
                    <div class="tube-light">
                        <div class="register-box">
                            <div class="container">
                                <div class="d-flex justify-content-center">
                                    <h1>Sign up</h1>
                                </div>
                            </div>
                            <div class="container">
                                <div class="d-flex justify-content-center">
                                    <button class="btn btn-dark login-btn">Go with google</button>
                                </div>
                            </div>
                            <div class="container">
                                <div class="d-flex flex-row">
                                    <div class="container">
                                        <hr />
                                    </div>
                                    <span>
                                        or
                                    </span>
                                    <div class="container">
                                        <hr />
                                    </div>
                                </div>
                            </div>
                            <div class="item">
                                <form method="post" onSubmit={submitHandler}>
                                    <div class="mb-3">
                                        <label for="exampleInputUser1" class="form-label">User name</label>
                                        <input type="text" class="form-control input-prop" id="exampleInputUser1"
                                            aria-describedby="userHelp" name="user" />
                                    </div>
                                    <div class="mb-3">
                                        <label for="exampleInputEmail1" class="form-label input-prop">Email address</label>
                                        <input type="email" class="form-control input-prop" id="exampleInputEmail1"
                                            aria-describedby="emailHelp" name="email" />
                                            <div id="emailHelp">We'll never share your email with anyone else.</div>
                                    </div>
                                    <div class="mb-3">
                                        <label for="exampleInputPassword1" class="form-label">Password</label>
                                        <input type="password" class="form-control input-prop" id="exampleInputPassword1" />
                                    </div>
                                    <div class="mb-3">
                                        <label for="exampleInputPassword1" class="form-label">Enter Password Again</label>
                                        <input type="password" class="form-control input-prop" id="exampleInputPassword1" name="password" />
                                    </div>
                                    <button class="btn btn-dark login-btn">submit</button>
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