import Header from '@/components/Header';
import Head from 'next/head';

const Dashboard = () => {
  return (
    <>
      <Head>
        <title>Painel- Sujeito Pizzaria</title>
      </Head>
      <div>
        <Header />
        <h1>Painel</h1>
      </div>
    </>
  );
};

export default Dashboard;
