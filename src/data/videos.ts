export interface VideoGuide {
  id: string;
  title: string;
  subject: string;
  semester: number;
  instructor: string;
  platform: string;
  duration: string;
  thumbnail: string;
  videoUrl: string;
  playlist: boolean;
  description: string;
  tags: string[];
  isFeatured?: boolean;
}

export const videos: VideoGuide[] = [
  {
    id: "wt-playlist",
    title: "Complete Web Technology Course",
    subject: "Web Technology",
    semester: 1,
    instructor: "CodeWithHarry",
    platform: "YouTube",
    duration: "18 Hours",
    thumbnail: "https://placehold.co/600x400",
    videoUrl: "https://www.youtube.com/results?search_query=CodeWithHarry+web+development+full+course",
    playlist: true,
    description:
      "HTML, CSS, JavaScript, Bootstrap, PHP and complete Web Technology syllabus coverage.",
    tags: ["html", "css", "javascript"],
    isFeatured: true,
  },

  {
    id: "java-playlist",
    title: "Java OOP Complete Series",
    subject: "Java Programming",
    semester: 2,
    instructor: "Telusko",
    platform: "YouTube",
    duration: "12 Hours",
    thumbnail: "https://placehold.co/600x400",
    videoUrl: "https://www.youtube.com/results?search_query=Telusko+Java+OOP+full+course",
    playlist: true,
    description:
      "Classes, Objects, Constructors, Inheritance, Polymorphism and Exception Handling.",
    tags: ["java", "oop"],
    isFeatured: true,
  },

  {
    id: "dsa-playlist",
    title: "Data Structures Full Course",
    subject: "Data Structures & Algorithms",
    semester: 2,
    instructor: "Apna College",
    platform: "YouTube",
    duration: "20 Hours",
    thumbnail: "https://placehold.co/600x400",
    videoUrl: "https://www.youtube.com/results?search_query=Apna+College+DSA+full+course",
    playlist: true,
    description:
      "Arrays, Linked Lists, Stacks, Queues, Trees, Graphs and Algorithms.",
    tags: ["dsa", "algorithms"],
  },

  {
    id: "dbms-playlist",
    title: "DBMS Complete Course",
    subject: "Database Management System",
    semester: 3,
    instructor: "Gate Smashers",
    platform: "YouTube",
    duration: "15 Hours",
    thumbnail: "https://placehold.co/600x400",
    videoUrl: "https://www.youtube.com/results?search_query=Gate+Smashers+DBMS+full+course",
    playlist: true,
    description:
      "ER Model, Relational Algebra, SQL, Normalization and Transactions.",
    tags: ["dbms", "sql"],
  },

  {
    id: "ai-playlist",
    title: "Artificial Intelligence Fundamentals",
    subject: "Artificial Intelligence",
    semester: 5,
    instructor: "freeCodeCamp",
    platform: "YouTube",
    duration: "10 Hours",
    thumbnail: "https://placehold.co/600x400",
    videoUrl: "https://www.youtube.com/results?search_query=freeCodeCamp+Artificial+Intelligence+course",
    playlist: false,
    description:
      "AI basics, search techniques, expert systems and machine learning overview.",
    tags: ["ai", "ml"],
  },
];

export const videoSubjects = [
  ...new Set(videos.map(v => v.subject)),
].sort();