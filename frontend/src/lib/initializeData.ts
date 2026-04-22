// Initialize default data in localStorage if not present
export const initializeDefaultData = () => {
  // Initialize companies
  if (!localStorage.getItem("companies")) {
    const defaultCompanies = [
      {
        id: 1,
        name: "Infosys",
        sector: "IT Services",
        location: "Hyderabad",
        logo_url: "https://via.placeholder.com/40?text=Infosys",
        registration_link: "https://www.infosys.com/careers",
      },
      {
        id: 2,
        name: "TCS",
        sector: "IT Services",
        location: "Bangalore",
        logo_url: "https://via.placeholder.com/40?text=TCS",
        registration_link: "https://www.tcs.com/careers",
      },
      {
        id: 3,
        name: "Wipro",
        sector: "IT Services",
        location: "Hyderabad",
        logo_url: "https://via.placeholder.com/40?text=Wipro",
        registration_link: "https://www.wipro.com/careers",
      },
      {
        id: 4,
        name: "HCL Technologies",
        sector: "IT Services",
        location: "Noida",
        logo_url: "https://via.placeholder.com/40?text=HCL",
        registration_link: "https://www.hcltech.com/careers",
      },
      {
        id: 5,
        name: "Cognizant",
        sector: "IT Consulting",
        location: "Pune",
        logo_url: "https://via.placeholder.com/40?text=Cognizant",
        registration_link: "https://www.cognizant.com/careers",
      },
      {
        id: 6,
        name: "Accenture",
        sector: "IT Consulting",
        location: "Mumbai",
        logo_url: "https://via.placeholder.com/40?text=Accenture",
        registration_link: "https://www.accenture.com/careers",
      },
      {
        id: 7,
        name: "Infosys",
        sector: "IT Services",
        location: "Hyderabad",
        logo_url: "https://via.placeholder.com/40?text=Infosys",
        registration_link: "https://www.infosys.com/careers",
      },
      {
        id: 8,
        name: "TCS",
        sector: "IT Services",
        location: "Bangalore",
        logo_url: "https://via.placeholder.com/40?text=TCS",
        registration_link: "https://www.tcs.com/careers",
      },
      {
        id: 9,
        name: "Wipro",
        sector: "IT Services",
        location: "Hyderabad",
        logo_url: "https://via.placeholder.com/40?text=Wipro",
        registration_link: "https://www.wipro.com/careers",
      },
      {
        id: 10,
        name: "Cognizant",
        sector: "IT Consulting",
        location: "Pune",
        logo_url: "https://via.placeholder.com/40?text=Cognizant",
        registration_link: "https://www.cognizant.com/careers",
      },
    ];
    localStorage.setItem("companies", JSON.stringify(defaultCompanies));
  }

  // Initialize notifications
  if (!localStorage.getItem("notifications")) {
    const defaultNotifications = [
      {
        id: 1,
        title: "Placement Drive - Infosys",
        message: "Infosys is conducting a campus placement drive. Eligible students can register on the portal. Last date: 15th December 2024.",
        type: "success",
        date: new Date().toISOString().split("T")[0],
      },
      {
        id: 2,
        title: "Important: Document Submission",
        message: "All students must submit their updated resume and certificates by 10th December 2024. Incomplete submissions will not be considered.",
        type: "alert",
        date: new Date().toISOString().split("T")[0],
      },
      {
        id: 3,
        title: "TCS Recruitment Process",
        message: "TCS will conduct online assessments on 20th December 2024. Selected candidates will be called for interviews. Check your email for login credentials.",
        type: "info",
        date: new Date().toISOString().split("T")[0],
      },
      {
        id: 4,
        title: "Placement Statistics Updated",
        message: "This year's placement statistics have been updated. 95% of eligible students have been placed with an average package of 6.5 LPA.",
        type: "success",
        date: new Date().toISOString().split("T")[0],
      },
      {
        id: 5,
        title: "Placement Drive - Infosys",
        message: "Infosys is conducting a campus placement drive. Eligible students can register on the portal. Last date: 15th December 2024.",
        type: "success",
        date: new Date().toISOString().split("T")[0],
      },
      {
        id: 6,
        title: "Important: Document Submission",
        message: "All students must submit their updated resume and certificates by 10th December 2024. Incomplete submissions will not be considered.",
        type: "alert",
        date: new Date().toISOString().split("T")[0],
      },
      {
        id: 7,
        title: "TCS Recruitment Process",
        message: "TCS will conduct online assessments on 20th December 2024. Selected candidates will be called for interviews. Check your email for login credentials.",
        type: "info",
        date: new Date().toISOString().split("T")[0],
      },
      {
        id: 8,
        title: "Placement Statistics Updated",
        message: "This year's placement statistics have been updated. 95% of eligible students have been placed with an average package of 6.5 LPA.",
        type: "success",
        date: new Date().toISOString().split("T")[0],
      },
    ];
    localStorage.setItem("notifications", JSON.stringify(defaultNotifications));
  }

  // Initialize pages
  if (!localStorage.getItem("pages")) {
    const defaultPages = [
      {
        id: 1,
        title: "About JNTUK",
        slug: "about-jntuk",
        content: "JNTUK is a premier technical university dedicated to excellence in engineering education.",
      },
      {
        id: 2,
        title: "Placement Policy",
        slug: "placement-policy",
        content: "Our placement policy ensures fair and transparent recruitment process for all students.",
      },
    ];
    localStorage.setItem("pages", JSON.stringify(defaultPages));
  }

  // Initialize images
  if (!localStorage.getItem("images")) {
    localStorage.setItem("images", JSON.stringify([]));
  }
};
