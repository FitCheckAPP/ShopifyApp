import "./main.css";

import { logoImage } from "../assets";
import { useState } from "react";

import { Button } from "@shopify/polaris";
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
          <label>Official Company Name</label>
          <br />
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            style={{ width: "55vw", height: "6vh" }}
          />
        </div>
        <div className="inputContainer">
          <label>Store Name</label>
          <br />
          <input
            type="text"
            onChange={(e) => setStore(e.target.value)}
            style={{ width: "55vw", height: "6vh" }}
          />
        </div>

        <div className="inputContainer">
          <label>Store Website URL</label>
          <br />
          <input
            type="text"
            onChange={(e) => setStoreURL(e.target.value)}
            style={{ width: "55vw", height: "6vh" }}
          />
        </div>

        <div className="inputContainer">
          <label>Store Location</label>
          <br />
          <input
            type="text"
            onChange={(e) => setStoreLocation(e.target.value)}
            style={{ width: "55vw", height: "6vh" }}
          />
        </div>

        <div className="inputContainer">
          <label>Do You Ship to the United States?</label>
          <br />
          <select
            type="select"
            onChange={(e) => {
              setShippingQ(e.target.value);
              setAnsweredQ(true);
            }}
            style={{ width: "55vw", height: "6vh" }}
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        <div
          className="inputContainer"
          style={shippingQ == "No" && answeredQ ? {} : { display: "none" }}
        >
          <label>If you ship elsewhere, enter the location(s) here</label>
          <br />
          <textarea
            type="text"
            onChange={(e) => setOtherLoc(e.target.value)}
            style={{ width: "55vw", height: "24vh", fontSize: "1.1rem" }}
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
