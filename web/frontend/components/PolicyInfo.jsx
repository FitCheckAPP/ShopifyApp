import "./main.css";
import { useState } from "react";

import { logoImage } from "../assets";
import { Button } from "@shopify/polaris";
import { useNavigate } from "react-router-dom";

export function PolicyInfo() {
  const navigate = useNavigate();

  const [permsBox, setPermsBox] = useState(false);
  const [comBox, setComBox] = useState(false);

  const handleBack = () => {
    navigate("/legal-info");
  };

  const handleSave = () => {
    console.log("saved");
  };

  const handleSubmit = () => {
    navigate("/dashboard");
  };

  return (
    <div className="mainContainer">
      <div className="formContainer">
        <img src={logoImage} style={{ width: "15vw", height: "10vh" }} />
        <div className="inputContainer">
          <label>Privacy Policy:</label>
          <a>Privacy Policy Goes Here</a>
        </div>
        <div className="inputContainer">
          <label>Terms and Conditions:</label>
          <a>Terms and Conditions Goes Here</a>
        </div>
        <div className="inputContainer">
          <label>Shipping Info:</label>
          <a>Shipping Info Goes Here</a>
        </div>
        <div className="inputContainer">
          <label>Returns Info:</label>
          <a>Returns Info Goes Here</a>
        </div>
        <div className="inputContainer">
          <label>
            I allow permission to manage orders and access promotional codes via
            API access
          </label>
          <input type="checkbox" onClick={() => setPermsBox(!permsBox)} />
        </div>
        <div className="inputContainer">
          <label>
            I agree to a 10% commission rate on all Sales Before Returns
          </label>
          <input type="checkbox" onClick={() => setComBox(!comBox)} />
        </div>
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
            primary={permsBox && comBox ? true : false}
            onClick={() => {
              if (permsBox && comBox) {
                handleSubmit();
              }
            }}
          >
            submit
          </Button>
        </div>
      </div>
    </div>
  );
}
