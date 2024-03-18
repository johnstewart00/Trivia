"use client";

import styled from "styled-components";

export const Paragraph = styled.p<{
  textcolor?: string;
  padding?: string;
  hovercolor?: string;
  marginRight?: string;
}>`
  color: ${(props) => props.textcolor || "white"};
  padding: ${(props) => props.padding || "0"};
  margin-right: ${(props) => props.marginRight || "0"};
  &:hover {
    color: ${(props) => props.hovercolor || null};
  }
`;
