const API_KEY = "pub_31196389ee9aa0783fbc71218eaa3133db82e";
const url = "https://newsdata.io/api/1/news?";
//https://newsdata.io/api/1/news?apikey=YOUR_API_KEY&q=pegasus&language=en
window.addEventListener("load", () => fetchNews("India"));

function reload() {
    window.location.reload();
}

async function fetchNews(query) {
    const res = await fetch(`${url}apiKey=${API_KEY}&q=${query}`);
    const data = await res.json();
    bindData(data.results);
}

function bindData(results) {
    const cardsContainer = document.getElementById("cards-container");
    const newsCardTemplate = document.getElementById("template-news-card");

    cardsContainer.innerHTML = "";

    results.forEach((result) => {
        if (!result.image_url) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, result);
        cardsContainer.appendChild(cardClone);
    });
}

function fillDataInCard(cardClone, result) {
    const newsImg = cardClone.querySelector("#news-img");
    const newsTitle = cardClone.querySelector("#news-title");
    //const newsSource = cardClone.querySelector("#news-source");
    const newsDesc = cardClone.querySelector("#news-desc");

    newsImg.src = result.image_url;
    newsTitle.innerHTML = result.title;
    newsDesc.innerHTML = result.description;

    // const date = new Date(article.pubDate).toLocaleString("en-US", {
    //     timeZone: "Asia/Jakarta",
    // });

    //newsSource.innerHTML = `${article.source_id} · ${date}`;

    cardClone.firstElementChild.addEventListener("click", () => {
        window.open(result.link, "_blank");
    });
}

let curSelectedNav = null;
function onNavItemClick(id) {
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = navItem;
    curSelectedNav.classList.add("active");
}

const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");

searchButton.addEventListener("click", () => {
    const query = searchText.value;
    if (!query) return;
    fetchNews(query);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = null;
});
