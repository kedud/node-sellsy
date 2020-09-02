import ERRORS from './ERRORS';

const DEFAULT_GET_LIST_PAGINATION = {
    nbperpage: 100,
    pagenum: 1
}
  
const DEFAULT_GET_LIST_ORDER = {
    direction: 'ASC',
    order: 'doc_displayedDate'
}

export default class AccountPrefs {
    constructor(sellsy) {
        this.sellsy = sellsy;
    }
    getCurrencies = () => {
        return sellsy.api({
            method: "AccountPrefs.getCurrencies",
            params: {},
        }).then((data) => {
            if (data.error) {
                throw new Error(data.error);
            }
            return Object.values(data.response);
      }).catch(e => {
            throw new Error(e);
      });
    }
    getCurrencyId = (currencyCode) => {
        return sellsy.api({
            method: "AccountPrefs.getCurrencies",
            params: {},
        }).then((data) => {
            if (data.error) {
                throw new Error(data.error);
            }
            for (let [key, value] of Object.entries(data.response)) {
                if (value.name.toUpperCase() == currencyCode.toUpperCase()) {
                    return value.id;
                }
            }
            throw new Error(ERRORS.CURRENCY_NOT_FOUND_ERROR);
      }).catch(e => {
            throw new Error(e);
      });
    }
}