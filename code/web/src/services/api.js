import { stringify } from 'qs';
import request from '@/utils/request';

export async function queryNotices(params = {}) {
  return request(`/api/notices?${stringify(params)}`);
}

export async function getAccessToken(params = {}) {
  return request(`/api/getAccessToken`, {
    method: 'POST',
    data: params,
  });
}

export async function getH5List(params = {}) {
  return request(`/api/getH5List?${stringify(params)}`);
}

export async function getFixedLink(params = {}) {
  return request(`/api/getFixedLink?${stringify(params)}`);
}

export async function getUserList(params = {}) {
  return request(`/api/getUserList?${stringify(params)}`);
}

export async function getProjectVersionList(params = {}) {
  return request(`/api/getProjectVersionList?${stringify(params)}`);
}

export async function delProjectVersion(params = {}) {
  return request(`/api/delProjectVersion`, {
    method: 'POST',
    data: params,
  });
}

export async function delProject(params = {}) {
  return request(`/api/delProject`, {
    method: 'POST',
    data: params,
  });
}

export async function addH5List(params = {}) {
  return request(`/api/addH5List`, {
    method: 'POST',
    data: params,
  });
}

export async function addUser(params = {}) {
  return request(`/api/addUser`, {
    method: 'POST',
    data: params,
  });
}

export async function editH5List(params = {}) {
  return request(`/api/editH5List`, {
    method: 'POST',
    data: params,
  });
}

export async function editUser(params = {}) {
  return request(`/api/editUser`, {
    method: 'POST',
    data: params,
  });
}
