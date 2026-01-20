class HttpRequest {
  constructor() {
    this.method = undefined;
    this.host = undefined;
    this.userAgent = undefined;
    this.accept = undefined;
  }

  setUp(method, host, userAgent, accept) {
    this.method = method;
    this.host = host;
    this.userAgent = userAgent;
    this.accept = accept;
  }
}
module.exports = { HttpRequest };
