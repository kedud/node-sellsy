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
    order: 'item_name'
};

var Catalogue = function Catalogue(sellsy) {
    var _this = this;

    _classCallCheck(this, Catalogue);

    this.getBarCodes = function (type, itemId) {
        return _this.sellsy.api({
            method: 'Catalogue.getBarCodes',
            params: {
                type: type,
                id: itemId
            }
        }).then(function (data) {
            if (data.error) {
                throw new Error(data.error);
            }
            return Object.values(data.response);
        }).catch(function (e) {
            throw new Error(e);
        });
    };

    this.getBarCode = function (type, itemId, declId) {
        return _this.sellsy.api({
            method: 'Catalogue.getBarCodes',
            params: {
                type: type,
                id: itemId
            }
        }).then(function (data) {
            if (data.error) {
                throw new Error(data.error);
            }
            var barCodes = Object.values(data.response);
            var barCode = barCodes.find(function (b) {
                return declId == b.declid;
            });
            return barCode;
        }).catch(function (e) {
            throw new Error(e);
        });
    };

    this.getList = function () {
        var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'item';
        var tags = arguments[1];
        var rateCategory = arguments[2];
        var pagination = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : DEFAULT_GET_LIST_PAGINATION;
        var order = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : DEFAULT_GET_LIST_ORDER;

        return _this.sellsy.api({
            method: "Catalogue.getList",
            params: {
                type: type,
                search: {
                    tags: tags,
                    useDeclination: "Y",
                    rateCategory: rateCategory,
                    combineDecli: "Y",
                    actif: "Y"
                },
                pagination: pagination,
                order: order
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

    this.getVariations = function (itemId) {
        return _this.sellsy.api({
            method: 'Catalogue.getVariations',
            params: {
                itemid: itemId
            }
        }).then(function (data) {
            if (data.error) {
                throw new Error(data.error);
            }
            return Object.values(data.response);
        }).catch(function (e) {
            throw new Error(e);
        });
    };

    this.getVariation = function (itemId, declId) {
        return _this.sellsy.api({
            method: 'Catalogue.getVariation',
            params: {
                declid: declId,
                itemid: itemId
            }
        }).then(function (data) {
            if (data.error) {
                throw new Error(data.error);
            }
            return data.response;
        }).catch(function (e) {
            throw new Error(e);
        });
    };

    this.sellsy = sellsy;
};

exports.default = Catalogue;