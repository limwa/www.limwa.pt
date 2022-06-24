import Link from 'next/link';
import { useRouter } from 'next/router';

type HeaderLinkProps = {
  title: string;
  href: string;
};

const LinkButton: React.FC<HeaderLinkProps> = ({ title, href }) => {
  const router = useRouter();
  const path = router.asPath;

  return path !== href ? (
    <Link href={href}>
      <a className="font-sans font-semibold text-lg text-white bg-neutral-800 rounded py-1 px-3 hover:bg-teal-700 focus:bg-teal-700 transition-colors">
        {title}
      </a>
    </Link>
  ) : (
    <></>
  );
};

export default LinkButton;
