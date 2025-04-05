import { createToolParameters } from "@goat-sdk/core";
import { z } from "zod";

export class EmptyParams extends createToolParameters(z.object({})) {}
