// @ts-check
import { join } from "path";
import { readFileSync } from "fs";
import express from "express";
import serveStatic from "serve-static";

import shopify from "./shopify.js";
import GDPRWebhookHandlers from "./gdpr.js";

import axios from "axios";

const PORT = parseInt(
  process.env.BACKEND_PORT || process.env.PORT || "3000",
  10
);

const STATIC_PATH =
  process.env.NODE_ENV === "production"
    ? `${process.cwd()}/frontend/dist`
    : `${process.cwd()}/frontend/`;

const app = express();

// Set up Shopify authentication and webhook handling
app.get(shopify.config.auth.path, shopify.auth.begin());
app.get(
  shopify.config.auth.callbackPath,
  shopify.auth.callback(),
  shopify.redirectToShopifyOrAppRoot()
);
app.post(
  shopify.config.webhooks.path,
  shopify.processWebhooks({ webhookHandlers: GDPRWebhookHandlers })
);

// If you are adding routes outside of the /api path, remember to
// also add a proxy rule for them in web/frontend/vite.config.js

// app.use("/api/*", shopify.validateAuthenticatedSession());

app.use(express.json());

// ! Routes here
app.get("/api/bulk", async (_req, res) => {
  try {
    const session = res.locals.shopify.session;
    const client = new shopify.api.clients.Graphql({ session });

    const queryString = `{mutation {
      bulkOperationRunQuery(
       query: """
        {
          products {
            edges {
              node {
                id
            createdAt
            updatedAt
            title
            handle
            descriptionHtml
            productType
              }
            }
          }
        }
        """
      ) {
        bulkOperation {
          id
          status
        }
        userErrors {
          field
          message
        }
      }
    }}`;

    const webhookInit = `mutation {
      webhookSubscriptionCreate(
        topic: BULK_OPERATIONS_FINISH
        webhookSubscription: {
          format: JSON,
          callbackUrl: "https://12345.ngrok.io/"}
      ) {
        userErrors {
          field
          message
        }
        webhookSubscription {
          id
        }
      }
    }
    `;

    const data = await client.query({ data: queryString });

    const webhook = await client.query({ data: webhookInit });

    res.status(200).send(data);
  } catch (err) {
    res.status(500).send(err);
  }
});
app.post("/api/initInfo/store", async (_req, res) => {
  const data = _req.body;

  axios
    .post("http://localhost:3000/api/brands/application/form/storeInfo", data)
    .then((response) => console.log(response.data))
    .catch((error) => console.log(error));
});
app.post("/api/initInfo/legal", async (_req, res) => {
  const data = _req.body;

  axios
    .post("http://localhost:3000/api/brands/application/form/legalInfo", data)
    .then((response) => console.log(response.data))
    .catch((error) => console.log(error));
});
app.post("/api/initInfo/policy", async (_req, res) => {
  const data = _req.body;

  axios
    .post("http://localhost:3000/api/brands/application/form/policyInfo", data)
    .then((response) => console.log(response.data))
    .catch((error) => console.log(error));
});
// ! Checks if the email exists
app.post("/api/emailExists", async (_req, res) => {
  const data = _req.body;

  axios
    .post("http://localhost:3000/api/brands/application/form/emailExists", data)
    .then((response) => res.status(response.status).send())
    .catch((error) => console.log(error));
});
// ! Email verificaiton
app.post("/api/emailVerif", async (_req, res) => {
  const data = _req.body;

  axios
    .post("http://localhost:3000/api/brands/application/form/emailVerif", data)
    .then((response) => res.status(response.status).send())
    .catch((error) => console.log(error));
});

app.use(shopify.cspHeaders());
app.use(serveStatic(STATIC_PATH, { index: false }));

app.use("/*", shopify.ensureInstalledOnShop(), async (_req, res, _next) => {
  return res
    .status(200)
    .set("Content-Type", "text/html")
    .send(readFileSync(join(STATIC_PATH, "index.html")));
});

app.listen(PORT);
