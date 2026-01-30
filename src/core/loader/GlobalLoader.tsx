import { Atom } from "react-loading-indicators";
import { useLoading } from "./LoadingContext";

export const GlobalLoader = () => {
  const { loading } = useLoading();

  if (!loading) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0,0,0,0.6)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
      }}
    >
      <Atom
        color="#32cd32"
        size="large"
        text="Loading..."
        textColor="#ffffff"
      />
    </div>
  );
};
