import { jest } from '@jest/globals';

const queryMock = jest.fn();

jest.unstable_mockModule('../../src/db/pool.js', () => ({
  default: {
    query: queryMock,
  },
}));

const { listCategories } = await import('../../src/controllers/categoriesController.js');

describe('categories controller', () => {
  test('listCategories devuelve lista', async () => {
    queryMock.mockResolvedValue({
      rows: [{ id: 1, slug: 'street', name: 'Street' }],
    });

    const res = { json: jest.fn() };

    await listCategories({}, res);

    expect(queryMock).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith({
      data: [{ id: 1, slug: 'street', name: 'Street' }],
    });
  });
});
