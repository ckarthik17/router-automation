#!/bin/bash
cd /home/pi/router-automation
echo "Starting Router Automation" >> console.out
echo `date` >> console.out
/usr/bin/xvfb-run /usr/bin/java -jar selenium-server-standalone-3.13.0.jar >> selenium.out &
/usr/bin/forever start index.js >> console.out &
echo "Started" >> console.out
echo `date` >> console.out

