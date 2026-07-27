const { cpSync, mkdirSync, readdirSync, rmSync } = require("node:fs");
const { join } = require("node:path");

const projectRoot = join(__dirname, "..");
const outputDirectory = join(projectRoot, "dist");

rmSync(outputDirectory, { recursive: true, force: true });
mkdirSync(outputDirectory, { recursive: true });

readdirSync(projectRoot)
    .filter((fileName) => fileName.endsWith(".html"))
    .forEach((fileName) => {
        cpSync(join(projectRoot, fileName), join(outputDirectory, fileName));
    });

["css", "imagens", "js"].forEach((directory) => {
    cpSync(join(projectRoot, directory), join(outputDirectory, directory), {
        recursive: true,
    });
});

console.log("Site gerado em dist/ sem arquivos que não são usados na publicação.");
