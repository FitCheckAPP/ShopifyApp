import { useState } from "react";
import "./main.css";

import { BiShow } from "react-icons/bi";
import { RiCheckboxCircleFill, RiErrorWarningFill } from "react-icons/ri";
import { logoImage } from "../assets";
import { useNavigate } from "react-router-dom";

import { TextField } from "@shopify/polaris";

import { authenticatedFetch } from "@shopify/app-bridge/utilities";

import axios from "axios";

export function OneForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [passwordShown, setPasswordShown] = useState(false);

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Do request here
    setIsLoading(true);

    const postData = {
      email: email,
      password: password,
    };

    navigate("/extra-info");
  };

  const validEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
    email
  );

  const validInput = validEmail && password;

  return (
    <div className="mainContainer">
      <p>Welcome to FIT CHQ Connect</p>

      <div className="formContainer">
        <img src={logoImage} />
        <div className="inputContainer">
          <TextField
            label="Email Address"
            type="text"
            value={email}
            onChange={(e) => setEmail(e)}
            placeholder="Enter valid email address here..."
            error={emailError}
          />
          <div className="emailIconContainer">
            {validEmail ? (
              <RiCheckboxCircleFill
                className="emailIcon"
                color="rgba(0, 100, 0, 1)"
                size={25}
              />
            ) : (
              <RiErrorWarningFill
                className="emailIcon"
                color="rgba(139, 0, 0, 1)"
                size={25}
              />
            )}
          </div>
        </div>
        <div className="inputContainer">
          <div className="passwordInputContainer">
            <TextField
              label="Password"
              type={passwordShown ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e)}
              placeholder="Enter password here..."
              error={passwordError}
            />
            <div className="passwordIconContainer">
              <BiShow
                className="passwordIcon"
                onClick={() => setPasswordShown(!passwordShown)}
                color="rgba(0, 0, 0, 1)"
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
          onClick={
            validInput
              ? handleSubmit
              : () => {
                  validEmail
                    ? setPasswordError("Password is required")
                    : setEmailError("Type a valid email");
                }
          }
        >
          {isLoading ? "Loading..." : "Connect"}
        </button>
      </div>
    </div>
  );
}
