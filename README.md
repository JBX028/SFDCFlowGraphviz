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

COPYRIGHT AND LICENSE
---------------------

Copyright � 2013 Baillargeaux Johnny <jbx028@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the �Software�), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED �AS IS�, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
