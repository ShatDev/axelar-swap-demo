//

import React, { useState, useEffect } from "react";
import { AutoComplete, Space, Divider } from "antd";
import { useLazyQuery } from "@apollo/client";
import { GET_PAIRS, GET_VOLUME } from "../../graphql/queries";
import Input from "../../common/Input";
import * as S from "./styles";
//
const GET_TOKENS = "https://tokens.coingecko.com/uniswap/all.json";

const Home = () => {
  const [tokens, setTokens] = useState([]);
  const [inputToken, setInputToken] = useState("");
  const [outputToken, setOutputToken] = useState("");
  const [formValues, setFormValues] = useState({});

  const handleChange = (event) => {
    event.persist();
    setFormValues((values) => ({
      ...values,
      [event.target.name]: event.target.value,
    }));
  };

  useEffect(() => {
    getTokens();
  }, []);

  const getTokens = async () => {
    try {
      let response = await fetch(GET_TOKENS);
      let data = await response.json();
      console.log("data ->", data);
      if (data && data.tokens) {
        setTokens(data.tokens);
      }
    } catch (error) {
      console.error("error", error);
    } finally {
    }
  };

  const [pairs, { data: pairsData }] = useLazyQuery(GET_PAIRS);
  //
  const [volume, { data: volumeData }] = useLazyQuery(GET_VOLUME);

  // Get Pair data
  const getPair = async () => {
    try {
      await pairs({ variables: { token0: inputToken, token1: outputToken } });
    } catch (error) {
      console.log("error", error);
    }
  };

  // Get Pair data
  const getVolume = async (pairAddress) => {
    try {
      await volume({ variables: { pairAddress: pairAddress } });
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    if (inputToken && outputToken) {
      getPair();
    }
  }, [inputToken, outputToken]);

  useEffect(() => {
    if (pairsData) {
      if (pairsData.pairs.length > 0) {
        getVolume(pairsData.pairs[0].id);
      }
    }
  }, [pairsData]);

  const searchResult = (type) => {
    const address = type === "input" ? outputToken : inputToken;
    const updateTokens = tokens.filter((tkn, idx) => tkn.address !== address);
    //
    return updateTokens.map((item, idx) => {
      return {
        key: item.address,
        value: item.name,
        label: (
          <S.SearchResult>
            <img src={item.logoURI} alt={item.logoURI} />
            <span>{item.name}</span>
            <span>({item.symbol})</span>
          </S.SearchResult>
        ),
      };
    });
  };

  const onSelect = (value, option, type) => {
    if (type === "input") {
      setInputToken(option.key);
    } else {
      setOutputToken(option.key);
    }
  };

  const tokenSymbol = (address) => {
    const token = tokens.find((tkn, idx) => tkn.address === address);
    if (token) {
      return token.symbol;
    } else {
      return "Token";
    }
  };

  return (
    <S.Content>
      <S.FormContainer>
        <h1>Swap</h1>
        <Divider />
        <Space direction="vertical" size={15}>
          <AutoComplete
            allowClear
            options={searchResult("input")}
            filterOption={(inputValue, option) => {
              return (
                option?.value
                  .toUpperCase()
                  .indexOf(inputValue.toUpperCase()) !== -1
              );
            }}
            onSelect={(value, option, type = "input") => {
              onSelect(value, option, type);
            }}
          >
            <S.InputField size="large" placeholder="Select a token" />
          </AutoComplete>

          <AutoComplete
            allowClear
            options={searchResult("output")}
            filterOption={(inputValue, option) => {
              return (
                option?.value
                  .toUpperCase()
                  .indexOf(inputValue.toUpperCase()) !== -1
              );
            }}
            onSelect={onSelect}
          >
            <S.InputField size="large" placeholder="Select a token" />
          </AutoComplete>
          <Input
            type="number"
            onChange={handleChange}
            name="inputAmount"
            min="1"
            placeholder="Input amount"
            value={formValues.inputAmount || ""}
          />
          <Input
            type="number"
            onChange={handleChange}
            name="outputAmount"
            min="1"
            placeholder="Output amount"
            value={formValues.outputAmount || ""}
          />
          {!!inputToken && !!outputToken && (
            <React.Fragment>
              <S.Pool>
                {pairsData && pairsData.pairs.length === 0 && (
                  <div className="token-data">
                    <span>No liquidity</span>
                  </div>
                )}
                {pairsData && pairsData.pairs.length > 0 && (
                  <div className="token-data">
                    <span>{`${tokenSymbol(inputToken)} = ${parseFloat(
                      pairsData.pairs[0].token0Price
                    ).toFixed(6)}`}</span>
                    <span>{`${tokenSymbol(outputToken)} = ${parseFloat(
                      pairsData.pairs[0].token1Price
                    ).toFixed(6)}`}</span>
                    {volumeData && (
                      <span>{`24/h Volume = ${volumeData.pairDayDatas[0].dailyVolumeUSD}`}</span>
                    )}
                  </div>
                )}
              </S.Pool>
              <S.Button>Approve</S.Button>
              <S.Button>Swap</S.Button>
            </React.Fragment>
          )}
        </Space>
      </S.FormContainer>
    </S.Content>
  );
};

export default Home;
