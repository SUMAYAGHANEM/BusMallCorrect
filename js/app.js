'use strict';

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

let leftI;
let rightI;
let midI;

const container = document.getElementById('button1');
const but = document.createElement('button');
but.setAttribute('id', 'sumaya');
container.appendChild(but);
but.textContent = 'show result';
document.getElementById('sumaya').style.visibility = 'hidden';

// here
const imagesNames = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg',
  'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg',
  'scissors.jpg', 'shark.jpg', 'sweep.png', 'tauntaun.jpg', 'unicorn.jpg', 'usb.gif', 'water-can.jpg', 'wine-glass.jpg'];


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


for (let i = 0; i < imagesNames.length; i++) {
  new Images(imagesNames[i]);
}
//   console.log(Images.all);


// sumaya
function render()
{


  leftI = randomNumber(0, Images.all.length - 1);
  rightI = randomNumber(0, Images.all.length - 1);
  midI = randomNumber(0, Images.all.length - 1);


  while (rightI !== leftI && rightI !==midI && leftI !== midI)
  {

    leftImage.src = Images.all[leftI].path;
    leftImage.alt = Images.all[leftI].name;
    leftImage.title = Images.all[leftI].name;

    // console.log(leftI);

    rightImage.src = Images.all[rightI].path;
    rightImage.alt = Images.all[rightI].name;
    rightImage.title = Images.all[rightI].name;

    // console.log(rightI);


    midtImage.src = Images.all[midI].path;
    midtImage.alt = Images.all[midI].name;
    midtImage.title = Images.all[midI].name;


    // console.log(midI);


    leftI = randomNumber(0, Images.all.length - 1);
    rightI = randomNumber(0, Images.all.length - 1);
    midI = randomNumber(0, Images.all.length - 1);
    continue;

  }
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
    console.log(calc);

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
    const li = document.createElement('li');
    list.appendChild(li);
    li.textContent = `the name is: ${imagesNames[i]},the Votes are: ${Images.all[i].vote},and the Views are: ${Images.all[i].view}`;
  }
}

render();

