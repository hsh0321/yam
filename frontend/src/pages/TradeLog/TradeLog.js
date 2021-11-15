import axios from "../../api/axios";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";

import "./TradeLog.css";
import noImage from "../../assets/image/no-image.jpg";

const TradeLog = ({ history }) => {
  const [product, setProduct] = useState([]);

  useEffect(() => {
    const token = JSON.parse(window.localStorage.getItem("token"));
    axios
      .get(`/user/item/take`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        setProduct(response.data);
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const goToTradeDetail = (contractId) => {
    history.push(`/tradedetail/${contractId}`);
  };

  return product.map((item) => {
    return (
      <div>
        <div className="wish-item-list">
          <img src={item.itemImage == null ? noImage : item.itemImage} className="wish-item-icon" alt="item-image"></img>
          <div className="wish-item-vertical">
            <div className="wish-item-title">
              <Link to={`/detail/${item.dealId}`}>{item.itemName}</Link>
            </div>
            <span>{item.itemAddress}</span>
            <div className="wish-item-price">{item.dealTotalPrice} 원</div>
          </div>
          <div>
            <button className="trade-log-button" onClick={() => goToTradeDetail(item.contractId)}>
              상세보기
            </button>
          </div>
        </div>
      </div>
    );
  });
};

export default TradeLog;
