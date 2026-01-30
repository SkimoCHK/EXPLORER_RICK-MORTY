import { Empty, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import "../features/characters/styles/emptyState.css";

interface EmptyStateProps {
  description?: string;
  onAction?: () => void;
  actionLabel?: string;
}

export const EmptyState = ({
  description = "No se encontraron personajes",
  onAction,
  actionLabel = "Crear nuevo",
}: EmptyStateProps) => {
  return (
    <div className="rm-empty">
      <Empty description={description} image={Empty.PRESENTED_IMAGE_SIMPLE} />

      {onAction && (
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={onAction}
          className="rm-empty-btn"
        >
          {actionLabel}
        </Button>
      )}
    </div>
  );
};
