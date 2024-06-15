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

const getIndicators = (column: ColumnType) => {
  return Array.from(document.querySelectorAll(`[data-column="${column}"]`));
};

const getNearestIndicator = (
  e: React.DragEvent<HTMLDivElement>,
  indicators: Element[]
) => {
  const DISTANCE_OFFSET = 50; // px

  const nearestElement = indicators.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = e.clientY - (box.top + DISTANCE_OFFSET);

      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child };
      } else {
        return closest;
      }
    },
    {
      offset: Number.NEGATIVE_INFINITY,
      element: indicators[indicators.length - 1],
    }
  );

  return nearestElement;
};

export default function Column({
  title,
  headingColor,
  column,
  cards,
  setCards,
}: Props) {
  const [active, setActive] = React.useState(false);

  const highlightIndicator = (e: React.DragEvent<HTMLDivElement>) => {
    const indicators = getIndicators(column);
    clearHighlights(indicators);
    const nearestIndicator = getNearestIndicator(e, indicators);
    nearestIndicator.element.style.opacity = "1";
  };

  const clearHighlights = (elements: Element[] = []) => {
    const indicators = elements.length ? elements : getIndicators(column);

    indicators.forEach((i) => {
      i.style.opacity = "0";
    });
  };

  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    card: CardType
  ) => {
    e.dataTransfer?.setData("cardId", card.id);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    highlightIndicator(e);
    setActive(true);
  };

  const handleDragLeave = () => {
    setActive(false);
    clearHighlights();
  };

  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    setActive(false);
    clearHighlights();

    // logic to move the card to new position
    const cardId = e.dataTransfer.getData("cardId");

    const indicators = getIndicators(column);
    const { element } = getNearestIndicator(e, indicators);

    const before = element.dataset.before || "-1";

    if (before !== cardId) {
      let newCards = [...cards];
      let cardToTransfer = newCards.find((c) => c.id === cardId);

      if (!cardToTransfer) return;

      cardToTransfer = { ...cardToTransfer, column };

      newCards = newCards.filter((c) => c.id !== cardId);

      const moveToBack = before === "-1";

      if (moveToBack) {
        newCards.push(cardToTransfer);
      } else {
        const insertAtIndex = newCards.findIndex((el) => el.id === before);
        if (insertAtIndex === undefined) return;

        newCards.splice(insertAtIndex, 0, cardToTransfer);
      }

      setCards(newCards);
    }
  };
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
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDragEnd}
        className={`h-full w-full transition-colors ${
          active ? "bg-neutral-800/50" : "bg-neutral-800/0"
        }`}
      >
        {filteredCards.map((card) => (
          <Card key={card.id} {...card} handleDragStart={handleDragStart} />
        ))}
        <DropIndicator beforeId={null} column={column} />
        <AddCard column={column} setCards={setCards} />
      </div>
    </div>
  );
}
