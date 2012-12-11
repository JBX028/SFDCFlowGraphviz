/*
** flow_generator.js creates printed version from any SFDC flow using graphviz wrapper.
**
**
** @Author: Johnny Baillargeaux
** @Date: 10/07/2012
**
*/

/*
* Dependencies
*/
var fs = require('fs'),
	xml2js = require('xml2js'),
	util = require('util'),
	graphviz = require('graphviz'),
	exec = require('child_process').exec;

const __XMLNAME = process.argv[2];

/*
* Main
*/
var g = graphviz.digraph("SFDC");
var parser = new xml2js.Parser();
fs.readFile(__dirname + '/ant/retrieveMetadata/flows/' + __XMLNAME + '.flow', function(err, data) {
    parser.parseString(data, function (err, result) {
	
		if (result.Flow.label != undefined) {
			console.log("Flow " + result.Flow.label + " being generated....");
		}
	
        //Nodes creation
		if (result.Flow.assignments != undefined) {
			for(var i=0; i < result.Flow.assignments.length; i++) {
				g.addNode(result.Flow.assignments[i].name, {'label': 'Assignment = ' + result.Flow.assignments[i].label + '\\n[' + result.Flow.assignments[i].name + ']', 'shape': 'note', 'color': 'grey75', 'style': 'filled', 'fillcolor': 'palegreen'});
			}
		}
		if (result.Flow.screens != undefined) {
			for(var i=0; i < result.Flow.screens.length; i++) {
				g.addNode(result.Flow.screens[i].name, {'label': 'Screen = ' + result.Flow.screens[i].label + '\\n[' + result.Flow.screens[i].name + ']', 'shape': 'box', 'color': 'grey75', 'style': 'rounded,filled', 'fillcolor': 'lightsalmon'});
			}
		}		
		if (result.Flow.decisions != undefined) {
			for(var i=0; i < result.Flow.decisions.length; i++) {
				g.addNode(result.Flow.decisions[i].name, {'label': 'decision = ' + result.Flow.decisions[i].label + '\\n[' + result.Flow.decisions[i].name + ']', 'shape': 'diamond', 'color': 'grey75', 'style': 'filled', 'fillcolor': 'skyblue'});
			}
		}		
		if (result.Flow.recordCreates != undefined) {
			for(var i=0; i < result.Flow.recordCreates.length; i++) {
				g.addNode(result.Flow.recordCreates[i].name, {'label': 'Record Create = ' + result.Flow.recordCreates[i].label + '\\n[' + result.Flow.recordCreates[i].name + ']', 'shape': 'box', 'color': 'grey75', 'style': 'filled', 'fillcolor': 'wheat'});
			}
		}
		if (result.Flow.recordLookups != undefined) {
			for(var i=0; i < result.Flow.recordLookups.length; i++) {
				g.addNode(result.Flow.recordLookups[i].name, {'label': 'Record Lookup = ' + result.Flow.recordLookups[i].label + '\\n[' + result.Flow.recordLookups[i].name + ']', 'shape': 'box', 'color': 'grey75', 'style': 'filled', 'fillcolor': 'wheat'});
			}
		}		
		if (result.Flow.recordUpdates != undefined) {
			for(var i=0; i < result.Flow.recordUpdates.length; i++) {
				g.addNode(result.Flow.recordUpdates[i].name, {'label': 'Record Update = ' + result.Flow.recordUpdates[i].label + '\\n[' + result.Flow.recordUpdates[i].name + ']', 'shape': 'box', 'color': 'grey75', 'style': 'filled', 'fillcolor': 'wheat'});
			}
		}		
		if (result.Flow.recordDeletes != undefined) {
			for(var i=0; i < result.Flow.recordDeletes.length; i++) {
				g.addNode(result.Flow.recordDeletes[i].name, {'label': 'Record Delete = ' + result.Flow.recordDeletes[i].label + '\\n[' + result.Flow.recordDeletes[i].name + ']', 'shape': 'box', 'color': 'grey75', 'style': 'filled', 'fillcolor': 'wheat'});
			}		
		}
		if (result.Flow.apexPluginCalls != undefined) {
			for(var i=0; i < result.Flow.apexPluginCalls.length; i++) {
				g.addNode(result.Flow.apexPluginCalls[i].name, {'label': 'Apex Plugin = ' + result.Flow.apexPluginCalls[i].label + '\\n[' + result.Flow.apexPluginCalls[i].name + ']', 'shape': 'component', 'color': 'grey75', 'style': 'filled', 'fillcolor': 'azure'});
			}		
		}
		if (result.Flow.subflows != undefined) {
			for(var i=0; i < result.Flow.subflows.length; i++) {
				g.addNode(result.Flow.subflows[i].name, {'label': 'Sub Flow = ' + result.Flow.subflows[i].label + '\\n[' + result.Flow.subflows[i].name + ']', 'shape': 'doubleoctagon', 'color': 'grey75', 'style': 'filled', 'fillcolor': 'gold'});
			}		
		}		

		//Edges creation
		if (result.Flow.assignments != undefined) {
			for(var i=0; i < result.Flow.assignments.length; i++) {
				if (result.Flow.assignments[i].connector != undefined) {
					g.addEdge('"' + result.Flow.assignments[i].name + '"', '"' + result.Flow.assignments[i].connector[0].targetReference + '"');
				}
			}
		}
		if (result.Flow.screens != undefined) {
			for(var i=0; i < result.Flow.screens.length; i++) {
				if (result.Flow.screens[i].connector != undefined) {
					g.addEdge('"' + result.Flow.screens[i].name + '"', '"' + result.Flow.screens[i].connector[0].targetReference + '"');
				}
			}
		}
		if (result.Flow.decisions != undefined) {
			for(var i=0; i < result.Flow.decisions.length; i++) {
				if (result.Flow.decisions[i].rules != undefined) {
					for(var j=0; j < result.Flow.decisions[i].rules.length; j++) {
						if (result.Flow.decisions[i].rules[j].connector != undefined) {
							g.addEdge('"' + result.Flow.decisions[i].name + '"', '"' + result.Flow.decisions[i].rules[j].connector[0].targetReference + '"', {'label': result.Flow.decisions[i].rules[j].label});
						}
					}
				}
				if (result.Flow.decisions[i].defaultConnector != undefined) {
					g.addEdge('"' + result.Flow.decisions[i].name + '"', '"' + result.Flow.decisions[i].defaultConnector[0].targetReference + '"', {'label': result.Flow.decisions[i].defaultConnectorLabel});
				}				
			}
		}
		if (result.Flow.recordCreates != undefined) {
			for(var i=0; i < result.Flow.recordCreates.length; i++) {
				if (result.Flow.recordCreates[i].connector != undefined) {
					g.addEdge('"' + result.Flow.recordCreates[i].name + '"', '"' + result.Flow.recordCreates[i].connector[0].targetReference + '"');
				}
			}	
		}
		if (result.Flow.recordLookups != undefined) {
			for(var i=0; i < result.Flow.recordLookups.length; i++) {
				if (result.Flow.recordLookups[i].connector != undefined) {
					g.addEdge('"' + result.Flow.recordLookups[i].name + '"', '"' + result.Flow.recordLookups[i].connector[0].targetReference + '"');
				}
			}
		}
		if (result.Flow.recordUpdates != undefined) {
			for(var i=0; i < result.Flow.recordUpdates.length; i++) {
				if (result.Flow.recordUpdates[i].connector != undefined) {
					g.addEdge('"' + result.Flow.recordUpdates[i].name + '"', '"' + result.Flow.recordUpdates[i].connector[0].targetReference + '"');
				}
			}
		}		
		if (result.Flow.recordDeletes != undefined) {
			for(var i=0; i < result.Flow.recordDeletes.length; i++) {
				if (result.Flow.recordDeletes[i].connector != undefined) {
					g.addEdge('"' + result.Flow.recordDeletes[i].name + '"', '"' + result.Flow.recordDeletes[i].connector[0].targetReference + '"');
				}
			}
		}		
		if (result.Flow.apexPluginCalls != undefined) {
			for(var i=0; i < result.Flow.apexPluginCalls.length; i++) {
				if (result.Flow.apexPluginCalls[i].connector != undefined) {
					g.addEdge('"' + result.Flow.apexPluginCalls[i].name + '"', '"' + result.Flow.apexPluginCalls[i].connector[0].targetReference + '"');
				}
			}
		}		
		if (result.Flow.subflows != undefined) {
			for(var i=0; i < result.Flow.subflows.length; i++) {
				if (result.Flow.subflows[i].connector != undefined) {
					g.addEdge('"' + result.Flow.subflows[i].name + '"', '"' + result.Flow.subflows[i].connector[0].targetReference + '"');
				}
			}
		}			
		
		var output = g.to_dot();
		output = output.replace(/""/g, '"');
		output = output.replace('}', 'label = "\\n\\n-- ' + result.Flow.label + ' --";fontsize=40;}')
		
		fs.writeFile(__dirname + '/gv/' + __XMLNAME + '.gv', output, function(err) {
			if(err) {
				console.log(err);
			} else {
				var cmd = 'dot -Tpng ' + __dirname + '/gv/' + __XMLNAME + '.gv' + ' -o ' + __dirname + '/png/' + __XMLNAME + '.png';
				var child = exec(cmd, function (error, stdout, stderr) {
					var result = '{"stdout":' + stdout + ',"stderr":"' + stderr + '","cmd":"' + cmd + '"}';
					console.log(result + '\nThe file was saved!');
				});				
			}
		});		
	
    });
});