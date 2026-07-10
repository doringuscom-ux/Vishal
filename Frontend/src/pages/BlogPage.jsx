import { useState, useEffect } from 'react';
import { ChevronRight, Calendar, User, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { BLOGS_API } from '../utils/api';

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const { data } = await axios.get(BLOGS_API);
        setBlogs(data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch blogs', error);
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  const categories = ['All', ...new Set(blogs.map(b => b.category).filter(Boolean))];

  const filteredBlogs = blogs.filter(blog => {
    const matchCategory = activeCategory === 'All' || blog.category === activeCategory;
    const matchSearch = searchQuery === '' || 
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (blog.excerpt && blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchCategory && matchSearch;
  });

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-IN', options);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-600 font-bold text-lg">Loading blogs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      
      {/* Premium Hero Section */}
      <div className="relative bg-[#0a1f3c] text-white py-20 overflow-hidden">
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600 rounded-full blur-[120px] opacity-20 -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-orange-500 rounded-full blur-[100px] opacity-20 translate-y-1/2 -translate-x-1/3"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-purple-500 rounded-full blur-[100px] opacity-10 -translate-x-1/2 -translate-y-1/2"></div>
        
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 relative z-10 text-center">
          <h4 className="text-orange-500 font-bold tracking-[0.2em] uppercase mb-4 text-sm md:text-base">
            Insights & Updates
          </h4>
          <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">
            Our <span className="text-blue-500">Blog</span>
          </h1>
          <p className="text-slate-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Stay updated with the latest industry trends, product innovations, and expert insights from Vishal Industries.
          </p>

          {/* Search Bar */}
          <div className="mt-10 max-w-xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-6 py-4 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-base"
            />
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-16">
        
        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {categories.map((category, index) => (
            <button
              key={index}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-3 rounded-full font-bold text-sm transition-all duration-300 border-2 ${
                activeCategory === category 
                  ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-600/30' 
                  : 'bg-white border-slate-200 text-slate-600 hover:border-blue-600 hover:text-blue-600'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Blog Grid */}
        {filteredBlogs.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-2xl font-bold text-slate-800 mb-2">No articles found</h3>
            <p className="text-slate-500">Try adjusting your search or filter to find what you're looking for.</p>
          </div>
        ) : (
          <>
            {/* Featured Blog (First Blog - Large Card) */}
            {filteredBlogs.length > 0 && activeCategory === 'All' && searchQuery === '' && (
              <Link 
                to={`/blog/${filteredBlogs[0].slug || filteredBlogs[0]._id}`}
                className="group block mb-16 relative rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-slate-100 hover:shadow-2xl transition-all duration-500"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  {/* Image */}
                  <div className="h-[300px] lg:h-[450px] bg-slate-100 relative overflow-hidden">
                    {filteredBlogs[0].coverImage ? (
                      <img 
                        src={filteredBlogs[0].coverImage} 
                        alt={filteredBlogs[0].title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center">
                        <span className="text-8xl opacity-30">📰</span>
                      </div>
                    )}
                    <div className="absolute top-6 left-6 bg-orange-500 text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
                      Featured
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8 lg:p-12 flex flex-col justify-center bg-white">
                    <div className="flex items-center gap-4 text-sm text-slate-400 mb-4">
                      {filteredBlogs[0].category && (
                        <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-bold">
                          {filteredBlogs[0].category}
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {formatDate(filteredBlogs[0].createdAt)}
                      </span>
                    </div>
                    <h2 className="text-2xl lg:text-3xl font-black text-slate-900 mb-4 leading-tight group-hover:text-blue-600 transition-colors">
                      {filteredBlogs[0].title}
                    </h2>
                    <p className="text-slate-500 text-base lg:text-lg leading-relaxed line-clamp-3 mb-6">
                      {filteredBlogs[0].excerpt || filteredBlogs[0].content?.substring(0, 200) + '...'}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-slate-400">
                        <User className="w-4 h-4" />
                        <span className="font-medium">{filteredBlogs[0].author || 'Vishal Industries'}</span>
                      </div>
                      <span className="flex items-center text-blue-600 font-bold text-sm group-hover:text-orange-500 transition-colors">
                        Read Article <ChevronRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            )}

            {/* Blog Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {(activeCategory === 'All' && searchQuery === '' ? filteredBlogs.slice(1) : filteredBlogs).map((blog) => (
                <Link 
                  to={`/blog/${blog.slug || blog._id}`}
                  key={blog._id} 
                  className="group relative bg-white rounded-2xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 block"
                >
                  {/* Cover Image */}
                  <div className="h-[220px] bg-slate-100 relative overflow-hidden">
                    {blog.coverImage ? (
                      <img 
                        src={blog.coverImage} 
                        alt={blog.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center">
                        <span className="text-6xl opacity-20">📰</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    {blog.category && (
                      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-blue-600 border border-blue-100">
                        {blog.category}
                      </div>
                    )}
                  </div>
                  
                  {/* Content */}
                  <div className="p-6">
                    {/* Meta Info */}
                    <div className="flex items-center gap-4 text-xs text-slate-400 mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {formatDate(blog.createdAt)}
                      </span>
                      <span className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        {blog.author || 'Vishal Industries'}
                      </span>
                    </div>

                    <h3 className="font-bold text-slate-900 text-lg mb-2 leading-snug line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {blog.title}
                    </h3>
                    <p className="text-slate-500 text-sm line-clamp-3 font-medium mb-4 leading-relaxed">
                      {blog.excerpt || blog.content?.substring(0, 150) + '...'}
                    </p>


                    <div className="flex items-center text-blue-600 font-bold text-sm group-hover:text-orange-500 transition-colors pt-2 border-t border-slate-100">
                      Read More <ChevronRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}

      </div>
    </div>
  );
}
