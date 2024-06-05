import { Option, program } from "commander";
import { options } from "./Notifier/factory/NotifierFactory";
import { main } from "./main";

program
  .addOption(
    new Option("-n, --notifier [notifierType]", "the notifier to use")
      .choices(options)
      .default("console")
  )
  .addOption(
    new Option("-v, --verbose", "output extra debugging").default(false)
  )
  .parse();

const dotenv = require("dotenv");
dotenv.config();

main();
