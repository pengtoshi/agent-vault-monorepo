import { v4 as uuidv4 } from "uuid";

export const sleep = async (milliseconds: number): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
};

export const localId = () => {
  const id = uuidv4();
  const prefix = "1tx-";
  return `${prefix}${id}`;
};

export const isLocalId = (id?: string) => {
  const prefix = "1tx-";
  return id?.startsWith(prefix) ?? false;
};
