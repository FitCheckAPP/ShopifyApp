import { EmptyState, Page } from "@shopify/polaris";
import { notFoundImage } from "../assets";

export default function NotFound() {
  return (
    <Page>
      <EmptyState heading={"Not Found"} image={notFoundImage}>
        <p>The resource you were looking for wasn't found.</p>
      </EmptyState>
    </Page>
  );
}
