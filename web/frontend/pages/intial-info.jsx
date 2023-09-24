import { Page } from "@shopify/polaris";

import { InitialInfo } from "../components";

import "./index.css";

export default function InitialInfoPage() {
  return (
    <Page>
      <div id="rootContainer">
        <InitialInfo />
      </div>
    </Page>
  );
}
