export class Race {
  name: string;
  location: string;
  entryFee: number;
  // OBSERVATION: The race.js file contains no evidence of these properties. However,
  //              node will flag an error if change the type of "entrants" to "string".
  // CONCLUSION: What is defined in this class is NOTHING to do with the js output but
  //             the TS compiler IS ensuring that the properties are satisfied at
  //             transpile time.
  entrants: number;

  imageUrl: string;
  isFlagship: boolean;
}
