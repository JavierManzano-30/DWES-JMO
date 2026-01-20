const express = require('express');
const externalService = require('../services/external');

const router = express.Router();

router.get('/axios/posts', async (req, res, next) => {
  try {
    const { page, pageSize, userId } = req.query;
    const data = await externalService.fetchPostsWithAxios({
      page,
      pageSize,
      userId,
    });

    res.json(data);
  } catch (err) {
    next(err);
  }
});

router.post('/axios/posts', async (req, res, next) => {
  try {
    const payload = req.body || {};
    const data = await externalService.createPostWithAxios(payload);

    res.status(201).json(data);
  } catch (err) {
    next(err);
  }
});

router.get('/got/posts', async (req, res, next) => {
  try {
    const { page, pageSize, userId } = req.query;
    const data = await externalService.fetchPostsWithGot({
      page,
      pageSize,
      userId,
    });

    res.json(data);
  } catch (err) {
    next(err);
  }
});

router.post('/got/posts', async (req, res, next) => {
  try {
    const payload = req.body || {};
    const data = await externalService.createPostWithGot(payload);

    res.status(201).json(data);
  } catch (err) {
    next(err);
  }
});

router.get('/sample', async (_req, res, next) => {
  try {
    const axiosResult = await externalService.fetchPostsWithAxios({
      page: 1,
      pageSize: 3,
    });
    const gotResult = await externalService.fetchPostsWithGot({
      page: 1,
      pageSize: 3,
    });

    res.json({
      axios: axiosResult.data,
      got: gotResult.data,
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
