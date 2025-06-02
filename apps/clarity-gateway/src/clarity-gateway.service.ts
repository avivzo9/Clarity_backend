import { Injectable } from '@nestjs/common';

@Injectable()
export class ClarityGatewayService {
  getHello(): string {
    return 'Hello World!';
  }
}
