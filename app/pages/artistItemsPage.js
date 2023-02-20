
function initArtistItemsPage() {
  addNewItem();
  navigateToAddNewPage()
}


function createArtistCard(item) {
  const { id, image, title, dateCreated, price, description, isPublished } =
    item;

  const mainDiv = document.createElement('div');
  mainDiv.classList.add('card', 'card-one', 'artist-card');
  mainDiv.setAttribute('id', id);

  const imageEl = document.createElement('img');
  imageEl.classList.add('card-img-top');
  imageEl.src = image;

  const artistCardBody = document.createElement('div');
  artistCardBody.classList.add('card-body');

  const cardTitle = document.createElement('div');
  cardTitle.setAttribute('id', 'card-title');
  const infoDiv = document.createElement('div');
  infoDiv.classList.add('info');
  const infoParagraph = document.createElement('p');
  infoParagraph.classList.add('item-title');
  infoParagraph.textContent = title;

  const cardDate = document.createElement('h5');
  cardDate.classList.add('card-date');

  cardDate.textContent = formatDate(dateCreated);

  const cardPrice = document.createElement('div');
  cardPrice.classList.add('price');

  const cardDrawingPrice = document.createElement('h5');
  cardDrawingPrice.classList.add('drawing-price');
  cardDrawingPrice.textContent = price + '$';

  const cardText = document.createElement('div');
  cardText.classList.add('card-text');
  const cardDesc = document.createElement('p');
  cardDesc.textContent = description;

  const cardFooter = document.createElement('div');
  cardFooter.classList.add('card-footer');

  const auctionButton = document.createElement('button');
  auctionButton.classList.add('auction');

  auctionButton.textContent = 'Send to Auction';
  const publishButton = document.createElement('button');
  publishButton.classList.add(
    'publish', 'btn',
    `btn-${isPublished ? 'success' : 'secondary'}`
  );
  publishButton.textContent = isPublished ? 'Unpublish' : 'Publish';

  const deleteButton = document.createElement('button');
  deleteButton.classList.add('remove');
  deleteButton.textContent = 'Remove';
  const editButton = document.createElement('button');
  editButton.classList.add('edit-btn');

  editButton.textContent = 'Edit';

  mainDiv.append(imageEl, artistCardBody, cardFooter);
  artistCardBody.append(cardTitle, cardText);
  cardText.append(cardDesc);
  cardTitle.append(infoDiv, cardPrice);
  infoDiv.append(infoParagraph, cardDate);
  cardPrice.append(cardDrawingPrice);
  cardFooter.append(auctionButton, publishButton, deleteButton, editButton);

  deleteButton.addEventListener('click', function (e) {
    let parentEl = e.currentTarget.parentElement.parentElement;

    let isConfirmed = confirm('Are you sure?');
    if (isConfirmed) {
      parentEl.remove();
      items = items.filter((el) => el.id !== item.id);
      showItemsList();
    } else {
      return;
    }
  });

  publishButton.addEventListener('click', function () {
    if (item.isPublished == true) {
      publishButton.textContent = 'Unpublish';
      publishButton.classList.remove('btn-success');
      publishButton.classList.add('btn-secondary');
      item.isPublished = false;
    } else if (item.isPublished == false) {
      item.isPublished = true;
      publishButton.textContent = 'Publish';
      publishButton.classList.add('btn-success');
      publishButton.classList.remove('btn-secondary');
    }
    showItemsList();
  });
  editButton.addEventListener('click', function () {
    fillCreateItemForm(item);
    location.hash = '#addNewItemPage';
  });
  auctionButton.addEventListener('click', function () {
    const auctionImage = document.querySelector('.auction-img');
    const auctionImageDesc = document.querySelector('.auction-img-desc');
    const auctionImagePrice = document.querySelector('.auction-img-price');

    auctionImage.src = item.image;
    auctionImageDesc.textContent = item.description;
    auctionImagePrice.textContent = item.price + ' $';
    localStorage.setItem('item', JSON.stringify(item));
    isAuctioning = true;
    location.hash = '#auctionPage';
    countdown();
  });
  return mainDiv;
}

function fillCreateItemForm(item) {
  const submitBtn = document.querySelector(".addItem");
  submitBtn.textContent = "Update";
  editingItem = item;

  let title = document.querySelector("#newItemTitle");
  let desc = document.querySelector("#newItemDesc");
  let type = document.querySelector("#newItemType");
  let price = document.querySelector("#newItemPrice");
  let imageUrl = document.querySelector("#newItemimageUrl");
  let isPublished = document.querySelector("#isPublished");

  title.value = item.title;
  type.value = item.type;
  imageUrl.value = item.image;
  isPublished.checked = item.isPublished;
  desc.value = item.description;
  price.value = item.priceSold;
}
function addNewItem() {
  const form = document.querySelector(".add-item-form");
  const artistItemsCard = document.querySelector(".artist-items-wrapper");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    let title = document.querySelector("#newItemTitle");
    let desc = document.querySelector("#newItemDesc");
    let type = document.querySelector("#newItemType");
    let price = document.querySelector("#newItemPrice");
    let url = document.querySelector("#newItemimageUrl");

    let isPublished = document.querySelector("#isPublished");
    let date = formatDate(new Date());
    if (!title.value || !type.value || !price.value) {
      return;
    }
   
    if (captureImageURL) {
      url.textContent = '';
      url.value = '';
    }

    if (editingItem) {
      const index = items.indexOf(editingItem);
      items[index] = {
        id: editingItem.id,
        title: title.value,
        description: desc.value,
        type: type.value,
        image: url.value,
        price: price.value,
        artist: currentUser,
        dateCreated: editingItem.dateCreated,
        isPublished: isPublished.checked,
        isAuctioning: false,
        priceSold: editingItem.priceSold || 0,
      };
      editingItem = undefined;
      showList();
      const submitBtn = document.querySelector(".addItem");
      submitBtn.textContent = "Add";
    } else {
      const item = {
        id: new Date().valueOf(),
        title: title.value,
        description: desc.value,
        type: type.value,
        image: url.value || captureImageURL,
        price: price.value,
        artist: currentUser,
        dateCreated: date,
        isPublished: isPublished.checked,
        isAuctioning: false,
        priceSold: 0,
      };
      items.unshift(item);
      const card = createArtistCard(item);
      artistItemsCard.appendChild(card);
    }


   
    document.querySelector('#preview').src = '';
    camera.style.display = 'block';
    snaptitle.style.display = 'block';


    form.reset();
    showItemsList();
    location.hash = "#artistItemsPage";
  });
  $(".cancelItem").on("click", () => {
    location.hash = "#artistItemsPage";
  });
}
function navigateToAddNewPage() {
    const addItemPara = document.querySelector('.add-item');
    addItemPara.addEventListener('click', function () {
      location.hash = '#addNewItemPage';
    });
  }