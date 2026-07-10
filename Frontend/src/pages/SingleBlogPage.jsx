import { useState, useEffect } from 'react';
import { Calendar, User, ChevronRight, Search, Tag, Share2, MapPin, Phone, Mail, ArrowRight } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { BLOGS_API } from '../utils/api';

export default function SingleBlogPage() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [allBlogs, setAllBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`${BLOGS_API}/${slug}`);
        setBlog(data);

        // Fetch all blogs for the sidebar (recent posts, categories)
        const { data: blogsList } = await axios.get(BLOGS_API);
        setAllBlogs(blogsList);
        
        setLoading(false);
      } catch (err) {
        setError('Blog not found');
        setLoading(false);
      }
    };
    fetchBlog();
    window.scrollTo(0, 0);
  }, [slug]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Get recent 3 posts excluding current
  const recentPosts = allBlogs.filter(b => b._id !== blog?._id).slice(0, 3);
  
  // Get unique categories
  const categories = [...new Set(allBlogs.map(b => b.category).filter(Boolean))];

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-gray-50">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-gray-50 text-center px-4">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">Article Not Found</h2>
        <p className="text-gray-500 mb-8 text-lg">The page you are looking for has been moved or deleted.</p>
        <Link to="/blog" className="bg-blue-600 text-white px-8 py-3 rounded hover:bg-blue-700 transition-colors font-bold uppercase tracking-wide text-sm">
          Return to Blog
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen pt-0">
      
      {/* 1. Corporate Page Header / Banner */}
      <div className="bg-[#0c2444] text-white pt-8 pb-8 md:pt-16 md:pb-16 relative overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="absolute right-0 top-0 w-1/3 h-full bg-blue-600/20 skew-x-12 transform origin-bottom"></div>
        
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-3xl">
              {/* Breadcrumb */}
              <div className="flex items-center text-xs md:text-sm text-blue-200 font-medium mb-3 overflow-x-auto whitespace-nowrap">
                <Link to="/" className="hover:text-white transition-colors">Home</Link>
                <ChevronRight className="w-3 h-3 mx-1.5 opacity-50" />
                <Link to="/blog" className="hover:text-white transition-colors">Blog</Link>
                <ChevronRight className="w-3 h-3 mx-1.5 opacity-50" />
                <span className="text-white truncate max-w-[150px] sm:max-w-xs">{blog.category || 'Article'}</span>
              </div>
              
              <h1 className="text-2xl md:text-5xl font-black leading-tight tracking-tight mb-4">
                {blog.title}
              </h1>
              
              {/* Meta details */}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs md:text-sm text-blue-100 font-medium">
                <div className="flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 md:w-4 md:h-4" />
                  <span>{blog.author || 'Vishal Industries'}</span>
                </div>
                <div className="hidden sm:block w-1 h-1 rounded-full bg-blue-400"></div>
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 md:w-4 md:h-4" />
                  <span>{formatDate(blog.createdAt)}</span>
                </div>
                {blog.category && (
                  <>
                    <div className="hidden sm:block w-1 h-1 rounded-full bg-blue-400"></div>
                    <div className="flex items-center gap-1.5">
                      <Tag className="w-3.5 h-3.5 md:w-4 md:h-4" />
                      <span className="uppercase tracking-wider">{blog.category}</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Content & Sidebar Layout */}
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-12 md:py-20">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* LEFT: Blog Content Area (70%) */}
          <div className="lg:w-[70%]">
            
            {/* Cover Image */}
            {blog.coverImage && (
              <div className="mb-10 rounded-xl overflow-hidden border border-gray-100 shadow-sm">
                <img 
                  src={blog.coverImage} 
                  alt={blog.title} 
                  className="w-full max-h-[500px] object-cover"
                />
              </div>
            )}

            {/* Excerpt */}
            {blog.excerpt && (
              <div className="mb-10 text-xl text-gray-700 font-medium leading-relaxed border-l-4 border-blue-600 pl-6 py-2">
                {blog.excerpt}
              </div>
            )}

            {/* Article Body */}
            <article className="corporate-article mb-12">
              <div dangerouslySetInnerHTML={{ __html: blog.content }} />
            </article>

            {/* Tags/Share Footer */}
            <div className="flex flex-col sm:flex-row items-center justify-between py-6 border-t border-b border-gray-200 gap-4">
              <div className="flex items-center gap-4">
                <span className="font-bold text-gray-900">Share this post:</span>
                <button onClick={() => window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${window.location.href}&title=${blog.title}`, '_blank')} className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-[#0A66C2] hover:text-white hover:border-[#0A66C2] transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd"></path></svg>
                </button>
                <button onClick={() => window.open(`https://twitter.com/intent/tweet?url=${window.location.href}&text=${blog.title}`, '_blank')} className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-[#1DA1F2] hover:text-white hover:border-[#1DA1F2] transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.52 8.52 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"></path></svg>
                </button>
              </div>
            </div>
            
            {/* Author Block */}
            <div className="bg-gray-50 p-8 rounded-xl mt-12 flex flex-col md:flex-row gap-6 items-center md:items-start border border-gray-100">
              <div className="w-20 h-20 bg-blue-600 text-white flex items-center justify-center font-black text-3xl rounded-xl shrink-0">
                {(blog.author || 'V')[0]}
              </div>
              <div>
                <h4 className="font-bold text-xl text-gray-900 mb-2">{blog.author || 'Vishal Industries'}</h4>
                <p className="text-gray-600 leading-relaxed mb-4 text-sm md:text-base">
                  Vishal Industries is a leading manufacturer of premium industrial conveyor rollers, drum pulleys, and material handling solutions based in India.
                </p>
                <Link to="/contact" className="text-blue-600 font-bold hover:text-blue-800 transition-colors text-sm uppercase tracking-wider flex items-center gap-1">
                  Contact Us <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

          </div>

          {/* RIGHT: Corporate Sidebar (30%) */}
          <div className="lg:w-[30%]">
            <div className="sticky top-28 space-y-10">
              
              {/* Search Widget */}
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                <h3 className="font-bold text-lg text-gray-900 mb-4 border-b border-gray-200 pb-2">Search Blog</h3>
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="Search articles..." 
                    className="w-full bg-white border border-gray-300 rounded-lg py-3 pl-4 pr-10 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                  />
                  <Search className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              {/* Categories Widget */}
              {categories.length > 0 && (
                <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                  <h3 className="font-bold text-lg text-gray-900 mb-4 border-b border-gray-200 pb-2">Categories</h3>
                  <ul className="space-y-3">
                    {categories.map((cat, i) => (
                      <li key={i}>
                        <Link to={`/blog?category=${cat}`} className="flex items-center justify-between text-gray-600 hover:text-blue-600 transition-colors group">
                          <span className="font-medium flex items-center gap-2">
                            <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-blue-600" />
                            {cat}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Recent Posts Widget */}
              {recentPosts.length > 0 && (
                <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                  <h3 className="font-bold text-lg text-gray-900 mb-4 border-b border-gray-200 pb-2">Recent Posts</h3>
                  <div className="space-y-5">
                    {recentPosts.map((post) => (
                      <Link to={`/blog/${post.slug || post._id}`} key={post._id} className="flex gap-4 group">
                        <div className="w-20 h-20 bg-gray-200 rounded shrink-0 overflow-hidden">
                          {post.coverImage && (
                            <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                          )}
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 text-sm line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors mb-1">
                            {post.title}
                          </h4>
                          <span className="text-xs text-gray-500 font-medium">{formatDate(post.createdAt)}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Contact Widget */}
              <div className="bg-[#0c2444] p-6 rounded-xl text-white text-center">
                <h3 className="font-bold text-xl mb-3">Need Industrial Solutions?</h3>
                <p className="text-blue-100 text-sm mb-6 opacity-90">Talk to our experts for premium conveyor rollers and pulleys.</p>
                <Link to="/contact" className="block w-full bg-blue-600 hover:bg-blue-700 py-3 rounded font-bold uppercase tracking-wider text-sm transition-colors mb-3">
                  Request Quote
                </Link>
                <div className="flex items-center justify-center gap-2 text-sm text-blue-200">
                  <Phone className="w-4 h-4" /> +91 98883 14231
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Styles for Article Content */}
      <style>{`
        .corporate-article {
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
          font-size: 1.125rem;
          line-height: 1.75;
          color: #374151;
        }

        .corporate-article h2 {
          font-size: 1.875rem;
          font-weight: 800;
          color: #111827;
          margin: 3rem 0 1.25rem;
          line-height: 1.3;
        }

        .corporate-article h3 {
          font-size: 1.5rem;
          font-weight: 700;
          color: #1f2937;
          margin: 2.5rem 0 1rem;
        }

        .corporate-article p {
          margin-bottom: 1.5rem;
        }

        .corporate-article ul, .corporate-article ol {
          margin: 1.5rem 0;
          padding-left: 1.5rem;
        }

        .corporate-article li {
          margin-bottom: 0.5rem;
        }
        
        .corporate-article ul li {
          list-style-type: square;
          color: #2563eb;
        }
        .corporate-article ul li span, .corporate-article ul li p, .corporate-article ul li text {
          color: #374151;
        }
        
        .corporate-article a {
          color: #2563eb;
          text-decoration: underline;
          text-underline-offset: 2px;
          font-weight: 600;
        }
        
        .corporate-article a:hover {
          color: #1d4ed8;
        }

        .corporate-article blockquote {
          border-left: 4px solid #2563eb;
          background: #eff6ff;
          padding: 1.5rem;
          margin: 2rem 0;
          font-style: italic;
          color: #1e3a8a;
          border-radius: 0 0.5rem 0.5rem 0;
        }

        .corporate-article img {
          max-width: 100%;
          border-radius: 0.5rem;
          margin: 2rem 0;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          border: 1px solid #f3f4f6;
        }
      `}</style>
    </div>
  );
}
