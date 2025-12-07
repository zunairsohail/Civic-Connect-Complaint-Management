// check-ui-libs.js
const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const packages = [
  "react",
  "next",
  "tailwindcss",
  "lucide-react",
  "@hookform/resolvers",
  "react-hook-form",
  "zod",
  "sonner",
];

const importsToCheck = [
  { name: "Shadcn UI components", pattern: "@/components/ui" },
  { name: "Lucide Icons", pattern: "lucide-react" },
];

console.log("Checking UI libraries...");

// 1️⃣ Check npm packages
packages.forEach((pkg) => {
  try {
    execSync(`npm list ${pkg}`, { stdio: "ignore" });
    console.log(`✅ Package '${pkg}' is installed`);
  } catch {
    console.log(`⚠️ Package '${pkg}' is missing. Installing...`);
    try {
      execSync(`npm install ${pkg}`, { stdio: "inherit" });
      console.log(`✅ Installed '${pkg}' successfully`);
    } catch (err) {
      console.log(`❌ Failed to install '${pkg}': ${err.message}`);
    }
  }
});

// 2️⃣ Detect app or pages directory
const root = __dirname;
let codeFolder = null;

if (fs.existsSync(path.join(root, "app"))) {
  codeFolder = path.join(root, "app");
  console.log("📁 Using 'app/' folder");
} else if (fs.existsSync(path.join(root, "pages"))) {
  codeFolder = path.join(root, "pages");
  console.log("📁 Using 'pages/' folder");
} else {
  console.log("⚠️ No 'app/' or 'pages/' folder found. Skipping file import scan.");
}

// 3️⃣ Scan files for imports
if (codeFolder) {
  const walkDir = (dir, filelist = []) => {
    fs.readdirSync(dir).forEach((file) => {
      const filepath = path.join(dir, file);
      if (fs.statSync(filepath).isDirectory()) {
        filelist = walkDir(filepath, filelist);
      } else if (filepath.match(/\.(js|jsx|ts|tsx)$/)) {
        filelist.push(filepath);
      }
    });
    return filelist;
  };

  const files = walkDir(codeFolder);

  importsToCheck.forEach((item) => {
    let found = false;
    files.forEach((file) => {
      const content = fs.readFileSync(file, "utf-8");
      if (content.includes(item.pattern)) found = true;
    });

    if (found) {
      console.log(`✅ Import '${item.name}' found`);
    } else {
      console.log(`⚠️ Import '${item.name}' NOT found`);
    }
  });
}

console.log("\n✨ UI library check complete!");
