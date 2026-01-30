import type React from "react";
import type { Ref } from "react";

interface cardProps {
  ref?: Ref<HTMLElement>;
  children: React.ReactNode;
  className: string;
}

const Card = ({ ref, children, className }: cardProps) => {
  return (
    <article
      ref={ref}
      className={`rounded-2xl bg-dark p-6 w-full ${className}`}
    >
      {children}
    </article>
  );
};

export default Card;
