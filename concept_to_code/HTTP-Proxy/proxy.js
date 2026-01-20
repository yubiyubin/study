const net = require("net");
const dns = require("dns");

const {
  AFTER_HEADER_REGEX,
  REQUEST_PARSING_REGEX,
  DEFAULT_PORT,
  RESPONSE_PARSING_REGEX,
} = require("./const");
const { OPTIONS } = require("./const");
const { HttpRequest } = require("./httpRequest");
const { HttpResponse } = require("./httpResponse");

class Proxy {
  constructor() {
    this.tcpServer = undefined;
    this.clientSocket = undefined;
    this.requestMessage = "";
    this.httpRequest = new HttpRequest();
    this.httpResponse = new HttpResponse();

    this.requestMessage = "";
    this.responseMessage = "";
  }

  run() {
    this.initServer();
    this.listen();
  }

  //tcp 서버를 생성하고,초기 설정
  initServer() {
    this.tcpServer = net.createServer((clientSocket) => {
      this.clientSocket = clientSocket;
      this.#printClientInfo(clientSocket);
      this.#getRequestMessage(clientSocket);
    });
  }

  // 옵션에 맞는 조건에 listen 시작
  listen() {
    this.tcpServer.listen(OPTIONS.PORT, OPTIONS.HOST, () => {
      console.log(`server listening to port: ${OPTIONS.PORT}`);
    });
  }

  #parseRequestMessage(requestMsg) {
    const method = requestMsg.match(REQUEST_PARSING_REGEX.METHOD)[1].trim();
    const accept = requestMsg.match(REQUEST_PARSING_REGEX.ACCEPT)[1].trim();
    const host = requestMsg.match(REQUEST_PARSING_REGEX.HOST)[1].trim();
    if (!host) {
      throw new Error("Host 미포함");
    }
    const userAgent = requestMsg
      .match(REQUEST_PARSING_REGEX.USER_AGENT)[1]
      .trim();
    //parse 한 request를 할당
    this.httpRequest.setUp(method, host, userAgent, accept);

    this.resolveHostname(host);
  }

  //파싱한 host name으로 DNS 서버에서 IP주소 가져오기
  resolveHostname(hostName) {
    dns.resolve4(hostName, (err, addr) => {
      if (err) {
        throw new Error("잘못된 형식의 Host Name");
      }
      const IP = addr[0];
      console.log(IP);
      this.sendRequestToUpstreamServer(IP);
    });
  }

  sendRequestToUpstreamServer(IP) {
    const serverSocket = new net.Socket();
    this.#connectToUpstreamServer(IP, serverSocket);
    this.#sendRequestMessage(serverSocket);
    this.#getResponseMessage(serverSocket);
  }

  sendResponseToClient() {
    this.clientSocket.write(this.responseMessage);
  }

  #parseResponseMessage(responseMsg) {
    const statusCode = responseMsg.match(RESPONSE_PARSING_REGEX.STATUS_CODE);
    const responseLine = responseMsg.match(
      RESPONSE_PARSING_REGEX.RESPONSE_LINE
    );
    const contentLength = responseMsg.match(
      RESPONSE_PARSING_REGEX.CONTENT_LENGTH
    );
    const body = responseMsg.match(RESPONSE_PARSING_REGEX.BODY);

    this.httpResponse.setUp(statusCode, responseLine, contentLength, body);
  }

  #connectToUpstreamServer(IP, socket) {
    socket.connect(DEFAULT_PORT, IP);
  }

  #sendRequestMessage(socket) {
    socket.write(this.requestMessage);
  }

  #getResponseMessage(socket) {
    socket.on("data", (responseBuffer) => {
      this.responseMessage = responseBuffer.toString();
      this.#parseResponseMessage(this.responseMessage);
    });
  }

  #printClientInfo(socket) {
    console.log(`<new client>
      IP: ${socket.remoteAddress}, port: ${socket.remotePort}`);
  }

  #getRequestMessage(socket) {
    socket.on("data", (requestBuffer) => {
      this.requestMessage += requestBuffer.toString();

      //줄바꿈이 있는 경우- 줄바꿈 이전의 텍스트만 남기고 parse 함수를 호출
      if (this.requestMessage.includes("\r\n\r\n")) {
        this.requestMessage = this.requestMessage.replace(
          AFTER_HEADER_REGEX,
          ""
        );
        this.#parseRequestMessage(this.requestMessage);
      }
    });
  }
}

module.exports = { Proxy };
