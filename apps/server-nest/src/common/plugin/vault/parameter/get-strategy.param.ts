import { createToolParameters } from "@goat-sdk/core";
import { z } from "zod";

export class GetStrategyParams extends createToolParameters(
  z.object({
    vaultAddress: z.string().describe("The address of the vault"),
  }),
) {}
