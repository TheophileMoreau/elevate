export function addTitlePage(element) {
  var startTime = Date.now();

  console.log('Adding title Page');
  element.innerHTML = `
    <div class="title-container" id="titles">
      <div class="title" id="second-left-border-title"><div id="elevator">Elevate</div></div>
      <div class="title" id="first-left-border-title"><div id="elevator">Elevate</div></div>
      <div class="title" id="center-title"><div id="elevator">Elevate</div></div>
      <div class="title" id="first-right-border-title"><div id="elevator">Elevate</div></div>
      <div class="title" id="second-right-border-title"><div id="elevator">Elevate</div></div>
    </div>
    `
  var numberOfDisplayedTitles = 5;

  function fadeOutElement(fadeElement, callback) {
    setTimeout(() => {
      fadeElement.style.transition = 'opacity 1s ease-in-out'; // Apply transition effect
      fadeElement.style.opacity = '0'; // Fade in
      setTimeout(() => {
        fadeElement.style.height = '0%'; // After fade
        if (callback) {
          callback(); // Call the callback function if provided
        }
      }, 1000);
    }, 500); // 2000 milliseconds = 2 seconds

    numberOfDisplayedTitles--;
  }

  const titleElements = document.getElementsByClassName('title');
  var hasRun = false;

  // Convert HTMLCollection to an array
  Array.from(titleElements).forEach(function (title) {
    if (title.id != 'center-title') {
      title.addEventListener('animationend', () => {
        fadeOutElement(title, () => {
          if (numberOfDisplayedTitles == 1 & hasRun == false) {
            hasRun = true;

            var finalTitle = document.getElementById('center-title');

            fadeOutElement(finalTitle, () => {
              console.log('Animation is done'); // After everything has disappeared;
              element.innerHTML = '';
              console.log('Nothing left hihihi');
              console.log('It took ',(Date.now() - startTime) / 1000,'s to do so')
            });
          }
        });
      });
    }
  });
}
