function swipeOffer() {
  const image = document.querySelector(".offer-image");

  if (image) {
    image.addEventListener("touchstart", startTouch, false);
    image.addEventListener("touchmove", swipe, false);

    // Swipe Left / Right
    let initialX = null;
    let initialY = null;

    function startTouch(e) {
      initialX = e.touches[0].clientX;
      initialY = e.touches[0].clientY;
    };

    function swipe(e) {
      if (initialX === null) {
        return;
      }

      if (initialY === null) {
        return;
      }

      let currentX = e.touches[0].clientX;
      let currentY = e.touches[0].clientY;

      let diffX = initialX - currentX;
      let diffY = initialY - currentY;

      if (Math.abs(diffX) > Math.abs(diffY)) {
        // sliding horizontally
        if (diffX > 0) {
          // swiped left
          const id = e.target.dataset.id
          result(id, "reject")
        } else {
          // swiped right
          const id = e.target.dataset.id
          result(id, "matches")
        }
      }

      initialX = null;
      initialY = null;

      e.preventDefault();
    };

    const acceptBtn = document.querySelector("#accept-btn");
    const rejectBtn = document.querySelector("#reject-btn");

    acceptBtn.addEventListener("click", (e) => {
      const id = image.dataset.id
      result(id, "matches")
    })

    rejectBtn.addEventListener("click", (e) => {
      const id = image.dataset.id
      result(id, "reject")
    })

  }
}

const result = (id, status) => {
  const url = `/offers/${id}/${status}`
  fetch(url, {
    method: "POST",
    headers: { "Accept": "text/html" },
    body: ""
  })
    .then((data) => {
      const url = data.url
      if (url.includes("offers"))  {
        window.location.href = "/offers"
      } else {
        const id = url.split("/matches/")[1]
        const modal = document.querySelector(".modal-shadow")
        modal.classList.remove("modal-hidden")
        const modalContent = document.querySelector(".match-modal")
        modalContent.innerHTML = `
        <div id="close-modal">X</div>
        <h2>It's a Match!</h2>
        <a href="/offers">Continuer</a>
        <a href="/matches/${id}">Voir mon match</a>
        `
      }
    })
}

export { swipeOffer }
