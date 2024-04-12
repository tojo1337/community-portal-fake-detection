import "./Login.css"
import { token } from "../../static/Api";
import { refresh } from "../../static/Api";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { login, setUser } from "../../services/AuthGuard";

const Login = () => {
    const token = useSelector(state => state.authGuard.bearerToken);
    const isLoggedIn = useSelector(state => state.authGuard.isAuthenticated);
    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const formJson = Object.fromEntries(formData.entries());
        console.log(formJson);

        axios.post(token, {
            email: formJson.email,
            pass: formJson.password
        })
            .then(data => {
                // Save the jwt token from here into the redux storage or login context api
                console.log(data.data);
                if (data.data === "Unable to create token") {
                    alert("Unable to create token !!!");
                } else {
                    dispatch(login(data.data));
                    dispatch(setUser(formJson.user));
                }
            })
            .catch(err => {
                console.error(err);
            });
    }

    return (
        <div className="login-comp">

            <div class="container">
                <div class="d-flex justify-content-center align-items-center p-5">
                    <div class="box">
                        <div class="box-header">
                            <div class="d-flex justify-content-center">
                                <h1>Login</h1>
                            </div>
                        </div>
                        <div class="item">
                            <form method="post" onSubmit={submitHandler}>
                                <div class="mb-3">
                                    <label for="exampleInputEmail1" class="form-label">Email address</label>
                                    <input type="email" class="form-control login-input" id="exampleInputEmail"
                                        aria-describedby="userHelp" name="email" />
                                    <div id="emailHelp">We'll never share your email with anyone else.</div>
                                </div>
                                <div class="mb-3">
                                    <label for="exampleInputPassword1" class="form-label">Password</label>
                                    <input type="password" class="form-control login-input" id="exampleInputPassword1" name="password" />
                                </div>
                                <div class="mb-3 form-check">
                                    <div class="d-flex justify-content-end" id="forgot-password">Forgot password?</div>
                                </div>
                                <button class="btn btn-dark login-btn">submit</button>
                            </form>
                            <div id="ask-sign-up">
                                Not already a member? Register
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export {
    Login,
}