import { createToolParameters } from "@goat-sdk/core";
import { z } from "zod";

export class GetStrategyListParams extends createToolParameters(
  z.object({
    chainId: z.string().describe("The chain ID of the vault"),
  }),
) {}
