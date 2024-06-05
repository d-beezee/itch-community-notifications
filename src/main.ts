import { program } from "commander";
import { Games } from "./Games";
import { getLogger } from "./Logger";
import { NotifierFactory } from "./Notifier/factory/NotifierFactory";

export const main = async () => {
  const { notifier } = program.opts();
  const logger = getLogger();
  logger.log("Starting: ");
  logger.log(`Options: ${JSON.stringify(program.opts())}`);
  const games = new Games();
  logger.log("Games instance created");
  await games.init();
  logger.log("Games initialized");

  const withCopies = games.getGamesObject(games.withCommunityCopies);
  logger.log("Games with community copies retrieved");
  logger.log(`Games with community copies: ${JSON.stringify(withCopies)}`);

  if (Object.keys(withCopies).length > 0) {
    logger.log(`Notifiying with ${notifier}`);
    await NotifierFactory.createNotifier(notifier).notify(withCopies);
  }

  const gamesWithoutCopies = games.getGamesObject(games.withoutCommunityCopies);
  logger.log("Games without community copies retrieved");
  logger.log(
    `Games without community copies: ${JSON.stringify(gamesWithoutCopies)}`
  );

  await games.updateGames(gamesWithoutCopies);
};
