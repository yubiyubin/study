class SubnetService {
  networkClass;
  decimalIpAddress;
  binaryIpAdress;
  networkBitsCount;
  hostBitsCount;
  subnetBitsCount;
  maxSubnetCount;
  hostsPerSubnet;
  decimalNetworkAddress;
  decimalBroadcastAddress;
  firstHostAddress;
  lastHostAddress;

  constructor() {}

  recommendIpAddressByClass() {
    switch (this.networkClass) {
      case "A": {
        return "1.0.0.1";
      }
      case "B": {
        return "128.0.0.1";
      }
      case "C": {
        return "192.0.0.1";
      }
    }
  }

  convertIpAddressToBinary() {
    this.binaryIpAdress = this.decimalIpAddress
      .split(".")
      .map((v) => Number(v).toString(2).padStart(8, "0"))
      .join("");
  }

  // TODO: object mapping
  //선택한 class와 subnet 비트 수로 네트워크/호스트 비트 수 계산
  calculateNetworkAndHostBits() {
    //class에 따른 기본 네트워크/호스트 비트 수 할당
    switch (this.networkClass) {
      case "A": {
        this.networkBitsCount = 8;
        this.hostBitsCount = 24;
        break;
      }
      case "B": {
        this.networkBitsCount = 16;
        this.hostBitsCount = 16;
        break;
      }
      case "C": {
        this.networkBitsCount = 24;
        this.hostBitsCount = 8;
        break;
      }
    }

    // 입력한 서브넷 비트 수에 따라 네트워크/호스트 비트 수 변경
    this.networkBitsCount += this.subnetBitsCount;
    this.hostBitsCount -= this.subnetBitsCount;
  }

  //network 비트 수 기준으로 2진수 문자열의 subnetMask 만들고, 10진수 문자열 형태로 반환
  getSubnetMask() {
    this.calculateNetworkAndHostBits();
    const binarySubnetMask = "1".repeat(this.networkBitsCount).padEnd(32, "0");
    console.log(binarySubnetMask);
    return this.#convertBinaryAddressToDecimal(binarySubnetMask);
  }

  calculateSubnetInfo() {
    this.#calculateMaxSubnetCount();
    this.#calculateHostsPerSubnet();
    this.#calculateNetworkAddress();
    this.#calculateBroadcastAddress();
    this.#calculateHostAddressRange();
  }

  printSubnetInfo() {
    console.log(`
최대 서브넷 개수: ${this.maxSubnetCount}개,
서브넷당 호스트 수:${this.hostsPerSubnet}개,
호스트 IP 주소 범위: ${this.firstHostAddress} - ${this.lastHostAddress},
브로드캐스트 주소: ${this.decimalBroadcastAddress} `);
  }

  //최대 서브넷 개수: 2^(서브넷 비트)
  #calculateMaxSubnetCount() {
    this.maxSubnetCount = 2 ** this.subnetBitsCount;
  }

  //서브넷 당 호스트 개수: 2^(남은 호스트 비트)-2
  #calculateHostsPerSubnet() {
    this.hostsPerSubnet = 2 ** this.hostBitsCount - 2;
  }

  //네트워크 주소: 호스트 비트 전부 0으로 한 주소
  #calculateNetworkAddress() {
    const binaryNetworkAddress = this.binaryIpAdress
      .slice(0, this.networkBitsCount)
      .padEnd(32, "0");

    this.decimalNetworkAddress =
      this.#convertBinaryAddressToDecimal(binaryNetworkAddress);
  }

  //브로드캐스트 주소: 호스트 영역의 비트를 모두 1로 한 주소
  #calculateBroadcastAddress() {
    const binaryBroadcastAddress = this.binaryIpAdress
      .slice(0, this.networkBitsCount)
      .padEnd(32, "1");

    this.decimalBroadcastAddress = this.#convertBinaryAddressToDecimal(
      binaryBroadcastAddress
    );
  }

  //호스트 주소 범위 계산: 네트워크 주소+1 ~ 브로드캐스트 주소-1
  #calculateHostAddressRange() {
    //네트워크 주소는 +1, 브로드캐스트는 -1 연산 -> .으로 연결한 문자열 형태로 저장
    this.firstHostAddress = increaseOrDecreaseBits(
      this.decimalNetworkAddress,
      "+"
    );

    this.lastHostAddress = increaseOrDecreaseBits(
      this.decimalBroadcastAddress,
      "-"
    );

    function increaseOrDecreaseBits(address, operator) {
      return address
        .split(".")
        .map((byte, i) => {
          if (i === 3) {
            operator === "+" ? (byte += 1) : (byte -= 1);
          }
          return byte;
        })
        .join(".");
    }
  }

  #convertBinaryAddressToDecimal(binaryAddress) {
    return binaryAddress
      .match(/.{8}/g)
      .map((byte) => parseInt(byte, 2))
      .join(".");
  }
}

module.exports = { SubnetService };
