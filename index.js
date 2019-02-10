const container = document.getElementById('container');
const images = ['\u{2600}', '\u{2600}', '\u{2615}', '\u{2615}', '\u{2622}',
  '\u{2622}', '\u{2639}', '\u{2639}', '\u{262F}', '\u{262F}', '\u{2654}',
  '\u{2654}', '\u{2693}', '\u{2693}', '\u{265C}', '\u{265C}'];

function distributeImages() { // return random position images
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

function makeGameBoard() {
  for (let i = 0; i < 16; i++) {
    const divFront = document.createElement('div');
    const divCard = document.createElement('div');
    const cssCard = 'width: 25%; height: 25%;';
    divCard.style.cssText = cssCard;
    divCard.appendChild(divFront);
    divCard.appendChild(distributeImages());
    container.appendChild(divCard);
  }
  game();
}

function game() {
  const divs = document.querySelectorAll('#container > div');
  let clickCount = 0, pair = [], guessed = [];
  [...divs].forEach(div => {
    div.onclick = () => {
      div.classList.add('rotate');
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
    };
  })
}

makeGameBoard();
