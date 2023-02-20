const auctionStartButton = document.querySelector('.place-bid-btn');
const bidderList = document.querySelector('.bidder-list');
const bidAmount = document.querySelector('.bid-amount');
const inputCont = document.querySelector('.bid-input');
const currentAuctionBid = document.querySelector('.auction-price-bid');
const counterTitle = document.querySelector('.counter-title');
const returnBtn = document.querySelector('.return');
let span = document.querySelector('.timer');


function initAuctionPage() {
 
  returnBtn.addEventListener('click', function () {
    setTimeout(function () {
      location.hash = '#visitorHomePage';
    }, 500);
  });

  auctionStartButton.disabled = false;

  if (!isAuctioning) {
    
    auctionCardBox.style.display = 'none';
    return;
  }
  if (currentUser) {
    auctionStartButton.disabled = true;
  }

  noAuctionCont.style.display = 'none';
  auctionStartButton.addEventListener('click', startBid);

  function startBid() {
    if (bidAmount.value > highestBid) {
      highestBid = +bidAmount.value;
      currentAuctionBid.textContent = highestBid + '$';
      bidderList.innerHTML += `
    <div class="bidder-card">
      <p><span class="bid-amount">$ ${bidAmount.value}</span></p>
  </div>
    `;
      fetch('https://blooming-sierra-28258.herokuapp.com/bid', {
        method: 'POST',
        body: JSON.stringify({ amount: bidAmount.value }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.isBidding) {
            highestBid = data.bidAmount;
            currentAuctionBid.textContent = highestBid + '$';
            timer = timer + 60;
            bidderList.innerHTML += `
          <div class="other-bidder ">
            <p><span class="bid-amount">$ ${data.bidAmount}</span></p>
        </div>
          `;
          }
        });
      bidAmount.value = '';
    }
  }
}
let countdown = () => {
  if (start === 0) {
    start++;
    let id = setInterval(setTime, 1000);
    function setTime() {
      seconds = parseInt(timer);
      seconds = seconds < 10 ? '0' + seconds : seconds;
      span.textContent = seconds;
      if (--timer < 0) {
        clearInterval(id);
        auctionStartButton.disabled = false;
        counterTitle.innerHTML = `<h2 class'over-text'> The auction is over </h2>`;

        span.style.display = 'none';
        inputCont.style.display = 'none';
        parsedItem.priceSold = highestBid;
        localStorage.setItem('item', JSON.stringify(parsedItem));
        localStorage.setItem('highestBid', highestBid);

        items = items.map((item) => {
          if (parsedItem.id === item.id) {
            item.priceSold = highestBid;
            item.dateSold = new Date();
          }
          return item;
        });
        console.log(items);
      }
    }
  }
};
