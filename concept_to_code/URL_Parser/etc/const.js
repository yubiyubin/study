//URL 구성 문자에서 escape 문자는 무시하고 alpha 또는 digit, safe, extra 수준만 지원한다고 가정한다
const URL_CHARSET_REGEX = /[A-Za-z0-9$-_.+!*'\(\),:\/?#@]/g;
const URL_PARSING_REGEXS = {
  SCHEME: /([a-zA-Z]+):\/\//,
  USER: /:\/\/([A-Za-z0-9_.+!*'\(\),?-]+)\:*/,
  PASSWORD: /:([A-Za-z0-9_.+!*'\(\),?-]+)@/,
  HOST: /@([A-Za-z0-9_.+!*'\(\),?#-]+):/,
  PORT: /:([0-9]+)\//,
  PATHCOMPONENTS: /\/([A-Za-z0-9\/]+)\?/,
  PATHCOMPONENTS_AFTER_HASH: /\/#!\/([A-Za-z0-9\/]+)\?*/,
  QUERY: /\?([A-Za-z0-9_.+!*'\(\),?\-=&]+)/,
};

module.exports = { URL_CHARSET_REGEX, URL_PARSING_REGEXS };

//  /([a-zA-Z]+)\:\/\/([A-Za-z0-9$-_.+!*'\(\),\/?#@]+):([A-Za-z0-9$-_.+!*'\(\),:\/?#]+)@([A-Za-z0-9$-_.+!*'\(\),\/?#@]+):([\d]+)\/([A-Za-z0-9$-_.+!*'\(\),:\/#@]+)\?(.+)/;

// consts/reg.js
// consts/errorMessages.js
