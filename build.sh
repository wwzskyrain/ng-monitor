#!/bin/bash

ng build --prod false --base-href=/business-monitor/
cp -r dist/ng-monitor/* /Users/nali/project/business-monitor/src/main/resources/public