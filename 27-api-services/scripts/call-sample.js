const externalService = require('../src/services/external');

async function main() {
  const axiosResult = await externalService.fetchPostsWithAxios({
    page: 1,
    pageSize: 3,
  });

  const gotResult = await externalService.fetchPostsWithGot({
    page: 1,
    pageSize: 3,
  });

  console.log('Axios result count:', axiosResult.data.length);
  console.log('Got result count:', gotResult.data.length);
}

main().catch((error) => {
  console.error('Error calling external API:', error.message);
  process.exitCode = 1;
});
