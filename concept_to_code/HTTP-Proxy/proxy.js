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
    this.httpRequest = new HttpRequest();
    this.httpResponse = new HttpResponse();
  }

  run() {
    this.initServer();
    this.listen();
  }

  //tcp 서버를 생성하고,초기 설정
  initServer() {
    this.tcpServer = net.createServer((clientSocket) => {
      this.clientSocket = clientSocket;
      clientSocket.write("요청 입력 > \r\n");
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

  //파싱한 host name으로 DNS 서버에서 IP주소 가져오기
  resolveHostname(hostName, requestMessage) {
    dns.resolve4(hostName, (err, addr) => {
      if (err) {
        throw new Error("잘못된 형식의 Host Name");
      }
      const IP = addr[0];
      this.sendRequestToUpstreamServer(IP, requestMessage);
    });
  }

  sendRequestToUpstreamServer(IP, requestMessage) {
    const serverSocket = new net.Socket();
    this.#connectToUpstreamServer(IP, serverSocket);
    this.#sendRequestMessage(serverSocket, requestMessage);
    this.#getResponseMessage(serverSocket);
  }

  sendResponseToClient(responseMessage) {
    this.clientSocket.write(`서버 응답 >\r\n ${responseMessage}`);
  }
  #parseRequestMessage(requestMessage) {
    const method = requestMessage.match(REQUEST_PARSING_REGEX.METHOD)[1].trim();
    const accept = requestMessage.match(REQUEST_PARSING_REGEX.ACCEPT)[1].trim();
    const host = requestMessage.match(REQUEST_PARSING_REGEX.HOST)[1].trim();

    if (!host) {
      throw new Error("Host 미포함");
    }
    const userAgent = requestMessage
      .match(REQUEST_PARSING_REGEX.USER_AGENT)[1]
      .trim();
    //parse 한 request를 할당
    this.httpRequest.setUp(method, host, userAgent, accept);

    console.log(this.httpRequest);
    this.resolveHostname(host, requestMessage);
  }

  #parseResponseMessage(responseMsg) {
    const statusCode = responseMsg
      .match(RESPONSE_PARSING_REGEX.STATUS_CODE)[1]
      .trim();
    const responseLine = responseMsg
      .match(RESPONSE_PARSING_REGEX.RESPONSE_LINE)[1]
      .trim();
    const contentLength = responseMsg
      .match(RESPONSE_PARSING_REGEX.CONTENT_LENGTH)[1]
      .trim();
    const body = responseMsg.match(RESPONSE_PARSING_REGEX.BODY)[1].trim();

    this.httpResponse.setUp(statusCode, responseLine, contentLength, body);

    console.log(this.httpResponse);
  }

  #connectToUpstreamServer(IP, socket) {
    socket.connect(DEFAULT_PORT, IP);
  }

  #sendRequestMessage(socket, requestMessage) {
    socket.write(requestMessage);
  }

  #getResponseMessage(socket) {
    socket.on("data", (responseBuffer) => {
      const responseMessage = responseBuffer.toString();
      this.#parseResponseMessage(responseMessage);

      this.sendResponseToClient(responseMessage);
    });
  }

  #printClientInfo(socket) {
    console.log(`<new client>
      IP: ${socket.remoteAddress}, port: ${socket.remotePort}\r\n`);
  }

  #getRequestMessage(socket) {
    let requestMessage = "";
    socket.on("data", (requestBuffer) => {
      requestMessage += requestBuffer.toString();

      //줄바꿈이 있는 경우- 줄바꿈 이전의 텍스트만 남기고 parse 함수를 호출
      if (requestMessage.includes("\r\n\r\n")) {
        requestMessage = requestMessage.replace(AFTER_HEADER_REGEX, "");
        this.#parseRequestMessage(requestMessage);
      }
    });
  }
}

module.exports = { Proxy };
