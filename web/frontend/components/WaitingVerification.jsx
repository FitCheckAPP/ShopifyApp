import { React, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import axios from "axios";
import { useNavigate } from "react-router-dom";

export function WaitingVerification(props) {
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const email = searchParams.get("_email");

  useEffect(() => {
    axios.post("/api/checkEmailClick", { email: email }).then((response) => {
      console.log(response);
      if (response.data.status == 200) {
        console.log(response.data.appstatus);
        if (response.data.appstatus == 1) {
          navigate("/waiting-application");
        } else if (response.data.appstatus == 2) {
          navigate("/dashboard");
        } else if (response.data.appstatus == 0) {
          navigate("/extra-info");
        }
      }
    });
  }, []);

  return (
    <div>
      Verification email sent. Please refresh the page after clicking the link
      sent in your email.
    </div>
  );
}
