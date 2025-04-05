import { usePrivy } from "@privy-io/react-auth";
import { Button } from "@libs/ui";
import { Header } from "~/client-next/src/layouts/common/Header/Header";
import { Main } from "~/client-next/src/layouts/common/Main/Main";

const MyPage = () => {
  const { logout } = usePrivy();
  return (
    <Main header={<Header hideLogo title="My Page" />}>
      <h1>My Page</h1>
      <Button variant="textAssertive" onClick={logout}>
        Logout
      </Button>
    </Main>
  );
};

export default MyPage;
