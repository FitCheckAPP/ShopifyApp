import { Page } from "@shopify/polaris";

import { Dashboard } from "../components";

import "./index.css";

export default function DashboardPage() {
  return (
    <Page>
      <div id="rootContainer">
        <Dashboard />
      </div>
    </Page>
  );
}
