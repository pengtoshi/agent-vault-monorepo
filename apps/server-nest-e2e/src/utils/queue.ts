import type { Queue } from "bullmq";

export const waitUntilQueueDrained = async (queue: Queue) => {
  return new Promise<void>((resolve) => {
    const interval = setInterval(async () => {
      const waitingCount = await queue.getWaitingCount();
      const activeCount = await queue.getActiveCount();
      if (waitingCount === 0 && activeCount === 0) {
        clearInterval(interval);
        resolve();
      }
    }, 30);
  });
};
