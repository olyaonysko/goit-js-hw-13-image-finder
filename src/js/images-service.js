import axios from 'axios';

export default {
  searchQuery: '',
  page: 1,
  apiKey: '18638925-2c8019a9c3774592e4e395576',
  async searchImages() {
    const result = await axios.get(
      `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this.query}&page=${this.page}&per_page=12&key=${this.apiKey}`,
    );
    this.incrementPage();
    return result.data.hits;
  },
  incrementPage() {
    this.page += 1;
  },
  resetPage() {
    this.page = 1;
  },
  get query() {
    return this.searchQuery;
  },
  set query(value) {
    this.searchQuery = value;
  },
};
