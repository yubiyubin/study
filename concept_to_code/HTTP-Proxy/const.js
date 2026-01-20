const OPTIONS = { HOST: "0.0.0.0", PORT: 12020 };
const DEFAULT_PORT = 80;
const AFTER_HEADER_REGEX = /(\\r\\n\\r\\n).*/;

const REQUEST_PARSING_REGEX = {
  METHOD: /([A-Z]+)/,
  ACCEPT: /Accept:([^\r]*)/,
  HOST: /Host:([^\r]*)/,
  USER_AGENT: /User-Agent:([^\r]*)/,
};

const RESPONSE_PARSING_REGEX = {
  STATUS_CODE: / ([0-9]*)/,
  RESPONSE_LINE: /([^\r\n]*)/,
  CONTENT_LENGTH: /Content-Length: ([0-9]*)/,
  BODY: /\r\n\r\n([^\r\n]*)/,
};

module.exports = {
  OPTIONS,
  DEFAULT_PORT,
  AFTER_HEADER_REGEX,
  REQUEST_PARSING_REGEX,
  RESPONSE_PARSING_REGEX,
};
