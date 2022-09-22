import { renderCards } from './renderers.js';
import { state } from './app.js';

export const handleMenuButtonClick = ({ target }) => {
  target.src.includes('bars-solid.svg')
    ? target.setAttribute('src', './img/xmark-solid.svg')
    : target.setAttribute('src', './img/bars-solid.svg');
  document.getElementById('aside').classList.toggle('hidden');
};

const toggleFocusOfGroupOfButtons = (currentButton, buttonClass) => {
  document.querySelectorAll(`.${buttonClass}`).forEach((button) => {
    if (currentButton === button) {
      button.classList.add('is-pressed');
    } else {
      button.classList.remove('is-pressed');
    }
  });
};

const handleGroupOfButtons = ({ target }, buttonClass) => {
  const currentButton =
    target.tagName === 'IMG' ? target.parentElement : target;
  if (currentButton.classList.contains('is-pressed')) return;
  toggleFocusOfGroupOfButtons(currentButton, buttonClass);
  const value = currentButton.dataset.type.split(' ');
  if (value[0] === 'filter') {
    state.filter[value[1]] = value[2];
  }
  if (value[0] === 'sort') {
    state.sort = value[1];
  }
  state.prepareArrayToRender();
  renderCards(state.arrayToRender);
};

export const handleFilterByGenderButtonClick = (target) => {
  handleGroupOfButtons(target, 'filter-gender-button');
};

export const handleSortButtonClick = (target) => {
  handleGroupOfButtons(target, 'sort-button');
};

export const handleNameInputChange = ({ target }) => {
  state.filter.name = target.value;
  state.prepareArrayToRender();
  renderCards(state.arrayToRender);
};

export const handleMinAndMaxAgeInput = ({ target }) => {
  const current = target.id.split('-')[0];
  const opposite = current === 'max' ? 'min' : 'max';
  const newValue = target.value;
  let valueToUse;
  if (newValue < target.min) {
    valueToUse = target.min;
  } else if (newValue > target.max) {
    valueToUse = target.max;
  } else {
    valueToUse = newValue;
  }
  target.setAttribute('value', valueToUse);
  document
    .getElementById(`${opposite}-age-input`)
    .setAttribute(`${current}`, valueToUse);
  state.filter[`${current}Age`] = valueToUse;
  state.prepareArrayToRender();
  renderCards(state.arrayToRender);
};
