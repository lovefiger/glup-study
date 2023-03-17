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
    case 'prepare':
    {
        buildTypescript(/* force */ false);

        break;
    }

    case 'typescript:build':
    {
        console.log(`**************************************************************************typescript:build`)

        break;
    }

    case 'typescript:watch':
    {
        console.log(`**************************************************************************typescript:watch`)

        break;
    }

    case 'worker:build':
    {
        console.log(`**************************************************************************worker:build`)

        break;
    }

    case 'lint:node':
    {
        console.log(`**************************************************************************lint:node`)
        break;
    }

    case 'lint:worker':
    {
        console.log(`**************************************************************************lint:worker`)

        break;
    }

    case 'format:worker':
    {
        console.log(`**************************************************************************format:worker`)

        break;
    }

    case 'test:node':
    {
        console.log(`**************************************************************************test:node`)

        break;
    }

    case 'test:worker':
    {
        console.log(`**************************************************************************test:worker`)
        break;
    }

    case 'coverage':
    {
        console.log(`**************************************************************************coverage`)
        break;
    }

    case 'postinstall':
    {
        console.log(`**************************************************************************postinstall`)

        break;
    }

    case 'release':
    {
        console.log(`**************************************************************************release`)
        break;
    }

    case 'install-clang-tools':
    {
        console.log(`**************************************************************************install-clang-tools`)

        break;
    }

    default:
    {
        console.log(`**************************************************************************default`)
    }
}

function buildTypescript(force = false)
{
    if (!force && fs.existsSync('node/lib'))
    {
        return;
    }

    console.log('npm-scripts.js [INFO] buildTypescript()');

    deleteNodeLib();

    executeCmd('tsc --project node');
}

function deleteNodeLib()
{
    if (!fs.existsSync('node/lib'))
    {
        return;
    }

    console.log('npm-scripts.js [INFO] deleteNodeLib()');

    if (!isWindows)
    {
        executeCmd('rm -rf node/lib');
    }
    else
    {
        // NOTE: This command fails in Windows if the dir doesn't exist.
        executeCmd('rmdir /s /q "node/lib"', /* exitOnError */ false);
    }
}

function executeCmd(command, exitOnError = true)
{
    console.log(`npm-scripts.js [INFO] executeCmd(): ${command}`);

    try
    {
        execSync(command, { stdio: [ 'ignore', process.stdout, process.stderr ] });
    }
    catch (error)
    {
        if (exitOnError)
        {
            console.error(`npm-scripts.js [ERROR] executeCmd() failed, exiting: ${error}`);

            process.exit(1);
        }
        else
        {
            console.log(`npm-scripts.js [INFO] executeCmd() failed, ignoring: ${error}`);
        }
    }
}