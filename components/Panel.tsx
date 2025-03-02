export function Panel({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={
        "rounded-lg border border-white border-opacity-25 bg-white bg-opacity-20 p-8 " +
        className
      }
    >
      {children}
    </div>
  );
}
