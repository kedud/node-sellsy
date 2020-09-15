

export default class CustomFields {
    constructor(sellsy) {
      this.sellsy = sellsy;
    }
    recordValues = (linkedType='document', docId, values) => {
        return this.sellsy.api({
            method: "CustomFields.recordValues",
            params: {
              linkedtype: linkedType,
              linkedid: docId,
              values: values
            },
        }).then((data)=> {
            if (data.error) {
                console.log(data.error);
				throw new Error(data.error);
            }
            console.log(data);
			return data;
        }).catch(e => {
            console.log(e)
            throw new Error(e);
        });
    }
}