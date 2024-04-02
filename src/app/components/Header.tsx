import { MuiButton } from "./MuiButton";

export default function Header({ handleLogOut }: any) {
  return (
    <div
      style={{
        position: "fixed",
        top: "20px", // Adjust top distance from the top of the screen
        right: "20px", // Adjust right distance from the right of the screen
        margin: "auto", // Center horizontally
      }}
    >
      <MuiButton onClick={handleLogOut}>Sign Out</MuiButton>
    </div>
  );
}
