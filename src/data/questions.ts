export interface QuestionPaper {
  id: string;
  title: string;
  subject: string;
  subjectCode: string;
  semester: number;
  year: number;
  examType: "Board" | "Pre-Board" | "Mid-Term";
  totalMarks: number;
  duration: string;
  fileSize: string;
  downloadUrl: string;
  uploadedDate: string;
  tags: string[];
  isFeatured?: boolean;
}

export const questionPapers: QuestionPaper[] = [
  {
    id: "nm-board-2081",
    title: "Numerical Methods Board Examination 2081",
    subject: "Numerical Methods",
    subjectCode: "CACS402",
    semester: 4,
    year: 2081,
    examType: "Board",
    totalMarks: 60,
    duration: "3 Hours",
    fileSize: "1.8 MB",
    downloadUrl: "#",
    uploadedDate: "2025-01-10",
    tags: ["board", "numerical", "important"],
    isFeatured: true,
  },
  {
    id: "mp-board-2081",
    title: "Microprocessor Board Examination 2081",
    subject: "Microprocessor",
    subjectCode: "CACS401",
    semester: 4,
    year: 2081,
    examType: "Board",
    totalMarks: 60,
    duration: "3 Hours",
    fileSize: "1.7 MB",
    downloadUrl: "#",
    uploadedDate: "2025-01-12",
    tags: ["8085", "board"],
    isFeatured: true,
  },
  {
    id: "dcn-preboard-2080",
    title: "DCN Pre Board Examination 2080",
    subject: "Data Communication & Networking",
    subjectCode: "CACS404",
    semester: 4,
    year: 2080,
    examType: "Pre-Board",
    totalMarks: 60,
    duration: "3 Hours",
    fileSize: "1.5 MB",
    downloadUrl: "#",
    uploadedDate: "2025-01-15",
    tags: ["networking"],
  },
  {
    id: "se-mid-2081",
    title: "Software Engineering Mid Term 2081",
    subject: "Software Engineering & PM",
    subjectCode: "CACS403",
    semester: 4,
    year: 2081,
    examType: "Mid-Term",
    totalMarks: 30,
    duration: "1.5 Hours",
    fileSize: "900 KB",
    downloadUrl: "#",
    uploadedDate: "2025-01-20",
    tags: ["midterm", "software"],
  },
  {
    id: "dsa-board-2080",
    title: "DSA Board Examination 2080",
    subject: "Data Structures & Algorithms",
    subjectCode: "CACS301",
    semester: 3,
    year: 2080,
    examType: "Board",
    totalMarks: 60,
    duration: "3 Hours",
    fileSize: "1.9 MB",
    downloadUrl: "#",
    uploadedDate: "2024-08-01",
    tags: ["dsa", "board"],
  },
  {
    id: "wt-board-2080",
    title: "Web Technology Board Examination 2080",
    subject: "Web Technology",
    subjectCode: "CACS304",
    semester: 3,
    year: 2080,
    examType: "Board",
    totalMarks: 60,
    duration: "3 Hours",
    fileSize: "1.6 MB",
    downloadUrl: "#",
    uploadedDate: "2024-08-04",
    tags: ["html", "css", "javascript"],
  },
];

export const questionSubjects = [
  ...new Set(questionPapers.map((q) => q.subject)),
].sort();

export const questionSemesters = [
  ...new Set(questionPapers.map((q) => q.semester)),
].sort((a, b) => a - b);

// Quiz engine exports (required by Quiz.tsx and useQuiz.ts)

export interface Question {
  id: number;
  question: string;
  options: string[];
  answer: number;
  explanation: string;
  subject: string;
  semester: number;
  difficulty: "easy" | "medium" | "hard";
}

export const questions: Question[] = [
  { id: 1, question: "Which generation of computers used vacuum tubes?", options: ["First", "Second", "Third", "Fourth"], answer: 0, explanation: "First generation computers (1940s–1950s) used vacuum tubes as their primary electronic components.", subject: "Computer Fundamentals", semester: 1, difficulty: "easy" },
  { id: 2, question: "What is the binary equivalent of decimal 25?", options: ["10101", "11001", "10110", "11010"], answer: 1, explanation: "25 = 16+8+1 = 11001 in binary.", subject: "Computer Fundamentals", semester: 1, difficulty: "easy" },
  { id: 3, question: "Which of the following is NOT a logic gate?", options: ["AND", "OR", "XOR", "ADD"], answer: 3, explanation: "ADD is an arithmetic operation, not a logic gate.", subject: "Computer Fundamentals", semester: 1, difficulty: "easy" },
  { id: 4, question: "Cache memory is located between:", options: ["RAM and CPU", "RAM and HDD", "CPU and HDD", "ROM and CPU"], answer: 0, explanation: "Cache memory sits between the CPU and RAM to provide faster data access.", subject: "Computer Fundamentals", semester: 1, difficulty: "easy" },
  { id: 5, question: "What does IEEE 754 standard define?", options: ["Network protocols", "Floating point arithmetic", "Memory addressing", "Character encoding"], answer: 1, explanation: "IEEE 754 is the technical standard for floating-point arithmetic.", subject: "Computer Fundamentals", semester: 1, difficulty: "medium" },
  { id: 6, question: "The hexadecimal equivalent of binary 11011010 is:", options: ["DA", "AD", "CA", "AC"], answer: 0, explanation: "1101 = D, 1010 = A, so 11011010 = DA in hexadecimal.", subject: "Computer Fundamentals", semester: 1, difficulty: "medium" },
  { id: 7, question: "Which software directly manages hardware resources?", options: ["Application software", "Middleware", "Operating system", "Compiler"], answer: 2, explanation: "The operating system manages hardware resources directly.", subject: "Computer Fundamentals", semester: 1, difficulty: "easy" },
  { id: 8, question: "In Bisection method, the new approximation is found by:", options: ["Newton's formula", "Midpoint of interval", "Secant line intersection", "Fixed point"], answer: 1, explanation: "Bisection method takes the midpoint c = (a+b)/2 as the new approximation.", subject: "Numerical Methods", semester: 4, difficulty: "easy" },
  { id: 9, question: "Newton-Raphson method has ______ convergence.", options: ["Linear", "Quadratic", "Cubic", "Logarithmic"], answer: 1, explanation: "Newton-Raphson has quadratic (second-order) convergence near the root.", subject: "Numerical Methods", semester: 4, difficulty: "medium" },
  { id: 10, question: "Truncation error arises from:", options: ["Rounding of decimals", "Approximating infinite processes", "Hardware limitations", "Data input errors"], answer: 1, explanation: "Truncation error results from approximating a mathematical procedure.", subject: "Numerical Methods", semester: 4, difficulty: "medium" },
  { id: 11, question: "False Position method is also known as:", options: ["Secant method", "Regula Falsi", "Bisection method", "Muller's method"], answer: 1, explanation: "The False Position method is also called Regula Falsi.", subject: "Numerical Methods", semester: 4, difficulty: "easy" },
  { id: 12, question: "For Bisection method, f(a) and f(b) must:", options: ["Be equal", "Have opposite signs", "Both be positive", "Both be negative"], answer: 1, explanation: "Bisection requires f(a)·f(b) < 0 to guarantee a root in [a,b].", subject: "Numerical Methods", semester: 4, difficulty: "easy" },
  { id: 13, question: "Newton-Raphson formula: x₁ = x₀ - ?", options: ["f(x₀)/f'(x₀)", "f'(x₀)/f(x₀)", "f(x₀)×f'(x₀)", "f(x₀)-f'(x₀)"], answer: 0, explanation: "Newton-Raphson: x₁ = x₀ - f(x₀)/f'(x₀).", subject: "Numerical Methods", semester: 4, difficulty: "easy" },
  { id: 14, question: "The 8085 microprocessor has how many bit data bus?", options: ["4-bit", "8-bit", "16-bit", "32-bit"], answer: 1, explanation: "The Intel 8085 has an 8-bit data bus.", subject: "Microprocessor", semester: 4, difficulty: "easy" },
  { id: 15, question: "Which register in 8085 is the accumulator?", options: ["B", "C", "A", "H"], answer: 2, explanation: "Register A (Accumulator) is used for arithmetic and logical operations.", subject: "Microprocessor", semester: 4, difficulty: "easy" },
  { id: 16, question: "The 8085 address bus is:", options: ["8-bit", "12-bit", "16-bit", "20-bit"], answer: 2, explanation: "8085 has a 16-bit address bus, allowing 64KB memory addressing.", subject: "Microprocessor", semester: 4, difficulty: "easy" },
  { id: 17, question: "MVI A, 32H loads the value 32H into:", options: ["Memory", "Register B", "Accumulator A", "Stack pointer"], answer: 2, explanation: "MVI A loads the immediate value into the Accumulator.", subject: "Microprocessor", semester: 4, difficulty: "easy" },
  { id: 18, question: "Which instruction halts the 8085?", options: ["STOP", "END", "HLT", "HALT"], answer: 2, explanation: "HLT stops the program execution.", subject: "Microprocessor", semester: 4, difficulty: "easy" },
  { id: 19, question: "8085 flag register has how many flags?", options: ["3", "4", "5", "6"], answer: 2, explanation: "8085 has 5 flags: Sign, Zero, Auxiliary Carry, Parity, and Carry.", subject: "Microprocessor", semester: 4, difficulty: "medium" },
  { id: 20, question: "OSI model has how many layers?", options: ["4", "5", "7", "8"], answer: 2, explanation: "The OSI model has 7 layers: Physical, Data Link, Network, Transport, Session, Presentation, Application.", subject: "Data Communication & Networking", semester: 4, difficulty: "easy" },
  { id: 21, question: "TCP/IP model has how many layers?", options: ["4", "5", "6", "7"], answer: 0, explanation: "TCP/IP model has 4 layers: Network Access, Internet, Transport, Application.", subject: "Data Communication & Networking", semester: 4, difficulty: "easy" },
  { id: 22, question: "Which layer is responsible for routing?", options: ["Data Link", "Network", "Transport", "Physical"], answer: 1, explanation: "The Network layer (Layer 3) handles routing using IP addresses.", subject: "Data Communication & Networking", semester: 4, difficulty: "easy" },
  { id: 23, question: "IP address 192.168.1.1 belongs to which class?", options: ["Class A", "Class B", "Class C", "Class D"], answer: 2, explanation: "192.168.x.x is a Class C private IP address.", subject: "Data Communication & Networking", semester: 4, difficulty: "easy" },
  { id: 24, question: "DNS converts:", options: ["IP to MAC", "Domain name to IP", "IP to domain only", "Hostname to MAC"], answer: 1, explanation: "DNS translates domain names to IP addresses.", subject: "Data Communication & Networking", semester: 4, difficulty: "easy" },
  { id: 25, question: "Which protocol is used for email sending?", options: ["POP3", "IMAP", "SMTP", "FTP"], answer: 2, explanation: "SMTP (Simple Mail Transfer Protocol) is used for sending emails.", subject: "Data Communication & Networking", semester: 4, difficulty: "easy" },
  { id: 26, question: "Waterfall model is a:", options: ["Iterative model", "Incremental model", "Sequential linear model", "Spiral model"], answer: 2, explanation: "Waterfall is a sequential linear model where each phase completes before the next begins.", subject: "Software Engineering & PM", semester: 4, difficulty: "easy" },
  { id: 27, question: "SRS document stands for:", options: ["Software Requirements Specification", "System Resource Summary", "Software Risk Statement", "System Requirements Study"], answer: 0, explanation: "SRS — Software Requirements Specification — documents all requirements.", subject: "Software Engineering & PM", semester: 4, difficulty: "easy" },
  { id: 28, question: "Scrum sprint typically lasts:", options: ["1 day", "1 week", "2–4 weeks", "3 months"], answer: 2, explanation: "A Scrum sprint is a time-boxed iteration of 2 to 4 weeks.", subject: "Software Engineering & PM", semester: 4, difficulty: "easy" },
  { id: 29, question: "COCOMO stands for:", options: ["Constructive Cost Model", "Computer Cost Model", "Coding Cost Method", "Constructive Code Measurement"], answer: 0, explanation: "COCOMO is an algorithmic software cost estimation model.", subject: "Software Engineering & PM", semester: 4, difficulty: "medium" },
  { id: 30, question: "Time complexity of binary search is:", options: ["O(n)", "O(n²)", "O(log n)", "O(n log n)"], answer: 2, explanation: "Binary search halves the search space each step — O(log n).", subject: "Data Structures & Algorithms", semester: 3, difficulty: "easy" },
  { id: 31, question: "Which data structure uses FIFO principle?", options: ["Stack", "Queue", "Tree", "Graph"], answer: 1, explanation: "Queue follows First In First Out (FIFO).", subject: "Data Structures & Algorithms", semester: 3, difficulty: "easy" },
  { id: 32, question: "In a BST, the left subtree contains:", options: ["Greater values", "Smaller values", "Equal values", "Random values"], answer: 1, explanation: "In a BST, left subtree nodes have smaller key values than the parent.", subject: "Data Structures & Algorithms", semester: 3, difficulty: "easy" },
  { id: 33, question: "Worst-case time complexity of Quick Sort is:", options: ["O(n log n)", "O(n)", "O(n²)", "O(log n)"], answer: 2, explanation: "Quick Sort worst case O(n²) occurs when pivot is always the smallest/largest element.", subject: "Data Structures & Algorithms", semester: 3, difficulty: "medium" },
  { id: 34, question: "Dijkstra's algorithm finds:", options: ["Minimum spanning tree", "Shortest path", "Maximum flow", "Topological sort"], answer: 1, explanation: "Dijkstra's finds the shortest path from source to all other vertices.", subject: "Data Structures & Algorithms", semester: 3, difficulty: "easy" },
  { id: 35, question: "Which is a semantic HTML5 element?", options: ["<div>", "<span>", "<article>", "<b>"], answer: 2, explanation: "<article> is semantic HTML5. <div> and <span> are generic containers.", subject: "Web Technology", semester: 3, difficulty: "easy" },
  { id: 36, question: "HTTP status code 404 means:", options: ["Server error", "Unauthorized", "Not Found", "Bad request"], answer: 2, explanation: "HTTP 404 Not Found — the server cannot find the requested resource.", subject: "Web Technology", semester: 3, difficulty: "easy" },
  { id: 37, question: "JavaScript is primarily a ______ language.", options: ["Compiled", "Interpreted", "Assembly", "Machine"], answer: 1, explanation: "JavaScript is an interpreted/JIT-compiled scripting language.", subject: "Web Technology", semester: 3, difficulty: "easy" },
  { id: 38, question: "ACID in DBMS stands for:", options: ["Availability, Consistency, Integrity, Durability", "Atomicity, Consistency, Isolation, Durability", "Atomicity, Concurrency, Integrity, Distribution", "Availability, Concurrency, Isolation, Data"], answer: 1, explanation: "ACID = Atomicity, Consistency, Isolation, Durability.", subject: "Database Management System", semester: 5, difficulty: "easy" },
  { id: 39, question: "What is the purpose of normalization?", options: ["Increase data redundancy", "Reduce data redundancy", "Increase query speed only", "Add more tables"], answer: 1, explanation: "Normalization reduces redundancy and improves data integrity.", subject: "Database Management System", semester: 5, difficulty: "easy" },
  { id: 40, question: "Which SQL command removes a table completely?", options: ["DELETE", "TRUNCATE", "DROP", "REMOVE"], answer: 2, explanation: "DROP TABLE removes the entire table structure and all its data.", subject: "Database Management System", semester: 5, difficulty: "easy" },
  { id: 41, question: "RSA encryption is based on:", options: ["Symmetric key", "Difficulty of factoring large numbers", "XOR operations", "Hash functions"], answer: 1, explanation: "RSA relies on the difficulty of factoring the product of two large primes.", subject: "Cryptography", semester: 7, difficulty: "medium" },
  { id: 42, question: "AES stands for:", options: ["Advanced Encryption Standard", "Applied Encryption System", "Asymmetric Encryption Scheme", "Advanced Encoding System"], answer: 0, explanation: "AES — Advanced Encryption Standard — is a symmetric block cipher.", subject: "Cryptography", semester: 7, difficulty: "easy" },
  { id: 43, question: "Which data structure is used in BFS?", options: ["Stack", "Queue", "Heap", "Tree"], answer: 1, explanation: "BFS uses a Queue to explore vertices level by level.", subject: "Data Structures & Algorithms", semester: 3, difficulty: "easy" },
  { id: 44, question: "Merge Sort time complexity is:", options: ["O(n²)", "O(n)", "O(n log n)", "O(log n)"], answer: 2, explanation: "Merge Sort always runs in O(n log n).", subject: "Data Structures & Algorithms", semester: 3, difficulty: "easy" },
  { id: 45, question: "What does API stand for?", options: ["Application Programming Interface", "Applied Protocol Interface", "Automated Program Integration", "Application Process Interaction"], answer: 0, explanation: "API — Application Programming Interface — defines how software components communicate.", subject: "Web Technology", semester: 3, difficulty: "easy" },
  { id: 46, question: "Recursion requires which data structure internally?", options: ["Queue", "Stack", "Array", "Linked list"], answer: 1, explanation: "Recursion uses the call stack to store function call frames.", subject: "Data Structures & Algorithms", semester: 3, difficulty: "easy" },
  { id: 47, question: "In OOP, encapsulation means:", options: ["Multiple inheritance", "Hiding internal data and exposing only necessary methods", "Reusing code", "Creating multiple objects"], answer: 1, explanation: "Encapsulation bundles data and methods while hiding internal details.", subject: "Object Oriented Programming", semester: 5, difficulty: "easy" },
  { id: 48, question: "Which sorting algorithm is stable?", options: ["Quick Sort", "Heap Sort", "Merge Sort", "Selection Sort"], answer: 2, explanation: "Merge Sort is stable — it preserves relative order of equal elements.", subject: "Data Structures & Algorithms", semester: 3, difficulty: "medium" },
  { id: 49, question: "PUSH B in 8085 pushes which registers?", options: ["Only B", "B and C", "B and A", "B and H"], answer: 1, explanation: "PUSH B pushes the BC register pair onto the stack.", subject: "Microprocessor", semester: 4, difficulty: "medium" },
  { id: 50, question: "Newton-Raphson method fails when f'(x) is:", options: ["Very large", "Positive", "Zero", "Negative"], answer: 2, explanation: "Newton-Raphson requires division by f'(x). If f'(x₀) = 0, the method fails.", subject: "Numerical Methods", semester: 4, difficulty: "medium" },
];

// Exports required by Quiz.tsx and useQuiz.ts
export const subjects  = [...new Set(questions.map((q) => q.subject))].sort();
export const semesters = [...new Set(questions.map((q) => q.semester))].sort((a, b) => a - b);