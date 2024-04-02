/*
Reveal and hide rules
*********************/

document.querySelector('.rules-button-wrapper').addEventListener('click', () => {
  document.documentElement.scrollTo({top: 0, behavior: 'smooth'});
  document.querySelector('.rules-container').classList.add('reveal');
});

document.querySelector('.x-mark-wrapper').addEventListener('click', () => {
  document.querySelector('.rules-container').classList.remove('reveal');
});