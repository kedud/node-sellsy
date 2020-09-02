import ERRORS from './ERRORS';

export default class SmartTags {
    constructor(sellsy) {
        this.sellsy = sellsy;
    }
    getList = (category) => {
        return this.sellsy.api({
          method: "SmartTags.getList",
          params: {
            search: {
              category: category,
            },
          },
        }).then((data) => {
            if (data.error) {
                throw new Error(data.error);
            }
            return Object.values(data.response.result);
        }).catch((e) => {
            throw new Error(e);
        });
    }
}