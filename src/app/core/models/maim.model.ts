import { UserModel } from 'src/app/features-main/user/models/user.model';
export class MainModel {
  _id: string = '';
  label: string = '';
  display: any = {};
  status: string = '';
  codeObject: string = '';
  createdBy: UserModel | undefined;
  updatedBy: UserModel | undefined;
  deletedBy: UserModel | undefined;
  createdAt: string = '';
  updatedAt: string = '';
  deletedAt: string = '';
}
