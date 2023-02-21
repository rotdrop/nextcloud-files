"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatFileSize = formatFileSize;

require("core-js/modules/es.parse-float.js");

var _l10n = require("@nextcloud/l10n");

var humanList = ['B', 'KB', 'MB', 'GB', 'TB'];

function formatFileSize(size) {
  var skipSmallSizes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  // Calculate Log with base 1024: size = 1024 ** order
  var order = size > 0 ? Math.floor(Math.log(size) / Math.log(1024)) : 0; // Stay in range of the byte sizes that are defined

  order = Math.min(humanList.length - 1, order);
  var readableFormat = humanList[order];
  var relativeSize = (size / Math.pow(1024, order)).toFixed(1);

  if (skipSmallSizes === true && order === 0) {
    if (relativeSize !== "0.0") {
      return '< 1 KB';
    } else {
      return '0 KB';
    }
  }

  if (order < 2) {
    relativeSize = parseFloat(relativeSize).toFixed(0);
  } else if (relativeSize.substr(relativeSize.length - 2, 2) === '.0') {
    relativeSize = relativeSize.substr(0, relativeSize.length - 2);
  } else {
    relativeSize = parseFloat(relativeSize).toLocaleString((0, _l10n.getLanguage)());
  }

  return relativeSize + ' ' + readableFormat;
}
//# sourceMappingURL=humanfilesize.js.map