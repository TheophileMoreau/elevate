import { container } from '../app.js';
import { addStylsheet } from './addStylesheet.js';

export function addMobilePage() {
    addStylsheet('mobile');

    console.log('Adding mobile page !');
    container.innerHTML = `
      <div class="mobile-title-container" id="titles">
        <div class="mobile-title" id="second-left-border-title"></div>
        <div class="mobile-title" id="first-left-border-title"></div>
        <div class="mobile-title" id="center-title"></div>
        <div class="mobile-title" id="first-right-border-title"></div>
        <div class="mobile-title" id="second-right-border-title"></div>
      </div>
      `

    var mobileTitles = document.getElementsByClassName('mobile-title');
    console.log('Get titles');

    function checkElementNumber(i) {
        return Math.floor((Math.abs(i - 10) - 1) / 3) + 1;
    }

    // Convert HTMLCollection to an array
    Array.from(mobileTitles).forEach(function (title) {
        for (let i = 1; i <= 19; i++) {
            if (i !== 10) {
                title.innerHTML += `<p class="title-text-${checkElementNumber(i)}">Elevate</p>`;
            } else {
                if (title.id == 'second-left-border-title') {
                    title.innerHTML += '<p class="mobile-title-text">Your</p>';
                }
                if (title.id == 'first-left-border-title') {
                    title.innerHTML += '<p class="mobile-title-text">Screen</p>';
                }
                if (title.id == 'center-title') {
                    title.innerHTML += '<p class="mobile-title-text">Is</p>';
                }
                if (title.id == 'first-right-border-title') {
                    title.innerHTML += '<p class="mobile-title-text">Too</p>';
                }
                if (title.id == 'second-right-border-title') {
                    title.innerHTML += '<p class="mobile-title-text">Small</p>';
                }
            }
        }
    });
}

/*
<p class="title" id="second-left-border-title">Your</p>
      <p class="title" id="first-left-border-title">Screen</p>
      <p class="title" id="center-title">Is</p>
      <p class="title" id="first-right-border-title">Too</p>
      <p class="title" id="second-right-border-title">Small</p>
  */