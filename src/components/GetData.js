import { LitElement, html } from "lit-element";

export class GetData extends LitElement {
  static get properties() {
    return {
      url: { type: String },
      metho: { type: String },
    };
  }
  //   constructor() {
  //     super();
  //     this.getData();
  //   }
  firstUpdated() {
    this.getData();
  }

  _sendData(data) {
    this.dispatchEvent(
      new CustomEvent("ApiData", {
        detail: { data },
        bubbles: true,
        composed: true,
      })
    );
  }

  getData() {
    fetch(this.url, { method: this.metho })
      .then((res) => {
        if (res.ok) return res.json();
        return ProcessingInstruction.reject(res);
      })
      .then((data) => this._sendData(data))
      .catch((e) => console.log("Ha ocurrido un error", e));
  }
}

customElements.define("get-data", GetData);
