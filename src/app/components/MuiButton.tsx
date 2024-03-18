"use client";
import { Button } from "@mui/material";
import styled from "styled-components";
import { Color } from "../styles/colors";

export const MuiButton = styled(Button)<{
  color?: string;
  background_color?: string;
}>`
  margin: 15px;
  background-color: ${(props) => props.background_color || Color.lightOrange};
  color: ${(props) => props.color || Color.black};
  border-radius: 10px;
  &:hover {
    background-color: ${Color.turquoiseGreen};
    color: ${Color.white};
  }
`;
