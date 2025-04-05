import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { Button, Dropdown, Textarea, Textfield } from "@libs/ui";

export const Home = () => {
  const options = ["Apple", "Banana", "Cherry"];
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center bg-gray-50">
      <div className="flex flex-col gap-4 p-8">
        <Dropdown options={options} onSelect={setSelected} />
      </div>
    </div>
  );
};

export default Home;
