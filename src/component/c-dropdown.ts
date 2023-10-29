import { LitElement, css, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";

export type ListItem = {
  id: number | null;
  name: string;
  active:boolean;
};

@customElement("c-dropdown")
export class CDropdown extends LitElement {
  static styles = 
    css`
      .c-main-container {
      display: flex;
      justify-content:center;
      min-height:200px;
      }
      .c-btn-container {
        display: inline-flex;
        margin: auto;
      }
      .c-dropdown-btn {
        padding: 0.8em;
        border: none;
        background-color: #0d6efd;
        height: 40px;
        cursor: pointer;
        border-radius: 10px 0px 0px 10px;
      }
      .c-dropdown-btn-text {
        text-transform: uppercase;
        font-weight: bold;
        font-size: 1em;
      }
      .c-dropdown-btn:hover {
        background-color: #0b5ed7;
      }
      .arrow-container {
        display: flex;
        align-items: center;
        padding: 0.8em;
        border: none;
        background-color: #0d6efd;
        height: 40px;
        cursor: pointer;
        min-width: 30px;
        border-radius: 0px 10px 10px 0px;
        border-left: 2px solid #347ee9;
      }
      .arrow-container:hover {
        background-color: #0b5ed7;
      }

      .arrow {
        position: relative;
        width: 0;
        height: 0;
        border-left: 6px solid transparent;
        border-right: 6px solid transparent;
        border-top: 6px solid #000000;
      }
      .c-dropdown-list {
        position: absolute;
        border-radius: 4px;
        background-color: #ffffffde;
        list-style-type: none;
        z-index: 1000;
        min-width: 200px;
        width:200px;
        max-height:300px;
        overflow-y:auto;
        display: none;
      }
      .show {
        transform: translateY(0rem);
        display: block;
      }
      .c-dropdown-list-item {
        display: block;
        width: 100%;
        cursor: pointer;
        color: #000000;
        padding:5px;
        font-weight: 400;
        text-align: start;
        white-space: wrap;
        background-color: transparent;
        border: 0;
      }

      .c-dropdown-list-item:hover {
        background-color: #83c5be;
        color: #ffffff;
      }

      .c-active {
        background-color: #0b5ed7;
        color: #ffffff;
        font-weight: bold;
      }
    `;

  @state() isOpen = false;

  @property({ type: String }) position: String = "bottom";

  @property({ type: String }) label: String = "";

  @property({ type: Array }) options: Array<ListItem> = [];

  @property({ type: Object }) selected: ListItem = {id: null, name: "", active:false};

  @property({ type: String }) id: string = "c-dropdown"

  firstUpdated() {
    window.addEventListener('resize', (e) => this.handleResize());
    document.documentElement.addEventListener("click", (event) =>
      this.hideDropdown(event)
    );
  }

  updated(changedProperties: Map<string | number | symbol, unknown>) {
    if (changedProperties.has("position")) {
      this.positionDropdown();
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('click', (e) => this.hideDropdown(e));
    window.addEventListener('resize', (e) => this.handleResize());
  }

  onSelectItem(event:Event, item: any) {
    event.stopPropagation();
    this.selected = { ...item };
    this.dispatchEvent(new Event("onSelect"));
  }

  toggleShowDropdown(event: Event) {
    event.stopPropagation();
    this.isOpen = !this.isOpen;
    this.positionDropdown();
  }

  hideDropdown(event: Event) {
    event.stopPropagation();
    if (this.isOpen) {
      this.isOpen = false;
      this.positionDropdown();
    }
  }

  handleResize() {
    if (this.isOpen) {
      this.positionDropdown();
    }
  }

  positionDropdown() {
    const dropDownBtn = this.renderRoot.querySelector(
      `#c-btn-container_${this.id}`
    ) as HTMLButtonElement;
    const dropdownList = this.renderRoot.querySelector(
      `#c-dropdown-list_${this.id}`
    ) as HTMLDivElement;
    const arrow = this.renderRoot.querySelector(`#arrow_${this.id}`) as HTMLSpanElement;

    const heightOffset = 10;
    const widthOffset = 10;
    if (this.isOpen) {
      const rect = dropDownBtn?.getBoundingClientRect(); 
      // need to calculate the dropdownlist height and width to set the position
      requestAnimationFrame(() => { 
        const listWidth = dropdownList.offsetWidth;
        const listHeight = dropdownList.offsetHeight;
        if(this.position ==="top" && rect.top < listHeight) {
          this.position = 'bottom'; // there is not enought space on top to show list, move to bottom
        }
        if (this.position === "left" && rect.left < listWidth) {
          this.position = 'bottom'; // there is not enought space on left to show list, move to bottom
        }
        if(this.position==="right" && rect.right + listWidth > window.innerWidth){
          this.position = 'bottom'; // there is not enought space on right to show list, move to bottom
        }

        // adjusting the open list items to their correct postion based on user selection
        if(this.position === "bottom"){
          dropdownList.style.left = rect.left + "px";
          dropdownList.style.top = rect.bottom + heightOffset + "px";
          arrow.style.transform = "rotate(0deg)";
        }else if(this.position ==="top"){
          dropdownList.style.left = rect.left + "px";
          dropdownList.style.top = rect.bottom - listHeight - heightOffset - rect.height + "px";
          arrow.style.transform = "rotate(180deg)";
        }
        else if (this.position === "left") {
          dropdownList.style.left = rect.left - widthOffset - listWidth + 'px';
          dropdownList.style.top = rect.top - rect.height + "px";
          arrow.style.transform = "rotate(90deg)";
        } else if (this.position === "right") {
          dropdownList.style.left = rect.right + widthOffset + "px";
          dropdownList.style.top = rect.top - rect.height + "px";
          arrow.style.transform = "rotate(-90deg)";
        }
        else {
          dropdownList.style.left = "";
          dropdownList.style.top = "";
          dropdownList.style.right = "";
          dropdownList.style.bottom = "";
          arrow.style.transform = "rotate(0deg)";
        }
      });
    } 
  }


  render() {
    return html`
      <div id=${this.id} class="c-main-container">
        <div id="c-btn-container_${this.id}" class="c-btn-container">
          <button
            id="btn_${this.id}"
            class="c-dropdown-btn"
            @click=${(event: Event) => this.toggleShowDropdown(event)}
          >
            <span class="c-dropdown-btn-text">${this.label}</span>
          </button>
          <button
            class="arrow-container"
            @click=${(event: Event) => this.toggleShowDropdown(event)}
          >
            <span id="arrow_${this.id}" class="arrow"></span>
          </button>
        </div>
        <div
          class=${this.isOpen ? "c-dropdown-list show" : "c-dropdown-list"}
          id="c-dropdown-list_${this.id}"
        >
          ${this.options.map((item) => html` <div
              class="c-dropdown-list-item ${item.active ? "c-active" : "not-active"}"
              @click=${(e:Event) => this.onSelectItem(e,item)}
            >
              ${item.name}
            </div>`
    )}
        </div>
      </div>
    `;
  }
}
