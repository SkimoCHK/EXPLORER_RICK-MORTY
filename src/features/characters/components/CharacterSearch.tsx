import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useDebounce } from "../hooks/useDebounce";
import "../styles/characterSearch.css";

interface CharacterSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export const CharacterSearch = ({ value, onChange }: CharacterSearchProps) => {
  const [inputValue, setInputValue] = useState(value);
  const debouncedValue = useDebounce(inputValue, 500);

  useEffect(() => {
    if (debouncedValue !== value) {
      onChange(debouncedValue);
    }
  }, [debouncedValue]);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  return (
    <Input
      size="large"
      placeholder="Search character by name..."
      prefix={<SearchOutlined />}
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      allowClear
      className="rm-search"
    />
  );
};
