import ERRORS from './ERRORS';

const DEFAULT_GET_LIST_PAGINATION = {
    nbperpage: 100,
    pagenum: 1
}
  
const DEFAULT_GET_LIST_ORDER = {
    direction: 'ASC',
    order: 'doc_displayedDate'
}

export default class Accountdatas {
    constructor(sellsy) {
        this.sellsy = sellsy;
    }
    
    getTaxes = () => {
        return sellsy.api({
            method: "Accountdatas.getTaxes",
            params: {},
        }).then((data) => {
            if (data.error) {
                throw new Error(data.error);
            }
            return data.response;
        }).catch((e) => {
            throw new Error(e);
        });
    }

    getRateCategory = (rcid) => {
        return sellsy.api({
            method: "Accountdatas.getRateCategory",
            params: {
                id: rcid,
            },
        }).then((data) => {
            if (data.error) {
                throw new Error(data.error);
            }
            return data.response;
        }).catch((e) => {
            throw new Error(e);
        });
    }
}