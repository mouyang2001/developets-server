import { Pet } from './Pet';

interface Organisation {
  cennznetAddress: string
  name: string
  coin: number
}

const GLOBAL_ORG = {
  cennznetAddress: null,
  name: "Team Gourmet Glizzys",
  coin: 100
}

const GLOBAL_PET: Pet = {
  _id: undefined,
  creationDate: undefined,
  energyLevel: 0,
  name: '',
  orgId: undefined

}

export {
  Organisation,
  GLOBAL_ORG
}
