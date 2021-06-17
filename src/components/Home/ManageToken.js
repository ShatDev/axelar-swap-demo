import React, { useState, useEffect } from "react";
import { AutoComplete } from "antd";
//
import Input from "../../common/Input";
import TokenLogo from "../../token-logo.png";
import * as S from "./styles";

import { v4 as uuidv4 } from "uuid";

// const address = "0x5758799e248a0cdba9c9f2210ef9d377c105a7d9";

const originalAddress = "0x8b878Ee3B32b0dFeA6142F5ca1EfebA8c5dFEc7e";

const GET_TOKENS = `https://api.ethplorer.io/getAddressInfo/${originalAddress}?apiKey=EK-5sb4j-hi4gJjs-oCSyY`;

const CreateToken = ({ onClick }) => {
  const [tokens, setTokens] = useState([]);
  const [formValues, setFormValues] = useState({});

  useEffect(() => {
    getTokens();
  }, []);

  const getTokens = async () => {
    try {
      let response = await fetch(GET_TOKENS);
      let data = await response.json();
      if (data && data.tokens) {
        const filterOutWithDecimals = data.tokens.filter(
          (item) => item.tokenInfo.decimals !== 0
        );
        const withTokenIds = filterOutWithDecimals.map((item, id) => {
          return {
            ...item,
            lock: false,
            id: uuidv4(),
          };
        });
        setTokens(withTokenIds);
      }
    } catch (error) {
      console.error("error", error);
    } finally {
    }
  };

  const searchResult = () => {
    return tokens.map((item, idx) => {
      let src;
      const image = item.tokenInfo.image;
      if (image) {
        src = "https://ethplorer.io/" + item.tokenInfo.image;
      } else {
        src = TokenLogo;
      }

      return {
        key: item.id,
        value: item.tokenInfo.name,
        label: (
          <S.SearchResult>
            <div className="left-side">
              <img src={src} alt={src} />
              <div>
                <span>{item.tokenInfo.name}</span>
                <p>{item.balance}</p>
              </div>
            </div>
            <span>{item.tokenInfo.symbol}</span>
          </S.SearchResult>
        ),
      };
    });
  };

  const onSelect = (value, option) => {};

  const handleChange = (event) => {
    event.persist();
    setFormValues((values) => ({
      ...values,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <S.CreateToken>
      <AutoComplete
        dropdownMatchSelectWidth={252}
        style={{ width: "100%" }}
        allowClear
        options={searchResult()}
        filterOption={(inputValue, option) => {
          return (
            option?.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
          );
        }}
        onSelect={onSelect}
      >
        <S.InputField size="large" placeholder="Search for token to add" />
      </AutoComplete>

      <S.TokenListContainer>
        <Input
          type="number"
          onChange={handleChange}
          name="amount"
          placeholder="Amount"
          value={formValues.amount || ""}
        />
        <Input
          onChange={handleChange}
          type="text"
          name="receiver"
          placeholder="Receiver"
          value={formValues.receiver || ""}
        />

        <button className="submit-btn">Mint</button>
      </S.TokenListContainer>
    </S.CreateToken>
  );
};

export default CreateToken;
