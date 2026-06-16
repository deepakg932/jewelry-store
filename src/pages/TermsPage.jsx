// src/pages/TermsPage.jsx
import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { apiService } from "@services/api";

const TermsPage = () => {
  const [pageContent, setPageContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  useEffect(() => {
    const fetchTermsPage = async () => {
      try {
        setLoading(true);
        const data = await apiService.getPageBySlug('terms-and-consdition');
        
        if (data && data.content) {
          setPageContent(data);
          // Format the last updated date
          if (data.updated_at) {
            const date = new Date(data.updated_at);
            setLastUpdated(date.toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            }));
          }
        } else {
          setError('Page content not found');
        }
      } catch (err) {
        console.error('Error fetching terms page:', err);
        setError('Failed to load terms and conditions');
      } finally {
        setLoading(false);
      }
    };

    fetchTermsPage();
  }, []);

  // Helper function to render content with proper formatting
  const renderContent = (content) => {
    if (!content) return null;
    
    // Split content by double newlines for paragraphs
    let paragraphs = content.split(/\n\n+/);
    
    // If no double newlines, split by single newlines
    if (paragraphs.length === 1 && content.includes('\n')) {
      paragraphs = content.split(/\n/);
    }
    
    return paragraphs.map((paragraph, index) => {
      const trimmedParagraph = paragraph.trim();
      if (!trimmedParagraph) return null;
      
      // Check if paragraph starts with a number (likely a section heading)
      if (/^\d+\./.test(trimmedParagraph)) {
        return (
          <div key={index} className="mb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-3">
              {trimmedParagraph.split('\n')[0]}
            </h3>
            {trimmedParagraph.split('\n').slice(1).map((line, lineIdx) => (
              line.trim() && <p key={lineIdx} className="text-gray-600 leading-relaxed mb-2">
                {line.trim()}
              </p>
            ))}
          </div>
        );
      }
      
      // Check if it's a subheading (starts with bullet or dash)
      if (/^[•\-]/.test(trimmedParagraph)) {
        return (
          <div key={index} className="mb-3 ml-4">
            <p className="text-gray-600 leading-relaxed">
              {trimmedParagraph}
            </p>
          </div>
        );
      }
      
      // Regular paragraph
      return (
        <p key={index} className="text-gray-600 leading-relaxed mb-4">
          {trimmedParagraph}
        </p>
      );
    });
  };

  if (loading) {
    return (
      <>
        <Helmet>
          <title>Terms and Conditions | LUMIÈRE Jewelry</title>
          <meta name="description" content="Read our terms and conditions to understand the guidelines for using our website and services." />
        </Helmet>

        <div className="pt-32 pb-20 bg-gradient-to-b from-white to-gray-50/30 min-h-screen">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="animate-pulse">
              <div className="h-10 bg-gray-200 rounded-lg w-64 mx-auto mb-6"></div>
              <div className="h-4 bg-gray-200 rounded w-48 mx-auto mb-12"></div>
              <div className="space-y-6">
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-32 bg-gray-200 rounded-lg w-full"></div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (error || !pageContent) {
    return (
      <>
        <Helmet>
          <title>Terms and Conditions | LUMIÈRE Jewelry</title>
        </Helmet>

        <div className="pt-32 pb-20 min-h-screen bg-gradient-to-b from-white to-gray-50/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-50 rounded-full mb-6">
              <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h1 className="text-2xl font-light text-gray-900 mb-4">Content Not Available</h1>
            <p className="text-gray-500 mb-8">The terms and conditions content is currently unavailable.</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>{pageContent.title || 'Terms and Conditions'} | LUMIÈRE Jewelry</title>
        <meta 
          name="description" 
          content={pageContent.meta_description || "Read our terms and conditions to understand the guidelines for using our website and services."} 
        />
        {pageContent.meta_keywords && (
          <meta name="keywords" content={pageContent.meta_keywords} />
        )}
      </Helmet>

      <div className="pt-32 pb-20 bg-gradient-to-b from-white to-gray-50/30 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-block mb-4">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gray-900/5 text-gray-600 text-xs font-light tracking-wider uppercase border border-gray-200">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gray-900 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-gray-900"></span>
                </span>
                Legal Information
              </span>
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-tight text-gray-900 mb-4">
              {pageContent.title || 'Terms and Conditions'}
            </h1>
            
            <div className="flex justify-center gap-2 mb-6">
              <div className="w-12 h-px bg-gradient-to-r from-transparent to-gray-400" />
              <div className="w-2 h-2 rounded-full bg-gray-400" />
              <div className="w-12 h-px bg-gradient-to-l from-transparent to-gray-400" />
            </div>
            
            {lastUpdated && (
              <p className="text-sm text-gray-500">
                Last Updated: {lastUpdated}
              </p>
            )}
          </div>

          {/* Content Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 md:p-8 lg:p-10">
              {/* Main Content */}
              <div className="prose prose-gray max-w-none">
                {renderContent(pageContent.content)}
              </div>

              {/* Acceptance Section */}
              <div className="mt-8 pt-6 border-t border-gray-100">
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-base font-medium text-gray-900 mb-3 flex items-center gap-2">
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Acknowledgment
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    By using our website, you acknowledge that you have read, understood, and agree to be bound by these terms and conditions. 
                    If you do not agree with any part of these terms, please do not use our website.
                  </p>
                </div>
              </div>

              {/* Contact Information */}
              <div className="mt-6 pt-6 border-t border-gray-100">
                <h3 className="text-base font-medium text-gray-900 mb-3">Questions?</h3>
                <p className="text-gray-600 mb-3">
                  If you have any questions about these Terms and Conditions, please contact us:
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a 
                    href="/contact" 
                    className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors text-sm"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Contact Us
                  </a>
                  <a 
                    href="/privacy" 
                    className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors text-sm"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    Privacy Policy
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Download Button */}
          <div className="text-center mt-8">
            <button 
              onClick={() => {
                const element = document.createElement('a');
                const text = pageContent.content;
                const blob = new Blob([text], { type: 'text/plain' });
                element.href = URL.createObjectURL(blob);
                element.download = 'terms-and-conditions.txt';
                document.body.appendChild(element);
                element.click();
                document.body.removeChild(element);
              }}
              className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download as Text
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TermsPage;
