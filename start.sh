#!/bin/bash
xvfb-run java -jar selenium-server-standalone-3.13.0.jar >> selenium.out &
forever start index.js >> console.out &
echo "Started"
