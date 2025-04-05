import { usePrivy } from "@privy-io/react-auth";
import { Button } from "@libs/ui";
import { ProfileCard } from "~/client-next/src/components/ProfileCard/ProfileCard";
import { Header } from "~/client-next/src/layouts/common/Header/Header";
import { Main } from "~/client-next/src/layouts/common/Main/Main";

const MyPage = () => {
  const { logout } = usePrivy();
  return (
    <Main header={<Header hideLogo title="My Page" />}>
      <div className="flex w-full flex-col items-end gap-2">
        <ProfileCard />
        <Button variant="textAssertive" className="mr-4" onClick={logout}>
          Logout
        </Button>
      </div>
    </Main>
  );
};

export default MyPage;
