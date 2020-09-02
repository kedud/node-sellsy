import ERRORS from './ERRORS';

export default class Addresses {
    constructor(sellsy) {
        this.sellsy = sellsy;
    }
    getList = (linkedIDs) => {
        return sellsy.api({
            method: "Addresses.getList",
            params: {
                search: {
                    linkedType: "third",
                    linkedIDs: linkedIDs,
                },
            },
        }).then((data) => {
            if (data.error) {
                throw new Error(data.error);
            }
            return Object.entries(data.response.result);
      }).catch((e) => {
        throw new Error(e);
      });
    }
}