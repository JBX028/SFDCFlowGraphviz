SFDC Flow GraphViz Wrapper
==========================


INTRODUCTION
------------

There is no standard functionnality to print flows created in salesforce. You can use this node.js script to export your flows created in SFDC as a graphviz diagram ready to be printed.

This script reads the metadata XML downloaded locally via ANT, and creates the necessary DOT file, automatically converted as a PNG file.

PREREQUISITES
-------------

- Install [node.js](http://nodejs.org/)
 - Install [node-graphviz](https://github.com/glejeune/node-graphviz/blob/master/README.rdoc)
 - Install [node-xml2js](https://github.com/Leonidas-from-XIV/node-xml2js)
- Install [Graphviz](http://www.graphviz.org/)
- Install [ANT for SFDC](http://www.salesforce.com/us/developer/docs/apexcode/Content/apex_deploying_ant.htm)
- Git or Download and unzip all the files in attachment

CONFIGURATION
-------------

Configure file `/ant/build.properties` with your SFDC credential.
 
USAGE
-----

1. Download metadata XML (you can ignore the first prompt command if you are not connected behind a proxy server):

 ```bash
 $ set ANT_OPTS=-Dhttp.proxyHost=<YOUR PROXY SERVER> -Dhttp.proxyPort=<YOUR PROXY PORT>
 $ cd ant
 $ ant retrieve
 ```

2. Generate the picture (without .xml at the end):
 
 ```bash
 $ node flow_generator.js <NAME OF THE XML FLOW>
 ```

3. open the corresponding png file generated under `/png`
