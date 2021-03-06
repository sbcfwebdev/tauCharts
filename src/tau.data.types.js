(function () {
    var notImplemented = function () {
        throw new Error('Not implemented');
    };

    /**
     * @class
     * @extends Class
     */
    var Type = Class.extend({
        /**
         * @abstract
         */
        defaultScale: notImplemented,

        /**
         * @abstract
         */
        setDomain: notImplemented
    });

    /**
     * @class
     * @extends Type
     */
    var Quantitative = Type.extend({
        defaultScale: function () {
            return d3.scale.linear();
        },

        /**
         * @this PropertyMapper
         * @param data
         */
        setDomain: function (data) {
            // TODO: messy
            var hasValue = data.length && this._getOwnProperty(data[0]);
            if (!hasValue) {
                this._scale = this._scale.domain([0, this._default]);
                return;
            }
            //
            
            this._scale = this._scale.domain([0, d3.max(data, this.raw.bind(this))]);
        }
    });

    /**
     * @class
     * @extends Type
     */
    var Time = Type.extend({
        defaultScale: function () {
            return d3.scale.time();
        },

        /**
         * @this PropertyMapper
         * @param data
         */
        setDomain: function (data) {
            // TODO: messy. Maybe we need a different check for Time type?
            var hasValue = data.length && this._getOwnProperty(data[0]);
            if (!hasValue) {
                this._scale = this._scale.domain([0, this._default]);
                return;
            }
            //

            // find min and max dates in time series.
            this._scale = this._scale.domain([d3.min(data, function(d) {return d[hasValue];}), d3.max(data, function(d) {return d[hasValue];})]);
        }
    });

    /**
     * @class
     * @extends Type
     */
    var Categorical = Type.extend({
        defaultScale: function () {
            return tau.data.scale.color10();
        },

        setDomain: function () {
        }
    });

    tau.data.types = {
        quantitative: new Quantitative(),
        categorical: new Categorical(),
        time: new Time()
    };
})();