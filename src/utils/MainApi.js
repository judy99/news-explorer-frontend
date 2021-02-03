export class MainApi {
  constructor({
    baseUrl,
    headers
  }) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  // # returns information about the logged-in user (email and name)
  // GET /users/me
  getUserInfo () {
    return fetch(this.baseUrl + '/users/me', {
      headers: this.headers
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(`Error: ${res.status}`);
        }
      });
  }

  // # returns all articles saved by the user
  // GET /articles
  getSavedArticles (ownerId) {
    return fetch(this.baseUrl + '/articles/' + ownerId, {
      headers: this.headers
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(`Error: ${res.status}`);
        }
      });
  }

  // # creates an article with the passed
  // # keyword, title, text, date, source, link, and image in the body
  // POST /articles
  addArticle({ keyword, title, text, date, source, link, image, owner, }) {
    return fetch(this.baseUrl + '/articles', {
        headers: this.headers,
        method: 'POST',
        body: JSON.stringify({
          keyword,
          title,
          text,
          date,
          source,
          link,
          image,
          owner,
        })
      })
      .then((res) => {
        if (res.ok) {
          // console.log('return article to save:', res);
          return res.json();
        } else {
          return Promise.reject(`Error: ${res.status}`);
        }
      });
  }

  // # deletes the stored article by _id
  // DELETE /articles/articleId
  removeArticle(articleId) {
    return fetch(this.baseUrl + '/articles/' + articleId, {
        headers: this.headers,
        method: 'DELETE'
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

export const mainApi = new MainApi({
  baseUrl: 'http://localhost:5000',
  headers: {'Content-Type': 'application/json'}
});
