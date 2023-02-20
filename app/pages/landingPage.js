function initLandingPage() {
    populateSelect("#users")
}

function populateSelect(itemPage) {
    const select = document.querySelector(itemPage);
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((users) => {
        select.innerHTML = '<option value="">Choose</option>';
  
        users.forEach((user) => {
          select.innerHTML += `<option value="${user.name}">${user.name}</option>`;
        });
  
        select.addEventListener('change', function (e) {
          currentUser = e.target.value;
          showList();
        });
      });
  }

  function showList() {
    const artistItemsCard = document.querySelector('.artist-items-wrapper');
    const filteredList = items.filter((card) =>
      card.artist.includes(currentUser)
    );
    artistItemsCard.innerHTML = '';
    filteredList.forEach((item) => {
      const newCard = createArtistCard(item);
    
      artistItemsCard.append(newCard);
    });
  }

  