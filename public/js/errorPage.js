import { container } from '../app.js';
import { addStylsheet } from './addStylesheet.js';

export function addErrorPage() {
    addStylsheet(''); // Remove style

    container.innerHTML =
        `Wrong elevator...`;
}