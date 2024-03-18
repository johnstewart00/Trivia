"use client";

import styled from "styled-components";
import { Color } from "../styles/colors";

export const MuiBox = styled("div")<{ width?: string; color?: string }>`
  margin-top: 20px;
  margin-left: 20px;
  padding: 20px;
  box-shadow: 2px 2px 2px 2px;
  border-radius: 20px;
  background-color: ${(props) => props.color || Color.lightOrange};
  width: ${(props) => props.width || "500px"};
`;
