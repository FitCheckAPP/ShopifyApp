import { Page } from "@shopify/polaris";

import { WaitingApplication } from "../components";

import "./index.css";

export default function WaitingApplicationPage() {
  return (
    <Page heading={"Going Over Application"}>
      <div id="rootContainer">
        <WaitingApplication />
      </div>
    </Page>
  );
}
