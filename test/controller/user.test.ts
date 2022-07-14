import { createApp, close, createHttpRequest } from '@midwayjs/mock';
import { Framework, Application } from '@midwayjs/koa';

describe('test/controller/user.test.ts', () => {
  let app: Application;

  beforeAll(async () => {
    try {
      app = await createApp<Framework>();
    } catch (err) {
      console.error('test beforeAll error', err);
      throw err;
    }
  });

  afterAll(async () => {
    await close(app);
  });

  it('should POST /api/user/login success', async () => {
    const result = await createHttpRequest(app).post('/api/user/login').send({
      username: 'jack',
      password: 'redballoon',
    });

    expect(result.status).toBe(200);
    expect(result.body.code).toBe(200);
    expect(result.body.result).toBe('success');
    expect(result.body.message).toBe('登陆成功');
    expect(typeof result.body.data.jwt).toEqual('string');
  });

  it('should POST /api/user/login 请输入正确的用户名', async () => {
    const result = await createHttpRequest(app).post('/api/user/login').send({
      username: '',
      password: 'redballoon',
    });

    expect(result.status).toBe(200);
    expect(result.body.code).toBe(400);
    expect(result.body.result).toBe('error');
    expect(result.body.message).toBe('请输入正确的用户名');
    expect(result.body.data).toEqual(null);
  });

  it('should POST /api/user/login 请输入正确的密码', async () => {
    const result = await createHttpRequest(app).post('/api/user/login').send({
      username: 'jack',
      password: '',
    });

    expect(result.status).toBe(200);
    expect(result.body.code).toBe(400);
    expect(result.body.result).toBe('error');
    expect(result.body.message).toBe('请输入正确的密码');
    expect(result.body.data).toEqual(null);
  });

  it('should POST /api/user/login 账号或密码不正确', async () => {
    const result = await createHttpRequest(app).post('/api/user/login').send({
      username: 'jack1',
      password: 'redballoon',
    });

    expect(result.status).toBe(200);
    expect(result.body.code).toBe(400);
    expect(result.body.result).toBe('error');
    expect(result.body.message).toBe('账号或密码不正确');
    expect(result.body.data).toEqual(null);
  });

  it('should POST /api/user/login success', async () => {
    const result = await createHttpRequest(app).post('/api/user/login').send({
      username: 'jack',
      password: 'redballoon',
    });

    expect(result.status).toBe(200);
    expect(result.body.code).toBe(200);
    expect(result.body.result).toBe('success');
    expect(result.body.message).toBe('登陆成功');
    expect(typeof result.body.data.jwt).toEqual('string');
  });
});
