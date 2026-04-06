export interface Course {
  id: string;
  title: string;
  fullName: string;
  description: string;
  duration: string;
  fees: string;
  certificate: string;
  mode: string;
  syllabus?: string[];
  syllabi?: any;
  benefits: string[];
  color: string;
  iconName?: string;
  icon?: string;
  image: string;
  tag?: { text: string; color: string };
  careerPaths?: string[];
  level?: string;
  category?: string;
  isPopular?: boolean;
  is_published?: boolean;
}

export const coursesData: Record<string, Course> = {
  adca: {
    id: "adca",
    title: "ADCA",
    fullName: "Advanced Diploma in Computer Application",
    description: "Pratappur ka sabse complete program! Bascis se lekar professional designing aur accounting tak sab kuch seekho ek hi diploma mein.",
    duration: "12 Months",
    fees: "₹12,000 – ₹15,000",
    certificate: "Government Verified (ISO Certified)",
    mode: "Offline / Hybrid",
    syllabus: [
      "Fundamentals of Computers & OS",
      "MS Office Suite (Word, Excel, PPT)",
      "Internet & Digital Communication",
      "Tally Prime with GST & Inventory",
      "Graphic Designing (Photoshop, CorelDraw)",
      "Web Designing Basics (HTML/CSS)",
      "Hardware & Networking Overview",
      "Project & Portfolio Building"
    ],
    benefits: [
      "Lifetime membership for placement support in Pratappur",
      "Daily live practical sessions in modern lab",
      "Recognized and globally valid certification",
      "Free resume building & interview prep"
    ],
    iconName: "Monitor",
    color: "from-blue-600 to-indigo-700",
    image: "/courses/adca.png",
    tag: { text: "Most Popular", color: "bg-orange-500" },
    careerPaths: ["IT Administrator", "MIS Executive", "Computer Teacher", "Desktop Support", "Data Management Lead"]
  },
  tally: {
    id: "tally",
    title: "Tally Prime",
    fullName: "Professional Accounting & GST Master",
    description: "Accounting sector mein career banane ka best tarika. Seekho GST billing aur inventory management Pratappur ke experts se.",
    duration: "3-6 Months",
    fees: "₹5,000 – ₹7,000",
    certificate: "Professional Skill Certificate",
    mode: "Offline / Practical Intensive",
    syllabus: [
      "Basic Accounting Principles",
      "Tally Prime Navigation & Shortcuts",
      "Inventory Management",
      "GST Implementation (IGST/CGST/SGST)",
      "Bank Reconciliation Statement (BRS)",
      "Payroll Management",
      "Order Processing (Sales/Purchase)",
      "Final Account Reports"
    ],
    benefits: [
      "Real-world case studies based on Pratappur market",
      "GST portal registration overview",
      "Local accounting job interview preparation",
      "Practical assessment on real business data"
    ],
    iconName: "Database",
    color: "from-emerald-500 to-teal-700",
    image: "/courses/tally.png",
    tag: { text: "Job Focused", color: "bg-emerald-500" },
    careerPaths: ["Financial Accountant", "GST Consultant", "Audit Assistant", "Billing Executive", "Accounts Manager"]
  },
  web: {
    id: "web",
    title: "Web Designing",
    fullName: "Frontend Development & UI/UX",
    description: "Learn to build modern, responsive, and aesthetically pleasing websites from scratch using industry-leading tools and frameworks.",
    duration: "6 Months",
    fees: "₹8,000 – ₹10,000",
    certificate: "Tech Specialization Cert.",
    mode: "Online / Offline / Hybrid",
    syllabus: [
      "HTML5 Semantics & Structure",
      "CSS3 Flexbox & Grid Systems",
      "Modern UI Principles & Typography",
      "JavaScript Fundamentals (ES6+)",
      "Tailwind CSS / Bootstrap",
      "Responsive Layout Design",
      "Web Hosting & Domain Setup",
      "Basic SEO Best Practices"
    ],
    benefits: [
      "Build a portfolio of real projects",
      "Learn standard GitHub workflow",
      "Design-to-Code workshops",
      "Access to premium design tools"
    ],
    iconName: "Globe",
    color: "from-indigo-500 to-blue-700",
    image: "/courses/web.png",
    tag: { text: "Trending", color: "bg-blue-500" },
    careerPaths: ["Frontend Developer", "UI Designer", "Web Architect", "WordPress Specialist", "UX Consultant"]
  },
  dca: {
    id: "dca",
    title: "DCA",
    fullName: "Diploma in Computer Application",
    description: "10th/12th pass students ke liye Pratappur mein sabse popular course. MS Office aur basic IT skills seekhein.",
    duration: "6 Months",
    fees: "₹5,000 – ₹7,000",
    certificate: "Standard Diploma",
    mode: "Offline Only",
    syllabus: [
      "Computer History & Generations",
      "Personal Computer (PC) Basics",
      "Windows Operation & File Mgmt",
      "Detailed MS Word for Documentation",
      "Excel for Data Management",
      "PowerPoint for Professional Demos",
      "Networking & Internet Safety",
      "Hindi & English Typing Mastery"
    ],
    benefits: [
      "Government job computer exam preparation",
      "Extra lab practice time available",
      "Small batches for personalized attention in Pratappur",
      "Detailed study material and notes"
    ],
    iconName: "Layout",
    color: "from-sky-500 to-indigo-600",
    image: "/courses/dca.png",
    careerPaths: ["Office Assistant", "Computer Operator", "Data Entry Lead", "Technical Clerk", "Front Desk Reception"]
  },
  graphic: {
    id: "graphic",
    title: "Graphic Design",
    fullName: "Visual Arts & Commercial Designing",
    description: "Unleash your creativity. Learn to design logos, social media graphics, and print media using professional-grade software.",
    duration: "6 Months",
    fees: "₹7,000 – ₹9,000",
    certificate: "Creative Industry Cert.",
    mode: "Studio-Based Sessions",
    syllabus: [
      "Adobe Photoshop Mastery",
      "CorelDraw for Large Print Media",
      "Design Theory & Color Psychology",
      "Typography & Layout Rules",
      "Branding & Logo Identity",
      "Social Media Kit Designing",
      "Vector Graphics & Illustration",
      "Print Setup & Exporting"
    ],
    benefits: [
      "Hands-on with graphic tablets",
      "Creative project feedback sessions",
      "Freelancing guidance for designers",
      "Unlimited access to vector assets"
    ],
    iconName: "Palette",
    color: "from-pink-500 to-rose-700",
    image: "/courses/graphic.png",
    careerPaths: ["Graphics Designer", "Branding Expert", "Art Director Assistant", "Freelance Artist", "Print Media Lead"]
  },
  office: {
    id: "office",
    title: "MS Office",
    fullName: "Essential Productivity & Data Entry",
    description: "The core foundation for every modern role. Master the logic of spreadsheets, the art of documents, and the power of data.",
    duration: "3 Months",
    fees: "₹3,000 – ₹4,500",
    certificate: "Skill Completion Certificate",
    mode: "Practical Intensive",
    syllabus: [
      "Windows File & Shortcut Basics",
      "Advanced MS Excel Formulas",
      "VLOOKUP/XLOOKUP & Pivot Tables",
      "Data Validation & Consolidation",
      "MS Word for Corporate Letters",
      "MS PowerPoint Animations",
      "E-mail & Cloud Storage Management",
      "Fast Data Entry Techniques"
    ],
    benefits: [
      "Job-ready skills for Back Office",
      "Data handling & analysis focus",
      "Certificate valid across industries",
      "Weekly performance speed tests"
    ],
    iconName: "FileText",
    color: "from-blue-500 to-sky-600",
    image: "/courses/office.png",
    careerPaths: ["Data Entry Operator", "Admin Executive", "Back Office Lead", "Inventory Clerk", "Virtual Assistant"]
  },
  typing: {
    id: "typing",
    title: "Typing",
    fullName: "Professional Hindi & English Typing Speed",
    description: "Whether you're aiming for Government or Private sector jobs, speed and accuracy are key. Master the art of professional typing with our expert-led sessions.",
    duration: "3 Months",
    fees: "₹2,000 – ₹3,000",
    certificate: "Typing Proficiency Certificate",
    mode: "Offline Lab Sessions",
    syllabus: [
      "Keyboarding Basics & Finger Placement",
      "Touch Typing Techniques",
      "English Speed & Accuracy Drills",
      "Hindi (Kruti Dev / Mangal) Typing basics",
      "Special Character & Numeric Mastery",
      "Speed Transformation Workshops",
      "Accuracy Testing & Correction",
      "Exam Preparation for Govt Jobs"
    ],
    benefits: [
      "Improve speed from 0 to 40+ WPM",
      "Certification accepted in Govt sectors",
      "Personalized software-based tracking",
      "Preparation for State/Central typing exams"
    ],
    iconName: "Monitor",
    color: "from-slate-500 to-zinc-700",
    image: "/courses/typing.png",
    careerPaths: ["Govt Clerk (LDC)", "Stenographer Assistant", "Data Entry Specialist", "Typing Instructor", "Technical Support"]
  },
  fundamentals: {
    id: "fundamentals",
    title: "Comp. Fundamentals",
    fullName: "Information Technology & Basics",
    description: "The perfect starting point for absolute beginners. Understand how technology works from the ground up and build a solid foundation for your digital journey.",
    duration: "2 Months",
    fees: "₹2,500 – ₹3,500",
    certificate: "Foundation Certificate",
    mode: "Offline Only",
    syllabus: [
      "Introduction to Computers & History",
      "Hardware Components & Peripherals",
      "Understanding Operating Systems",
      "Basic Software & Tool Navigation",
      "Internet Basics & Online Safety",
      "File Management & Organization",
      "Introduction to Mobile Technology",
      "Digital Literacy Basics"
    ],
    benefits: [
      "Clear your basics with zero technical jargon",
      "Perfect for students and senior citizens",
      "Hands-on practice from day one",
      "Bridge the digital divide"
    ],
    iconName: "Network",
    color: "from-purple-500 to-indigo-600",
    image: "/courses/fundamentals.png",
    careerPaths: ["Tech Support Beginner", "Computer Lab Asst.", "Digital Literacy Mentor", "Service Center Frontdesk"]
  },
  pgdca: {
    id: "pgdca",
    title: "PGDCA",
    fullName: "Post Graduate Diploma in Computer Applications",
    description: "Graduates aur Master's students ke liye advanced 1-year diploma. Professional IT skills, programming aur accounting mein expert baniye.",
    duration: "12 Months",
    fees: "₹15,000 – ₹18,000",
    certificate: "PG Diploma (Verified & ISO Certified)",
    mode: "Offline / Hybrid / Project Based",
    syllabus: [
      "Computer Organization & Architecture",
      "Advanced Office Automation (Excel/DBMS)",
      "Programming Fundamentals using C/C++",
      "Financial Accounting & Tally Prime",
      "Web Technologies (HTML/CSS/JS)",
      "System Analysis & Design (SAD)",
      "Internet, E-Commerce & Cyber Security",
      "Major Project & Viva-Voce"
    ],
    benefits: [
      "Preferred for high-level government job applications",
      "In-depth technical and programming knowledge",
      "Hands-on industrial project experience",
      "Professional career guidance and placement aid"
    ],
    iconName: "Monitor",
    color: "from-purple-600 to-indigo-800",
    image: "/courses/pgdca.png",
    tag: { text: "University Level", color: "bg-purple-600" },
    careerPaths: ["Software Associate", "System Analyst", "Database Manager", "Computer Teacher", "IT Consultant"]
  },
  python: {
    id: "python",
    title: "Python",
    fullName: "Python Programming & Data Logic",
    description: "Enter the world of coding! Seekho logic building aur backend development Pratappur ke best programming lab mein.",
    duration: "3-6 Months",
    fees: "₹6,000 – ₹8,000",
    certificate: "Programming Specialist Cert.",
    mode: "Offline / Hybrid",
    syllabus: [
      "Introduction to Python & Installation",
      "Variables, Data Types & Operators",
      "Control Flow (If, Loops, Break/Continue)",
      "Functions, Modules & Packages",
      "Data Structures (Lists, Tuples, Dicts, Sets)",
      "File Handling & Exception Handling",
      "Introduction to OOPs in Python",
      "Project: ATM Simulator or Web Scraper"
    ],
    benefits: [
      "Master the most versatile coding language",
      "Build logic for Software Engineering careers",
      "1:1 Doubt clearing at Pratappur centre",
      "Industry-ready mini projects for your resume"
    ],
    iconName: "Code",
    color: "from-yellow-400 to-yellow-600",
    image: "/courses/python.png",
    tag: { text: "Student Choice", color: "bg-yellow-500" },
    careerPaths: ["Python Developer", "Data Analyst (Junior)", "Automation Engineer", "Software Trainee", "AI/ML Enthusiast"]
  },
  fullstack: {
    id: "fullstack",
    title: "Full Stack",
    fullName: "Full Stack Web Development (MERN/Next.js)",
    description: "The ultimate path to becoming a Pro Developer. Build full-scale applications from frontend to backend with databases and deployment.",
    duration: "6-12 Months",
    fees: "₹18,000 – ₹25,000",
    certificate: "Full Stack Developer Diploma",
    mode: "Project-Based Learning",
    syllabus: [
      "Advanced HTML5 & CSS3 (Animations/Grid)",
      "JavaScript Deep Dive (Async/Await, ES6+)",
      "React.js Fundamentals & State Management",
      "Next.js 14 App Router & SSR",
      "Node.js & Express.js Backend",
      "MongoDB & SQL Database Design",
      "RESTful API Development & Security",
      "Deployment on Vercel/DigitalOcean"
    ],
    benefits: [
      "Become a career-ready Software Engineer",
      "Build 5+ Production-ready projects",
      "Exclusive Job placement assistance",
      "Work on real-world local business apps"
    ],
    iconName: "Server",
    color: "from-blue-600 to-cyan-500",
    image: "/courses/fullstack.png",
    tag: { text: "High ROI", color: "bg-cyan-600" },
    careerPaths: ["Full Stack Developer", "Backend Engineer", "Product Engineer", "Freelance Developer", "Tech Lead"]
  },
  junior: {
    id: "junior",
    title: "Junior IT Special",
    fullName: "Computer Basics for 6th to 10th Students",
    description: "School students ke liye design kiya gaya special course! Computer fundamentals, fast typing, aur internet safety seekhein.",
    duration: "3 Months",
    fees: "₹2,500 – ₹3,500",
    certificate: "Junior IT Certificate",
    mode: "Offline (After School Batches)",
    syllabus: [
      "Introduction to Modern Computers",
      "Fast Typing (Hindi & English)",
      "MS Paint & Creative Tools",
      "Safe Internet Browsing & Email",
      "Scratch Coding Basics (Optional)",
      "School Project Assistance",
      "Digital Presentation (PPT)",
      "Computer Ethics & Safety"
    ],
    benefits: [
      "Specially designed for 6th-10th graders",
      "Helps in school computer subjects",
      "Builds logical thinking from early age",
      "Cool environment with fun learning"
    ],
    iconName: "Monitor",
    color: "from-orange-400 to-red-600",
    image: "/courses/junior.png",
    tag: { text: "School Special", color: "bg-orange-500" },
    careerPaths: ["School Computer Champ", "Future Tech Student", "Digital Creator"]
  }
};
