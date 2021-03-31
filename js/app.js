'use strict';

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;

}

let leftI;
let rightI;
let midI;
let votes = [];
let views = [];


// creating a button :
const container = document.getElementById('button1');
const but = document.createElement('button');
but.setAttribute('id', 'sumaya');
container.appendChild(but);
but.textContent = 'show result';
document.getElementById('sumaya').style.visibility = 'hidden';


// names array:
const imagesNames = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg',
  'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg',
  'scissors.jpg', 'shark.jpg', 'sweep.png', 'tauntaun.jpg', 'unicorn.jpg', 'usb.gif', 'water-can.jpg', 'wine-glass.jpg'];
// console.log(imagesNames);

//   creating images var:
const imagesSection = document.getElementById('images-referance');
const leftImage = document.getElementById('left-image');
const rightImage = document.getElementById('right-image');
const midtImage = document.getElementById('mid-image');


function Images(name) {
  this.name = name;
  this.path =`./images/${name}`;
  this.vote = 0;
  this.view = 0;
  Images.all.push(this);


  
}

Images.all = [];




// sumaya
function render()
{

  let holder=document.getElementById('result').value;
  let filter=imagesNames.filter(a=> !holder.includes(a));
  // console.log(filter);
  // console.log(holder);

  for (let i = 0; i < filter.length; i++) {
    new Images(filter[i]);
  }

  leftI = randomNumber(0, filter.length - 1);
  rightI = randomNumber(0,filter.length - 1);
  midI = randomNumber(0,filter.length - 1);



  while (rightI === leftI || rightI === midI ||leftI === midI)
  {

    leftI = randomNumber(0, filter.length - 1);
    rightI = randomNumber(0, filter.length - 1);
    midI = randomNumber(0,filter.length - 1);
    // console.log('leftI '+ leftI);
    // console.log('righti ' +rightI);
    // console.log('midI' +midI);

  }
  // console.log('!=');
  document.getElementById('result').value=Images.all[rightI].name+','+Images.all[leftI].name+','+Images.all[midI].name;

  leftImage.src = Images.all[leftI].path;
  leftImage.alt = Images.all[leftI].name;
  leftImage.title = Images.all[leftI].name;


  rightImage.src = Images.all[rightI].path;
  rightImage.alt = Images.all[rightI].name;
  rightImage.title = Images.all[rightI].name;



  midtImage.src = Images.all[midI].path;
  midtImage.alt = Images.all[midI].name;
  midtImage.title = Images.all[midI].name;
}

imagesSection.addEventListener('click', result);
let calc = 1;

function result(event) {
  if (event.target.id !== 'images-referance') {
    if (event.target.id === rightImage.id) {
      Images.all[rightI].vote++;
      Images.all[rightI].view++;
      Images.all[leftI].view++;
      Images.all[midI].view++;
      calc = calc + 1;
    }
    if (event.target.id === leftImage.id) {
      Images.all[leftI].vote++;
      Images.all[leftI].view++;
      Images.all[leftI].view++;
      Images.all[rightI].view++;
      calc = calc + 1;

    }
    if (event.target.id === midtImage.id) {
      Images.all[midI].vote++;
      Images.all[midI].view++;
      Images.all[midI].view++;
      Images.all[rightI].view++;
      calc = calc + 1;
    }
    // console.log(calc);

    // chartRender();

  }
  //   console.table(Images.all);


  render();

  let maxCalc = 26;

  if (calc === maxCalc) {

    document.getElementById('sumaya').style.visibility = 'visible';
  }
  // if (calc > maxCalc)
  // {
  //     document.getElementById('sumaya').style.visibility = 'hidden';
  // }
  if (calc>=maxCalc)
  {
    imagesSection.removeEventListener('click', result);

  }

}

but.addEventListener('click',funn);
function funn ()
{
  const article=document.getElementById('art');
  const list = document.createElement('ul');
  article.appendChild(list);
  for (let i=0; i<imagesNames.length;i++){
    votes.push(Images.all[i].vote);
    views.push(Images.all[i].view);
    const li = document.createElement('li');
    list.appendChild(li);
    li.textContent = `the name is: ${imagesNames[i]},the Votes are: ${Images.all[i].vote},and the Views are: ${Images.all[i].view}`;
    chartRender();
    settingItem();
  }
}

render();




function chartRender() {
  let ctx = document.getElementById('MyChart').getContext('2d');
  let chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'bar',

    // The data for our dataset
    data: {
      labels: imagesNames,
      datasets: [{
        label: 'Images Votes',
        backgroundColor: 'red',
        borderColor: 'rgb(255, 99, 132)',
        data: votes
      },
      {
        label: 'Images Views',
        backgroundColor: 'yellow',
        borderColor: 'rgb(255, 99, 132)',
        data: views
      }]
    },

    // Configuration options go here
    options: {}
  });
}

// localstorage
function settingItem() {
  let data = JSON.stringify(Images.all);
  localStorage.setItem('Images', data);
}

function gettingItem() {
  let stringObj = localStorage.getItem('votes');

  let normalObj = JSON.parse(stringObj);

  if (normalObj !== null) {

    Images.all = normalObj;
  }
  render();
}

gettingItem();
