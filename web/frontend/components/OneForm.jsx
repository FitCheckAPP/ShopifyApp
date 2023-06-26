import { useState } from "react";
import "./main.css";

import { BiShow } from "react-icons/bi";
import { logoImage } from "../assets";

export function OneForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [passwordShown, setPasswordShown] = useState(false);

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
            />
          </div>
        </div>
      </div>
    </div>
  );
}
