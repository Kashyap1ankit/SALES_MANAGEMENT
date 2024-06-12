import { MouseEvent } from "react";

export default function Title({
  text,
  className,
  onClick,
}: {
  text: string;
  className?: string;
  onClick?: React.EventHandler<MouseEvent>;
}) {
  return (
    <div className={className} onClick={onClick}>
      <p>{text}</p>
    </div>
  );
}
