import styled from "styled-components";

export const Container = styled.div`
  display: inline-block;
  width: 100%;
  /* padding: 10px 5px; */
`;

export const Input = styled.input`
  width: 100%;
  outline: none;
  font-size: 0.875rem;
  border: 1px solid #e1e1ef;
  padding: 1.3rem 1.25rem;
  transition: border-color 0.3s ease-in;
  border-radius: 4px;
  box-shadow: 0 2px 4px 0 rgb(10 9 50 / 11%);
  color: #000;

  &:focus,
  &:hover {
    border-color: #40a9ff;
  }
`;

export const Span = styled.span`
  display: block;
  color: red;
  margin-top: -4px;
`;
