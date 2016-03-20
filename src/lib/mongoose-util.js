module.exports = function (schema) {

    schema.methods.reloadDoc = function refreshDoc() {
        var args = arguments;
        Array.prototype.unshift.call(args, this._id);
        return this.constructor.findById.apply(this.constructor, args);
    };

};
