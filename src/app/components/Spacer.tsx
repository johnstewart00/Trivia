export enum SpacerSizes {
  small = "10px",
  medium = "50px",
  large = "100px",
}

export default function Spacer({ size }: { size: SpacerSizes }) {
  return <div style={{ margin: size }} />;
}
