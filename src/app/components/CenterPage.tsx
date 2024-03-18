export const CenterPage = ({ children }: any) => {
  return (
    <div
      style={{
        display: "grid",
        justifyContent: "center",
      }}
    >
      {children}
    </div>
  );
};
