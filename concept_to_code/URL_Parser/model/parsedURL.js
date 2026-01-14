class ParsedURL {
  #pathComponents;
  constructor() {
    this.absoluteStr = "";
    this.scheme = "";
    this.user = "";
    this.password = "";
    this.host = "";
    this.port = "";
    this.#pathComponents = ["/"];
    this.lastPathComponent = "";
    this.query = "";
  }

  setPathComponents(components) {
    if (components) {
      components.split("/").forEach((v) => this.#pathComponents.push(v));
      this.#updateLastPathComponent();
      return;
    }
    this.#pathComponents = [];
  }

  get pathComponents() {
    return this.#pathComponents;
  }

  appendPathComponent(pathStr) {
    //pathComponents 배열에 append
    this.#pathComponents.push(pathStr);
    this.#updateLastPathComponent();

    //absoluteStr update
    this.#updateAbsoluteStr();
    this.printInfo();
  }

  deleteLastPathComponent() {
    //pathComponents 마지막 항 pop
    this.#pathComponents.pop();
    this.#updateLastPathComponent();

    //absoluteStr update
    this.#updateAbsoluteStr();
    this.printInfo();
  }

  printInfo() {
    console.log(
      `href: ${this.absoluteStr}
scheme: ${this.scheme}
user: ${this.user}
password: ${this.password}
host: ${this.host}
port: ${this.port}
pathComponents: ${this.#pathComponents}
query: ${this.query}
`
    );
  }

  #updateLastPathComponent() {
    this.lastPathComponent = this.#pathComponents.at(-1);
  }

  #updateAbsoluteStr() {
    this.absoluteStr = this.scheme + "://";
    if (this.user) {
      this.absoluteStr += this.user;
      if (this.password) {
        this.absoluteStr += ":" + this.password;
      }
      this.absoluteStr += "@";
    }

    this.absoluteStr += this.host;
    if (this.port) {
      this.absoluteStr += ":" + this.port;
    }
    if (this.#pathComponents.length > 1) {
      this.#pathComponents.forEach(
        (component) => (this.absoluteStr += component)
      );
    }
    if (this.query) {
      this.absoluteStr += "?" + this.query;
    }
  }
}

module.exports = { ParsedURL };
