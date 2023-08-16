export interface ICategory {
  identifier: string;
  name: string;
  groupId: string;
}

export const readyToAssignCategory: ICategory = {
  identifier: 'ready-to-assign',
  name: 'Ready to assign',
  groupId: 'inflow',
};