import ERRORS from './ERRORS';

const DEFAULT_GET_LIST_PAGINATION = {
  nbperpage: 100,
  pagenum: 1
}

const DEFAULT_GET_LIST_ORDER = {
  direction: 'ASC',
  order: 'doc_displayedDate'
}

const STEPS = {
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
  spent: 'spent',
}

const DELIVERY_STEPS = {
  none: 'none', 
  wait: 'wait',
  picking: 'picking',
  partialsent: 'partialsent',
  sent: 'sent',
}

const TYPES = {
  invoice: 'invoice',
  estimate: 'estimate',
  creditnote: 'creditnote',
  proforma: 'proforma',
  order: 'order',
  delivery: 'delivery',
}


export default class Documents {
  constructor(sellsy) {
    this.sellsy = sellsy;
    this.STEPS = STEPS;
    this.DELIVERY_STEPS = DELIVERY_STEPS;
    this.TYPES = TYPES;
  }
  create(data) {
    let method = data.docid ? 'update':'create';
    return this.sellsy.api({
      method: `Document.${method}`,
      params: data
    }).then(result => {
      if (result.error) {
        console.log(result.error)
        throw new Error(result.error);
      }
      return this.getById(data.document.doctype, result.response.doc_id);
   }).catch(e => {
      console.log(e)
      throw new Error(e);
   });
  }
  updateStep(docType, docId, step) {
    return this.sellsy.api({
      method: 'Document.updateStep',
      params: {
        document: {
          doctype: docType,
          step: step
        },
        docid: docId
      }
    }).then(data => {
      return data.response
    }).catch(e => {
      console.log(e)
      throw new Error(ERRORS.DOCUMENT_UPDATESTEP_ERROR);
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
  getById(docType, docId) {
    return this.sellsy.api({
      method: 'Document.getOne',
      params: {
        doctype: docType,
        docid: docId
      }
    }).then(data => {
      return data.response
    }).catch(e => {
      console.log(e)
      throw new Error(ERRORS.DOCUMENT_NOT_FOUND);
    });
  }
  getList(docType, search, pagination=DEFAULT_GET_LIST_PAGINATION, includePayments='N', order=DEFAULT_GET_LIST_ORDER) {
    return this.sellsy.api({
      method: 'Document.getList',
      params: {
        doctype: docType,
        search,
        order,
        pagination,
        includePayments
      }
    }).then(data => {
      if (data.error) {
				throw new Error(data.error);
			}
			let documents = Object.values(data.response.result);
			return documents;
    }).catch(e => {
      console.log(e);
      throw new Error(ERRORS.DOCUMENT_NOT_FOUND);
    });
  }
  getPublicLinkV2 = (docType, docId) => {
    return this.sellsy.api({
      method: 'Document.getPublicLink_v2',
      params: {
        doctype: docType,
        docid: docId,
      },
    }).then((data) => {
      if (data.error) {
        throw new Error(data.error);
      }
      return "https://sellsy.com/" + data.response.pdf + "&display=Y";
    }).catch((e) => {
      console.log(e)
      throw new Error(e);
    });
  }
  getLinkedDocuments = (docType, docId) => {
    return this.sellsy.api({
			method: 'Document.getLinkedDocuments',
			params: {
				docid: docId,
				doctype: docType,
			},
		})
		.then((data) => {
			if (data.error) {
				throw new Error(data.error);
			}
			let documents = Object.values(data.response.directChildren);
			return documents;
		})
		.catch(e => {
			throw new Error(e);
		});
  }
  updateStep = (docType, docId, step) => {
    return this.sellsy.api({
      method: "Document.updateStep",
      params: {
        docid: docId,
        document: { doctype: docType, step: step },
      },
    }).then((data) => {
      console.log('updateStep', data);
			if (data.error) {
				throw new Error(data.error);
      }
      console.log(data);
			return data;
		})
		.catch(e => {
			throw new Error(e);
		});
  }
  updateDeliveryStep = (docId, step) => {
    return this.sellsy.api({
      method: "Document.updateDeliveryStep",
      params: {
        docid: docId,
        document: { step: step },
      },
    }).then((data) => {
			if (data.error) {
				throw new Error(data.error);
      }
      console.log(data);
			return data;
		})
		.catch(e => {
			throw new Error(e);
		});
  }
  createPayment = (docType, docId, amount, medium, date) => {
    return this.sellsy.api({
      method: "Document.createPayment",
      params: {
        payment: {
          date: date,
          amount: amount,
          medium: medium,
          doctype: docType,
          docid: docId,
        },
      },
    }).then((data) => {
			if (data.error) {
				throw new Error(data.error);
      }
			return data;
		})
		.catch(e => {
			throw new Error(e);
		});
  }
  getPaymentList = (docType, docId) => {
    return this.sellsy.api({
      method: "Document.getPaymentList",
      params: {
        doctype: docType,
        docid: docId,
      },
    }).then((data) => {
			if (data.error) {
				throw new Error(data.error);
      }
			return Object.values(data.response);
		})
		.catch(e => {
			throw new Error(e);
		});
  }
}