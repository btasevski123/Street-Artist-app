function initArtistHomePage() {
  dropdownNav();
  showChart();
  populateType("#newItemType")
  showItemsList();
}

function userTitle() {
  const logoText = document.querySelector(".nav-text");
  if (currentUser) {
    logoText.textContent = currentUser;
  } else if ((location.hash = "#")) {
    logoText.textContent = "Street ARTists";
  }
}

function dropdownNav() {
  $(".hamburger-menu").on("click", () => {
    $(".dropdown-list").slideToggle();
  });
}

function showChart() {
  const filteredItems = items.filter(
    (item) => item.artist === currentUser && !!item.priceSold
  );
  const labels = generateDates(14);
  const last7 = document.querySelector("#last-7-days");
  const last14 = document.querySelector("#last-14-days");
  const last30 = document.querySelector("#last-30-days");
  const newData = labels.map((label) => {
    let sum = 0;
    filteredItems.forEach((item) => {
      if (formatDate(item.dateSold) === label) {
        sum += item.priceSold;
      }
    });
    return sum;
  });
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Amount",
        backgroundColor: "#A16A5E",
        borderColor: "#A16A5E",
        data: newData,
      },
    ],
  };
  const config = {
    type: "bar",
    data: data,
    options: { indexAxis: "y" },
  };
  let myChart = new Chart(document.getElementById("myChart"), config);

  last7.addEventListener("click", function () {
    dataChart(7);
  });
  last14.addEventListener("click", function () {
    dataChart(14);
  });
  last30.addEventListener("click", function () {
    dataChart(30);
  });

  function dataChart(days) {
    const labels = generateDates(days);
    myChart.data.labels = labels;

    const Dates = labels.map((label) => {
      let sum = 0;
      filteredItems.forEach((item) => {
        if (formatDate(item.dateSold) === label) {
          sum += item.priceSold;
        }
      });
      return sum;
    });
    myChart.data.datasets[0].data = Dates;
    myChart.update();
  }
}

function generateDates(days) {
  const arr = [];

  const date = new Date();
  const msInDay = 24 * 60 * 60 * 1000;

  for (let i = 0; i < days; i++) {
    const newDate = new Date(date - i * msInDay);
    let modifiedDate = newDate.toLocaleDateString();
    arr.push(modifiedDate);
  }
  return arr;
}

function formatDate(date) {
  return new Date(date).toLocaleDateString("en-GB");
}

function showItemsList() {
  
  const soldItemsCont = document.querySelector("#artistItemsSold");
  const publishedItemsCont = document.querySelector("#artistPublishedItems");
  const incomeCont = document.querySelector(".income-text");

 
  const filteredItemslist = items.filter(
    (item) => item.artist === currentUser && item.isPublished
  );
 
  const soldItemsList = items.filter(
    (item) => item.artist === currentUser && item.isPublished && item.dateSold
  );

  
  let filteredSoldList = soldItemsList.length;
  let filteredListNum = filteredItemslist.length;

  
  let getNumbers = soldItemsList.map((item) => item.priceSold);
  let total = getNumbers.reduce((x, y) => x + y);

  
  incomeCont.textContent = "$" + total;
  soldItemsCont.textContent = filteredSoldList;
  publishedItemsCont.textContent = filteredListNum;
}
