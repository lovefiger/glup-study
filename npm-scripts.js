console.log(`npm-scripts.js [INFO] running task "${task}"`);

switch (task) {
    case 'typescript:build':
        console.log('*********************************************************typescript:build');
    case 'postinstall':
        console.log('*********************************************************postinstall');
    default:
        console.log('*********************************************************default');
}