import dayjs from "dayjs";
import "dayjs/locale/ko";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { exit } from "process";
import { TargetStage, projectDir } from "../common/config";
import { oneTxShell } from "../common/shell";

dayjs.extend(utc);
dayjs.extend(timezone);

const dbInfo = {
  local: {
    name: "localdb",
    user: "localusername",
    password: "localpass",
    host: "127.0.0.1",
    readHost: "127.0.0.1",
    port: 5432,
  },
  // NOTE: Add QA information if you use QA environment
  prod: {
    name: "",
    user: "",
    password: "",
    host: "",
    // FIXME: Change to replica URL
    readHost: "",
    port: 5432,
  },
};

const dbSync = async () => {
  const { service, stage } = oneTxShell.args();
  const sourceStage = stage;
  const targetStage = process.argv[4] as TargetStage;
  console.log(targetStage);
  if (!["local"].includes(targetStage)) {
    console.error("🚨 ERROR: Only local stage can be target stage. 🚨");
    exit(1);
  }
  if (sourceStage === targetStage) {
    console.error("😣 ERROR: Source stage and target stage must be different. 😣");
    exit(1);
  }
  // NOTE: Uncomment if you use QA environment
  //   if (sourceStage === "prod" && targetStage === "local") {
  //     exit(1);
  //   }

  oneTxShell.init(`🌊 DB Synchronization - ${sourceStage} > ${targetStage} `, service, stage);
  const dumpTimeText = dayjs(new Date()).tz("Asia/Seoul").format("YYYYMMDDHHmmss");
  const resetFilePath = `${projectDir}/tools/database/sql/reset_db.sql`;
  const backupFileDir = `${projectDir}/tools/database/backups`;
  const backupFilePath = `${backupFileDir}/${service}_${dumpTimeText}.sql`;
  const targetDBConnectionCMD = `PGPASSWORD=${dbInfo[targetStage].password} psql --username ${dbInfo[targetStage].user} --no-password --host=${dbInfo[targetStage].host} --port=${dbInfo[targetStage].port} --dbname=${dbInfo[targetStage].name}`;
  await oneTxShell.exec("Reset", `${targetDBConnectionCMD} --file=${resetFilePath}`);
  await oneTxShell.exec(
    "Dump",
    `PGPASSWORD=${dbInfo[sourceStage].password} pg_dump --dbname=${dbInfo[sourceStage].name} --file=${backupFilePath} --no-owner --username=${dbInfo[sourceStage].user} --host=${dbInfo[sourceStage].readHost} --port=${dbInfo[sourceStage].port}`,
  );
  await oneTxShell.exec("Restore", `${targetDBConnectionCMD} --file=${backupFilePath}`);
  await oneTxShell.exec("Remove Temp DB Data", `rm -r ${backupFileDir}/${service}_*.sql`);
  await oneTxShell.finish();
  targetStage === "local" && console.log("😋 Sync Completed: Run `yarn db-migrate:dev` to execute DB migration.");
};

dbSync();
