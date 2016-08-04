import { Race } from "./race";

export const RACES: Race[] = [{
  name: "Monaco Grand Prix",
  location: "Monte Carlo",
  entryFee: 1000000,
  entrants: 16,
  imageUrl: "images/CodingHorror.png",
  isFlagship: true
}, {
  name: "Belgian Grand Prix",
  entrants: 0,
  entryFee: 2.99,
  location: "Spa",
  imageUrl: "images/CodingHorror.png",
  isFlagship: false
}, {
  name: "British Grand Prix",
  location: "Silverstone",
  entryFee: 50,
  entrants: 22,
  imageUrl: "images/CodingHorror.png",
  isFlagship: false
}, {
  name: "Italian Grand Prix",
  location: "Monza",
  entryFee: 350,
  entrants: 24,
  imageUrl: "images/CodingHorror.png",
  isFlagship: true
}, {
  name: "Le Mans 24 Hour Race",
  entrants: 49,
  entryFee: 750,
  location: "Le Mans",
  imageUrl: "images/CodingHorror.png",
  isFlagship: true
}];
