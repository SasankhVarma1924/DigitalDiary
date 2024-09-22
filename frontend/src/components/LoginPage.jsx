import { useState } from "react";
import "./LoginPage.css"

function LoginPage()
{
  const [isLogged, setIsLogged] = useState(true);
  const [message, setMessage] = useState('');

  const handleSubmitButton = (event) =>
  {
    event.preventDefault();
    const form = event.target;
    const username = form.username.value.trim();
    const password = form.password.value.trim();
    const cnfrmpassword = isLogged ? '' : form.cnfrmpassword.value.trim();
    if (username === '') {
        setMessage('Username is required');
        return;
    }
    if (password === '') {
        setMessage('Password is required');
        return;
    }
    if (!isLogged && password !== cnfrmpassword) {
        setMessage('Passwords do not match');
        return;
    }
  }

  const handleSignClick = (event) =>
  {
    setIsLogged(!isLogged);
    setMessage("");
  }

  return (
    <>
      <div className="SignUpPageContainer" style={{textAlign: "center", marginTop:"5%"}}>
        <h1 style={{color:"#E0E0E0", fontFamily:"monospace"}}>
          {isLogged ? "Sign in to Your Account" : "Create Your Account"}
        </h1>
        <form className="UserDetailsContainer" onSubmit={handleSubmitButton}>
          <span style={{marginTop:"10px", fontSize:"1.1em", fontFamily:"monospace", color:"#f44c7f"}}>{message}</span>
          <input className="UserName" type="text" name="username" id="username" placeholder="username" />
          <input className="Password" type="password" name="password" id="password" placeholder="password" />
          { !isLogged ? <input className="Password" type="password" name="cnfrmpassword" id="cnfrmpassword" placeholder="Confirm Password" /> : null}
          <input className="SignButton" type="submit" name="signup" id="signup" value={!isLogged ? "Sign up" : "Sign in"}/>
        </form>
        <div className="UserDetailsContainer">
          <span style={{color:"#E0E0E0", fontFamily:"monospace", fontSize:"1.2em", marginTop:"15px"}}>
            {isLogged ? "Don't have an account?" : "Have an account?"}
          </span>
          <span className="AltSignup" onClick={handleSignClick}>{isLogged ? "Sign up" : "Sign in"}</span>
        </div>
      </div>
    </>
  );
}

export default LoginPage;