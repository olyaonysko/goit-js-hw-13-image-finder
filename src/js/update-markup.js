import galleryItems from '../templates/gallery-items.hbs';
import refs from './refs';

function createMarkup(images) {
  refs.imagesContainer.insertAdjacentHTML('beforeend', galleryItems(images));
}

export default createMarkup;
