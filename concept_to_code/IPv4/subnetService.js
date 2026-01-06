class SubnetService {
  constructor() {
    this.networkClass = undefined;
    this.IpAdress = undefined;

    this.subnetBitsCount = undefined;
    this.maxSubnetCount = undefined;
    this.hostsPerSubnet = undefined;
  }

  //class에 따른 IP주소 추천
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
  calculateSubnetInfo() {
    this.#calculateMaxSubnetCount();
    this.#calculateHostsPerSubnet();
    this.#calculateNetworkAddress();
    this.#calculateBroadcastAddress();
    this.#calculateHostAddressRange();
  }

  printSubnetInfo() {}

  //최대 서브넷 개수: 2^(서브넷 비트)
  #calculateMaxSubnetCount() {
    this.maxSubnetCount = 2 ** this.subnetBitsCount;
  }
  //서브넷 당 호스트 개수: 2^(남은 호스트 비트)-2
  #calculateHostsPerSubnet() {
    this.hostsPerSubnet;
  }
  //네트워크 주소: 호스트 비트 전부 0으로 한 주소
  #calculateNetworkAddress() {}
  //브로드캐스트 주소: 호스트 영역의 비트를 모두 1로 한 주소
  #calculateBroadcastAddress() {}
  //호스트 주소 범위 계산: 네트워크 주소+1 ~ 브로드캐스트 주소-1
  #calculateHostAddressRange() {}
}

module.exports = { SubnetService };
