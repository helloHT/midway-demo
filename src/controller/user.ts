import {
  Controller,
  Post,
  Body,
  ALL,
  Inject,
  Config,
} from '@midwayjs/decorator';
import { Validate } from '@midwayjs/validate';
import { JwtService } from '@midwayjs/jwt';
import { UserLoginDTO } from '../dto/user';
import { UserModel } from '../model/user.model';

@Controller('/user')
export class HomeController {
  @Config('jwt')
  jwtConfig;

  @Inject()
  jwtService: JwtService;

  @Inject()
  userModel: UserModel;

  // private _delay() {
  //   return new Promise(resolve => {
  //     setTimeout(() => {
  //       resolve(1);
  //     }, 61 * 1000);
  //   });
  // }

  @Post('/login')
  @Validate()
  async login(
    @Body(ALL)
    body: UserLoginDTO
  ) {
    const { username, password } = body;
    const userInfo = await this.userModel.getUserByUsernameAndPassword(
      username,
      password
    );
    if (!userInfo) {
      throw new Error('账号或密码不正确');
    }
    const jwt = await this.jwtService.sign({ userId: userInfo.id });
    // await this._delay();
    return {
      message: '登陆成功',
      data: { jwt },
    };
  }
}
