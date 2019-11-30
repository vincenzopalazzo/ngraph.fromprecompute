/*
   ngraph.fromprecompute (c) by Vincenzo Palazzo vincenzopalazzodev@gmail.com

    ngraph.fromprecompute  is licensed under a
    Creative Commons Attribution-ShareAlike 4.0 International License.

    You should have received a copy of the license along with this
    work.  If not, see <http://creativecommons.org/licenses/by-sa/4.0/>.
 */

//TODO: change the XMLHtppRequest to Fetch
module.exports = function request(url, requestOptions){
    
    return new Promise((resolve, reject) => {
        const oReq = new XMLHttpRequest();
        Object.assign(oReq, requestOptions);
    
        oReq.addEventListener('load', resolveBound);
        oReq.addEventListener('error', reject);
    
        const method = 'GET';
        oReq.open(method, url);
        oReq.send();
    
        function resolveBound() {
          resolve(this);
        }
      });
}