/**
   ngraph.fromprecompute (c) by Vincenzo Palazzo vincenzopalazzodev@gmail.com

    ngraph.fromprecompute  is licensed under a
    Creative Commons Attribution-ShareAlike 4.0 International License.

    You should have received a copy of the license along with this
    work.  If not, see <http://creativecommons.org/licenses/by-sa/4.0/>.
 */
'use strict';

import merge from 'ngraph.merge'
import createGraph from 'ngraph.graph'
import fetch from './lib/loader'

//Startup https://dev.to/therealdanvega/creating-your-first-npm-package-2ehf
module.exports = async function convertPrecompute(graph, layout, settings){

    settings = merge(settings, {
        positionsPos: 'data/positions.bin',
        linksPos: 'data/links.bin',
        labelsPos: 'data/labels.json',
    });

    await Promise.all([
        fetch(settings.positionsPos, { responseType: 'arraybuffer' }).then(_toInt32Array),
        fetch(settings.linksPos, { responseType: 'arraybuffer' }).then(_toInt32Array),
        fetch(settings.labelsPos).then(_atoJson)
      ]).then(loadLayout);
    
    function loadLayout(data){
        let positions = data[0];
        let links = data[1];
        let labels = data[2];

        graph = _initGraphFromLinksAndLabels(links, labels);

        labels.forEach(function (label, index) {
            var nodeCount = index * 3;
            var x = positions[nodeCount + 0];
            var y = positions[nodeCount + 1];
            var z = positions[nodeCount + 2];
        
            layout.setNodePosition(label, x, y, z);
        });
    }
}

function _initGraphFromLinksAndLabels(links, labels) {
  let srcIndex;

  let g = createGraph({ uniqueLinkId: false });
  labels.forEach(label => g.addNode(label));
  links.forEach(processLink);

  return g;

  function processLink(link) {
    if (link < 0) {
      srcIndex = -link - 1;
    } else {
      var toNode = link - 1;
      var fromId = labels[srcIndex];
      var toId = labels[toNode];
      graph.addLink(fromId, toId);
    }
  }
}

function _toInt32Array(oReq) {
    return new Int32Array(oReq.response);
}
  
function _toJson(oReq) {
    return JSON.parse(oReq.responseText);
  }