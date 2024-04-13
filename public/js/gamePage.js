import { navigateTo, container } from '../app.js';
import { addStylsheet } from './addStylesheet.js';

export function addGamePage() {
    addStylsheet('game');

    container.innerHTML =
        `LEZGO`;
}