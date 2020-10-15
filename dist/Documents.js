'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

var STEPS = {
  draft: 'draft',
  sent: 'sent',
  read: 'read',
  accepted: 'accepted',
  expired: 'expired',
  advanced: 'advanced',
  partialinvoiced: 'partialinvoiced',
  invoiced: 'invoiced',
  cancelled: 'cancelled',
  paid: 'paid',
  stored: 'stored',
  partialspend: 'partialspend',
  spent: 'spent'
};

var DELIVERY_STEPS = {
  none: 'none',
  wait: 'wait',
  picking: 'picking',
  partialsent: 'partialsent',
  sent: 'sent'
};

var TYPES = {
  invoice: 'invoice',
  estimate: 'estimate',
  creditnote: 'creditnote',
  proforma: 'proforma',
  order: 'order',
  delivery: 'delivery'
};

var Documents = function () {
  function Documents(sellsy) {
    var _this = this;

    _classCallCheck(this, Documents);

    this.getPublicLinkV2 = function (docType, docId) {
      return _this.sellsy.api({
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
      return _this.sellsy.api({
        method: 'Document.getLinkedDocuments',
        params: {
          docid: docId,
          doctype: docType
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

    this.updateStep = function (docType, docId, step) {
      return _this.sellsy.api({
        method: "Document.updateStep",
        params: {
          docid: docId,
          document: { doctype: docType, step: step }
        }
      }).then(function (data) {
        console.log('updateStep', data);
        if (data.error) {
          throw new Error(data.error);
        }
        console.log(data);
        return data;
      }).catch(function (e) {
        throw new Error(e);
      });
    };

    this.updateDeliveryStep = function (docId, step) {
      return _this.sellsy.api({
        method: "Document.updateDeliveryStep",
        params: {
          docid: docId,
          document: { step: step }
        }
      }).then(function (data) {
        if (data.error) {
          throw new Error(data.error);
        }
        console.log(data);
        return data;
      }).catch(function (e) {
        throw new Error(e);
      });
    };

    this.createPayment = function (docType, docId, amount, medium, date) {
      return _this.sellsy.api({
        method: "Document.createPayment",
        params: {
          payment: {
            date: date,
            amount: amount,
            medium: medium,
            doctype: docType,
            docid: docId
          }
        }
      }).then(function (data) {
        if (data.error) {
          throw new Error(data.error);
        }
        return data;
      }).catch(function (e) {
        throw new Error(e);
      });
    };

    this.getPaymentList = function (docType, docId) {
      return _this.sellsy.api({
        method: "Document.getPaymentList",
        params: {
          doctype: docType,
          docid: docId
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

    this.sellsy = sellsy;
    this.STEPS = STEPS;
    this.DELIVERY_STEPS = DELIVERY_STEPS;
    this.TYPES = TYPES;
  }

  _createClass(Documents, [{
    key: 'create',
    value: function create(data) {
      var _this2 = this;

      var method = data.docid ? 'update' : 'create';
      return this.sellsy.api({
        method: 'Document.' + method,
        params: data
      }).then(function (result) {
        if (result.error) {
          console.log(result.error);
          throw new Error(result.error);
        }
        return _this2.getById(data.document.doctype, result.response.doc_id);
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
    // createPayment(docType, docId, paymentData) {
    //   return this.sellsy.api({
    //     method: 'Document.createPayment',
    //     params: {
    //       payment: {
    //         doctype: docType,
    //         docid: docId,
    //         ...paymentData
    //       }
    //     }
    //   }).then(data => {
    //     console.log(data);
    //     return data.response;
    //   }).catch(e => {
    //     console.log(e)
    //     throw new Error(ERRORS.DOCUMENT_CREATEPAYMENT_ERROR);
    //   });
    // }

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
        if (data.error) {
          throw new Error(data.error);
        }
        var documents = Object.values(data.response.result);
        return documents;
      }).catch(function (e) {
        console.log(e);
        throw new Error(_ERRORS2.default.DOCUMENT_NOT_FOUND);
      });
    }
  }]);

  return Documents;
}();

exports.default = Documents;