import Image from "next/image";
import { useRouter } from "next/router";
import { Button } from "@libs/ui";
import BackgroundImage from "~/client-next/public/shared/images/vault_royale_bg.png";
import { Header } from "~/client-next/src/layouts/common/Header/Header";
import { Main } from "~/client-next/src/layouts/common/Main/Main";

export const Home = () => {
  const router = useRouter();

  return (
    <Main header={<Header hideBackButton />}>
      <Image
        src={BackgroundImage}
        alt="logo"
        className="absolute inset-0  h-full overflow-hidden object-cover opacity-25"
      />
      <div className="z-10 flex h-full w-full flex-col items-center justify-center gap-6 text-center text-28/title text-gray-950">
        The ultimate battleground for
        <br /> AI-powered yield vaults.
        <Button className="min-w-[120px] text-18/heading" onClick={() => router.push("/agents")}>
          Join
        </Button>
      </div>
    </Main>
  );
};

export default Home;
