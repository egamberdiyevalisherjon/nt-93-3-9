let urls = [
  "./images/apple.svg",
  "./images/apple.svg",
  "./images/netlify.svg",
  "./images/netlify.svg",
  "./images/facebook.webp",
  "./images/facebook.webp",
  "./images/youtube.webp",
  "./images/youtube.webp",
  "./images/github.png",
  "./images/github.png",
  "./images/google.png",
  "./images/google.png",
];

// Min => 0, Max = urls.length - 1

let parent = document.querySelector(".parent");
let moves = document.querySelector(".moves");
let matches = document.querySelector(".matches");

(function game() {
  let cards = document.querySelectorAll(".card");

  for (let i = 0; i < cards.length; i++) {
    cards[i].remove();
  }

  moves.innerHTML = 0;
  matches.innerHTML = 0;

  let usedRandomNumbers = [];
  let clickedCards = [];

  for (let i = 0; i < urls.length; i++) {
    let r = Math.floor(Math.random() * urls.length);

    while (usedRandomNumbers.includes(r)) {
      r = Math.floor(Math.random() * urls.length);
    }

    usedRandomNumbers.push(r);

    let url = urls[r];

    let img = document.createElement("img");

    img.setAttribute("src", url);

    let card = document.createElement("div");

    card.classList.add("card");

    card.append(img);

    parent.append(card);

    card.addEventListener("click", (e) => {
      if (
        +moves.innerHTML === 10 ||
        e.target.tagName === "IMG" ||
        e.target.classList.contains("show")
      ) {
        return;
      }

      e.target.classList.add("show");
      clickedCards.push(e.target);

      if (clickedCards.length === 2) {
        moves.innerHTML++;
        let card1 = clickedCards[0];
        let card2 = clickedCards[1];
        let url1 = card1.querySelector("img").getAttribute("src");
        let url2 = card2.querySelector("img").getAttribute("src");

        clickedCards = [];

        if (url1 === url2) {
          if (++matches.innerHTML === urls.length / 2) {
            setTimeout(() => {
              alert("Tabriklimiz. Yuttiz. 🎆");
              let replay = confirm("Qayta oynashshi xolisizmi");
              if (replay) {
                game();
              }
            }, 400);
          } else if (+moves.innerHTML === 10) {
            setTimeout(() => {
              alert("Yutqazdiz. 😭");
              let replay = confirm("Qayta oynashshi xolisizmi");
              if (replay) {
                game();
              }
            }, 400);
          }
        } else {
          setTimeout(() => {
            card1.classList.remove("show");
            card2.classList.remove("show");

            if (+moves.innerHTML === 10) {
              setTimeout(() => {
                alert("Yutqazdiz. 😭");
                let replay = confirm("Qayta oynashshi xolisizmi");
                if (replay) {
                  game();
                }
              }, 400);
            }
          }, 1000);
        }
      }
    });
  }
})();
