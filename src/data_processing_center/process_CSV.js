import fs from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { parse } from "csv-parse";
import EventEmitter from "node:events";

const __dirname = dirname(fileURLToPath(import.meta.url));
console.log(__dirname);

const arr = [];
let headerArray = null;
let count = 0;
const conditionOfHabitablePlanet = {};

const compileDataEventEmitter = new EventEmitter();
compileDataEventEmitter.on("compile", function (header, chunk, length) {
  const newObject = {};
  //   console.log(chunk);
  for (let i = 0; i < length; i++) {
    newObject[header[i]] = chunk[i];
  }

  arr.push(newObject);
});

fs.createReadStream(join(__dirname, "public", "images", "kepler_data.csv"))
  .pipe(
    parse({
      comment: "#",
      column: true,
    })
  )
  .on("data", (chunk) => {
    if (count == 0) {
      headerArray = chunk;
      const habitableStructure = {
        koi_disposition: chunk.indexOf("koi_disposition"),
        koi_prad: chunk.indexOf("koi_prad"),
        koi_insol: chunk.indexOf("koi_insol"),
      };
      Object.assign(conditionOfHabitablePlanet, habitableStructure);
      count++;
    } else {
      if (
        chunk[conditionOfHabitablePlanet.koi_disposition] === "CONFIRMED" &&
        chunk[conditionOfHabitablePlanet.koi_insol] > 0.36 &&
        chunk[conditionOfHabitablePlanet.koi_insol] < 1.11 &&
        chunk[conditionOfHabitablePlanet.koi_prad] < 1.6
      ) {
        compileDataEventEmitter.emit(
          "compile",
          headerArray,
          chunk,
          chunk.length
        );
      }
      //   compileDataEventEmitter.emit("compile", headerArray, chunk, chunk.length);
    }
  })
  .on("end", () => {
    console.log(
      arr.map((planet) => {
        return planet["kepler_name"];
      })
    );
  })
  .on("error", (err) => {
    console.log(err);
  });
