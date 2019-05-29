const models = require('../models');


class Repository {

    constructor() {
        this.models = models();
        this.model = this.models.Example;
    }

    listAll() {
        return this.model.find();
    }

    getById(id) {
        return this.model.findById(id);
    }

    save(name) {
        return new Promise(
            (resolve, reject) => {
                let example = new this.model({
                    name: name,
                });
                resolve(example);
            })
            .then(example => example.save());
    }

    delete(id) {
        return this.model.deleteOne({ "_id": id });
    }
}

module.exports = Repository;