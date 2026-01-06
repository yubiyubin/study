//1. 네트워크 클래스 선택
//2. IP 주소 추천
//3. IP 주소 입력 - 추천 주소/타주소 무관
//4. 서브넷 비트 개수 입력
//5. 출력
// 5-1. 최대 서브넷 개수: 2^(서브넷 비트)
// 5-2. 서브넷 당 호스트 개수: 2^(남은 호스트 비트)-2
// 5-3. 호스트 주소 범위 계산: 네트워크 주소+1 ~ 브로드캐스트 주소-1
//      1) 네트워크 주소: 호스트 비트 전부 0으로 한 주소
//      2) 브로드캐스트 주소: 호스트 영역의 비트를 모두 1로 한 주소
// 5-4. 브로드캐스트 주소

//클래스, ip주소, 서브넷 비트 개수

const readline = require("readline");
const { SubnetService } = require("./SubnetService");

class SubnetController {
  constructor() {
    this.networkClass = undefined;
    this.IpAdress = undefined;
    this.subnetBitsCount = undefined;
    this.subnetService = new SubnetService();

    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
  }
  run() {
    this.setUp();
  }

  setUp() {
    this.rl.setPrompt("A/B/C 중 네트워크 클래스를 선택하세요! > ");
    this.rl.prompt();

    this.rl.on("line", (input) => {
      //클래스 입력 안한 경우
      if (!this.networkClass) {
        this.#setUpClass(input);
        return;
      }

      //IP주소 입력 안한 경우
      if (!this.IpAdress) {
        this.#setUpIpAddress(input);
        return;
      }
      //서브넷 개수 입력 안 한 경우
      this.#setUpSubnetCount(input);
      //TODO : 서브넷 마스크 구하기
    });
    this.rl.on("close", () =>
      console.log(
        `${this.IpAdress} 주소와 ${this.networkClass} 클래스, 서브넷 마스크 ${this.subnetBitsCount}를 선택하셨습니다.`
      )
    );
  }

  #setUpClass(input) {
    const networkClasses = ["A", "B", "C"];
    const networkClass = input.replace(/\s/g, "").toUpperCase();

    //잘못된 형식의 class를 입력한 경우
    if (!networkClasses.includes(networkClass)) {
      this.rl.setPrompt("A/B/C 중 하나를 입력해야합니다! > ");
      this.rl.prompt();
      return;
    }
    //class를 제대로 입력한 경우
    this.networkClass = networkClass;
    this.subnetService.networkClass = this.networkClass;

    const recommendedIpAdress = this.subnetService.recommendIpAddressByClass();
    console.log(
      `<${this.networkClass}> 클래스를 선택했습니다. 추천하는 IP 주소는 ${recommendedIpAdress}입니다.`
    );
    this.rl.setPrompt("사용할 IP주소를 입력하세요! > ");
    this.rl.prompt();
  }

  #setUpIpAddress(input) {
    this.IpAdress = input;
    this.subnetService.IpAdress = this.IpAdress;
    this.rl.setPrompt(
      `${this.IpAdress} 주소에서 사용할 서브넷 비트를 입력하세요! > `
    );
    this.rl.prompt();
  }

  #setUpSubnetCount(input) {
    this.subnetBitsCount = Number(input);
    this.subnetService.subnetBitsCount = this.subnetBitsCount;
    this.rl.close();
  }
}

const a = new SubnetController();
a.run();
