import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity()
export class Settings {
  @PrimaryColumn("uuid")
  id: string;

  @Column({ nullable: true })
  password: string;

  @Column({ default: true })
  emailNotificationNews: boolean;

  @Column({ default: true })
  emailNotificationUpdatesFromFollowed: boolean;

  @Column({ default: true })
  emailNotificationComments: boolean;

  @Column({ default: true })
  emailNotificationEvents: boolean;

  @Column({ default: true })
  siteNotificationUpdatesFromFollowed: boolean;

  @Column({ default: true })
  siteNotificationComments: boolean;

  @Column({ default: true })
  siteNotificationEvents: boolean;

  @Column({ default: "All" })
  privacyProfileInfo: string;

  @Column({ default: "All" })
  privacyMyPosts: string;

  @Column({ default: "All" })
  privacyStories: string;

  @Column({ default: "All" })
  privacyEvents: string;

  @Column({ default: "All" })
  privacySurveys: string;

  @Column({ default: "All" })
  privacyTops: string;

  @Column({ default: "All" })
  privacyCollections: string;

  @Column({ default: "All" })
  privacyWatchlist: string;

  @Column({ default: "All" })
  privacyReviews: string;

  @Column({ default: "All" })
  privacyMessages: string;

  @Column({ default: "", nullable: true })
  resetToken: string;
}
