
//Part 1
var menuLinks = [
  { text: 'about', href: '/about' },
  { text: 'catalog', href: '#', subLinks: [
    { text: 'all', href: '/catalog/all' },
    { text: 'top selling', href: '/catalog/top' },
    { text: 'search', href: '/catalog/search' },
  ] },
  { text: 'orders', href: '#', subLinks: [
    { text: 'new', href: '/orders/new' },
    { text: 'pending', href: '/orders/pending' },
    { text: 'history', href: '/orders/history' },
  ] },
  { text: 'account', href: '#', subLinks: [
    { text: 'profile', href: '/account/profile' },
    { text: 'sign out', href: '/account/signout' },
  ] },
];

let mainEl = document.querySelector('main');
mainEl.style.backgroundColor = 'var(--main-bg)';
mainEl.innerHTML = '<h1>DOM Manipulation</h1>';
mainEl.classList.add('flex-ctr');

let topMenuEl = document.getElementById('top-menu');
topMenuEl.style.height = '100%';
topMenuEl.style.backgroundColor = 'var(--top-menu-bg)';
topMenuEl.classList.add('flex-around');

for (let link of menuLinks) {
  let aTag = document.createElement('a');
  aTag.setAttribute('href', link.href);
  aTag.textContent = link.text;
  topMenuEl.appendChild(aTag);
}

// Part 2
let subMenuEl = document.getElementById('sub-menu');
subMenuEl.style.height = '100%';
subMenuEl.style.backgroundColor = 'var(--sub-menu-bg)';
subMenuEl.classList.add('flex-around');
subMenuEl.style.position = 'absolute';
subMenuEl.style.top = '0';

let topMenuLinks = topMenuEl.querySelectorAll('a');

topMenuEl.addEventListener('click', function(event) {
  event.preventDefault();

  if (event.target.tagName.toLowerCase() !== 'a') {
    return;
  }
  console.log(event.target.textContent);

  let clickedLink = event.target;
  let linkObject = menuLinks.find(link => link.text === clickedLink.textContent);

  if (clickedLink.classList.contains('active')) {
    clickedLink.classList.remove('active');
  } else {
    clickedLink.classList.add('active');
  }

  for(let link of topMenuLinks) {
    if(link !== clickedLink) {
      link.classList.remove('active');
    }
  }

  if (!clickedLink.classList.contains('active')) {
    subMenuEl.style.top = '0';
  } else {
    if (linkObject.subLinks) {
      subMenuEl.style.top = '100%';
      createSubMenu(linkObject.subLinks);
    } else {
      subMenuEl.style.top = '0';
    }
  }
});

//helper function
function createSubMenu(subLinks) {
  subMenuEl.innerHTML = '';

  for (let link of subLinks) {
    let aTag = document.createElement('a');
    aTag.setAttribute('href', link.href);
    aTag.textContent = link.text;
    subMenuEl.appendChild(aTag);
  }
}

subMenuEl.addEventListener('click', function(event) {
  event.preventDefault();

  if (event.target.tagName.toLowerCase() !== 'a') {
    return;
  }

  console.log(event.target.textContent);

  subMenuEl.style.top = '0';

  for(let link of topMenuLinks) {
    link.classList.remove('active');
  }

  mainEl.innerHTML = `<h1>${event.target.textContent}</h1>`;
});