import { useNavigate } from "react-router-dom";
import "./main.css";

import { Button } from "@shopify/polaris";

import "@shopify/shopify-api/adapters/node";

export async function FinishedPage() {
  const navigate = useNavigate();

  // const handleSubmit = () => {
  //   navigate("/dashboard");
  // };

  return (
    <div className="mainContainer">
      <div className="formContainer">
        <div className="progressBarContainer">
          <div
            className="Bar"
            style={{
              animation: "width100 .7s ease",
              width: "100%",
              borderTopRightRadius: "1.5rem",
            }}
          ></div>
        </div>

        <h1 style={{ fontSize: "2rem", padding: "3vh" }}>
          Your application has been submitted!
        </h1>

        <p
          style={{
            fontSize: "1rem",
            alignText: "center",
            width: "50vw",
            padding: "3vh",
          }}
        >
          You'll be notified of our decision via the email provided and can
          check your application status either by logging into the app again or
          by logging into your FIT CHQ account @ www.fitchq.ai/brands.
        </p>

        <p
          style={{
            fontSize: "1rem",
            alignText: "center",
            width: "50vw",
            padding: "3vh",
          }}
        >
          Currently, we are accepting brands on a rolling basis.
        </p>

        {/* <div className="extActions" style={{ width: "8vw" }}>
          <Button
            size="large"
            primary={true}
            onClick={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            Dashboard
          </Button>
        </div> */}
      </div>
    </div>
  );
}
