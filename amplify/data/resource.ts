import { type ClientSchema, a, defineData } from "@aws-amplify/backend";
import { CfnUserPoolRiskConfigurationAttachment } from "aws-cdk-lib/aws-cognito";

const schema = a.schema({
  Users: a
    .model({
      email: a.string().required(),
      username: a.string(),
      firstName: a.string(),
      lastName: a.string(),
      age: a.string(),
      ethnicity: a.string(),
      occupation: a.string(),
      education: a.string(),
      data: a.hasOne("Data", "dataId"),
      setting: a.hasOne("Settings", "settingId"),
      todo: a.hasMany("Todo", "listId"),
    })
    .authorization((allow) => [allow.authenticated()])
    .identifier(["email"]),
  Data: a
  .model({
    dataId: a.id(),
    user: a.belongsTo('Users','dataId'),
    currStress: a.integer(),
    currFocus: a.integer(),
    stressArray: a.integer().array(),
    timeArray: a.date().array(),
    focusArray: a.integer().array(),
    daysActive: a.date().array(),
    focusTime: a.integer().array(),
    focusTimeArray: a.date().array(),
    badgesArray: a.boolean().array(),
    xp: a.integer()
    
  })
  .authorization((allow) => [allow.authenticated()])
  ,
  Settings: a
    .model({
      settingId: a.id(),
      user: a.belongsTo('Users','settingId'),
      emailNoti: a.boolean(),
      pushNoti: a.boolean(),
      occupation: a.string(),
      education: a.string(),
      twofactor: a.boolean(),
      securityq: a.string().array(),
      securitya: a.string().array(),
      language: a.string(),
      region: a.string(),
      subscription: a.string(),
      deviceName: a.string(),
      volumeLevel: a.integer(),
      noiseCancellation: a.string(),
      theme: a.string(),
      currentVersion: a.string(),
    })
    .authorization((allow) => [allow.authenticated()]),
  Todo: a
    .model({
      task: a.string().required(),
      date: a.string().required(),
      start: a.string(),
      end: a.string(),
      allocated: a.integer(),
      listId: a.id(),
      completed: a.boolean(),
      user: a.belongsTo("Users", "listId"),
      subtask: a.hasMany("Subtask", "subtaskId"),
    })
    .authorization((allow) => [allow.authenticated()]),
  Subtask: a
    .model({
      subtaskId: a.id(),
      todo: a.belongsTo("Todo", "subtaskId"),
      task: a.string().required(),
      completed: a.boolean(),
    })
    .authorization((allow) => [allow.authenticated()]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "userPool",
  },
});
