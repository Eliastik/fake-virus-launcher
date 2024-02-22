import { FileProgram, Program } from "./program";

interface AppData {
  version: string;
  date: Date;
  programs: Program[];
  additionalAssetFiles: FileProgram[],
  assetsDirectory: string;
  updateURL: string;
  neutralinoUpdateURL: string;
  websiteURL: string;
  downloadUpdateURL: string;
  assetsDownloadURL: string;
}

const appData: AppData = {
  "version": "2.1.0",
  "date": new Date(2024, 1, 21),
  programs: [
    { name: "anticlic", file: { exec: "anticlicvirus.bat", hashSHA256: "e4e5c8732d66456ae58b1a4ba81daf9420deaebf87f2d3f78323ae6c2ddb6c39" }, icon: "mouse", hasFullscreen: false, hasWarning: false, isEasterEgg: false },
    { name: "infinite", file: { exec: "infinite.bat", hashSHA256: "968e624cf02bd71938084f302feb5493d3d367d1631f0f7339aa3cc310b2f5b3" }, icon: "window", hasFullscreen: false, hasWarning: false, isEasterEgg: false },
    { name: "matrix", file: { exec: "matrix.bat", hashSHA256: "2f82b31b6f537fe2c8011fd6ac69e80e0e98a585ae1f6394181a768f7ed8abb7" }, icon: "terminal", hasFullscreen: true, hasWarning: false, isEasterEgg: false },
    { name: "reboot", file: { exec: "reboot-pc.bat", hashSHA256: "f63f31cf5de0492a7a5e03737f918248f7da20cd32d75d5103d5444f519fcb0b" }, icon: "restart_alt", hasFullscreen: false, hasWarning: true, isEasterEgg: false },
    { name: "shutdown", file: { exec: "shutdown-pc.bat", hashSHA256: "918532d68dc2709c419a439f1dc9bba62c5afe1e9d35e0ca94e7cbcd29da1197" }, icon: "power_settings_new", hasFullscreen: false, hasWarning: true, isEasterEgg: false },
    { name: "beep", file: { exec: "beep.bat", hashSHA256: "a6f3ccda75ab33a853798d5288b4e2e18854b6f4e03495ba5dcb79f0664065c4" }, icon: "volume_up", hasFullscreen: false, hasWarning: false, isEasterEgg: false },
    { name: "mega-flash", file: { exec: "mega-flash.bat", hashSHA256: "177eac4172ce2f457b1b4b58f977b56b3ae7bc742102b6a87b6f1f2f882c8d6d" }, icon: "bolt", hasFullscreen: true, hasWarning: false, isEasterEgg: false },
    { name: "bsod", file: { exec: "bsod.hta", hashSHA256: "cbe60ab39f4a3663db03a6d91632ffd8b649d916a4f2cf95eb3d3e5a8398e78d" }, icon: "error_circle_rounded", hasFullscreen: false, hasWarning: false, isEasterEgg: false },
    { name: "msg", file: { exec: "msg.vbs", hashSHA256: "4014a751f918d5c3c2df5bb1907f84928641627841f73b41ae9bf5d3ad1a8787" }, icon: "warning", hasFullscreen: false, hasWarning: false, isEasterEgg: false },
    { name: "mega-flash-color", file: { exec: "mega-flash-color.bat", hashSHA256: "f1250486071d49567caebdc9f2078e73ff480054e4a0006f23172af98c5afe2a" }, icon: "bolt", hasFullscreen: true, hasWarning: false, isEasterEgg: false },
    { name: "infinite-matrix", file: { exec: "infinite-matrix.bat", hashSHA256: "c0f6bbefc32cd3824af6db041f577d240f48e8670cd412ec6315678363189cd6" }, icon: "terminal", hasFullscreen: false, hasWarning: false, isEasterEgg: false },
    { name: "egg", file: { exec: "w.bat", hashSHA256: "e15d002b8ae2fdafc5013912fe6425c37163b2255785435b6aadc2da2ad9db36" }, icon: "egg", hasFullscreen: false, hasWarning: false, isEasterEgg: true }
  ],
  "assetsDirectory": "assets",
  "additionalAssetFiles": [{
    exec: "screen.exe",
    hashSHA256: "2e96ddebc8847149ac54414882cac4be4d0cadef51bc1d23d132d9d4ec2b90ef"
  }],
  "websiteURL": "https://www.eliastiksofts.com",
  "updateURL": "https://www.eliastiksofts.com/faux-virus/updater.txt",
  "neutralinoUpdateURL": "https://www.eliastiksofts.com/faux-virus/update-manifest.json",
  "downloadUpdateURL": "https://www.eliastiksofts.com/faux-virus/downloads",
  "assetsDownloadURL": "https://www.eliastiksofts.com/faux-virus/downloads/assets/"
};

export default appData;
