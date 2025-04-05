import type { GetServerSideProps } from "next";
import type { ChainsResponse } from "@libs/graphql";
import { findAllChains, getGraphqlClient } from "@libs/graphql";
import { CreateAgentForm } from "~/client-next/src/layouts/agents/CreateAgentForm/CreateAgentForm";
import { Header } from "~/client-next/src/layouts/common/Header/Header";
import { Main } from "~/client-next/src/layouts/common/Main/Main";

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  try {
    const client = getGraphqlClient(process.env.NEXT_PUBLIC_GRAPHQL_URL, { req, res });

    const { data } = await client.query({
      query: findAllChains,
    });
    const chains = data.findAllChains;

    return {
      props: {
        chains,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      redirect: {
        destination: "/404",
        permanent: false,
      },
    };
  }
};

const CreateAgent = ({ chains }: { chains: ChainsResponse }) => {
  return (
    <Main header={<Header hideLogo title="Create Agent" />}>
      <CreateAgentForm chains={chains} />
    </Main>
  );
};

export default CreateAgent;
