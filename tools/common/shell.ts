import shell from "shelljs";
import { TargetService, TargetStage, projectDir } from "./config";
import { col } from "./shell.color";

let name: any = null;
let service: any = null;
let stage: any = null;
let prefix: any = null;
let startTime: any = null;

export const oneTxShell = {
  init: (targetName: string, targetService: string, targetStage: string, appDir?: string) => {
    name = targetName;
    service = targetService;
    stage = targetStage;

    prefix = `[${name}/${service}-${stage}]`;
    startTime = new Date();
    const shDir = appDir ? appDir : projectDir;
    shell.cd(shDir);
    shell.echo(`${col.fgCyan(String(prefix))} 🚀 Init\n`);
  },
  finish: async () => {
    shell.echo(`${col.fgGreen(String(prefix))} 🌝 Success\n`);
  },
  echo: async (message: string) => {
    shell.echo(`${message}\n`);
  },
  exec: async (
    step: string,
    command: string,
    option?: {
      skipLog?: boolean;
      safe?: boolean;
      appDir?: string;
    },
  ) => {
    const skipLogMode = option?.skipLog ?? false;
    const safeMode = option?.safe ?? true;

    if (!skipLogMode) {
      shell.echo(`${col.fgCyan(String(prefix))} 🐳 ${step} start\n`);
    }
    option?.appDir && shell.cd(option.appDir);
    const result = shell.exec(command);
    option?.appDir && shell.cd("-");
    if (result.code !== 0) {
      if (!skipLogMode) {
        shell.echo(`${col.fgRed(String(prefix))} 🚨 ${step} failed\n`);
      }
      if (safeMode) {
        shell.exit(1);
      }
    } else if (!skipLogMode) {
      shell.echo(`${col.fgGreen(String(prefix))} ✅ ${step} success\n`);
    }
    return result.stdout;
  },
  args: () => {
    const targetService = process.argv[2] as TargetService;
    const targetStage = process.argv[3] as TargetStage;

    if (!targetService || !targetStage) {
      shell.echo(`${col.fgRed("error")} Invalid arguments: { service: ${targetService}, stage: ${targetStage} }`);
      shell.exit(1);
    }

    if (Object.values(TargetService).indexOf(targetService) === -1) {
      shell.echo(`${col.fgRed("error")} Invalid service name: ${targetService}`);
      shell.exit(1);
    }

    if (Object.values(TargetStage).indexOf(targetStage) === -1) {
      shell.echo(`${col.fgRed("error")} Invalid stage name: ${targetStage}`);
      shell.exit(1);
    }

    return {
      service: targetService,
      stage: targetStage,
    };
  },
  cat: (path: string) => {
    return shell.cat(path);
  },
  cd: (path: string) => {
    return shell.cd(path);
  },
  exit: (code: number) => {
    return shell.exit(code);
  },
};
