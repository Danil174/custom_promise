class CustomPromise {
    constructor(executor) {
        this.queue = [];
        this.errorHandler = () => {};
        this.finallyrHandler = () => {};

        try {
            executor.call(null, this.onResolve.bind(this), this.onReject.bind(this));
        } catch(e) {
            this.errorHandler(e);
        } finally {
            this.finallyrHandler();
        }
    }

    onResolve(data) {
        this.queue.forEach(cb => {
            data = cb(data);
        });
        
        this.finallyrHandler();
    }

    onReject(error) {
        this.errorHandler(error);
        this.finallyrHandler();
    }

    then(fn) {
        this.queue.push(fn);
        return this;
    }

    catch(fn) {
        this.errorHandler = fn;
        return this;
    }

    finally(fn) {
        this.finallyrHandler = fn;
        return this;
    }
};

module.exports = CustomPromise;