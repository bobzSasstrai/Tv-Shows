async function getShows(searchKeyword = "") {
  const url = searchKeyword
    ? `https://api.tvmaze.com/search/shows?q=${searchKeyword}`
    : "https://api.tvmaze.com/shows";

  const response = await fetch(url);
  const data = await response.json();
  return searchKeyword ? data.map((item) => item.show) : data;
}

function renderShowList(shows) {
  const showList = document.getElementById("showList");
  showList.innerHTML = "";

  shows.forEach((show) => {
    const showElement = document.createElement("div");
    showElement.classList.add("show");

    showElement.innerHTML = `
            <img src="${
              show.image
                ? show.image.medium
                : "https://via.placeholder.com/200x300"
            }" alt="${show.name}">
            <h2 class="title">${show.name}</h2>
            <div class="genres">
                ${
                  show.genres && show.genres.length > 0
                    ? show.genres
                        .map((genre) => `<span>${genre}</span>`)
                        .join("")
                    : "No genres available"
                }
            </div>
        `;

    showElement.addEventListener("click", () => {
      window.location.href = `showDetail.html?id=${show.id}`;
    });

    showList.appendChild(showElement);
  });
}

async function handleSearch() {
  const searchKeyword = document.getElementById("searchInput").value;
  const shows = await getShows(searchKeyword);
  renderShowList(shows);
}

document.getElementById("searchInput").addEventListener("input", handleSearch);

getShows().then(renderShowList);
