import { EmptyState, Page } from "@shopify/polaris";

export default function NotFound() {
  return (
    <Page>
      <EmptyState heading={"Not Found"}>
        <p>The resource you were looking for wasn't found.</p>
      </EmptyState>
    </Page>
  );
}
