import { Option, program } from "commander";
import { Games } from "./Games";
import { Logger } from "./Logger";
import { NotifierFactory, options } from "./Notifier/factory/NotifierFactory";

program
  .addOption(
    new Option("-n, --notifier [notifierType]", "the notifier to use")
      .choices(options)
      .default("n8n")
  )
  .addOption(
    new Option("-v, --verbose", "output extra debugging").default(false)
  )
  .parse();

const { notifier, verbose } = program.opts();

const dotenv = require("dotenv");
dotenv.config();

const logger = new Logger({ verbose });

const main = async () => {
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

main();
