import { Page } from "@shopify/polaris";

import { LegalInfo } from "../components";

import "./index.css";

export default function LegalInfoPage() {
  return (
    <Page>
      <div id="rootContainer">
        <LegalInfo />
      </div>
    </Page>
  );
}
