import { logoImage } from "../assets";

import { AiFillDollarCircle, AiOutlineShoppingCart } from "react-icons/ai";
import { RxAvatar } from "react-icons/rx";

import "./main.css";
import { useState } from "react";

export function Dashboard() {
  const [revenue, setRevenue] = useState(0);
  const [orders, setOrders] = useState(0);
  const [shopVisits, setShopVisits] = useState(0);

  const [productList, setProductList] = useState([
    { name: "Jeans", variant: "clothing", SKUnum: 0, sold: 10, total: 376 },
    { name: "Shirts", variant: "", SKUnum: 34857, sold: 13, total: 2 },
  ]);

  const [totalSold, setTotalSold] = useState(0);
  const [total, setTotal] = useState(0);

  const handleSubmit = () => {
    fetch();
  };

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
      {/* <h2
        style={{ fontSize: "1rem", color: "#007F80", paddingBottom: ".7rem" }}
      >
        Monitor your sales performance
      </h2> */}

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

      <div className="orderContainer">
        <div className="productList">
          <div className="row">
            <div>Products</div>
            <div>Variant</div>
            <div>SKU Number</div>
            <div>Units sold</div>
            <div>Total</div>
          </div>
          <div className="row" style={{ backgroundColor: "#ECECEC" }}>
            <div>Totals</div>
            <div className="totalInfo" style={{ width: "40%" }}>
              <div style={{ width: "20%" }}>{totalSold}</div>
              <div style={{ width: "20%" }}>{"$ " + total}</div>
            </div>
          </div>
          {productList.map((element, index) => {
            return (
              <div key={index} className="row">
                <div>{element.name}</div>
                <div>{element.variant}</div>
                <div>{element.SKUnum}</div>
                <div>{element.sold}</div>
                <div>{element.total}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
