//  @type {import('next').NextConfig} /
const nextConfig = {
  // reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
  },
  // webpack: (config, { isServer }) => {
  //   // Set the pdfjs worker URL for client-side builds only
  //   if (!isServer) {
  //     config.module.rules.push({
  //       test: /pdf\.worker\.(min\.)?js/,
  //       use: [
  //         {
  //           loader: 'file-loader',
  //           options: {
  //             publicPath: '/_next/static/pdfjs/',
  //             outputPath: 'static/pdfjs/',
  //             name: '[name].[hash].[ext]',
  //           },
  //         },
  //       ],
  //     });
  //     config.resolve.alias['pdfjs-dist/build/pdf.worker'] = `pdfjs-dist/build/pdf.worker.min.js`;
  //   }

  //   return config;
  // },
};

module.exports = nextConfig;
