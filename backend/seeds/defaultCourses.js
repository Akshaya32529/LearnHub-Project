const User = require('../models/User');
const Course = require('../models/Course');
const Lecture = require('../models/Lecture');
const Assessment = require('../models/Assessment');
const Question = require('../models/Question');

const slugify = (value) => String(value || '')
  .toLowerCase()
  .trim()
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-+|-+$/g, '')
  || 'course';

const defaultCourseConfigs = [
  {
    name: 'Java Programming',
    code: 'JAVA101',
    description: 'Learn Java from the basics with beginner-friendly programming concepts and practical exercises.',
    fullDescription: 'This course introduces Java programming from the ground up, covering variables, conditions, loops, arrays, methods, and object-oriented basics. It is designed for students starting their programming journey and includes hands-on examples and exercises.',
    category: 'Programming',
    difficulty: 'beginner',
    language: 'English',
    durationHours: 12,
    prerequisites: 'No prior programming experience required.',
    learningOutcomes: ['Understand Java syntax and structure', 'Write programs with variables and operators', 'Use loops, conditions, and arrays', 'Create reusable methods and OOP basics'],
    topics: [
      'Introduction to Java',
      'Variables and Data Types',
      'Operators',
      'Conditional Statements',
      'Loops',
      'Arrays',
      'Methods',
      'OOP Basics',
    ],
  },
  {
    name: 'Python Programming',
    code: 'PY101',
    description: 'Build confidence in Python programming through clear fundamentals and practical problem-solving.',
    fullDescription: 'This beginner-friendly Python course covers variables, conditional logic, loops, data structures, functions, and object-oriented programming. It helps students understand how to write simple, readable Python programs and solve everyday programming problems.',
    category: 'Programming',
    difficulty: 'beginner',
    language: 'English',
    durationHours: 12,
    prerequisites: 'Basic computer literacy recommended.',
    learningOutcomes: ['Understand Python basics and syntax', 'Use variables, operators, and conditions', 'Work with loops, lists, and dictionaries', 'Write reusable functions and solve beginner problems'],
    topics: [
      'Introduction to Python',
      'Variables and Data Types',
      'Operators',
      'Conditional Statements',
      'Loops',
      'Lists and Tuples',
      'Dictionaries and Sets',
      'Functions',
      'OOP Basics',
    ],
  },
  {
    name: 'C Programming',
    code: 'C101',
    description: 'Explore C fundamentals with structured learning, coding examples, and problem-solving exercises.',
    fullDescription: 'This course introduces the C programming language with clear explanations of variables, operators, control flow, arrays, strings, functions, pointers, and structures. It is ideal for students learning the foundations of systems programming and problem solving.',
    category: 'Programming',
    difficulty: 'beginner',
    language: 'English',
    durationHours: 12,
    prerequisites: 'No prior C programming experience required.',
    learningOutcomes: ['Understand C syntax and structure', 'Use variables, operators, and conditions', 'Work with loops, arrays, and strings', 'Build functions, pointers, and structures'],
    topics: [
      'Introduction to C',
      'Variables and Data Types',
      'Operators',
      'Conditional Statements',
      'Loops',
      'Arrays',
      'Strings',
      'Functions',
      'Pointers',
      'Structures',
    ],
  },
];

const topicNotes = {
  'Introduction to Java': 'A Java program is organized into classes and methods. The compiler produces bytecode that runs on the Java Virtual Machine, enabling portability across systems.',
  'Introduction to Python': 'Python uses readable, indentation-based syntax and a rich standard library. A script runs from top to bottom unless control flow or function calls change that path.',
  'Introduction to C': 'C is a compiled procedural language. A small program typically includes headers, defines main, performs statements, and returns a status code to the operating system.',
  'Variables and Data Types': 'Variables name values and each language associates values with types. Java and C use declared types; Python binds names dynamically. Choose a type suited to the data and validate input before using it.',
  'Operators': 'Arithmetic, comparison, logical, and assignment operators combine or compare values. C also provides bitwise operators. Operator precedence determines evaluation order; parentheses make intent clear.',
  'Conditional Statements': 'Use if and else branches to choose behavior from a Boolean condition. Java and C also provide switch; Python uses elif. Conditions should cover expected values and boundary cases.',
  'Loops': 'Loops repeat work while a condition holds or for each item in a sequence. Java and C commonly use for and while; Python also uses for-in. Ensure loop state changes so it terminates.',
  'Arrays': 'Arrays store ordered values accessed by zero-based index. Java and C use fixed-size arrays; Python commonly uses lists. Check bounds before indexing and use a loop to process every element.',
  'Methods': 'Java methods package reusable behavior behind a return type, name, and parameters. A method call supplies arguments; static methods belong to the class, while instance methods operate on an object.',
  'OOP Basics': 'Object-oriented programming models state and behavior with classes and objects. Fields store state and methods define behavior; encapsulation protects invariants, while inheritance models specialized types.',
  'Lists and Tuples': 'Python lists are ordered, mutable collections that support indexing and methods such as append. Tuples are ordered but immutable and suit fixed groups of values.',
  'Dictionaries and Sets': 'Dictionaries map unique keys to values for efficient lookup. Sets hold unique hashable values and support membership checks, union, and intersection.',
  'Functions': 'Functions collect reusable logic behind a name and optional parameters. Java and C declare return types; Python uses def and optional annotations. Return values let callers compose results.',
  'Strings': 'A string is text represented as a sequence of characters. In C, strings are character arrays terminated by a null byte; use bounded input and leave room for that terminator.',
  'Pointers': 'A pointer stores a memory address. Dereferencing accesses the pointed-to value; initialize pointers and only use valid addresses. Pointer arithmetic advances by the pointed-to type size.',
  'Structures': 'A C structure groups related fields into one record type. Define a struct, create instances, access fields with dot or arrow, and pass a pointer when a function should update a record.',
};

const assignmentPromptMap = {
  'Introduction to Java': 'Write a Java program with a main method that prints a short course introduction and explain the role of the class and main method.',
  'Introduction to Python': 'Write a Python script that prints a greeting, reads one value, and displays a formatted response.',
  'Introduction to C': 'Write a C program that includes the required header, defines main, prints a message, and returns a success status.',
  'Variables and Data Types': 'Write a small program that takes input and prints values using at least three different data types.',
  'Operators': 'Create a program that reads two numbers and displays their arithmetic results, comparisons, and a logical condition.',
  'Conditional Statements': 'Create a grading program that prints the correct grade based on a student score.',
  'Loops': 'Write a program that prints a number pattern or a series of numbers using loops.',
  'Arrays': 'Use an array to calculate minimum, maximum, and average values.',
  'Methods': 'Write two methods that perform a calculation and display a result; call both methods from main.',
  'Functions': 'Create a reusable function that accepts input, calculates a result, and returns it to its caller.',
  'OOP Basics': 'Create a class with two fields and one method, then instantiate it and demonstrate its behavior.',
  'Lists and Tuples': 'Create a Python program that performs basic list operations and demonstrates tuple usage.',
  'Dictionaries and Sets': 'Write a Python example that counts words and shows unique elements from a list.',
  'Strings': 'Write a C program that reads a string and prints the length and reverse of it.',
  'Pointers': 'Write a C program that uses pointer arithmetic to swap values or print array contents.',
  'Structures': 'Build a structure-based program to store and print student records.',
};

const questionBank = [
  'Which of the following is the correct way to declare a variable?',
  'What is the output of a conditional expression when the condition is false?',
  'Which control structure executes repeatedly until a condition becomes false?',
  'What best describes a function in programming?',
  'Which option correctly represents a list of values?',
  'What is the purpose of a pointer?',
];

const createQuestionSet = (topic, code, index) => {
  const options = [
    `${code} variable ${index}`,
    `${code} statement ${index}`,
    `${code} loop ${index}`,
    `${code} function ${index}`,
  ];

  return [
    {
      type: 'mcq',
      questionText: `Which concept is most directly related to ${topic}?`,
      options: [
        { text: 'Core programming concept', isCorrect: true },
        { text: 'Database design pattern', isCorrect: false },
        { text: 'Network hardware setup', isCorrect: false },
        { text: 'Graphic design theory', isCorrect: false },
      ],
      marks: 2,
      difficulty: 'easy',
      explanation: `${topic} is a core foundational topic in programming.`,
      order: 1,
    },
    {
      type: 'mcq',
      questionText: questionBank[index % questionBank.length],
      options: [
        { text: options[0], isCorrect: true },
        { text: options[1], isCorrect: false },
        { text: options[2], isCorrect: false },
        { text: options[3], isCorrect: false },
      ],
      marks: 2,
      difficulty: 'easy',
      explanation: 'This question checks the understanding of the selected programming concept.',
      order: 2,
    },
    {
      type: 'mcq',
      questionText: `Why is ${topic} important in beginner programming?`,
      options: [
        { text: 'It builds the foundation for writing correct logic', isCorrect: true },
        { text: 'It replaces all input/output operations', isCorrect: false },
        { text: 'It is only used in database systems', isCorrect: false },
        { text: 'It always removes the need for debugging', isCorrect: false },
      ],
      marks: 2,
      difficulty: 'medium',
      explanation: 'Understanding the underlying concept helps you write and debug programs more confidently.',
      order: 3,
    },
  ];
};

const createAssignmentQuestion = (topic, config) => ({
  type: 'descriptive',
  questionText: assignmentPromptMap[topic] || `Complete a practical ${config.name} task that demonstrates ${topic}, then explain your approach.`,
  modelAnswer: 'Submit a working solution that demonstrates the chapter concept, handles the stated inputs, and includes a brief explanation of the approach.',
  maxWords: 1000,
  marks: 10,
  difficulty: 'easy',
  explanation: 'This practical task is reviewed against correctness, clarity, and use of the chapter concept.',
  order: 1,
});

const ensureDefaultCourses = async () => {
  try {
    const instructor = await User.findOne({ role: 'instructor' })
      || await User.create({
          firstName: 'LearnHub',
          lastName: 'Instructor',
          email: 'learnhub.instructor@local',
          password: 'LearnHub123',
          role: 'instructor',
          instructorVerification: {
            status: 'approved',
            qualification: 'B.Tech / Computer Science',
            experienceYears: 4,
            organization: 'LearnHub Academy',
            expertise: 'Programming and problem solving',
            bio: 'LearnHub instructor account for course content and default learning modules.',
          },
        });

    for (const config of defaultCourseConfigs) {
      const existingCourse = await Course.findOne({ $or: [{ code: config.code }, { name: config.name }, { slug: slugify(config.name) }] });
      let course = existingCourse;

      if (existingCourse) {
        existingCourse.slug = existingCourse.slug || `${slugify(config.name)}-${Date.now().toString(36)}`;
        existingCourse.status = 'published';
        existingCourse.isActive = true;
        existingCourse.instructor = existingCourse.instructor || instructor._id;
        existingCourse.description = config.description;
        existingCourse.fullDescription = config.fullDescription;
        existingCourse.category = config.category;
        existingCourse.difficulty = config.difficulty;
        existingCourse.language = config.language;
        existingCourse.durationHours = config.durationHours;
        existingCourse.prerequisites = config.prerequisites;
        existingCourse.learningOutcomes = config.learningOutcomes;
        existingCourse.modules = config.topics.map((topic, index) => ({
          title: topic,
          order: index + 1,
          lessons: [{ title: `${topic} Notes`, order: 1 }],
        }));
        existingCourse.topics = config.topics.map((topic, index) => ({ title: topic, order: index + 1 }));
        await existingCourse.save();
      } else {
        course = await Course.create({
          name: config.name,
          slug: `${slugify(config.name)}-${Date.now().toString(36)}`,
          code: config.code,
          description: config.description,
          fullDescription: config.fullDescription,
          category: config.category,
          instructor: instructor._id,
          difficulty: config.difficulty,
          language: config.language,
          durationHours: config.durationHours,
          prerequisites: config.prerequisites,
          learningOutcomes: config.learningOutcomes,
          topics: config.topics.map((topic, index) => ({ title: topic, order: index + 1 })),
          modules: config.topics.map((topic, index) => ({
            title: topic,
            order: index + 1,
            lessons: [{ title: `${topic} Notes`, order: 1 }],
          })),
          status: 'published',
          isActive: true,
        });
      }

        for (const topic of config.topics) {
          await Lecture.findOneAndUpdate(
            { course: course._id, topic },
            {
              $set: {
                title: `${topic} Notes`,
                type: 'link',
                description: topicNotes[topic] || `Learn the key ideas behind ${topic}.`,
                duration: '10:00',
                order: 1,
              },
              $setOnInsert: { course: course._id, topic, uploadedBy: instructor._id },
            },
            { upsert: true, new: true }
          );

          const assignment = await Assessment.findOne({ course: course._id, topic, assessmentType: 'assignment' })
            || await Assessment.create({
              title: `${topic} Assignment`,
              course: course._id,
              topic,
              type: 'topic_test',
              assessmentType: 'assignment',
              description: assignmentPromptMap[topic] || `Complete a focused task on ${topic}.`,
              instructions: 'Submit a practical solution related to the topic and explain your reasoning.',
              totalMarks: 10,
              passingMarks: 6,
              duration: 20,
              difficulty: 'easy',
              createdBy: instructor._id,
              isPublished: true,
              isActive: true,
            });

          assignment.title = `${topic} Assignment`;
          assignment.description = assignmentPromptMap[topic] || `Complete a practical ${config.name} task that demonstrates ${topic}, then explain your approach.`;
          assignment.instructions = 'Submit a practical solution related to the topic and explain your reasoning.';
          assignment.totalMarks = 10;
          assignment.passingMarks = 6;
          assignment.isPublished = true;
          assignment.isActive = true;
          await assignment.save();

          const existingAssignmentQuestions = await Question.countDocuments({ assessment: assignment._id });
          if (existingAssignmentQuestions === 0) {
            await Question.create({ ...createAssignmentQuestion(topic, config), assessment: assignment._id });
          }

          const quiz = await Assessment.findOne({ course: course._id, topic, assessmentType: 'quiz' })
            || await Assessment.create({
              title: `${topic} Quiz`,
              course: course._id,
              topic,
              type: 'practice',
              assessmentType: 'quiz',
              description: `Quick quiz on ${topic}.`,
              instructions: 'Select the correct answer for each question and submit your response.',
              totalMarks: 6,
              passingMarks: 4,
              duration: 15,
              difficulty: 'easy',
              createdBy: instructor._id,
              isPublished: true,
              isActive: true,
            });

          quiz.title = `${topic} Quiz`;
          quiz.description = `Quick quiz on ${topic}.`;
          quiz.totalMarks = 6;
          quiz.passingMarks = 4;
          quiz.isPublished = true;
          quiz.isActive = true;
          await quiz.save();

          const existingQuizQuestions = await Question.countDocuments({ assessment: quiz._id });
          if (existingQuizQuestions === 0) {
            const questions = createQuestionSet(topic, config.code, config.topics.indexOf(topic) + 2)
              .map((question) => ({ ...question, assessment: quiz._id }));
            await Question.insertMany(questions);
          }
        }
    }

    return true;
  } catch (error) {
    console.error('Default course seed failed:', error);
    return false;
  }
};

module.exports = { defaultCourseConfigs, ensureDefaultCourses };
