export const escapeMarkdownV2 = (text: string) => {
  return text.replace(/([_[\]()~`>#+\-=|{}.!\\])/g, "\\$1");
};

export const getStrategyChangedMessage = (): string => {
  const message = "Strategy has been changed. Please check the website for more details.";
  return escapeMarkdownV2(message);
};
