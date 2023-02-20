function initVisitorHomePage() {
  imgSlider();
}

function imgSlider() {
  const sliderToRight = document.querySelector(".sliderToRight");
  const sliderToLeft = document.querySelector(".sliderToLeft");

  const filterImg = items.filter((item) => item.image);

  function showSliderImg(div, item) {
    item.forEach((item) => {
      div.innerHTML += `
      <img 
      class="slider-img" 
      src=${item.image}
       alt=${item.title}/>`;
    });

    const sliderImg = document.querySelectorAll(".slider-img");

    sliderImg.forEach((img) =>
      img.addEventListener("click", function () {
        location.hash = "#visitorListingPage";
      })
    );
  }

  showSliderImg(sliderToRight, filterImg);
  showSliderImg(sliderToLeft, filterImg);
}
