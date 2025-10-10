
import { readFileSync } from "fs";

try {
    const data = readFileSync(process.argv[2], "utf-8");
    console.log(data);
} catch (error) {
    console.error(err);
}
