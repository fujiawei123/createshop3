// listing vars here so they're in the global scope
var cards, nCards, cover, openContent, openContentText, pageIsOpen = false,
    openContentImage, closeContent, windowWidth, windowHeight, currentCard;

// initiate the process
init();

function init() {
  resize();
  selectElements();
  attachListeners();
}

// select all the elements in the DOM that are going to be used
function selectElements() {
  cards = document.getElementsByClassName('card'),
  nCards = cards.length,
  cover = document.getElementById('cover'),
  openContent = document.getElementById('open-content'),
  openContentText = document.getElementById('open-content-text'),
  openContentImage = document.getElementById('open-content-image')
  closeContent = document.getElementById('close-content');
}

/* Attaching three event listeners here:
  - a click event listener for each card
  - a click event listener to the close button
  - a resize event listener on the window
*/
function attachListeners() {
  for (var i = 0; i < nCards; i++) {
    attachListenerToCard(i);
  }
  closeContent.addEventListener('click', onCloseClick);
  window.addEventListener('resize', resize);
}

function attachListenerToCard(i) {
  cards[i].addEventListener('click', function(e) {
    var card = getCardElement(e.target);
    onCardClick(card, i);
  })
}

/* When a card is clicked */
function onCardClick(card, i) {
  // set the current card
  currentCard = card;
  // add the 'clicked' class to the card, so it animates out
  currentCard.className += ' clicked';
  // animate the card 'cover' after a 500ms delay
  setTimeout(function() {animateCoverUp(currentCard)}, 500);
  // animate out the other cards
  animateOtherCards(currentCard, true);
  // add the open class to the page content
  openContent.className += ' open';
}

/*
* This effect is created by taking a separate 'cover' div, placing
* it in the same position as the clicked card, and animating it to
* become the background of the opened 'page'.
* It looks like the card itself is animating in to the background,
* but doing it this way is more performant (because the cover div is
* absolutely positioned and has no children), and there's just less
* having to deal with z-index and other elements in the card
*/
function animateCoverUp(card) {
  // get the position of the clicked card
  var cardPosition = card.getBoundingClientRect();
  // get the style of the clicked card
  var cardStyle = getComputedStyle(card);
  setCoverPosition(cardPosition);
  setCoverColor(cardStyle);
  scaleCoverToFillWindow(cardPosition);
  // update the content of the opened page
  openContentText.innerHTML = '<h1>'+card.children[2].textContent+'</h1>'+paragraphText;
  openContentImage.src = card.children[1].src;
  setTimeout(function() {
    // update the scroll position to 0 (so it is at the top of the 'opened' page)
    window.scroll(0, 0);
    // set page to open
    pageIsOpen = true;
  }, 300);
}

function animateCoverBack(card) {
  var cardPosition = card.getBoundingClientRect();
  // the original card may be in a different position, because of scrolling, so the cover position needs to be reset before scaling back down
  setCoverPosition(cardPosition);
  scaleCoverToFillWindow(cardPosition);
  // animate scale back to the card size and position
  cover.style.transform = 'scaleX('+1+') scaleY('+1+') translate3d('+(0)+'px, '+(0)+'px, 0px)';
  setTimeout(function() {
    // set content back to empty
    openContentText.innerHTML = '';
    openContentImage.src = '';
    // style the cover to 0x0 so it is hidden
    cover.style.width = '0px';
    cover.style.height = '0px';
    pageIsOpen = false;
    // remove the clicked class so the card animates back in
    currentCard.className = currentCard.className.replace(' clicked', '');
  }, 301);
}

function setCoverPosition(cardPosition) {
  // style the cover so it is in exactly the same position as the card
  cover.style.left = cardPosition.left + 'px';
  cover.style.top = cardPosition.top + 'px';
  cover.style.width = cardPosition.width + 'px';
  cover.style.height = cardPosition.height + 'px';
}

function setCoverColor(cardStyle) {
  // style the cover to be the same color as the card
  cover.style.backgroundColor = cardStyle.backgroundColor;
}

function scaleCoverToFillWindow(cardPosition) {
  // calculate the scale and position for the card to fill the page,
  var scaleX = windowWidth / cardPosition.width;
  var scaleY = windowHeight / cardPosition.height;
  var offsetX = (windowWidth / 2 - cardPosition.width / 2 - cardPosition.left) / scaleX;
  var offsetY = (windowHeight / 2 - cardPosition.height / 2 - cardPosition.top) / scaleY;
  // set the transform on the cover - it will animate because of the transition set on it in the CSS
  cover.style.transform = 'scaleX('+scaleX+') scaleY('+scaleY+') translate3d('+(offsetX)+'px, '+(offsetY)+'px, 0px)';
}

/* When the close is clicked */
function onCloseClick() {
  // remove the open class so the page content animates out
  openContent.className = openContent.className.replace(' open', '');
  // animate the cover back to the original position card and size
  animateCoverBack(currentCard);
  // animate in other cards
  animateOtherCards(currentCard, false);
}

function animateOtherCards(card, out) {
  var delay = 100;
  for (var i = 0; i < nCards; i++) {
    // animate cards on a stagger, 1 each 100ms
    if (cards[i] === card) continue;
    if (out) animateOutCard(cards[i], delay);
    else animateInCard(cards[i], delay);
    delay += 100;
  }
}

// animations on individual cards (by adding/removing card names)
function animateOutCard(card, delay) {
  setTimeout(function() {
    card.className += ' out';
   }, delay);
}

function animateInCard(card, delay) {
  setTimeout(function() {
    card.className = card.className.replace(' out', '');
  }, delay);
}

// this function searches up the DOM tree until it reaches the card element that has been clicked
function getCardElement(el) {
  if (el.className.indexOf('card ') > -1) return el;
  else return getCardElement(el.parentElement);
}

// resize function - records the window width and height
function resize() {
  if (pageIsOpen) {
    // update position of cover
    var cardPosition = currentCard.getBoundingClientRect();
    setCoverPosition(cardPosition);
    scaleCoverToFillWindow(cardPosition);
  }
  windowWidth = window.innerWidth;
  windowHeight = window.innerHeight;
}

var paragraphText = '<p>我们总会因比我们更伟大的事物，而燃起深深的欲望。\这就是为什么我们有了宗教、英雄、国家、部落、俱乐部、队伍、对立面、社会和执政党。\利用人类的这种本能，找到一个比自己更大的品牌产品，然后放在最受自己尊重的位子上。\你可以为一些无形的事物庆祝，像是一种精神、人的品质、态度、生活方式或者是一个思想学派。\你可以赞美一个人或一群人；\你可以赞美一个东西或一个地方。\你甚至可以赞美一个特定的时代、一个黄金时代、一段时间的旅程或是一个历史留下的遗迹。\但要不惜一切代价，避免自己因诱惑，而将自己的品牌放在那个被人赞美，或是歌颂的位子上。\没有任何一个品牌会自己褒奖自己，毕竟没有人会喜欢一个自恋狂。相反的是，这是一个可以通过更广泛和神圣的理想，去创建品牌与客户之间关联的手段。<iframe  width="560" height="350" src="https://www.youtube.com/embed/wu-spyQNwfs" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></p>' 
