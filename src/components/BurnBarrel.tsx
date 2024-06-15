import React from "react";
import { FaFire } from "react-icons/fa";
import { FiTrash } from "react-icons/fi";

import { CardType } from "../types";

interface Props {
  setCards: React.Dispatch<React.SetStateAction<CardType[]>>;
}

export default function BurnBarrel({ setCards }: Props) {
  const [active, setActive] = React.useState(false);

  return (
    <div
      className={`mt-10 grid h-56 w-56 shrink-0 place-content-center rounded border text-3xl ${
        active
          ? "border-red-800 bg-red-800/20 text-red-500"
          : "border-neutral-500 bg-neutral-500/20 text-neutral-500"
      }`}
    >
      {active ? <FaFire className="animate-bounce" /> : <FiTrash />}
    </div>
  );
}
