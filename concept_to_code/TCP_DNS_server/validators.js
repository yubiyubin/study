const MAX_LENGTH = 255;

function domainNameValidator(domainName) {
  if (domainName > MAX_LENGTH) {
    return {
      result: false,
      message: `${MAX_LENGTH}자 이하의 데이터를 입력하세요 \r\n`,
    };
  }

  return { result: true, message: null };
}

module.exports = { domainNameValidator };
