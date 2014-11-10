function Controller (model) {

    this.add = function (item) {
        model.list.push(item);
    };
}