export interface Speaker {
  id: number,
  firstname: string,
  lastname: string,
  image?: string
  aliases?: Alias[],
  characters?: Character[],
  dateOfBirth?: string,
  dateOfDeath?: string
}

export interface Alias {
  name: string;
}

export interface Character {
  name: string;
}

