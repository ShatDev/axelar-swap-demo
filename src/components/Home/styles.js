import styled from "styled-components";
import { Input } from "antd";

export const FormContainer = styled.div`
  margin-bottom: 2rem;
  h1 {
    font-size: 45px;
    font-weight: 600;
    color: #1d144f;
    letter-spacing: -1px;
    text-align: center;
    margin-top: 1rem;
    margin-bottom: 2rem;
  }
`;

export const Content = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
`;

export const EmptyList = styled.div`
  display: flex;
  margin-top: 3rem;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 150px;
  border-radius: 4px;
  border: 1px dashed #dad7e2;

  p {
    font-size: 1rem;
    color: #9b97b3;
  }
`;

export const InputField = styled(Input)`
  min-width: 600px;
  /* width: 100%; */
  padding-top: 20px;
  padding-bottom: 15px;
  height: 76px;
  border: 1px solid #e1e1ef;
  border-radius: 4px;
  box-shadow: 0 2px 4px 0 rgb(10 9 50 / 11%);
  background: url(https://www.tokensets.com/static/media/magnifying-glass-active.84630ed9.svg)
    no-repeat scroll 20px 20px;
  background-position: 29px 30px;
  padding-left: 60px;
`;

export const SearchResult = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
  font-size: 1rem;
  height: 100%;
  span {
    margin-left: 0.5rem;
    color: #9b97b3;
    font-weight: 400;
  }

  p {
    margin-left: 0.5rem;
  }
`;

export const Pool = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  /* padding: 0.5rem 0; */

  .token-data {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
  span {
    margin-bottom: 0.2rem;
    font-size: 1rem;
    font-weight: 500;
    color: #1d144f;
  }
`;

export const Button = styled.div`
  cursor: pointer;
  background: #2d2ce5;
  border: 2px solid transparent;
  padding: 15px 20px;
  -webkit-transition: 0.2s;
  -moz-transition: 0.2s;
  transition: 0.2s;
  color: #fff;
  font-size: 1rem;
  font-weight: 600;
  width: 100%;
  height: 60px;
  border-radius: 5px;
  text-align: center;
`;
