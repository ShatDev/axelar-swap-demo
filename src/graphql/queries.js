import { gql } from "@apollo/client";

export const GET_PAIRS = gql`
  query post($token0: String!, $token1: String!) {
    pairs(where: { token0: $token0, token1: $token1 }) {
      id
      token0Price
      token1Price
    }
  }
`;

export const GET_VOLUME = gql`
  query post($pairAddress: String!) {
    pairDayDatas(
      where: { pairAddress_contains: $pairAddress }
      orderBy: date
      orderDirection: desc
      first: 1
    ) {
      dailyVolumeUSD
    }
  }
`;
