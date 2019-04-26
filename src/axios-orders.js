import axios from 'axios';

const instance = axios.create({
	baseURL: 'https://the-burger-builder-proje-928d4.firebaseio.com/'
});

export default instance;