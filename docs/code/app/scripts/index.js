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
import PIXELRender from 'ngraph.pixel'

module.exports.main = function () {

    let convertPrecompute = require('../../../../');
  
    let graph = createGraph();
   /* let pixiGraphics = createPixiGraphics(graph);
    let layout = pixiGraphics.layout;*/
    //let rendererPixel = PIXELRender(graph);
    
    //convertPrecompute(graph, rendererPixel.layout());
    
    let rendererPromisse = convertPrecompute({
      CreateRenderer: PIXELRender
    });
    
    let renderer
    rendererPromisse.then(function(result){
       console.log(result);
      renderer = result;
    })

    renderer.stable(true);

    //rendererPixel.redraw();
    // begin animation loop:
    //pixiGraphics.run();
  }