import type { NextPage } from 'next';
import Header from '@/components/Header';
import PageContainer from '@/components/PageContainer';

const Home: NextPage = () => {
  return (
    <PageContainer>
      <Header />
      <section className="mt-10">
        <h1 className="font-bold text-white text-3xl">
          Hey! I&apos;m <span className="text-teal-400">André Lima</span>!
        </h1>
        <p></p>
      </section>
    </PageContainer>
  );
};

export default Home;
