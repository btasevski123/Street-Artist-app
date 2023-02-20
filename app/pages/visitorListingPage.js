function initVisitorListingPage() {
  filterVisitorListing();
  populateType("#type");
  
  filter();
}

function evenOddCard() {
  $(".card").each((index, el) =>
    $(el).addClass(index % 2 === 0 ? "card-one" : "card-two")
  );
}

function filterVisitorListing() {
  let submitButton = document.querySelector(".submit-button");

  submitButton.addEventListener("click", (e) => {
    e.preventDefault();
    location.hash = "#visitorListingPage";
    filter();
  });
}
function populateType(selectInput) {
  const select = document.querySelector(selectInput);
  select.innerHTML = '<option value="">Choose</option>';
  itemTypes.forEach((item) => {
    select.innerHTML += `<option value = '${item}'>${item}</option>`;
  });
}

function filter() {
  let cardWrapper = document.querySelector(".card-wrapper");
  let byTitle = document.querySelector("#title").value.toLowerCase();
  let byArtist = document.querySelector("#artist").value;
  let byPriceMin = document.querySelector("#min-val").value;
  let byPriceMax = document.querySelector("#max-val").value;
  let byType = document.querySelector("#type").value;

  const publishedItems = items.filter((item) => item.isPublished);

  let filtered = publishedItems.filter(
    (item) =>
      (byTitle ? item.title.toLowerCase().includes(byTitle) : true) &&
      (byArtist ? item.artist === byArtist : true) &&
      (byPriceMin ? item.price >= byPriceMin : true) &&
      (byPriceMax ? item.price <= byPriceMax : true) &&
      (byType ? item.type === byType : true)
  );

  cardWrapper.innerHTML = "";
  filtered.forEach((item) => {
    cardWrapper.innerHTML += `
    <div class="card">
      <img src="${item.image}" class="card-img-top" alt="Image-${item.type}">
       <div class="card-body">
        <div class="price">
          <h5 class="card-title">${item.artist}</h5>
           <p class="image-price">$${item.price}</p>
         </div>
        <div class="title">
            <p>${item.title}</p>
        </div>
         <p class="card-text">${item.description}</p>
         </div>
     </div>`;
    evenOddCard();
  });
}
