import { stringify } from 'qs';
import { extra_config } from '../../config/extra.config';
import { getAccessToken, loginOut } from '@/utils/authority';
import { notification } from 'antd';

export async function request(url, type, param, headers, is_json) {
  type = type || 'GET';
  param = param || {};
  headers = headers || {};
  is_json = is_json === undefined ? true : is_json;
  let config = {
    method: type,
    headers: headers,
    credentials: 'include',
  };
  switch (type) {
    case 'GET':
      break;
    case 'HEAD':
      break;
    default:
      if (is_json) {
        config.body = JSON.stringify(param);
        config.headers['Content-Type'] = 'application/json; charset=utf-8';
      } else {
        config.body = param;
      }
      break;
  }
  var init_headers = {
    Authorization: getAccessToken(),
    // Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ6ZW1jaG8iLCJhdWQiOiIiLCJleHAiOjE2NDUxMzA3MTMsImRhdGEiOnsidWlkIjoyMzg3NX19.8JXOifYwTrPe-JDKwrL-TVDR66_5Ou8M-PCgky_jjrg',
  };
  headers = {
    ...init_headers,
    ...headers,
  };
  config.headers = headers;

  return new Promise(function(resolve, reject) {
    fetch(url, config)
      .then(function(res) {
        res.json().then(function(data) {
          switch (res.status) {
            case 200:
              break;
            case 401:
              loginOut();
              window.location.href = extra_config.url401;
              break;
            case 400:
            case 403:
            case 500:
            default:
              notification.error({
                description: '请求出错',
                message: data.message,
                duration: 3,
              });
              break;
          }
          resolve(data);
        });
      })
      .catch(function(error) {
        notification.error({
          description: '请求失败',
          message: error,
          duration: 3,
        });
        reject(error);
      });
  });
}

// eslint-disable-next-line camelcase
export function request_post(url, param, headers, is_json) {
  param = param || {};
  headers = headers || {};
  is_json = is_json === undefined ? true : is_json;
  return request(url, 'POST', param, headers, is_json);
}

export function request_get(url, param, headers) {
  param = param || {};
  headers = headers || {};
  const query = stringify(param);
  if (query === '') {
    return request(url, 'GET', headers);
  }
  return request(`${url}?${query}`, 'GET', headers);
}
