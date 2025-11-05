//#region Enum and interface definitions
enum UserRole {
  STUDENT = 'student',
  TEACHER = 'teacher',
  ADMIN = 'admin',
}

enum CourseCategory {
  TECHNOLOGY = 'technology',
  BUSINESS = 'business',
  DESIGN = 'design',
}

interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  createdAt: Date;
}

interface Course {
  id: string;
  title: string;
  description: string;
  category: CourseCategory;
  instructorId: string;
  published: boolean;
  createdAt: Date;
}

interface Enrollment {
  id: string;
  studentId: string;
  courseId: string;
  enrolledAt: Date;
  progress: number;
}
//#endregion

//#region Storage containers
const users: User[] = [];
const courses: Course[] = [];
const enrollments: Enrollment[] = [];
//#endregion

//#region Generic Repository for CRUD operations
class Repository<T extends { id: string }> {
  private items: T[] = [];  

  add(data: T | T[]): void {
    if (Array.isArray(data)) {
      this.items.push(...data);
    } else {
      this.items.push(data);
    }
  }

  findById(id: string): T | undefined {
    return this.items.find((item) => item.id === id);
  }

  filterBy(predicate: (item: T) => boolean): T[] {
    return this.items.filter(predicate);
  }

  update(id: string, updatedItem: Partial<T>): boolean {
    const index = this.items.findIndex((item) => item.id === id);
    if (index === -1) return false;
    this.items[index] = { ...this.items[index], ...updatedItem };
    return true;
  }

  delete(id: string): boolean {
    const index = this.items.findIndex((item) => item.id === id);
    if (index === -1) return false;
    this.items.splice(index, 1);
    return true;
  }

  getAll(): T[] {
    return this.items;
  }
}
//#endregion


//#region function implementations
function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}

function createUser(email: string,name: string,role: UserRole = UserRole.STUDENT): User {
  return {
    id: generateId(),
    email,
    name,
    role,
    createdAt: new Date(),
  };
}

// Function to create enrollment
function createEnrollment(studentId: string, courseId: string): Enrollment {
  const enrollment: Enrollment = {
    id: generateId(),
    studentId,
    courseId,
    enrolledAt: new Date(),
    progress: 0,
  };
  return enrollment;
}

// Function overloading for flexible enrollment
function enrollStudent(studentId: string, courseIdOrIds: string | string[]): Enrollment | Enrollment[] {
  if (Array.isArray(courseIdOrIds)) {
    return courseIdOrIds.map((cid) => createEnrollment(studentId, cid));
  }
  return createEnrollment(studentId, courseIdOrIds);
}
//#endregion

//#region Repository instances
const userRepository = new Repository<User>();
const courseRepository = new Repository<Course>();
const enrollmentRepository = new Repository<Enrollment>();
//#endregion

//#region Example usage
// Creating users
const alice = createUser('alice@example.com', 'Alice');
const bob = createUser('bob@example.com', 'Bob');

userRepository.add(alice);
userRepository.add(bob);

// Creating courses
const course1: Course = {
  id: generateId(),
  title: 'Introduction to TypeScript',
  description: 'Learn the basics of TypeScript.',
  category: CourseCategory.TECHNOLOGY,
  instructorId: alice.id,
  published: true,
  createdAt: new Date(),
};
courseRepository.add(course1);

// Enrolling Bob in the course
const enrollment = enrollStudent(bob.id, course1.id);
enrollmentRepository.add(enrollment);

// print our sample data
console.log('Users:', userRepository.getAll());
console.log('Courses:', courseRepository.getAll());
console.log('Enrollment:', enrollmentRepository.getAll());
//#endregion