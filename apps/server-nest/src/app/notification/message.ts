export const escapeMarkdownV2 = (text: string) => {
  return text.replace(/([_[\]()~`>#+\-=|{}.!\\])/g, "\\$1");
};

export const getStrategyChangedMessage = (): string => {
  const clientUrl = process.env.CLIENT_APP_URL || "http://localhost:4200";
  return `Strategy has been changed. Please check the [website](${clientUrl}) for more details.`;
};
