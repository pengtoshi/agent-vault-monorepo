import { createToolParameters } from "@goat-sdk/core";
import { z } from "zod";

export class SetNewStrategyParams extends createToolParameters(
  z.object({
    vaultAddress: z.string().describe("The address of the vault"),
    strategyAddress: z.string().describe("The address of the strategy"),
  }),
) {}
