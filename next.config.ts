import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* confiimag options here */
  typescript:{
    ignoreBuildErrors:true
  },
  eslint:{
    ignoreDuringBuilds: true
  },
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
