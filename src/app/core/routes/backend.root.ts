import { APP_ROOT } from './frontend.root';

export const BASE_URL = 'hospotic.com/';
export const PREFIX = 'https://';
export const ROUTE_APP = 'app';
export const ROUTE_CONFIG = 'config';

export const URL_MAIN_PROD = PREFIX + BASE_URL;
export const URL_MAIN_TEST = PREFIX + BASE_URL;
export const URL_MAIN_DEV = PREFIX + BASE_URL;
export const URL_MAIN_LOCAL = 'http://localhost:5100/';
export const URL_MAIN_LOCAL_SOCKET = 'http://localhost:5100/';

export const URL_PROD = {
  baseUrl: 'https://api.hospotic.com/api/v1/',
  baseUrlFiles: 'https://api.hospotic.com/uploads/',
  baseUrlPdfs: 'https://api.hospotic.com/pdfs/',
};

export const URL_TEST = {
  baseUrl: 'https://test-api.hospotic.com/api/v1/',
  baseUrlFiles: 'https://test-api.hospotic.com/uploads/',
  baseUrlPdfs: 'https://test-api.hospotic.com/pdfs/',
};

export const URL_DEV = {
  baseUrl: 'https://dev-api.hospotic.com/api/v1/',
  baseUrlFiles: 'https://dev-api.hospotic.com/uploads/',
  baseUrlPdfs: 'https://dev-api.hospotic.com/pdfs/',
};

export const URL_LOCAL = {
  baseUrl: 'http://localhost:5001/api/v1/',
  baseUrlFiles: 'http://localhost:5001/uploads/',
  baseUrlPdfs: 'http://localhost:5001/pdfs/',
};

export let URL_API =
  window.location.href.includes('dev-') || window.location.href.includes('dev.')
    ? URL_DEV
    : window.location.href.includes('test-') ||
      window.location.href.includes('test.')
    ? URL_TEST
    : window.location.href.includes('localhost')
    ? URL_LOCAL
    : URL_PROD;

//---------------------------------------------
//------------------- ROOT MOUDUL --------------------
export const CAA = 'caa';
export const CAA_ROOT = '/caa';

export const API_CITY = 'city';
export const API_CITY_ROOT = CAA + '/' + API_CITY;

export const API_DAY = 'day';
export const API_DAY_ROOT = CAA + '/' + API_DAY;

export const API_FLIGHT = 'flight';
export const API_FLIGHT_ROOT = CAA + '/' + API_FLIGHT;
