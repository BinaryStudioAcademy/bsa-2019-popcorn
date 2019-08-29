import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany
} from "typeorm";
import { User } from "./User";
import { VotingOption } from "./VotingOption";

@Entity()
export class Voting {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  header: string;

  @ManyToOne(type => User, user => user.id, { onDelete: "CASCADE" })
  user: User;

  @OneToMany(type => VotingOption, votingOption => votingOption.voting)
  votingOptions: VotingOption[];

  @Column()
  deltaPositionHeadX: number;

  @Column()
  deltaPositionHeadY: number;

  @Column()
  deltaPositionOptionBlockX: number;

  @Column()
  deltaPositionOptionBlockY: number;

  @Column()
  backColor: string;

  @Column({ nullable: true })
  backImage: string;
}
