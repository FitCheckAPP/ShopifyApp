import { Page } from "@shopify/polaris";

import { Dashboard } from "../components";

import "./index.css";

export default function HomePage() {
  return (
    <Page>
      <div id="rootContainer">
        <Dashboard />
      </div>
    </Page>
  );
}
