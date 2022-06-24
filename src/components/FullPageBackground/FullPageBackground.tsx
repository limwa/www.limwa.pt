const FullPageBackground: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  return <div className="w-full min-h-screen bg-neutral-900">{children}</div>;
};

export default FullPageBackground;
