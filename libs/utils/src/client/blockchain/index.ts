import type { EventFragment } from "ethers/lib/utils";
import { type TransactionReceipt, decodeEventLog } from "viem";

export const getEventArgsFromReceipt = (
  receipt: TransactionReceipt,
  eventAbi: EventFragment,
): Record<string, any> | undefined => {
  const eventLog = receipt.logs.find((log) => {
    try {
      const event = decodeEventLog({
        abi: [eventAbi],
        data: log.data,
        topics: log.topics,
      });
      return event.eventName === eventAbi.name;
    } catch {
      return false;
    }
  });

  if (!eventLog) return undefined;

  const event = decodeEventLog({
    abi: [eventAbi],
    data: eventLog.data,
    topics: eventLog.topics,
  });

  return event.args;
};
