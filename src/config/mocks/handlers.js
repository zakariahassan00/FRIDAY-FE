import { rest } from 'msw';

export const handlers = [
  rest.get('http://localhost:8080/api/makes', (req, res, ctx) => {
    return res(
      ctx.json([
        "BMW",
        "FORD",
        "AUDI",
      ])
    );
  }),
  rest.get('http://localhost:8080/api/models', (req, res, ctx) => {
    // BMW models
    return res(
      ctx.json([
        "1er",
        "2er",
        "3er",
        "4er",
        "5er",
        "X1",
        "Z1"
      ])
    );
  }),
  rest.get('http://localhost:8080/api/vehicles', (req, res, ctx) => {
    // BMW > 3er
    return res(
      ctx.json([{
        "make": "BMW",
        "model": "3er",
        "enginePowerPS": 118,
        "enginePowerKW": 87,
        "fuelType": "Benzin",
        "bodyType": "Kombi",
        "engineCapacity": 1895
      },
      {
        "make": "BMW",
        "model": "3er",
        "enginePowerPS": 140,
        "enginePowerKW": 103,
        "fuelType": "Benzin",
        "bodyType": "Limousine",
        "engineCapacity": 1796
      },
      ])
    );
  }),
];