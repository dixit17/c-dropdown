import { LitElement, html, css } from "lit";
import { customElement, state } from "lit/decorators.js";
import "../component/c-dropdown";
import { CDropdown, ListItem } from "../component/c-dropdown";
import {generateRandomWords} from "../utils/randomWords"

const positions = [
  "top", "left", "right", "bottom"
]

@customElement("dropdown-wrapper")
export class DropdownWrapper extends LitElement {
  static styles = [
    css`
    .d-wrapper{
      width:100%;
      height:100%;
    }
      .selected {
        color: #ffffff;
        margin: 10px;
      }
    `,
  ];
  @state() options: Array<ListItem> = generateRandomWords();

  @state() position = "bottom";

  onItemSelect = (event: Event) => {
    const target = event.target as CDropdown;
    this.options = [...this.options.map((m) => {
      if(m.name === target.selected.name)
      {
        m.active=true;
      }else{
        m.active=false;
      }
      return m;
    })]
  };

  handlePositionChange(e: Event) {
    const target = e.target as HTMLInputElement;
    this.position = target?.name;
  }

  render() {
    return html`
    <div class="d-wrapper">
     <p>The selected item is</p>
      <p>Name: ${this.options.find((f) => f.active)?.name || ""}</p>   
      <div>
        ${positions.map((item) => html`<input type="checkbox" @click=${(e: Event) => this.handlePositionChange(e)} name=${item} .checked=${item === this.position}/>
        <label for=${item}>${item}</label>`)}
        
  </div>
     
    <c-dropdown
        .label=${"dropdown-wrapper"}
        .options=${this.options}
        .position=${this.position}
        .id=${"c-1"}
        @onSelect=${(event: Event) => this.onItemSelect(event)}
      >
      </c-dropdown>
  </div>
      `;
  }
}
