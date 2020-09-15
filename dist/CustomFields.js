"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CustomFields = function CustomFields(sellsy) {
    var _this = this;

    _classCallCheck(this, CustomFields);

    this.recordValues = function () {
        var linkedType = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'document';
        var docId = arguments[1];
        var values = arguments[2];

        return _this.sellsy.api({
            method: "CustomFields.recordValues",
            params: {
                linkedtype: linkedType,
                linkedid: docId,
                values: values
            }
        }).then(function (data) {
            if (data.error) {
                console.log(data.error);
                throw new Error(data.error);
            }
            console.log(data);
            return data;
        }).catch(function (e) {
            console.log(e);
            throw new Error(e);
        });
    };

    this.sellsy = sellsy;
};

exports.default = CustomFields;