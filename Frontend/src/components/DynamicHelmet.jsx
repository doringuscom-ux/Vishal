import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import axiosInstance from '../utils/axiosInstance';
import { STATIC_SEO_API } from '../utils/api';

export default function DynamicHelmet() {
  const location = useLocation();
  const [seoData, setSeoData] = useState(null);

  useEffect(() => {
    // Only fetch for non-dynamic paths. Dynamic paths (like /products/123 or /city/delhi) 
    // will manage their own SEO through their respective components.
    const isDynamic = location.pathname.startsWith('/products/') || 
                      location.pathname.startsWith('/city/') || 
                      location.pathname.startsWith('/admin');

    if (isDynamic) {
      setSeoData(null);
      return;
    }

    const fetchSeo = async () => {
      try {
        const { data } = await axiosInstance.get(STATIC_SEO_API);
        // Find the SEO entry that matches the current pathname
        const match = data.find(item => item.path === location.pathname || item.path === location.pathname + '/');
        
        if (match) {
          setSeoData(match);
        } else {
          setSeoData(null);
        }
      } catch (error) {
        console.error('Failed to fetch static SEO data', error);
      }
    };

    fetchSeo();
  }, [location.pathname]);

  if (!seoData) return null; // Let default or specific page helmet take over

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://vishalindustries.com';
  const metaCanonical = seoData.metaCanonical || `${baseUrl}${location.pathname}`;

  return (
    <Helmet>
      {seoData.metaTitle && <title>{seoData.metaTitle}</title>}
      {seoData.metaDescription && <meta name="description" content={seoData.metaDescription} />}
      {seoData.metaKeywords && <meta name="keywords" content={seoData.metaKeywords} />}
      <link rel="canonical" href={metaCanonical} />
      {seoData.metaRobots && <meta name="robots" content={seoData.metaRobots} />}
    </Helmet>
  );
}
