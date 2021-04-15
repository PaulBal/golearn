export interface Lecture {
    title: string,
    description: string,
    studentsEnrolled: number,
    maxEnrollments: number,
    price: number,
    subjects: string[],
    professorId: string
}