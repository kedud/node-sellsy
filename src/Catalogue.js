import ERRORS from './ERRORS';

const DEFAULT_GET_LIST_PAGINATION = {
    nbperpage: 100,
    pagenum: 1
  }
  
const DEFAULT_GET_LIST_ORDER = {
    direction: 'ASC',
    order: 'item_name'
}

const TYPES = {
    item: 'item',
    service: 'service',
}

export default class Catalogue {
    constructor(sellsy) {
        this.sellsy = sellsy;
        this.TYPES = TYPES;
    }
    getBarCodes = (type, itemId) => {
        return this.sellsy.api({
            method: 'Catalogue.getBarCodes',
            params: {
                type: type,
                id: itemId,
            },
        })
        .then((data) => {
            console.log(data);
            if (data.error) {
                throw new Error(data.error);
            }
            return Object.values(data.response);
        })
        .catch(e => {
            console.log(e);
            throw new Error(e);
        });
    }
    getBarCode = (type, itemId, declId) => {
        return this.sellsy.api({
            method: 'Catalogue.getBarCodes',
            params: {
                type: type,
                id: itemId,
            },
        })
        .then((data) => {
            if (data.error) {
                throw new Error(data.error);
            }
            const barCodes = Object.values(data.response);
            let barCode = barCodes.find(b => declId == b.declid);
            return barCode;
        })
        .catch(e => {
            throw new Error(e);
        });
    }
    getList = (type=this.TYPES.item, tags, rateCategory, pagination=DEFAULT_GET_LIST_PAGINATION, order=DEFAULT_GET_LIST_ORDER) => {
        return this.sellsy.api({
            method: "Catalogue.getList",
            params: {
                type: type,
                search: {
                    tags: tags,
                    useDeclination: "Y",
                    rateCategory: rateCategory,
                    combineDecli: "Y",
                    actif: "Y",
                },
                pagination,
                order,
            },
        })
        .then((data) => {
            if (data.error) {
                throw new Error(data.error);
            }
            return Object.values(data.response.result);
        }).catch(e => {
            throw new Error(e);
        });
    }
    getVariations = (itemId) => {
        return this.sellsy.api({
			method: 'Catalogue.getVariations',
			params: {
				itemid: itemId,
			},
		})
		.then((data) => {
			if (data.error) {
                throw new Error(data.error);
			}
			return Object.values(data.response);
		})
		.catch(e => {
			throw new Error(e);
		});
    }
    getVariation = (itemId, declId) => {
        return this.sellsy.api({
			method: 'Catalogue.getVariation',
			params: {
				declid: declId,
				itemid: itemId,
			},
		})
		.then((data) => {
			if (data.error) {
                throw new Error(data.error);
			}
			return data.response;
		})
		.catch(e => {
            throw new Error(e);
		});
    }
}