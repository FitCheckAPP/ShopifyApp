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
      if (response.data.status == 200) {
        if (response.data.appstatus == 1) {
          navigate("/waiting-application");
        } else if (response.data.appstatus == 2) {
          navigate("/dashboard");
        } else {
          navigate("/extra-info");
        }
      }
    });
  }, []);

  return (
    <div>
      You're not verified yet. Please wait a couple seconds and reload the page
      to check again.
    </div>
  );
}
