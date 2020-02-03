import * as path from "path";
import * as os from "os";
import * as fs from "fs-extra"; 
import { Debug } from "../utils/Debug";

export const PATH = path.join(os.homedir(), "Inco");

/**
 * @description crea las carpetas necesarias para el agente de inco
 */
export const createSources = async () => {
    try {
        await createDir();
        await createDir("database");

        if (!fs.existsSync(path.join(PATH, "database", "inco.sqlite"))) {
            await fs.copy(
                path.join(__dirname, "..", "..", "app", "db", "inco.sqlite"),
                path.join(PATH, "database", "inco.sqlite")
            );
        }

        fs.chmodSync(path.join(PATH, "database", "inco.sqlite"), 0o777);
    } catch (err) {
        Debug("createSourcesHomeDir", "createSources", null, err, "ERROR");
    }
}

const createDir = async (...files: string[]) => {
    const DIR = path.join(PATH, ...files);
    
    if (!fs.existsSync(DIR)) {
      await fs.mkdir(DIR);
    }
}
