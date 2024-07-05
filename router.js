const root = document.getElementById("root");

function createElement(template) {
  const div = document.createElement("div");
  div.insertAdjacentHTML("beforeend", template);
  return div.firstElementChild;
}

class Route {
  constructor(root, Link, dataPages) {
    this._root = root;
    this._Link = Link;
    this._dataPages = dataPages;
    this._history = window.history;
    this._init();
  }

  _init() {
    this._addListeners();
    this._render();
  }

  _findPageObject() {
    return this._dataPages.find((pageObject) => {
      if (pageObject.path !== window.location.pathname) {
        return pageObject.error === 404;
      }

      return pageObject;
    });
  }

  _generatePage() {
    const pageObject = this._findPageObject();

    return new pageObject.component(this._Link, this._dataPages).element;
  }

  _addListeners() {
    document.body.addEventListener("click", (e) => {
      if (e.target.hasAttribute("data-router-link")) {
        e.preventDefault();
        this._history.pushState({}, "", e.target.pathname);
        this._render();
      }
    });

    window.addEventListener("popstate", () => {
      this._render();
    });
  }

  _render() {
    this._root.innerHTML = "";
    this._root.appendChild(this._generatePage());
  }
}

class MainPage {
  _element = null;
  _subElements = null;

  constructor(Link, data) {
    this._Link = Link;
    this._data = data;
    this._init();
  }

  _init() {
    this._element = createElement(this._getTemplate());
    this._subElements = this._getSubElements();
    this._render();
  }

  _getTemplate() {
    return `<div class="main">
      <h1 class="title">main</h1>
      <div class="navigation" data-element="navigation"></div>
    </div>`;
  }

  _generateLinks() {
    return this._data.map((el) => new this._Link(el.path, el.name).element);
  }

  _render() {
    this._subElements.navigation.append(...this._generateLinks());
  }

  _getSubElements() {
    return Array.from(this._element.querySelectorAll("[data-element]")).reduce((acc, el) => {
      acc[el.getAttribute("data-element")] = el;
      return acc;
    }, {});
  }

  get element() {
    return this._element;
  }
}

class ContactsPage {
  _element = null;
  _subElements = null;

  constructor(Link, data) {
    this._Link = Link;
    this._data = data;
    this._init();
  }

  _init() {
    this._element = createElement(this._getTemplate());
    this._subElements = this._getSubElements();
    this._render();
  }

  _getTemplate() {
    return `<div class="main">
      <h1 class="title">contacts</h1>
      <div class="navigation" data-element="navigation"></div>
    </div>`;
  }

  _generateLinks() {
    return this._data.map((el) => new this._Link(el.path, el.name).element);
  }

  _render() {
    this._subElements.navigation.append(...this._generateLinks());
  }

  _getSubElements() {
    return Array.from(this._element.querySelectorAll("[data-element]")).reduce((acc, el) => {
      acc[el.getAttribute("data-element")] = el;
      return acc;
    }, {});
  }

  get element() {
    return this._element;
  }
}

class PageNotFound {
  _element = null;
  _subElements = null;

  constructor(Link, data) {
    this._Link = Link;
    this._data = data;
    this._init();
  }

  _init() {
    this._element = createElement(this._getTemplate());
    this._subElements = this._getSubElements();
    this._render();
  }

  _getTemplate() {
    return `<div class="main">
      <h1 class="title">404 PAGE NOT FOUND</h1>
      <div class="navigation" data-element="navigation"></div>
    </div>`;
  }

  _generateLinks() {
    return this._data.map((el) => new this._Link(el.path, el.name).element);
  }

  _render() {
    this._subElements.navigation.append(...this._generateLinks());
  }

  _getSubElements() {
    return Array.from(this._element.querySelectorAll("[data-element]")).reduce((acc, el) => {
      acc[el.getAttribute("data-element")] = el;
      return acc;
    }, {});
  }

  get element() {
    return this._element;
  }
}

class Link {
  _element = null;

  constructor(path, name) {
    this._path = path;
    this._name = name;
    this._init();
  }

  _init() {
    this._element = createElement(this._getTemplate());
  }

  _getTemplate() {
    return `<a class="link" href="${this._path}" data-router-link>${this._name}</a>`;
  }

  get element() {
    return this._element;
  }
}

const dataPages = [
  {
    path: "/",
    name: "main",
    component: MainPage,
  },
  {
    path: "/contacts",
    name: "contacts",
    component: ContactsPage,
  },
  {
    error: 404,
    path: "",
    name: "",
    component: PageNotFound,
  },
];

const route = new Route(root, Link, dataPages);
