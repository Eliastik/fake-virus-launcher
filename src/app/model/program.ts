export interface FileProgram {
  exec: string;
  hashSHA256: string;
}

export interface Program {
    name: string;
    file: FileProgram;
    icon: string;
    hasWarning: boolean;
    hasFullscreen: boolean;
    isEasterEgg: boolean;
}
