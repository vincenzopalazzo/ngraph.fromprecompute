/*
   ngraph.fromprecompute (c) by Vincenzo Palazzo vincenzopalazzodev@gmail.com

    ngraph.fromprecompute  is licensed under a
    Creative Commons Attribution-ShareAlike 4.0 International License.

    You should have received a copy of the license along with this
    work.  If not, see <http://creativecommons.org/licenses/by-sa/4.0/>.
 */

let merge = require('ngraph.merge');
let createGraph = require('ngraph.graph');
let fetch = require('./lib/loader');

module.exports = function convertPrecompute(settings){

     //TODO suppose the element renderer with the same proprietis
     //For moment this module support only ngraph.pixel
     let CreateRenderer = settings.CreateRenderer;
     let renderer;

    settings = merge(settings, {
        positionsPos: 'data/positions.bin',
        linksPos: 'data/links.bin',
        labelsPos: 'data/labels.json',
        stable: true
    });


    return Promise.all([
        fetch(settings.positionsPos, { responseType: 'arraybuffer' }).then(_toInt32Array),
        fetch(settings.linksPos, { responseType: 'arraybuffer' }).then(_toInt32Array),
        fetch(settings.labelsPos).then(_toJson)
      ]).then(loadLayout);
    

    function loadLayout(data){
        let positions = data[0];
        let links = data[1];
        let labels = data[2];

        let graph = _initGraphFromLinksAndLabels(links, labels);

        renderer = CreateRenderer(graph, settings.renderSettings);
        
        let layout = renderer.layout();
        labels.forEach(function (label, index) {
            var nodeCount = index * 3;
            var x = positions[nodeCount + 0];
            var y = positions[nodeCount + 1];
            var z = positions[nodeCount + 2];
        
            layout.setNodePosition(label, x, y, z);
        });
        renderer.redraw();
        let stable = settings.stable;
        renderer.stable(stable);
        return renderer;
    }

}

function _initGraphFromLinksAndLabels(links, labels) {
  let srcIndex;

  let g = createGraph({ uniqueLinkId: false });
  labels.forEach(label => g.addNode(label));
  links.forEach(function(link){
    if (link < 0) {
      srcIndex = -link - 1;
    } else {
      var toNode = link - 1;
      var fromId = labels[srcIndex];
      var toId = labels[toNode];
      g.addLink(fromId, toId);
    }
  });

  return g;
}

function _toInt32Array(oReq) {
    return new Int32Array(oReq.response);
}
  
function _toJson(oReq) {
    return JSON.parse(oReq.responseText);
  }