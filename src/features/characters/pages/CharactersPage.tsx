import { useEffect, useState } from "react";
import type { Character } from "../models/Character";
import { charactersService } from "../services/characters.service";
import { CharacterSearch } from "../components/CharacterSearch";
import { CharacterDetailModal } from "../components/CharacterDetailModal";
import { CharacterPagination } from "../components/CharacterPagination";
import { useLoading } from "../../../core/loader/LoadingContext";
import { EmptyState } from "../../../shared/EmptyState";
import { Card, Space, Typography } from "antd";
import "../../characters/styles/characters.css";
import { CharacterGrid } from "../components/CharacterGrid";

const { Title, Text } = Typography;

export const CharactersPage = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [selectedCharacterId, setSelectedCharacterId] = useState<number | null>(
    null,
  );
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [search, setSearch] = useState("");
  const [error, setError] = useState<string | null>(null);

  const { show, hide } = useLoading();

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        show();
        setError(null);

        const response = await charactersService.getCharacters({
          page,
          name: search || undefined,
        });

        setTotalCount(response.info.count);
        setCharacters(response.results);
      } catch {
        setError("Error al cargar los personajes");
      } finally {
        hide();
      }
    };

    fetchCharacters();
  }, [page, search]);
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [page, search]);

  return (
    <div className="page">
      <div className="layout">
        <Card className="container">
          <Space direction="vertical" size="large" style={{ width: "100%" }}>
            <div className="header">
              <Title level={2} style={{ margin: 0 }}>
                Rick & Morty Explorer
              </Title>
            </div>

            <div className="search-wrapper">
              <CharacterSearch
                value={search}
                onChange={(value: string) => {
                  setPage(1);
                  setSearch(value);

                  if (!value.trim()) return;

                  setSearchHistory((prev) => {
                    const updated = [value, ...prev.filter((v) => v !== value)];
                    return updated.slice(0, 10);
                  });
                }}
              />
            </div>

            {(error || characters.length === 0) && (
              <EmptyState description="No se encontraron personajes" />
            )}

            {!error && characters.length > 0 && (
              <>
                <CharacterGrid
                  characters={characters}
                  onViewDetail={(id) => {
                    setSelectedCharacterId(id);
                    setIsModalOpen(true);
                  }}
                />

                <CharacterPagination
                  current={page}
                  totalCount={totalCount}
                  onChange={setPage}
                />
              </>
            )}

            <CharacterDetailModal
              open={isModalOpen}
              characterId={selectedCharacterId}
              onClose={() => {
                setIsModalOpen(false);
                setSelectedCharacterId(null);
              }}
            />
          </Space>
        </Card>
      </div>
    </div>
  );
};
