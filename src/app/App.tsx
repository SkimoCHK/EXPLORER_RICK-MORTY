import { ConfigProvider, theme } from "antd";
import { CharactersPage } from "../features/characters/pages/CharactersPage";
import { GlobalLoader } from "../core/loader/GlobalLoader";
import "../App.css";

function App() {
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: "#22c55e",
          colorBgBase: "#0b0f1a",
          colorText: "#e5e7eb",
          borderRadius: 10,
        },
      }}
    >
      <CharactersPage />
      <GlobalLoader />
    </ConfigProvider>
  );
}

export default App;
