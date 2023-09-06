import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

// class Utils {
//     static exportRPCToAria(
//         rpcList: Array<{ name: string; url: string; pattern: string }>,
//         ariaOptions: Record<string, any>
//     ) {
//         if (!rpcList || rpcList.length === 0) return null;
//     }

//     static compactRPCList(
//         rpcList: Array<{ name: string; url: string; pattern: string }>
//     ) {}

//     static generateUid() {
//         let sourceId =
//             'Aria2e' +
//             '_' +
//             Math.round(new Date().getTime() / 1000) +
//             '_' +
//             Math.random();
//         let hashedId = Buffer.from(sourceId).toString('base64');
//         return hashedId;
//     }

//     static getReadableSpeed(speed: string): string {
//         let unit = '';
//         let spd = parseInt(speed);
//         if (spd >= 1024 * 1024) {
//             spd /= 1024 * 1024;
//             unit = ' MB/s';
//         } else if (spd >= 1024) {
//             spd /= 1024;
//             unit = ' KB/s';
//         } else if (spd >= 0) {
//             unit = ' B/s';
//             return spd + unit;
//         }
//         return spd.toFixed(2) + unit;
//     }

//     static parseUrl(url: string): { rpcUrl: string; secretKey: string } {
//         let rpcUrl = '',
//             secretKey = '';
//         try {
//             let urlObject = new URL(url);
//             rpcUrl = urlObject.origin + urlObject.pathname;
//             secretKey = decodeURIComponent(urlObject.password);
//         } catch (error) {
//             console.warn('Stored RPC Url is invalid! URL ="' + url + '"');
//         }
//         return { rpcUrl, secretKey };
//     }

//     static validateFilePath(filePath: string): boolean {
//         let regex = new RegExp('');
//         if (filePath.startsWith('/')) {
//             regex = /^\/([-\u4e00-\u9fa5\w\s.()~!@#$%^&()\[\]{}+=]+\/?)*$/;
//         } else {
//             regex =
//                 /^([a-zA-Z]:\\)([-\u4e00-\u9fa5\w\s.()~!@#$%^&()\[\]{}+=]+\\?)*$/;
//         }
//         return regex.test(filePath);
//     }

//     static validateRpcUrl(rpcUrl: string): boolean {
//         try {
//             var url = new URL(rpcUrl);
//         } catch (error) {
//             return false;
//         }
//         if (url.pathname.length < 2) return false;
//         if (!/^(http|ws)s?:$/.test(url.protocol)) return false;

//         return true;
//     }

//     static getFileName(url: string): string {
//         let uri: URL;
//         try {
//             uri = new URL(url);
//         } catch (error) {
//             return '';
//         }
//         if (uri.pathname.length < 2) return '';
//         let paths = uri.pathname.split('/');
//         return paths[paths.length - 1];
//     }
// }

// export default Utils;
