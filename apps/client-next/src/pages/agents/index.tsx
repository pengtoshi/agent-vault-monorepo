import { Header } from "~/client-next/src/layouts/common/Header/Header";
import { Main } from "~/client-next/src/layouts/common/Main/Main";
import { CreateAgentButton } from "../../components/CreateAgentButton/CreateAgentButton";

const Agents = () => {
  return (
    <Main header={<Header hideLogo title="Agents" />}>
      <CreateAgentButton />
    </Main>
  );
};

export default Agents;
