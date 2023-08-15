import { Page } from "@shopify/polaris";

import { LoginForm } from "../components";

import "./index.css";

export default function HomePage() {
  return (
    <Page>
      <div id="rootContainer">
        <LoginForm />
      </div>
    </Page>
  );
}
