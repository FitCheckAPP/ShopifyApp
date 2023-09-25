import { React, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import { useAuthenticatedFetch } from "../hooks/useAuthenticatedFetch";

export function WaitingVerification(props) {
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const email = searchParams.get("_email");

  const authenticatedFetch = useAuthenticatedFetch();

  useEffect(() => {
    authenticatedFetch("/api/checkEmailVerify", {
      body: JSON.stringify({ email: email }),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(async (response) => {
      const data = await response.json();
      if (data.status == 200) {
        console.log(data.appstate);
        if (data.appstate == 1) {
          navigate("/waiting-application");
        } else if (data.appstate == 2) {
          navigate("/dashboard");
        } else if (data.appstate == 0) {
          navigate("/initial-info");
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
