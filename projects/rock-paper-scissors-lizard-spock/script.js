const popUps = document.querySelectorAll('.pop-up');
const xMarks = document.querySelectorAll('.x-mark-wrapper');

/*
Manage pop-ups
*********************/

document.querySelector('.rules-button-wrapper').addEventListener('click', () => {
  document.documentElement.scrollTo({top: 0, behavior: 'smooth'});

  popUps.forEach(popUp => {
    if (popUp.classList.contains('rules-container')) {
      popUp.classList.add('reveal');
    }
  });
});

xMarks.forEach(xMark => {
  xMark.addEventListener('click', () => {
    popUps.forEach(popUp => {
      popUp.classList.remove('reveal');
    });
  });
});