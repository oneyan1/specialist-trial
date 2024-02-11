export const PER_PAGE = 20;

export type Specialist = {
  id: number;
  userGrade: number | null;
  fullName: string;
  position: string;
  averageGrade: number;
  numberOfGrade: number;
  avatar: string;
};

export type UpdateSpecialist = {
  id: number;
  newValue: Specialist;
};
