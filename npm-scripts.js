//进程信息
const process = require('process');
//系统信息
var os = require("os");
//字进程管理
const { execSync } = require('child_process');
const { version } = require('./package.json');

const fs = require('fs');
console.log(`process argvs "${process.argv}"`);

// os.platform() :  windows 为 win32;linux 为 linux
const isFreeBSD = os.platform() === 'freebsd';
const isWindows = os.platform() === 'win32';

/**
 * 主要获得task值
 * process.argv:D:\Program Files\nodejs\node.exe,C:\Users\Administrator\WebstormProjects\glup-study\npm-scripts.js,postinstall
 */
const task = process.argv.slice(2).join(' ');

// mediasoup mayor version. 获得大版本号
const MAYOR_VERSION = version.split('.')[0];

// make command to use. 不同系统使用不同编译工具
const MAKE = process.env.MAKE || (isFreeBSD ? 'gmake' : 'make');
console.log(`**************************************************process.env.MAKE"process.argv"`);

console.log(`npm-scripts.js [INFO] running task "${task}"`);

switch (task) {
    case 'typescript:build':
        console.log('*********************************************************typescript:build');
        break;
    case 'postinstall':
        console.log('*********************************************************postinstall');
        break;
    default:
        console.log('*********************************************************default');
}