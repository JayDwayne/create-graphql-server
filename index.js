#!/usr/bin/env node
const inquirer = require('inquirer');
const fs = require('fs');
const chalk = require('chalk');
const path = require('path');
const fsExtra = require('fs-extra');

const QUESTIONS = [{
    name:'project-name',
    type: 'input',
    message:'Project name:',
    validate: function (input) {
        if (/^([A-Za-z\-\_\d])+$/.test(input)) return true;
        else return 'Project name only include letters, numbers and underscores..';
    }
}]

const ROOT_TEMPLATE_FOLDER = path.join(process.mainModule.path,'/templates');

const setUpProject = (destination) => {
    return fsExtra.copy(ROOT_TEMPLATE_FOLDER,destination);
}


inquirer.prompt(QUESTIONS)
    .then(answers => {
        const projectName = path.join(__dirname,answers['project-name']);

        if (!fs.existsSync(projectName)){
            console.log(chalk.greenBright("creating project ..."));
            fs.mkdir(projectName,(err) => {
                if(err){
                    console.log(chalk.redBright(err.message));
                    process.exit(0);
                }

                console.log(chalk.bgGreenBright(`${projectName} created`))

                setUpProject(projectName)
                    .then(() => {
                        console.log(chalk.greenBright("Finished initializing the project"));
                    })
                    .catch(error => {
                        console.log(chalk.redBright(error.message));
                        process.exit(0);
                    })
            })
        }else{
            console.log(chalk.red(`${projectName} already exists`));
            process.exit(0);
        }

    })
    .catch(console.log);