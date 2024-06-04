import { GameGetter } from ".";
import { Gist } from "../Gist";

export class GistGameGetter implements GameGetter {
  private GIST_ID = "4653d6c4e53d7146ec3fd4b3e39c0967";
  private GIST_FILE_NAME = "itchGames.json";

  public async getGames() {
    const gist = new Gist(this.GIST_ID);
    const games = await gist.get(this.GIST_FILE_NAME);
    if (!games) return {};
    return JSON.parse(games.content);
  }

  public async updateGames(content: Record<string, string>) {
    const gist = new Gist(this.GIST_ID);
    await gist.update(this.GIST_FILE_NAME, content);
  }
}
