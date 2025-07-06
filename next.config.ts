import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* confiimag options here */
  images : {
    dangerouslyAllowSVG:true,
    remotePatterns:[
      {
        protocol: 'https',
        hostname: '*',
      }
    ]
  },
  
};

export default nextConfig;
