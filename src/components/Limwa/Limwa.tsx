import Link from 'next/link';
import { useRouter } from 'next/router';

const Limwa: React.FC = () => {
  const router = useRouter();
  const path = router.asPath;

  const href = '/';
  const commonStyles = 'font-cursive text-3xl text-white';

  return path !== href ? (
    <Link href={href}>
      <a
        className={`${commonStyles} outline-none hover:text-teal-400 focus:text-teal-400 transition-colors`}
      >
        limwa
      </a>
    </Link>
  ) : (
    <p className={commonStyles}>limwa</p>
  );
};

export default Limwa;
