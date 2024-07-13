// function to fetch chart data
async function getChartData() {
    const url = "https://stocks3.onrender.com/api/stocks/getstocksdata";
  
    const response = await fetch(url);
    const result = await response.json();
    chartData = result.stocksData[0];
    
  }
  
  // function to fetch stock summery
  async function getStockSummery() {
    const url = "https://stocks3.onrender.com/api/stocks/getstocksprofiledata";
    const response = await fetch(url);
    const result = await response.json();
    stockSummery = result.stocksProfileData[0];
  }
  
  //function to fetch stock stats data
  
  async function getStatsData() {
    const url = "https://stocks3.onrender.com/api/stocks/getstockstatsdata";
    const response = await fetch(url);
    const result = await response.json();
    stockDetails = result.stocksStatsData[0];
    console.log(stockDetails);
  }
  
  // function to update stock summary and stockStatData
  async function updateStockInfo(stockName = "AAPL") {
    await getStockSummery();
    const summary = stockSummery[stockName].summary;
  
    await getStatsData();
    const stocksName = stockName;
    const bookvalue = stockDetails[stockName].bookValue;
    const profit = stockDetails[stockName].profit;
  
    document.querySelector(".stockName").textContent = stocksName;
    document.querySelector(".profit").textContent = profit + "%";
    document.querySelector(".bookValue").textContent = "$" + bookvalue;
    document.querySelector(".description").textContent = summary;
  }
  updateStockInfo();
  
  // function to create chart
  
  const ctx = document.getElementById("myChart");
  let chart = new Chart(ctx, {
    type: "line",
    data: {},
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
  
  async function createChart(stockName = "AAPL", duration = "1mo") {
    await getChartData();
  
    const label = chartData[stockName][duration]["timeStamp"];
    const updateLabel = label.map((timeStamp) => {
      return new Date(timeStamp * 1000).toLocaleDateString();
    });
    chart.destroy();
    chart = new Chart(ctx, {
      type: "line",
      
      data: {
        labels: updateLabel,
        datasets: [
          {
            label: "stock price",
            data: chartData[stockName][duration]["value"],
            borderWidth: 2,
            radius: 0,
            borderColor: "blue",
          },
        ],
      },
      options: {
        scales: {
          x: {
            ticks: {
              display: false,
            },
            grid: {
              display: false,
            },
          },
          y: {
            ticks: {
              display: false,
            },
            grid: {
              display: false,
            },
            beginAtZero: true,
          },
        },
        
      },
    });
  }
  
  createChart();
  // ==========

  
  
  // function to call data for queue
  
  const stocks = [
    "AAPL",
    "MSFT",
    "GOOGL",
    "AMZN",
    "PYPL",
    "TSLA",
    "JPM",
    "NVDA",
    "NFLX",
    "DIS",
  ];
  
  async function getStockStats(stock) {
    const url = "https://stocks3.onrender.com/api/stocks/getstockstatsdata";
    const response = await fetch(url);
    const data = await response.json();
  
    profit = data.stocksStatsData[0][stock].profit;
    bookValue = data.stocksStatsData[0][stock].bookValue;
  }
  
  stocks.forEach(async function (stock) {
    await getStockStats(stock);
  
    const list = document.querySelector(".stockQueue");
  
    const div = document.createElement("div");
    div.className = "queueElement";
    list.appendChild(div);
  
    const btn = document.createElement("button");
    btn.className = "stock-btn";
    btn.textContent = stock;
    div.appendChild(btn);
  
    btn.addEventListener("click", () => {
      updateStockInfo(stock);
      createChart(stock);
    });
  
    const span1 = document.createElement("span");
    span1.className = "profit";
    span1.textContent = profit;
    div.appendChild(span1);
  
    const span2 = document.createElement("span");
    span2.className = "bookValue";
    span2.textContent = bookValue;
    div.appendChild(span2);
  });
  
  function dur_btn(stockName) {
    const btn_1mo = document.getElementById("1mo-btn");
    btn_1mo.addEventListener("click", () => {
      createChart(stockName, "1mo");
    });
  
    const btn_3mo = document.getElementById("3mo-btn");
    btn_3mo.addEventListener("click", () => {
      createChart(stockName, "3mo");
    });
  
    const btn_1y = document.getElementById("1y-btn");
    btn_1y.addEventListener("click", () => {
      createChart(stockName, "1y");
    });
  
    const btn_5y = document.getElementById("5y-btn");
    btn_5y.addEventListener("click", () => {
      createChart(stockName, "5y");
    });
  }
  
  dur_btn("AAPL");
  
 
  