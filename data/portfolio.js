  export const site = {
  name: "Nguyen Bao Thien",
  role: "Full-Stack Developer",
  email: "thienvp01@gmail.com",
  availability: "Open to full-time internships",
  intro:
    "Hi, I'm Nguyen Bao Thien! I'm a software developer and a third-year student studying Computer Science at Ho Chi Minh city University of Technology, HCMUT.",
  socialLinks: [
    { label: "GitHub: nbThien0101", href: "https://github.com/nbThien0101" },
    { label: "LinkedIn: Nguyen Bao Thien", href: "https://www.linkedin.com/in/nguyenbaothien01" },
  ],
};

export const technicalSkills = [
  { category: "Programming",               items: ["C++", "C", "C#", "Java", "JavaScript", "Python"] },
  { category: "Web Development",           items: ["React", "React Native", "Vite", "HTML/CSS", "Node.js"] },
  { category: "Machine Learning / Deep Learning", items: ["TensorFlow", "PyTorch", "OpenCV"] },
  { category: "Database",                  items: ["MongoDB", "MySQL", "PostgreSQL"] },
  { category: "Tools",                     items: ["GitHub", "GitLab", "VSCode", "Figma", "Render", "Vercel", "Docker", "Postman", "Cloudflare", "Azure"] },
];

export const softSkills = [
  "Communication", "Team Collaboration", "Problem Solving",
  "Time Management", "PowerPoint Design", "Presentation", "Football",
];

export const projects = [
  {
    title: "Personal Portfolio",
    summary:
      "My personal portfolio website built with Next.js, showcasing my projects, resume, and story.",
    stack: ["Next.js", "React", "CSS", "Vercel"],
    repo: "https://github.com/nbThien0101/NguyenBaoThien",
    live: "https://nguyen-bao-thien.vercel.app/",
  },
  {
    title: "Vote Tracker",
    summary:
      "A web-based platform to support vote counting for local People's Council elections, improving accuracy and transparency. Deployed and successfully used in a real local election.",
    stack: ["React", "Vite", "Node.js", "MongoDB", "Render", "Vercel"],
    repo: "https://github.com/nbThien0101/vote-tracker",
    live: "https://vote-tracker-roan.vercel.app/",
  },
  {
    title: "Bill Payment System",
    summary:
      "Backend development for a bill payment system with APIs for authentication, meter reading data display, and payment processing.",
    stack: ["Node.js", "REST API"],
  },
  {
    title: "Science Contest Showcase Website",
    summary:
      "A presentation website for the national science and engineering competition team of Huynh Thuc Khang High School.",
    stack: ["React", "CSS", "Vite", "Vercel", "Google App Script"],
    repo: "https://github.com/nbThien0101/KHKTQG-HTK2026-website",
    live: "https://khktqg-htk.vercel.app/",
  },
];

export const resume = {
  Teacher_Assistant: [
    "Taught 2 practical classes for the Programming Techniques course, covering core C/C++ concepts: pointers, OOP, I/O, Singly Linked List, and more.",
    "Designed assignments and projects for students, including creating solutions and test cases.",
  ],
  experience: [
    {
      role: "Backend Developer",
      company: "Bill payment system",
      period: "3/2026 - Present",
      details:
        "Developed server-side APIs for a bill payment system, including authentication, data display from meter readings, and payment processing features.",
    },
  ],
  education: [
    {
      title: "Student in Computer Science",
      school: "Ho Chi Minh City University of Technology, VNU-HCM",
      period: "2023 - 2027",
      GPA: "3.4/4.0"
    },
  ],
};
