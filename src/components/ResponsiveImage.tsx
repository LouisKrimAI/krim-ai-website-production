import React from 'react';

interface ResponsiveImageProps {
  baseName: string; // e.g., 'ai-agent-grid-workforce'
  baseDir?: string; // e.g., '/assets/images/'
  alt: string;
  className?: string;
  loading?: 'lazy' | 'eager';
  sizes?: string;
  width?: number;
  height?: number;
}

/**
 * Responsive Image Component
 * Automatically uses optimized versions based on viewport
 */
export const ResponsiveImage: React.FC<ResponsiveImageProps> = ({
  baseName,
  baseDir = '/assets/images/',
  alt,
  className = '',
  loading = 'lazy',
  sizes = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
  width,
  height
}) => {
  const baseUrl = `${baseDir}${baseName}`;
  
  return (
    <picture className={className}>
      {/* WebP sources for modern browsers */}
      <source
        media="(max-width: 640px)"
        srcSet={`${baseUrl}-mobile.webp`}
        type="image/webp"
      />
      <source
        media="(max-width: 1024px)"
        srcSet={`${baseUrl}-tablet.webp`}
        type="image/webp"
      />
      <source
        srcSet={`${baseUrl}-desktop.webp`}
        type="image/webp"
      />
      
      {/* JPEG fallbacks */}
      <source
        media="(max-width: 640px)"
        srcSet={`${baseUrl}-mobile.jpg`}
        type="image/jpeg"
      />
      <source
        media="(max-width: 1024px)"
        srcSet={`${baseUrl}-tablet.jpg`}
        type="image/jpeg"
      />
      
      {/* Default img tag with largest JPEG */}
      <img
        src={`${baseUrl}-desktop.jpg`}
        alt={alt}
        loading={loading}
        sizes={sizes}
        width={width}
        height={height}
        className={`max-w-full h-auto ${className}`}
      />
    </picture>
  );
};

export default ResponsiveImage;