import { useState } from "react";
import "./main.css";

import { BiShow } from "react-icons/bi";
import { logoImage } from "../assets";
import { useNavigate } from "react-router-dom";

export function OneForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [passwordShown, setPasswordShown] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    navigate("/extra-info");
  };

  return (
    <div className="mainContainer">
      <p>Welcome to FIT CHQ Connect</p>
      <br />
      <p>
        Sign in or create a FIT CHQ account to continue with the application
        process.
      </p>
      <div className="formContainer">
        <img src={logoImage} />
        <div className="inputContainer">
          <label>
            <strong>Email address</strong>
          </label>
          <br />
          <input type="text" onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="inputContainer">
          <label>
            <strong>Password</strong>
          </label>
          <br />
          <div className="passwordInputContainer">
            <input
              type={passwordShown ? "text" : "password"}
              onChange={(e) => setPassword(e.target.value)}
            />
            <BiShow
              className="passwordIcon"
              onClick={(e) => {
                e.preventDefault();
                setPasswordShown(!passwordShown);
              }}
              color="rgba(0, 0, 0, 0.5)"
              size={25}
            />
          </div>
        </div>
        <div className="extActions">
          <a>Create Account</a>
          <a>Forgot Password?</a>
        </div>
        <button className="connectButton" onClick={handleSubmit}>
          Connect
        </button>
      </div>
    </div>
  );
}
