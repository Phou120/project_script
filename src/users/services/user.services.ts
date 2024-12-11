import { Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { EventBus } from '@nestjs/cqrs';
import { RegisterSuccessEvent } from '../events/send-email.event';
import { SendMailDto } from '../dto/user.dto';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private readonly _eventBus: EventBus,
    ) {}

    async create(body: SendMailDto): Promise<any> {
        const user = this.userRepository.create({
            ...body,
        });
        
        console.log(body);
        await this._eventBus.publish(new RegisterSuccessEvent(body));

        return await this.userRepository.save(user);
    }
      
}



