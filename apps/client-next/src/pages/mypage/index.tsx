import { Header } from "~/client-next/src/layouts/common/Header/Header";
import { Main } from "~/client-next/src/layouts/common/Main/Main";

const MyPage = () => {
  return (
    <Main header={<Header hideLogo title="My Page" />}>
      <h1>My Page</h1>
    </Main>
  );
};

export default MyPage;
