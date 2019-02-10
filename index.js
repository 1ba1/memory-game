const container = document.getElementById('container');
const images = ['\u{2600}', '\u{2600}', '\u{2615}', '\u{2615}', '\u{2622}',
  '\u{2622}', '\u{2639}', '\u{2639}', '\u{262F}', '\u{262F}', '\u{2654}',
  '\u{2654}', '\u{2693}', '\u{2693}', '\u{265C}', '\u{265C}'];

function distributeImages() { // return random image
  let rand = Math.round(Math.random() * 15),
    count = 0,
    iconDiv = document.createElement('div');

  while (count < 1) {
    if (images[rand] !== 0) {
      iconDiv.textContent = `${images[rand]}`;
      images[rand] = 0;
      count++;
    }
    rand = Math.round(Math.random() * 15);
  }

  return iconDiv;
}

function game() {
  const divs = document.querySelectorAll('#container > div');
  let clickCount = 0, pair = [], guessed = [];
  [...divs].forEach(div => {
    div.addEventListener('click', function() {
      div.classList.add('rotate');
      div.style.pointerEvents = "none"; // prevents matching the same card
      pair.push(div.textContent)
      clickCount++;
      if (clickCount === 2 && pair[0] !== pair[1]) {
        [...divs].forEach(div => {
          if (!guessed.includes(div.textContent)) { // rotate back if no match
            setTimeout(() => {
              div.classList.remove('rotate');
            }, 700)
          }
        })
      }
      if (clickCount === 2 && pair[0] === pair[1]) {
        guessed.push(pair[0]);
      }
      if (clickCount === 2) {
        pair = [];
        clickCount = 0;
        [...divs].forEach(div => {
          div.style.pointerEvents = "auto"; // makes pointervevents available
        })                                  // again after one guess
      }
      if (guessed.length === 8) {
        const p = document.querySelector('p');
        p.style.visibility = 'visible';
        const refresh = document.querySelector('button');
        refresh.style.display = 'inherit';
        refresh.onclick = () => {
          location.reload();
        };
      }
    })
  })
}

function makeGameBoard() {
  for (let i = 0; i < 16; i++) {
    const divFront = document.createElement('div');
    const divCard = document.createElement('div');
    const cssCard = 'width: 25%; height: 25%;';
    divCard.style.cssText = cssCard;
    divCard.appendChild(divFront);
    divCard.appendChild(distributeImages()); // append one random generated img
    container.appendChild(divCard);
  }
  game();
}

makeGameBoard();
