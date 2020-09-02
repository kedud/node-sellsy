'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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

var Documents = function () {
  function Documents(sellsy) {
    _classCallCheck(this, Documents);

    _initialiseProps.call(this);

    this.sellsy = sellsy;
  }

  _createClass(Documents, [{
    key: 'create',
    value: function create(data) {
      var _this = this;

      var method = data.docid ? 'update' : 'create';
      return this.sellsy.api({
        method: 'Document.' + method,
        params: data
      }).then(function (result) {
        if (result.status === 'success') {
          return _this.getById(data.document.doctype, result.response.doc_id);
        }
        throw new Error(_ERRORS2.default.DOCUMENT_CREATE_ERROR);
      }).catch(function (e) {
        console.log(e);
        throw new Error(e);
      });
    }
  }, {
    key: 'updateStep',
    value: function updateStep(docType, docId, step) {
      return this.sellsy.api({
        method: 'Document.updateStep',
        params: {
          document: {
            doctype: docType,
            step: step
          },
          docid: docId
        }
      }).then(function (data) {
        return data.response;
      }).catch(function (e) {
        console.log(e);
        throw new Error(_ERRORS2.default.DOCUMENT_UPDATESTEP_ERROR);
      });
    }
  }, {
    key: 'createPayment',
    value: function createPayment(docType, docId, paymentData) {
      return this.sellsy.api({
        method: 'Document.createPayment',
        params: {
          payment: _extends({
            doctype: docType,
            docid: docId
          }, paymentData)
        }
      }).then(function (data) {
        return data.response;
      }).catch(function (e) {
        console.log(e);
        throw new Error(_ERRORS2.default.DOCUMENT_CREATEPAYMENT_ERROR);
      });
    }
  }, {
    key: 'getById',
    value: function getById(docType, docId) {
      return this.sellsy.api({
        method: 'Document.getOne',
        params: {
          doctype: docType,
          docid: docId
        }
      }).then(function (data) {
        return data.response;
      }).catch(function (e) {
        console.log(e);
        throw new Error(_ERRORS2.default.DOCUMENT_NOT_FOUND);
      });
    }
  }, {
    key: 'getList',
    value: function getList(docType, search) {
      var pagination = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : DEFAULT_GET_LIST_PAGINATION;
      var includePayments = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'N';
      var order = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : DEFAULT_GET_LIST_ORDER;

      return this.sellsy.api({
        method: 'Document.getList',
        params: {
          doctype: docType,
          search: search,
          order: order,
          pagination: pagination,
          includePayments: includePayments
        }
      }).then(function (data) {
        return data.response;
      }).catch(function (e) {
        console.log(e);
        throw new Error(_ERRORS2.default.DOCUMENT_NOT_FOUND);
      });
    }
  }]);

  return Documents;
}();

var _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.getPublicLinkV2 = function (docType, docId) {
    return _this2.sellsy.api({
      method: 'Document.getPublicLink_v2',
      params: {
        doctype: docType,
        docid: docId
      }
    }).then(function (data) {
      if (data.error) {
        throw new Error(data.error);
      }
      return "https://sellsy.com/" + data.response.pdf + "&display=Y";
    }).catch(function (e) {
      console.log(e);
      throw new Error(e);
    });
  };

  this.getLinkedDocuments = function (docType, docId) {
    return sellsy.api({
      method: 'Document.getLinkedDocuments',
      params: {
        docid: docid,
        doctype: doctype
      }
    }).then(function (data) {
      if (data.error) {
        throw new Error(data.error);
      }
      var documents = Object.values(data.response.directChildren);
      return documents;
    }).catch(function (e) {
      throw new Error(e);
    });
  };
};

exports.default = Documents;