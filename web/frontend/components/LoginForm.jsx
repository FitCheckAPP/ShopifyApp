import { useState } from "react";
import "./main.css";

import { useAuthenticatedFetch } from "../hooks/useAuthenticatedFetch";
import { RiCheckboxCircleFill, RiErrorWarningFill } from "react-icons/ri";
import { logoImage } from "../assets";
import { useNavigate } from "react-router-dom";

import { TextField } from "@shopify/polaris";
import axios from "axios";




export function LoginForm() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [verifWaiting, setVerifWaiting] = useState(false);

  const navigate = useNavigate();
  const authenticatedFetch = useAuthenticatedFetch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Do request here
    setIsLoading(true);

    try {
      // ! POST request to check if email exists
      axios
        .post("/api/emailExists", { email })
        .then((response) => {
          // Email Exists
          // ! POST request to verify the email (given that it exists)
          const fetch = authenticatedFetch("/api/emailVerif", { body: JSON.stringify({"email": email}), method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          }, })
            .then((response) => {
              setVerifWaiting(true);
            })
            .catch((error) => {
              if (error.response.status == 400) {
                // Bad data
                setEmailError("Please enter a valid input. email verif");
                setIsLoading(false);
                throw new Error("Please enter a valid input. email verif");
              } else {
                // Internal Server Error
                setEmailError("Error Sending Email");
                setIsLoading(false);
                throw new Error("Error Sending Email");
              }
            });
        })

        .catch((error) => {
          if (error.response.status == 400) {
            // Bad data
            setEmailError("Please enter a valid input. email exists");
            setIsLoading(false);
            throw new Error("Please enter a valid input. email exists ");
          } else if (error.response.status == 404) {
            // Email not found
            setEmailError("Email not found. Please sign up");
            setIsLoading(false);
            throw new Error("Email not found");
          } else {
            // Internal Server Error
            setEmailError("Internal Server Error");
            setIsLoading(false);
            throw new Error("Internal Server Error");
          }
        });
    } catch (error) {
      console.log(error);
    }
    // try{
    //   const fetch = authenticatedFetch('/api/access-token', {
    //     method: 'GET',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //   })
    //     .then(response => {
    //       // Handle response
    //       if (response.ok) {
    //         // API request successful
    //         // Add your desired logic here
    //         console.log('Shop added successfully!');
    //       } else {
    //         // API request failed
    //         // Handle the error
    //         console.error('Failed to add shop:', response.statusText);
    //       }
    //     });
    // }
    // catch (error) {
    //     console.log(error);
    //   }
    


  };

  const validEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
    email
  );

  const validInput = validEmail;

  return (
    <div className="mainContainer">
      <p>Welcome to FIT CHQ Connect</p>

      <div className="formContainer">
        <img src={logoImage} />
        {verifWaiting ? (
          <div
            className="inputContainer"
            style={{
              fontSize: "2rem",
              textAlign: "center",
              paddingLeft: "5vw",
              paddingRight: "5vw",
              lineHeight: "10vh",
            }}
          >
            Email verification sent! <br />
            Check your email for a link.
          </div>
        ) : (
          <>
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
              onClick={(e) => {
                if (validInput) {
                  handleSubmit(e);
                } else {
                  setEmailError("Please enter a valid email");
                }
              }}
            >
              {isLoading ? "Loading..." : "Verify"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
