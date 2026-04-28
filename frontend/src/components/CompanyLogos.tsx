import React from "react";

interface Company {
  name: string;
  logo: string;
}

const companies: Company[] = [
  { name: "Amazon", logo: "https://1000logos.net/wp-content/uploads/2016/10/Amazon-logo-meaning.jpg" },
  { name: "Microsoft", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/1200px-Microsoft_logo.svg.png" },
  { name: "Google", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/1200px-Google_2015_logo.svg.png" },
  { name: "TCS", logo: "https://i.logos-download.com/113971/29583-9fde4947792aa7b5b379c0b1aee0ead2.png/Tata_Consultancy_Services_Logo_2020.png?dl" },
  { name: "Infosys", logo: "https://static.vecteezy.com/system/resources/previews/020/336/451/non_2x/infosys-logo-infosys-icon-free-free-vector.jpg" },
  { name: "Wipro", logo: "https://img-cdn.publive.online/fit-in/640x430/filters:format(webp)/afaqs/media/post_attachments/298733ac20da03bb859566d5a8ec0471bde02b7c865dea37ebfc6d31c899ce99.jpg" },
  { name: "Accenture", logo: "https://download.logo.wine/logo/Accenture/Accenture-Logo.wine.png" },
  { name: "Cognizant", logo: "https://companieslogo.com/img/orig/CTSH-82a8444b.png?t=1720244491" },
  { name: "IBM", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbdQi0yohiPRpm5Twf9hluWmgMe8smBh6Mcg&s" },
  { name: "Adobe", logo: "https://logos-world.net/wp-content/uploads/2020/06/Adobe-Emblem.png" },
  { name: "Flipkart", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVWzGxiYGlEM-IzG4PWRrn875F0LOcXLulhQ&s" },
  { name: "Paytm", logo: "https://pwebassets.paytm.com/ocl-documents/document/ir/press-kit/brand.png" },
  { name: "Zomato", logo: "https://crystalpng.com/wp-content/uploads/2025/12/Zomato-Logo.png" },
  { name: "Swiggy", logo: "https://iconlogovector.com/uploads/images/2024/10/lg-671af2a071074-Swiggy.webp" },
  { name: "Deloitte", logo: "https://download.logo.wine/logo/Deloitte/Deloitte-Logo.wine.png" },
];

/** ✅ Duplicate safely */
const marqueeItems: Company[] = [...companies, ...companies];

export default function CompanyLogos() {
  return (
    <section className="py-14 bg-white border-y border-slate-100 overflow-hidden">
      
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 mb-8 text-center">
        <div className="flex items-center justify-center gap-3 mb-2">
          <div className="h-px w-10 bg-[#d4a853]" />
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#d4a853]">
            Our Recruiters
          </span>
          <div className="h-px w-10 bg-[#d4a853]" />
        </div>

        <h2 className="text-2xl md:text-3xl font-display font-bold text-[#0b1c33]">
          Trusted by <span className="text-gradient">500+ Companies</span>
        </h2>
      </div>

      {/* Marquee */}
      <div className="relative">

        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10" />

        {/* Track */}
        <div className="flex animate-marquee gap-6 w-max">
          {marqueeItems.map((company, i) => (
            <div
              key={`${company.name}-${i}`}
              className="flex-shrink-0 px-6 py-4 rounded-xl border border-slate-200 bg-slate-50 hover:border-[#d4a853]/50 hover:bg-[#d4a853]/5 transition-colors cursor-default flex items-center gap-3 min-w-[180px]"
            >
              <div className="w-8 h-8 rounded-lg border border-slate-200 bg-white p-1 flex-shrink-0">
                <img
                  src={company.logo}
                  alt={`${company.name} logo`}
                  className="w-full h-full object-contain rounded"
                  onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                    e.currentTarget.src = `https://via.placeholder.com/32x32/0066CC/FFFFFF?text=${company.name.charAt(0)}`;
                  }}
                />
              </div>

              <span className="text-sm font-semibold text-slate-700 whitespace-nowrap">
                {company.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}