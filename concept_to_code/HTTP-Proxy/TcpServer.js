/*1. client -> proxy
  1-1. TCP 서버 생성 
  1-2. 클리아언트(telnet)와 프록시 연결
  1-3. <clientSocket> 생성
  1-4. telnet에서 requestData 받기
  1-5. request 파싱
  1-6. httpRequest 생성

2. proxy <-> dns server
  2-1. proxy -> dns: dns 서버에 조회
  2-2. dns -> proxy: ip 주소 응답 보내줌
  

3. proxy <-> web-server
  3-1. <serverSocket> 생성 => 실제 서버와 connect
  3-2. proxy -> web-server: 서버소켓에 write해서 요청 보내기
  3-3. web-server -> proxy: 서버소켓에서 응답 받기
  3-4. httpResponse 생성

4. proxy -> client
 4-1. httpResponse 클라이언트에게 전달하기
*/

const net = require("net");

class TcpServer {
  constructor(host, port) {
    this.options = {
      port,
      host,
    };
    this.server = undefined;
    this.clientSocket = undefined;

    this.initiallize();
    this.listen();
  }

  initiallize() {
    this.server = net.createServer((clientSocket) => {
      this.clientSocket = clientSocket;
      this.#printClientInfo();
    });
  }

  listen() {
    this.server.listen(this.options, () => {
      console.log(`server listening to port: ${this.options.port}`);
    });
  }

  getRequestMessage() {
    this.clientSocket.on("data", (requestMessage) => {
      console.log(requestMessage);
      return requestMessage;
    });
  }

  #printClientInfo() {
    console.log(`<new client>
IP: ${this.clientSocket.remoteAddress}, port: ${this.clientSocket.remotePort}`);
  }
}

const tcp = new TcpServer();
console.log(tcp.getRequestMessage());
module.exports = { TcpServer };
