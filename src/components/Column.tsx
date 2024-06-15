import React from "react";

import { CardType, ColumnType } from "../types";
import Card from "./Card";
import DropIndicator from "./DropIndicator";
import AddCard from "./AddCard";

interface Props {
  title: string;
  headingColor: string;
  column: ColumnType;
  cards: CardType[];
  setCards: React.Dispatch<React.SetStateAction<CardType[]>>;
}

export default function Column({
  title,
  headingColor,
  column,
  cards,
  setCards,
}: Props) {
  const [active, setActive] = React.useState(false);

  const filteredCards = cards.filter((card) => card.column === column);

  return (
    <div className="w-56 shrink-0">
      <div className="mb-3 flex items-center justify-between">
        <h3 className={`font-medium ${headingColor}`}>{title}</h3>
        <span className="rounded text-sm text-neutral-400">
          {filteredCards.length}
        </span>
      </div>
      <div
        className={`h-full w-full transition-colors ${
          active ? "bg-neutral-800/50" : "bg-neutral-800/0"
        }`}
      >
        {filteredCards.map((card) => (
          <Card key={card.id} {...card} />
        ))}
        <DropIndicator beforeId={null} column={column} />
        <AddCard column={column} setCards={setCards} />
      </div>
    </div>
  );
}
