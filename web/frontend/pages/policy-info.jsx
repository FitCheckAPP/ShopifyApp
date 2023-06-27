import { Page } from "@shopify/polaris";

import { PolicyInfo } from "../components";

import "./index.css";

export default function LegalInfoPage() {
  return (
    <Page>
      <div id="rootContainer">
        <PolicyInfo />
      </div>
    </Page>
  );
}
