import Limwa from '@/components/Limwa';
import LinkButton from '@/src/components/LinkButton';

const Header: React.FC = () => {
  return (
    <header className="flex flex-row justify-between items-center gap-8 py-4">
      <Limwa />
      <LinkButton title="Blog" href="/blog" />
    </header>
  );
};

export default Header;
