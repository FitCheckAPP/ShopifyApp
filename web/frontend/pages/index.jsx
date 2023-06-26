import { Page } from "@shopify/polaris";

import { OneForm } from "../components";

import "./index.css";

export default function HomePage() {
  return (
    <Page>
      <div id="rootContainer">
        <OneForm />
      </div>
    </Page>
  );
}
