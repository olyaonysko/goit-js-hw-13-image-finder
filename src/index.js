import './styles.css';
import imagesService from './js/images-service';
import updateMarkup from './js/update-markup';
import onOpenHandler from './js/modal';
import loadMoreBtn from './js/components/load-more-btn';
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
  clearContainer();
  imagesService.resetPage();
  fetchImages();
  form.reset;
}

function fetchImages() {
  loadMoreButton.disable();

  imagesService.searchImages().then(images => {
    updateMarkup(images);
    loadMoreButton.show();
    loadMoreButton.enable();
  });
}

function clearContainer() {
  refs.imagesContainer.innerHTML = '';
}
