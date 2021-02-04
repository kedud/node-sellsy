
import ERRORS from './ERRORS';

export default class Customers {
  constructor(sellsy) {
    this.udpate = this.create;
    this.sellsy = sellsy;
  }
  create = data => {
    let method = data.clientid ? 'update':'create';
    return this.sellsy.api({
      method: `Peoples.${method}`,
      params: data
    }).then(data => {
      console.log(data);
     if (data.status === 'success') {
        // fetch created customer data
        return this.sellsy.api({
          method: 'Peoples.getOne',
          params: {
            clientid: data.response.client_id
          }
        }).then(data => data.response.client)
     }
     throw new Error(ERRORS.CUSTOMER_CREATE_ERROR);
    });
  }
  getList = search => {
    return this.sellsy.api({
      method: 'Peoples.getList',
      params: {
        search: search
      }
    }).then(data => {
      if (data.response.infos.nbtotal !== '0') {
        // always return first result
        let keys = Object.keys(data.response.result);
        return data.response.result[keys[0]];
      } else {
        throw new Error(ERRORS.CUSTOMER_NOT_FOUND);
      }
    }).catch(e => {
     throw new Error(ERRORS.CUSTOMER_NOT_FOUND);
    });
  }
  getOne = (clientId) => {
    return this.sellsy.api({
			method: 'Peoples.getOne',
			params: {
				clientid: clientId,
			},
		})
		.then((data) => {
			if (data.error) {
				throw new Error(data.error);
			}
			return data.response.client;
		})
		.catch(e => {
			throw new Error(e);
		});
  }
  getAddresses = (contactId) => {
    return this.sellsy.api({
      method: "Peoples.getAddresses",
      params: {
        id: contactId,
      },
    }).then((data) => {
      if (data.error) {
				throw new Error(data.error);
			}
      return data.response;
    }).catch(e => { 
      throw new Error(e);
    });
  }
}
