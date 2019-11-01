/**
   ngraph.fromprecompute (c) by Vincenzo Palazzo vincenzopalazzodev@gmail.com

    ngraph.fromprecompute  is licensed under a
    Creative Commons Attribution-ShareAlike 4.0 International License.

    You should have received a copy of the license along with this
    work.  If not, see <http://creativecommons.org/licenses/by-sa/4.0/>.
 */
'use strict';

import "regenerator-runtime/runtime";
import createPixiGraphics from 'ngraph.pixi'
import createGraph from 'ngraph.graph'

module.exports.main = function () {

    let convertPrecompute = require('../../../');
  
    let graph = createGraph();
    let pixiGraphics = createPixiGraphics(graph);
    let layout = pixiGraphics.layout;
    
    convertPrecompute(graph, layout);
    
    // begin animation loop:
    pixiGraphics.run();
  }