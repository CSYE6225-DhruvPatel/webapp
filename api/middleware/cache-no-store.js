export const cacheNoStore = (req, res, next) => {
    // Set Cache-Control header to 'no-store'
    res.setHeader('cache-control', 'no-cache, no-store, must-revalidate')
    .setHeader('pragma', 'no-cache')
    next();
  }
  