import { createToolParameters } from "@goat-sdk/core";
import { z } from "zod";

export class GetAllStrategyAddressesParams extends createToolParameters(z.object({})) {}
