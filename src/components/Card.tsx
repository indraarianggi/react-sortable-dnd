import React from "react";
import { motion } from "framer-motion";

import { CardType, ColumnType } from "../types";
import DropIndicator from "./DropIndicator";

interface Props {
  id: string;
  title: string;
  column: ColumnType;
  handleDragStart: (e: React.DragEvent<HTMLDivElement>, card: CardType) => void;
}

export default function Card({ id, title, column, handleDragStart }: Props) {
  return (
    <>
      <DropIndicator beforeId={id} column={column} />
      <motion.div
        layout
        layoutId={id}
        draggable={true}
        onDragStart={(e) => handleDragStart(e, { id, title, column })}
        className="cursor-grap rounded border border-neutral-700 bg-neutral-800 p-3 active:cursor-grabbing"
      >
        <p className="text-sm text-neutral-100">{title}</p>
      </motion.div>
    </>
  );
}
