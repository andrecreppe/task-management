import { Repository, EntityRepository } from "typeorm";
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { iif } from "rxjs";
import { User } from '../auth/user.entity';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  async getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
    const { status, search } = filterDto;

    const query = this.createQueryBuilder('task'); //task = keyword for the task entity
    
    if(status) {
      //query.andWhere('task.status = :status', { status: OPEN });
      query.andWhere('task.status = :status', { status });
    }

    if(search) {
      query.andWhere('(task.title LIKE :search OR task.description LIKE :search)', { search: `%${search}%` });
    }

    const tasks = await query.getMany();

    return tasks;
  }

  async createTask(
    createTaskDto: CreateTaskDto,
    user: User
  ): Promise<Task> {
    const { title, description } = createTaskDto;
    
    const task = new Task();
    task.title = title;
    task.description = description;
    task.status = TaskStatus.OPEN;
    task.user = user;

    await task.save();

    delete task.user; //delete from the return - to not send the user information

    return task;
  }
}
