import Q from 'q';
/**
 * Utility method derived from API endpoints.
 * @class PokemaenApiUtils
 * @param {(string|object)} [domainOrOptions] - The project domain or options object. If object, see the object's optional properties.
 * @param {string} [domainOrOptions.domain] - The project domain
 * @param {object} [domainOrOptions.token] - auth token - object with value property and optional headerOrQueryName and isQuery properties
 */
const PokemaenApiUtils = (function () {
    function PokemaenApiUtils(options) {
        this.domain = 'https://pokeapi.co/api/v2/pokemon';
        if (this.domain.length === 0) {
            throw new Error('Domain parameter must be specified as a string.');
        }
        this.apiKey =
            typeof options === 'object'
                ? options.apiKey
                    ? options.apiKey
                    : {}
                : {};
    }

    function serializeQueryParams(parameters) {
        let str = [];
        for (let p in parameters) {
            if (parameters.hasOwnProperty(p)) {
                str.push(
                    encodeURIComponent(p) +
                        '=' +
                        encodeURIComponent(parameters[p])
                );
            }
        }
        return str.join('&');
    }

    function mergeQueryParams(parameters, queryParameters) {
        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function (
                parameterName
            ) {
                let parameter = parameters.$queryParameters[parameterName];
                queryParameters[parameterName] = parameter;
            });
        }
        return queryParameters;
    }

    /**
     * HTTP Request
     * @method
     * @name PokemaenApiUtils#request
     * @param {string} method - http method
     * @param {string} url - url to do request
     * @param {object} parameters
     * @param {object} body - body parameters / object
     * @param {object} headers - header parameters
     * @param {object} queryParameters - querystring parameters
     * @param {object} form - form data object
     * @param {object} deferred - promise object
     */
    PokemaenApiUtils.prototype.request = function (
        method,
        url,
        parameters,
        body,
        headers,
        queryParameters,
        form,
        deferred
    ) {
        const queryParams =
            queryParameters && Object.keys(queryParameters).length
                ? serializeQueryParams(queryParameters)
                : null;
        const urlWithParams = url + (queryParams ? '?' + queryParams : '');

        if (body && !Object.keys(body).length) {
            body = undefined;
        }

        fetch(urlWithParams, {
            method,
            headers,
            body: JSON.stringify(body)
        })
            .then(async response => {
                let res = {
                    data: response.json(),
                    ok: response.ok,
                    status: response.status,
                    statusText: response.statusText
                };
                const data = await res.data;
                res = {
                    ...res,
                    data
                };
                if (!response.ok) {
                    throw res;
                } else {
                    return res;
                }
            })
            .then(body => {
                deferred.resolve(body);
            })
            .catch(error => {
                deferred.reject(error);
            });
    };

    /**
     * Set Api Key
     * @method
     * @name PokemaenApiUtils#setApiKey
     * @param {string} value - apiKey's value
     * @param {string} headerOrQueryName - the header or query name to send the apiKey at
     * @param {boolean} isQuery - true if send the apiKey as query param, otherwise, send as header param
     */
    PokemaenApiUtils.prototype.setApiKey = function (
        value,
        headerOrQueryName,
        isQuery
    ) {
        this.apiKey.value = value;
        this.apiKey.headerOrQueryName = headerOrQueryName;
        this.apiKey.isQuery = isQuery;
    };
    /**
     * Set Auth headers
     * @method
     * @name PokemaenApiUtils#setAuthHeaders
     * @param {object} headerParams - headers object
     */
    PokemaenApiUtils.prototype.setAuthHeaders = function (headerParams) {
        let headers = headerParams ? headerParams : {};
        if (!this.apiKey.isQuery && this.apiKey.headerOrQueryName) {
            headers[this.apiKey.headerOrQueryName] = this.apiKey.value;
        }
        return headers;
    };

    /**
     * API endpoint to get all pokemons
     * @method
     * @name PokemaenApiUtils#getAllPokemons
     * @param {object} parameters - method options and parameters
     * @param {string} parameters.limit - Query string to get number of pokemons
     * @param {object} parameters.offset - Query string to skip number of pokemons
     */
    PokemaenApiUtils.prototype.getAllPokemons = function (parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        if (parameters['limit'] !== undefined) {
            queryParameters['limit'] = parameters['limit'];
        }

        if (parameters['offset'] !== undefined) {
            queryParameters['offset'] = parameters['offset'];
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request(
            'GET',
            domain + path,
            parameters,
            body,
            headers,
            queryParameters,
            form,
            deferred
        );

        return deferred.promise;
    };
    /**
     * API endpoint to get pokemon details by its name
     * @method
     * @name PokemaenApiUtils#getPokemonByName
     * @param {object} parameters - method options and parameters
     * @param {string} parameters.pokemonName - path parameter to get pokemon details by its name
     */
    PokemaenApiUtils.prototype.getPokemonByName = function (parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        let deferred = Q.defer();
        let domain = this.domain,
            path = '/{pokemon_name}';
        let body = {},
            queryParameters = {},
            headers = {},
            form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        path = path.replace('{pokemon_name}', parameters['pokemonName']);

        if (parameters['pokemonName'] === undefined) {
            deferred.reject(
                new Error('Missing required parameter: pokemonName')
            );
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request(
            'GET',
            domain + path,
            parameters,
            body,
            headers,
            queryParameters,
            form,
            deferred
        );

        return deferred.promise;
    };

    return PokemaenApiUtils;
})();

export default PokemaenApiUtils;
