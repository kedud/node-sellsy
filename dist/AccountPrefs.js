'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

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

var AccountPrefs = function AccountPrefs(sellsy) {
    var _this = this;

    _classCallCheck(this, AccountPrefs);

    this.getCurrencies = function () {
        return _this.sellsy.api({
            method: "AccountPrefs.getCurrencies",
            params: {}
        }).then(function (data) {
            if (data.error) {
                throw new Error(data.error);
            }
            return Object.values(data.response);
        }).catch(function (e) {
            throw new Error(e);
        });
    };

    this.getCurrencyId = function (currencyCode) {
        return _this.sellsy.api({
            method: "AccountPrefs.getCurrencies",
            params: {}
        }).then(function (data) {
            if (data.error) {
                throw new Error(data.error);
            }
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = Object.entries(data.response)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var _step$value = _slicedToArray(_step.value, 2),
                        key = _step$value[0],
                        value = _step$value[1];

                    if (value.name.toUpperCase() == currencyCode.toUpperCase()) {
                        return value.id;
                    }
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            throw new Error(_ERRORS2.default.CURRENCY_NOT_FOUND_ERROR);
        }).catch(function (e) {
            throw new Error(e);
        });
    };

    this.sellsy = sellsy;
};

exports.default = AccountPrefs;