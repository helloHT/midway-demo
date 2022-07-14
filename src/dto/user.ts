import { Rule, RuleType } from '@midwayjs/validate';

export class UserLoginDTO {
  @Rule(
    RuleType.string()
      .trim()
      .min(1)
      .required()
      .error(new Error('请输入正确的用户名'))
  )
  username: string;

  @Rule(
    RuleType.string()
      .trim()
      .min(1)
      .required()
      .error(new Error('请输入正确的密码'))
  )
  password: string;
}
