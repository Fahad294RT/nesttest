import { User } from '../user/user.entity';
import { Company } from '../company/company.entity';

export class Utility {
  private static classes = {
    user: User,
    company: Company,
  };

  public static getClass(className: string): any {
    return this.classes[className];
  }
}
