---
title: 'Automate build process with the build script'
date: '2019-11-01'
template: 'post'
draft: false
slug: 'automate-build-process-with-the-build-script'
category: 'Coding'
tags:
  - 'Automation'
  - 'Bash scripting'
description: 'The boring repetitive tasks can be fun when they are automated. Check how we automated our build process'
socialImage: ''
# published: false
# cover_image: ''
# canonical_url: 'https://marekdano.com/blog/automate-build-process-with-the-build-script/'
---

The process of building applications for production usually involves executing several steps and building angular applications is no different. The repetitive steps are in the following sequence:

1.  Get a tag and branch name from _git_
2.  Build the application for production by using **ng build --prod** command
3.  Update the configuration file of **config.json**
4.  Zip the build and release it

## Prerequisite

As I already mentioned we have the angular application. We keep the configuration settings of our application in the **config.json** file. If you want to find out more about how we use the configuration file in our app, please check [here](https://marekdano.com/blog/one-configuration-for-multiple-servers/).

To update the **config.json** file for production we decided to use the `jq` tool which had to be installed on a build machine. The instruction on how to install it, can be found [here](https://marekdano.com/blog/one-configuration-for-multiple-servers"). We build the application on OS X, so we installed it through `brew`, like

```
brew install jq
```

## Description

In the script below you can see that we followed the required steps.

1.  We read the latest git tag and current branch name from git and assigned it to variables.

2.  We build the application by executing **ng build --prod** and placed the build to the **wwwroot** folder.

3.  Updating **config.json** under _wwwroot/assets_ folder with using **jq** tool. We read the **config.json** file, find a field, assign a new value to it, redirect the output content to the newly created **temp.json** file, and finally replace the content in **config.json** within the content in **temp.json**. Something like:

```bash
jq ".field = "new_value"" config.json > temp.json && mv temp.json config.json
```

4.  We zipped the build with the updated **config.json** file and moved the zipped file to the root of the project.

And here is the full build script that we used:

```bash
#!/bin/sh
CONFIG_PATH=wwwroot/assets/config.json
CURRENT_TAG=$(git describe --tags `git rev-list --tags --max-count=1`) # the latest tag
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
ENV_TYPE=${1:-"production"}

echo ""
echo "app version \"$CURRENT_TAG\""
echo "building in branch \"$CURRENT_BRANCH\""
echo "environment type \"$ENV_TYPE\""

echo ""
echo "Start building the app..."
ng build --prod
echo "End building the app!!!"

if [ $CURRENT_BRANCH == "master" ]
then
    CURRENT_BRANCH=""
else
    CURRENT_BRANCH="-$CURRENT_BRANCH"
fi


jq ".version = \"$CURRENT_TAG$CURRENT_BRANCH\"" $CONFIG_PATH > temp.json && mv temp.json $CONFIG_PATH
jq ".ops_environment = \"$ENV_TYPE\"" $CONFIG_PATH > temp.json && mv temp.json $CONFIG_PATH
jq ".authentication = true" $CONFIG_PATH > temp.json && mv temp.json $CONFIG_PATH
jq ".authorizationHeader = """ $CONFIG_PATH > temp.json && mv temp.json $CONFIG_PATH
jq ".apiUrl = "http://10.0.0.84:60820/ws"" $CONFIG_PATH > temp.json && mv temp.json $CONFIG_PATH
jq ".tenant = """ $CONFIG_PATH > temp.json && mv temp.json $CONFIG_PATH
jq ".authenticationType = "windows"" $CONFIG_PATH > temp.json && mv temp.json $CONFIG_PATH
jq ".signalr.url = "http://10.0.0.84:60820/ws/signalr"" $CONFIG_PATH > temp.json && mv temp.json $CONFIG_PATH
jq ".signalr.hubName = "OPSHub"" $CONFIG_PATH > temp.json && mv temp.json $CONFIG_PATH


echo ""
echo "Config file has been set up !!!"
echo ""

cd wwwroot

zip -r Apps-$CURRENT_TAG.zip .
# move file to the root of this project
mv Apps-rc-$CURRENT_TAG.zip ../

echo "Release folder zipped."
echo ""

```

## Executing script

The build is saved as **release_script.sh** and is placed under the root of our project. Before executing the script we added the permission to the file by running following command in the folder where our script exists:

```
chmod 755 release_script.sh
```

The file permission can be different in your case.

Executing the file, navigate to the folder where script file exists and execute the script

```
./release_script.sh
```

If everything is set up correctly in the script, the zip file with build and the updated **config.json** file will be created under the root of the project.

## Conclusion

Hopefully sharing this can encourage others to think and move from repetitive tasks to fully automated ones.
