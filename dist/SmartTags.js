"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _ERRORS = require("./ERRORS");

var _ERRORS2 = _interopRequireDefault(_ERRORS);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SmartTags = function SmartTags(sellsy) {
    var _this = this;

    _classCallCheck(this, SmartTags);

    this.getList = function (category) {
        return _this.sellsy.api({
            method: "SmartTags.getList",
            params: {
                search: {
                    category: category
                }
            }
        }).then(function (data) {
            if (data.error) {
                throw new Error(data.error);
            }
            return Object.values(data.response.result);
        }).catch(function (e) {
            throw new Error(e);
        });
    };

    this.sellsy = sellsy;
};

exports.default = SmartTags;