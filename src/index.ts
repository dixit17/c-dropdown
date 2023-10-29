import { render, html } from "lit-html";
import "./wrapper/dropdown-wrapper";

const root = document.getElementById("root") as HTMLElement;

render(html` <dropdown-wrapper></dropdown-wrapper>`, root);
