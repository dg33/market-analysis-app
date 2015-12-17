var allProducts = [];
var productNames = ['boots', 'chair', 'scissors', 'water_can', 'wine_glass', 'banana', 'pen', 'dragon', 'sweep', 'shark', 'unicorn', 'usb', 'bag', 'cthulhu'];

function Product(name,path){
this.name=name;
this.path=path;
this.tally=0;
this.views=0;
allProducts.push(this);
}

function buildAlbum() {
for (var i= 0; i<productNames.length; i++) {
new Product(productNames[i], 'img/' + productNames[i] + '.jpg');
}
};

buildAlbum();


var productRank = {
  totalClicks: 0,
  leftObj: null,
  midObj: null,
  rightObj: null,

  leftEl: document.getElementById('img1'),
  middleEl: document.getElementById('img2'),
  rightEl: document.getElementById('img3'),
  resultsEl: document.getElementById('results_button'),
  resListEl:  document.getElementById('result_list'),


  getRandomIndex: function() {
    return Math.floor(Math.random() * productNames.length);
},

displayImages: function() {
productRank.leftObj = allProducts[productRank.getRandomIndex()];
productRank.middleObj = allProducts[productRank.getRandomIndex()];
productRank.rightObj = allProducts[productRank.getRandomIndex()];

if (productRank.leftObj === productRank.middleObj || productRank.leftObj === productRank.rightObj || productRank.middleObj == productRank.rightObj) {

productRank.displayImages();
}

productRank.leftEl.src = productRank.leftObj.path;
productRank.leftEl.id = productRank.leftObj.name;

productRank.middleEl.src = productRank.middleObj.path;
productRank.middleEl.id = productRank.middleObj.name;

productRank.rightEl.src = productRank.rightObj.path;
productRank.rightEl.id = productRank.rightObj.name;


},

showResults: function(){
  if(this.totalClicks % 15 === 0) {
    this.resultsEl.hidden = false;

  this.resultsEl.addEventListener('click', function(){
    // productRank.resListEl.innerHTML = '';
    console.log('result button was clicked');
      productRank.resultsEl.hidden = true;
      makeChart();

  // for(var i=0; i<allProducts.length; i++) {
  //   var liEl = document.createElement('li');
  //   liEl.textContent = allProducts[i].name + ' has ' + allProducts[i].tally + ' clicks';
  //   // productRank.resListEl.appendChild(liEl);
    //Make a list element
    //Give the list element content
    //Append the list element to the ul

  
  });

  }

}
};
  productRank.leftEl.addEventListener('click', function() {
    productRank.resListEl.innerHTML = '';
    productRank.totalClicks += 1;
    productRank.leftObj.tally += 1;
    console.log(productRank.leftObj.name + ' has ' + productRank.leftObj.tally);
    productRank.showResults();
    productRank.displayImages();
})

productRank.rightEl.addEventListener('click', function() {
  productRank.resListEl.innerHTML = '';
  productRank.totalClicks += 1;
  productRank.rightObj.tally += 1;
  console.log(productRank.rightObj.name + ' has ' + productRank.rightObj.tally);
  productRank.showResults();
  productRank.displayImages();
})

productRank.middleEl.addEventListener('click', function() {
  productRank.resListEl.innerHTML = '';
  productRank.totalClicks += 1;
  productRank.middleObj.tally += 1;
  console.log(productRank.middleObj.name + ' has ' + productRank.middleObj.tally);
  productRank.showResults();
  productRank.displayImages();
})

productRank.leftEl.addEventListener('click', productRank.dispayImages);
productRank.middleEl.addEventListener('click', productRank.dispayImages);
productRank.rightEl.addEventListener('click', productRank.dispayImages);

productRank.displayImages();

function makeChart() {

var productData = {
    labels: [],
    datasets: [
        {
            label: "My First dataset",
            fillColor: "rgba(220,220,220,0.5)",
            strokeColor: "rgba(220,220,220,0.8)",
            highlightFill: "rgba(220,220,220,0.75)",
            highlightStroke: "rgba(220,220,220,1)",
            data: []
        }
    ]
};
for(var i=0; i < allProducts.length; i++) {
  productData.labels.push(allProducts[i].name);
  productData.datasets[0].data.push(allProducts[i].tally);
}

var ctx = document.getElementById('product-chart').getContext('2d');
    var prods = new Chart(ctx).Bar(productData);
}
