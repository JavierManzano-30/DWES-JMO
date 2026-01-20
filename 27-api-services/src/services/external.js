const axios = require('axios');
const got = require('got').default;
const config = require('../config');

function buildQuery({ page, pageSize, userId }) {
  const params = new URLSearchParams();

  if (page) {
    params.append('_page', page);
  }

  if (pageSize) {
    params.append('_limit', pageSize);
  }

  if (userId) {
    params.append('userId', userId);
  }

  return params.toString();
}

function buildPostsUrl(query) {
  const base = `${config.externalApi.baseUrl}/posts`;
  return query ? `${base}?${query}` : base;
}

async function fetchPostsWithAxios({ page, pageSize, userId }) {
  const query = buildQuery({ page, pageSize, userId });
  const url = buildPostsUrl(query);

  const response = await axios.get(url, {
    timeout: config.externalApi.timeoutMs,
  });

  return {
    provider: 'axios',
    data: response.data,
    page: page ? Number(page) : null,
    pageSize: pageSize ? Number(pageSize) : null,
  };
}

async function createPostWithAxios(payload) {
  const url = buildPostsUrl('');
  const response = await axios.post(url, payload, {
    timeout: config.externalApi.timeoutMs,
  });

  return {
    provider: 'axios',
    data: response.data,
  };
}

async function fetchPostsWithGot({ page, pageSize, userId }) {
  const query = buildQuery({ page, pageSize, userId });
  const url = buildPostsUrl(query);

  const response = await got(url, {
    responseType: 'json',
    timeout: {
      request: config.externalApi.timeoutMs,
    },
  });

  return {
    provider: 'got',
    data: response.body,
    page: page ? Number(page) : null,
    pageSize: pageSize ? Number(pageSize) : null,
  };
}

async function createPostWithGot(payload) {
  const url = buildPostsUrl('');
  const response = await got.post(url, {
    json: payload,
    responseType: 'json',
    timeout: {
      request: config.externalApi.timeoutMs,
    },
  });

  return {
    provider: 'got',
    data: response.body,
  };
}

module.exports = {
  fetchPostsWithAxios,
  createPostWithAxios,
  fetchPostsWithGot,
  createPostWithGot,
};
