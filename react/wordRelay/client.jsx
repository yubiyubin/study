const React = require("react");
const { createRoot } = require("react-dom/client");

const WordRelay = require("./wordRelay");
const root = createRoot(document.querySelector("#root"));
root.render(<WordRelay />);
