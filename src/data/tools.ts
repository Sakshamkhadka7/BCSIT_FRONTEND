export interface Tool {
  id: string;
  name: string;
  category: string;
  description: string;
  website: string;
  free: boolean;
}

export const tools: Tool[] = [
  {
    id: "vscode",
    name: "Visual Studio Code",
    category: "IDE",
    description: "Popular source code editor for web and software development.",
    website: "https://code.visualstudio.com",
    free: true,
  },

  {
    id: "github",
    name: "GitHub",
    category: "Version Control",
    description: "Host and manage software projects using Git.",
    website: "https://github.com",
    free: true,
  },

  {
    id: "postman",
    name: "Postman",
    category: "API Testing",
    description: "Test REST APIs and backend services.",
    website: "https://postman.com",
    free: true,
  },

  {
    id: "figma",
    name: "Figma",
    category: "UI/UX Design",
    description: "Design interfaces and collaborate on prototypes.",
    website: "https://figma.com",
    free: true,
  },

  {
    id: "netlify",
    name: "Netlify",
    category: "Deployment",
    description: "Deploy React applications quickly.",
    website: "https://netlify.com",
    free: true,
  },

  {
    id: "vercel",
    name: "Vercel",
    category: "Deployment",
    description: "Hosting platform for React and Next.js projects.",
    website: "https://vercel.com",
    free: true,
  },
];