class HttpResponse {
  constructor() {
    this.statusCode = undefined;
    this.responseLine = undefined;
    this.contentLength = undefined;
    this.body = undefined;
  }

  setUp(statusCode, responseLine, contentLength, body) {
    this.statusCode = statusCode;
    this.responseLine = responseLine;
    this.contentLength = contentLength;
    this.body = body;
  }
}
module.exports = { HttpResponse };
