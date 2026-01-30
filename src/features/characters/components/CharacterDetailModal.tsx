import { Modal, Image, Alert, Button, Tag } from "antd";
import { useEffect, useState } from "react";
import type { Character } from "../models/Character";
import { charactersService } from "../services/characters.service";
import { formatDate } from "../../../utils/formatDate";
import { useLoading } from "../../../core/loader/LoadingContext";
import "../styles/detailModal.css";

interface CharacterDetailModalProps {
  open: boolean;
  characterId: number | null;
  onClose: () => void;
}

export const CharacterDetailModal = ({
  open,
  characterId,
  onClose,
}: CharacterDetailModalProps) => {
  const [character, setCharacter] = useState<Character | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { show, hide } = useLoading();

  useEffect(() => {
    if (!open || !characterId) return;

    const fetchCharacter = async () => {
      try {
        show();
        setError(null);
        const data = await charactersService.getCharacterById(characterId);
        setCharacter(data);
      } catch {
        setError("Error al cargar al personaje");
      } finally {
        hide();
      }
    };

    fetchCharacter();
  }, [open, characterId]);

  const statusColor = (status: string) => {
    if (status === "Alive") return "green";
    if (status === "Dead") return "red";
    return "default";
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      centered
      destroyOnClose
      width={620}
      closable={false}
      className="rm-modal"
    >
      {error && <Alert type="error" message={error} />}

      {!error && character && (
        <>
     
          <div className="rm-modal-header">
            <span>Character</span>
            <Button type="text" onClick={onClose} className="close-btn">
              ✕
            </Button>
          </div>

      
          <div className="scan-image">
            <Image src={character.image} preview={false} />
          </div>

          <h2 className="character-name">{character.name}</h2>

          <div className="status-row">
            <Tag color={statusColor(character.status)} className="status-tag">
              {character.status}
            </Tag>
          </div>

          <div className="hud">
            <div>
              <span>Species</span>
              <strong>{character.species}</strong>
            </div>

            <div>
              <span>Gender</span>
              <strong>{character.gender}</strong>
            </div>

            <div>
              <span>Origin</span>
              <strong>{character.origin.name}</strong>
            </div>

            <div>
              <span>Created</span>
              <strong>{formatDate(character.created)}</strong>
            </div>
          </div>
        </>
      )}
    </Modal>
  );
};
