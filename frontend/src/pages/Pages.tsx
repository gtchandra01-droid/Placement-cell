import { useEffect, useState } from "react";

interface Page {
  id: number;
  title: string;
  slug: string;
  content: string;
  status: string;
}

export default function Pages() {
  const [pages, setPages] = useState<Page[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load pages from localStorage
    try {
      const savedPages = localStorage.getItem("pages");
      console.log("Saved pages from localStorage:", savedPages);
      
      if (savedPages) {
        const allPages = JSON.parse(savedPages);
        console.log("Parsed pages:", allPages);
        
        const publishedPages = allPages.filter((p: Page) => p.status === "Published");
        console.log("Published pages:", publishedPages);
        
        setPages(publishedPages);
      } else {
        console.log("No pages found in localStorage");
      }
    } catch (error) {
      console.error("Error loading pages:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0b1c33] mx-auto mb-4"></div>
          <p className="text-slate-600">Loading pages...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <section className="bg-[#0b1c33] text-white py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Pages</h1>
          <p className="text-white/70 text-lg">Information and resources</p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          {pages.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pages.map((page) => (
                <div key={page.id} className="card-hover p-6 rounded-2xl border border-slate-100 bg-white shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="text-xl font-display font-bold text-[#0b1c33] mb-2">
                    {page.title}
                  </h3>
                  
                  <p className="text-slate-600 text-sm mb-4 line-clamp-3">
                    {page.content || "No content available"}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400">
                      Published
                    </span>
                    
                    <a
                      href={`#${page.slug}`}
                      className="text-[#d4a853] hover:text-[#0b1c33] font-medium text-sm transition-colors"
                    >
                      Read More →
                    </a>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-slate-600 text-lg">No pages available</p>
              <p className="text-slate-500 text-sm mt-2">
                Create pages in the admin panel to display them here.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
