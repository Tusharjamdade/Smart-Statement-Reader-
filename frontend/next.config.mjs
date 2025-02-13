/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        hostHeader: true, // Ensure Next.js respects the host header
      },
};

export default nextConfig;
// module.exports = {
//     experimental: {
//       hostHeader: true, // Ensure Next.js respects the host header
//     },
//   };
  