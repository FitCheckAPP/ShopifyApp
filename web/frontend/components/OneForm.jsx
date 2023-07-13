import { useState } from "react";
import "./main.css";

import { BiShow } from "react-icons/bi";
import { logoImage } from "../assets";
import { useNavigate } from "react-router-dom";

import { TextField } from "@shopify/polaris";

export function OneForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [passwordShown, setPasswordShown] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    navigate("/extra-info");
  };

  const validInput = email && password;

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
          <TextField
            label="Email Address"
            type="text"
            value={email}
            onChange={(e) => setEmail(e)}
          />
        </div>
        <div className="inputContainer">
          <div className="passwordInputContainer">
            <TextField
              label="Password"
              type={passwordShown ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e)}
            />
            <div className="passwordIconContainer">
              <BiShow
                className="passwordIcon"
                onClick={() => setPasswordShown(!passwordShown)}
                color="rgba(0, 0, 0, 0.5)"
                size={25}
              />
            </div>
          </div>
        </div>
        <div className="extActions">
          <a>Create Account</a>
          <a>Forgot Password?</a>
        </div>
        <button
          className="connectButton"
          style={
            validInput
              ? { backgroundColor: "black" }
              : { backgroundColor: "rgba(0, 0, 0, 0.5)" }
          }
          onClick={validInput ? handleSubmit : console.log("Must be valid")}
        >
          Connect
        </button>
      </div>
    </div>
  );
}
