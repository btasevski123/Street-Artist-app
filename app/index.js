let currentUser;
let editingItem;
const visitorHomePage = document.querySelector("#visitorHomePage");
const visitorListingPage = document.querySelector("#visitorListingPage");
const visitorFilterPage = document.querySelector("#visitorFilterPage");
const artistHomePage = document.querySelector("#artistHomePage");
const artistItemsPage = document.querySelector("#artistItemsPage");
const addNewItemPage = document.querySelector("#addNewItemPage");
const auctionPage = document.querySelector(".auction-block");
const captureImagePopup = document.querySelector("#captureImagePopup");
const artistItemWrapper = document.querySelector(".artist-items-wrapper");
const autionBtn = document.querySelector(".auction-btn");
const hamburgerMenu = document.querySelector(".hamburger-menu");

function handleRoute() {
  let JoinAsVisitor = document.querySelector("#joinAsVisitor");
  let JoinAsArtist = document.querySelector("#joinAsArtist");

  JoinAsVisitor.addEventListener("click", function () {
    location.hash = "#visitorHomePage";
  });
  JoinAsArtist.addEventListener("click", function () {
    location.hash = "#artistHomePage";
  });

  const hash = location.hash;
  const allPages = document.querySelectorAll("section.page");
  allPages.forEach((page) => (page.style.display = "none"));

  switch (hash) {
    case "#visitorHomePage":
      visitorHomePage.style.display = "block";
      hamburgerMenu.style.display = "none";
      autionBtn.style.display = "block";
      initVisitorHomePage();
      break;

    case "#visitorListingPage":
      visitorListingPage.style.display = "block";
      hamburgerMenu.style.display = "none";

      initVisitorListingPage();
      break;
    case "#visitorFilterPage":
      visitorFilterPage.style.display = "block";
      hamburgerMenu.style.display = "none";
      populateSelect("#artist");
      populateType("#type");
      break;
    case "#artistHomePage":
      artistHomePage.style.display = "block";
      autionBtn.style.display = "none";
      hamburgerMenu.style.display = "block";

      userTitle();
      initArtistHomePage();
      break;
    case "#artistItemsPage":
      artistItemsPage.style.display = "block";
      autionBtn.style.display = "none";

      initArtistItemsPage();
      autionBtn.style.display = "none";
      break;
    case "#addNewItemPage":
      addNewItemPage.style.display = "block";
      autionBtn.style.display = "none";
      initArtistItemsPage();
      break;
    case "#captureImagePopup":
      captureImagePopup.style.display = "block";
      autionBtn.style.display = "none";
      initCaptureImagePopup();
      break;

      case "#auctionPage":
        auctionPage.style.display = "block";
        autionBtn.style.display = "none";
        initAuctionPage()
        break;

    default:
      document.querySelector("#landingPage").style.display = "block";
      hamburgerMenu.style.display = "none";
      autionBtn.style.display = "none";

      initLandingPage();
  }
}

window.addEventListener("hashchange", handleRoute);
window.addEventListener("load", handleRoute);
