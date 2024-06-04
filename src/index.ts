import { Games } from "./Games";
import { N8NNotifier } from "./Notifier/N8NNotifier";
const dotenv = require("dotenv");
dotenv.config();

const main = async () => {
  const games = new Games();
  await games.init();

  const withCopies = games.getGamesObject(games.withCommunityCopies);

  const notifer = new N8NNotifier();
  await notifer.notify(withCopies);

  const gamesWithoutCopies = games.getGamesObject(games.withoutCommunityCopies);

  await games.updateGames(gamesWithoutCopies);
};

main();
