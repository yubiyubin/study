const net = require("net");
const dns = require("dns");

const { domainNameValidator } = require("./validators");

const options = {
  port: 9000,
  host: "0.0.0.0",
};

async function resolveV4(addr) {
  return new Promise((res, rej) => {
    dns.resolve4(addr, (err, address) => {
      if (err) {
        rej(err);
        return;
      }

      res(address);
    });
  });
}

const server = net.createServer((socket) => {
  console.log(`<new client>
IP: ${socket.remoteAddress}, port: ${socket.remotePort}`);

  socket.write("> 검색할 주소를 입력하세요.\r\n");

  socket.on("data", async (data) => {
    const addr = data.toString().trim();

    const { result, message } = domainNameValidator(addr);

    if (message) {
      console.log(message + " \r\n");
    }
    if (!result) {
      return;
    }

    try {
      const addresses = await resolveV4(addr);

      addresses.forEach((v) =>
        socket.write(`Name: ${addr}\r\nAddress: ${v}\r\n`)
      );
      socket.write("> 검색할 주소를 입력하세요.\r\n");
    } catch (error) {
      socket.write("조회 불가\r\n");
      socket.write("> 검색할 주소를 입력하세요.\r\n\r\n");
    }

    // dns.resolve4(addr, (err, address) => {
    //   if (err) {
    //     socket.write("조회 불가\r\n");
    //     socket.write("> 검색할 주소를 입력하세요.\r\n\r\n");
    //     return;
    //   }
    //   address.forEach((v) =>
    //     socket.write(`Name: ${addr}\r\nAddress: ${v}\r\n`)
    //   );
    //   socket.write("> 검색할 주소를 입력하세요.\r\n");
    // });
  });

  socket.on("close", () => {
    console.log(`
${socket.remoteAddress} socket closed`);
  });
});

server.listen(options, () => {
  console.log("server listening 9000 port");
});
