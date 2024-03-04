function Register(){
    function registrationHandler(e){
        e.preventDefault();
    }
    return(
        <div className="Register">
            <h1>Registration form</h1>
            <form method="post" onSubmit={registrationHandler}>
                <label>Enter username</label>
                <input name="name" />
                <br />
                <label>Enter email id</label>
                <input type="email" name="email" />
                <br />
                <label>Enter password</label>
                <input type="password" name="password" />
                <br />
                <button type="submit">submit</button>
                <button type="reset">reset</button>
            </form>
        </div>
    )
}

export {
    Register
}