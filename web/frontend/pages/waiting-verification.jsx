import { Page } from "@shopify/polaris";

import { WaitingVerification } from "../components";

import "./index.css";

export default function LegalInfoPage() {
  return (
    <Page heading={"Waiting for Verification"}>
      <div id="rootContainer">
        <WaitingVerification />
      </div>
    </Page>
  );
}
