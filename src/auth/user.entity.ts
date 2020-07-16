import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, Unique, OneToMany } from 'typeorm';
import * as bycript from 'bcrypt';
import { Task } from '../tasks/task.entity';

@Entity()
@Unique(['username'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  @OneToMany(type => Task, task => task.user, { eager: true })
  //eager true = when retriving user, list of tasks is accesible 
  tasks: Task[];

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bycript.hash(password, this.salt);

    return (hash === this.password);
  }
}
