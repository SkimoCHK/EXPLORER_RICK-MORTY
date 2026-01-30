import { Pagination } from "antd";

interface CharacterPaginationProps {
  current: number;
  totalCount: number;
  onChange: (page: number) => void;
}

export const CharacterPagination = ({
  current,
  totalCount,
  onChange,
}: CharacterPaginationProps) => {
  if (totalCount <= 20) return null;

  return (
    <div style={{ marginTop: 24, display: "flex", justifyContent: "center" }}>
      <Pagination
        current={current}
        total={totalCount}
        pageSize={20}
        onChange={onChange}
        showSizeChanger={false}
      />
    </div>
  );
};
