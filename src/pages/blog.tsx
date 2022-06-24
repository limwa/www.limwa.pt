import type { NextPage } from 'next';
import Header from '@/components/Header';
import PageContainer from '@/components/PageContainer';

const Blog: NextPage = () => {
  return (
    <PageContainer>
      <Header />
      <section className="mt-10">
        <h1 className="font-bold text-white text-3xl">
          Hey! I&apos;m André Lima!
        </h1>
        <p></p>
      </section>
    </PageContainer>
  );
};

export default Blog;
