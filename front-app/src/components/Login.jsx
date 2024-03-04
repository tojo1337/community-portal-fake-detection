function Login(){
    function formHandler(e){
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const formJson = Object.fromEntries(formData.entries());
        console.log("UserId : "+formJson.userId);
        console.log("Password : "+formJson.passwd);
    }
    return(
        <div className="Login">
            <h1>Login form</h1>
            <form method="post" onSubmit={formHandler}>
                <input type="text" name="userId" placeholder="enter user id or email id" />
                <br />
                <input type="password" name="passwd" placeholder="enter password" />
                <br />
                <button type="submit">submit</button>
            </form>
        </div>
    )
}

export{
    Login
}