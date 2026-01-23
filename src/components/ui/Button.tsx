interface buttonProps {
  children: React.ReactNode;
  className?: string;
}
const Button = ({ children, className }: buttonProps) => {
  return <button className={`${className}`}>{children}</button>;
};

export default Button;
