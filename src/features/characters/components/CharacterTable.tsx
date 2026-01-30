import { Table, Button, Image, Typography } from "antd";
import type { ColumnsType } from "antd/es/table";
import type { Character } from "../models/Character";
import { formatDate } from "../../../utils/formatDate";
import { Tag } from "antd";
import './../styles/characterTable.css'

interface CharacterTableProps {
  characters: Character[];
  onViewDetail: (id: number) => void;
}

const statusColor = (status: string) => {
  if (status === "Alive") return "green";
  if (status === "Dead") return "red";
  return "default";
};

export const CharacterTable = ({
  characters,
  onViewDetail,
}: CharacterTableProps) => {
  const columns: ColumnsType<Character> = [
    {
      title: "Foto",
      dataIndex: "image",
      key: "image",
      render: (image: string) => <Image width={50} src={image} />,
    },
    {
      title: "Nombre",
      dataIndex: "name",
      key: "name",
      render: (name: string) => (
        <Typography.Text strong>{name}</Typography.Text>
      ),
    },
    {
      title: "Género",
      dataIndex: "gender",
      key: "gender",
      render: (gender: string) => (
        <Typography.Text italic>{gender}</Typography.Text>
      ),
    },
    {
      title: "Estatus",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Tag color={statusColor(status)}>{status}</Tag>
      ),
    },
    {
      title: "Creado",
      dataIndex: "created",
      key: "created",
      render: (date: string) => formatDate(date),
    },
    {
      title: "Acciones",
      key: "actions",
      render: (_, record) => (
        <Button type="link" onClick={() => onViewDetail(record.id)}>
          Ver detalle
        </Button>
      ),
    },
  ];

  return (
    <Table
      rowKey="id"
      columns={columns}
      dataSource={characters}
      pagination={false}
      className="rm-table"
    />
  );
};
