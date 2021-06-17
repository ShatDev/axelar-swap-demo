import React from "react";
import { Slider, Row, Col } from "antd";

import TokenLogo from "../../token-logo.png";

import * as S from "./styles";

const Item = ({ onRemoveItem, arrayLength, onChange, onLockItem, item }) => {
  let src;
  const image = item.tokenInfo.image;
  if (image) {
    src = "https://ethplorer.io/" + item.tokenInfo.image;
  } else {
    src = TokenLogo;
  }
  return (
    <S.ListItem>
      <S.ListTopSection>
        <Row>
          <Col span={15}>
            <div className="token-name">
              <img src={src} alt={src} />
              <div className="token-info">
                <p>{item.tokenInfo.name}</p>
                <span>{item.balance}</span>
              </div>
            </div>
          </Col>
          <Col span={5}>
            <p className="value-percentage">{`${(item.inputRange * 100).toFixed(
              2
            )} %`}</p>
          </Col>
          <Col span={4}>
            <div className="action-button">
              <div onClick={() => onLockItem(item)} className="lock-button">
                <img
                  src={
                    item.lock
                      ? "https://www.tokensets.com/static/media/lock-locked.19c50bba.svg"
                      : "https://www.tokensets.com/static/media/lock-unlocked.902eb64d.svg"
                  }
                  alt="Lock logo"
                ></img>
              </div>
              <button onClick={() => onRemoveItem(item)} className="button">
                Remove
              </button>
            </div>
          </Col>
        </Row>
      </S.ListTopSection>
      <Row>
        <Col span={24}>
          <Slider
            min={0}
            max={1}
            disabled={arrayLength === 1 || item.lock}
            onChange={(val) => onChange(val, item)}
            step="0.01"
            value={item.inputRange}
          />
        </Col>
      </Row>
    </S.ListItem>
  );
};

export default Item;
