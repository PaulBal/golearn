export interface Lecture {
    _id: string,
    title: string,
    description: string,
    studentsEnrolled: number,
    maxEnrollments: number,
    availableSpots: number,
    price: number,
    subjects: string[],
    professorId: string,
    startDate: Date,
    endDate: Date
}