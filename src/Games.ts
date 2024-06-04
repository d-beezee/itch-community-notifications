import jsdom from "jsdom";
import { GameGetter } from "./GameGetters";
import { GistGameGetter } from "./GameGetters/GistGameGetter";

export class Games {
  public GAMES: Record<string, string> = {};
  public withCommunityCopies: string[] = [];

  private gameGetter: GameGetter;

  constructor({ gameGetter }: { gameGetter?: GameGetter } | undefined = {}) {
    this.gameGetter = gameGetter ? gameGetter : new GistGameGetter();
  }

  public async init() {
    this.GAMES = await this.gameGetter.getGames();

    const withCopies: string[] = [];
    for (const game in this.GAMES) {
      const result = await this.hasCommunityCopies(
        this.GAMES[game as keyof typeof this.GAMES]
      );
      if (result) withCopies.push(game);
    }
    this.withCommunityCopies = withCopies;
  }

  get withoutCommunityCopies() {
    return Object.keys(this.GAMES).filter(
      (game) => !this.withCommunityCopies.includes(game)
    );
  }

  public getGamesObject(games: string[]) {
    return games.reduce((acc, game) => {
      acc[game] = this.GAMES[game as keyof typeof this.GAMES];
      return acc;
    }, {} as Record<string, string>);
  }

  public async hasCommunityCopies(url: string) {
    const response = await fetch(url);
    const text = await response.text();
    const dom = new jsdom.JSDOM(text);

    const htmlDocument = dom.window.document;

    if (htmlDocument === null) return false;
    const rewards = htmlDocument.querySelector(".rewards");

    if (rewards === null) return false;

    if (rewards.innerHTML.includes("All copies claimed!")) return false;
    return true;
  }

  public async updateGames(content: Record<string, string>) {
    return await this.gameGetter.updateGames(content);
  }
}
