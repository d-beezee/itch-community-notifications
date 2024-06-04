export class Gist {
  private GIST_ID: string;
  private GITHUB_TOKEN = "";

  constructor(GIST_ID: string) {
    this.GIST_ID = GIST_ID;
    if (process.env.GITHUB_TOKEN !== undefined)
      this.GITHUB_TOKEN = process.env.GITHUB_TOKEN;
  }

  public async get(file: string) {
    const url = `https://api.github.com/gists/${this.GIST_ID}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `token ${this.GITHUB_TOKEN}`,
      },
    });
    const gist = await response.json();
    if (gist.hasOwnProperty("files") === false) return false;
    if (gist.files.hasOwnProperty(file) === false) return false;
    return gist.files[file];
  }

  public async update(file: string, data: Record<string, string>) {
    const content = JSON.stringify(data, null, 2);
    const url = `https://api.github.com/gists/${this.GIST_ID}`;
    const response = await fetch(url);
    const gist = await response.json();
    const newFiles = {
      [file]: {
        content,
      },
    };
    const newGist = {
      ...gist,
      files: newFiles,
    };
    await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `token ${this.GITHUB_TOKEN}`,
      },
      body: JSON.stringify(newGist),
    });
  }
}
