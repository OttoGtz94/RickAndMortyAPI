import { LitElement, html, css } from "lit-element";
import "./components/GetData";
import "./components/ApiTemplate";
import style from "./styles/RickMortyStyle";

export class RickMortyApi extends LitElement {
  static get properties() {
    return {
      wiki: { type: Array },
    };
  }

  static get styles() {
    return [style];
  }

  constructor() {
    super();
    this.wiki = [];
    this.addEventListener("ApiData", (results) =>
      this._dataFormat(results.detail.data)
    );
  }

  _dataFormat(data) {
    let characters = [];

    data.results.forEach((character) =>
      characters.push({
        img: character.image,
        name: character.name,
        specie: character.species,
        status: character.status,
      })
    );
    this.wiki = characters;
  }

  render() {
    return html`
      <api-template></api-template>
      <get-data
        url="https://rickandmortyapi.com/api/character"
        method="GET"
      ></get-data>
      <div class="container">${this.dateTemplate}</div>
    `;
  }

  get dateTemplate() {
    return html`
      ${this.wiki.map(
        (character) => html`
          <div class="card">
            <div class="card-content">
              <h2>${character.name}</h2>
              <img src="${character.img}" />
              <p
                class="${character.status.toLowerCase() === "alive"
                  ? "alive"
                  : character.status.toLowerCase() === "dead"
                  ? "dead"
                  : "unknown"}"
              >
                ${character.specie.toLowerCase()} --
                ${character.status.toLowerCase()}
              </p>
            </div>
          </div>
        `
      )}
    `;
  }
}
