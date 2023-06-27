import "./main.css";
import { useState } from "react";
import { Button } from "@shopify/polaris";

import { logoImage } from "../assets";
import { useNavigate } from "react-router-dom";

export function LegalInfo() {
  const navigate = useNavigate();

  const [firstAdd, setFirstAdd] = useState("");
  const [secondAdd, setSecondAdd] = useState("");

  const [zip, setZip] = useState(0);
  const [city, setCity] = useState("");

  const [regNum, setRegNum] = useState(0);

  const [jurisdiction, setJurisdiction] = useState("");
  const [region, setRegion] = useState("");

  const handleSave = () => {
    console.log("Saved");
  };

  const handleSubmit = () => {
    console.log("Submitted");
  };

  const handleBack = () => {
    navigate("/extra-info");
  };

  return (
    <div className="mainContainer">
      <div className="formContainer">
        <img src={logoImage} style={{ width: "15vw", height: "10vh" }} />
        <div className="inputContainer">
          <label>Address Line 1</label>
          <br />
          <input
            type="text"
            onChange={(e) => setFirstAdd(e.target.value)}
            style={{ width: "55vw", height: "6vh" }}
          />
        </div>
        <div className="inputContainer">
          <label>Address Line 2</label>
          <br />
          <input
            type="text"
            onChange={(e) => setSecondAdd(e.target.value)}
            style={{ width: "55vw", height: "6vh" }}
          />
        </div>
        <div className="doubleInput" style={{ paddingLeft: "2.25vw" }}>
          <div className="inputContainer">
            <label>Registered Zip Code</label>
            <input
              type="number"
              min="0"
              max="99999"
              onChange={(e) => setZip(e.target.value)}
              style={{ width: "23vw", height: "6vh" }}
            />
          </div>
          <div className="inputContainer">
            <label>Registered City</label>
            <input
              type="text"
              onChange={(e) => setCity(e.target.value)}
              style={{ width: "25vw", height: "6vh" }}
            />
          </div>
        </div>
        <div className="inputContainer">
          <label>Registration Number</label>
          <br />
          <input
            type="number"
            onChange={(e) => setRegNum(e.target.value)}
            style={{ width: "55vw", height: "6vh" }}
          />
        </div>
        <div className="doubleInput" style={{ paddingLeft: "2.25vw" }}>
          <div className="inputContainer">
            <label>Jurisdiction of Incorporation</label>
            <input
              type="text"
              onChange={(e) => setJurisdiction(e.target.value)}
              style={{ width: "23vw", height: "6vh" }}
            />
          </div>
          <div className="inputContainer">
            <label>Region of Incorporation</label>
            <input
              type="text"
              onChange={(e) => setRegion(e.target.value)}
              style={{ width: "25vw", height: "6vh" }}
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
