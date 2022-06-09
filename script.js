'use strict';

const btnScrollTo=document.querySelector('.btn--scroll-to');
const sec1 =document.querySelector('#section--1');
const sec2 =document.querySelector('#section--2');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
///////////////////////////////////////
// Modal window
const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => {
  btn.addEventListener('click', openModal)
});
  

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

btnScrollTo.addEventListener('click',e=>{
const s1coord=sec1.getBoundingClientRect();
const btnc=btnScrollTo.getBoundingClientRect();

//the traditional way:
window.scrollTo({
  left:s1coord.x+window.pageXOffset,
  top:window.pageYOffset+s1coord.y,
  behavior:'smooth'}); 
//the very new way:
  //sec2.scrollIntoView({behavior:'smooth'});
})

//192 bubbling pagination
//Not so effective way:
// const allLinks = document.querySelectorAll('.nav__link');
// allLinks.forEach(link=>{
//   //don't use arrow function here, no this keyword
//   link.addEventListener('click',function(e){
//     e.preventDefault();
//     const id =this.getAttribute('href');
//     document.querySelector(id).scrollIntoView({behavior:"smooth"});
//   })
// })

//use dom bubbling:
const links=document.querySelector('.nav__links');
links.addEventListener('click',function(e){
  e.preventDefault();
  // console.log(this);
  // console.log(e.target);
  if(e.target.classList.contains('nav__link')){
    const id =e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({behavior:"smooth"});
  }
})



// lecture:
//create elements in html
// const emoj =document.createElement('div');
// emoj.innerHTML='<span>♥️</span>';
// const header =document.querySelector('header');
// header.prepend(emoj);
// header.append(emoj);
// //make a copy of the emoj element
// header.prepend(emoj.cloneNode(true));
// header.insertAdjacentHTML('beforebegin','<p>⭐️</p>');
// emoj.remove();

//style,class,attribute
// const logo=document.querySelector('header');
// console.log(getComputedStyle(logo).width);
// logo.style.width=Number.parseFloat(getComputedStyle(logo).width)*.7+'px';

//work with css variables:
//document.documentElement is the html root file(the whole html)
// document.documentElement.style.setProperty('--color-primary','pink');

//attributes
// const img=document.querySelector('.header__img');
// console.log(img.src); /*will get the absolute url*/
// console.log(img.alt);
// img.alt="my favorite food";
// console.log(img.alt);
// console.log(img.getAttribute('tim'));
// img.setAttribute('tim','a dog');
// console.log(img.getAttribute('tim'));
// console.log(img.getAttribute('src'));/*will get the relative url in the folder*/

// //data attributes
// const title=document.querySelector('title');
// console.log(title.dataset.cat);

//188 smooth scrolling
// const btnScrollTo=document.querySelector('.btn--scroll-to');
// const sec1 =document.querySelector('#section--1');
// const sec2 =document.querySelector('#section--2');
// btnScrollTo.addEventListener('click',e=>{
// const s1coord=sec1.getBoundingClientRect();
// console.log(s1coord);
// const btnc=btnScrollTo.getBoundingClientRect();
// console.log(btnc);

// console.log(window.pageXOffset,window.pageYOffset);

// //the traditional way:
// window.scrollTo({
//   left:s1coord.x+window.pageXOffset,
//   top:window.pageYOffset+s1coord.y,
//   behavior:'smooth'}); 
// //the very new way:
//   sec2.scrollIntoView({behavior:'smooth'});
// })

//189 remove an event listener
// function sayHi(){
//   console.log("hi there!");
// }
// sec1.addEventListener('mouseover',sayHi);
// setTimeout(()=>{
//   sec1.removeEventListener('mouseover',sayHi);
// },5000);