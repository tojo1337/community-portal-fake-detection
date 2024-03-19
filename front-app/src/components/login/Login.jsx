import "./Login.css"

const Login = () => {
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
                            <form>
                                <div class="mb-3">
                                    <label for="exampleInputEmail1" class="form-label">Email address</label>
                                    <input type="email" class="form-control login-input" id="exampleInputEmail1"
                                        aria-describedby="emailHelp" />
                                    <div id="emailHelp">We'll never share your email with anyone else.</div>
                                </div>
                                <div class="mb-3">
                                    <label for="exampleInputPassword1" class="form-label">Password</label>
                                    <input type="password" class="form-control login-input" id="exampleInputPassword1" />
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