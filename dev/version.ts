import { fail } from "node:assert";
import { $ } from "bun";
import { type ReleaseType, inc, valid as isValidVersion } from "semver";

const packageJsonPath = "./package.json";
const appJsonPath = "./app.json";

const variants: ReleaseType[] = [
  "major",
  "premajor",
  "minor",
  "preminor",
  "patch",
  "prepatch",
  "prerelease",
];

const isValidTarget = (subject: string): subject is ReleaseType =>
  (variants as string[]).includes(subject);

const isDirty = async () => (await $`git status --porcelain`.quiet()).text();

const target = Bun.argv.pop();

// Read package.json
const packageJson = await Bun.file(packageJsonPath).json();
const { version: current } = packageJson;

// Read app.json
const appJson = await Bun.file(appJsonPath).json();

if (!isValidVersion(current))
  throw new Error(`Invalid current version ${current}`);

if (await isDirty())
  throw new Error(
    "There are uncommitted changes. Commit them before releasing.",
  );

// Determine new version
const desired = isValidVersion(target)
  ? target
  : target && isValidTarget(target)
    ? inc(current, target, "beta", "1")
    : fail("invalid target version");

if (!desired) throw new Error("Failed to bump");

console.debug(current, "—>", desired);

// Update versions
packageJson.version = desired;
appJson.expo.version = desired;

// Save updated files
await Bun.write(packageJsonPath, JSON.stringify(packageJson, null, 2));
await Bun.write(appJsonPath, JSON.stringify(appJson, null, 2));

// Optionally: Commit and tag
// await $`git add ${packageJsonPath} ${appJsonPath}`;
// await $`git commit -m v${desired}`;
// await $`git tag v${desired}`;
// await $`git push`;
// await $`git push --tags`;
