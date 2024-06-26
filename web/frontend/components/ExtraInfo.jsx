import "./main.css";

import { logoImage } from "../assets";
import { useState } from "react";

import { Button, TextField, Select } from "@shopify/polaris";
import { useNavigate } from "react-router-dom";

import axios from "axios";

export function ExtraInfo() {
  const [companyName, setCompanyName] = useState("");
  const [storeName, setStoreName] = useState("");
  const [storeURL, setStoreURL] = useState("");
  const [storeLocation, setStoreLocation] = useState("");
  const [shippingQ, setShippingQ] = useState(false);
  const [otherLoc, setOtherLoc] = useState("");

  const [errorText, setErrorText] = useState("");

  const validInput = companyName && storeName && storeURL && storeLocation;

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const handleSave = () => {
    // TODO: Add fetch logic
  };

  const handleSubmit = () => {
    setIsLoading(true);

    const postData = {
      companyName,
      storeName,
      storeURL,
      storeLocation,
      shippingQ,
      otherLoc,
    };

    axios
      .post("/api/initInfo/store", postData)
      .then((response) => {
        navigate("/legal-info");
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  return (
    <div className="mainContainer">
      <div className="formContainer">
        <div className="progressBarContainer">
          <div
            className="Bar"
            style={{ animation: "width25 .7s ease", width: "25%" }}
          ></div>
        </div>
        <h1 style={{ fontSize: "2rem" }}>Store Information</h1>
        <div className="inputContainer">
          <TextField
            value={companyName}
            label="Official Company Name"
            type="text"
            onChange={(e) => setCompanyName(e)}
            error={errorText}
          />
        </div>
        <div className="inputContainer">
          <TextField
            label="Store Name"
            value={storeName}
            type="text"
            onChange={(e) => setStoreName(e)}
            error={errorText}
          />
        </div>

        <div className="inputContainer">
          <TextField
            label="Store Website URL"
            value={storeURL}
            type="text"
            onChange={(e) => setStoreURL(e)}
            style={{ width: "55vw" }}
            error={errorText}
          />
        </div>

        <div className="inputContainer">
          <TextField
            value={storeLocation}
            label="Store Location"
            type="text"
            onChange={(e) => setStoreLocation(e)}
            style={{ width: "55vw" }}
            error={errorText}
          />
        </div>

        <div className="inputContainer">
          <Select
            label="Do You Ship to the United States?"
            value={shippingQ}
            onChange={(e) => {
              setShippingQ(e);
            }}
            options={[
              { label: "Yes", value: "Yes" },
              { label: "No", value: "No" },
            ]}
            style={{ width: "55vw" }}
          />
        </div>

        <div className="inputContainer" style={{ width: "40vw" }}>
          <TextField
            label="If you ship elsewhere, enter the location(s) here"
            type="text"
            onChange={(e) => setOtherLoc(e)}
            multiline={2}
            value={otherLoc}
            style={{ width: "55vw", fontSize: "1.1rem" }}
          />
        </div>
        <div className="extActions">
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
