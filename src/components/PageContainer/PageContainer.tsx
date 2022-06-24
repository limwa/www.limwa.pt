import FullPageBackground from '@/components/FullPageBackground';

const PageContainer: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <FullPageBackground>
      <div className="flex justify-center">
        <div className="w-full max-w-6xl px-6">{children}</div>
      </div>
    </FullPageBackground>
  );
};

export default PageContainer;
