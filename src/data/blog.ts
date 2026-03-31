export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  category: string;
  readTime: string;
  image: string;
  tags: string[];
  isFeatured?: boolean;
}

export const blogPosts: Record<string, BlogPost> = {
  "1": { 
    id: "1", 
    title: "Success Story: 50+ Students Placed in Leading Tech Firms (2026)", 
    excerpt: "हमारे ADCA और Tally Prime के छात्रों ने Pratappur में नया कीर्तिमान स्थापित किया है। जानिए उनकी सफलता का राज़ और उनकी मेहनत की कहानी।", 
    content: `
Vision IT Computer Institute Pratappur has achieved a massive milestone this year. More than 50 students from our Advanced Diploma in Computer Application (ADCA) and Tally Prime batches have successfully secured placements in reputed tech companies and accounting firms across Chhattisgarh and beyond.

### The Secret to Success
Our focus has always been on **Practical Knowledge**. In a world where theory only gets you so far, our students spend 80% of their time in the lab, working on real-world projects and case studies. This hands-on approach ensures that they are ready to contribute from day one of their employment.

### Student Spotlight
- **Amrt Kumar (ADCA Batch):** Placed as a Graphics Designer in a leading media house.
- **Priya Singh (Tally Batch):** Now working as a Senior Accounts Assistant in a corporate firm in Raipur.
- **Rahul Sahu (Web Design):** Successfully launched his own freelancing agency in Pratappur.

### Director's Note
> "We believe that geography should not limit talent. By bringing world-class computer education to Pratappur, we are empowering the local youth to compete on a global scale." — *Shubham Gupta, Director.*

#### Key Takeaways for New Students:
- Consistency is more important than speed.
- Master the basics of MS Office before jumping into advanced tools.
- Always work on building a portfolio while you learn.
- Participate in our weekly mock interviews and personality development sessions.
    `,
    date: "March 20, 2026", 
    author: "Shubham Gupta", 
    category: "Success Stories", 
    readTime: "8 min read", 
    image: "/blog/success.png",
    isFeatured: true,
    tags: ["Placements", "Success", "Pratappur", "Education"]
  },
  "2": { 
    id: "2", 
    title: "5 Essential Tally Prime Shortcuts for Faster Accounting", 
    excerpt: "Accounting को और भी तेज़ और सटीक बनाने के लिए ये Shortcuts हर Tally student को पता होने चाहिए। अपनी उत्पादकता (Productivity) बढ़ाएं।", 
    content: `
Tally Prime is the heart of modern business accounting in India. If you want to work like a professional, you must master the keyboard shortcuts that separate experts from beginners. Speed and accuracy are the two pillars of professional accounting.

### 1. F11: Company Features
The fastest way to toggle GST, TDS, and other essential features for your current company. Using this shortcut avoids navigating through multiple sub-menus.

### 2. Alt + C: Creation on the Fly
Never leave your voucher screen. Use Alt+C to create a new ledger, item, or group right when you need it while recording a transaction. This is the most used shortcut by Tally professionals.

### 3. Alt + G: Go To Feature
The "Go To" feature is the magic button of Tally Prime. Search for any report (Balance Sheet, P&L, GST Reports) without navigating through nested menus. It allows you to multi-task without closing your current work.

### 4. Alt + D: Deleting Entries
Simple but powerful. Quickly remove test entries or mistakes with this shortcut. Be careful as this action is permanent!

### 5. F2: Changing Date
Essential for maintaining accurate records. Use F2 to flip between transaction dates in a second. Mastering the date change allows for seamless historical data entry.

Mastering these will significantly reduce your data entry time and help you focus on what matters: **Financial Analysis**.
    `,
    date: "March 18, 2026", 
    author: "Expert Faculty", 
    category: "Tech Tips", 
    readTime: "4 min read", 
    image: "/blog/tally.png",
    tags: ["Tally", "Accounting", "Shortcuts", "Productivity"]
  },
  "3": { 
    id: "3", 
    title: "Why ADCA is the Most Recommended Course for 2026", 
    excerpt: "Basics से लेकर Web Design और Graphics तक — ADCA आपको हर डिजिटल चुनौती के लिए तैयार करता है। जानिए इसके करियर लाभ।", 
    content: `
The Advanced Diploma in Computer Application (ADCA) is the most versatile course at Vision IT. It is designed to take a student from zero to a professional digital expert in 12 months. In the rapidly evolving job market of 2026, versatility is key.

### One Course, Multiple Careers
The beauty of ADCA is its breadth. You don't just learn "computers"; you learn three major professional paths:
1. **Office Operations:** Mastering Excel, Word, and Corporate Communication. Essential for any government or private job.
2. **Professional Accounting:** Becoming an expert in Tally Prime, handling GST, and financial reporting.
3. **Creative Designing:** Learning Photoshop and CorelDraw for commercial use, social media marketing, and branding.

### Why Choose ADCA in 2026?
With the digital surge in India, every small business and large corporation now requires "all-rounders". Someone who can handle an Excel sheet in the morning and design a social media post in the evening is highly valuable.

At Vision IT Pratappur, our ADCA program is ISO certified and recognized by major recruiters in the state. We provide a lifetime placement assistance guarantee to all our ADCA graduates.
    `,
    date: "March 15, 2026", 
    author: "Vision IT Team", 
    category: "Career Guidance", 
    readTime: "6 min read", 
    image: "/blog/career.png",
    tags: ["ADCA", "Career", "Innovation", "Jobs"]
  }
};
