/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  /*
   * Lets a second dev server (e.g. a preview running alongside another) build
   * into its own directory instead of fighting over `.next`. Unset in normal
   * use, so the default build output is unchanged.
   */
  distDir: process.env.NEXT_DIST_DIR || '.next',
  images: {
    formats: ['image/avif', 'image/webp'],
    /*
     * The photographs are phone exports, about 560–591px wide. Asking the
     * optimizer for anything larger than that is pure upscale: a softer
     * picture in a bigger file. These ladders stop just above the source
     * width so the browser always lands on a size the photo can actually
     * fill.
     *
     * If higher-resolution pictures are ever dropped into public/images,
     * raise the top of `deviceSizes` (e.g. add 828, 1080, 1440) to let them
     * be served at their full detail.
     */
    deviceSizes: [256, 320, 420, 560, 640],
    imageSizes: [96, 128, 192, 256, 384],
    minimumCacheTTL: 2678400,
  },
};

export default nextConfig;
