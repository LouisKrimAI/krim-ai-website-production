import React from 'react';

interface OptimizedPictureProps {
  src: string;
  alt: string;
  sizes?: string;
  loading?: 'lazy' | 'eager';
  className?: string;
  width?: number;
  height?: number;
}

export const OptimizedPicture: React.FC<OptimizedPictureProps> = ({
  src,
  alt,
  sizes = '100vw',
  loading = 'lazy',
  className,
  width,
  height
}) => {
  // Extract base name without extension
  const baseName = src.replace(/.[^/.]+$/, '');
  
  return (
    <picture className={className}>
      {/* Mobile AVIF */}
      <source
        media="(max-width: 768px)"
        srcSet={`${baseName}-mobile.avif 1x, ${baseName}-mobile@2x.avif 2x`}
        type="image/avif"
      />
      
      {/* Mobile WebP */}
      <source
        media="(max-width: 768px)"
        srcSet={`${baseName}-mobile.webp 1x, ${baseName}-mobile@2x.webp 2x`}
        type="image/webp"
      />
      
      {/* Tablet AVIF */}
      <source
        media="(max-width: 1024px)"
        srcSet={`${baseName}-tablet.avif`}
        type="image/avif"
      />
      
      {/* Tablet WebP */}
      <source
        media="(max-width: 1024px)"
        srcSet={`${baseName}-tablet.webp`}
        type="image/webp"
      />
      
      {/* Desktop AVIF */}
      <source
        srcSet={`${baseName}-desktop.avif`}
        type="image/avif"
      />
      
      {/* Desktop WebP */}
      <source
        srcSet={`${baseName}-desktop.webp`}
        type="image/webp"
      />
      
      {/* Fallback */}
      <img
        src={`${baseName}-optimized.jpg`}
        alt={alt}
        sizes={sizes}
        loading={loading}
        decoding="async"
        width={width}
        height={height}
        className={className}
      />
    </picture>
  );
};

export default OptimizedPicture;
