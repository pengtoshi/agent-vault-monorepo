import { Header } from "~/client-next/src/layouts/common/Header/Header";
import { Main } from "~/client-next/src/layouts/common/Main/Main";

export const Home = () => {
  return (
    <Main header={<Header hideBackButton progressPercent={50} />}>
      <h1>Home</h1>
    </Main>
  );
};

export default Home;
