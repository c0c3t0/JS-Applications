import { render } from './node_modules/lit-html/lit-html.js';
import { tableBodyTemplate, createFormTemplate, editFormTemplate } from './templates.js';

const body = document.querySelector('body');

render([
    tableBodyTemplate,
    createFormTemplate,
    editFormTemplate
], body);
