import "./main.css";
import { useState } from "react";

import { Button, TextField, Checkbox } from "@shopify/polaris";
import { useNavigate } from "react-router-dom";
import React from "react";

export function PolicyInfo() {
  const navigate = useNavigate();

  const [privacyURL, setPrivacyURL] = useState("");
  const [termsURL, setTermsURL] = useState("");
  const [shippingURL, setShippingURL] = useState("");
  const [returnsURL, setReturnsURL] = useState("");

  const [agreed, setAgreed] = useState(false);

  const [errorText, setErrorText] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const handleBack = () => {
    navigate("/legal-info");
  };

  const handleSave = () => {
    console.log("saved");
  };

  const handleSubmit = () => {
    // Do Fetch Logic Here
    setIsLoading(true);

    navigate("/form-finished");
  };

  return (
    <div className="mainContainer">
      <div className="formContainer">
        <div className="progressBarContainer">
          <div
            className="Bar"
            style={{ animation: "width75 .7s ease", width: "75%" }}
          ></div>
        </div>
        <h1 style={{ fontSize: "2rem" }}>Other Legal Stuff</h1>
        <div className="doubleInput">
          <div style={{ width: "25vw" }}>
            <TextField
              value={privacyURL}
              label="Privacy Policy URL"
              type="text"
              onChange={(e) => setPrivacyURL(e)}
              error={errorText}
            />
          </div>

          <div style={{ width: "25vw" }}>
            <TextField
              value={termsURL}
              label="Terms and Conditions URL"
              type="text"
              onChange={(e) => setTermsURL(e)}
              error={errorText}
            />
          </div>
        </div>
        <div className="doubleInput">
          <div style={{ width: "25vw" }}>
            <TextField
              value={shippingURL}
              label="Shipping Info URL"
              type="text"
              onChange={(e) => setShippingURL(e)}
              error={errorText}
            />
          </div>

          <div style={{ width: "25vw" }}>
            <TextField
              value={returnsURL}
              label="Returns Info URL"
              type="text"
              onChange={(e) => setReturnsURL(e)}
              error={errorText}
            />
          </div>
        </div>

        <div style={{ width: "88%" }}>
          <h1 style={{ fontSize: "1rem" }}>Terms and Conditions:</h1>
          <ol>
            <li>You agree to our terms and conditions and stuff (list here)</li>
          </ol>
        </div>

        <Checkbox
          label="I agree to the Terms of Service."
          checked={agreed}
          onChange={(e) => {
            setAgreed(!agreed);
          }}
        />

        <div className="extActions">
          <Button
            size="large"
            onClick={() => {
              handleBack();
            }}
          >
            back
          </Button>

          <Button
            size="large"
            primary={agreed ? true : false}
            onClick={() => {
              const result = window.confirm(
                "Once you click submit, there isn't going back. Make sure you have all your info correct."
              );
              if (!result) {
                return;
              }
              handleSubmit();
            }}
          >
            {isLoading ? "Loading..." : "Submit"}
          </Button>
        </div>
      </div>
    </div>
  );
}
