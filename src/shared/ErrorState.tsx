import { Button } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import "../features/characters/styles/errorState.css";

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export const ErrorState = ({
  message = "Error en la conexión",
  onRetry,
}: ErrorStateProps) => {
  return (
    <div className="rm-error">
      <ExclamationCircleOutlined className="rm-error-icon" />

      <div className="rm-error-content">
        <h3>Error del sistema</h3>
        <p>{message}</p>
      </div>

      {onRetry && (
        <Button
          danger
          type="primary"
          onClick={onRetry}
          className="rm-error-btn"
        >
          Reintentar
        </Button>
      )}
    </div>
  );
};
