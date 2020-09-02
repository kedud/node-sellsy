"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _ERRORS = require("./ERRORS");

var _ERRORS2 = _interopRequireDefault(_ERRORS);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Addresses = function Addresses(sellsy) {
    _classCallCheck(this, Addresses);

    _initialiseProps.call(this);

    this.sellsy = sellsy;
};

var _initialiseProps = function _initialiseProps() {
    this.getList = function (linkedIDs) {
        return sellsy.api({
            method: "Addresses.getList",
            params: {
                search: {
                    linkedType: "third",
                    linkedIDs: linkedIDs
                }
            }
        }).then(function (data) {
            if (data.error) {
                throw new Error(data.error);
            }
            return Object.entries(data.response.result);
        }).catch(function (e) {
            throw new Error(e);
        });
    };
};

exports.default = Addresses;