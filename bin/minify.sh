#!/bin/sh
find dist -name "*.js" | while read -r fname
do
  terser $fname --compress --mangle -o $fname
done
exit $?
