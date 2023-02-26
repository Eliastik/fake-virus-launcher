import Program from "./program";

interface AppData {
    version: string;
    date: Date;
    programs: Program[];
}

const appData: AppData = {
    "version": "2.0",
    "date": new Date(2023, 1, 26),
    programs: [
        { name: "anticlic", exec: "anticlicvirus.bat", icon: "mouse", hasFullscreen: false, hasWarning: false, isEasterEgg: false },
        { name: "infinite", exec: "infinite.bat", icon: "window", hasFullscreen: false, hasWarning: false, isEasterEgg: false },
        { name: "matrix", exec: "matrix.bat", icon: "terminal", hasFullscreen: true, hasWarning: false, isEasterEgg: false },
        { name: "reboot", exec: "reboot-pc.bat", icon: "restart_alt", hasFullscreen: false, hasWarning: true, isEasterEgg: false },
        { name: "shutdown", exec: "shutdown-pc.bat", icon: "power_settings_new", hasFullscreen: false, hasWarning: true, isEasterEgg: false },
        { name: "beep", exec: "beep.bat", icon: "volume_up", hasFullscreen: false, hasWarning: false, isEasterEgg: false },
        { name: "mega-flash", exec: "mega-flash.bat", icon: "bolt", hasFullscreen: true, hasWarning: false, isEasterEgg: false },
        { name: "bsod", exec: "bsod.hta", icon: "error_circle_rounded", hasFullscreen: false, hasWarning: false, isEasterEgg: false },
        { name: "msg", exec: "msg.vbs", icon: "warning", hasFullscreen: false, hasWarning: false, isEasterEgg: false },
        { name: "mega-flash-color", exec: "mega-flash-color.bat", icon: "bolt", hasFullscreen: true, hasWarning: false, isEasterEgg: false },
        { name: "infinite-matrix", exec: "infinite-matrix.bat", icon: "terminal", hasFullscreen: false, hasWarning: false, isEasterEgg: false },
        { name: "egg", exec: "w.bat", icon: "egg", hasFullscreen: false, hasWarning: false, isEasterEgg: true }
    ]
};

export default appData;