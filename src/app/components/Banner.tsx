import { Color } from "../styles/colors";
import { MuiBox } from "./Box";
import { Paragraph } from "./Paragraph";

export const Banner = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <MuiBox color={Color.turquoiseGreen} width="300px">
        <Paragraph>Welcome to the trivia game</Paragraph>
      </MuiBox>
      <MuiBox color={Color.turquoiseGreen} width="300px">
        <Paragraph>Answer all 5 questions correctly to win big</Paragraph>
      </MuiBox>
    </div>
  );
};
