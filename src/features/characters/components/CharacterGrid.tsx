import { Card, Image, Typography, Tag } from "antd";
import type { Character } from "../models/Character";
import "../styles/characterGrid.css";

const { Text } = Typography;

interface CharacterGridProps {
  characters: Character[];
  onViewDetail: (id: number) => void;
}

export const CharacterGrid = ({
  characters,
  onViewDetail,
}: CharacterGridProps) => {
  const statusColor = (status: string) => {
    if (status === "Alive") return "green";
    if (status === "Dead") return "red";
    return "default";
  };

  if (characters.length === 0) {
    return <div className="empty-state">Personajes no encontrados</div>;
  }

  return (
    <div className="character-grid">
      {characters.map((character) => (
        <Card
          key={character.id}
          className="character-card"
          role="button"
          tabIndex={0}
          onClick={() => onViewDetail(character.id)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              onViewDetail(character.id);
            }
          }}
        >
          <div className="card-image">
            <Image src={character.image} alt={character.name} preview={false} />
          </div>

          <Text strong className="character-name">
            {character.name}
          </Text>

          <Text italic className="character-gender">
            {character.gender}
          </Text>

          <Tag color={statusColor(character.status)} className="status-tag">
            {character.status}
          </Tag>


        </Card>
      ))}
    </div>
  );
};
