import "./main.css";

import { logoImage } from "../assets";
import { useState } from "react";

import { Button, TextField, Select } from "@shopify/polaris";
import { useNavigate } from "react-router-dom";

export function ExtraInfo() {
  const [name, setName] = useState("");
  const [store, setStore] = useState("");
  const [storeURL, setStoreURL] = useState("");
  const [storeLocation, setStoreLocation] = useState("");
  const [shippingQ, setShippingQ] = useState(false);
  const [answeredQ, setAnsweredQ] = useState(false);
  const [otherLoc, setOtherLoc] = useState("");

  const navigate = useNavigate();

  const handleSave = () => {
    // TODO: Add fetch logic
  };

  const handleSubmit = () => {
    navigate("/legal-info");
  };

  return (
    <div className="mainContainer">
      <h1>Store Information</h1>
      <div className="formContainer">
        <img src={logoImage} style={{ width: "15vw", height: "10vh" }} />
        <div className="inputContainer">
          <TextField
            value={name}
            label="Official Company Name"
            type="text"
            onChange={(e) => setName(e)}
            style={{ width: "55vw", height: "6vh" }}
          />
        </div>
        <div className="inputContainer">
          <TextField
            label="Store Name"
            value={store}
            type="text"
            onChange={(e) => setStore(e)}
            style={{ width: "55vw", height: "6vh" }}
          />
        </div>

        <div className="inputContainer">
          <TextField
            label="Store Website URL"
            value={storeURL}
            type="text"
            onChange={(e) => setStoreURL(e)}
            style={{ width: "55vw", height: "6vh" }}
          />
        </div>

        <div className="inputContainer">
          <TextField
            value={storeLocation}
            label="Store Location"
            type="text"
            onChange={(e) => setStoreLocation(e)}
            style={{ width: "55vw", height: "6vh" }}
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
            style={{ width: "55vw", height: "6vh" }}
          />
        </div>

        <div className="inputContainer">
          <TextField
            label="If you ship elsewhere, enter the location(s) here"
            type="text"
            onChange={(e) => setOtherLoc(e)}
            multiline={2}
            value={otherLoc}
            style={{ width: "55vw", height: "10vh", fontSize: "1.1rem" }}
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
              handleSubmit();
            }}
          >
            next
          </Button>
        </div>
      </div>
    </div>
  );
}
