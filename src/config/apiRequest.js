import axios from 'axios';
import { IMAGE_URL, APIHOST, defaultQueryOptions, apiConfig } from './apiConfig';

const prepareQuery = (queryOptions) => {
    return Object.entries(queryOptions)
        .map(([index, val]) => `${index}=${val}`)
        .join("&");
}
const prepareRequestData = async (options) => {
    const { apiUrl, headers = {}, data = {}, appendUrl = '' } = options;
    const { url, method } = apiConfig[apiUrl];
    const _appendUrl = appendUrl ? `${appendUrl}?` : '';
    const reqURL = `${APIHOST}${url}${_appendUrl}${prepareQuery({...defaultQueryOptions, ...data})}`;
    return {
        url: reqURL,
        method
    }
}

const apiRequest = async (options = {}) => {
    const reqData = await prepareRequestData(options);
    try {
        const response = await axios(reqData);
        const jsonResponse = await response.data;
        return jsonResponse;
    } catch (err) {
        return "A";
    }
}

export default apiRequest;