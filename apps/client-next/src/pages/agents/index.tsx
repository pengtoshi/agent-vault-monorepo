import type { GetServerSideProps } from "next";
import { findAllAgents, findAllChains, getGraphqlClient } from "@libs/graphql";
import type { AgentsResponse, ChainsResponse } from "@libs/graphql";
import { CreateAgentButton } from "~/client-next/src/components/CreateAgentButton/CreateAgentButton";
import { AgentsList } from "~/client-next/src/layouts/agents/AgentsList/AgentsList";
import { Header } from "~/client-next/src/layouts/common/Header/Header";
import { Main } from "~/client-next/src/layouts/common/Main/Main";

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  try {
    const client = getGraphqlClient(process.env.NEXT_PUBLIC_GRAPHQL_URL, { req, res });

    const { data: agentsData } = await client.query({
      query: findAllAgents,
    });
    const agents = agentsData.findAllAgents;

    const { data: chainsData } = await client.query({
      query: findAllChains,
    });
    const chains = chainsData.findAllChains;

    return {
      props: {
        agents,
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

const Agents = ({ agents, chains }: { agents: AgentsResponse; chains: ChainsResponse }) => {
  return (
    <Main header={<Header hideLogo title="Agents" />}>
      <CreateAgentButton />
      <AgentsList agents={agents} chains={chains} />
    </Main>
  );
};

export default Agents;
