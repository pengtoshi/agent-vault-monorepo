import type { GetServerSideProps } from "next";
import { findAgentById, getGraphqlClient } from "@libs/graphql";
import type { AgentResponse } from "@libs/graphql";
import { AgentDetails } from "~/client-next/src/layouts/agents/AgentDetails/AgentDetails";
import { Header } from "~/client-next/src/layouts/common/Header/Header";
import { Main } from "~/client-next/src/layouts/common/Main/Main";

export const getServerSideProps: GetServerSideProps = async ({ req, res, query }) => {
  try {
    const client = getGraphqlClient(process.env.NEXT_PUBLIC_GRAPHQL_URL, { req, res });

    const id = query.id as string;
    const { data: agentData } = await client.query({
      query: findAgentById,
      variables: { id },
    });
    const agentInfo = agentData.findAgentById;

    return {
      props: {
        agentInfo,
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

const Agents = ({ agentInfo }: { agentInfo: AgentResponse }) => {
  return (
    <Main header={<Header hideLogo title={agentInfo.name} />} hideBottomNavigation>
      <AgentDetails agentInfo={agentInfo} />
    </Main>
  );
};

export default Agents;
