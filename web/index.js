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
app.use(express.json());

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

app.use(express.json());

// ! Routes here
// ! Form Routes

// ! Check if email exists
app.post(
  "/api/emailExists",
  shopify.validateAuthenticatedSession(),
  async (_req, res) => {
    const data = _req.body;

    axios
      .post(
        "http://localhost:3000/api/brands/shopify/auth/emailExists",
        JSON.stringify(data)
      )
      .then((response) => {
        return res.status(response.status).send();
      })
      .catch((error) => {
        if (error.response.status == 401) {
          return res.status(241).send();
        } else {
          return res.status(250).send();
        }
      });
  }
);

// ! Email Verification
app.post(
  "/api/emailVerif",
  shopify.validateAuthenticatedSession(),
  async (_req, res) => {
    const shop = await shopify.api.rest.Shop.all({
      session: res.locals.shopify.session,
    });

    const domain = shop.data[0].domain;

    const email = _req.body;

    const data = { email: email.email, domain: domain };
    axios
      .post(
        "http://localhost:3000/api/brands/shopify/auth/emailVerif",
        JSON.stringify(data)
      )
      .then((response) => {
        return res.status(response.status).send();
      })
      .catch((error) => {
        if (error.response.status == 401) {
          return res.status(241).send();
        } else {
          return res.status(250).send();
        }
      });
  }
);

// ! Get if the token's verified or not
app.post(
  "/api/checkEmailVerify",
  shopify.validateAuthenticatedSession(),
  async (_req, res) => {
    const data = _req.body;

    axios
      .post(
        "http://localhost:3000/api/brands/shopify/auth/checkEmailVerify",
        JSON.stringify(data)
      )
      .then((response) => {
        return res
          .json({
            status: response.status,
            appstate: response.data.appstate,
          })
          .send();
      })
      .catch((error) => {
        if (error.response.status == 401) {
          return res.json({ status: 241 }).send();
        } else {
          return res.json({ status: 250 }).send();
        }
      });
  }
);

app.use(shopify.cspHeaders());
app.use(serveStatic(STATIC_PATH, { index: false }));

app.use("/*", shopify.ensureInstalledOnShop(), async (_req, res, _next) => {
  return res
    .status(200)
    .set("Content-Type", "text/html")
    .send(readFileSync(join(STATIC_PATH, "index.html")));
});

app.listen(PORT);
