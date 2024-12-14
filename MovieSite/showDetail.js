async function getShowDetails(showId) {
  const response = await fetch(`https://api.tvmaze.com/shows/${showId}`);
  const data = await response.json();
  return data;
}

async function getShowEpisodes(showId) {
  const response = await fetch(
    `https://api.tvmaze.com/shows/${showId}/episodes`
  );
  const data = await response.json();
  return data;
}

async function displayShowDetails() {
  const urlParams = new URLSearchParams(window.location.search);
  const showId = urlParams.get("id");

  if (showId) {
    const show = await getShowDetails(showId);
    const episodes = await getShowEpisodes(showId);

    const showDetailDiv = document.getElementById("showDetail");

    showDetailDiv.innerHTML = `
            <h2>${show.name}</h2>
            <img src="${
              show.image
                ? show.image.original
                : "https://via.placeholder.com/400x600"
            }" alt="${show.name}">
        `;

    let descriptionBoxContent = `
            <div class="description-box">
                <p>${
                  show.summary
                    ? show.summary.replace(/<[^>]*>/g, "")
                    : "No description available."
                }</p>
        `;

    if (show.genres && show.genres.length > 0) {
      const genresList = show.genres
        .map((genre) => `<span>${genre}</span>`)
        .join("");
      descriptionBoxContent += `<div class="genres"><strong>Genres:</strong> ${genresList}</div>`;
    }

    descriptionBoxContent += `</div>`;
    showDetailDiv.innerHTML += descriptionBoxContent;

    if (episodes && episodes.length > 0) {
      const episodesList = episodes
        .slice(0, 5)
        .map((episode) => {
          return `
                    <div class="episode">
                        <div class="episode-content">
                            <img src="${
                              episode.image
                                ? episode.image.medium
                                : "https://via.placeholder.com/150x200"
                            }" alt="${episode.name}">
                            <div class="episode-description">
                                <h4>Season ${episode.season} - Episode ${
            episode.number
          }: ${episode.name}</h4>
                                <p>${
                                  episode.summary
                                    ? episode.summary.replace(/<[^>]*>/g, "")
                                    : "No description available."
                                }</p>
                            </div>
                        </div>
                    </div>
                `;
        })
        .join("");
      showDetailDiv.innerHTML += `<div class="episodes"><strong>Episodes:</strong>${episodesList}</div>`;
    } else {
      showDetailDiv.innerHTML += `<div class="episodes"><strong>Episodes:</strong> No episodes available.</div>`;
    }
  } else {
    window.location.href = "index.html";
  }
}

displayShowDetails();
