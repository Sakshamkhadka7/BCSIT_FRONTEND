export interface Subject {
  code: string;
  name: string;
  creditHours: number;
  type: "theory" | "practical" | "project";
  units: Unit[];
}

export interface Unit {
  number: number;
  title: string;
  topics: string[];
  hours: number;
}

export interface Semester {
  id: number;
  label: string;
  subjects: Subject[];
}

export const syllabus: Semester[] = [
  {
    id: 1,
    label: "Semester I",
    subjects: [
      {
        code: "ENG 111",
        name: "English",
        creditHours: 3,
        type: "theory",
        units: [],
      },
      {
        code: "CMP 171",
        name: "Fundamentals of Computer Systems",
        creditHours: 3,
        type: "theory",
        units: [],
      },
      {
        code: "CMP 172",
        name: "Programming Language",
        creditHours: 3,
        type: "theory",
        units: [],
      },
      {
        code: "CMP 173",
        name: "Internet Technology I",
        creditHours: 3,
        type: "theory",
        units: [],
      },
      {
        code: "MTH 113",
        name: "Mathematics I",
        creditHours: 3,
        type: "theory",
        units: [],
      },
    ],
  },

  {
    id: 2,
    label: "Semester II",
    subjects: [
      {
        code: "ENG 112",
        name: "Business Communication",
        creditHours: 3,
        type: "theory",
        units: [],
      },
      {
        code: "CMP 174",
        name: "Digital Systems",
        creditHours: 3,
        type: "theory",
        units: [],
      },
      {
        code: "CMP 175",
        name: "Object-Oriented Language (Java)",
        creditHours: 3,
        type: "theory",
        units: [],
      },
      {
        code: "CMP 176",
        name: "Data Structures and Algorithms",
        creditHours: 3,
        type: "theory",
        units: [],
      },
      {
        code: "MTH 114",
        name: "Mathematics II",
        creditHours: 3,
        type: "theory",
        units: [],
      },
      {
        code: "PRJ 181",
        name: "Project I",
        creditHours: 2,
        type: "project",
        units: [],
      },
    ],
  },

  {
    id: 3,
    label: "Semester III",
    subjects: [
      {
        code: "CMP 271",
        name: "Database Management System",
        creditHours: 3,
        type: "theory",
        units: [],
      },
      {
        code: "CMP 272",
        name: "Object-Oriented Analysis and Design",
        creditHours: 3,
        type: "theory",
        units: [],
      },
      {
        code: "CMP 273",
        name: "Internet Technology II (Programming)",
        creditHours: 3,
        type: "theory",
        units: [],
      },
      {
        code: "STT 220",
        name: "Statistics and Probability",
        creditHours: 3,
        type: "theory",
        units: [],
      },
      {
        code: "MGT 222",
        name: "Principles of Management",
        creditHours: 3,
        type: "theory",
        units: [],
      },
    ],
  },

  {
    id: 4,
    label: "Semester IV",
    subjects: [
      {
        code: "CMP 274",
        name: "Numerical Methods",
        creditHours: 3,
        type: "theory",
        units: [],
      },
      {
        code: "CMP 275",
        name: "Computer Architecture and Microprocessor",
        creditHours: 3,
        type: "theory",
        units: [],
      },
      {
        code: "CMP 276",
        name: "Software Engineering and Project Management",
        creditHours: 3,
        type: "theory",
        units: [],
      },
      {
        code: "CMP 277",
        name: "Data Communication and Networks",
        creditHours: 3,
        type: "theory",
        units: [],
      },
      {
        code: "FIN 222",
        name: "Fundamentals of Financial Management",
        creditHours: 3,
        type: "theory",
        units: [],
      },
      {
        code: "PRJ 281",
        name: "Project II",
        creditHours: 2,
        type: "project",
        units: [],
      },
    ],
  },

  {
    id: 5,
    label: "Semester V",
    subjects: [
      {
        code: "CMP 381",
        name: "Operating Systems",
        creditHours: 3,
        type: "theory",
        units: [],
      },
      {
        code: "CMP 471",
        name: "Artificial Intelligence",
        creditHours: 3,
        type: "theory",
        units: [],
      },
      {
        code: "MKT 351",
        name: "Digital Marketing",
        creditHours: 3,
        type: "theory",
        units: [],
      },
      {
        code: "MGT 471",
        name: "Organizational Behavior",
        creditHours: 3,
        type: "theory",
        units: [],
      },
      {
        code: "CONC 1",
        name: "Concentration I",
        creditHours: 3,
        type: "theory",
        units: [],
      },
    ],
  },

  {
    id: 6,
    label: "Semester VI",
    subjects: [
      {
        code: "CMP 384",
        name: "Computer Graphics",
        creditHours: 3,
        type: "theory",
        units: [],
      },
      {
        code: "CMP 382",
        name: "Cloud Computing",
        creditHours: 3,
        type: "theory",
        units: [],
      },
      {
        code: "ECO 322",
        name: "Applied Economics",
        creditHours: 3,
        type: "theory",
        units: [],
      },
      {
        code: "RCH 322",
        name: "Research Methods",
        creditHours: 3,
        type: "theory",
        units: [],
      },
      {
        code: "CONC 2",
        name: "Concentration II",
        creditHours: 3,
        type: "theory",
        units: [],
      },
    ],
  },

  {
    id: 7,
    label: "Semester VII",
    subjects: [
      {
        code: "PRJ 481",
        name: "Major Project",
        creditHours: 4,
        type: "project",
        units: [],
      },
      {
        code: "CMP 472",
        name: "Information System Security",
        creditHours: 3,
        type: "theory",
        units: [],
      },
      {
        code: "MGT 423",
        name: "Human Resource Management",
        creditHours: 3,
        type: "theory",
        units: [],
      },
      {
        code: "MGT 422",
        name: "Strategic Management",
        creditHours: 3,
        type: "theory",
        units: [],
      },
      {
        code: "CMP 383",
        name: "Digital Economy",
        creditHours: 3,
        type: "theory",
        units: [],
      },
      {
        code: "CONC 3",
        name: "Concentration III",
        creditHours: 3,
        type: "theory",
        units: [],
      },
    ],
  },

  {
    id: 8,
    label: "Semester VIII",
    subjects: [
      {
        code: "INT 494",
        name: "Internship",
        creditHours: 5,
        type: "project",
        units: [],
      },
      {
        code: "MGT 424",
        name: "Innovation and Entrepreneurship",
        creditHours: 3,
        type: "theory",
        units: [],
      },
      {
        code: "LAW 422",
        name: "Legal Aspects of Business and Technology",
        creditHours: 3,
        type: "theory",
        units: [],
      },
      {
        code: "CONC 4",
        name: "Concentration IV",
        creditHours: 3,
        type: "theory",
        units: [],
      },
    ],
  },
];