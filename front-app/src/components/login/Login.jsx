import "./Login.css"
import { token } from "../../static/Api";
import { refresh as refresher, isAdmid } from "../../static/Api";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { login, setUser,setAdmin } from "../../services/AuthGuard";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const bearer = useSelector(state => state.authGuard.bearerToken);
    const isLoggedIn = useSelector(state => state.authGuard.isAuthenticated);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const formJson = Object.fromEntries(formData.entries());
        console.log(formJson);

        if (isLoggedIn) {
            let payload = {
                token: bearer
            };
            requestRefresher(token,payload);
        } else {
            let payload = {
                email: formJson.email,
                pass: formJson.password
            };
            loginRequest(payload);
        }
    }

    const loginRequest = async (payload) => {
        console.log(token);
        await axios.post(token, payload, {
            headers: {
                "Content-Type": "application/json",
            }
        }).then(data => {
            // Save the jwt token from here into the redux storage or login context api
            console.log(data.data);
            if (data.data === "Unable to create token") {
                alert("Unable to create token !!!");
            } else {
                console.log(payload.email);
                dispatch(login(data.data));
                dispatch(setUser(payload.email));
                checkAdminStat(data.data);
                navigate("/dashboard");
            }
        }).catch(err => {
            console.error(err);
        });
    }

    const checkAdminStat = async (data)=>{
        let tok = data.data;
        let payload = {
            token: tok
        }
        await axios.post(isAdmid, payload, {
            headers:{
                "Authorization": "Bearer "+tok
            }
        }).then((data)=>{
            if(data.data.info==="Admin"){
                dispatch(setAdmin(true));
            }
        }).catch((err)=>console.error(err));
    }

    const requestRefresher = async (token, payload) => {
        console.log(refresher);
        await axios.post(refresher, payload, {
            headers: {
                "Authorization": bearer,
                "Content-Type": "application/json",
            }
        }).then(data => {
            dispatch(refresh(data.data));
        }).catch(err => console.error(err));
    }

    return (
        <div className="login-comp">

            <div className="container">
                <div className="d-flex justify-content-center align-items-center p-5">
                    <div className="box">
                        <div className="box-header">
                            <div className="d-flex justify-content-center">
                                <h1>Login</h1>
                            </div>
                        </div>
                        <div className="item">
                            <form method="post" onSubmit={submitHandler}>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                                    <input type="email" className="form-control login-input" id="exampleInputEmail"
                                        aria-describedby="userHelp" name="email" />
                                    <div id="emailHelp">We'll never share your email with anyone else.</div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                                    <input type="password" className="form-control login-input" id="exampleInputPassword1" name="password" />
                                </div>
                                <div className="mb-3 form-check">
                                    <div className="d-flex justify-content-end" id="forgot-password">Forgot password?</div>
                                </div>
                                <button className="btn btn-dark login-btn">submit</button>
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