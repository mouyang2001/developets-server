import { ObjectId } from 'mongodb';

interface Pet {
  _id: ObjectId
  orgId: ObjectId

  name: string
  energyLevel: number
  creationDate: Date
}


export type {
  Pet
}
