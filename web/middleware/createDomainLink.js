import express from "express";
import shopify from "../shopify.js";

export default function useCreateDomainLink(app) {
  app.use(express.json());

  app.get(
    "/api/domain-link",
    shopify.validateAuthenticatedSession(),
    async (req, res) => {
      console.log("Made it here");

      const client = new shopify.clients.Rest({
        session: res.locals.shopify.session,
      });
      const details = await client.get({
        path: "shop",
      });

      res.status(200).send({ details });
    }
  );
}
