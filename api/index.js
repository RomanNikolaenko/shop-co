export default import('../dist/shop-co/server/server.mjs')
  .then(m => m.reqHandler)
  .catch(err => {
    console.error('SSR load error:', err);
    throw err;
  });