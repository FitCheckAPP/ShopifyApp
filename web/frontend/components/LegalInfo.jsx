import "./main.css";
import { useState } from "react";
import { Button, TextField } from "@shopify/polaris";

import { useNavigate } from "react-router-dom";

import axios from "axios";

export function LegalInfo() {
  const navigate = useNavigate();

  const [firstAdd, setFirstAdd] = useState("");
  const [secondAdd, setSecondAdd] = useState("");
  const [zip, setZip] = useState(0);
  const [city, setCity] = useState("");
  const [regNum, setRegNum] = useState(0);
  const [jurisdiction, setJurisdiction] = useState("");
  const [region, setRegion] = useState("");

  const [errorText, setErrorText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validInput =
    firstAdd && zip && city && regNum && jurisdiction && region;

  const handleSave = () => {
    // TODO: Add fetch logic
  };

  const handleSubmit = () => {
    setIsLoading(true);

    const postData = {
      firstAdd,
      secondAdd,
      zip,
      city,
      regNum,
      jurisdiction,
      region,
    };

    axios
      .post("/api/initInfo/legal", postData)
      .then((response) => {
        navigate("/policy-info");
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  const handleBack = () => {
    navigate("/initial-info");
  };

  return (
    <div className="mainContainer">
      <div className="formContainer">
        <div className="progressBarContainer">
          <div
            className="Bar"
            style={{ animation: "width50 .7s ease", width: "50%" }}
          ></div>
        </div>
        <h1 style={{ fontSize: "2rem" }}>Legal Information</h1>
        <div className="inputContainer">
          <div style={{ width: "55vw" }}>
            <TextField
              value={firstAdd}
              label="Address Line 1"
              type="text"
              onChange={(e) => setFirstAdd(e)}
              error={errorText}
            />
          </div>
        </div>
        <div className="inputContainer">
          <div style={{ width: "55vw" }}>
            <TextField
              value={secondAdd}
              label="Address Line 2"
              type="text"
              onChange={(e) => setSecondAdd(e)}
            />
          </div>
        </div>
        <div className="doubleInput">
          <div style={{ width: "25vw" }}>
            <TextField
              value={zip}
              label="Registered ZIP Code"
              type="number"
              min="0"
              max="99999"
              onChange={(e) => setZip(e)}
              error={errorText}
            />
          </div>
          <div style={{ width: "25vw" }}>
            <TextField
              type="text"
              label="Registered City"
              value={city}
              onChange={(e) => setCity(e)}
              error={errorText}
            />
          </div>
        </div>
        <div className="inputContainer">
          <div style={{ width: "55vw" }}>
            <TextField
              type="number"
              label="Registration Number"
              value={regNum}
              onChange={(e) => setRegNum(e)}
              error={errorText}
            />
          </div>
        </div>
        <div className="doubleInput" style={{ marginBottom: "1vh" }}>
          <div style={{ width: "25vw" }}>
            <TextField
              type="text"
              label="Jurisdiction of Incorporation"
              onChange={(e) => setJurisdiction(e)}
              value={jurisdiction}
              error={errorText}
            />
          </div>
          <div style={{ width: "25vw" }}>
            <TextField
              type="text"
              onChange={(e) => setRegion(e)}
              value={region}
              label="Region of Incorporation"
              error={errorText}
            />
          </div>
        </div>
        <div className="extActions">
          <Button
            size="large"
            onClick={(e) => {
              e.preventDefault();
              handleBack();
            }}
          >
            back
          </Button>
          <Button
            size="large"
            onClick={(e) => {
              e.preventDefault();
              handleSave();
            }}
          >
            save
          </Button>
          <Button
            size="large"
            primary="true"
            onClick={(e) => {
              e.preventDefault();
              if (validInput) {
                handleSubmit();
              } else {
                setErrorText("All fields required");
              }
            }}
          >
            {isLoading ? "Loading..." : "next"}
          </Button>
        </div>
      </div>
    </div>
  );
}
