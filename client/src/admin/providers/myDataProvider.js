import {
    GET_LIST,
    GET_ONE,
    GET_MANY,
    GET_MANY_REFERENCE,
    CREATE,
    UPDATE,
    DELETE_MANY,
    DELETE,
    fetchUtils,
} from 'react-admin';
import { stringify } from 'query-string';
import config from '../../config/urls';

/* const API_URL =  'my.api.url' */
const API_URL = process.env.NODE_ENV === 'development' ? config.devServer : config.server

/**
* @param {String} type One of the constants appearing at the top of this file, e.g. 'UPDATE'
* @param {String} resource Name of the resource to fetch, e.g. 'posts'
* @param {Object} params The Data Provider request params, depending on the type
* @returns {Object} { url, options } The HTTP request parameters
*/
const convertDataProviderRequestToHTTP = (type, resource, params) => {

    const token = localStorage.getItem('treatmeUser').token;
    console.log(token)
    let headers = new Headers()
    headers.append('Content-Type', 'application/json')
    headers.append('Accept', 'application/json')
    headers.append('Authorization', `Bearer ${token}`)
    headers.append('Access-Control-Allow-Origin', '*')

    const options = {
        headers
    };
    switch (type) {
    case GET_LIST: {
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;
        const query = {
            sort: JSON.stringify([field, order]),
            range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
            filter: JSON.stringify(params.filter),
        };
        return { url: `${API_URL}/${resource}?${stringify(query)}`,options };
/*         return { url: `${API_URL}/${resource}/`, options };
 */    }
    case GET_ONE:
        return { url: `${API_URL}/${resource}/${params.id}`,options };
    case GET_MANY: {
        const query = {
            filter: JSON.stringify({ id: params.ids }),
        };
        return { url: `${API_URL}/${resource}?${stringify(query)}`,options };
    }
    case GET_MANY_REFERENCE: {
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;
        const query = {
            sort: JSON.stringify([field, order]),
            range: JSON.stringify([(page - 1) * perPage, (page * perPage) - 1]),
            filter: JSON.stringify({ ...params.filter, [params.target]: params.id }),
        };
        return { url: `${API_URL}/${resource}?${stringify(query)}`,options };
    }
    case UPDATE:
        return {
            url: `${API_URL}/${resource}/${params.id}`,
            options: { method: 'PUT', body: JSON.stringify(params.data),headers },
        };
    case CREATE:
        return {
            url: `${API_URL}/${resource}`,
            options: { method: 'POST', body: JSON.stringify(params.data),headers },
        };
    case DELETE:
        return {
            url: `${API_URL}/${resource}/${params.id}`,
            options: { method: 'DELETE',headers },
        };
    case DELETE_MANY:
        const query = {
            filter: JSON.stringify({ id: params.ids }),
        };
        return {
            url: `${API_URL}/${resource}?${stringify(query)}`,
            options: { method: 'DELETE',headers },
        };
    default:
        throw new Error(`Unsupported fetch action type ${type}`);
    }
};

/**
* @param {Object} response HTTP response from fetch()
* @param {String} type One of the constants appearing at the top of this file, e.g. 'UPDATE'
* @param {String} resource Name of the resource to fetch, e.g. 'posts'
* @param {Object} params The Data Provider request params, depending on the type
* @returns {Object} Data Provider response
*/
const convertHTTPResponseToDataProvider = (response, type, resource, params) => {
    const { headers, json } = response;

    switch (type) {
        case GET_LIST:
            if (!headers.has('content-range')) {
                throw new Error(
                    'The Content-Range header is missing in the HTTP Response. The simple REST data provider expects responses for lists of resources to contain this header with the total number of results to build the pagination. If you are using CORS, did you declare Content-Range in the Access-Control-Expose-Headers header?'
                );
            }
            return {
                data: json.map(x => ({...x,id:x._id})),
                total: parseInt(
                    headers
                        .get('content-range')
                        .split('/')
                        .pop(),
                    10
                ),
            };
        case GET_MANY_REFERENCE:
            if (!headers.has('content-range')) {
                throw new Error(
                    'The Content-Range header is missing in the HTTP Response. The simple REST data provider expects responses for lists of resources to contain this header with the total number of results to build the pagination. If you are using CORS, did you declare Content-Range in the Access-Control-Expose-Headers header?'
                );
            }
            return {
                data: json.map(x => ({...x,id:x._id})),
                total: parseInt(
                    headers
                        .get('content-range')
                        .split('/')
                        .pop(),
                    10
                ),
            };

        case GET_MANY:
            return {
                data: json.map(x => ({...x,id:x._id})),
            };
        case DELETE_MANY:
            return {
                data: json.map(x => ({...x,id:x._id})),
            };
        case CREATE:
            return { data: {...json,id:json._id } };
        case GET_ONE:
            return { data: {...json,id:json._id } };
        case UPDATE:
            return { data: {...json,id:json._id } };
        default:
            return { data: {...json,id:json._id } };
    }
};

/**
* @param {string} type Request type, e.g GET_LIST
* @param {string} resource Resource name, e.g. "posts"
* @param {Object} payload Request parameters. Depends on the request type
* @returns {Promise} the Promise for response
*/
export default (type, resource, params) => {
  const { fetchJson } = fetchUtils;
  const { url, options } = convertDataProviderRequestToHTTP(type, resource, params);

  return fetchJson(url, options)
      .then(response => convertHTTPResponseToDataProvider(response, type, resource, params));
};