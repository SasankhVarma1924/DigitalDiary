import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css"

function LoginPage()
{
  const navigate = useNavigate();
  const [haveAccount, sethaveAccount] = useState(true);
  const [message, setMessage] = useState('');

  const handleSubmitButton = async (event) =>
  {
    event.preventDefault();
    const form = event.target;
    const username = form.username.value.trim();
    const password = form.password.value.trim();
    const cnfrmpassword = haveAccount ? '' : form.cnfrmpassword.value.trim();
    if (username === '') {
        setMessage('Username is required');
        return;
    }
    if (password === '') {
        setMessage('Password is required');
        return;
    }
    if (!haveAccount && password !== cnfrmpassword) {
        setMessage('Passwords do not match');
        return;
    }
    const user = {username: username, password: password};
    if(haveAccount)
    {
      const response = await fetch("http://localhost:5000/api/users/signin", 
        {
          method: "POST",
          headers: {"Content-Type" : "application/json"},
          body: JSON.stringify(user)
        }
      )
      const res = await response.json();
      if(res.success)
      {
        console.log(res.msg);
        navigate("/diary");
      }
    }
    else
    {
      const response = await fetch("http://localhost:5000/api/users/signup", 
        {
          method: "POST",
          headers: {"Content-Type" : "application/json"},
          body: JSON.stringify(user)
        }
      )
      const res = await response.json();
      if(res.success)
      {
        console.log(res.msg);
        sethaveAccount(true);
      }
    }
  }

  const handleSignClick = (event) =>
  {
    sethaveAccount(!haveAccount);
    setMessage("");
  }

  return (
    <>
      <div className="SignUpPageContainer" style={{textAlign: "center", marginTop:"5%"}}>
        <h1 style={{color:"#E0E0E0", fontFamily:"monospace"}}>
          {haveAccount ? "Sign in to Your Account" : "Create Your Account"}
        </h1>
        <form className="UserDetailsContainer" onSubmit={handleSubmitButton}>
          <span style={{marginTop:"10px", fontSize:"1.1em", fontFamily:"monospace", color:"#f44c7f"}}>{message}</span>
          <input className="UserName" type="text" name="username" id="username" placeholder="username" />
          <input className="Password" type="password" name="password" id="password" placeholder="password" />
          { !haveAccount ? <input className="Password" type="password" name="cnfrmpassword" id="cnfrmpassword" placeholder="Confirm Password" /> : null}
          <input className="SignButton" type="submit" name="signup" id="signup" value={!haveAccount ? "Sign up" : "Sign in"}/>
        </form>
        <div className="UserDetailsContainer">
          <span style={{color:"#E0E0E0", fontFamily:"monospace", fontSize:"1.2em", marginTop:"15px"}}>
            {haveAccount ? "Don't have an account?" : "Have an account?"}
          </span>
          <span className="AltSignup" onClick={handleSignClick}>{haveAccount ? "Sign up" : "Sign in"}</span>
        </div>
      </div>
    </>
  );
}

export default LoginPage;