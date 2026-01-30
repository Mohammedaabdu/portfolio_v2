import type React from "react";

interface cardProps {
  children: React.ReactNode;
  className: string;
}

const Card = ({ children, className }: cardProps) => {
  return (
    <article className={`rounded-2xl bg-dark p-6 w-full ${className}`}>
      {children}
    </article>
  );
};

export default Card;
