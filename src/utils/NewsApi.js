// Your API key is: c61a554213c94eaf86690e2d6782eeb1
export class NewsApi {
  constructor ({
    baseUrl,
    headers
  }) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  objectToQueryString(obj) {
    return Object.keys(obj).map(key => key + '=' + obj[key]).join('&');
  }

  // GET https://newsapi.org/everything
  getCardsByKeyword (obj) {
    const params = this.objectToQueryString(obj);
    return fetch(this.baseUrl + '/v2/everything?' + params, {
      headers: this.headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(`Error: ${res.status}`);
        }
      });
  }

}
// const proxyURL = 'https://nomoreparties.co/';
const targetURL = 'https://newsapi.org';

export const newsApi = new NewsApi({
  // baseUrl: '' + proxyURL + targetURL,
  baseUrl: targetURL,
  headers: {
    "x-api-key": "c61a554213c94eaf86690e2d6782eeb1",
  },
});
