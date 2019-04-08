#!/bin/bash

ng build --prod --base-href=/business-monitor/
cp -r dist/ng-monitor/* /Users/xmly/business-monitor/src/main/resources/public