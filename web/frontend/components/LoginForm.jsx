import { useState } from "react";
import "./main.css";

import { useAuthenticatedFetch } from "../hooks/useAuthenticatedFetch";
import { RiCheckboxCircleFill, RiErrorWarningFill } from "react-icons/ri";
import { logoImage } from "../assets";
import { useNavigate, createSearchParams } from "react-router-dom";

import { TextField } from "@shopify/polaris";

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
      await authenticatedFetch("/api/emailExists", {
        body: JSON.stringify({ email: email }),
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(async (response) => {
          if (response.status == 241) {
            setEmailError("Email not found");
            setIsLoading(false);
            return;
          } else if (response.status == 250) {
            alert("Something went wrong. Please try again later.");
            setIsLoading(false);
            return;
          }

          // ! POST request to verify the email (given that it exists)
          await authenticatedFetch("/api/emailVerif", {
            body: JSON.stringify({ email: email }),
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then(async (response) => {
              if (response.status == 241) {
                setEmailError("Email not found");
                setIsLoading(false);
                return;
              } else if (response.status == 250) {
                alert("Something went wrong. Please try again later.");
                setIsLoading(false);
                return;
              }

              navigate({
                pathname: "/waiting-verification",
                search: `${createSearchParams({ _email: email })}`,
              });
            })
            .catch((error) => {
              alert("Something went wrong...");
              setIsLoading(false);
              return;
            });
        })
        .catch((error) => {
          alert("Something went wrong...");
          setIsLoading(false);
          return;
        });
    } catch (error) {
      console.log(error);
    }
  };

  const validEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
    email
  );

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
                validEmail
                  ? { backgroundColor: "black" }
                  : { backgroundColor: "rgba(0, 0, 0, 0.5)" }
              }
              onClick={(e) => {
                if (validEmail) {
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
