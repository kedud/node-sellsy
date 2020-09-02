'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _ERRORS = require('./ERRORS');

var _ERRORS2 = _interopRequireDefault(_ERRORS);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DEFAULT_GET_LIST_PAGINATION = {
    nbperpage: 100,
    pagenum: 1
};

var DEFAULT_GET_LIST_ORDER = {
    direction: 'ASC',
    order: 'doc_displayedDate'
};

var Accountdatas = function Accountdatas(sellsy) {
    _classCallCheck(this, Accountdatas);

    _initialiseProps.call(this);

    this.sellsy = sellsy;
};

var _initialiseProps = function _initialiseProps() {
    this.getTaxes = function () {
        return sellsy.api({
            method: "Accountdatas.getTaxes",
            params: {}
        }).then(function (data) {
            if (data.error) {
                throw new Error(data.error);
            }
            return data.response;
        }).catch(function (e) {
            throw new Error(e);
        });
    };
};

exports.default = Accountdatas;