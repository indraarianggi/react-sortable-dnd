import { ColumnType } from "../types";
import DropIndicator from "./DropIndicator";

interface Props {
  id: string;
  title: string;
  column: ColumnType;
}

export default function Card({ id, title, column }: Props) {
  return (
    <>
      <DropIndicator beforeId={id} column={column} />
      <div
        draggable={true}
        className="cursor-grap rounded border border-neutral-700 bg-neutral-800 p-3 active:cursor-grabbing"
      >
        <p className="text-sm text-neutral-100">{title}</p>
      </div>
    </>
  );
}
