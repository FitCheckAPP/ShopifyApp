import { Page } from "@shopify/polaris";

import { PolicyInfo } from "../components";

import "./index.css";

export default function PolicyInfoPage() {
  return (
    <Page heading={"Policy Information"}>
      <div id="rootContainer">
        <PolicyInfo />
      </div>
    </Page>
  );
}
