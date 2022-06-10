'use strict';

const btnScrollTo=document.querySelector('.btn--scroll-to');
const sec1 =document.querySelector('#section--1');
const sec2 =document.querySelector('#section--2');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const tabBtns=document.querySelectorAll('.operations__tab');
const btnContainer=document.querySelector('.operations__tab-container');
const tabContent=document.querySelectorAll('.operations__content');
const nav=document.querySelector('.nav');
const sec1Coords=sec1.getBoundingClientRect();
const header=document.querySelector('header');
const navHeight = nav.getBoundingClientRect().height;
//only select images with this data-src attribute
const images=document.querySelectorAll('img[data-src]');
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
//const btnc=btnScrollTo.getBoundingClientRect();

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

//a tabbed component
btnContainer.addEventListener('click',function(e){
  const clicked=e.target.closest('.operations__tab');
  if(!clicked)return;
  tabBtns.forEach(btn=>{
    btn.classList.remove('operations__tab--active')
  });
  tabContent.forEach(c=>{
    c.classList.remove('operations__content--active');
  })
  clicked.classList.add('operations__tab--active');
  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active');
})

// btnContainer.addEventListener('click',function(e){
//   //find the closest element contain this class
//   const clicked =e.target.closest('.operations__tab');
//   //guard clause
//   if(!clicked)return;
//   //remove active class
//   tabBtns.forEach(tab=>{
//     tab.classList.remove('operations__tab--active');
//   });
//   tabContent.forEach(c=>{
//     c.classList.remove('operations__content--active')
//   });
//   //active tab
//   clicked.classList.add('operations__tab--active');
//   //active content 
//   document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active');
// })

//fadeout hover effect (aka passing argument to event handler)
function hoverEffect(e){
  if(e.target.classList.contains('nav__link')){
    const link=e.target;
    const siblings=link.closest('nav').querySelectorAll('.nav__link');
    const logo=link.closest('nav').querySelector('img');

    siblings.forEach(s=>{
      if(s!==link){
        // console.log(this);
        s.style.opacity=this;
      }})
    logo.style.opacity=this;   
  }
}

nav.addEventListener('mouseover',hoverEffect.bind(0.5));

nav.addEventListener('mouseout',hoverEffect.bind(1));

//adding a scroll (the old way)
// window.addEventListener('scroll',()=>{
//   if(window.scrollY>sec1Coords.top)nav.classList.add('sticky');
//   else nav.classList.remove('sticky');
// })

//the better way
const navSticky=function(entries){
  const [e]=entries;
  if(!e.isIntersecting)nav.classList.add('sticky');
  else nav.classList.remove('sticky');
}

const headerObserver=new IntersectionObserver(navSticky,{
  root:null,
  threshold:0,
  rootMargin:`-${navHeight}px`
})
headerObserver.observe(header);


//198 revealing elements on scroll
const allSections=document.querySelectorAll('.section');

const revealSection=function(entries,observer){
  const [e]=entries;
  if(!e.isIntersecting)return;
  e.target.classList.remove('section--hidden');

  //remove observation
  observer.unobserve(e.target);
}

const sectionObserver=new IntersectionObserver(revealSection,{
  root:null,
  threshold:0.15
});

allSections.forEach(sec=>{
  sec.classList.add('section--hidden');
  sectionObserver.observe(sec);
})

//199 lazy loading images
const loadImg=(entries,observer)=>{
  const [entry]=entries;
  if(!entry.isIntersecting)return;
  entry.target.src=entry.target.dataset.src;

  entry.target.addEventListener('load',()=>{
    entry.target.classList.remove('lazy-img');
  })
  

  observer.unobserve(entry.target); 
}

const imgObserver=new IntersectionObserver(loadImg,{
  root:null,
  threshold:0,
  rootMargin:"150px"
})

images.forEach(img=>{
  imgObserver.observe(img);
})

// const changeOpacity=function(e){
//   if(e.target.classList.contains('nav__link')){
//     const link=e.target;
//     const siblings=link.closest('.nav').querySelectorAll('.nav__link');
//     const logo=link.closest('.nav').querySelector('img');
  
//     siblings.forEach(s=>{
//       if(s!==link){
//         s.style.opacity=this;
//       }
//       logo.style.opacity=this;
//     })
//   }
// }
//oneway
// nav.addEventListener('mouseover',function(e){
// changeOpacity(e,0.5);
// })

// nav.addEventListener('mouseout',function(e){
//   changeOpacity(e,1); 
// })

//better way
// nav.addEventListener('mouseover',changeOpacity.bind(0.5))

  
//   nav.addEventListener('mouseout',changeOpacity.bind(1));


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

//197 practicing intersectionobserver
// const obsCallback=(entries)=>{
//   const [entry]=entries;
//     if(entry.isIntersecting){
//       console.log(entry);
//       sec1.style.backgroundColor="pink";
//     }else sec1.style.backgroundColor="blue";
// };
// const obsOptions={
//   root:null,
//   treshold:0.1
// };

// const observer=new IntersectionObserver(obsCallback,obsOptions);
// observer.observe(nav);