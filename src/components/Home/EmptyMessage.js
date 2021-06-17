import React from "react";
import * as S from "./styles";

const EmptyMessage = ({ message }) => {
  return (
    <S.EmptyList>
      <p>{message}</p>
    </S.EmptyList>
  );
};

export default EmptyMessage;
