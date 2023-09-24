import { logoImage } from "../assets";

import { AiFillDollarCircle, AiOutlineShoppingCart } from "react-icons/ai";
import { RxAvatar } from "react-icons/rx";

import "./main.css";
import { useState } from "react";

import { LegacyCard, DataTable } from "@shopify/polaris";

export function Dashboard() {
  const [revenue, setRevenue] = useState(0);
  const [orders, setOrders] = useState(0);
  const [shopVisits, setShopVisits] = useState(0);

  const [orderInfo, setOrderInfo] = useState([
    ["Label", "Label", 1233451943, 250, "$4,290,876"],
  ]);

  return (
    <div className="mainContainer">
      <img
        src={logoImage}
        style={{
          width: "20vw",
          height: "15vh",
          padding: "1.3rem",
          marginBottom: "2rem",
          backgroundColor: "white",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.5)",
        }}
      />
      <h1 style={{ fontSize: "3rem", color: "#007F80", paddingBottom: "2rem" }}>
        Dashboard
      </h1>

      <div className="infoContainer" style={{ paddingBotom: "2rem" }}>
        <div className="infoBlock" style={{ fontSize: "1.5rem" }}>
          <div
            className="logoText"
            style={{ fontSize: "1.5rem", color: "#007F80" }}
          >
            <AiFillDollarCircle />
            Revenue
          </div>
          <br />
          {"$" + revenue}
        </div>
        <div className="infoBlock" style={{ fontSize: "1.5rem" }}>
          <div
            className="logoText"
            style={{ fontSize: "1.5rem", color: "#007F80" }}
          >
            <AiOutlineShoppingCart />
            Total Orders
          </div>
          <br />
          {orders}
        </div>
        <div className="infoBlock" style={{ fontSize: "1.5rem" }}>
          <div
            className="logoText"
            style={{ fontSize: "1.5rem", color: "#007F80" }}
          >
            <RxAvatar />
            Shop Visits
          </div>
          <br />
          {shopVisits}
        </div>
      </div>
      <div style={{ width: "65vw", fontWeight: "lighter" }}>
        <LegacyCard title="Order Information">
          <DataTable
            columnContentTypes={["text", "text", "numeric", "numeric", "text"]}
            headings={[
              "Product",
              "Variant",
              "SKU Number",
              "Units Sold",
              "Total",
            ]}
            totals={["", "", "", 255, "$155,830.00"]}
            rows={orderInfo}
            sortable={[false, false, true, true, false]}
          />
        </LegacyCard>
      </div>
    </div>
  );
}
