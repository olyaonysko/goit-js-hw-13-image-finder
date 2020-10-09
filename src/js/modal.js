import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';
export default function onOpenHandler(event) {
  if (event.target.nodeName === 'IMG') {
    const instance = basicLightbox.create(
      `<img src=${event.target.dataset.source}>`,
    );
    instance.show();
    console.log(event.target);
  }
}
