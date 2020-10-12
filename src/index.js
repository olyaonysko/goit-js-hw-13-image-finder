import './styles.css';
import imagesService from './js/images-service';
import updateMarkup from './js/update-markup';
import onOpenHandler from './js/modal';
import loadMoreBtn from './js/components/load-more-btn';
import { error } from '@pnotify/core/dist/PNotify.js';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import refs from './js/refs';

const loadMoreButton = new loadMoreBtn({
  selector: 'button[data-action="load-more"]',
  hidden: true,
});

refs.searchForm.addEventListener('submit', searchFormSubmitHandler);
refs.imagesContainer.addEventListener('click', onOpenHandler);
loadMoreButton.refs.button.addEventListener('click', fetchImages);

function searchFormSubmitHandler(event) {
  event.preventDefault();
  const form = event.currentTarget;
  imagesService.query = form.elements.query.value;
  if (!imagesService.query || !imagesService.query.trim()) {
     error({
        text: 'The field is empty.',
     });

    return;
  }
  clearContainer();
  imagesService.resetPage();
  fetchImages();
  form.reset;
}

function fetchImages() {
  loadMoreButton.disable();

  imagesService.searchImages().then(images => {
    if (images.length === 0) {
       error({
        text: 'Cannot find images. Try again.',
       });
      loadMoreBtn.hide()
    }
    updateMarkup(images);
    loadMoreButton.show();
    loadMoreButton.enable();
  }).catch(error => console.error(error));
}

function clearContainer() {
  refs.imagesContainer.innerHTML = '';
}
