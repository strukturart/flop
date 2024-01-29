(function () {

      var $parcel$global =
        typeof globalThis !== 'undefined'
          ? globalThis
          : typeof self !== 'undefined'
          ? self
          : typeof window !== 'undefined'
          ? window
          : typeof global !== 'undefined'
          ? global
          : {};
  
function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}

var $parcel$modules = {};
var $parcel$inits = {};

var parcelRequire = $parcel$global["parcelRequire1dff"];

if (parcelRequire == null) {
  parcelRequire = function(id) {
    if (id in $parcel$modules) {
      return $parcel$modules[id].exports;
    }
    if (id in $parcel$inits) {
      var init = $parcel$inits[id];
      delete $parcel$inits[id];
      var module = {id: id, exports: {}};
      $parcel$modules[id] = module;
      init.call(module.exports, module, module.exports);
      return module.exports;
    }
    var err = new Error("Cannot find module '" + id + "'");
    err.code = 'MODULE_NOT_FOUND';
    throw err;
  };

  parcelRequire.register = function register(id, init) {
    $parcel$inits[id] = init;
  };

  $parcel$global["parcelRequire1dff"] = parcelRequire;
}

var parcelRegister = parcelRequire.register;
parcelRegister("ahPL4", function(module, exports) {
"use strict";
function $77d3a4009e38b328$var$Vnode(tag, key, attrs, children, text, dom) {
    return {
        tag: tag,
        key: key,
        attrs: attrs,
        children: children,
        text: text,
        dom: dom,
        domSize: undefined,
        state: undefined,
        events: undefined,
        instance: undefined
    };
}
$77d3a4009e38b328$var$Vnode.normalize = function(node) {
    if (Array.isArray(node)) return $77d3a4009e38b328$var$Vnode("[", undefined, undefined, $77d3a4009e38b328$var$Vnode.normalizeChildren(node), undefined, undefined);
    if (node == null || typeof node === "boolean") return null;
    if (typeof node === "object") return node;
    return $77d3a4009e38b328$var$Vnode("#", undefined, undefined, String(node), undefined, undefined);
};
$77d3a4009e38b328$var$Vnode.normalizeChildren = function(input) {
    var children = [];
    if (input.length) {
        var isKeyed = input[0] != null && input[0].key != null;
        // Note: this is a *very* perf-sensitive check.
        // Fun fact: merging the loop like this is somehow faster than splitting
        // it, noticeably so.
        for(var i = 1; i < input.length; i++){
            if ((input[i] != null && input[i].key != null) !== isKeyed) throw new TypeError(isKeyed && (input[i] != null || typeof input[i] === "boolean") ? "In fragments, vnodes must either all have keys or none have keys. You may wish to consider using an explicit keyed empty fragment, m.fragment({key: ...}), instead of a hole." : "In fragments, vnodes must either all have keys or none have keys.");
        }
        for(var i = 0; i < input.length; i++)children[i] = $77d3a4009e38b328$var$Vnode.normalize(input[i]);
    }
    return children;
};
module.exports = $77d3a4009e38b328$var$Vnode;

});

parcelRegister("hc09f", function(module, exports) {
"use strict";

var $ahPL4 = parcelRequire("ahPL4");
module.exports = function(html) {
    if (html == null) html = "";
    return $ahPL4("<", undefined, undefined, html, undefined, undefined);
};

});

parcelRegister("uUr9B", function(module, exports) {
"use strict";

var $ahPL4 = parcelRequire("ahPL4");

var $lNZGj = parcelRequire("lNZGj");
module.exports = function() {
    var vnode = $lNZGj.apply(0, arguments);
    vnode.tag = "[";
    vnode.children = $ahPL4.normalizeChildren(vnode.children);
    return vnode;
};

});
parcelRegister("lNZGj", function(module, exports) {
"use strict";

var $ahPL4 = parcelRequire("ahPL4");
// Call via `hyperscriptVnode.apply(startOffset, arguments)`
//
// The reason I do it this way, forwarding the arguments and passing the start
// offset in `this`, is so I don't have to create a temporary array in a
// performance-critical path.
//
// In native ES6, I'd instead add a final `...args` parameter to the
// `hyperscript` and `fragment` factories and define this as
// `hyperscriptVnode(...args)`, since modern engines do optimize that away. But
// ES5 (what Mithril.js requires thanks to IE support) doesn't give me that luxury,
// and engines aren't nearly intelligent enough to do either of these:
//
// 1. Elide the allocation for `[].slice.call(arguments, 1)` when it's passed to
//    another function only to be indexed.
// 2. Elide an `arguments` allocation when it's passed to any function other
//    than `Function.prototype.apply` or `Reflect.apply`.
//
// In ES6, it'd probably look closer to this (I'd need to profile it, though):
// module.exports = function(attrs, ...children) {
//     if (attrs == null || typeof attrs === "object" && attrs.tag == null && !Array.isArray(attrs)) {
//         if (children.length === 1 && Array.isArray(children[0])) children = children[0]
//     } else {
//         children = children.length === 0 && Array.isArray(attrs) ? attrs : [attrs, ...children]
//         attrs = undefined
//     }
//
//     if (attrs == null) attrs = {}
//     return Vnode("", attrs.key, attrs, children)
// }
module.exports = function() {
    var attrs = arguments[this], start = this + 1, children;
    if (attrs == null) attrs = {};
    else if (typeof attrs !== "object" || attrs.tag != null || Array.isArray(attrs)) {
        attrs = {};
        start = this;
    }
    if (arguments.length === start + 1) {
        children = arguments[start];
        if (!Array.isArray(children)) children = [
            children
        ];
    } else {
        children = [];
        while(start < arguments.length)children.push(arguments[start++]);
    }
    return $ahPL4("", attrs.key, attrs, children);
};

});


parcelRegister("4kqT7", function(module, exports) {
"use strict";
/** @constructor */ var $326de31341d20e95$var$PromisePolyfill = function PromisePolyfill1(executor) {
    if (!(this instanceof $326de31341d20e95$var$PromisePolyfill)) throw new Error("Promise must be called with 'new'.");
    if (typeof executor !== "function") throw new TypeError("executor must be a function.");
    var self = this, resolvers = [], rejectors = [], resolveCurrent = handler(resolvers, true), rejectCurrent = handler(rejectors, false);
    var instance = self._instance = {
        resolvers: resolvers,
        rejectors: rejectors
    };
    var callAsync = typeof setImmediate === "function" ? setImmediate : setTimeout;
    function handler(list, shouldAbsorb) {
        return function execute(value) {
            var then;
            try {
                if (shouldAbsorb && value != null && (typeof value === "object" || typeof value === "function") && typeof (then = value.then) === "function") {
                    if (value === self) throw new TypeError("Promise can't be resolved with itself.");
                    executeOnce(then.bind(value));
                } else callAsync(function() {
                    if (!shouldAbsorb && list.length === 0) console.error("Possible unhandled promise rejection:", value);
                    for(var i = 0; i < list.length; i++)list[i](value);
                    resolvers.length = 0, rejectors.length = 0;
                    instance.state = shouldAbsorb;
                    instance.retry = function() {
                        execute(value);
                    };
                });
            } catch (e) {
                rejectCurrent(e);
            }
        };
    }
    function executeOnce(then) {
        var runs = 0;
        function run(fn) {
            return function(value) {
                if (runs++ > 0) return;
                fn(value);
            };
        }
        var onerror = run(rejectCurrent);
        try {
            then(run(resolveCurrent), onerror);
        } catch (e) {
            onerror(e);
        }
    }
    executeOnce(executor);
};
$326de31341d20e95$var$PromisePolyfill.prototype.then = function(onFulfilled, onRejection) {
    var self = this, instance = self._instance;
    function handle(callback, list, next, state) {
        list.push(function(value) {
            if (typeof callback !== "function") next(value);
            else try {
                resolveNext(callback(value));
            } catch (e) {
                if (rejectNext) rejectNext(e);
            }
        });
        if (typeof instance.retry === "function" && state === instance.state) instance.retry();
    }
    var resolveNext, rejectNext;
    var promise = new $326de31341d20e95$var$PromisePolyfill(function(resolve, reject) {
        resolveNext = resolve, rejectNext = reject;
    });
    handle(onFulfilled, instance.resolvers, resolveNext, true), handle(onRejection, instance.rejectors, rejectNext, false);
    return promise;
};
$326de31341d20e95$var$PromisePolyfill.prototype.catch = function(onRejection) {
    return this.then(null, onRejection);
};
$326de31341d20e95$var$PromisePolyfill.prototype.finally = function(callback) {
    return this.then(function(value) {
        return $326de31341d20e95$var$PromisePolyfill.resolve(callback()).then(function() {
            return value;
        });
    }, function(reason) {
        return $326de31341d20e95$var$PromisePolyfill.resolve(callback()).then(function() {
            return $326de31341d20e95$var$PromisePolyfill.reject(reason);
        });
    });
};
$326de31341d20e95$var$PromisePolyfill.resolve = function(value) {
    if (value instanceof $326de31341d20e95$var$PromisePolyfill) return value;
    return new $326de31341d20e95$var$PromisePolyfill(function(resolve) {
        resolve(value);
    });
};
$326de31341d20e95$var$PromisePolyfill.reject = function(value) {
    return new $326de31341d20e95$var$PromisePolyfill(function(resolve, reject) {
        reject(value);
    });
};
$326de31341d20e95$var$PromisePolyfill.all = function(list) {
    return new $326de31341d20e95$var$PromisePolyfill(function(resolve, reject) {
        var total = list.length, count = 0, values = [];
        if (list.length === 0) resolve([]);
        else for(var i = 0; i < list.length; i++)(function(i) {
            function consume(value) {
                count++;
                values[i] = value;
                if (count === total) resolve(values);
            }
            if (list[i] != null && (typeof list[i] === "object" || typeof list[i] === "function") && typeof list[i].then === "function") list[i].then(consume, reject);
            else consume(list[i]);
        })(i);
    });
};
$326de31341d20e95$var$PromisePolyfill.race = function(list) {
    return new $326de31341d20e95$var$PromisePolyfill(function(resolve, reject) {
        for(var i = 0; i < list.length; i++)list[i].then(resolve, reject);
    });
};
module.exports = $326de31341d20e95$var$PromisePolyfill;

});

parcelRegister("iHb4t", function(module, exports) {
"use strict";

module.exports = (parcelRequire("lNBAB"))(typeof window !== "undefined" ? window : null);

});
parcelRegister("lNBAB", function(module, exports) {
"use strict";

var $ahPL4 = parcelRequire("ahPL4");
module.exports = function($window) {
    var $doc = $window && $window.document;
    var currentRedraw;
    var nameSpace = {
        svg: "http://www.w3.org/2000/svg",
        math: "http://www.w3.org/1998/Math/MathML"
    };
    function getNameSpace(vnode) {
        return vnode.attrs && vnode.attrs.xmlns || nameSpace[vnode.tag];
    }
    //sanity check to discourage people from doing `vnode.state = ...`
    function checkState(vnode, original) {
        if (vnode.state !== original) throw new Error("'vnode.state' must not be modified.");
    }
    //Note: the hook is passed as the `this` argument to allow proxying the
    //arguments without requiring a full array allocation to do so. It also
    //takes advantage of the fact the current `vnode` is the first argument in
    //all lifecycle methods.
    function callHook(vnode) {
        var original = vnode.state;
        try {
            return this.apply(original, arguments);
        } finally{
            checkState(vnode, original);
        }
    }
    // IE11 (at least) throws an UnspecifiedError when accessing document.activeElement when
    // inside an iframe. Catch and swallow this error, and heavy-handidly return null.
    function activeElement() {
        try {
            return $doc.activeElement;
        } catch (e) {
            return null;
        }
    }
    //create
    function createNodes(parent, vnodes, start, end, hooks, nextSibling, ns) {
        for(var i = start; i < end; i++){
            var vnode = vnodes[i];
            if (vnode != null) createNode(parent, vnode, hooks, ns, nextSibling);
        }
    }
    function createNode(parent, vnode, hooks, ns, nextSibling) {
        var tag = vnode.tag;
        if (typeof tag === "string") {
            vnode.state = {};
            if (vnode.attrs != null) initLifecycle(vnode.attrs, vnode, hooks);
            switch(tag){
                case "#":
                    createText(parent, vnode, nextSibling);
                    break;
                case "<":
                    createHTML(parent, vnode, ns, nextSibling);
                    break;
                case "[":
                    createFragment(parent, vnode, hooks, ns, nextSibling);
                    break;
                default:
                    createElement(parent, vnode, hooks, ns, nextSibling);
            }
        } else createComponent(parent, vnode, hooks, ns, nextSibling);
    }
    function createText(parent, vnode, nextSibling) {
        vnode.dom = $doc.createTextNode(vnode.children);
        insertNode(parent, vnode.dom, nextSibling);
    }
    var possibleParents = {
        caption: "table",
        thead: "table",
        tbody: "table",
        tfoot: "table",
        tr: "tbody",
        th: "tr",
        td: "tr",
        colgroup: "table",
        col: "colgroup"
    };
    function createHTML(parent, vnode, ns, nextSibling) {
        var match = vnode.children.match(/^\s*?<(\w+)/im) || [];
        // not using the proper parent makes the child element(s) vanish.
        //     var div = document.createElement("div")
        //     div.innerHTML = "<td>i</td><td>j</td>"
        //     console.log(div.innerHTML)
        // --> "ij", no <td> in sight.
        var temp = $doc.createElement(possibleParents[match[1]] || "div");
        if (ns === "http://www.w3.org/2000/svg") {
            temp.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg">' + vnode.children + "</svg>";
            temp = temp.firstChild;
        } else temp.innerHTML = vnode.children;
        vnode.dom = temp.firstChild;
        vnode.domSize = temp.childNodes.length;
        // Capture nodes to remove, so we don't confuse them.
        vnode.instance = [];
        var fragment = $doc.createDocumentFragment();
        var child;
        while(child = temp.firstChild){
            vnode.instance.push(child);
            fragment.appendChild(child);
        }
        insertNode(parent, fragment, nextSibling);
    }
    function createFragment(parent, vnode, hooks, ns, nextSibling) {
        var fragment = $doc.createDocumentFragment();
        if (vnode.children != null) {
            var children = vnode.children;
            createNodes(fragment, children, 0, children.length, hooks, null, ns);
        }
        vnode.dom = fragment.firstChild;
        vnode.domSize = fragment.childNodes.length;
        insertNode(parent, fragment, nextSibling);
    }
    function createElement(parent, vnode, hooks, ns, nextSibling) {
        var tag = vnode.tag;
        var attrs = vnode.attrs;
        var is = attrs && attrs.is;
        ns = getNameSpace(vnode) || ns;
        var element = ns ? is ? $doc.createElementNS(ns, tag, {
            is: is
        }) : $doc.createElementNS(ns, tag) : is ? $doc.createElement(tag, {
            is: is
        }) : $doc.createElement(tag);
        vnode.dom = element;
        if (attrs != null) setAttrs(vnode, attrs, ns);
        insertNode(parent, element, nextSibling);
        if (!maybeSetContentEditable(vnode)) {
            if (vnode.children != null) {
                var children = vnode.children;
                createNodes(element, children, 0, children.length, hooks, null, ns);
                if (vnode.tag === "select" && attrs != null) setLateSelectAttrs(vnode, attrs);
            }
        }
    }
    function initComponent(vnode, hooks) {
        var sentinel;
        if (typeof vnode.tag.view === "function") {
            vnode.state = Object.create(vnode.tag);
            sentinel = vnode.state.view;
            if (sentinel.$$reentrantLock$$ != null) return;
            sentinel.$$reentrantLock$$ = true;
        } else {
            vnode.state = void 0;
            sentinel = vnode.tag;
            if (sentinel.$$reentrantLock$$ != null) return;
            sentinel.$$reentrantLock$$ = true;
            vnode.state = vnode.tag.prototype != null && typeof vnode.tag.prototype.view === "function" ? new vnode.tag(vnode) : vnode.tag(vnode);
        }
        initLifecycle(vnode.state, vnode, hooks);
        if (vnode.attrs != null) initLifecycle(vnode.attrs, vnode, hooks);
        vnode.instance = $ahPL4.normalize(callHook.call(vnode.state.view, vnode));
        if (vnode.instance === vnode) throw Error("A view cannot return the vnode it received as argument");
        sentinel.$$reentrantLock$$ = null;
    }
    function createComponent(parent, vnode, hooks, ns, nextSibling) {
        initComponent(vnode, hooks);
        if (vnode.instance != null) {
            createNode(parent, vnode.instance, hooks, ns, nextSibling);
            vnode.dom = vnode.instance.dom;
            vnode.domSize = vnode.dom != null ? vnode.instance.domSize : 0;
        } else vnode.domSize = 0;
    }
    //update
    /**
	 * @param {Element|Fragment} parent - the parent element
	 * @param {Vnode[] | null} old - the list of vnodes of the last `render()` call for
	 *                               this part of the tree
	 * @param {Vnode[] | null} vnodes - as above, but for the current `render()` call.
	 * @param {Function[]} hooks - an accumulator of post-render hooks (oncreate/onupdate)
	 * @param {Element | null} nextSibling - the next DOM node if we're dealing with a
	 *                                       fragment that is not the last item in its
	 *                                       parent
	 * @param {'svg' | 'math' | String | null} ns) - the current XML namespace, if any
	 * @returns void
	 */ // This function diffs and patches lists of vnodes, both keyed and unkeyed.
    //
    // We will:
    //
    // 1. describe its general structure
    // 2. focus on the diff algorithm optimizations
    // 3. discuss DOM node operations.
    // ## Overview:
    //
    // The updateNodes() function:
    // - deals with trivial cases
    // - determines whether the lists are keyed or unkeyed based on the first non-null node
    //   of each list.
    // - diffs them and patches the DOM if needed (that's the brunt of the code)
    // - manages the leftovers: after diffing, are there:
    //   - old nodes left to remove?
    // 	 - new nodes to insert?
    // 	 deal with them!
    //
    // The lists are only iterated over once, with an exception for the nodes in `old` that
    // are visited in the fourth part of the diff and in the `removeNodes` loop.
    // ## Diffing
    //
    // Reading https://github.com/localvoid/ivi/blob/ddc09d06abaef45248e6133f7040d00d3c6be853/packages/ivi/src/vdom/implementation.ts#L617-L837
    // may be good for context on longest increasing subsequence-based logic for moving nodes.
    //
    // In order to diff keyed lists, one has to
    //
    // 1) match nodes in both lists, per key, and update them accordingly
    // 2) create the nodes present in the new list, but absent in the old one
    // 3) remove the nodes present in the old list, but absent in the new one
    // 4) figure out what nodes in 1) to move in order to minimize the DOM operations.
    //
    // To achieve 1) one can create a dictionary of keys => index (for the old list), then iterate
    // over the new list and for each new vnode, find the corresponding vnode in the old list using
    // the map.
    // 2) is achieved in the same step: if a new node has no corresponding entry in the map, it is new
    // and must be created.
    // For the removals, we actually remove the nodes that have been updated from the old list.
    // The nodes that remain in that list after 1) and 2) have been performed can be safely removed.
    // The fourth step is a bit more complex and relies on the longest increasing subsequence (LIS)
    // algorithm.
    //
    // the longest increasing subsequence is the list of nodes that can remain in place. Imagine going
    // from `1,2,3,4,5` to `4,5,1,2,3` where the numbers are not necessarily the keys, but the indices
    // corresponding to the keyed nodes in the old list (keyed nodes `e,d,c,b,a` => `b,a,e,d,c` would
    //  match the above lists, for example).
    //
    // In there are two increasing subsequences: `4,5` and `1,2,3`, the latter being the longest. We
    // can update those nodes without moving them, and only call `insertNode` on `4` and `5`.
    //
    // @localvoid adapted the algo to also support node deletions and insertions (the `lis` is actually
    // the longest increasing subsequence *of old nodes still present in the new list*).
    //
    // It is a general algorithm that is fireproof in all circumstances, but it requires the allocation
    // and the construction of a `key => oldIndex` map, and three arrays (one with `newIndex => oldIndex`,
    // the `LIS` and a temporary one to create the LIS).
    //
    // So we cheat where we can: if the tails of the lists are identical, they are guaranteed to be part of
    // the LIS and can be updated without moving them.
    //
    // If two nodes are swapped, they are guaranteed not to be part of the LIS, and must be moved (with
    // the exception of the last node if the list is fully reversed).
    //
    // ## Finding the next sibling.
    //
    // `updateNode()` and `createNode()` expect a nextSibling parameter to perform DOM operations.
    // When the list is being traversed top-down, at any index, the DOM nodes up to the previous
    // vnode reflect the content of the new list, whereas the rest of the DOM nodes reflect the old
    // list. The next sibling must be looked for in the old list using `getNextSibling(... oldStart + 1 ...)`.
    //
    // In the other scenarios (swaps, upwards traversal, map-based diff),
    // the new vnodes list is traversed upwards. The DOM nodes at the bottom of the list reflect the
    // bottom part of the new vnodes list, and we can use the `v.dom`  value of the previous node
    // as the next sibling (cached in the `nextSibling` variable).
    // ## DOM node moves
    //
    // In most scenarios `updateNode()` and `createNode()` perform the DOM operations. However,
    // this is not the case if the node moved (second and fourth part of the diff algo). We move
    // the old DOM nodes before updateNode runs because it enables us to use the cached `nextSibling`
    // variable rather than fetching it using `getNextSibling()`.
    //
    // The fourth part of the diff currently inserts nodes unconditionally, leading to issues
    // like #1791 and #1999. We need to be smarter about those situations where adjascent old
    // nodes remain together in the new list in a way that isn't covered by parts one and
    // three of the diff algo.
    function updateNodes(parent, old, vnodes, hooks, nextSibling, ns) {
        if (old === vnodes || old == null && vnodes == null) return;
        else if (old == null || old.length === 0) createNodes(parent, vnodes, 0, vnodes.length, hooks, nextSibling, ns);
        else if (vnodes == null || vnodes.length === 0) removeNodes(parent, old, 0, old.length);
        else {
            var isOldKeyed = old[0] != null && old[0].key != null;
            var isKeyed = vnodes[0] != null && vnodes[0].key != null;
            var start = 0, oldStart = 0;
            if (!isOldKeyed) while(oldStart < old.length && old[oldStart] == null)oldStart++;
            if (!isKeyed) while(start < vnodes.length && vnodes[start] == null)start++;
            if (isOldKeyed !== isKeyed) {
                removeNodes(parent, old, oldStart, old.length);
                createNodes(parent, vnodes, start, vnodes.length, hooks, nextSibling, ns);
            } else if (!isKeyed) {
                // Don't index past the end of either list (causes deopts).
                var commonLength = old.length < vnodes.length ? old.length : vnodes.length;
                // Rewind if necessary to the first non-null index on either side.
                // We could alternatively either explicitly create or remove nodes when `start !== oldStart`
                // but that would be optimizing for sparse lists which are more rare than dense ones.
                start = start < oldStart ? start : oldStart;
                for(; start < commonLength; start++){
                    o = old[start];
                    v = vnodes[start];
                    if (o === v || o == null && v == null) continue;
                    else if (o == null) createNode(parent, v, hooks, ns, getNextSibling(old, start + 1, nextSibling));
                    else if (v == null) removeNode(parent, o);
                    else updateNode(parent, o, v, hooks, getNextSibling(old, start + 1, nextSibling), ns);
                }
                if (old.length > commonLength) removeNodes(parent, old, start, old.length);
                if (vnodes.length > commonLength) createNodes(parent, vnodes, start, vnodes.length, hooks, nextSibling, ns);
            } else {
                // keyed diff
                var oldEnd = old.length - 1, end = vnodes.length - 1, map, o, v, oe, ve, topSibling;
                // bottom-up
                while(oldEnd >= oldStart && end >= start){
                    oe = old[oldEnd];
                    ve = vnodes[end];
                    if (oe.key !== ve.key) break;
                    if (oe !== ve) updateNode(parent, oe, ve, hooks, nextSibling, ns);
                    if (ve.dom != null) nextSibling = ve.dom;
                    oldEnd--, end--;
                }
                // top-down
                while(oldEnd >= oldStart && end >= start){
                    o = old[oldStart];
                    v = vnodes[start];
                    if (o.key !== v.key) break;
                    oldStart++, start++;
                    if (o !== v) updateNode(parent, o, v, hooks, getNextSibling(old, oldStart, nextSibling), ns);
                }
                // swaps and list reversals
                while(oldEnd >= oldStart && end >= start){
                    if (start === end) break;
                    if (o.key !== ve.key || oe.key !== v.key) break;
                    topSibling = getNextSibling(old, oldStart, nextSibling);
                    moveNodes(parent, oe, topSibling);
                    if (oe !== v) updateNode(parent, oe, v, hooks, topSibling, ns);
                    if (++start <= --end) moveNodes(parent, o, nextSibling);
                    if (o !== ve) updateNode(parent, o, ve, hooks, nextSibling, ns);
                    if (ve.dom != null) nextSibling = ve.dom;
                    oldStart++;
                    oldEnd--;
                    oe = old[oldEnd];
                    ve = vnodes[end];
                    o = old[oldStart];
                    v = vnodes[start];
                }
                // bottom up once again
                while(oldEnd >= oldStart && end >= start){
                    if (oe.key !== ve.key) break;
                    if (oe !== ve) updateNode(parent, oe, ve, hooks, nextSibling, ns);
                    if (ve.dom != null) nextSibling = ve.dom;
                    oldEnd--, end--;
                    oe = old[oldEnd];
                    ve = vnodes[end];
                }
                if (start > end) removeNodes(parent, old, oldStart, oldEnd + 1);
                else if (oldStart > oldEnd) createNodes(parent, vnodes, start, end + 1, hooks, nextSibling, ns);
                else {
                    // inspired by ivi https://github.com/ivijs/ivi/ by Boris Kaul
                    var originalNextSibling = nextSibling, vnodesLength = end - start + 1, oldIndices = new Array(vnodesLength), li = 0, i = 0, pos = 2147483647, matched = 0, map, lisIndices;
                    for(i = 0; i < vnodesLength; i++)oldIndices[i] = -1;
                    for(i = end; i >= start; i--){
                        if (map == null) map = getKeyMap(old, oldStart, oldEnd + 1);
                        ve = vnodes[i];
                        var oldIndex = map[ve.key];
                        if (oldIndex != null) {
                            pos = oldIndex < pos ? oldIndex : -1 // becomes -1 if nodes were re-ordered
                            ;
                            oldIndices[i - start] = oldIndex;
                            oe = old[oldIndex];
                            old[oldIndex] = null;
                            if (oe !== ve) updateNode(parent, oe, ve, hooks, nextSibling, ns);
                            if (ve.dom != null) nextSibling = ve.dom;
                            matched++;
                        }
                    }
                    nextSibling = originalNextSibling;
                    if (matched !== oldEnd - oldStart + 1) removeNodes(parent, old, oldStart, oldEnd + 1);
                    if (matched === 0) createNodes(parent, vnodes, start, end + 1, hooks, nextSibling, ns);
                    else {
                        if (pos === -1) {
                            // the indices of the indices of the items that are part of the
                            // longest increasing subsequence in the oldIndices list
                            lisIndices = makeLisIndices(oldIndices);
                            li = lisIndices.length - 1;
                            for(i = end; i >= start; i--){
                                v = vnodes[i];
                                if (oldIndices[i - start] === -1) createNode(parent, v, hooks, ns, nextSibling);
                                else if (lisIndices[li] === i - start) li--;
                                else moveNodes(parent, v, nextSibling);
                                if (v.dom != null) nextSibling = vnodes[i].dom;
                            }
                        } else for(i = end; i >= start; i--){
                            v = vnodes[i];
                            if (oldIndices[i - start] === -1) createNode(parent, v, hooks, ns, nextSibling);
                            if (v.dom != null) nextSibling = vnodes[i].dom;
                        }
                    }
                }
            }
        }
    }
    function updateNode(parent, old, vnode, hooks, nextSibling, ns) {
        var oldTag = old.tag, tag = vnode.tag;
        if (oldTag === tag) {
            vnode.state = old.state;
            vnode.events = old.events;
            if (shouldNotUpdate(vnode, old)) return;
            if (typeof oldTag === "string") {
                if (vnode.attrs != null) updateLifecycle(vnode.attrs, vnode, hooks);
                switch(oldTag){
                    case "#":
                        updateText(old, vnode);
                        break;
                    case "<":
                        updateHTML(parent, old, vnode, ns, nextSibling);
                        break;
                    case "[":
                        updateFragment(parent, old, vnode, hooks, nextSibling, ns);
                        break;
                    default:
                        updateElement(old, vnode, hooks, ns);
                }
            } else updateComponent(parent, old, vnode, hooks, nextSibling, ns);
        } else {
            removeNode(parent, old);
            createNode(parent, vnode, hooks, ns, nextSibling);
        }
    }
    function updateText(old, vnode) {
        if (old.children.toString() !== vnode.children.toString()) old.dom.nodeValue = vnode.children;
        vnode.dom = old.dom;
    }
    function updateHTML(parent, old, vnode, ns, nextSibling) {
        if (old.children !== vnode.children) {
            removeHTML(parent, old);
            createHTML(parent, vnode, ns, nextSibling);
        } else {
            vnode.dom = old.dom;
            vnode.domSize = old.domSize;
            vnode.instance = old.instance;
        }
    }
    function updateFragment(parent, old, vnode, hooks, nextSibling, ns) {
        updateNodes(parent, old.children, vnode.children, hooks, nextSibling, ns);
        var domSize = 0, children = vnode.children;
        vnode.dom = null;
        if (children != null) {
            for(var i = 0; i < children.length; i++){
                var child = children[i];
                if (child != null && child.dom != null) {
                    if (vnode.dom == null) vnode.dom = child.dom;
                    domSize += child.domSize || 1;
                }
            }
            if (domSize !== 1) vnode.domSize = domSize;
        }
    }
    function updateElement(old, vnode, hooks, ns) {
        var element = vnode.dom = old.dom;
        ns = getNameSpace(vnode) || ns;
        if (vnode.tag === "textarea") {
            if (vnode.attrs == null) vnode.attrs = {};
        }
        updateAttrs(vnode, old.attrs, vnode.attrs, ns);
        if (!maybeSetContentEditable(vnode)) updateNodes(element, old.children, vnode.children, hooks, null, ns);
    }
    function updateComponent(parent, old, vnode, hooks, nextSibling, ns) {
        vnode.instance = $ahPL4.normalize(callHook.call(vnode.state.view, vnode));
        if (vnode.instance === vnode) throw Error("A view cannot return the vnode it received as argument");
        updateLifecycle(vnode.state, vnode, hooks);
        if (vnode.attrs != null) updateLifecycle(vnode.attrs, vnode, hooks);
        if (vnode.instance != null) {
            if (old.instance == null) createNode(parent, vnode.instance, hooks, ns, nextSibling);
            else updateNode(parent, old.instance, vnode.instance, hooks, nextSibling, ns);
            vnode.dom = vnode.instance.dom;
            vnode.domSize = vnode.instance.domSize;
        } else if (old.instance != null) {
            removeNode(parent, old.instance);
            vnode.dom = undefined;
            vnode.domSize = 0;
        } else {
            vnode.dom = old.dom;
            vnode.domSize = old.domSize;
        }
    }
    function getKeyMap(vnodes, start, end) {
        var map = Object.create(null);
        for(; start < end; start++){
            var vnode = vnodes[start];
            if (vnode != null) {
                var key = vnode.key;
                if (key != null) map[key] = start;
            }
        }
        return map;
    }
    // Lifted from ivi https://github.com/ivijs/ivi/
    // takes a list of unique numbers (-1 is special and can
    // occur multiple times) and returns an array with the indices
    // of the items that are part of the longest increasing
    // subsequence
    var lisTemp = [];
    function makeLisIndices(a) {
        var result = [
            0
        ];
        var u = 0, v = 0, i = 0;
        var il = lisTemp.length = a.length;
        for(var i = 0; i < il; i++)lisTemp[i] = a[i];
        for(var i = 0; i < il; ++i){
            if (a[i] === -1) continue;
            var j = result[result.length - 1];
            if (a[j] < a[i]) {
                lisTemp[i] = j;
                result.push(i);
                continue;
            }
            u = 0;
            v = result.length - 1;
            while(u < v){
                // Fast integer average without overflow.
                // eslint-disable-next-line no-bitwise
                var c = (u >>> 1) + (v >>> 1) + (u & v & 1);
                if (a[result[c]] < a[i]) u = c + 1;
                else v = c;
            }
            if (a[i] < a[result[u]]) {
                if (u > 0) lisTemp[i] = result[u - 1];
                result[u] = i;
            }
        }
        u = result.length;
        v = result[u - 1];
        while(u-- > 0){
            result[u] = v;
            v = lisTemp[v];
        }
        lisTemp.length = 0;
        return result;
    }
    function getNextSibling(vnodes, i, nextSibling) {
        for(; i < vnodes.length; i++){
            if (vnodes[i] != null && vnodes[i].dom != null) return vnodes[i].dom;
        }
        return nextSibling;
    }
    // This covers a really specific edge case:
    // - Parent node is keyed and contains child
    // - Child is removed, returns unresolved promise in `onbeforeremove`
    // - Parent node is moved in keyed diff
    // - Remaining children still need moved appropriately
    //
    // Ideally, I'd track removed nodes as well, but that introduces a lot more
    // complexity and I'm not exactly interested in doing that.
    function moveNodes(parent, vnode, nextSibling) {
        var frag = $doc.createDocumentFragment();
        moveChildToFrag(parent, frag, vnode);
        insertNode(parent, frag, nextSibling);
    }
    function moveChildToFrag(parent, frag, vnode) {
        // Dodge the recursion overhead in a few of the most common cases.
        while(vnode.dom != null && vnode.dom.parentNode === parent){
            if (typeof vnode.tag !== "string") {
                vnode = vnode.instance;
                if (vnode != null) continue;
            } else if (vnode.tag === "<") for(var i = 0; i < vnode.instance.length; i++)frag.appendChild(vnode.instance[i]);
            else if (vnode.tag !== "[") // Don't recurse for text nodes *or* elements, just fragments
            frag.appendChild(vnode.dom);
            else if (vnode.children.length === 1) {
                vnode = vnode.children[0];
                if (vnode != null) continue;
            } else for(var i = 0; i < vnode.children.length; i++){
                var child = vnode.children[i];
                if (child != null) moveChildToFrag(parent, frag, child);
            }
            break;
        }
    }
    function insertNode(parent, dom, nextSibling) {
        if (nextSibling != null) parent.insertBefore(dom, nextSibling);
        else parent.appendChild(dom);
    }
    function maybeSetContentEditable(vnode) {
        if (vnode.attrs == null || vnode.attrs.contenteditable == null && // attribute
        vnode.attrs.contentEditable == null // property
        ) return false;
        var children = vnode.children;
        if (children != null && children.length === 1 && children[0].tag === "<") {
            var content = children[0].children;
            if (vnode.dom.innerHTML !== content) vnode.dom.innerHTML = content;
        } else if (children != null && children.length !== 0) throw new Error("Child node of a contenteditable must be trusted.");
        return true;
    }
    //remove
    function removeNodes(parent, vnodes, start, end) {
        for(var i = start; i < end; i++){
            var vnode = vnodes[i];
            if (vnode != null) removeNode(parent, vnode);
        }
    }
    function removeNode(parent, vnode) {
        var mask = 0;
        var original = vnode.state;
        var stateResult, attrsResult;
        if (typeof vnode.tag !== "string" && typeof vnode.state.onbeforeremove === "function") {
            var result = callHook.call(vnode.state.onbeforeremove, vnode);
            if (result != null && typeof result.then === "function") {
                mask = 1;
                stateResult = result;
            }
        }
        if (vnode.attrs && typeof vnode.attrs.onbeforeremove === "function") {
            var result = callHook.call(vnode.attrs.onbeforeremove, vnode);
            if (result != null && typeof result.then === "function") {
                // eslint-disable-next-line no-bitwise
                mask |= 2;
                attrsResult = result;
            }
        }
        checkState(vnode, original);
        // If we can, try to fast-path it and avoid all the overhead of awaiting
        if (!mask) {
            onremove(vnode);
            removeChild(parent, vnode);
        } else {
            if (stateResult != null) {
                var next = function next() {
                    // eslint-disable-next-line no-bitwise
                    if (mask & 1) {
                        mask &= 2;
                        if (!mask) reallyRemove();
                    }
                };
                stateResult.then(next, next);
            }
            if (attrsResult != null) {
                var next = function next() {
                    // eslint-disable-next-line no-bitwise
                    if (mask & 2) {
                        mask &= 1;
                        if (!mask) reallyRemove();
                    }
                };
                attrsResult.then(next, next);
            }
        }
        function reallyRemove() {
            checkState(vnode, original);
            onremove(vnode);
            removeChild(parent, vnode);
        }
    }
    function removeHTML(parent, vnode) {
        for(var i = 0; i < vnode.instance.length; i++)parent.removeChild(vnode.instance[i]);
    }
    function removeChild(parent, vnode) {
        // Dodge the recursion overhead in a few of the most common cases.
        while(vnode.dom != null && vnode.dom.parentNode === parent){
            if (typeof vnode.tag !== "string") {
                vnode = vnode.instance;
                if (vnode != null) continue;
            } else if (vnode.tag === "<") removeHTML(parent, vnode);
            else {
                if (vnode.tag !== "[") {
                    parent.removeChild(vnode.dom);
                    if (!Array.isArray(vnode.children)) break;
                }
                if (vnode.children.length === 1) {
                    vnode = vnode.children[0];
                    if (vnode != null) continue;
                } else for(var i = 0; i < vnode.children.length; i++){
                    var child = vnode.children[i];
                    if (child != null) removeChild(parent, child);
                }
            }
            break;
        }
    }
    function onremove(vnode) {
        if (typeof vnode.tag !== "string" && typeof vnode.state.onremove === "function") callHook.call(vnode.state.onremove, vnode);
        if (vnode.attrs && typeof vnode.attrs.onremove === "function") callHook.call(vnode.attrs.onremove, vnode);
        if (typeof vnode.tag !== "string") {
            if (vnode.instance != null) onremove(vnode.instance);
        } else {
            var children = vnode.children;
            if (Array.isArray(children)) for(var i = 0; i < children.length; i++){
                var child = children[i];
                if (child != null) onremove(child);
            }
        }
    }
    //attrs
    function setAttrs(vnode, attrs, ns) {
        // If you assign an input type that is not supported by IE 11 with an assignment expression, an error will occur.
        //
        // Also, the DOM does things to inputs based on the value, so it needs set first.
        // See: https://github.com/MithrilJS/mithril.js/issues/2622
        if (vnode.tag === "input" && attrs.type != null) vnode.dom.setAttribute("type", attrs.type);
        var isFileInput = attrs != null && vnode.tag === "input" && attrs.type === "file";
        for(var key in attrs)setAttr(vnode, key, null, attrs[key], ns, isFileInput);
    }
    function setAttr(vnode, key, old, value, ns, isFileInput) {
        if (key === "key" || key === "is" || value == null || isLifecycleMethod(key) || old === value && !isFormAttribute(vnode, key) && typeof value !== "object" || key === "type" && vnode.tag === "input") return;
        if (key[0] === "o" && key[1] === "n") return updateEvent(vnode, key, value);
        if (key.slice(0, 6) === "xlink:") vnode.dom.setAttributeNS("http://www.w3.org/1999/xlink", key.slice(6), value);
        else if (key === "style") updateStyle(vnode.dom, old, value);
        else if (hasPropertyKey(vnode, key, ns)) {
            if (key === "value") {
                // Only do the coercion if we're actually going to check the value.
                /* eslint-disable no-implicit-coercion */ //setting input[value] to same value by typing on focused element moves cursor to end in Chrome
                //setting input[type=file][value] to same value causes an error to be generated if it's non-empty
                if ((vnode.tag === "input" || vnode.tag === "textarea") && vnode.dom.value === "" + value && (isFileInput || vnode.dom === activeElement())) return;
                //setting select[value] to same value while having select open blinks select dropdown in Chrome
                if (vnode.tag === "select" && old !== null && vnode.dom.value === "" + value) return;
                //setting option[value] to same value while having select open blinks select dropdown in Chrome
                if (vnode.tag === "option" && old !== null && vnode.dom.value === "" + value) return;
                //setting input[type=file][value] to different value is an error if it's non-empty
                // Not ideal, but it at least works around the most common source of uncaught exceptions for now.
                if (isFileInput && "" + value !== "") {
                    console.error("`value` is read-only on file inputs!");
                    return;
                }
            /* eslint-enable no-implicit-coercion */ }
            vnode.dom[key] = value;
        } else if (typeof value === "boolean") {
            if (value) vnode.dom.setAttribute(key, "");
            else vnode.dom.removeAttribute(key);
        } else vnode.dom.setAttribute(key === "className" ? "class" : key, value);
    }
    function removeAttr(vnode, key, old, ns) {
        if (key === "key" || key === "is" || old == null || isLifecycleMethod(key)) return;
        if (key[0] === "o" && key[1] === "n") updateEvent(vnode, key, undefined);
        else if (key === "style") updateStyle(vnode.dom, old, null);
        else if (hasPropertyKey(vnode, key, ns) && key !== "className" && key !== "title" // creates "null" as title
         && !(key === "value" && (vnode.tag === "option" || vnode.tag === "select" && vnode.dom.selectedIndex === -1 && vnode.dom === activeElement())) && !(vnode.tag === "input" && key === "type")) vnode.dom[key] = null;
        else {
            var nsLastIndex = key.indexOf(":");
            if (nsLastIndex !== -1) key = key.slice(nsLastIndex + 1);
            if (old !== false) vnode.dom.removeAttribute(key === "className" ? "class" : key);
        }
    }
    function setLateSelectAttrs(vnode, attrs) {
        if ("value" in attrs) {
            if (attrs.value === null) {
                if (vnode.dom.selectedIndex !== -1) vnode.dom.value = null;
            } else {
                var normalized = "" + attrs.value // eslint-disable-line no-implicit-coercion
                ;
                if (vnode.dom.value !== normalized || vnode.dom.selectedIndex === -1) vnode.dom.value = normalized;
            }
        }
        if ("selectedIndex" in attrs) setAttr(vnode, "selectedIndex", null, attrs.selectedIndex, undefined);
    }
    function updateAttrs(vnode, old, attrs, ns) {
        if (old && old === attrs) console.warn("Don't reuse attrs object, use new object for every redraw, this will throw in next major");
        if (attrs != null) {
            // If you assign an input type that is not supported by IE 11 with an assignment expression, an error will occur.
            //
            // Also, the DOM does things to inputs based on the value, so it needs set first.
            // See: https://github.com/MithrilJS/mithril.js/issues/2622
            if (vnode.tag === "input" && attrs.type != null) vnode.dom.setAttribute("type", attrs.type);
            var isFileInput = vnode.tag === "input" && attrs.type === "file";
            for(var key in attrs)setAttr(vnode, key, old && old[key], attrs[key], ns, isFileInput);
        }
        var val;
        if (old != null) {
            for(var key in old)if ((val = old[key]) != null && (attrs == null || attrs[key] == null)) removeAttr(vnode, key, val, ns);
        }
    }
    function isFormAttribute(vnode, attr) {
        return attr === "value" || attr === "checked" || attr === "selectedIndex" || attr === "selected" && vnode.dom === activeElement() || vnode.tag === "option" && vnode.dom.parentNode === $doc.activeElement;
    }
    function isLifecycleMethod(attr) {
        return attr === "oninit" || attr === "oncreate" || attr === "onupdate" || attr === "onremove" || attr === "onbeforeremove" || attr === "onbeforeupdate";
    }
    function hasPropertyKey(vnode, key, ns) {
        // Filter out namespaced keys
        return ns === undefined && // If it's a custom element, just keep it.
        (vnode.tag.indexOf("-") > -1 || vnode.attrs != null && vnode.attrs.is || // If it's a normal element, let's try to avoid a few browser bugs.
        key !== "href" && key !== "list" && key !== "form" && key !== "width" && key !== "height" // && key !== "type"
        ) && key in vnode.dom;
    }
    //style
    var uppercaseRegex = /[A-Z]/g;
    function toLowerCase(capital) {
        return "-" + capital.toLowerCase();
    }
    function normalizeKey(key) {
        return key[0] === "-" && key[1] === "-" ? key : key === "cssFloat" ? "float" : key.replace(uppercaseRegex, toLowerCase);
    }
    function updateStyle(element, old, style) {
        if (old === style) ;
        else if (style == null) // New style is missing, just clear it.
        element.style.cssText = "";
        else if (typeof style !== "object") // New style is a string, let engine deal with patching.
        element.style.cssText = style;
        else if (old == null || typeof old !== "object") {
            // `old` is missing or a string, `style` is an object.
            element.style.cssText = "";
            // Add new style properties
            for(var key in style){
                var value = style[key];
                if (value != null) element.style.setProperty(normalizeKey(key), String(value));
            }
        } else {
            // Both old & new are (different) objects.
            // Update style properties that have changed
            for(var key in style){
                var value = style[key];
                if (value != null && (value = String(value)) !== String(old[key])) element.style.setProperty(normalizeKey(key), value);
            }
            // Remove style properties that no longer exist
            for(var key in old)if (old[key] != null && style[key] == null) element.style.removeProperty(normalizeKey(key));
        }
    }
    // Here's an explanation of how this works:
    // 1. The event names are always (by design) prefixed by `on`.
    // 2. The EventListener interface accepts either a function or an object
    //    with a `handleEvent` method.
    // 3. The object does not inherit from `Object.prototype`, to avoid
    //    any potential interference with that (e.g. setters).
    // 4. The event name is remapped to the handler before calling it.
    // 5. In function-based event handlers, `ev.target === this`. We replicate
    //    that below.
    // 6. In function-based event handlers, `return false` prevents the default
    //    action and stops event propagation. We replicate that below.
    function EventDict() {
        // Save this, so the current redraw is correctly tracked.
        this._ = currentRedraw;
    }
    EventDict.prototype = Object.create(null);
    EventDict.prototype.handleEvent = function(ev) {
        var handler = this["on" + ev.type];
        var result;
        if (typeof handler === "function") result = handler.call(ev.currentTarget, ev);
        else if (typeof handler.handleEvent === "function") handler.handleEvent(ev);
        if (this._ && ev.redraw !== false) (0, this._)();
        if (result === false) {
            ev.preventDefault();
            ev.stopPropagation();
        }
    };
    //event
    function updateEvent(vnode, key, value) {
        if (vnode.events != null) {
            vnode.events._ = currentRedraw;
            if (vnode.events[key] === value) return;
            if (value != null && (typeof value === "function" || typeof value === "object")) {
                if (vnode.events[key] == null) vnode.dom.addEventListener(key.slice(2), vnode.events, false);
                vnode.events[key] = value;
            } else {
                if (vnode.events[key] != null) vnode.dom.removeEventListener(key.slice(2), vnode.events, false);
                vnode.events[key] = undefined;
            }
        } else if (value != null && (typeof value === "function" || typeof value === "object")) {
            vnode.events = new EventDict();
            vnode.dom.addEventListener(key.slice(2), vnode.events, false);
            vnode.events[key] = value;
        }
    }
    //lifecycle
    function initLifecycle(source, vnode, hooks) {
        if (typeof source.oninit === "function") callHook.call(source.oninit, vnode);
        if (typeof source.oncreate === "function") hooks.push(callHook.bind(source.oncreate, vnode));
    }
    function updateLifecycle(source, vnode, hooks) {
        if (typeof source.onupdate === "function") hooks.push(callHook.bind(source.onupdate, vnode));
    }
    function shouldNotUpdate(vnode, old) {
        do {
            if (vnode.attrs != null && typeof vnode.attrs.onbeforeupdate === "function") {
                var force = callHook.call(vnode.attrs.onbeforeupdate, vnode, old);
                if (force !== undefined && !force) break;
            }
            if (typeof vnode.tag !== "string" && typeof vnode.state.onbeforeupdate === "function") {
                var force = callHook.call(vnode.state.onbeforeupdate, vnode, old);
                if (force !== undefined && !force) break;
            }
            return false;
        }while (false); // eslint-disable-line no-constant-condition
        vnode.dom = old.dom;
        vnode.domSize = old.domSize;
        vnode.instance = old.instance;
        // One would think having the actual latest attributes would be ideal,
        // but it doesn't let us properly diff based on our current internal
        // representation. We have to save not only the old DOM info, but also
        // the attributes used to create it, as we diff *that*, not against the
        // DOM directly (with a few exceptions in `setAttr`). And, of course, we
        // need to save the children and text as they are conceptually not
        // unlike special "attributes" internally.
        vnode.attrs = old.attrs;
        vnode.children = old.children;
        vnode.text = old.text;
        return true;
    }
    var currentDOM;
    return function(dom, vnodes, redraw) {
        if (!dom) throw new TypeError("DOM element being rendered to does not exist.");
        if (currentDOM != null && dom.contains(currentDOM)) throw new TypeError("Node is currently being rendered to and thus is locked.");
        var prevRedraw = currentRedraw;
        var prevDOM = currentDOM;
        var hooks = [];
        var active = activeElement();
        var namespace = dom.namespaceURI;
        currentDOM = dom;
        currentRedraw = typeof redraw === "function" ? redraw : undefined;
        try {
            // First time rendering into a node clears it out
            if (dom.vnodes == null) dom.textContent = "";
            vnodes = $ahPL4.normalizeChildren(Array.isArray(vnodes) ? vnodes : [
                vnodes
            ]);
            updateNodes(dom, dom.vnodes, vnodes, hooks, null, namespace === "http://www.w3.org/1999/xhtml" ? undefined : namespace);
            dom.vnodes = vnodes;
            // `document.activeElement` can return null: https://html.spec.whatwg.org/multipage/interaction.html#dom-document-activeelement
            if (active != null && activeElement() !== active && typeof active.focus === "function") active.focus();
            for(var i = 0; i < hooks.length; i++)hooks[i]();
        } finally{
            currentRedraw = prevRedraw;
            currentDOM = prevDOM;
        }
    };
};

});


parcelRegister("UfRe2", function(module, exports) {
"use strict";

var $ahPL4 = parcelRequire("ahPL4");
module.exports = function(render, schedule, console) {
    var subscriptions = [];
    var pending = false;
    var offset = -1;
    function sync() {
        for(offset = 0; offset < subscriptions.length; offset += 2)try {
            render(subscriptions[offset], $ahPL4(subscriptions[offset + 1]), redraw);
        } catch (e) {
            console.error(e);
        }
        offset = -1;
    }
    function redraw() {
        if (!pending) {
            pending = true;
            schedule(function() {
                pending = false;
                sync();
            });
        }
    }
    redraw.sync = sync;
    function mount(root, component) {
        if (component != null && component.view == null && typeof component !== "function") throw new TypeError("m.mount expects a component, not a vnode.");
        var index = subscriptions.indexOf(root);
        if (index >= 0) {
            subscriptions.splice(index, 2);
            if (index <= offset) offset -= 2;
            render(root, []);
        }
        if (component != null) {
            subscriptions.push(root, component);
            render(root, $ahPL4(component), redraw);
        }
    }
    return {
        mount: mount,
        redraw: redraw
    };
};

});

parcelRegister("8ohAQ", function(module, exports) {
"use strict";

var $bGJ5a = parcelRequire("bGJ5a");

var $9MCRO = parcelRequire("9MCRO");
module.exports = function($window, Promise, oncompletion) {
    var callbackCount = 0;
    function PromiseProxy(executor) {
        return new Promise(executor);
    }
    // In case the global Promise is some userland library's where they rely on
    // `foo instanceof this.constructor`, `this.constructor.resolve(value)`, or
    // similar. Let's *not* break them.
    PromiseProxy.prototype = Promise.prototype;
    PromiseProxy.__proto__ = Promise // eslint-disable-line no-proto
    ;
    function makeRequest(factory) {
        return function(url, args) {
            if (typeof url !== "string") {
                args = url;
                url = url.url;
            } else if (args == null) args = {};
            var promise = new Promise(function(resolve, reject) {
                factory($bGJ5a(url, args.params), args, function(data) {
                    if (typeof args.type === "function") {
                        if (Array.isArray(data)) for(var i = 0; i < data.length; i++)data[i] = new args.type(data[i]);
                        else data = new args.type(data);
                    }
                    resolve(data);
                }, reject);
            });
            if (args.background === true) return promise;
            var count = 0;
            function complete() {
                if (--count === 0 && typeof oncompletion === "function") oncompletion();
            }
            return wrap(promise);
            function wrap(promise) {
                var then = promise.then;
                // Set the constructor, so engines know to not await or resolve
                // this as a native promise. At the time of writing, this is
                // only necessary for V8, but their behavior is the correct
                // behavior per spec. See this spec issue for more details:
                // https://github.com/tc39/ecma262/issues/1577. Also, see the
                // corresponding comment in `request/tests/test-request.js` for
                // a bit more background on the issue at hand.
                promise.constructor = PromiseProxy;
                promise.then = function() {
                    count++;
                    var next = then.apply(promise, arguments);
                    next.then(complete, function(e) {
                        complete();
                        if (count === 0) throw e;
                    });
                    return wrap(next);
                };
                return promise;
            }
        };
    }
    function hasHeader(args, name) {
        for(var key in args.headers){
            if ($9MCRO.call(args.headers, key) && key.toLowerCase() === name) return true;
        }
        return false;
    }
    return {
        request: makeRequest(function(url, args, resolve, reject) {
            var method = args.method != null ? args.method.toUpperCase() : "GET";
            var body = args.body;
            var assumeJSON = (args.serialize == null || args.serialize === JSON.serialize) && !(body instanceof $window.FormData || body instanceof $window.URLSearchParams);
            var responseType = args.responseType || (typeof args.extract === "function" ? "" : "json");
            var xhr = new $window.XMLHttpRequest(), aborted = false, isTimeout = false;
            var original = xhr, replacedAbort;
            var abort = xhr.abort;
            xhr.abort = function() {
                aborted = true;
                abort.call(this);
            };
            xhr.open(method, url, args.async !== false, typeof args.user === "string" ? args.user : undefined, typeof args.password === "string" ? args.password : undefined);
            if (assumeJSON && body != null && !hasHeader(args, "content-type")) xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
            if (typeof args.deserialize !== "function" && !hasHeader(args, "accept")) xhr.setRequestHeader("Accept", "application/json, text/*");
            if (args.withCredentials) xhr.withCredentials = args.withCredentials;
            if (args.timeout) xhr.timeout = args.timeout;
            xhr.responseType = responseType;
            for(var key in args.headers)if ($9MCRO.call(args.headers, key)) xhr.setRequestHeader(key, args.headers[key]);
            xhr.onreadystatechange = function(ev) {
                // Don't throw errors on xhr.abort().
                if (aborted) return;
                if (ev.target.readyState === 4) try {
                    var success = ev.target.status >= 200 && ev.target.status < 300 || ev.target.status === 304 || /^file:\/\//i.test(url);
                    // When the response type isn't "" or "text",
                    // `xhr.responseText` is the wrong thing to use.
                    // Browsers do the right thing and throw here, and we
                    // should honor that and do the right thing by
                    // preferring `xhr.response` where possible/practical.
                    var response = ev.target.response, message;
                    if (responseType === "json") {
                        // For IE and Edge, which don't implement
                        // `responseType: "json"`.
                        if (!ev.target.responseType && typeof args.extract !== "function") // Handle no-content which will not parse.
                        try {
                            response = JSON.parse(ev.target.responseText);
                        } catch (e) {
                            response = null;
                        }
                    } else if (!responseType || responseType === "text") // Only use this default if it's text. If a parsed
                    // document is needed on old IE and friends (all
                    // unsupported), the user should use a custom
                    // `config` instead. They're already using this at
                    // their own risk.
                    {
                        if (response == null) response = ev.target.responseText;
                    }
                    if (typeof args.extract === "function") {
                        response = args.extract(ev.target, args);
                        success = true;
                    } else if (typeof args.deserialize === "function") response = args.deserialize(response);
                    if (success) resolve(response);
                    else {
                        var completeErrorResponse = function completeErrorResponse() {
                            try {
                                message = ev.target.responseText;
                            } catch (e) {
                                message = response;
                            }
                            var error = new Error(message);
                            error.code = ev.target.status;
                            error.response = response;
                            reject(error);
                        };
                        if (xhr.status === 0) // Use setTimeout to push this code block onto the event queue
                        // This allows `xhr.ontimeout` to run in the case that there is a timeout
                        // Without this setTimeout, `xhr.ontimeout` doesn't have a chance to reject
                        // as `xhr.onreadystatechange` will run before it
                        setTimeout(function() {
                            if (isTimeout) return;
                            completeErrorResponse();
                        });
                        else completeErrorResponse();
                    }
                } catch (e) {
                    reject(e);
                }
            };
            xhr.ontimeout = function(ev) {
                isTimeout = true;
                var error = new Error("Request timed out");
                error.code = ev.target.status;
                reject(error);
            };
            if (typeof args.config === "function") {
                xhr = args.config(xhr, args, url) || xhr;
                // Propagate the `abort` to any replacement XHR as well.
                if (xhr !== original) {
                    replacedAbort = xhr.abort;
                    xhr.abort = function() {
                        aborted = true;
                        replacedAbort.call(this);
                    };
                }
            }
            if (body == null) xhr.send();
            else if (typeof args.serialize === "function") xhr.send(args.serialize(body));
            else if (body instanceof $window.FormData || body instanceof $window.URLSearchParams) xhr.send(body);
            else xhr.send(JSON.stringify(body));
        }),
        jsonp: makeRequest(function(url, args, resolve, reject) {
            var callbackName = args.callbackName || "_mithril_" + Math.round(Math.random() * 1e16) + "_" + callbackCount++;
            var script = $window.document.createElement("script");
            $window[callbackName] = function(data) {
                delete $window[callbackName];
                script.parentNode.removeChild(script);
                resolve(data);
            };
            script.onerror = function() {
                delete $window[callbackName];
                script.parentNode.removeChild(script);
                reject(new Error("JSONP request failed"));
            };
            script.src = url + (url.indexOf("?") < 0 ? "?" : "&") + encodeURIComponent(args.callbackKey || "callback") + "=" + encodeURIComponent(callbackName);
            $window.document.documentElement.appendChild(script);
        })
    };
};

});
parcelRegister("bGJ5a", function(module, exports) {
"use strict";

var $6KLd1 = parcelRequire("6KLd1");

var $bVkaq = parcelRequire("bVkaq");
// Returns `path` from `template` + `params`
module.exports = function(template, params) {
    if (/:([^\/\.-]+)(\.{3})?:/.test(template)) throw new SyntaxError("Template parameter names must be separated by either a '/', '-', or '.'.");
    if (params == null) return template;
    var queryIndex = template.indexOf("?");
    var hashIndex = template.indexOf("#");
    var queryEnd = hashIndex < 0 ? template.length : hashIndex;
    var pathEnd = queryIndex < 0 ? queryEnd : queryIndex;
    var path = template.slice(0, pathEnd);
    var query = {};
    $bVkaq(query, params);
    var resolved = path.replace(/:([^\/\.-]+)(\.{3})?/g, function(m, key, variadic) {
        delete query[key];
        // If no such parameter exists, don't interpolate it.
        if (params[key] == null) return m;
        // Escape normal parameters, but not variadic ones.
        return variadic ? params[key] : encodeURIComponent(String(params[key]));
    });
    // In case the template substitution adds new query/hash parameters.
    var newQueryIndex = resolved.indexOf("?");
    var newHashIndex = resolved.indexOf("#");
    var newQueryEnd = newHashIndex < 0 ? resolved.length : newHashIndex;
    var newPathEnd = newQueryIndex < 0 ? newQueryEnd : newQueryIndex;
    var result = resolved.slice(0, newPathEnd);
    if (queryIndex >= 0) result += template.slice(queryIndex, queryEnd);
    if (newQueryIndex >= 0) result += (queryIndex < 0 ? "?" : "&") + resolved.slice(newQueryIndex, newQueryEnd);
    var querystring = $6KLd1(query);
    if (querystring) result += (queryIndex < 0 && newQueryIndex < 0 ? "?" : "&") + querystring;
    if (hashIndex >= 0) result += template.slice(hashIndex);
    if (newHashIndex >= 0) result += (hashIndex < 0 ? "" : "&") + resolved.slice(newHashIndex);
    return result;
};

});
parcelRegister("6KLd1", function(module, exports) {
"use strict";
module.exports = function(object) {
    if (Object.prototype.toString.call(object) !== "[object Object]") return "";
    var args = [];
    for(var key in object)destructure(key, object[key]);
    return args.join("&");
    function destructure(key, value) {
        if (Array.isArray(value)) for(var i = 0; i < value.length; i++)destructure(key + "[" + i + "]", value[i]);
        else if (Object.prototype.toString.call(value) === "[object Object]") for(var i in value)destructure(key + "[" + i + "]", value[i]);
        else args.push(encodeURIComponent(key) + (value != null && value !== "" ? "=" + encodeURIComponent(value) : ""));
    }
};

});

parcelRegister("bVkaq", function(module, exports) {
// This exists so I'm only saving it once.
"use strict";

var $9MCRO = parcelRequire("9MCRO");
module.exports = Object.assign || function(target, source) {
    for(var key in source)if ($9MCRO.call(source, key)) target[key] = source[key];
};

});
parcelRegister("9MCRO", function(module, exports) {
// This exists so I'm only saving it once.
"use strict";
module.exports = ({}).hasOwnProperty;

});




parcelRegister("jFffZ", function(module, exports) {
"use strict";

var $fBKqb = parcelRequire("fBKqb");

module.exports = (parcelRequire("bO6oz"))(typeof window !== "undefined" ? window : null, $fBKqb);

});
parcelRegister("fBKqb", function(module, exports) {
"use strict";

var $iHb4t = parcelRequire("iHb4t");

module.exports = (parcelRequire("UfRe2"))($iHb4t, typeof requestAnimationFrame !== "undefined" ? requestAnimationFrame : null, typeof console !== "undefined" ? console : null);

});

parcelRegister("bO6oz", function(module, exports) {
"use strict";

var $ahPL4 = parcelRequire("ahPL4");

var $hPUTp = parcelRequire("hPUTp");

var $dXPdz = parcelRequire("dXPdz");

var $bGJ5a = parcelRequire("bGJ5a");

var $1bhZB = parcelRequire("1bhZB");

var $427bo = parcelRequire("427bo");

var $bVkaq = parcelRequire("bVkaq");

var $1Zud9 = parcelRequire("1Zud9");
var $8989532d49d4b2cf$var$sentinel = {};
function $8989532d49d4b2cf$var$decodeURIComponentSave(component) {
    try {
        return decodeURIComponent(component);
    } catch (e) {
        return component;
    }
}
module.exports = function($window, mountRedraw) {
    var callAsync = $window == null ? null : typeof $window.setImmediate === "function" ? $window.setImmediate : $window.setTimeout;
    var p = $dXPdz.resolve();
    var scheduled = false;
    // state === 0: init
    // state === 1: scheduled
    // state === 2: done
    var ready = false;
    var state = 0;
    var compiled, fallbackRoute;
    var currentResolver = $8989532d49d4b2cf$var$sentinel, component, attrs, currentPath, lastUpdate;
    var RouterRoot = {
        onbeforeupdate: function onbeforeupdate() {
            state = state ? 2 : 1;
            return !(!state || $8989532d49d4b2cf$var$sentinel === currentResolver);
        },
        onremove: function onremove() {
            $window.removeEventListener("popstate", fireAsync, false);
            $window.removeEventListener("hashchange", resolveRoute, false);
        },
        view: function view() {
            if (!state || $8989532d49d4b2cf$var$sentinel === currentResolver) return;
            // Wrap in a fragment to preserve existing key semantics
            var vnode = [
                $ahPL4(component, attrs.key, attrs)
            ];
            if (currentResolver) vnode = currentResolver.render(vnode[0]);
            return vnode;
        }
    };
    var SKIP = route.SKIP = {};
    function resolveRoute() {
        scheduled = false;
        // Consider the pathname holistically. The prefix might even be invalid,
        // but that's not our problem.
        var prefix = $window.location.hash;
        if (route.prefix[0] !== "#") {
            prefix = $window.location.search + prefix;
            if (route.prefix[0] !== "?") {
                prefix = $window.location.pathname + prefix;
                if (prefix[0] !== "/") prefix = "/" + prefix;
            }
        }
        // This seemingly useless `.concat()` speeds up the tests quite a bit,
        // since the representation is consistently a relatively poorly
        // optimized cons string.
        var path = prefix.concat().replace(/(?:%[a-f89][a-f0-9])+/gim, $8989532d49d4b2cf$var$decodeURIComponentSave).slice(route.prefix.length);
        var data = $1bhZB(path);
        $bVkaq(data.params, $window.history.state);
        function reject(e) {
            console.error(e);
            setPath(fallbackRoute, null, {
                replace: true
            });
        }
        loop(0);
        function loop(i) {
            // state === 0: init
            // state === 1: scheduled
            // state === 2: done
            for(; i < compiled.length; i++)if (compiled[i].check(data)) {
                var payload = compiled[i].component;
                var matchedRoute = compiled[i].route;
                var localComp = payload;
                var update = lastUpdate = function update1(comp) {
                    if (update !== lastUpdate) return;
                    if (comp === SKIP) return loop(i + 1);
                    component = comp != null && (typeof comp.view === "function" || typeof comp === "function") ? comp : "div";
                    attrs = data.params, currentPath = path, lastUpdate = null;
                    currentResolver = payload.render ? payload : null;
                    if (state === 2) mountRedraw.redraw();
                    else {
                        state = 2;
                        mountRedraw.redraw.sync();
                    }
                };
                // There's no understating how much I *wish* I could
                // use `async`/`await` here...
                if (payload.view || typeof payload === "function") {
                    payload = {};
                    update(localComp);
                } else if (payload.onmatch) p.then(function() {
                    return payload.onmatch(data.params, path, matchedRoute);
                }).then(update, path === fallbackRoute ? null : reject);
                else update("div");
                return;
            }
            if (path === fallbackRoute) throw new Error("Could not resolve default route " + fallbackRoute + ".");
            setPath(fallbackRoute, null, {
                replace: true
            });
        }
    }
    // Set it unconditionally so `m.route.set` and `m.route.Link` both work,
    // even if neither `pushState` nor `hashchange` are supported. It's
    // cleared if `hashchange` is used, since that makes it automatically
    // async.
    function fireAsync() {
        if (!scheduled) {
            scheduled = true;
            // TODO: just do `mountRedraw.redraw()` here and elide the timer
            // dependency. Note that this will muck with tests a *lot*, so it's
            // not as easy of a change as it sounds.
            callAsync(resolveRoute);
        }
    }
    function setPath(path, data, options) {
        path = $bGJ5a(path, data);
        if (ready) {
            fireAsync();
            var state = options ? options.state : null;
            var title = options ? options.title : null;
            if (options && options.replace) $window.history.replaceState(state, title, route.prefix + path);
            else $window.history.pushState(state, title, route.prefix + path);
        } else $window.location.href = route.prefix + path;
    }
    function route(root, defaultRoute, routes) {
        if (!root) throw new TypeError("DOM element being rendered to does not exist.");
        compiled = Object.keys(routes).map(function(route) {
            if (route[0] !== "/") throw new SyntaxError("Routes must start with a '/'.");
            if (/:([^\/\.-]+)(\.{3})?:/.test(route)) throw new SyntaxError("Route parameter names must be separated with either '/', '.', or '-'.");
            return {
                route: route,
                component: routes[route],
                check: $427bo(route)
            };
        });
        fallbackRoute = defaultRoute;
        if (defaultRoute != null) {
            var defaultData = $1bhZB(defaultRoute);
            if (!compiled.some(function(i) {
                return i.check(defaultData);
            })) throw new ReferenceError("Default route doesn't match any known routes.");
        }
        if (typeof $window.history.pushState === "function") $window.addEventListener("popstate", fireAsync, false);
        else if (route.prefix[0] === "#") $window.addEventListener("hashchange", resolveRoute, false);
        ready = true;
        mountRedraw.mount(root, RouterRoot);
        resolveRoute();
    }
    route.set = function(path, data, options) {
        if (lastUpdate != null) {
            options = options || {};
            options.replace = true;
        }
        lastUpdate = null;
        setPath(path, data, options);
    };
    route.get = function() {
        return currentPath;
    };
    route.prefix = "#!";
    route.Link = {
        view: function view(vnode) {
            // Omit the used parameters from the rendered element - they are
            // internal. Also, censor the various lifecycle methods.
            //
            // We don't strip the other parameters because for convenience we
            // let them be specified in the selector as well.
            var child = $hPUTp(vnode.attrs.selector || "a", $1Zud9(vnode.attrs, [
                "options",
                "params",
                "selector",
                "onclick"
            ]), vnode.children);
            var options, onclick, href;
            // Let's provide a *right* way to disable a route link, rather than
            // letting people screw up accessibility on accident.
            //
            // The attribute is coerced so users don't get surprised over
            // `disabled: 0` resulting in a button that's somehow routable
            // despite being visibly disabled.
            if (child.attrs.disabled = Boolean(child.attrs.disabled)) {
                child.attrs.href = null;
                child.attrs["aria-disabled"] = "true";
            // If you *really* do want add `onclick` on a disabled link, use
            // an `oncreate` hook to add it.
            } else {
                options = vnode.attrs.options;
                onclick = vnode.attrs.onclick;
                // Easier to build it now to keep it isomorphic.
                href = $bGJ5a(child.attrs.href, vnode.attrs.params);
                child.attrs.href = route.prefix + href;
                child.attrs.onclick = function(e) {
                    var result;
                    if (typeof onclick === "function") result = onclick.call(e.currentTarget, e);
                    else if (onclick == null || typeof onclick !== "object") ;
                    else if (typeof onclick.handleEvent === "function") onclick.handleEvent(e);
                    // Adapted from React Router's implementation:
                    // https://github.com/ReactTraining/react-router/blob/520a0acd48ae1b066eb0b07d6d4d1790a1d02482/packages/react-router-dom/modules/Link.js
                    //
                    // Try to be flexible and intuitive in how we handle links.
                    // Fun fact: links aren't as obvious to get right as you
                    // would expect. There's a lot more valid ways to click a
                    // link than this, and one might want to not simply click a
                    // link, but right click or command-click it to copy the
                    // link target, etc. Nope, this isn't just for blind people.
                    if (// Skip if `onclick` prevented default
                    result !== false && !e.defaultPrevented && // Ignore everything but left clicks
                    (e.button === 0 || e.which === 0 || e.which === 1) && // Let the browser handle `target=_blank`, etc.
                    (!e.currentTarget.target || e.currentTarget.target === "_self") && // No modifier keys
                    !e.ctrlKey && !e.metaKey && !e.shiftKey && !e.altKey) {
                        e.preventDefault();
                        e.redraw = false;
                        route.set(href, null, options);
                    }
                };
            }
            return child;
        }
    };
    route.param = function(key) {
        return attrs && key != null ? attrs[key] : attrs;
    };
    return route;
};

});
parcelRegister("hPUTp", function(module, exports) {
"use strict";

var $ahPL4 = parcelRequire("ahPL4");

var $lNZGj = parcelRequire("lNZGj");

var $9MCRO = parcelRequire("9MCRO");
var $cfc354cae4080493$var$selectorParser = /(?:(^|#|\.)([^#\.\[\]]+))|(\[(.+?)(?:\s*=\s*("|'|)((?:\\["'\]]|.)*?)\5)?\])/g;
var $cfc354cae4080493$var$selectorCache = {};
function $cfc354cae4080493$var$isEmpty(object) {
    for(var key in object)if ($9MCRO.call(object, key)) return false;
    return true;
}
function $cfc354cae4080493$var$compileSelector(selector) {
    var match, tag = "div", classes = [], attrs = {};
    while(match = $cfc354cae4080493$var$selectorParser.exec(selector)){
        var type = match[1], value = match[2];
        if (type === "" && value !== "") tag = value;
        else if (type === "#") attrs.id = value;
        else if (type === ".") classes.push(value);
        else if (match[3][0] === "[") {
            var attrValue = match[6];
            if (attrValue) attrValue = attrValue.replace(/\\(["'])/g, "$1").replace(/\\\\/g, "\\");
            if (match[4] === "class") classes.push(attrValue);
            else attrs[match[4]] = attrValue === "" ? attrValue : attrValue || true;
        }
    }
    if (classes.length > 0) attrs.className = classes.join(" ");
    return $cfc354cae4080493$var$selectorCache[selector] = {
        tag: tag,
        attrs: attrs
    };
}
function $cfc354cae4080493$var$execSelector(state, vnode) {
    var attrs = vnode.attrs;
    var hasClass = $9MCRO.call(attrs, "class");
    var className = hasClass ? attrs.class : attrs.className;
    vnode.tag = state.tag;
    vnode.attrs = {};
    if (!$cfc354cae4080493$var$isEmpty(state.attrs) && !$cfc354cae4080493$var$isEmpty(attrs)) {
        var newAttrs = {};
        for(var key in attrs)if ($9MCRO.call(attrs, key)) newAttrs[key] = attrs[key];
        attrs = newAttrs;
    }
    for(var key in state.attrs)if ($9MCRO.call(state.attrs, key) && key !== "className" && !$9MCRO.call(attrs, key)) attrs[key] = state.attrs[key];
    if (className != null || state.attrs.className != null) attrs.className = className != null ? state.attrs.className != null ? String(state.attrs.className) + " " + String(className) : className : state.attrs.className != null ? state.attrs.className : null;
    if (hasClass) attrs.class = null;
    for(var key in attrs)if ($9MCRO.call(attrs, key) && key !== "key") {
        vnode.attrs = attrs;
        break;
    }
    return vnode;
}
function $cfc354cae4080493$var$hyperscript(selector) {
    if (selector == null || typeof selector !== "string" && typeof selector !== "function" && typeof selector.view !== "function") throw Error("The selector must be either a string or a component.");
    var vnode = $lNZGj.apply(1, arguments);
    if (typeof selector === "string") {
        vnode.children = $ahPL4.normalizeChildren(vnode.children);
        if (selector !== "[") return $cfc354cae4080493$var$execSelector($cfc354cae4080493$var$selectorCache[selector] || $cfc354cae4080493$var$compileSelector(selector), vnode);
    }
    vnode.tag = selector;
    return vnode;
}
module.exports = $cfc354cae4080493$var$hyperscript;

});

parcelRegister("dXPdz", function(module, exports) {
/* global window */ "use strict";

var $4kqT7 = parcelRequire("4kqT7");
if (typeof window !== "undefined") {
    if (typeof window.Promise === "undefined") window.Promise = $4kqT7;
    else if (!window.Promise.prototype.finally) window.Promise.prototype.finally = $4kqT7.prototype.finally;
    module.exports = window.Promise;
} else if (typeof $parcel$global !== "undefined") {
    if (typeof $parcel$global.Promise === "undefined") $parcel$global.Promise = $4kqT7;
    else if (!$parcel$global.Promise.prototype.finally) $parcel$global.Promise.prototype.finally = $4kqT7.prototype.finally;
    module.exports = $parcel$global.Promise;
} else module.exports = $4kqT7;

});

parcelRegister("1bhZB", function(module, exports) {
"use strict";

var $iahK6 = parcelRequire("iahK6");
// Returns `{path, params}` from `url`
module.exports = function(url) {
    var queryIndex = url.indexOf("?");
    var hashIndex = url.indexOf("#");
    var queryEnd = hashIndex < 0 ? url.length : hashIndex;
    var pathEnd = queryIndex < 0 ? queryEnd : queryIndex;
    var path = url.slice(0, pathEnd).replace(/\/{2,}/g, "/");
    if (!path) path = "/";
    else {
        if (path[0] !== "/") path = "/" + path;
        if (path.length > 1 && path[path.length - 1] === "/") path = path.slice(0, -1);
    }
    return {
        path: path,
        params: queryIndex < 0 ? {} : $iahK6(url.slice(queryIndex + 1, queryEnd))
    };
};

});
parcelRegister("iahK6", function(module, exports) {
"use strict";
function $d396ec7404febe23$var$decodeURIComponentSave(str) {
    try {
        return decodeURIComponent(str);
    } catch (err) {
        return str;
    }
}
module.exports = function(string) {
    if (string === "" || string == null) return {};
    if (string.charAt(0) === "?") string = string.slice(1);
    var entries = string.split("&"), counters = {}, data = {};
    for(var i = 0; i < entries.length; i++){
        var entry = entries[i].split("=");
        var key = $d396ec7404febe23$var$decodeURIComponentSave(entry[0]);
        var value = entry.length === 2 ? $d396ec7404febe23$var$decodeURIComponentSave(entry[1]) : "";
        if (value === "true") value = true;
        else if (value === "false") value = false;
        var levels = key.split(/\]\[?|\[/);
        var cursor = data;
        if (key.indexOf("[") > -1) levels.pop();
        for(var j = 0; j < levels.length; j++){
            var level = levels[j], nextLevel = levels[j + 1];
            var isNumber = nextLevel == "" || !isNaN(parseInt(nextLevel, 10));
            if (level === "") {
                var key = levels.slice(0, j).join();
                if (counters[key] == null) counters[key] = Array.isArray(cursor) ? cursor.length : 0;
                level = counters[key]++;
            } else if (level === "__proto__") break;
            if (j === levels.length - 1) cursor[level] = value;
            else {
                // Read own properties exclusively to disallow indirect
                // prototype pollution
                var desc = Object.getOwnPropertyDescriptor(cursor, level);
                if (desc != null) desc = desc.value;
                if (desc == null) cursor[level] = desc = isNumber ? [] : {};
                cursor = desc;
            }
        }
    }
    return data;
};

});


parcelRegister("427bo", function(module, exports) {
"use strict";

var $1bhZB = parcelRequire("1bhZB");
// Compiles a template into a function that takes a resolved path (without query
// strings) and returns an object containing the template parameters with their
// parsed values. This expects the input of the compiled template to be the
// output of `parsePathname`. Note that it does *not* remove query parameters
// specified in the template.
module.exports = function(template) {
    var templateData = $1bhZB(template);
    var templateKeys = Object.keys(templateData.params);
    var keys = [];
    var regexp = new RegExp("^" + templateData.path.replace(// I escape literal text so people can use things like `:file.:ext` or
    // `:lang-:locale` in routes. This is all merged into one pass so I
    // don't also accidentally escape `-` and make it harder to detect it to
    // ban it from template parameters.
    /:([^\/.-]+)(\.{3}|\.(?!\.)|-)?|[\\^$*+.()|\[\]{}]/g, function(m, key, extra) {
        if (key == null) return "\\" + m;
        keys.push({
            k: key,
            r: extra === "..."
        });
        if (extra === "...") return "(.*)";
        if (extra === ".") return "([^/]+)\\.";
        return "([^/]+)" + (extra || "");
    }) + "$");
    return function(data) {
        // First, check the params. Usually, there isn't any, and it's just
        // checking a static set.
        for(var i = 0; i < templateKeys.length; i++){
            if (templateData.params[templateKeys[i]] !== data.params[templateKeys[i]]) return false;
        }
        // If no interpolations exist, let's skip all the ceremony
        if (!keys.length) return regexp.test(data.path);
        var values = regexp.exec(data.path);
        if (values == null) return false;
        for(var i = 0; i < keys.length; i++)data.params[keys[i].k] = keys[i].r ? values[i + 1] : decodeURIComponent(values[i + 1]);
        return true;
    };
};

});

parcelRegister("1Zud9", function(module, exports) {
"use strict";

var $9MCRO = parcelRequire("9MCRO");
// Words in RegExp literals are sometimes mangled incorrectly by the internal bundler, so use RegExp().
var $1732ec3cd5be4a3d$var$magic = new RegExp("^(?:key|oninit|oncreate|onbeforeupdate|onupdate|onbeforeremove|onremove)$");
module.exports = function(attrs, extras) {
    var result = {};
    if (extras != null) {
        for(var key in attrs)if ($9MCRO.call(attrs, key) && !$1732ec3cd5be4a3d$var$magic.test(key) && extras.indexOf(key) < 0) result[key] = attrs[key];
    } else {
        for(var key in attrs)if ($9MCRO.call(attrs, key) && !$1732ec3cd5be4a3d$var$magic.test(key)) result[key] = attrs[key];
    }
    return result;
};

});



function $7bd6d9ddf4a378c5$export$5f0017c582d45a2d(obj) {
    "@swc/helpers - typeof";
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
}


"use strict";
var $162001cafa2b40fd$export$af5de1609f06c8e6 = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];
//polyfill
if (window.NodeList && !NodeList.prototype.forEach) NodeList.prototype.forEach = Array.prototype.forEach;
var $162001cafa2b40fd$export$33d904bed5c25b69 = function geolocation(callback) {
    var n = document.getElementById("side-toast");
    n.style.transform = "translate(0vw,0px)";
    n.innerHTML = "determine position";
    var showPosition = function showPosition(position) {
        callback(position);
        n.style.transform = "translate(-100vw,0px)";
        n.innerHTML = "";
    };
    var error = function error(error) {
        console.log(error.code);
        switch(error.code){
            case error.PERMISSION_DENIED:
                $162001cafa2b40fd$export$6593825dc0f3a767("Location not provided", 2000);
                break;
            case error.POSITION_UNAVAILABLE:
                $162001cafa2b40fd$export$6593825dc0f3a767("Current location not available", 2000);
                break;
            case error.TIMEOUT:
                $162001cafa2b40fd$export$6593825dc0f3a767("Timeout", 2000);
                break;
            default:
                $162001cafa2b40fd$export$6593825dc0f3a767("unknown error", 2000);
                break;
        }
    };
    if (navigator.geolocation) navigator.geolocation.getCurrentPosition(showPosition, error, {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 0
    });
    else $162001cafa2b40fd$export$6593825dc0f3a767("Geolocation is not supported by this browser.", 2000);
};
function $162001cafa2b40fd$var$hashCode(str) {
    var hash = 0;
    for(var i = 0; i < str.length; i++)hash = ~~((hash << 5) - hash + str.charCodeAt(i));
    return hash;
}
function $162001cafa2b40fd$var$intToRGB(i) {
    var c = (i & 0x00ffffff).toString(16).toUpperCase();
    return "00000".substring(0, 6 - c.length) + c;
}
function $162001cafa2b40fd$var$getRandomInteger(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}
function $162001cafa2b40fd$var$share(url) {
    var activity = new MozActivity({
        name: "share",
        data: {
            type: "url",
            url: url
        }
    });
    activity.onsuccess = function() {};
    activity.onerror = function() {
        console.log("The activity encounter en error: " + this.error);
    };
}
//check if internet connection
function $162001cafa2b40fd$var$check_iconnection() {
    function updateOfflineStatus() {
        $162001cafa2b40fd$export$a224d1f4f6f98541("Your Browser is offline", 15000);
        return false;
    }
    window.addEventListener("offline", updateOfflineStatus);
}
function $162001cafa2b40fd$var$delete_file(filename) {
    var sdcard = navigator.getDeviceStorages("sdcard");
    var request = sdcard[1].delete(filename);
    request.onsuccess = function() {
    //toaster("File deleted", 2000);
    };
    request.onerror = function() {
    //toaster("Unable to delete the file: " + this.error, 2000);
    };
}
function $162001cafa2b40fd$var$get_file(filename) {
    var sdcard = navigator.getDeviceStorages("sdcard");
    var request = sdcard[1].get(filename);
    request.onsuccess = function() {
        var file = this.result;
    //alert("Get the file: " + file.name);
    };
    request.onerror = function() {
    //alert("Unable to get the file: " + this.error);
    };
}
function $162001cafa2b40fd$var$write_file(data, filename) {
    var sdcard = navigator.getDeviceStorages("sdcard");
    var file = new Blob([
        data
    ], {
        type: "text/plain"
    });
    var request = sdcard[1].addNamed(file, filename);
    request.onsuccess = function() {
        var name1 = this.result;
    //toaster('File "' + name + '" successfully wrote on the sdcard storage area', 2000);
    };
    // An error typically occur if a file with the same name already exist
    request.onerror = function() {
        $162001cafa2b40fd$export$a224d1f4f6f98541("Unable to write the file: " + this.error, 2000);
    };
}
var $162001cafa2b40fd$export$b04ad9f70842c3f1 = function sort_array(arr, item_key, type) {
    if (type == "date") arr.sort(function(a, b) {
        var da = new Date(a[item_key]), db = new Date(b[item_key]);
        return da - db;
    });
    //sort by number
    if (type == "number") arr.sort(function(a, b) {
        return b[item_key] - a[item_key];
    });
    //sort by string
    if (type == "string") arr.sort(function(a, b) {
        var fa = a[item_key].toLowerCase(), fb = b[item_key].toLowerCase();
        if (fa < fb) return -1;
        if (fa > fb) return 1;
        return 0;
    });
};
var $162001cafa2b40fd$var$uid = function uid() {
    function _p8(s) {
        var p = (Math.random().toString(16) + "000000000").substr(2, 8);
        return s ? "-" + p.substr(0, 4) + "-" + p.substr(4, 4) : p;
    }
    return "greg@" + _p8() + _p8(true) + _p8(true) + _p8();
};
var $162001cafa2b40fd$var$notification = "";
var $162001cafa2b40fd$var$notify = function notify(param_title, param_text, param_silent) {
    var options = {
        body: param_text,
        silent: param_silent,
        requireInteraction: false
    };
    // Let's check whether notification permissions have already been granted
    if (Notification.permission === "granted") // If it's okay let's create a notification
    $162001cafa2b40fd$var$notification = new Notification(param_title, options);
    // Otherwise, we need to ask the user for permission
    if (Notification.permission !== "denied") Notification.requestPermission().then(function(permission) {
        // If the user accepts, let's create a notification
        if (permission === "granted") $162001cafa2b40fd$var$notification = new Notification(param_title, options);
    });
};
//https://notifications.spec.whatwg.org/#dictdef-notificationaction
var $162001cafa2b40fd$var$pushLocalNotification = function pushLocalNotification(title, body) {
    window.Notification.requestPermission().then(function(result) {
        var notification = new window.Notification(title, {
            body: body
        });
        notification.onerror = function(err) {
            console.log(err);
        };
        notification.onclick = function(event) {
            if (window.navigator.mozApps) {
                var request = window.navigator.mozApps.getSelf();
                request.onsuccess = function() {
                    if (request.result) {
                        notification.close();
                        request.result.launch();
                    }
                };
            } else window.open(document.location.origin, "_blank");
        };
        notification.onshow = function() {
        // notification.close();
        };
    });
};
function $162001cafa2b40fd$export$a22775fa5e2eebd9(url) {
    var pattern = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
    if (pattern.test(url)) return true;
    return false;
}
var $162001cafa2b40fd$export$39e873de56f329d8 = function getManifest(callback) {
    if (!navigator.mozApps) //let t = document.getElementById("kaisos-ads");
    //t.remove();
    return false;
    var self = navigator.mozApps.getSelf();
    self.onsuccess = function() {
        callback(self.result);
    };
    self.onerror = function() {};
};
//top toaster
var $162001cafa2b40fd$var$queue = [];
var $162001cafa2b40fd$var$timeout;
var $162001cafa2b40fd$export$a224d1f4f6f98541 = function toaster(text, time) {
    $162001cafa2b40fd$var$queue.push({
        text: text,
        time: time
    });
    if ($162001cafa2b40fd$var$queue.length === 1) $162001cafa2b40fd$var$toast_q(text, time);
};
var $162001cafa2b40fd$var$toast_q = function toast_q1(text, time) {
    var x = document.querySelector("div#toast");
    x.innerHTML = $162001cafa2b40fd$var$queue[0].text;
    x.style.transform = "translate(0px, 0px)";
    $162001cafa2b40fd$var$timeout = setTimeout(function() {
        $162001cafa2b40fd$var$timeout = null;
        x.style.transform = "translate(0px, -100px)";
        $162001cafa2b40fd$var$queue = $162001cafa2b40fd$var$queue.slice(1);
        if ($162001cafa2b40fd$var$queue.length > 0) setTimeout(function() {
            $162001cafa2b40fd$var$toast_q(text, time);
        }, 1000);
    }, time);
};
//side toaster
var $162001cafa2b40fd$var$queue_st = [];
var $162001cafa2b40fd$export$6593825dc0f3a767 = function side_toaster(text, time) {
    $162001cafa2b40fd$var$queue_st.push({
        text: text,
        time: time
    });
    if ($162001cafa2b40fd$var$queue_st.length === 1) $162001cafa2b40fd$var$toast_qq(text, time);
};
var $162001cafa2b40fd$var$toast_qq = function toast_qq1(text, time) {
    var x = document.querySelector("div#side-toast");
    x.innerHTML = $162001cafa2b40fd$var$queue_st[0].text;
    x.style.transform = "translate(0vh, 0px)";
    $162001cafa2b40fd$var$timeout = setTimeout(function() {
        x.style.transform = "translate(-100vw,0px)";
        $162001cafa2b40fd$var$queue_st = $162001cafa2b40fd$var$queue.slice(1);
        if ($162001cafa2b40fd$var$queue_st.length > 0) setTimeout(function() {
            $162001cafa2b40fd$var$toast_qq(text, time);
        }, 1000);
    }, time);
};
var $162001cafa2b40fd$export$247be4ede8e3a24a = function bottom_bar(left, center, right) {
    document.querySelector("div#bottom-bar div#button-left").innerHTML = left;
    document.querySelector("div#bottom-bar div#button-center").innerHTML = center;
    document.querySelector("div#bottom-bar div#button-right").innerHTML = right;
    if (left == "" && center == "" && right == "") document.querySelector("div#bottom-bar").style.display = "none";
    else document.querySelector("div#bottom-bar").style.display = "block";
};
var $162001cafa2b40fd$export$7ce2ea7c45ae9a07 = function top_bar(left, center, right) {
    document.querySelector("div#top-bar div.button-left").innerHTML = left;
    document.querySelector("div#top-bar div.button-center").textContent = center;
    document.querySelector("div#top-bar div.button-right").textContent = right;
    if (left == "" && center == "" && right == "") document.querySelector("div#top-bar").style.display = "none";
    else document.querySelector("div#top-bar").style.display = "block";
};
var $162001cafa2b40fd$var$add_script = function add_script(script) {
    document.body.appendChild(document.createElement("script")).src = script;
};
var $162001cafa2b40fd$var$lock;
var $162001cafa2b40fd$var$screenlock = function screenlock(stat) {
    if (typeof window.navigator.requestWakeLock === "undefined") return false;
    if (stat == "lock") {
        $162001cafa2b40fd$var$lock = window.navigator.requestWakeLock("screen");
        $162001cafa2b40fd$var$lock.onsuccess = function() {};
        $162001cafa2b40fd$var$lock.onerror = function() {
            alert("An error occurred: " + this.error.name);
        };
    }
    if (stat == "unlock") {
        if ($162001cafa2b40fd$var$lock.topic == "screen") $162001cafa2b40fd$var$lock.unlock();
    }
};
//filesize
function $162001cafa2b40fd$var$formatFileSize(bytes, decimalPoint) {
    if (bytes || bytes > 0 || bytes != undefined || bytes != NaN) {
        var k = 1000, dm = decimalPoint || 2, sizes = [
            "Bytes",
            "KB",
            "MB",
            "GB",
            "TB",
            "PB",
            "EB",
            "ZB",
            "YB"
        ], i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
    }
}
var $162001cafa2b40fd$export$6714d0f9237d35de = function pick_image(cb) {
    var activity = new MozActivity({
        name: "pick",
        data: {
            type: [
                "image/png",
                "image/jpg",
                "image/jpeg"
            ]
        }
    });
    activity.onsuccess = function() {
        console.log("success");
        var p = this.result;
        cb(p);
    };
    activity.onerror = function() {
        console.log("The activity encouter en error: " + this.error);
    };
};
function $162001cafa2b40fd$export$dccb98b97a3cb8be(storage, path, notification) {
    var sdcard = navigator.getDeviceStorages("sdcard");
    var requestDel = sdcard[storage].delete(path);
    requestDel.onsuccess = function() {
        if (notification == "notification") helper.toaster('File "' + name + '" successfully deleted frome the sdcard storage area');
    };
    requestDel.onerror = function() {
        helper.toaster("Unable to delete the file: " + this.error);
    };
}


var $39e0152360893de3$exports = {};
(function webpackUniversalModuleDefinition(root, factory) {
    $39e0152360893de3$exports = factory();
})(typeof self !== "undefined" ? self : $39e0152360893de3$exports, function() {
    return /******/ function(modules) {
        /******/ // The module cache
        /******/ var installedModules = {};
        /******/ /******/ // The require function
        /******/ function __webpack_require__(moduleId) {
            /******/ /******/ // Check if module is in cache
            /******/ if (installedModules[moduleId]) /******/ return installedModules[moduleId].exports;
            /******/ // Create a new module (and put it into the cache)
            /******/ var module1 = installedModules[moduleId] = {
                /******/ i: moduleId,
                /******/ l: false,
                /******/ exports: {}
            };
            /******/ /******/ // Execute the module function
            /******/ modules[moduleId].call(module1.exports, module1, module1.exports, __webpack_require__);
            /******/ /******/ // Flag the module as loaded
            /******/ module1.l = true;
            /******/ /******/ // Return the exports of the module
            /******/ return module1.exports;
        /******/ }
        /******/ /******/ /******/ // expose the modules object (__webpack_modules__)
        /******/ __webpack_require__.m = modules;
        /******/ /******/ // expose the module cache
        /******/ __webpack_require__.c = installedModules;
        /******/ /******/ // define getter function for harmony exports
        /******/ __webpack_require__.d = function(exports, name, getter) {
            /******/ if (!__webpack_require__.o(exports, name)) /******/ Object.defineProperty(exports, name, {
                /******/ configurable: false,
                /******/ enumerable: true,
                /******/ get: getter
            });
        /******/ };
        /******/ /******/ // getDefaultExport function for compatibility with non-harmony modules
        /******/ __webpack_require__.n = function(module1) {
            /******/ var getter = module1 && module1.__esModule ? /******/ function getDefault() {
                return module1["default"];
            } : /******/ function getModuleExports() {
                return module1;
            };
            /******/ __webpack_require__.d(getter, "a", getter);
            /******/ return getter;
        /******/ };
        /******/ /******/ // Object.prototype.hasOwnProperty.call
        /******/ __webpack_require__.o = function(object, property) {
            return Object.prototype.hasOwnProperty.call(object, property);
        };
        /******/ /******/ // __webpack_public_path__
        /******/ __webpack_require__.p = "";
        /******/ /******/ // Load entry module and return exports
        /******/ return __webpack_require__(__webpack_require__.s = 3);
    /******/ }([
        /* 0 */ /***/ function(module1, exports, __webpack_require__) {
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            var BitMatrix = /** @class */ function() {
                function BitMatrix(data, width) {
                    this.width = width;
                    this.height = data.length / width;
                    this.data = data;
                }
                BitMatrix.createEmpty = function(width, height) {
                    return new BitMatrix(new Uint8ClampedArray(width * height), width);
                };
                BitMatrix.prototype.get = function(x, y) {
                    if (x < 0 || x >= this.width || y < 0 || y >= this.height) return false;
                    return !!this.data[y * this.width + x];
                };
                BitMatrix.prototype.set = function(x, y, v) {
                    this.data[y * this.width + x] = v ? 1 : 0;
                };
                BitMatrix.prototype.setRegion = function(left, top, width, height, v) {
                    for(var y = top; y < top + height; y++)for(var x = left; x < left + width; x++)this.set(x, y, !!v);
                };
                return BitMatrix;
            }();
            exports.BitMatrix = BitMatrix;
        /***/ },
        /* 1 */ /***/ function(module1, exports, __webpack_require__) {
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            var GenericGFPoly_1 = __webpack_require__(2);
            function addOrSubtractGF(a, b) {
                return a ^ b; // tslint:disable-line:no-bitwise
            }
            exports.addOrSubtractGF = addOrSubtractGF;
            var GenericGF = /** @class */ function() {
                function GenericGF(primitive, size, genBase) {
                    this.primitive = primitive;
                    this.size = size;
                    this.generatorBase = genBase;
                    this.expTable = new Array(this.size);
                    this.logTable = new Array(this.size);
                    var x = 1;
                    for(var i = 0; i < this.size; i++){
                        this.expTable[i] = x;
                        x = x * 2;
                        if (x >= this.size) x = (x ^ this.primitive) & this.size - 1; // tslint:disable-line:no-bitwise
                    }
                    for(var i = 0; i < this.size - 1; i++)this.logTable[this.expTable[i]] = i;
                    this.zero = new GenericGFPoly_1.default(this, Uint8ClampedArray.from([
                        0
                    ]));
                    this.one = new GenericGFPoly_1.default(this, Uint8ClampedArray.from([
                        1
                    ]));
                }
                GenericGF.prototype.multiply = function(a, b) {
                    if (a === 0 || b === 0) return 0;
                    return this.expTable[(this.logTable[a] + this.logTable[b]) % (this.size - 1)];
                };
                GenericGF.prototype.inverse = function(a) {
                    if (a === 0) throw new Error("Can't invert 0");
                    return this.expTable[this.size - this.logTable[a] - 1];
                };
                GenericGF.prototype.buildMonomial = function(degree, coefficient) {
                    if (degree < 0) throw new Error("Invalid monomial degree less than 0");
                    if (coefficient === 0) return this.zero;
                    var coefficients = new Uint8ClampedArray(degree + 1);
                    coefficients[0] = coefficient;
                    return new GenericGFPoly_1.default(this, coefficients);
                };
                GenericGF.prototype.log = function(a) {
                    if (a === 0) throw new Error("Can't take log(0)");
                    return this.logTable[a];
                };
                GenericGF.prototype.exp = function(a) {
                    return this.expTable[a];
                };
                return GenericGF;
            }();
            exports.default = GenericGF;
        /***/ },
        /* 2 */ /***/ function(module1, exports, __webpack_require__) {
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            var GenericGF_1 = __webpack_require__(1);
            var GenericGFPoly = /** @class */ function() {
                function GenericGFPoly(field, coefficients) {
                    if (coefficients.length === 0) throw new Error("No coefficients.");
                    this.field = field;
                    var coefficientsLength = coefficients.length;
                    if (coefficientsLength > 1 && coefficients[0] === 0) {
                        // Leading term must be non-zero for anything except the constant polynomial "0"
                        var firstNonZero = 1;
                        while(firstNonZero < coefficientsLength && coefficients[firstNonZero] === 0)firstNonZero++;
                        if (firstNonZero === coefficientsLength) this.coefficients = field.zero.coefficients;
                        else {
                            this.coefficients = new Uint8ClampedArray(coefficientsLength - firstNonZero);
                            for(var i = 0; i < this.coefficients.length; i++)this.coefficients[i] = coefficients[firstNonZero + i];
                        }
                    } else this.coefficients = coefficients;
                }
                GenericGFPoly.prototype.degree = function() {
                    return this.coefficients.length - 1;
                };
                GenericGFPoly.prototype.isZero = function() {
                    return this.coefficients[0] === 0;
                };
                GenericGFPoly.prototype.getCoefficient = function(degree) {
                    return this.coefficients[this.coefficients.length - 1 - degree];
                };
                GenericGFPoly.prototype.addOrSubtract = function(other) {
                    var _a;
                    if (this.isZero()) return other;
                    if (other.isZero()) return this;
                    var smallerCoefficients = this.coefficients;
                    var largerCoefficients = other.coefficients;
                    if (smallerCoefficients.length > largerCoefficients.length) _a = [
                        largerCoefficients,
                        smallerCoefficients
                    ], smallerCoefficients = _a[0], largerCoefficients = _a[1];
                    var sumDiff = new Uint8ClampedArray(largerCoefficients.length);
                    var lengthDiff = largerCoefficients.length - smallerCoefficients.length;
                    for(var i = 0; i < lengthDiff; i++)sumDiff[i] = largerCoefficients[i];
                    for(var i = lengthDiff; i < largerCoefficients.length; i++)sumDiff[i] = GenericGF_1.addOrSubtractGF(smallerCoefficients[i - lengthDiff], largerCoefficients[i]);
                    return new GenericGFPoly(this.field, sumDiff);
                };
                GenericGFPoly.prototype.multiply = function(scalar) {
                    if (scalar === 0) return this.field.zero;
                    if (scalar === 1) return this;
                    var size = this.coefficients.length;
                    var product = new Uint8ClampedArray(size);
                    for(var i = 0; i < size; i++)product[i] = this.field.multiply(this.coefficients[i], scalar);
                    return new GenericGFPoly(this.field, product);
                };
                GenericGFPoly.prototype.multiplyPoly = function(other) {
                    if (this.isZero() || other.isZero()) return this.field.zero;
                    var aCoefficients = this.coefficients;
                    var aLength = aCoefficients.length;
                    var bCoefficients = other.coefficients;
                    var bLength = bCoefficients.length;
                    var product = new Uint8ClampedArray(aLength + bLength - 1);
                    for(var i = 0; i < aLength; i++){
                        var aCoeff = aCoefficients[i];
                        for(var j = 0; j < bLength; j++)product[i + j] = GenericGF_1.addOrSubtractGF(product[i + j], this.field.multiply(aCoeff, bCoefficients[j]));
                    }
                    return new GenericGFPoly(this.field, product);
                };
                GenericGFPoly.prototype.multiplyByMonomial = function(degree, coefficient) {
                    if (degree < 0) throw new Error("Invalid degree less than 0");
                    if (coefficient === 0) return this.field.zero;
                    var size = this.coefficients.length;
                    var product = new Uint8ClampedArray(size + degree);
                    for(var i = 0; i < size; i++)product[i] = this.field.multiply(this.coefficients[i], coefficient);
                    return new GenericGFPoly(this.field, product);
                };
                GenericGFPoly.prototype.evaluateAt = function(a) {
                    var result = 0;
                    if (a === 0) // Just return the x^0 coefficient
                    return this.getCoefficient(0);
                    var size = this.coefficients.length;
                    if (a === 1) {
                        // Just the sum of the coefficients
                        this.coefficients.forEach(function(coefficient) {
                            result = GenericGF_1.addOrSubtractGF(result, coefficient);
                        });
                        return result;
                    }
                    result = this.coefficients[0];
                    for(var i = 1; i < size; i++)result = GenericGF_1.addOrSubtractGF(this.field.multiply(a, result), this.coefficients[i]);
                    return result;
                };
                return GenericGFPoly;
            }();
            exports.default = GenericGFPoly;
        /***/ },
        /* 3 */ /***/ function(module1, exports, __webpack_require__) {
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            var binarizer_1 = __webpack_require__(4);
            var decoder_1 = __webpack_require__(5);
            var extractor_1 = __webpack_require__(11);
            var locator_1 = __webpack_require__(12);
            function scan(matrix) {
                var locations = locator_1.locate(matrix);
                if (!locations) return null;
                for(var _i = 0, locations_1 = locations; _i < locations_1.length; _i++){
                    var location_1 = locations_1[_i];
                    var extracted = extractor_1.extract(matrix, location_1);
                    var decoded = decoder_1.decode(extracted.matrix);
                    if (decoded) return {
                        binaryData: decoded.bytes,
                        data: decoded.text,
                        chunks: decoded.chunks,
                        version: decoded.version,
                        location: {
                            topRightCorner: extracted.mappingFunction(location_1.dimension, 0),
                            topLeftCorner: extracted.mappingFunction(0, 0),
                            bottomRightCorner: extracted.mappingFunction(location_1.dimension, location_1.dimension),
                            bottomLeftCorner: extracted.mappingFunction(0, location_1.dimension),
                            topRightFinderPattern: location_1.topRight,
                            topLeftFinderPattern: location_1.topLeft,
                            bottomLeftFinderPattern: location_1.bottomLeft,
                            bottomRightAlignmentPattern: location_1.alignmentPattern
                        }
                    };
                }
                return null;
            }
            var defaultOptions = {
                inversionAttempts: "attemptBoth"
            };
            function jsQR(data, width, height, providedOptions) {
                if (providedOptions === void 0) providedOptions = {};
                var options = defaultOptions;
                Object.keys(options || {}).forEach(function(opt) {
                    options[opt] = providedOptions[opt] || options[opt];
                });
                var shouldInvert = options.inversionAttempts === "attemptBoth" || options.inversionAttempts === "invertFirst";
                var tryInvertedFirst = options.inversionAttempts === "onlyInvert" || options.inversionAttempts === "invertFirst";
                var _a = binarizer_1.binarize(data, width, height, shouldInvert), binarized = _a.binarized, inverted = _a.inverted;
                var result = scan(tryInvertedFirst ? inverted : binarized);
                if (!result && (options.inversionAttempts === "attemptBoth" || options.inversionAttempts === "invertFirst")) result = scan(tryInvertedFirst ? binarized : inverted);
                return result;
            }
            jsQR.default = jsQR;
            exports.default = jsQR;
        /***/ },
        /* 4 */ /***/ function(module1, exports, __webpack_require__) {
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            var BitMatrix_1 = __webpack_require__(0);
            var REGION_SIZE = 8;
            var MIN_DYNAMIC_RANGE = 24;
            function numBetween(value, min, max) {
                return value < min ? min : value > max ? max : value;
            }
            // Like BitMatrix but accepts arbitry Uint8 values
            var Matrix = /** @class */ function() {
                function Matrix(width, height) {
                    this.width = width;
                    this.data = new Uint8ClampedArray(width * height);
                }
                Matrix.prototype.get = function(x, y) {
                    return this.data[y * this.width + x];
                };
                Matrix.prototype.set = function(x, y, value) {
                    this.data[y * this.width + x] = value;
                };
                return Matrix;
            }();
            function binarize(data, width, height, returnInverted) {
                if (data.length !== width * height * 4) throw new Error("Malformed data passed to binarizer.");
                // Convert image to greyscale
                var greyscalePixels = new Matrix(width, height);
                for(var x = 0; x < width; x++)for(var y = 0; y < height; y++){
                    var r = data[(y * width + x) * 4 + 0];
                    var g = data[(y * width + x) * 4 + 1];
                    var b = data[(y * width + x) * 4 + 2];
                    greyscalePixels.set(x, y, 0.2126 * r + 0.7152 * g + 0.0722 * b);
                }
                var horizontalRegionCount = Math.ceil(width / REGION_SIZE);
                var verticalRegionCount = Math.ceil(height / REGION_SIZE);
                var blackPoints = new Matrix(horizontalRegionCount, verticalRegionCount);
                for(var verticalRegion = 0; verticalRegion < verticalRegionCount; verticalRegion++)for(var hortizontalRegion = 0; hortizontalRegion < horizontalRegionCount; hortizontalRegion++){
                    var sum = 0;
                    var min = Infinity;
                    var max = 0;
                    for(var y = 0; y < REGION_SIZE; y++)for(var x = 0; x < REGION_SIZE; x++){
                        var pixelLumosity = greyscalePixels.get(hortizontalRegion * REGION_SIZE + x, verticalRegion * REGION_SIZE + y);
                        sum += pixelLumosity;
                        min = Math.min(min, pixelLumosity);
                        max = Math.max(max, pixelLumosity);
                    }
                    var average = sum / Math.pow(REGION_SIZE, 2);
                    if (max - min <= MIN_DYNAMIC_RANGE) {
                        // If variation within the block is low, assume this is a block with only light or only
                        // dark pixels. In that case we do not want to use the average, as it would divide this
                        // low contrast area into black and white pixels, essentially creating data out of noise.
                        //
                        // Default the blackpoint for these blocks to be half the min - effectively white them out
                        average = min / 2;
                        if (verticalRegion > 0 && hortizontalRegion > 0) {
                            // Correct the "white background" assumption for blocks that have neighbors by comparing
                            // the pixels in this block to the previously calculated black points. This is based on
                            // the fact that dark barcode symbology is always surrounded by some amount of light
                            // background for which reasonable black point estimates were made. The bp estimated at
                            // the boundaries is used for the interior.
                            // The (min < bp) is arbitrary but works better than other heuristics that were tried.
                            var averageNeighborBlackPoint = (blackPoints.get(hortizontalRegion, verticalRegion - 1) + 2 * blackPoints.get(hortizontalRegion - 1, verticalRegion) + blackPoints.get(hortizontalRegion - 1, verticalRegion - 1)) / 4;
                            if (min < averageNeighborBlackPoint) average = averageNeighborBlackPoint;
                        }
                    }
                    blackPoints.set(hortizontalRegion, verticalRegion, average);
                }
                var binarized = BitMatrix_1.BitMatrix.createEmpty(width, height);
                var inverted = null;
                if (returnInverted) inverted = BitMatrix_1.BitMatrix.createEmpty(width, height);
                for(var verticalRegion = 0; verticalRegion < verticalRegionCount; verticalRegion++)for(var hortizontalRegion = 0; hortizontalRegion < horizontalRegionCount; hortizontalRegion++){
                    var left = numBetween(hortizontalRegion, 2, horizontalRegionCount - 3);
                    var top_1 = numBetween(verticalRegion, 2, verticalRegionCount - 3);
                    var sum = 0;
                    for(var xRegion = -2; xRegion <= 2; xRegion++)for(var yRegion = -2; yRegion <= 2; yRegion++)sum += blackPoints.get(left + xRegion, top_1 + yRegion);
                    var threshold = sum / 25;
                    for(var xRegion = 0; xRegion < REGION_SIZE; xRegion++)for(var yRegion = 0; yRegion < REGION_SIZE; yRegion++){
                        var x = hortizontalRegion * REGION_SIZE + xRegion;
                        var y = verticalRegion * REGION_SIZE + yRegion;
                        var lum = greyscalePixels.get(x, y);
                        binarized.set(x, y, lum <= threshold);
                        if (returnInverted) inverted.set(x, y, !(lum <= threshold));
                    }
                }
                if (returnInverted) return {
                    binarized: binarized,
                    inverted: inverted
                };
                return {
                    binarized: binarized
                };
            }
            exports.binarize = binarize;
        /***/ },
        /* 5 */ /***/ function(module1, exports, __webpack_require__) {
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            var BitMatrix_1 = __webpack_require__(0);
            var decodeData_1 = __webpack_require__(6);
            var reedsolomon_1 = __webpack_require__(9);
            var version_1 = __webpack_require__(10);
            // tslint:disable:no-bitwise
            function numBitsDiffering(x, y) {
                var z = x ^ y;
                var bitCount = 0;
                while(z){
                    bitCount++;
                    z &= z - 1;
                }
                return bitCount;
            }
            function pushBit(bit, byte) {
                return byte << 1 | bit;
            }
            // tslint:enable:no-bitwise
            var FORMAT_INFO_TABLE = [
                {
                    bits: 0x5412,
                    formatInfo: {
                        errorCorrectionLevel: 1,
                        dataMask: 0
                    }
                },
                {
                    bits: 0x5125,
                    formatInfo: {
                        errorCorrectionLevel: 1,
                        dataMask: 1
                    }
                },
                {
                    bits: 0x5E7C,
                    formatInfo: {
                        errorCorrectionLevel: 1,
                        dataMask: 2
                    }
                },
                {
                    bits: 0x5B4B,
                    formatInfo: {
                        errorCorrectionLevel: 1,
                        dataMask: 3
                    }
                },
                {
                    bits: 0x45F9,
                    formatInfo: {
                        errorCorrectionLevel: 1,
                        dataMask: 4
                    }
                },
                {
                    bits: 0x40CE,
                    formatInfo: {
                        errorCorrectionLevel: 1,
                        dataMask: 5
                    }
                },
                {
                    bits: 0x4F97,
                    formatInfo: {
                        errorCorrectionLevel: 1,
                        dataMask: 6
                    }
                },
                {
                    bits: 0x4AA0,
                    formatInfo: {
                        errorCorrectionLevel: 1,
                        dataMask: 7
                    }
                },
                {
                    bits: 0x77C4,
                    formatInfo: {
                        errorCorrectionLevel: 0,
                        dataMask: 0
                    }
                },
                {
                    bits: 0x72F3,
                    formatInfo: {
                        errorCorrectionLevel: 0,
                        dataMask: 1
                    }
                },
                {
                    bits: 0x7DAA,
                    formatInfo: {
                        errorCorrectionLevel: 0,
                        dataMask: 2
                    }
                },
                {
                    bits: 0x789D,
                    formatInfo: {
                        errorCorrectionLevel: 0,
                        dataMask: 3
                    }
                },
                {
                    bits: 0x662F,
                    formatInfo: {
                        errorCorrectionLevel: 0,
                        dataMask: 4
                    }
                },
                {
                    bits: 0x6318,
                    formatInfo: {
                        errorCorrectionLevel: 0,
                        dataMask: 5
                    }
                },
                {
                    bits: 0x6C41,
                    formatInfo: {
                        errorCorrectionLevel: 0,
                        dataMask: 6
                    }
                },
                {
                    bits: 0x6976,
                    formatInfo: {
                        errorCorrectionLevel: 0,
                        dataMask: 7
                    }
                },
                {
                    bits: 0x1689,
                    formatInfo: {
                        errorCorrectionLevel: 3,
                        dataMask: 0
                    }
                },
                {
                    bits: 0x13BE,
                    formatInfo: {
                        errorCorrectionLevel: 3,
                        dataMask: 1
                    }
                },
                {
                    bits: 0x1CE7,
                    formatInfo: {
                        errorCorrectionLevel: 3,
                        dataMask: 2
                    }
                },
                {
                    bits: 0x19D0,
                    formatInfo: {
                        errorCorrectionLevel: 3,
                        dataMask: 3
                    }
                },
                {
                    bits: 0x0762,
                    formatInfo: {
                        errorCorrectionLevel: 3,
                        dataMask: 4
                    }
                },
                {
                    bits: 0x0255,
                    formatInfo: {
                        errorCorrectionLevel: 3,
                        dataMask: 5
                    }
                },
                {
                    bits: 0x0D0C,
                    formatInfo: {
                        errorCorrectionLevel: 3,
                        dataMask: 6
                    }
                },
                {
                    bits: 0x083B,
                    formatInfo: {
                        errorCorrectionLevel: 3,
                        dataMask: 7
                    }
                },
                {
                    bits: 0x355F,
                    formatInfo: {
                        errorCorrectionLevel: 2,
                        dataMask: 0
                    }
                },
                {
                    bits: 0x3068,
                    formatInfo: {
                        errorCorrectionLevel: 2,
                        dataMask: 1
                    }
                },
                {
                    bits: 0x3F31,
                    formatInfo: {
                        errorCorrectionLevel: 2,
                        dataMask: 2
                    }
                },
                {
                    bits: 0x3A06,
                    formatInfo: {
                        errorCorrectionLevel: 2,
                        dataMask: 3
                    }
                },
                {
                    bits: 0x24B4,
                    formatInfo: {
                        errorCorrectionLevel: 2,
                        dataMask: 4
                    }
                },
                {
                    bits: 0x2183,
                    formatInfo: {
                        errorCorrectionLevel: 2,
                        dataMask: 5
                    }
                },
                {
                    bits: 0x2EDA,
                    formatInfo: {
                        errorCorrectionLevel: 2,
                        dataMask: 6
                    }
                },
                {
                    bits: 0x2BED,
                    formatInfo: {
                        errorCorrectionLevel: 2,
                        dataMask: 7
                    }
                }
            ];
            var DATA_MASKS = [
                function(p) {
                    return (p.y + p.x) % 2 === 0;
                },
                function(p) {
                    return p.y % 2 === 0;
                },
                function(p) {
                    return p.x % 3 === 0;
                },
                function(p) {
                    return (p.y + p.x) % 3 === 0;
                },
                function(p) {
                    return (Math.floor(p.y / 2) + Math.floor(p.x / 3)) % 2 === 0;
                },
                function(p) {
                    return p.x * p.y % 2 + p.x * p.y % 3 === 0;
                },
                function(p) {
                    return (p.y * p.x % 2 + p.y * p.x % 3) % 2 === 0;
                },
                function(p) {
                    return ((p.y + p.x) % 2 + p.y * p.x % 3) % 2 === 0;
                }
            ];
            function buildFunctionPatternMask(version) {
                var dimension = 17 + 4 * version.versionNumber;
                var matrix = BitMatrix_1.BitMatrix.createEmpty(dimension, dimension);
                matrix.setRegion(0, 0, 9, 9, true); // Top left finder pattern + separator + format
                matrix.setRegion(dimension - 8, 0, 8, 9, true); // Top right finder pattern + separator + format
                matrix.setRegion(0, dimension - 8, 9, 8, true); // Bottom left finder pattern + separator + format
                // Alignment patterns
                for(var _i = 0, _a = version.alignmentPatternCenters; _i < _a.length; _i++){
                    var x = _a[_i];
                    for(var _b = 0, _c = version.alignmentPatternCenters; _b < _c.length; _b++){
                        var y = _c[_b];
                        if (!(x === 6 && y === 6 || x === 6 && y === dimension - 7 || x === dimension - 7 && y === 6)) matrix.setRegion(x - 2, y - 2, 5, 5, true);
                    }
                }
                matrix.setRegion(6, 9, 1, dimension - 17, true); // Vertical timing pattern
                matrix.setRegion(9, 6, dimension - 17, 1, true); // Horizontal timing pattern
                if (version.versionNumber > 6) {
                    matrix.setRegion(dimension - 11, 0, 3, 6, true); // Version info, top right
                    matrix.setRegion(0, dimension - 11, 6, 3, true); // Version info, bottom left
                }
                return matrix;
            }
            function readCodewords(matrix, version, formatInfo) {
                var dataMask = DATA_MASKS[formatInfo.dataMask];
                var dimension = matrix.height;
                var functionPatternMask = buildFunctionPatternMask(version);
                var codewords = [];
                var currentByte = 0;
                var bitsRead = 0;
                // Read columns in pairs, from right to left
                var readingUp = true;
                for(var columnIndex = dimension - 1; columnIndex > 0; columnIndex -= 2){
                    if (columnIndex === 6) columnIndex--;
                    for(var i = 0; i < dimension; i++){
                        var y = readingUp ? dimension - 1 - i : i;
                        for(var columnOffset = 0; columnOffset < 2; columnOffset++){
                            var x = columnIndex - columnOffset;
                            if (!functionPatternMask.get(x, y)) {
                                bitsRead++;
                                var bit = matrix.get(x, y);
                                if (dataMask({
                                    y: y,
                                    x: x
                                })) bit = !bit;
                                currentByte = pushBit(bit, currentByte);
                                if (bitsRead === 8) {
                                    codewords.push(currentByte);
                                    bitsRead = 0;
                                    currentByte = 0;
                                }
                            }
                        }
                    }
                    readingUp = !readingUp;
                }
                return codewords;
            }
            function readVersion(matrix) {
                var dimension = matrix.height;
                var provisionalVersion = Math.floor((dimension - 17) / 4);
                if (provisionalVersion <= 6) return version_1.VERSIONS[provisionalVersion - 1];
                var topRightVersionBits = 0;
                for(var y = 5; y >= 0; y--)for(var x = dimension - 9; x >= dimension - 11; x--)topRightVersionBits = pushBit(matrix.get(x, y), topRightVersionBits);
                var bottomLeftVersionBits = 0;
                for(var x = 5; x >= 0; x--)for(var y = dimension - 9; y >= dimension - 11; y--)bottomLeftVersionBits = pushBit(matrix.get(x, y), bottomLeftVersionBits);
                var bestDifference = Infinity;
                var bestVersion;
                for(var _i = 0, VERSIONS_1 = version_1.VERSIONS; _i < VERSIONS_1.length; _i++){
                    var version = VERSIONS_1[_i];
                    if (version.infoBits === topRightVersionBits || version.infoBits === bottomLeftVersionBits) return version;
                    var difference = numBitsDiffering(topRightVersionBits, version.infoBits);
                    if (difference < bestDifference) {
                        bestVersion = version;
                        bestDifference = difference;
                    }
                    difference = numBitsDiffering(bottomLeftVersionBits, version.infoBits);
                    if (difference < bestDifference) {
                        bestVersion = version;
                        bestDifference = difference;
                    }
                }
                // We can tolerate up to 3 bits of error since no two version info codewords will
                // differ in less than 8 bits.
                if (bestDifference <= 3) return bestVersion;
            }
            function readFormatInformation(matrix) {
                var topLeftFormatInfoBits = 0;
                for(var x = 0; x <= 8; x++)if (x !== 6) topLeftFormatInfoBits = pushBit(matrix.get(x, 8), topLeftFormatInfoBits);
                for(var y = 7; y >= 0; y--)if (y !== 6) topLeftFormatInfoBits = pushBit(matrix.get(8, y), topLeftFormatInfoBits);
                var dimension = matrix.height;
                var topRightBottomRightFormatInfoBits = 0;
                for(var y = dimension - 1; y >= dimension - 7; y--)topRightBottomRightFormatInfoBits = pushBit(matrix.get(8, y), topRightBottomRightFormatInfoBits);
                for(var x = dimension - 8; x < dimension; x++)topRightBottomRightFormatInfoBits = pushBit(matrix.get(x, 8), topRightBottomRightFormatInfoBits);
                var bestDifference = Infinity;
                var bestFormatInfo = null;
                for(var _i = 0, FORMAT_INFO_TABLE_1 = FORMAT_INFO_TABLE; _i < FORMAT_INFO_TABLE_1.length; _i++){
                    var _a = FORMAT_INFO_TABLE_1[_i], bits = _a.bits, formatInfo = _a.formatInfo;
                    if (bits === topLeftFormatInfoBits || bits === topRightBottomRightFormatInfoBits) return formatInfo;
                    var difference = numBitsDiffering(topLeftFormatInfoBits, bits);
                    if (difference < bestDifference) {
                        bestFormatInfo = formatInfo;
                        bestDifference = difference;
                    }
                    if (topLeftFormatInfoBits !== topRightBottomRightFormatInfoBits) {
                        difference = numBitsDiffering(topRightBottomRightFormatInfoBits, bits);
                        if (difference < bestDifference) {
                            bestFormatInfo = formatInfo;
                            bestDifference = difference;
                        }
                    }
                }
                // Hamming distance of the 32 masked codes is 7, by construction, so <= 3 bits differing means we found a match
                if (bestDifference <= 3) return bestFormatInfo;
                return null;
            }
            function getDataBlocks(codewords, version, ecLevel) {
                var ecInfo = version.errorCorrectionLevels[ecLevel];
                var dataBlocks = [];
                var totalCodewords = 0;
                ecInfo.ecBlocks.forEach(function(block) {
                    for(var i = 0; i < block.numBlocks; i++){
                        dataBlocks.push({
                            numDataCodewords: block.dataCodewordsPerBlock,
                            codewords: []
                        });
                        totalCodewords += block.dataCodewordsPerBlock + ecInfo.ecCodewordsPerBlock;
                    }
                });
                // In some cases the QR code will be malformed enough that we pull off more or less than we should.
                // If we pull off less there's nothing we can do.
                // If we pull off more we can safely truncate
                if (codewords.length < totalCodewords) return null;
                codewords = codewords.slice(0, totalCodewords);
                var shortBlockSize = ecInfo.ecBlocks[0].dataCodewordsPerBlock;
                // Pull codewords to fill the blocks up to the minimum size
                for(var i = 0; i < shortBlockSize; i++)for(var _i = 0, dataBlocks_1 = dataBlocks; _i < dataBlocks_1.length; _i++){
                    var dataBlock = dataBlocks_1[_i];
                    dataBlock.codewords.push(codewords.shift());
                }
                // If there are any large blocks, pull codewords to fill the last element of those
                if (ecInfo.ecBlocks.length > 1) {
                    var smallBlockCount = ecInfo.ecBlocks[0].numBlocks;
                    var largeBlockCount = ecInfo.ecBlocks[1].numBlocks;
                    for(var i = 0; i < largeBlockCount; i++)dataBlocks[smallBlockCount + i].codewords.push(codewords.shift());
                }
                // Add the rest of the codewords to the blocks. These are the error correction codewords.
                while(codewords.length > 0)for(var _a = 0, dataBlocks_2 = dataBlocks; _a < dataBlocks_2.length; _a++){
                    var dataBlock = dataBlocks_2[_a];
                    dataBlock.codewords.push(codewords.shift());
                }
                return dataBlocks;
            }
            function decodeMatrix(matrix) {
                var version = readVersion(matrix);
                if (!version) return null;
                var formatInfo = readFormatInformation(matrix);
                if (!formatInfo) return null;
                var codewords = readCodewords(matrix, version, formatInfo);
                var dataBlocks = getDataBlocks(codewords, version, formatInfo.errorCorrectionLevel);
                if (!dataBlocks) return null;
                // Count total number of data bytes
                var totalBytes = dataBlocks.reduce(function(a, b) {
                    return a + b.numDataCodewords;
                }, 0);
                var resultBytes = new Uint8ClampedArray(totalBytes);
                var resultIndex = 0;
                for(var _i = 0, dataBlocks_3 = dataBlocks; _i < dataBlocks_3.length; _i++){
                    var dataBlock = dataBlocks_3[_i];
                    var correctedBytes = reedsolomon_1.decode(dataBlock.codewords, dataBlock.codewords.length - dataBlock.numDataCodewords);
                    if (!correctedBytes) return null;
                    for(var i = 0; i < dataBlock.numDataCodewords; i++)resultBytes[resultIndex++] = correctedBytes[i];
                }
                try {
                    return decodeData_1.decode(resultBytes, version.versionNumber);
                } catch (_a) {
                    return null;
                }
            }
            function decode(matrix) {
                if (matrix == null) return null;
                var result = decodeMatrix(matrix);
                if (result) return result;
                // Decoding didn't work, try mirroring the QR across the topLeft -> bottomRight line.
                for(var x = 0; x < matrix.width; x++){
                    for(var y = x + 1; y < matrix.height; y++)if (matrix.get(x, y) !== matrix.get(y, x)) {
                        matrix.set(x, y, !matrix.get(x, y));
                        matrix.set(y, x, !matrix.get(y, x));
                    }
                }
                return decodeMatrix(matrix);
            }
            exports.decode = decode;
        /***/ },
        /* 6 */ /***/ function(module1, exports, __webpack_require__) {
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            // tslint:disable:no-bitwise
            var BitStream_1 = __webpack_require__(7);
            var shiftJISTable_1 = __webpack_require__(8);
            var Mode;
            (function(Mode) {
                Mode["Numeric"] = "numeric";
                Mode["Alphanumeric"] = "alphanumeric";
                Mode["Byte"] = "byte";
                Mode["Kanji"] = "kanji";
                Mode["ECI"] = "eci";
            })(Mode = exports.Mode || (exports.Mode = {}));
            var ModeByte;
            (function(ModeByte) {
                ModeByte[ModeByte["Terminator"] = 0] = "Terminator";
                ModeByte[ModeByte["Numeric"] = 1] = "Numeric";
                ModeByte[ModeByte["Alphanumeric"] = 2] = "Alphanumeric";
                ModeByte[ModeByte["Byte"] = 4] = "Byte";
                ModeByte[ModeByte["Kanji"] = 8] = "Kanji";
                ModeByte[ModeByte["ECI"] = 7] = "ECI";
            // StructuredAppend = 0x3,
            // FNC1FirstPosition = 0x5,
            // FNC1SecondPosition = 0x9,
            })(ModeByte || (ModeByte = {}));
            function decodeNumeric(stream, size) {
                var bytes = [];
                var text = "";
                var characterCountSize = [
                    10,
                    12,
                    14
                ][size];
                var length = stream.readBits(characterCountSize);
                // Read digits in groups of 3
                while(length >= 3){
                    var num = stream.readBits(10);
                    if (num >= 1000) throw new Error("Invalid numeric value above 999");
                    var a = Math.floor(num / 100);
                    var b = Math.floor(num / 10) % 10;
                    var c = num % 10;
                    bytes.push(48 + a, 48 + b, 48 + c);
                    text += a.toString() + b.toString() + c.toString();
                    length -= 3;
                }
                // If the number of digits aren't a multiple of 3, the remaining digits are special cased.
                if (length === 2) {
                    var num = stream.readBits(7);
                    if (num >= 100) throw new Error("Invalid numeric value above 99");
                    var a = Math.floor(num / 10);
                    var b = num % 10;
                    bytes.push(48 + a, 48 + b);
                    text += a.toString() + b.toString();
                } else if (length === 1) {
                    var num = stream.readBits(4);
                    if (num >= 10) throw new Error("Invalid numeric value above 9");
                    bytes.push(48 + num);
                    text += num.toString();
                }
                return {
                    bytes: bytes,
                    text: text
                };
            }
            var AlphanumericCharacterCodes = [
                "0",
                "1",
                "2",
                "3",
                "4",
                "5",
                "6",
                "7",
                "8",
                "9",
                "A",
                "B",
                "C",
                "D",
                "E",
                "F",
                "G",
                "H",
                "I",
                "J",
                "K",
                "L",
                "M",
                "N",
                "O",
                "P",
                "Q",
                "R",
                "S",
                "T",
                "U",
                "V",
                "W",
                "X",
                "Y",
                "Z",
                " ",
                "$",
                "%",
                "*",
                "+",
                "-",
                ".",
                "/",
                ":"
            ];
            function decodeAlphanumeric(stream, size) {
                var bytes = [];
                var text = "";
                var characterCountSize = [
                    9,
                    11,
                    13
                ][size];
                var length = stream.readBits(characterCountSize);
                while(length >= 2){
                    var v = stream.readBits(11);
                    var a = Math.floor(v / 45);
                    var b = v % 45;
                    bytes.push(AlphanumericCharacterCodes[a].charCodeAt(0), AlphanumericCharacterCodes[b].charCodeAt(0));
                    text += AlphanumericCharacterCodes[a] + AlphanumericCharacterCodes[b];
                    length -= 2;
                }
                if (length === 1) {
                    var a = stream.readBits(6);
                    bytes.push(AlphanumericCharacterCodes[a].charCodeAt(0));
                    text += AlphanumericCharacterCodes[a];
                }
                return {
                    bytes: bytes,
                    text: text
                };
            }
            function decodeByte(stream, size) {
                var bytes = [];
                var text = "";
                var characterCountSize = [
                    8,
                    16,
                    16
                ][size];
                var length = stream.readBits(characterCountSize);
                for(var i = 0; i < length; i++){
                    var b = stream.readBits(8);
                    bytes.push(b);
                }
                try {
                    text += decodeURIComponent(bytes.map(function(b) {
                        return "%" + ("0" + b.toString(16)).substr(-2);
                    }).join(""));
                } catch (_a) {
                // failed to decode
                }
                return {
                    bytes: bytes,
                    text: text
                };
            }
            function decodeKanji(stream, size) {
                var bytes = [];
                var text = "";
                var characterCountSize = [
                    8,
                    10,
                    12
                ][size];
                var length = stream.readBits(characterCountSize);
                for(var i = 0; i < length; i++){
                    var k = stream.readBits(13);
                    var c = Math.floor(k / 0xC0) << 8 | k % 0xC0;
                    if (c < 0x1F00) c += 0x8140;
                    else c += 0xC140;
                    bytes.push(c >> 8, c & 0xFF);
                    text += String.fromCharCode(shiftJISTable_1.shiftJISTable[c]);
                }
                return {
                    bytes: bytes,
                    text: text
                };
            }
            function decode(data, version) {
                var _a, _b, _c, _d;
                var stream = new BitStream_1.BitStream(data);
                // There are 3 'sizes' based on the version. 1-9 is small (0), 10-26 is medium (1) and 27-40 is large (2).
                var size = version <= 9 ? 0 : version <= 26 ? 1 : 2;
                var result = {
                    text: "",
                    bytes: [],
                    chunks: [],
                    version: version
                };
                while(stream.available() >= 4){
                    var mode = stream.readBits(4);
                    if (mode === ModeByte.Terminator) return result;
                    else if (mode === ModeByte.ECI) {
                        if (stream.readBits(1) === 0) result.chunks.push({
                            type: Mode.ECI,
                            assignmentNumber: stream.readBits(7)
                        });
                        else if (stream.readBits(1) === 0) result.chunks.push({
                            type: Mode.ECI,
                            assignmentNumber: stream.readBits(14)
                        });
                        else if (stream.readBits(1) === 0) result.chunks.push({
                            type: Mode.ECI,
                            assignmentNumber: stream.readBits(21)
                        });
                        else // ECI data seems corrupted
                        result.chunks.push({
                            type: Mode.ECI,
                            assignmentNumber: -1
                        });
                    } else if (mode === ModeByte.Numeric) {
                        var numericResult = decodeNumeric(stream, size);
                        result.text += numericResult.text;
                        (_a = result.bytes).push.apply(_a, numericResult.bytes);
                        result.chunks.push({
                            type: Mode.Numeric,
                            text: numericResult.text
                        });
                    } else if (mode === ModeByte.Alphanumeric) {
                        var alphanumericResult = decodeAlphanumeric(stream, size);
                        result.text += alphanumericResult.text;
                        (_b = result.bytes).push.apply(_b, alphanumericResult.bytes);
                        result.chunks.push({
                            type: Mode.Alphanumeric,
                            text: alphanumericResult.text
                        });
                    } else if (mode === ModeByte.Byte) {
                        var byteResult = decodeByte(stream, size);
                        result.text += byteResult.text;
                        (_c = result.bytes).push.apply(_c, byteResult.bytes);
                        result.chunks.push({
                            type: Mode.Byte,
                            bytes: byteResult.bytes,
                            text: byteResult.text
                        });
                    } else if (mode === ModeByte.Kanji) {
                        var kanjiResult = decodeKanji(stream, size);
                        result.text += kanjiResult.text;
                        (_d = result.bytes).push.apply(_d, kanjiResult.bytes);
                        result.chunks.push({
                            type: Mode.Kanji,
                            bytes: kanjiResult.bytes,
                            text: kanjiResult.text
                        });
                    }
                }
                // If there is no data left, or the remaining bits are all 0, then that counts as a termination marker
                if (stream.available() === 0 || stream.readBits(stream.available()) === 0) return result;
            }
            exports.decode = decode;
        /***/ },
        /* 7 */ /***/ function(module1, exports, __webpack_require__) {
            "use strict";
            // tslint:disable:no-bitwise
            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            var BitStream = /** @class */ function() {
                function BitStream(bytes) {
                    this.byteOffset = 0;
                    this.bitOffset = 0;
                    this.bytes = bytes;
                }
                BitStream.prototype.readBits = function(numBits) {
                    if (numBits < 1 || numBits > 32 || numBits > this.available()) throw new Error("Cannot read " + numBits.toString() + " bits");
                    var result = 0;
                    // First, read remainder from current byte
                    if (this.bitOffset > 0) {
                        var bitsLeft = 8 - this.bitOffset;
                        var toRead = numBits < bitsLeft ? numBits : bitsLeft;
                        var bitsToNotRead = bitsLeft - toRead;
                        var mask = 0xFF >> 8 - toRead << bitsToNotRead;
                        result = (this.bytes[this.byteOffset] & mask) >> bitsToNotRead;
                        numBits -= toRead;
                        this.bitOffset += toRead;
                        if (this.bitOffset === 8) {
                            this.bitOffset = 0;
                            this.byteOffset++;
                        }
                    }
                    // Next read whole bytes
                    if (numBits > 0) {
                        while(numBits >= 8){
                            result = result << 8 | this.bytes[this.byteOffset] & 0xFF;
                            this.byteOffset++;
                            numBits -= 8;
                        }
                        // Finally read a partial byte
                        if (numBits > 0) {
                            var bitsToNotRead = 8 - numBits;
                            var mask = 0xFF >> bitsToNotRead << bitsToNotRead;
                            result = result << numBits | (this.bytes[this.byteOffset] & mask) >> bitsToNotRead;
                            this.bitOffset += numBits;
                        }
                    }
                    return result;
                };
                BitStream.prototype.available = function() {
                    return 8 * (this.bytes.length - this.byteOffset) - this.bitOffset;
                };
                return BitStream;
            }();
            exports.BitStream = BitStream;
        /***/ },
        /* 8 */ /***/ function(module1, exports, __webpack_require__) {
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            exports.shiftJISTable = {
                0x20: 0x0020,
                0x21: 0x0021,
                0x22: 0x0022,
                0x23: 0x0023,
                0x24: 0x0024,
                0x25: 0x0025,
                0x26: 0x0026,
                0x27: 0x0027,
                0x28: 0x0028,
                0x29: 0x0029,
                0x2A: 0x002A,
                0x2B: 0x002B,
                0x2C: 0x002C,
                0x2D: 0x002D,
                0x2E: 0x002E,
                0x2F: 0x002F,
                0x30: 0x0030,
                0x31: 0x0031,
                0x32: 0x0032,
                0x33: 0x0033,
                0x34: 0x0034,
                0x35: 0x0035,
                0x36: 0x0036,
                0x37: 0x0037,
                0x38: 0x0038,
                0x39: 0x0039,
                0x3A: 0x003A,
                0x3B: 0x003B,
                0x3C: 0x003C,
                0x3D: 0x003D,
                0x3E: 0x003E,
                0x3F: 0x003F,
                0x40: 0x0040,
                0x41: 0x0041,
                0x42: 0x0042,
                0x43: 0x0043,
                0x44: 0x0044,
                0x45: 0x0045,
                0x46: 0x0046,
                0x47: 0x0047,
                0x48: 0x0048,
                0x49: 0x0049,
                0x4A: 0x004A,
                0x4B: 0x004B,
                0x4C: 0x004C,
                0x4D: 0x004D,
                0x4E: 0x004E,
                0x4F: 0x004F,
                0x50: 0x0050,
                0x51: 0x0051,
                0x52: 0x0052,
                0x53: 0x0053,
                0x54: 0x0054,
                0x55: 0x0055,
                0x56: 0x0056,
                0x57: 0x0057,
                0x58: 0x0058,
                0x59: 0x0059,
                0x5A: 0x005A,
                0x5B: 0x005B,
                0x5C: 0x00A5,
                0x5D: 0x005D,
                0x5E: 0x005E,
                0x5F: 0x005F,
                0x60: 0x0060,
                0x61: 0x0061,
                0x62: 0x0062,
                0x63: 0x0063,
                0x64: 0x0064,
                0x65: 0x0065,
                0x66: 0x0066,
                0x67: 0x0067,
                0x68: 0x0068,
                0x69: 0x0069,
                0x6A: 0x006A,
                0x6B: 0x006B,
                0x6C: 0x006C,
                0x6D: 0x006D,
                0x6E: 0x006E,
                0x6F: 0x006F,
                0x70: 0x0070,
                0x71: 0x0071,
                0x72: 0x0072,
                0x73: 0x0073,
                0x74: 0x0074,
                0x75: 0x0075,
                0x76: 0x0076,
                0x77: 0x0077,
                0x78: 0x0078,
                0x79: 0x0079,
                0x7A: 0x007A,
                0x7B: 0x007B,
                0x7C: 0x007C,
                0x7D: 0x007D,
                0x7E: 0x203E,
                0x8140: 0x3000,
                0x8141: 0x3001,
                0x8142: 0x3002,
                0x8143: 0xFF0C,
                0x8144: 0xFF0E,
                0x8145: 0x30FB,
                0x8146: 0xFF1A,
                0x8147: 0xFF1B,
                0x8148: 0xFF1F,
                0x8149: 0xFF01,
                0x814A: 0x309B,
                0x814B: 0x309C,
                0x814C: 0x00B4,
                0x814D: 0xFF40,
                0x814E: 0x00A8,
                0x814F: 0xFF3E,
                0x8150: 0xFFE3,
                0x8151: 0xFF3F,
                0x8152: 0x30FD,
                0x8153: 0x30FE,
                0x8154: 0x309D,
                0x8155: 0x309E,
                0x8156: 0x3003,
                0x8157: 0x4EDD,
                0x8158: 0x3005,
                0x8159: 0x3006,
                0x815A: 0x3007,
                0x815B: 0x30FC,
                0x815C: 0x2015,
                0x815D: 0x2010,
                0x815E: 0xFF0F,
                0x815F: 0x005C,
                0x8160: 0x301C,
                0x8161: 0x2016,
                0x8162: 0xFF5C,
                0x8163: 0x2026,
                0x8164: 0x2025,
                0x8165: 0x2018,
                0x8166: 0x2019,
                0x8167: 0x201C,
                0x8168: 0x201D,
                0x8169: 0xFF08,
                0x816A: 0xFF09,
                0x816B: 0x3014,
                0x816C: 0x3015,
                0x816D: 0xFF3B,
                0x816E: 0xFF3D,
                0x816F: 0xFF5B,
                0x8170: 0xFF5D,
                0x8171: 0x3008,
                0x8172: 0x3009,
                0x8173: 0x300A,
                0x8174: 0x300B,
                0x8175: 0x300C,
                0x8176: 0x300D,
                0x8177: 0x300E,
                0x8178: 0x300F,
                0x8179: 0x3010,
                0x817A: 0x3011,
                0x817B: 0xFF0B,
                0x817C: 0x2212,
                0x817D: 0x00B1,
                0x817E: 0x00D7,
                0x8180: 0x00F7,
                0x8181: 0xFF1D,
                0x8182: 0x2260,
                0x8183: 0xFF1C,
                0x8184: 0xFF1E,
                0x8185: 0x2266,
                0x8186: 0x2267,
                0x8187: 0x221E,
                0x8188: 0x2234,
                0x8189: 0x2642,
                0x818A: 0x2640,
                0x818B: 0x00B0,
                0x818C: 0x2032,
                0x818D: 0x2033,
                0x818E: 0x2103,
                0x818F: 0xFFE5,
                0x8190: 0xFF04,
                0x8191: 0x00A2,
                0x8192: 0x00A3,
                0x8193: 0xFF05,
                0x8194: 0xFF03,
                0x8195: 0xFF06,
                0x8196: 0xFF0A,
                0x8197: 0xFF20,
                0x8198: 0x00A7,
                0x8199: 0x2606,
                0x819A: 0x2605,
                0x819B: 0x25CB,
                0x819C: 0x25CF,
                0x819D: 0x25CE,
                0x819E: 0x25C7,
                0x819F: 0x25C6,
                0x81A0: 0x25A1,
                0x81A1: 0x25A0,
                0x81A2: 0x25B3,
                0x81A3: 0x25B2,
                0x81A4: 0x25BD,
                0x81A5: 0x25BC,
                0x81A6: 0x203B,
                0x81A7: 0x3012,
                0x81A8: 0x2192,
                0x81A9: 0x2190,
                0x81AA: 0x2191,
                0x81AB: 0x2193,
                0x81AC: 0x3013,
                0x81B8: 0x2208,
                0x81B9: 0x220B,
                0x81BA: 0x2286,
                0x81BB: 0x2287,
                0x81BC: 0x2282,
                0x81BD: 0x2283,
                0x81BE: 0x222A,
                0x81BF: 0x2229,
                0x81C8: 0x2227,
                0x81C9: 0x2228,
                0x81CA: 0x00AC,
                0x81CB: 0x21D2,
                0x81CC: 0x21D4,
                0x81CD: 0x2200,
                0x81CE: 0x2203,
                0x81DA: 0x2220,
                0x81DB: 0x22A5,
                0x81DC: 0x2312,
                0x81DD: 0x2202,
                0x81DE: 0x2207,
                0x81DF: 0x2261,
                0x81E0: 0x2252,
                0x81E1: 0x226A,
                0x81E2: 0x226B,
                0x81E3: 0x221A,
                0x81E4: 0x223D,
                0x81E5: 0x221D,
                0x81E6: 0x2235,
                0x81E7: 0x222B,
                0x81E8: 0x222C,
                0x81F0: 0x212B,
                0x81F1: 0x2030,
                0x81F2: 0x266F,
                0x81F3: 0x266D,
                0x81F4: 0x266A,
                0x81F5: 0x2020,
                0x81F6: 0x2021,
                0x81F7: 0x00B6,
                0x81FC: 0x25EF,
                0x824F: 0xFF10,
                0x8250: 0xFF11,
                0x8251: 0xFF12,
                0x8252: 0xFF13,
                0x8253: 0xFF14,
                0x8254: 0xFF15,
                0x8255: 0xFF16,
                0x8256: 0xFF17,
                0x8257: 0xFF18,
                0x8258: 0xFF19,
                0x8260: 0xFF21,
                0x8261: 0xFF22,
                0x8262: 0xFF23,
                0x8263: 0xFF24,
                0x8264: 0xFF25,
                0x8265: 0xFF26,
                0x8266: 0xFF27,
                0x8267: 0xFF28,
                0x8268: 0xFF29,
                0x8269: 0xFF2A,
                0x826A: 0xFF2B,
                0x826B: 0xFF2C,
                0x826C: 0xFF2D,
                0x826D: 0xFF2E,
                0x826E: 0xFF2F,
                0x826F: 0xFF30,
                0x8270: 0xFF31,
                0x8271: 0xFF32,
                0x8272: 0xFF33,
                0x8273: 0xFF34,
                0x8274: 0xFF35,
                0x8275: 0xFF36,
                0x8276: 0xFF37,
                0x8277: 0xFF38,
                0x8278: 0xFF39,
                0x8279: 0xFF3A,
                0x8281: 0xFF41,
                0x8282: 0xFF42,
                0x8283: 0xFF43,
                0x8284: 0xFF44,
                0x8285: 0xFF45,
                0x8286: 0xFF46,
                0x8287: 0xFF47,
                0x8288: 0xFF48,
                0x8289: 0xFF49,
                0x828A: 0xFF4A,
                0x828B: 0xFF4B,
                0x828C: 0xFF4C,
                0x828D: 0xFF4D,
                0x828E: 0xFF4E,
                0x828F: 0xFF4F,
                0x8290: 0xFF50,
                0x8291: 0xFF51,
                0x8292: 0xFF52,
                0x8293: 0xFF53,
                0x8294: 0xFF54,
                0x8295: 0xFF55,
                0x8296: 0xFF56,
                0x8297: 0xFF57,
                0x8298: 0xFF58,
                0x8299: 0xFF59,
                0x829A: 0xFF5A,
                0x829F: 0x3041,
                0x82A0: 0x3042,
                0x82A1: 0x3043,
                0x82A2: 0x3044,
                0x82A3: 0x3045,
                0x82A4: 0x3046,
                0x82A5: 0x3047,
                0x82A6: 0x3048,
                0x82A7: 0x3049,
                0x82A8: 0x304A,
                0x82A9: 0x304B,
                0x82AA: 0x304C,
                0x82AB: 0x304D,
                0x82AC: 0x304E,
                0x82AD: 0x304F,
                0x82AE: 0x3050,
                0x82AF: 0x3051,
                0x82B0: 0x3052,
                0x82B1: 0x3053,
                0x82B2: 0x3054,
                0x82B3: 0x3055,
                0x82B4: 0x3056,
                0x82B5: 0x3057,
                0x82B6: 0x3058,
                0x82B7: 0x3059,
                0x82B8: 0x305A,
                0x82B9: 0x305B,
                0x82BA: 0x305C,
                0x82BB: 0x305D,
                0x82BC: 0x305E,
                0x82BD: 0x305F,
                0x82BE: 0x3060,
                0x82BF: 0x3061,
                0x82C0: 0x3062,
                0x82C1: 0x3063,
                0x82C2: 0x3064,
                0x82C3: 0x3065,
                0x82C4: 0x3066,
                0x82C5: 0x3067,
                0x82C6: 0x3068,
                0x82C7: 0x3069,
                0x82C8: 0x306A,
                0x82C9: 0x306B,
                0x82CA: 0x306C,
                0x82CB: 0x306D,
                0x82CC: 0x306E,
                0x82CD: 0x306F,
                0x82CE: 0x3070,
                0x82CF: 0x3071,
                0x82D0: 0x3072,
                0x82D1: 0x3073,
                0x82D2: 0x3074,
                0x82D3: 0x3075,
                0x82D4: 0x3076,
                0x82D5: 0x3077,
                0x82D6: 0x3078,
                0x82D7: 0x3079,
                0x82D8: 0x307A,
                0x82D9: 0x307B,
                0x82DA: 0x307C,
                0x82DB: 0x307D,
                0x82DC: 0x307E,
                0x82DD: 0x307F,
                0x82DE: 0x3080,
                0x82DF: 0x3081,
                0x82E0: 0x3082,
                0x82E1: 0x3083,
                0x82E2: 0x3084,
                0x82E3: 0x3085,
                0x82E4: 0x3086,
                0x82E5: 0x3087,
                0x82E6: 0x3088,
                0x82E7: 0x3089,
                0x82E8: 0x308A,
                0x82E9: 0x308B,
                0x82EA: 0x308C,
                0x82EB: 0x308D,
                0x82EC: 0x308E,
                0x82ED: 0x308F,
                0x82EE: 0x3090,
                0x82EF: 0x3091,
                0x82F0: 0x3092,
                0x82F1: 0x3093,
                0x8340: 0x30A1,
                0x8341: 0x30A2,
                0x8342: 0x30A3,
                0x8343: 0x30A4,
                0x8344: 0x30A5,
                0x8345: 0x30A6,
                0x8346: 0x30A7,
                0x8347: 0x30A8,
                0x8348: 0x30A9,
                0x8349: 0x30AA,
                0x834A: 0x30AB,
                0x834B: 0x30AC,
                0x834C: 0x30AD,
                0x834D: 0x30AE,
                0x834E: 0x30AF,
                0x834F: 0x30B0,
                0x8350: 0x30B1,
                0x8351: 0x30B2,
                0x8352: 0x30B3,
                0x8353: 0x30B4,
                0x8354: 0x30B5,
                0x8355: 0x30B6,
                0x8356: 0x30B7,
                0x8357: 0x30B8,
                0x8358: 0x30B9,
                0x8359: 0x30BA,
                0x835A: 0x30BB,
                0x835B: 0x30BC,
                0x835C: 0x30BD,
                0x835D: 0x30BE,
                0x835E: 0x30BF,
                0x835F: 0x30C0,
                0x8360: 0x30C1,
                0x8361: 0x30C2,
                0x8362: 0x30C3,
                0x8363: 0x30C4,
                0x8364: 0x30C5,
                0x8365: 0x30C6,
                0x8366: 0x30C7,
                0x8367: 0x30C8,
                0x8368: 0x30C9,
                0x8369: 0x30CA,
                0x836A: 0x30CB,
                0x836B: 0x30CC,
                0x836C: 0x30CD,
                0x836D: 0x30CE,
                0x836E: 0x30CF,
                0x836F: 0x30D0,
                0x8370: 0x30D1,
                0x8371: 0x30D2,
                0x8372: 0x30D3,
                0x8373: 0x30D4,
                0x8374: 0x30D5,
                0x8375: 0x30D6,
                0x8376: 0x30D7,
                0x8377: 0x30D8,
                0x8378: 0x30D9,
                0x8379: 0x30DA,
                0x837A: 0x30DB,
                0x837B: 0x30DC,
                0x837C: 0x30DD,
                0x837D: 0x30DE,
                0x837E: 0x30DF,
                0x8380: 0x30E0,
                0x8381: 0x30E1,
                0x8382: 0x30E2,
                0x8383: 0x30E3,
                0x8384: 0x30E4,
                0x8385: 0x30E5,
                0x8386: 0x30E6,
                0x8387: 0x30E7,
                0x8388: 0x30E8,
                0x8389: 0x30E9,
                0x838A: 0x30EA,
                0x838B: 0x30EB,
                0x838C: 0x30EC,
                0x838D: 0x30ED,
                0x838E: 0x30EE,
                0x838F: 0x30EF,
                0x8390: 0x30F0,
                0x8391: 0x30F1,
                0x8392: 0x30F2,
                0x8393: 0x30F3,
                0x8394: 0x30F4,
                0x8395: 0x30F5,
                0x8396: 0x30F6,
                0x839F: 0x0391,
                0x83A0: 0x0392,
                0x83A1: 0x0393,
                0x83A2: 0x0394,
                0x83A3: 0x0395,
                0x83A4: 0x0396,
                0x83A5: 0x0397,
                0x83A6: 0x0398,
                0x83A7: 0x0399,
                0x83A8: 0x039A,
                0x83A9: 0x039B,
                0x83AA: 0x039C,
                0x83AB: 0x039D,
                0x83AC: 0x039E,
                0x83AD: 0x039F,
                0x83AE: 0x03A0,
                0x83AF: 0x03A1,
                0x83B0: 0x03A3,
                0x83B1: 0x03A4,
                0x83B2: 0x03A5,
                0x83B3: 0x03A6,
                0x83B4: 0x03A7,
                0x83B5: 0x03A8,
                0x83B6: 0x03A9,
                0x83BF: 0x03B1,
                0x83C0: 0x03B2,
                0x83C1: 0x03B3,
                0x83C2: 0x03B4,
                0x83C3: 0x03B5,
                0x83C4: 0x03B6,
                0x83C5: 0x03B7,
                0x83C6: 0x03B8,
                0x83C7: 0x03B9,
                0x83C8: 0x03BA,
                0x83C9: 0x03BB,
                0x83CA: 0x03BC,
                0x83CB: 0x03BD,
                0x83CC: 0x03BE,
                0x83CD: 0x03BF,
                0x83CE: 0x03C0,
                0x83CF: 0x03C1,
                0x83D0: 0x03C3,
                0x83D1: 0x03C4,
                0x83D2: 0x03C5,
                0x83D3: 0x03C6,
                0x83D4: 0x03C7,
                0x83D5: 0x03C8,
                0x83D6: 0x03C9,
                0x8440: 0x0410,
                0x8441: 0x0411,
                0x8442: 0x0412,
                0x8443: 0x0413,
                0x8444: 0x0414,
                0x8445: 0x0415,
                0x8446: 0x0401,
                0x8447: 0x0416,
                0x8448: 0x0417,
                0x8449: 0x0418,
                0x844A: 0x0419,
                0x844B: 0x041A,
                0x844C: 0x041B,
                0x844D: 0x041C,
                0x844E: 0x041D,
                0x844F: 0x041E,
                0x8450: 0x041F,
                0x8451: 0x0420,
                0x8452: 0x0421,
                0x8453: 0x0422,
                0x8454: 0x0423,
                0x8455: 0x0424,
                0x8456: 0x0425,
                0x8457: 0x0426,
                0x8458: 0x0427,
                0x8459: 0x0428,
                0x845A: 0x0429,
                0x845B: 0x042A,
                0x845C: 0x042B,
                0x845D: 0x042C,
                0x845E: 0x042D,
                0x845F: 0x042E,
                0x8460: 0x042F,
                0x8470: 0x0430,
                0x8471: 0x0431,
                0x8472: 0x0432,
                0x8473: 0x0433,
                0x8474: 0x0434,
                0x8475: 0x0435,
                0x8476: 0x0451,
                0x8477: 0x0436,
                0x8478: 0x0437,
                0x8479: 0x0438,
                0x847A: 0x0439,
                0x847B: 0x043A,
                0x847C: 0x043B,
                0x847D: 0x043C,
                0x847E: 0x043D,
                0x8480: 0x043E,
                0x8481: 0x043F,
                0x8482: 0x0440,
                0x8483: 0x0441,
                0x8484: 0x0442,
                0x8485: 0x0443,
                0x8486: 0x0444,
                0x8487: 0x0445,
                0x8488: 0x0446,
                0x8489: 0x0447,
                0x848A: 0x0448,
                0x848B: 0x0449,
                0x848C: 0x044A,
                0x848D: 0x044B,
                0x848E: 0x044C,
                0x848F: 0x044D,
                0x8490: 0x044E,
                0x8491: 0x044F,
                0x849F: 0x2500,
                0x84A0: 0x2502,
                0x84A1: 0x250C,
                0x84A2: 0x2510,
                0x84A3: 0x2518,
                0x84A4: 0x2514,
                0x84A5: 0x251C,
                0x84A6: 0x252C,
                0x84A7: 0x2524,
                0x84A8: 0x2534,
                0x84A9: 0x253C,
                0x84AA: 0x2501,
                0x84AB: 0x2503,
                0x84AC: 0x250F,
                0x84AD: 0x2513,
                0x84AE: 0x251B,
                0x84AF: 0x2517,
                0x84B0: 0x2523,
                0x84B1: 0x2533,
                0x84B2: 0x252B,
                0x84B3: 0x253B,
                0x84B4: 0x254B,
                0x84B5: 0x2520,
                0x84B6: 0x252F,
                0x84B7: 0x2528,
                0x84B8: 0x2537,
                0x84B9: 0x253F,
                0x84BA: 0x251D,
                0x84BB: 0x2530,
                0x84BC: 0x2525,
                0x84BD: 0x2538,
                0x84BE: 0x2542,
                0x889F: 0x4E9C,
                0x88A0: 0x5516,
                0x88A1: 0x5A03,
                0x88A2: 0x963F,
                0x88A3: 0x54C0,
                0x88A4: 0x611B,
                0x88A5: 0x6328,
                0x88A6: 0x59F6,
                0x88A7: 0x9022,
                0x88A8: 0x8475,
                0x88A9: 0x831C,
                0x88AA: 0x7A50,
                0x88AB: 0x60AA,
                0x88AC: 0x63E1,
                0x88AD: 0x6E25,
                0x88AE: 0x65ED,
                0x88AF: 0x8466,
                0x88B0: 0x82A6,
                0x88B1: 0x9BF5,
                0x88B2: 0x6893,
                0x88B3: 0x5727,
                0x88B4: 0x65A1,
                0x88B5: 0x6271,
                0x88B6: 0x5B9B,
                0x88B7: 0x59D0,
                0x88B8: 0x867B,
                0x88B9: 0x98F4,
                0x88BA: 0x7D62,
                0x88BB: 0x7DBE,
                0x88BC: 0x9B8E,
                0x88BD: 0x6216,
                0x88BE: 0x7C9F,
                0x88BF: 0x88B7,
                0x88C0: 0x5B89,
                0x88C1: 0x5EB5,
                0x88C2: 0x6309,
                0x88C3: 0x6697,
                0x88C4: 0x6848,
                0x88C5: 0x95C7,
                0x88C6: 0x978D,
                0x88C7: 0x674F,
                0x88C8: 0x4EE5,
                0x88C9: 0x4F0A,
                0x88CA: 0x4F4D,
                0x88CB: 0x4F9D,
                0x88CC: 0x5049,
                0x88CD: 0x56F2,
                0x88CE: 0x5937,
                0x88CF: 0x59D4,
                0x88D0: 0x5A01,
                0x88D1: 0x5C09,
                0x88D2: 0x60DF,
                0x88D3: 0x610F,
                0x88D4: 0x6170,
                0x88D5: 0x6613,
                0x88D6: 0x6905,
                0x88D7: 0x70BA,
                0x88D8: 0x754F,
                0x88D9: 0x7570,
                0x88DA: 0x79FB,
                0x88DB: 0x7DAD,
                0x88DC: 0x7DEF,
                0x88DD: 0x80C3,
                0x88DE: 0x840E,
                0x88DF: 0x8863,
                0x88E0: 0x8B02,
                0x88E1: 0x9055,
                0x88E2: 0x907A,
                0x88E3: 0x533B,
                0x88E4: 0x4E95,
                0x88E5: 0x4EA5,
                0x88E6: 0x57DF,
                0x88E7: 0x80B2,
                0x88E8: 0x90C1,
                0x88E9: 0x78EF,
                0x88EA: 0x4E00,
                0x88EB: 0x58F1,
                0x88EC: 0x6EA2,
                0x88ED: 0x9038,
                0x88EE: 0x7A32,
                0x88EF: 0x8328,
                0x88F0: 0x828B,
                0x88F1: 0x9C2F,
                0x88F2: 0x5141,
                0x88F3: 0x5370,
                0x88F4: 0x54BD,
                0x88F5: 0x54E1,
                0x88F6: 0x56E0,
                0x88F7: 0x59FB,
                0x88F8: 0x5F15,
                0x88F9: 0x98F2,
                0x88FA: 0x6DEB,
                0x88FB: 0x80E4,
                0x88FC: 0x852D,
                0x8940: 0x9662,
                0x8941: 0x9670,
                0x8942: 0x96A0,
                0x8943: 0x97FB,
                0x8944: 0x540B,
                0x8945: 0x53F3,
                0x8946: 0x5B87,
                0x8947: 0x70CF,
                0x8948: 0x7FBD,
                0x8949: 0x8FC2,
                0x894A: 0x96E8,
                0x894B: 0x536F,
                0x894C: 0x9D5C,
                0x894D: 0x7ABA,
                0x894E: 0x4E11,
                0x894F: 0x7893,
                0x8950: 0x81FC,
                0x8951: 0x6E26,
                0x8952: 0x5618,
                0x8953: 0x5504,
                0x8954: 0x6B1D,
                0x8955: 0x851A,
                0x8956: 0x9C3B,
                0x8957: 0x59E5,
                0x8958: 0x53A9,
                0x8959: 0x6D66,
                0x895A: 0x74DC,
                0x895B: 0x958F,
                0x895C: 0x5642,
                0x895D: 0x4E91,
                0x895E: 0x904B,
                0x895F: 0x96F2,
                0x8960: 0x834F,
                0x8961: 0x990C,
                0x8962: 0x53E1,
                0x8963: 0x55B6,
                0x8964: 0x5B30,
                0x8965: 0x5F71,
                0x8966: 0x6620,
                0x8967: 0x66F3,
                0x8968: 0x6804,
                0x8969: 0x6C38,
                0x896A: 0x6CF3,
                0x896B: 0x6D29,
                0x896C: 0x745B,
                0x896D: 0x76C8,
                0x896E: 0x7A4E,
                0x896F: 0x9834,
                0x8970: 0x82F1,
                0x8971: 0x885B,
                0x8972: 0x8A60,
                0x8973: 0x92ED,
                0x8974: 0x6DB2,
                0x8975: 0x75AB,
                0x8976: 0x76CA,
                0x8977: 0x99C5,
                0x8978: 0x60A6,
                0x8979: 0x8B01,
                0x897A: 0x8D8A,
                0x897B: 0x95B2,
                0x897C: 0x698E,
                0x897D: 0x53AD,
                0x897E: 0x5186,
                0x8980: 0x5712,
                0x8981: 0x5830,
                0x8982: 0x5944,
                0x8983: 0x5BB4,
                0x8984: 0x5EF6,
                0x8985: 0x6028,
                0x8986: 0x63A9,
                0x8987: 0x63F4,
                0x8988: 0x6CBF,
                0x8989: 0x6F14,
                0x898A: 0x708E,
                0x898B: 0x7114,
                0x898C: 0x7159,
                0x898D: 0x71D5,
                0x898E: 0x733F,
                0x898F: 0x7E01,
                0x8990: 0x8276,
                0x8991: 0x82D1,
                0x8992: 0x8597,
                0x8993: 0x9060,
                0x8994: 0x925B,
                0x8995: 0x9D1B,
                0x8996: 0x5869,
                0x8997: 0x65BC,
                0x8998: 0x6C5A,
                0x8999: 0x7525,
                0x899A: 0x51F9,
                0x899B: 0x592E,
                0x899C: 0x5965,
                0x899D: 0x5F80,
                0x899E: 0x5FDC,
                0x899F: 0x62BC,
                0x89A0: 0x65FA,
                0x89A1: 0x6A2A,
                0x89A2: 0x6B27,
                0x89A3: 0x6BB4,
                0x89A4: 0x738B,
                0x89A5: 0x7FC1,
                0x89A6: 0x8956,
                0x89A7: 0x9D2C,
                0x89A8: 0x9D0E,
                0x89A9: 0x9EC4,
                0x89AA: 0x5CA1,
                0x89AB: 0x6C96,
                0x89AC: 0x837B,
                0x89AD: 0x5104,
                0x89AE: 0x5C4B,
                0x89AF: 0x61B6,
                0x89B0: 0x81C6,
                0x89B1: 0x6876,
                0x89B2: 0x7261,
                0x89B3: 0x4E59,
                0x89B4: 0x4FFA,
                0x89B5: 0x5378,
                0x89B6: 0x6069,
                0x89B7: 0x6E29,
                0x89B8: 0x7A4F,
                0x89B9: 0x97F3,
                0x89BA: 0x4E0B,
                0x89BB: 0x5316,
                0x89BC: 0x4EEE,
                0x89BD: 0x4F55,
                0x89BE: 0x4F3D,
                0x89BF: 0x4FA1,
                0x89C0: 0x4F73,
                0x89C1: 0x52A0,
                0x89C2: 0x53EF,
                0x89C3: 0x5609,
                0x89C4: 0x590F,
                0x89C5: 0x5AC1,
                0x89C6: 0x5BB6,
                0x89C7: 0x5BE1,
                0x89C8: 0x79D1,
                0x89C9: 0x6687,
                0x89CA: 0x679C,
                0x89CB: 0x67B6,
                0x89CC: 0x6B4C,
                0x89CD: 0x6CB3,
                0x89CE: 0x706B,
                0x89CF: 0x73C2,
                0x89D0: 0x798D,
                0x89D1: 0x79BE,
                0x89D2: 0x7A3C,
                0x89D3: 0x7B87,
                0x89D4: 0x82B1,
                0x89D5: 0x82DB,
                0x89D6: 0x8304,
                0x89D7: 0x8377,
                0x89D8: 0x83EF,
                0x89D9: 0x83D3,
                0x89DA: 0x8766,
                0x89DB: 0x8AB2,
                0x89DC: 0x5629,
                0x89DD: 0x8CA8,
                0x89DE: 0x8FE6,
                0x89DF: 0x904E,
                0x89E0: 0x971E,
                0x89E1: 0x868A,
                0x89E2: 0x4FC4,
                0x89E3: 0x5CE8,
                0x89E4: 0x6211,
                0x89E5: 0x7259,
                0x89E6: 0x753B,
                0x89E7: 0x81E5,
                0x89E8: 0x82BD,
                0x89E9: 0x86FE,
                0x89EA: 0x8CC0,
                0x89EB: 0x96C5,
                0x89EC: 0x9913,
                0x89ED: 0x99D5,
                0x89EE: 0x4ECB,
                0x89EF: 0x4F1A,
                0x89F0: 0x89E3,
                0x89F1: 0x56DE,
                0x89F2: 0x584A,
                0x89F3: 0x58CA,
                0x89F4: 0x5EFB,
                0x89F5: 0x5FEB,
                0x89F6: 0x602A,
                0x89F7: 0x6094,
                0x89F8: 0x6062,
                0x89F9: 0x61D0,
                0x89FA: 0x6212,
                0x89FB: 0x62D0,
                0x89FC: 0x6539,
                0x8A40: 0x9B41,
                0x8A41: 0x6666,
                0x8A42: 0x68B0,
                0x8A43: 0x6D77,
                0x8A44: 0x7070,
                0x8A45: 0x754C,
                0x8A46: 0x7686,
                0x8A47: 0x7D75,
                0x8A48: 0x82A5,
                0x8A49: 0x87F9,
                0x8A4A: 0x958B,
                0x8A4B: 0x968E,
                0x8A4C: 0x8C9D,
                0x8A4D: 0x51F1,
                0x8A4E: 0x52BE,
                0x8A4F: 0x5916,
                0x8A50: 0x54B3,
                0x8A51: 0x5BB3,
                0x8A52: 0x5D16,
                0x8A53: 0x6168,
                0x8A54: 0x6982,
                0x8A55: 0x6DAF,
                0x8A56: 0x788D,
                0x8A57: 0x84CB,
                0x8A58: 0x8857,
                0x8A59: 0x8A72,
                0x8A5A: 0x93A7,
                0x8A5B: 0x9AB8,
                0x8A5C: 0x6D6C,
                0x8A5D: 0x99A8,
                0x8A5E: 0x86D9,
                0x8A5F: 0x57A3,
                0x8A60: 0x67FF,
                0x8A61: 0x86CE,
                0x8A62: 0x920E,
                0x8A63: 0x5283,
                0x8A64: 0x5687,
                0x8A65: 0x5404,
                0x8A66: 0x5ED3,
                0x8A67: 0x62E1,
                0x8A68: 0x64B9,
                0x8A69: 0x683C,
                0x8A6A: 0x6838,
                0x8A6B: 0x6BBB,
                0x8A6C: 0x7372,
                0x8A6D: 0x78BA,
                0x8A6E: 0x7A6B,
                0x8A6F: 0x899A,
                0x8A70: 0x89D2,
                0x8A71: 0x8D6B,
                0x8A72: 0x8F03,
                0x8A73: 0x90ED,
                0x8A74: 0x95A3,
                0x8A75: 0x9694,
                0x8A76: 0x9769,
                0x8A77: 0x5B66,
                0x8A78: 0x5CB3,
                0x8A79: 0x697D,
                0x8A7A: 0x984D,
                0x8A7B: 0x984E,
                0x8A7C: 0x639B,
                0x8A7D: 0x7B20,
                0x8A7E: 0x6A2B,
                0x8A80: 0x6A7F,
                0x8A81: 0x68B6,
                0x8A82: 0x9C0D,
                0x8A83: 0x6F5F,
                0x8A84: 0x5272,
                0x8A85: 0x559D,
                0x8A86: 0x6070,
                0x8A87: 0x62EC,
                0x8A88: 0x6D3B,
                0x8A89: 0x6E07,
                0x8A8A: 0x6ED1,
                0x8A8B: 0x845B,
                0x8A8C: 0x8910,
                0x8A8D: 0x8F44,
                0x8A8E: 0x4E14,
                0x8A8F: 0x9C39,
                0x8A90: 0x53F6,
                0x8A91: 0x691B,
                0x8A92: 0x6A3A,
                0x8A93: 0x9784,
                0x8A94: 0x682A,
                0x8A95: 0x515C,
                0x8A96: 0x7AC3,
                0x8A97: 0x84B2,
                0x8A98: 0x91DC,
                0x8A99: 0x938C,
                0x8A9A: 0x565B,
                0x8A9B: 0x9D28,
                0x8A9C: 0x6822,
                0x8A9D: 0x8305,
                0x8A9E: 0x8431,
                0x8A9F: 0x7CA5,
                0x8AA0: 0x5208,
                0x8AA1: 0x82C5,
                0x8AA2: 0x74E6,
                0x8AA3: 0x4E7E,
                0x8AA4: 0x4F83,
                0x8AA5: 0x51A0,
                0x8AA6: 0x5BD2,
                0x8AA7: 0x520A,
                0x8AA8: 0x52D8,
                0x8AA9: 0x52E7,
                0x8AAA: 0x5DFB,
                0x8AAB: 0x559A,
                0x8AAC: 0x582A,
                0x8AAD: 0x59E6,
                0x8AAE: 0x5B8C,
                0x8AAF: 0x5B98,
                0x8AB0: 0x5BDB,
                0x8AB1: 0x5E72,
                0x8AB2: 0x5E79,
                0x8AB3: 0x60A3,
                0x8AB4: 0x611F,
                0x8AB5: 0x6163,
                0x8AB6: 0x61BE,
                0x8AB7: 0x63DB,
                0x8AB8: 0x6562,
                0x8AB9: 0x67D1,
                0x8ABA: 0x6853,
                0x8ABB: 0x68FA,
                0x8ABC: 0x6B3E,
                0x8ABD: 0x6B53,
                0x8ABE: 0x6C57,
                0x8ABF: 0x6F22,
                0x8AC0: 0x6F97,
                0x8AC1: 0x6F45,
                0x8AC2: 0x74B0,
                0x8AC3: 0x7518,
                0x8AC4: 0x76E3,
                0x8AC5: 0x770B,
                0x8AC6: 0x7AFF,
                0x8AC7: 0x7BA1,
                0x8AC8: 0x7C21,
                0x8AC9: 0x7DE9,
                0x8ACA: 0x7F36,
                0x8ACB: 0x7FF0,
                0x8ACC: 0x809D,
                0x8ACD: 0x8266,
                0x8ACE: 0x839E,
                0x8ACF: 0x89B3,
                0x8AD0: 0x8ACC,
                0x8AD1: 0x8CAB,
                0x8AD2: 0x9084,
                0x8AD3: 0x9451,
                0x8AD4: 0x9593,
                0x8AD5: 0x9591,
                0x8AD6: 0x95A2,
                0x8AD7: 0x9665,
                0x8AD8: 0x97D3,
                0x8AD9: 0x9928,
                0x8ADA: 0x8218,
                0x8ADB: 0x4E38,
                0x8ADC: 0x542B,
                0x8ADD: 0x5CB8,
                0x8ADE: 0x5DCC,
                0x8ADF: 0x73A9,
                0x8AE0: 0x764C,
                0x8AE1: 0x773C,
                0x8AE2: 0x5CA9,
                0x8AE3: 0x7FEB,
                0x8AE4: 0x8D0B,
                0x8AE5: 0x96C1,
                0x8AE6: 0x9811,
                0x8AE7: 0x9854,
                0x8AE8: 0x9858,
                0x8AE9: 0x4F01,
                0x8AEA: 0x4F0E,
                0x8AEB: 0x5371,
                0x8AEC: 0x559C,
                0x8AED: 0x5668,
                0x8AEE: 0x57FA,
                0x8AEF: 0x5947,
                0x8AF0: 0x5B09,
                0x8AF1: 0x5BC4,
                0x8AF2: 0x5C90,
                0x8AF3: 0x5E0C,
                0x8AF4: 0x5E7E,
                0x8AF5: 0x5FCC,
                0x8AF6: 0x63EE,
                0x8AF7: 0x673A,
                0x8AF8: 0x65D7,
                0x8AF9: 0x65E2,
                0x8AFA: 0x671F,
                0x8AFB: 0x68CB,
                0x8AFC: 0x68C4,
                0x8B40: 0x6A5F,
                0x8B41: 0x5E30,
                0x8B42: 0x6BC5,
                0x8B43: 0x6C17,
                0x8B44: 0x6C7D,
                0x8B45: 0x757F,
                0x8B46: 0x7948,
                0x8B47: 0x5B63,
                0x8B48: 0x7A00,
                0x8B49: 0x7D00,
                0x8B4A: 0x5FBD,
                0x8B4B: 0x898F,
                0x8B4C: 0x8A18,
                0x8B4D: 0x8CB4,
                0x8B4E: 0x8D77,
                0x8B4F: 0x8ECC,
                0x8B50: 0x8F1D,
                0x8B51: 0x98E2,
                0x8B52: 0x9A0E,
                0x8B53: 0x9B3C,
                0x8B54: 0x4E80,
                0x8B55: 0x507D,
                0x8B56: 0x5100,
                0x8B57: 0x5993,
                0x8B58: 0x5B9C,
                0x8B59: 0x622F,
                0x8B5A: 0x6280,
                0x8B5B: 0x64EC,
                0x8B5C: 0x6B3A,
                0x8B5D: 0x72A0,
                0x8B5E: 0x7591,
                0x8B5F: 0x7947,
                0x8B60: 0x7FA9,
                0x8B61: 0x87FB,
                0x8B62: 0x8ABC,
                0x8B63: 0x8B70,
                0x8B64: 0x63AC,
                0x8B65: 0x83CA,
                0x8B66: 0x97A0,
                0x8B67: 0x5409,
                0x8B68: 0x5403,
                0x8B69: 0x55AB,
                0x8B6A: 0x6854,
                0x8B6B: 0x6A58,
                0x8B6C: 0x8A70,
                0x8B6D: 0x7827,
                0x8B6E: 0x6775,
                0x8B6F: 0x9ECD,
                0x8B70: 0x5374,
                0x8B71: 0x5BA2,
                0x8B72: 0x811A,
                0x8B73: 0x8650,
                0x8B74: 0x9006,
                0x8B75: 0x4E18,
                0x8B76: 0x4E45,
                0x8B77: 0x4EC7,
                0x8B78: 0x4F11,
                0x8B79: 0x53CA,
                0x8B7A: 0x5438,
                0x8B7B: 0x5BAE,
                0x8B7C: 0x5F13,
                0x8B7D: 0x6025,
                0x8B7E: 0x6551,
                0x8B80: 0x673D,
                0x8B81: 0x6C42,
                0x8B82: 0x6C72,
                0x8B83: 0x6CE3,
                0x8B84: 0x7078,
                0x8B85: 0x7403,
                0x8B86: 0x7A76,
                0x8B87: 0x7AAE,
                0x8B88: 0x7B08,
                0x8B89: 0x7D1A,
                0x8B8A: 0x7CFE,
                0x8B8B: 0x7D66,
                0x8B8C: 0x65E7,
                0x8B8D: 0x725B,
                0x8B8E: 0x53BB,
                0x8B8F: 0x5C45,
                0x8B90: 0x5DE8,
                0x8B91: 0x62D2,
                0x8B92: 0x62E0,
                0x8B93: 0x6319,
                0x8B94: 0x6E20,
                0x8B95: 0x865A,
                0x8B96: 0x8A31,
                0x8B97: 0x8DDD,
                0x8B98: 0x92F8,
                0x8B99: 0x6F01,
                0x8B9A: 0x79A6,
                0x8B9B: 0x9B5A,
                0x8B9C: 0x4EA8,
                0x8B9D: 0x4EAB,
                0x8B9E: 0x4EAC,
                0x8B9F: 0x4F9B,
                0x8BA0: 0x4FA0,
                0x8BA1: 0x50D1,
                0x8BA2: 0x5147,
                0x8BA3: 0x7AF6,
                0x8BA4: 0x5171,
                0x8BA5: 0x51F6,
                0x8BA6: 0x5354,
                0x8BA7: 0x5321,
                0x8BA8: 0x537F,
                0x8BA9: 0x53EB,
                0x8BAA: 0x55AC,
                0x8BAB: 0x5883,
                0x8BAC: 0x5CE1,
                0x8BAD: 0x5F37,
                0x8BAE: 0x5F4A,
                0x8BAF: 0x602F,
                0x8BB0: 0x6050,
                0x8BB1: 0x606D,
                0x8BB2: 0x631F,
                0x8BB3: 0x6559,
                0x8BB4: 0x6A4B,
                0x8BB5: 0x6CC1,
                0x8BB6: 0x72C2,
                0x8BB7: 0x72ED,
                0x8BB8: 0x77EF,
                0x8BB9: 0x80F8,
                0x8BBA: 0x8105,
                0x8BBB: 0x8208,
                0x8BBC: 0x854E,
                0x8BBD: 0x90F7,
                0x8BBE: 0x93E1,
                0x8BBF: 0x97FF,
                0x8BC0: 0x9957,
                0x8BC1: 0x9A5A,
                0x8BC2: 0x4EF0,
                0x8BC3: 0x51DD,
                0x8BC4: 0x5C2D,
                0x8BC5: 0x6681,
                0x8BC6: 0x696D,
                0x8BC7: 0x5C40,
                0x8BC8: 0x66F2,
                0x8BC9: 0x6975,
                0x8BCA: 0x7389,
                0x8BCB: 0x6850,
                0x8BCC: 0x7C81,
                0x8BCD: 0x50C5,
                0x8BCE: 0x52E4,
                0x8BCF: 0x5747,
                0x8BD0: 0x5DFE,
                0x8BD1: 0x9326,
                0x8BD2: 0x65A4,
                0x8BD3: 0x6B23,
                0x8BD4: 0x6B3D,
                0x8BD5: 0x7434,
                0x8BD6: 0x7981,
                0x8BD7: 0x79BD,
                0x8BD8: 0x7B4B,
                0x8BD9: 0x7DCA,
                0x8BDA: 0x82B9,
                0x8BDB: 0x83CC,
                0x8BDC: 0x887F,
                0x8BDD: 0x895F,
                0x8BDE: 0x8B39,
                0x8BDF: 0x8FD1,
                0x8BE0: 0x91D1,
                0x8BE1: 0x541F,
                0x8BE2: 0x9280,
                0x8BE3: 0x4E5D,
                0x8BE4: 0x5036,
                0x8BE5: 0x53E5,
                0x8BE6: 0x533A,
                0x8BE7: 0x72D7,
                0x8BE8: 0x7396,
                0x8BE9: 0x77E9,
                0x8BEA: 0x82E6,
                0x8BEB: 0x8EAF,
                0x8BEC: 0x99C6,
                0x8BED: 0x99C8,
                0x8BEE: 0x99D2,
                0x8BEF: 0x5177,
                0x8BF0: 0x611A,
                0x8BF1: 0x865E,
                0x8BF2: 0x55B0,
                0x8BF3: 0x7A7A,
                0x8BF4: 0x5076,
                0x8BF5: 0x5BD3,
                0x8BF6: 0x9047,
                0x8BF7: 0x9685,
                0x8BF8: 0x4E32,
                0x8BF9: 0x6ADB,
                0x8BFA: 0x91E7,
                0x8BFB: 0x5C51,
                0x8BFC: 0x5C48,
                0x8C40: 0x6398,
                0x8C41: 0x7A9F,
                0x8C42: 0x6C93,
                0x8C43: 0x9774,
                0x8C44: 0x8F61,
                0x8C45: 0x7AAA,
                0x8C46: 0x718A,
                0x8C47: 0x9688,
                0x8C48: 0x7C82,
                0x8C49: 0x6817,
                0x8C4A: 0x7E70,
                0x8C4B: 0x6851,
                0x8C4C: 0x936C,
                0x8C4D: 0x52F2,
                0x8C4E: 0x541B,
                0x8C4F: 0x85AB,
                0x8C50: 0x8A13,
                0x8C51: 0x7FA4,
                0x8C52: 0x8ECD,
                0x8C53: 0x90E1,
                0x8C54: 0x5366,
                0x8C55: 0x8888,
                0x8C56: 0x7941,
                0x8C57: 0x4FC2,
                0x8C58: 0x50BE,
                0x8C59: 0x5211,
                0x8C5A: 0x5144,
                0x8C5B: 0x5553,
                0x8C5C: 0x572D,
                0x8C5D: 0x73EA,
                0x8C5E: 0x578B,
                0x8C5F: 0x5951,
                0x8C60: 0x5F62,
                0x8C61: 0x5F84,
                0x8C62: 0x6075,
                0x8C63: 0x6176,
                0x8C64: 0x6167,
                0x8C65: 0x61A9,
                0x8C66: 0x63B2,
                0x8C67: 0x643A,
                0x8C68: 0x656C,
                0x8C69: 0x666F,
                0x8C6A: 0x6842,
                0x8C6B: 0x6E13,
                0x8C6C: 0x7566,
                0x8C6D: 0x7A3D,
                0x8C6E: 0x7CFB,
                0x8C6F: 0x7D4C,
                0x8C70: 0x7D99,
                0x8C71: 0x7E4B,
                0x8C72: 0x7F6B,
                0x8C73: 0x830E,
                0x8C74: 0x834A,
                0x8C75: 0x86CD,
                0x8C76: 0x8A08,
                0x8C77: 0x8A63,
                0x8C78: 0x8B66,
                0x8C79: 0x8EFD,
                0x8C7A: 0x981A,
                0x8C7B: 0x9D8F,
                0x8C7C: 0x82B8,
                0x8C7D: 0x8FCE,
                0x8C7E: 0x9BE8,
                0x8C80: 0x5287,
                0x8C81: 0x621F,
                0x8C82: 0x6483,
                0x8C83: 0x6FC0,
                0x8C84: 0x9699,
                0x8C85: 0x6841,
                0x8C86: 0x5091,
                0x8C87: 0x6B20,
                0x8C88: 0x6C7A,
                0x8C89: 0x6F54,
                0x8C8A: 0x7A74,
                0x8C8B: 0x7D50,
                0x8C8C: 0x8840,
                0x8C8D: 0x8A23,
                0x8C8E: 0x6708,
                0x8C8F: 0x4EF6,
                0x8C90: 0x5039,
                0x8C91: 0x5026,
                0x8C92: 0x5065,
                0x8C93: 0x517C,
                0x8C94: 0x5238,
                0x8C95: 0x5263,
                0x8C96: 0x55A7,
                0x8C97: 0x570F,
                0x8C98: 0x5805,
                0x8C99: 0x5ACC,
                0x8C9A: 0x5EFA,
                0x8C9B: 0x61B2,
                0x8C9C: 0x61F8,
                0x8C9D: 0x62F3,
                0x8C9E: 0x6372,
                0x8C9F: 0x691C,
                0x8CA0: 0x6A29,
                0x8CA1: 0x727D,
                0x8CA2: 0x72AC,
                0x8CA3: 0x732E,
                0x8CA4: 0x7814,
                0x8CA5: 0x786F,
                0x8CA6: 0x7D79,
                0x8CA7: 0x770C,
                0x8CA8: 0x80A9,
                0x8CA9: 0x898B,
                0x8CAA: 0x8B19,
                0x8CAB: 0x8CE2,
                0x8CAC: 0x8ED2,
                0x8CAD: 0x9063,
                0x8CAE: 0x9375,
                0x8CAF: 0x967A,
                0x8CB0: 0x9855,
                0x8CB1: 0x9A13,
                0x8CB2: 0x9E78,
                0x8CB3: 0x5143,
                0x8CB4: 0x539F,
                0x8CB5: 0x53B3,
                0x8CB6: 0x5E7B,
                0x8CB7: 0x5F26,
                0x8CB8: 0x6E1B,
                0x8CB9: 0x6E90,
                0x8CBA: 0x7384,
                0x8CBB: 0x73FE,
                0x8CBC: 0x7D43,
                0x8CBD: 0x8237,
                0x8CBE: 0x8A00,
                0x8CBF: 0x8AFA,
                0x8CC0: 0x9650,
                0x8CC1: 0x4E4E,
                0x8CC2: 0x500B,
                0x8CC3: 0x53E4,
                0x8CC4: 0x547C,
                0x8CC5: 0x56FA,
                0x8CC6: 0x59D1,
                0x8CC7: 0x5B64,
                0x8CC8: 0x5DF1,
                0x8CC9: 0x5EAB,
                0x8CCA: 0x5F27,
                0x8CCB: 0x6238,
                0x8CCC: 0x6545,
                0x8CCD: 0x67AF,
                0x8CCE: 0x6E56,
                0x8CCF: 0x72D0,
                0x8CD0: 0x7CCA,
                0x8CD1: 0x88B4,
                0x8CD2: 0x80A1,
                0x8CD3: 0x80E1,
                0x8CD4: 0x83F0,
                0x8CD5: 0x864E,
                0x8CD6: 0x8A87,
                0x8CD7: 0x8DE8,
                0x8CD8: 0x9237,
                0x8CD9: 0x96C7,
                0x8CDA: 0x9867,
                0x8CDB: 0x9F13,
                0x8CDC: 0x4E94,
                0x8CDD: 0x4E92,
                0x8CDE: 0x4F0D,
                0x8CDF: 0x5348,
                0x8CE0: 0x5449,
                0x8CE1: 0x543E,
                0x8CE2: 0x5A2F,
                0x8CE3: 0x5F8C,
                0x8CE4: 0x5FA1,
                0x8CE5: 0x609F,
                0x8CE6: 0x68A7,
                0x8CE7: 0x6A8E,
                0x8CE8: 0x745A,
                0x8CE9: 0x7881,
                0x8CEA: 0x8A9E,
                0x8CEB: 0x8AA4,
                0x8CEC: 0x8B77,
                0x8CED: 0x9190,
                0x8CEE: 0x4E5E,
                0x8CEF: 0x9BC9,
                0x8CF0: 0x4EA4,
                0x8CF1: 0x4F7C,
                0x8CF2: 0x4FAF,
                0x8CF3: 0x5019,
                0x8CF4: 0x5016,
                0x8CF5: 0x5149,
                0x8CF6: 0x516C,
                0x8CF7: 0x529F,
                0x8CF8: 0x52B9,
                0x8CF9: 0x52FE,
                0x8CFA: 0x539A,
                0x8CFB: 0x53E3,
                0x8CFC: 0x5411,
                0x8D40: 0x540E,
                0x8D41: 0x5589,
                0x8D42: 0x5751,
                0x8D43: 0x57A2,
                0x8D44: 0x597D,
                0x8D45: 0x5B54,
                0x8D46: 0x5B5D,
                0x8D47: 0x5B8F,
                0x8D48: 0x5DE5,
                0x8D49: 0x5DE7,
                0x8D4A: 0x5DF7,
                0x8D4B: 0x5E78,
                0x8D4C: 0x5E83,
                0x8D4D: 0x5E9A,
                0x8D4E: 0x5EB7,
                0x8D4F: 0x5F18,
                0x8D50: 0x6052,
                0x8D51: 0x614C,
                0x8D52: 0x6297,
                0x8D53: 0x62D8,
                0x8D54: 0x63A7,
                0x8D55: 0x653B,
                0x8D56: 0x6602,
                0x8D57: 0x6643,
                0x8D58: 0x66F4,
                0x8D59: 0x676D,
                0x8D5A: 0x6821,
                0x8D5B: 0x6897,
                0x8D5C: 0x69CB,
                0x8D5D: 0x6C5F,
                0x8D5E: 0x6D2A,
                0x8D5F: 0x6D69,
                0x8D60: 0x6E2F,
                0x8D61: 0x6E9D,
                0x8D62: 0x7532,
                0x8D63: 0x7687,
                0x8D64: 0x786C,
                0x8D65: 0x7A3F,
                0x8D66: 0x7CE0,
                0x8D67: 0x7D05,
                0x8D68: 0x7D18,
                0x8D69: 0x7D5E,
                0x8D6A: 0x7DB1,
                0x8D6B: 0x8015,
                0x8D6C: 0x8003,
                0x8D6D: 0x80AF,
                0x8D6E: 0x80B1,
                0x8D6F: 0x8154,
                0x8D70: 0x818F,
                0x8D71: 0x822A,
                0x8D72: 0x8352,
                0x8D73: 0x884C,
                0x8D74: 0x8861,
                0x8D75: 0x8B1B,
                0x8D76: 0x8CA2,
                0x8D77: 0x8CFC,
                0x8D78: 0x90CA,
                0x8D79: 0x9175,
                0x8D7A: 0x9271,
                0x8D7B: 0x783F,
                0x8D7C: 0x92FC,
                0x8D7D: 0x95A4,
                0x8D7E: 0x964D,
                0x8D80: 0x9805,
                0x8D81: 0x9999,
                0x8D82: 0x9AD8,
                0x8D83: 0x9D3B,
                0x8D84: 0x525B,
                0x8D85: 0x52AB,
                0x8D86: 0x53F7,
                0x8D87: 0x5408,
                0x8D88: 0x58D5,
                0x8D89: 0x62F7,
                0x8D8A: 0x6FE0,
                0x8D8B: 0x8C6A,
                0x8D8C: 0x8F5F,
                0x8D8D: 0x9EB9,
                0x8D8E: 0x514B,
                0x8D8F: 0x523B,
                0x8D90: 0x544A,
                0x8D91: 0x56FD,
                0x8D92: 0x7A40,
                0x8D93: 0x9177,
                0x8D94: 0x9D60,
                0x8D95: 0x9ED2,
                0x8D96: 0x7344,
                0x8D97: 0x6F09,
                0x8D98: 0x8170,
                0x8D99: 0x7511,
                0x8D9A: 0x5FFD,
                0x8D9B: 0x60DA,
                0x8D9C: 0x9AA8,
                0x8D9D: 0x72DB,
                0x8D9E: 0x8FBC,
                0x8D9F: 0x6B64,
                0x8DA0: 0x9803,
                0x8DA1: 0x4ECA,
                0x8DA2: 0x56F0,
                0x8DA3: 0x5764,
                0x8DA4: 0x58BE,
                0x8DA5: 0x5A5A,
                0x8DA6: 0x6068,
                0x8DA7: 0x61C7,
                0x8DA8: 0x660F,
                0x8DA9: 0x6606,
                0x8DAA: 0x6839,
                0x8DAB: 0x68B1,
                0x8DAC: 0x6DF7,
                0x8DAD: 0x75D5,
                0x8DAE: 0x7D3A,
                0x8DAF: 0x826E,
                0x8DB0: 0x9B42,
                0x8DB1: 0x4E9B,
                0x8DB2: 0x4F50,
                0x8DB3: 0x53C9,
                0x8DB4: 0x5506,
                0x8DB5: 0x5D6F,
                0x8DB6: 0x5DE6,
                0x8DB7: 0x5DEE,
                0x8DB8: 0x67FB,
                0x8DB9: 0x6C99,
                0x8DBA: 0x7473,
                0x8DBB: 0x7802,
                0x8DBC: 0x8A50,
                0x8DBD: 0x9396,
                0x8DBE: 0x88DF,
                0x8DBF: 0x5750,
                0x8DC0: 0x5EA7,
                0x8DC1: 0x632B,
                0x8DC2: 0x50B5,
                0x8DC3: 0x50AC,
                0x8DC4: 0x518D,
                0x8DC5: 0x6700,
                0x8DC6: 0x54C9,
                0x8DC7: 0x585E,
                0x8DC8: 0x59BB,
                0x8DC9: 0x5BB0,
                0x8DCA: 0x5F69,
                0x8DCB: 0x624D,
                0x8DCC: 0x63A1,
                0x8DCD: 0x683D,
                0x8DCE: 0x6B73,
                0x8DCF: 0x6E08,
                0x8DD0: 0x707D,
                0x8DD1: 0x91C7,
                0x8DD2: 0x7280,
                0x8DD3: 0x7815,
                0x8DD4: 0x7826,
                0x8DD5: 0x796D,
                0x8DD6: 0x658E,
                0x8DD7: 0x7D30,
                0x8DD8: 0x83DC,
                0x8DD9: 0x88C1,
                0x8DDA: 0x8F09,
                0x8DDB: 0x969B,
                0x8DDC: 0x5264,
                0x8DDD: 0x5728,
                0x8DDE: 0x6750,
                0x8DDF: 0x7F6A,
                0x8DE0: 0x8CA1,
                0x8DE1: 0x51B4,
                0x8DE2: 0x5742,
                0x8DE3: 0x962A,
                0x8DE4: 0x583A,
                0x8DE5: 0x698A,
                0x8DE6: 0x80B4,
                0x8DE7: 0x54B2,
                0x8DE8: 0x5D0E,
                0x8DE9: 0x57FC,
                0x8DEA: 0x7895,
                0x8DEB: 0x9DFA,
                0x8DEC: 0x4F5C,
                0x8DED: 0x524A,
                0x8DEE: 0x548B,
                0x8DEF: 0x643E,
                0x8DF0: 0x6628,
                0x8DF1: 0x6714,
                0x8DF2: 0x67F5,
                0x8DF3: 0x7A84,
                0x8DF4: 0x7B56,
                0x8DF5: 0x7D22,
                0x8DF6: 0x932F,
                0x8DF7: 0x685C,
                0x8DF8: 0x9BAD,
                0x8DF9: 0x7B39,
                0x8DFA: 0x5319,
                0x8DFB: 0x518A,
                0x8DFC: 0x5237,
                0x8E40: 0x5BDF,
                0x8E41: 0x62F6,
                0x8E42: 0x64AE,
                0x8E43: 0x64E6,
                0x8E44: 0x672D,
                0x8E45: 0x6BBA,
                0x8E46: 0x85A9,
                0x8E47: 0x96D1,
                0x8E48: 0x7690,
                0x8E49: 0x9BD6,
                0x8E4A: 0x634C,
                0x8E4B: 0x9306,
                0x8E4C: 0x9BAB,
                0x8E4D: 0x76BF,
                0x8E4E: 0x6652,
                0x8E4F: 0x4E09,
                0x8E50: 0x5098,
                0x8E51: 0x53C2,
                0x8E52: 0x5C71,
                0x8E53: 0x60E8,
                0x8E54: 0x6492,
                0x8E55: 0x6563,
                0x8E56: 0x685F,
                0x8E57: 0x71E6,
                0x8E58: 0x73CA,
                0x8E59: 0x7523,
                0x8E5A: 0x7B97,
                0x8E5B: 0x7E82,
                0x8E5C: 0x8695,
                0x8E5D: 0x8B83,
                0x8E5E: 0x8CDB,
                0x8E5F: 0x9178,
                0x8E60: 0x9910,
                0x8E61: 0x65AC,
                0x8E62: 0x66AB,
                0x8E63: 0x6B8B,
                0x8E64: 0x4ED5,
                0x8E65: 0x4ED4,
                0x8E66: 0x4F3A,
                0x8E67: 0x4F7F,
                0x8E68: 0x523A,
                0x8E69: 0x53F8,
                0x8E6A: 0x53F2,
                0x8E6B: 0x55E3,
                0x8E6C: 0x56DB,
                0x8E6D: 0x58EB,
                0x8E6E: 0x59CB,
                0x8E6F: 0x59C9,
                0x8E70: 0x59FF,
                0x8E71: 0x5B50,
                0x8E72: 0x5C4D,
                0x8E73: 0x5E02,
                0x8E74: 0x5E2B,
                0x8E75: 0x5FD7,
                0x8E76: 0x601D,
                0x8E77: 0x6307,
                0x8E78: 0x652F,
                0x8E79: 0x5B5C,
                0x8E7A: 0x65AF,
                0x8E7B: 0x65BD,
                0x8E7C: 0x65E8,
                0x8E7D: 0x679D,
                0x8E7E: 0x6B62,
                0x8E80: 0x6B7B,
                0x8E81: 0x6C0F,
                0x8E82: 0x7345,
                0x8E83: 0x7949,
                0x8E84: 0x79C1,
                0x8E85: 0x7CF8,
                0x8E86: 0x7D19,
                0x8E87: 0x7D2B,
                0x8E88: 0x80A2,
                0x8E89: 0x8102,
                0x8E8A: 0x81F3,
                0x8E8B: 0x8996,
                0x8E8C: 0x8A5E,
                0x8E8D: 0x8A69,
                0x8E8E: 0x8A66,
                0x8E8F: 0x8A8C,
                0x8E90: 0x8AEE,
                0x8E91: 0x8CC7,
                0x8E92: 0x8CDC,
                0x8E93: 0x96CC,
                0x8E94: 0x98FC,
                0x8E95: 0x6B6F,
                0x8E96: 0x4E8B,
                0x8E97: 0x4F3C,
                0x8E98: 0x4F8D,
                0x8E99: 0x5150,
                0x8E9A: 0x5B57,
                0x8E9B: 0x5BFA,
                0x8E9C: 0x6148,
                0x8E9D: 0x6301,
                0x8E9E: 0x6642,
                0x8E9F: 0x6B21,
                0x8EA0: 0x6ECB,
                0x8EA1: 0x6CBB,
                0x8EA2: 0x723E,
                0x8EA3: 0x74BD,
                0x8EA4: 0x75D4,
                0x8EA5: 0x78C1,
                0x8EA6: 0x793A,
                0x8EA7: 0x800C,
                0x8EA8: 0x8033,
                0x8EA9: 0x81EA,
                0x8EAA: 0x8494,
                0x8EAB: 0x8F9E,
                0x8EAC: 0x6C50,
                0x8EAD: 0x9E7F,
                0x8EAE: 0x5F0F,
                0x8EAF: 0x8B58,
                0x8EB0: 0x9D2B,
                0x8EB1: 0x7AFA,
                0x8EB2: 0x8EF8,
                0x8EB3: 0x5B8D,
                0x8EB4: 0x96EB,
                0x8EB5: 0x4E03,
                0x8EB6: 0x53F1,
                0x8EB7: 0x57F7,
                0x8EB8: 0x5931,
                0x8EB9: 0x5AC9,
                0x8EBA: 0x5BA4,
                0x8EBB: 0x6089,
                0x8EBC: 0x6E7F,
                0x8EBD: 0x6F06,
                0x8EBE: 0x75BE,
                0x8EBF: 0x8CEA,
                0x8EC0: 0x5B9F,
                0x8EC1: 0x8500,
                0x8EC2: 0x7BE0,
                0x8EC3: 0x5072,
                0x8EC4: 0x67F4,
                0x8EC5: 0x829D,
                0x8EC6: 0x5C61,
                0x8EC7: 0x854A,
                0x8EC8: 0x7E1E,
                0x8EC9: 0x820E,
                0x8ECA: 0x5199,
                0x8ECB: 0x5C04,
                0x8ECC: 0x6368,
                0x8ECD: 0x8D66,
                0x8ECE: 0x659C,
                0x8ECF: 0x716E,
                0x8ED0: 0x793E,
                0x8ED1: 0x7D17,
                0x8ED2: 0x8005,
                0x8ED3: 0x8B1D,
                0x8ED4: 0x8ECA,
                0x8ED5: 0x906E,
                0x8ED6: 0x86C7,
                0x8ED7: 0x90AA,
                0x8ED8: 0x501F,
                0x8ED9: 0x52FA,
                0x8EDA: 0x5C3A,
                0x8EDB: 0x6753,
                0x8EDC: 0x707C,
                0x8EDD: 0x7235,
                0x8EDE: 0x914C,
                0x8EDF: 0x91C8,
                0x8EE0: 0x932B,
                0x8EE1: 0x82E5,
                0x8EE2: 0x5BC2,
                0x8EE3: 0x5F31,
                0x8EE4: 0x60F9,
                0x8EE5: 0x4E3B,
                0x8EE6: 0x53D6,
                0x8EE7: 0x5B88,
                0x8EE8: 0x624B,
                0x8EE9: 0x6731,
                0x8EEA: 0x6B8A,
                0x8EEB: 0x72E9,
                0x8EEC: 0x73E0,
                0x8EED: 0x7A2E,
                0x8EEE: 0x816B,
                0x8EEF: 0x8DA3,
                0x8EF0: 0x9152,
                0x8EF1: 0x9996,
                0x8EF2: 0x5112,
                0x8EF3: 0x53D7,
                0x8EF4: 0x546A,
                0x8EF5: 0x5BFF,
                0x8EF6: 0x6388,
                0x8EF7: 0x6A39,
                0x8EF8: 0x7DAC,
                0x8EF9: 0x9700,
                0x8EFA: 0x56DA,
                0x8EFB: 0x53CE,
                0x8EFC: 0x5468,
                0x8F40: 0x5B97,
                0x8F41: 0x5C31,
                0x8F42: 0x5DDE,
                0x8F43: 0x4FEE,
                0x8F44: 0x6101,
                0x8F45: 0x62FE,
                0x8F46: 0x6D32,
                0x8F47: 0x79C0,
                0x8F48: 0x79CB,
                0x8F49: 0x7D42,
                0x8F4A: 0x7E4D,
                0x8F4B: 0x7FD2,
                0x8F4C: 0x81ED,
                0x8F4D: 0x821F,
                0x8F4E: 0x8490,
                0x8F4F: 0x8846,
                0x8F50: 0x8972,
                0x8F51: 0x8B90,
                0x8F52: 0x8E74,
                0x8F53: 0x8F2F,
                0x8F54: 0x9031,
                0x8F55: 0x914B,
                0x8F56: 0x916C,
                0x8F57: 0x96C6,
                0x8F58: 0x919C,
                0x8F59: 0x4EC0,
                0x8F5A: 0x4F4F,
                0x8F5B: 0x5145,
                0x8F5C: 0x5341,
                0x8F5D: 0x5F93,
                0x8F5E: 0x620E,
                0x8F5F: 0x67D4,
                0x8F60: 0x6C41,
                0x8F61: 0x6E0B,
                0x8F62: 0x7363,
                0x8F63: 0x7E26,
                0x8F64: 0x91CD,
                0x8F65: 0x9283,
                0x8F66: 0x53D4,
                0x8F67: 0x5919,
                0x8F68: 0x5BBF,
                0x8F69: 0x6DD1,
                0x8F6A: 0x795D,
                0x8F6B: 0x7E2E,
                0x8F6C: 0x7C9B,
                0x8F6D: 0x587E,
                0x8F6E: 0x719F,
                0x8F6F: 0x51FA,
                0x8F70: 0x8853,
                0x8F71: 0x8FF0,
                0x8F72: 0x4FCA,
                0x8F73: 0x5CFB,
                0x8F74: 0x6625,
                0x8F75: 0x77AC,
                0x8F76: 0x7AE3,
                0x8F77: 0x821C,
                0x8F78: 0x99FF,
                0x8F79: 0x51C6,
                0x8F7A: 0x5FAA,
                0x8F7B: 0x65EC,
                0x8F7C: 0x696F,
                0x8F7D: 0x6B89,
                0x8F7E: 0x6DF3,
                0x8F80: 0x6E96,
                0x8F81: 0x6F64,
                0x8F82: 0x76FE,
                0x8F83: 0x7D14,
                0x8F84: 0x5DE1,
                0x8F85: 0x9075,
                0x8F86: 0x9187,
                0x8F87: 0x9806,
                0x8F88: 0x51E6,
                0x8F89: 0x521D,
                0x8F8A: 0x6240,
                0x8F8B: 0x6691,
                0x8F8C: 0x66D9,
                0x8F8D: 0x6E1A,
                0x8F8E: 0x5EB6,
                0x8F8F: 0x7DD2,
                0x8F90: 0x7F72,
                0x8F91: 0x66F8,
                0x8F92: 0x85AF,
                0x8F93: 0x85F7,
                0x8F94: 0x8AF8,
                0x8F95: 0x52A9,
                0x8F96: 0x53D9,
                0x8F97: 0x5973,
                0x8F98: 0x5E8F,
                0x8F99: 0x5F90,
                0x8F9A: 0x6055,
                0x8F9B: 0x92E4,
                0x8F9C: 0x9664,
                0x8F9D: 0x50B7,
                0x8F9E: 0x511F,
                0x8F9F: 0x52DD,
                0x8FA0: 0x5320,
                0x8FA1: 0x5347,
                0x8FA2: 0x53EC,
                0x8FA3: 0x54E8,
                0x8FA4: 0x5546,
                0x8FA5: 0x5531,
                0x8FA6: 0x5617,
                0x8FA7: 0x5968,
                0x8FA8: 0x59BE,
                0x8FA9: 0x5A3C,
                0x8FAA: 0x5BB5,
                0x8FAB: 0x5C06,
                0x8FAC: 0x5C0F,
                0x8FAD: 0x5C11,
                0x8FAE: 0x5C1A,
                0x8FAF: 0x5E84,
                0x8FB0: 0x5E8A,
                0x8FB1: 0x5EE0,
                0x8FB2: 0x5F70,
                0x8FB3: 0x627F,
                0x8FB4: 0x6284,
                0x8FB5: 0x62DB,
                0x8FB6: 0x638C,
                0x8FB7: 0x6377,
                0x8FB8: 0x6607,
                0x8FB9: 0x660C,
                0x8FBA: 0x662D,
                0x8FBB: 0x6676,
                0x8FBC: 0x677E,
                0x8FBD: 0x68A2,
                0x8FBE: 0x6A1F,
                0x8FBF: 0x6A35,
                0x8FC0: 0x6CBC,
                0x8FC1: 0x6D88,
                0x8FC2: 0x6E09,
                0x8FC3: 0x6E58,
                0x8FC4: 0x713C,
                0x8FC5: 0x7126,
                0x8FC6: 0x7167,
                0x8FC7: 0x75C7,
                0x8FC8: 0x7701,
                0x8FC9: 0x785D,
                0x8FCA: 0x7901,
                0x8FCB: 0x7965,
                0x8FCC: 0x79F0,
                0x8FCD: 0x7AE0,
                0x8FCE: 0x7B11,
                0x8FCF: 0x7CA7,
                0x8FD0: 0x7D39,
                0x8FD1: 0x8096,
                0x8FD2: 0x83D6,
                0x8FD3: 0x848B,
                0x8FD4: 0x8549,
                0x8FD5: 0x885D,
                0x8FD6: 0x88F3,
                0x8FD7: 0x8A1F,
                0x8FD8: 0x8A3C,
                0x8FD9: 0x8A54,
                0x8FDA: 0x8A73,
                0x8FDB: 0x8C61,
                0x8FDC: 0x8CDE,
                0x8FDD: 0x91A4,
                0x8FDE: 0x9266,
                0x8FDF: 0x937E,
                0x8FE0: 0x9418,
                0x8FE1: 0x969C,
                0x8FE2: 0x9798,
                0x8FE3: 0x4E0A,
                0x8FE4: 0x4E08,
                0x8FE5: 0x4E1E,
                0x8FE6: 0x4E57,
                0x8FE7: 0x5197,
                0x8FE8: 0x5270,
                0x8FE9: 0x57CE,
                0x8FEA: 0x5834,
                0x8FEB: 0x58CC,
                0x8FEC: 0x5B22,
                0x8FED: 0x5E38,
                0x8FEE: 0x60C5,
                0x8FEF: 0x64FE,
                0x8FF0: 0x6761,
                0x8FF1: 0x6756,
                0x8FF2: 0x6D44,
                0x8FF3: 0x72B6,
                0x8FF4: 0x7573,
                0x8FF5: 0x7A63,
                0x8FF6: 0x84B8,
                0x8FF7: 0x8B72,
                0x8FF8: 0x91B8,
                0x8FF9: 0x9320,
                0x8FFA: 0x5631,
                0x8FFB: 0x57F4,
                0x8FFC: 0x98FE,
                0x9040: 0x62ED,
                0x9041: 0x690D,
                0x9042: 0x6B96,
                0x9043: 0x71ED,
                0x9044: 0x7E54,
                0x9045: 0x8077,
                0x9046: 0x8272,
                0x9047: 0x89E6,
                0x9048: 0x98DF,
                0x9049: 0x8755,
                0x904A: 0x8FB1,
                0x904B: 0x5C3B,
                0x904C: 0x4F38,
                0x904D: 0x4FE1,
                0x904E: 0x4FB5,
                0x904F: 0x5507,
                0x9050: 0x5A20,
                0x9051: 0x5BDD,
                0x9052: 0x5BE9,
                0x9053: 0x5FC3,
                0x9054: 0x614E,
                0x9055: 0x632F,
                0x9056: 0x65B0,
                0x9057: 0x664B,
                0x9058: 0x68EE,
                0x9059: 0x699B,
                0x905A: 0x6D78,
                0x905B: 0x6DF1,
                0x905C: 0x7533,
                0x905D: 0x75B9,
                0x905E: 0x771F,
                0x905F: 0x795E,
                0x9060: 0x79E6,
                0x9061: 0x7D33,
                0x9062: 0x81E3,
                0x9063: 0x82AF,
                0x9064: 0x85AA,
                0x9065: 0x89AA,
                0x9066: 0x8A3A,
                0x9067: 0x8EAB,
                0x9068: 0x8F9B,
                0x9069: 0x9032,
                0x906A: 0x91DD,
                0x906B: 0x9707,
                0x906C: 0x4EBA,
                0x906D: 0x4EC1,
                0x906E: 0x5203,
                0x906F: 0x5875,
                0x9070: 0x58EC,
                0x9071: 0x5C0B,
                0x9072: 0x751A,
                0x9073: 0x5C3D,
                0x9074: 0x814E,
                0x9075: 0x8A0A,
                0x9076: 0x8FC5,
                0x9077: 0x9663,
                0x9078: 0x976D,
                0x9079: 0x7B25,
                0x907A: 0x8ACF,
                0x907B: 0x9808,
                0x907C: 0x9162,
                0x907D: 0x56F3,
                0x907E: 0x53A8,
                0x9080: 0x9017,
                0x9081: 0x5439,
                0x9082: 0x5782,
                0x9083: 0x5E25,
                0x9084: 0x63A8,
                0x9085: 0x6C34,
                0x9086: 0x708A,
                0x9087: 0x7761,
                0x9088: 0x7C8B,
                0x9089: 0x7FE0,
                0x908A: 0x8870,
                0x908B: 0x9042,
                0x908C: 0x9154,
                0x908D: 0x9310,
                0x908E: 0x9318,
                0x908F: 0x968F,
                0x9090: 0x745E,
                0x9091: 0x9AC4,
                0x9092: 0x5D07,
                0x9093: 0x5D69,
                0x9094: 0x6570,
                0x9095: 0x67A2,
                0x9096: 0x8DA8,
                0x9097: 0x96DB,
                0x9098: 0x636E,
                0x9099: 0x6749,
                0x909A: 0x6919,
                0x909B: 0x83C5,
                0x909C: 0x9817,
                0x909D: 0x96C0,
                0x909E: 0x88FE,
                0x909F: 0x6F84,
                0x90A0: 0x647A,
                0x90A1: 0x5BF8,
                0x90A2: 0x4E16,
                0x90A3: 0x702C,
                0x90A4: 0x755D,
                0x90A5: 0x662F,
                0x90A6: 0x51C4,
                0x90A7: 0x5236,
                0x90A8: 0x52E2,
                0x90A9: 0x59D3,
                0x90AA: 0x5F81,
                0x90AB: 0x6027,
                0x90AC: 0x6210,
                0x90AD: 0x653F,
                0x90AE: 0x6574,
                0x90AF: 0x661F,
                0x90B0: 0x6674,
                0x90B1: 0x68F2,
                0x90B2: 0x6816,
                0x90B3: 0x6B63,
                0x90B4: 0x6E05,
                0x90B5: 0x7272,
                0x90B6: 0x751F,
                0x90B7: 0x76DB,
                0x90B8: 0x7CBE,
                0x90B9: 0x8056,
                0x90BA: 0x58F0,
                0x90BB: 0x88FD,
                0x90BC: 0x897F,
                0x90BD: 0x8AA0,
                0x90BE: 0x8A93,
                0x90BF: 0x8ACB,
                0x90C0: 0x901D,
                0x90C1: 0x9192,
                0x90C2: 0x9752,
                0x90C3: 0x9759,
                0x90C4: 0x6589,
                0x90C5: 0x7A0E,
                0x90C6: 0x8106,
                0x90C7: 0x96BB,
                0x90C8: 0x5E2D,
                0x90C9: 0x60DC,
                0x90CA: 0x621A,
                0x90CB: 0x65A5,
                0x90CC: 0x6614,
                0x90CD: 0x6790,
                0x90CE: 0x77F3,
                0x90CF: 0x7A4D,
                0x90D0: 0x7C4D,
                0x90D1: 0x7E3E,
                0x90D2: 0x810A,
                0x90D3: 0x8CAC,
                0x90D4: 0x8D64,
                0x90D5: 0x8DE1,
                0x90D6: 0x8E5F,
                0x90D7: 0x78A9,
                0x90D8: 0x5207,
                0x90D9: 0x62D9,
                0x90DA: 0x63A5,
                0x90DB: 0x6442,
                0x90DC: 0x6298,
                0x90DD: 0x8A2D,
                0x90DE: 0x7A83,
                0x90DF: 0x7BC0,
                0x90E0: 0x8AAC,
                0x90E1: 0x96EA,
                0x90E2: 0x7D76,
                0x90E3: 0x820C,
                0x90E4: 0x8749,
                0x90E5: 0x4ED9,
                0x90E6: 0x5148,
                0x90E7: 0x5343,
                0x90E8: 0x5360,
                0x90E9: 0x5BA3,
                0x90EA: 0x5C02,
                0x90EB: 0x5C16,
                0x90EC: 0x5DDD,
                0x90ED: 0x6226,
                0x90EE: 0x6247,
                0x90EF: 0x64B0,
                0x90F0: 0x6813,
                0x90F1: 0x6834,
                0x90F2: 0x6CC9,
                0x90F3: 0x6D45,
                0x90F4: 0x6D17,
                0x90F5: 0x67D3,
                0x90F6: 0x6F5C,
                0x90F7: 0x714E,
                0x90F8: 0x717D,
                0x90F9: 0x65CB,
                0x90FA: 0x7A7F,
                0x90FB: 0x7BAD,
                0x90FC: 0x7DDA,
                0x9140: 0x7E4A,
                0x9141: 0x7FA8,
                0x9142: 0x817A,
                0x9143: 0x821B,
                0x9144: 0x8239,
                0x9145: 0x85A6,
                0x9146: 0x8A6E,
                0x9147: 0x8CCE,
                0x9148: 0x8DF5,
                0x9149: 0x9078,
                0x914A: 0x9077,
                0x914B: 0x92AD,
                0x914C: 0x9291,
                0x914D: 0x9583,
                0x914E: 0x9BAE,
                0x914F: 0x524D,
                0x9150: 0x5584,
                0x9151: 0x6F38,
                0x9152: 0x7136,
                0x9153: 0x5168,
                0x9154: 0x7985,
                0x9155: 0x7E55,
                0x9156: 0x81B3,
                0x9157: 0x7CCE,
                0x9158: 0x564C,
                0x9159: 0x5851,
                0x915A: 0x5CA8,
                0x915B: 0x63AA,
                0x915C: 0x66FE,
                0x915D: 0x66FD,
                0x915E: 0x695A,
                0x915F: 0x72D9,
                0x9160: 0x758F,
                0x9161: 0x758E,
                0x9162: 0x790E,
                0x9163: 0x7956,
                0x9164: 0x79DF,
                0x9165: 0x7C97,
                0x9166: 0x7D20,
                0x9167: 0x7D44,
                0x9168: 0x8607,
                0x9169: 0x8A34,
                0x916A: 0x963B,
                0x916B: 0x9061,
                0x916C: 0x9F20,
                0x916D: 0x50E7,
                0x916E: 0x5275,
                0x916F: 0x53CC,
                0x9170: 0x53E2,
                0x9171: 0x5009,
                0x9172: 0x55AA,
                0x9173: 0x58EE,
                0x9174: 0x594F,
                0x9175: 0x723D,
                0x9176: 0x5B8B,
                0x9177: 0x5C64,
                0x9178: 0x531D,
                0x9179: 0x60E3,
                0x917A: 0x60F3,
                0x917B: 0x635C,
                0x917C: 0x6383,
                0x917D: 0x633F,
                0x917E: 0x63BB,
                0x9180: 0x64CD,
                0x9181: 0x65E9,
                0x9182: 0x66F9,
                0x9183: 0x5DE3,
                0x9184: 0x69CD,
                0x9185: 0x69FD,
                0x9186: 0x6F15,
                0x9187: 0x71E5,
                0x9188: 0x4E89,
                0x9189: 0x75E9,
                0x918A: 0x76F8,
                0x918B: 0x7A93,
                0x918C: 0x7CDF,
                0x918D: 0x7DCF,
                0x918E: 0x7D9C,
                0x918F: 0x8061,
                0x9190: 0x8349,
                0x9191: 0x8358,
                0x9192: 0x846C,
                0x9193: 0x84BC,
                0x9194: 0x85FB,
                0x9195: 0x88C5,
                0x9196: 0x8D70,
                0x9197: 0x9001,
                0x9198: 0x906D,
                0x9199: 0x9397,
                0x919A: 0x971C,
                0x919B: 0x9A12,
                0x919C: 0x50CF,
                0x919D: 0x5897,
                0x919E: 0x618E,
                0x919F: 0x81D3,
                0x91A0: 0x8535,
                0x91A1: 0x8D08,
                0x91A2: 0x9020,
                0x91A3: 0x4FC3,
                0x91A4: 0x5074,
                0x91A5: 0x5247,
                0x91A6: 0x5373,
                0x91A7: 0x606F,
                0x91A8: 0x6349,
                0x91A9: 0x675F,
                0x91AA: 0x6E2C,
                0x91AB: 0x8DB3,
                0x91AC: 0x901F,
                0x91AD: 0x4FD7,
                0x91AE: 0x5C5E,
                0x91AF: 0x8CCA,
                0x91B0: 0x65CF,
                0x91B1: 0x7D9A,
                0x91B2: 0x5352,
                0x91B3: 0x8896,
                0x91B4: 0x5176,
                0x91B5: 0x63C3,
                0x91B6: 0x5B58,
                0x91B7: 0x5B6B,
                0x91B8: 0x5C0A,
                0x91B9: 0x640D,
                0x91BA: 0x6751,
                0x91BB: 0x905C,
                0x91BC: 0x4ED6,
                0x91BD: 0x591A,
                0x91BE: 0x592A,
                0x91BF: 0x6C70,
                0x91C0: 0x8A51,
                0x91C1: 0x553E,
                0x91C2: 0x5815,
                0x91C3: 0x59A5,
                0x91C4: 0x60F0,
                0x91C5: 0x6253,
                0x91C6: 0x67C1,
                0x91C7: 0x8235,
                0x91C8: 0x6955,
                0x91C9: 0x9640,
                0x91CA: 0x99C4,
                0x91CB: 0x9A28,
                0x91CC: 0x4F53,
                0x91CD: 0x5806,
                0x91CE: 0x5BFE,
                0x91CF: 0x8010,
                0x91D0: 0x5CB1,
                0x91D1: 0x5E2F,
                0x91D2: 0x5F85,
                0x91D3: 0x6020,
                0x91D4: 0x614B,
                0x91D5: 0x6234,
                0x91D6: 0x66FF,
                0x91D7: 0x6CF0,
                0x91D8: 0x6EDE,
                0x91D9: 0x80CE,
                0x91DA: 0x817F,
                0x91DB: 0x82D4,
                0x91DC: 0x888B,
                0x91DD: 0x8CB8,
                0x91DE: 0x9000,
                0x91DF: 0x902E,
                0x91E0: 0x968A,
                0x91E1: 0x9EDB,
                0x91E2: 0x9BDB,
                0x91E3: 0x4EE3,
                0x91E4: 0x53F0,
                0x91E5: 0x5927,
                0x91E6: 0x7B2C,
                0x91E7: 0x918D,
                0x91E8: 0x984C,
                0x91E9: 0x9DF9,
                0x91EA: 0x6EDD,
                0x91EB: 0x7027,
                0x91EC: 0x5353,
                0x91ED: 0x5544,
                0x91EE: 0x5B85,
                0x91EF: 0x6258,
                0x91F0: 0x629E,
                0x91F1: 0x62D3,
                0x91F2: 0x6CA2,
                0x91F3: 0x6FEF,
                0x91F4: 0x7422,
                0x91F5: 0x8A17,
                0x91F6: 0x9438,
                0x91F7: 0x6FC1,
                0x91F8: 0x8AFE,
                0x91F9: 0x8338,
                0x91FA: 0x51E7,
                0x91FB: 0x86F8,
                0x91FC: 0x53EA,
                0x9240: 0x53E9,
                0x9241: 0x4F46,
                0x9242: 0x9054,
                0x9243: 0x8FB0,
                0x9244: 0x596A,
                0x9245: 0x8131,
                0x9246: 0x5DFD,
                0x9247: 0x7AEA,
                0x9248: 0x8FBF,
                0x9249: 0x68DA,
                0x924A: 0x8C37,
                0x924B: 0x72F8,
                0x924C: 0x9C48,
                0x924D: 0x6A3D,
                0x924E: 0x8AB0,
                0x924F: 0x4E39,
                0x9250: 0x5358,
                0x9251: 0x5606,
                0x9252: 0x5766,
                0x9253: 0x62C5,
                0x9254: 0x63A2,
                0x9255: 0x65E6,
                0x9256: 0x6B4E,
                0x9257: 0x6DE1,
                0x9258: 0x6E5B,
                0x9259: 0x70AD,
                0x925A: 0x77ED,
                0x925B: 0x7AEF,
                0x925C: 0x7BAA,
                0x925D: 0x7DBB,
                0x925E: 0x803D,
                0x925F: 0x80C6,
                0x9260: 0x86CB,
                0x9261: 0x8A95,
                0x9262: 0x935B,
                0x9263: 0x56E3,
                0x9264: 0x58C7,
                0x9265: 0x5F3E,
                0x9266: 0x65AD,
                0x9267: 0x6696,
                0x9268: 0x6A80,
                0x9269: 0x6BB5,
                0x926A: 0x7537,
                0x926B: 0x8AC7,
                0x926C: 0x5024,
                0x926D: 0x77E5,
                0x926E: 0x5730,
                0x926F: 0x5F1B,
                0x9270: 0x6065,
                0x9271: 0x667A,
                0x9272: 0x6C60,
                0x9273: 0x75F4,
                0x9274: 0x7A1A,
                0x9275: 0x7F6E,
                0x9276: 0x81F4,
                0x9277: 0x8718,
                0x9278: 0x9045,
                0x9279: 0x99B3,
                0x927A: 0x7BC9,
                0x927B: 0x755C,
                0x927C: 0x7AF9,
                0x927D: 0x7B51,
                0x927E: 0x84C4,
                0x9280: 0x9010,
                0x9281: 0x79E9,
                0x9282: 0x7A92,
                0x9283: 0x8336,
                0x9284: 0x5AE1,
                0x9285: 0x7740,
                0x9286: 0x4E2D,
                0x9287: 0x4EF2,
                0x9288: 0x5B99,
                0x9289: 0x5FE0,
                0x928A: 0x62BD,
                0x928B: 0x663C,
                0x928C: 0x67F1,
                0x928D: 0x6CE8,
                0x928E: 0x866B,
                0x928F: 0x8877,
                0x9290: 0x8A3B,
                0x9291: 0x914E,
                0x9292: 0x92F3,
                0x9293: 0x99D0,
                0x9294: 0x6A17,
                0x9295: 0x7026,
                0x9296: 0x732A,
                0x9297: 0x82E7,
                0x9298: 0x8457,
                0x9299: 0x8CAF,
                0x929A: 0x4E01,
                0x929B: 0x5146,
                0x929C: 0x51CB,
                0x929D: 0x558B,
                0x929E: 0x5BF5,
                0x929F: 0x5E16,
                0x92A0: 0x5E33,
                0x92A1: 0x5E81,
                0x92A2: 0x5F14,
                0x92A3: 0x5F35,
                0x92A4: 0x5F6B,
                0x92A5: 0x5FB4,
                0x92A6: 0x61F2,
                0x92A7: 0x6311,
                0x92A8: 0x66A2,
                0x92A9: 0x671D,
                0x92AA: 0x6F6E,
                0x92AB: 0x7252,
                0x92AC: 0x753A,
                0x92AD: 0x773A,
                0x92AE: 0x8074,
                0x92AF: 0x8139,
                0x92B0: 0x8178,
                0x92B1: 0x8776,
                0x92B2: 0x8ABF,
                0x92B3: 0x8ADC,
                0x92B4: 0x8D85,
                0x92B5: 0x8DF3,
                0x92B6: 0x929A,
                0x92B7: 0x9577,
                0x92B8: 0x9802,
                0x92B9: 0x9CE5,
                0x92BA: 0x52C5,
                0x92BB: 0x6357,
                0x92BC: 0x76F4,
                0x92BD: 0x6715,
                0x92BE: 0x6C88,
                0x92BF: 0x73CD,
                0x92C0: 0x8CC3,
                0x92C1: 0x93AE,
                0x92C2: 0x9673,
                0x92C3: 0x6D25,
                0x92C4: 0x589C,
                0x92C5: 0x690E,
                0x92C6: 0x69CC,
                0x92C7: 0x8FFD,
                0x92C8: 0x939A,
                0x92C9: 0x75DB,
                0x92CA: 0x901A,
                0x92CB: 0x585A,
                0x92CC: 0x6802,
                0x92CD: 0x63B4,
                0x92CE: 0x69FB,
                0x92CF: 0x4F43,
                0x92D0: 0x6F2C,
                0x92D1: 0x67D8,
                0x92D2: 0x8FBB,
                0x92D3: 0x8526,
                0x92D4: 0x7DB4,
                0x92D5: 0x9354,
                0x92D6: 0x693F,
                0x92D7: 0x6F70,
                0x92D8: 0x576A,
                0x92D9: 0x58F7,
                0x92DA: 0x5B2C,
                0x92DB: 0x7D2C,
                0x92DC: 0x722A,
                0x92DD: 0x540A,
                0x92DE: 0x91E3,
                0x92DF: 0x9DB4,
                0x92E0: 0x4EAD,
                0x92E1: 0x4F4E,
                0x92E2: 0x505C,
                0x92E3: 0x5075,
                0x92E4: 0x5243,
                0x92E5: 0x8C9E,
                0x92E6: 0x5448,
                0x92E7: 0x5824,
                0x92E8: 0x5B9A,
                0x92E9: 0x5E1D,
                0x92EA: 0x5E95,
                0x92EB: 0x5EAD,
                0x92EC: 0x5EF7,
                0x92ED: 0x5F1F,
                0x92EE: 0x608C,
                0x92EF: 0x62B5,
                0x92F0: 0x633A,
                0x92F1: 0x63D0,
                0x92F2: 0x68AF,
                0x92F3: 0x6C40,
                0x92F4: 0x7887,
                0x92F5: 0x798E,
                0x92F6: 0x7A0B,
                0x92F7: 0x7DE0,
                0x92F8: 0x8247,
                0x92F9: 0x8A02,
                0x92FA: 0x8AE6,
                0x92FB: 0x8E44,
                0x92FC: 0x9013,
                0x9340: 0x90B8,
                0x9341: 0x912D,
                0x9342: 0x91D8,
                0x9343: 0x9F0E,
                0x9344: 0x6CE5,
                0x9345: 0x6458,
                0x9346: 0x64E2,
                0x9347: 0x6575,
                0x9348: 0x6EF4,
                0x9349: 0x7684,
                0x934A: 0x7B1B,
                0x934B: 0x9069,
                0x934C: 0x93D1,
                0x934D: 0x6EBA,
                0x934E: 0x54F2,
                0x934F: 0x5FB9,
                0x9350: 0x64A4,
                0x9351: 0x8F4D,
                0x9352: 0x8FED,
                0x9353: 0x9244,
                0x9354: 0x5178,
                0x9355: 0x586B,
                0x9356: 0x5929,
                0x9357: 0x5C55,
                0x9358: 0x5E97,
                0x9359: 0x6DFB,
                0x935A: 0x7E8F,
                0x935B: 0x751C,
                0x935C: 0x8CBC,
                0x935D: 0x8EE2,
                0x935E: 0x985B,
                0x935F: 0x70B9,
                0x9360: 0x4F1D,
                0x9361: 0x6BBF,
                0x9362: 0x6FB1,
                0x9363: 0x7530,
                0x9364: 0x96FB,
                0x9365: 0x514E,
                0x9366: 0x5410,
                0x9367: 0x5835,
                0x9368: 0x5857,
                0x9369: 0x59AC,
                0x936A: 0x5C60,
                0x936B: 0x5F92,
                0x936C: 0x6597,
                0x936D: 0x675C,
                0x936E: 0x6E21,
                0x936F: 0x767B,
                0x9370: 0x83DF,
                0x9371: 0x8CED,
                0x9372: 0x9014,
                0x9373: 0x90FD,
                0x9374: 0x934D,
                0x9375: 0x7825,
                0x9376: 0x783A,
                0x9377: 0x52AA,
                0x9378: 0x5EA6,
                0x9379: 0x571F,
                0x937A: 0x5974,
                0x937B: 0x6012,
                0x937C: 0x5012,
                0x937D: 0x515A,
                0x937E: 0x51AC,
                0x9380: 0x51CD,
                0x9381: 0x5200,
                0x9382: 0x5510,
                0x9383: 0x5854,
                0x9384: 0x5858,
                0x9385: 0x5957,
                0x9386: 0x5B95,
                0x9387: 0x5CF6,
                0x9388: 0x5D8B,
                0x9389: 0x60BC,
                0x938A: 0x6295,
                0x938B: 0x642D,
                0x938C: 0x6771,
                0x938D: 0x6843,
                0x938E: 0x68BC,
                0x938F: 0x68DF,
                0x9390: 0x76D7,
                0x9391: 0x6DD8,
                0x9392: 0x6E6F,
                0x9393: 0x6D9B,
                0x9394: 0x706F,
                0x9395: 0x71C8,
                0x9396: 0x5F53,
                0x9397: 0x75D8,
                0x9398: 0x7977,
                0x9399: 0x7B49,
                0x939A: 0x7B54,
                0x939B: 0x7B52,
                0x939C: 0x7CD6,
                0x939D: 0x7D71,
                0x939E: 0x5230,
                0x939F: 0x8463,
                0x93A0: 0x8569,
                0x93A1: 0x85E4,
                0x93A2: 0x8A0E,
                0x93A3: 0x8B04,
                0x93A4: 0x8C46,
                0x93A5: 0x8E0F,
                0x93A6: 0x9003,
                0x93A7: 0x900F,
                0x93A8: 0x9419,
                0x93A9: 0x9676,
                0x93AA: 0x982D,
                0x93AB: 0x9A30,
                0x93AC: 0x95D8,
                0x93AD: 0x50CD,
                0x93AE: 0x52D5,
                0x93AF: 0x540C,
                0x93B0: 0x5802,
                0x93B1: 0x5C0E,
                0x93B2: 0x61A7,
                0x93B3: 0x649E,
                0x93B4: 0x6D1E,
                0x93B5: 0x77B3,
                0x93B6: 0x7AE5,
                0x93B7: 0x80F4,
                0x93B8: 0x8404,
                0x93B9: 0x9053,
                0x93BA: 0x9285,
                0x93BB: 0x5CE0,
                0x93BC: 0x9D07,
                0x93BD: 0x533F,
                0x93BE: 0x5F97,
                0x93BF: 0x5FB3,
                0x93C0: 0x6D9C,
                0x93C1: 0x7279,
                0x93C2: 0x7763,
                0x93C3: 0x79BF,
                0x93C4: 0x7BE4,
                0x93C5: 0x6BD2,
                0x93C6: 0x72EC,
                0x93C7: 0x8AAD,
                0x93C8: 0x6803,
                0x93C9: 0x6A61,
                0x93CA: 0x51F8,
                0x93CB: 0x7A81,
                0x93CC: 0x6934,
                0x93CD: 0x5C4A,
                0x93CE: 0x9CF6,
                0x93CF: 0x82EB,
                0x93D0: 0x5BC5,
                0x93D1: 0x9149,
                0x93D2: 0x701E,
                0x93D3: 0x5678,
                0x93D4: 0x5C6F,
                0x93D5: 0x60C7,
                0x93D6: 0x6566,
                0x93D7: 0x6C8C,
                0x93D8: 0x8C5A,
                0x93D9: 0x9041,
                0x93DA: 0x9813,
                0x93DB: 0x5451,
                0x93DC: 0x66C7,
                0x93DD: 0x920D,
                0x93DE: 0x5948,
                0x93DF: 0x90A3,
                0x93E0: 0x5185,
                0x93E1: 0x4E4D,
                0x93E2: 0x51EA,
                0x93E3: 0x8599,
                0x93E4: 0x8B0E,
                0x93E5: 0x7058,
                0x93E6: 0x637A,
                0x93E7: 0x934B,
                0x93E8: 0x6962,
                0x93E9: 0x99B4,
                0x93EA: 0x7E04,
                0x93EB: 0x7577,
                0x93EC: 0x5357,
                0x93ED: 0x6960,
                0x93EE: 0x8EDF,
                0x93EF: 0x96E3,
                0x93F0: 0x6C5D,
                0x93F1: 0x4E8C,
                0x93F2: 0x5C3C,
                0x93F3: 0x5F10,
                0x93F4: 0x8FE9,
                0x93F5: 0x5302,
                0x93F6: 0x8CD1,
                0x93F7: 0x8089,
                0x93F8: 0x8679,
                0x93F9: 0x5EFF,
                0x93FA: 0x65E5,
                0x93FB: 0x4E73,
                0x93FC: 0x5165,
                0x9440: 0x5982,
                0x9441: 0x5C3F,
                0x9442: 0x97EE,
                0x9443: 0x4EFB,
                0x9444: 0x598A,
                0x9445: 0x5FCD,
                0x9446: 0x8A8D,
                0x9447: 0x6FE1,
                0x9448: 0x79B0,
                0x9449: 0x7962,
                0x944A: 0x5BE7,
                0x944B: 0x8471,
                0x944C: 0x732B,
                0x944D: 0x71B1,
                0x944E: 0x5E74,
                0x944F: 0x5FF5,
                0x9450: 0x637B,
                0x9451: 0x649A,
                0x9452: 0x71C3,
                0x9453: 0x7C98,
                0x9454: 0x4E43,
                0x9455: 0x5EFC,
                0x9456: 0x4E4B,
                0x9457: 0x57DC,
                0x9458: 0x56A2,
                0x9459: 0x60A9,
                0x945A: 0x6FC3,
                0x945B: 0x7D0D,
                0x945C: 0x80FD,
                0x945D: 0x8133,
                0x945E: 0x81BF,
                0x945F: 0x8FB2,
                0x9460: 0x8997,
                0x9461: 0x86A4,
                0x9462: 0x5DF4,
                0x9463: 0x628A,
                0x9464: 0x64AD,
                0x9465: 0x8987,
                0x9466: 0x6777,
                0x9467: 0x6CE2,
                0x9468: 0x6D3E,
                0x9469: 0x7436,
                0x946A: 0x7834,
                0x946B: 0x5A46,
                0x946C: 0x7F75,
                0x946D: 0x82AD,
                0x946E: 0x99AC,
                0x946F: 0x4FF3,
                0x9470: 0x5EC3,
                0x9471: 0x62DD,
                0x9472: 0x6392,
                0x9473: 0x6557,
                0x9474: 0x676F,
                0x9475: 0x76C3,
                0x9476: 0x724C,
                0x9477: 0x80CC,
                0x9478: 0x80BA,
                0x9479: 0x8F29,
                0x947A: 0x914D,
                0x947B: 0x500D,
                0x947C: 0x57F9,
                0x947D: 0x5A92,
                0x947E: 0x6885,
                0x9480: 0x6973,
                0x9481: 0x7164,
                0x9482: 0x72FD,
                0x9483: 0x8CB7,
                0x9484: 0x58F2,
                0x9485: 0x8CE0,
                0x9486: 0x966A,
                0x9487: 0x9019,
                0x9488: 0x877F,
                0x9489: 0x79E4,
                0x948A: 0x77E7,
                0x948B: 0x8429,
                0x948C: 0x4F2F,
                0x948D: 0x5265,
                0x948E: 0x535A,
                0x948F: 0x62CD,
                0x9490: 0x67CF,
                0x9491: 0x6CCA,
                0x9492: 0x767D,
                0x9493: 0x7B94,
                0x9494: 0x7C95,
                0x9495: 0x8236,
                0x9496: 0x8584,
                0x9497: 0x8FEB,
                0x9498: 0x66DD,
                0x9499: 0x6F20,
                0x949A: 0x7206,
                0x949B: 0x7E1B,
                0x949C: 0x83AB,
                0x949D: 0x99C1,
                0x949E: 0x9EA6,
                0x949F: 0x51FD,
                0x94A0: 0x7BB1,
                0x94A1: 0x7872,
                0x94A2: 0x7BB8,
                0x94A3: 0x8087,
                0x94A4: 0x7B48,
                0x94A5: 0x6AE8,
                0x94A6: 0x5E61,
                0x94A7: 0x808C,
                0x94A8: 0x7551,
                0x94A9: 0x7560,
                0x94AA: 0x516B,
                0x94AB: 0x9262,
                0x94AC: 0x6E8C,
                0x94AD: 0x767A,
                0x94AE: 0x9197,
                0x94AF: 0x9AEA,
                0x94B0: 0x4F10,
                0x94B1: 0x7F70,
                0x94B2: 0x629C,
                0x94B3: 0x7B4F,
                0x94B4: 0x95A5,
                0x94B5: 0x9CE9,
                0x94B6: 0x567A,
                0x94B7: 0x5859,
                0x94B8: 0x86E4,
                0x94B9: 0x96BC,
                0x94BA: 0x4F34,
                0x94BB: 0x5224,
                0x94BC: 0x534A,
                0x94BD: 0x53CD,
                0x94BE: 0x53DB,
                0x94BF: 0x5E06,
                0x94C0: 0x642C,
                0x94C1: 0x6591,
                0x94C2: 0x677F,
                0x94C3: 0x6C3E,
                0x94C4: 0x6C4E,
                0x94C5: 0x7248,
                0x94C6: 0x72AF,
                0x94C7: 0x73ED,
                0x94C8: 0x7554,
                0x94C9: 0x7E41,
                0x94CA: 0x822C,
                0x94CB: 0x85E9,
                0x94CC: 0x8CA9,
                0x94CD: 0x7BC4,
                0x94CE: 0x91C6,
                0x94CF: 0x7169,
                0x94D0: 0x9812,
                0x94D1: 0x98EF,
                0x94D2: 0x633D,
                0x94D3: 0x6669,
                0x94D4: 0x756A,
                0x94D5: 0x76E4,
                0x94D6: 0x78D0,
                0x94D7: 0x8543,
                0x94D8: 0x86EE,
                0x94D9: 0x532A,
                0x94DA: 0x5351,
                0x94DB: 0x5426,
                0x94DC: 0x5983,
                0x94DD: 0x5E87,
                0x94DE: 0x5F7C,
                0x94DF: 0x60B2,
                0x94E0: 0x6249,
                0x94E1: 0x6279,
                0x94E2: 0x62AB,
                0x94E3: 0x6590,
                0x94E4: 0x6BD4,
                0x94E5: 0x6CCC,
                0x94E6: 0x75B2,
                0x94E7: 0x76AE,
                0x94E8: 0x7891,
                0x94E9: 0x79D8,
                0x94EA: 0x7DCB,
                0x94EB: 0x7F77,
                0x94EC: 0x80A5,
                0x94ED: 0x88AB,
                0x94EE: 0x8AB9,
                0x94EF: 0x8CBB,
                0x94F0: 0x907F,
                0x94F1: 0x975E,
                0x94F2: 0x98DB,
                0x94F3: 0x6A0B,
                0x94F4: 0x7C38,
                0x94F5: 0x5099,
                0x94F6: 0x5C3E,
                0x94F7: 0x5FAE,
                0x94F8: 0x6787,
                0x94F9: 0x6BD8,
                0x94FA: 0x7435,
                0x94FB: 0x7709,
                0x94FC: 0x7F8E,
                0x9540: 0x9F3B,
                0x9541: 0x67CA,
                0x9542: 0x7A17,
                0x9543: 0x5339,
                0x9544: 0x758B,
                0x9545: 0x9AED,
                0x9546: 0x5F66,
                0x9547: 0x819D,
                0x9548: 0x83F1,
                0x9549: 0x8098,
                0x954A: 0x5F3C,
                0x954B: 0x5FC5,
                0x954C: 0x7562,
                0x954D: 0x7B46,
                0x954E: 0x903C,
                0x954F: 0x6867,
                0x9550: 0x59EB,
                0x9551: 0x5A9B,
                0x9552: 0x7D10,
                0x9553: 0x767E,
                0x9554: 0x8B2C,
                0x9555: 0x4FF5,
                0x9556: 0x5F6A,
                0x9557: 0x6A19,
                0x9558: 0x6C37,
                0x9559: 0x6F02,
                0x955A: 0x74E2,
                0x955B: 0x7968,
                0x955C: 0x8868,
                0x955D: 0x8A55,
                0x955E: 0x8C79,
                0x955F: 0x5EDF,
                0x9560: 0x63CF,
                0x9561: 0x75C5,
                0x9562: 0x79D2,
                0x9563: 0x82D7,
                0x9564: 0x9328,
                0x9565: 0x92F2,
                0x9566: 0x849C,
                0x9567: 0x86ED,
                0x9568: 0x9C2D,
                0x9569: 0x54C1,
                0x956A: 0x5F6C,
                0x956B: 0x658C,
                0x956C: 0x6D5C,
                0x956D: 0x7015,
                0x956E: 0x8CA7,
                0x956F: 0x8CD3,
                0x9570: 0x983B,
                0x9571: 0x654F,
                0x9572: 0x74F6,
                0x9573: 0x4E0D,
                0x9574: 0x4ED8,
                0x9575: 0x57E0,
                0x9576: 0x592B,
                0x9577: 0x5A66,
                0x9578: 0x5BCC,
                0x9579: 0x51A8,
                0x957A: 0x5E03,
                0x957B: 0x5E9C,
                0x957C: 0x6016,
                0x957D: 0x6276,
                0x957E: 0x6577,
                0x9580: 0x65A7,
                0x9581: 0x666E,
                0x9582: 0x6D6E,
                0x9583: 0x7236,
                0x9584: 0x7B26,
                0x9585: 0x8150,
                0x9586: 0x819A,
                0x9587: 0x8299,
                0x9588: 0x8B5C,
                0x9589: 0x8CA0,
                0x958A: 0x8CE6,
                0x958B: 0x8D74,
                0x958C: 0x961C,
                0x958D: 0x9644,
                0x958E: 0x4FAE,
                0x958F: 0x64AB,
                0x9590: 0x6B66,
                0x9591: 0x821E,
                0x9592: 0x8461,
                0x9593: 0x856A,
                0x9594: 0x90E8,
                0x9595: 0x5C01,
                0x9596: 0x6953,
                0x9597: 0x98A8,
                0x9598: 0x847A,
                0x9599: 0x8557,
                0x959A: 0x4F0F,
                0x959B: 0x526F,
                0x959C: 0x5FA9,
                0x959D: 0x5E45,
                0x959E: 0x670D,
                0x959F: 0x798F,
                0x95A0: 0x8179,
                0x95A1: 0x8907,
                0x95A2: 0x8986,
                0x95A3: 0x6DF5,
                0x95A4: 0x5F17,
                0x95A5: 0x6255,
                0x95A6: 0x6CB8,
                0x95A7: 0x4ECF,
                0x95A8: 0x7269,
                0x95A9: 0x9B92,
                0x95AA: 0x5206,
                0x95AB: 0x543B,
                0x95AC: 0x5674,
                0x95AD: 0x58B3,
                0x95AE: 0x61A4,
                0x95AF: 0x626E,
                0x95B0: 0x711A,
                0x95B1: 0x596E,
                0x95B2: 0x7C89,
                0x95B3: 0x7CDE,
                0x95B4: 0x7D1B,
                0x95B5: 0x96F0,
                0x95B6: 0x6587,
                0x95B7: 0x805E,
                0x95B8: 0x4E19,
                0x95B9: 0x4F75,
                0x95BA: 0x5175,
                0x95BB: 0x5840,
                0x95BC: 0x5E63,
                0x95BD: 0x5E73,
                0x95BE: 0x5F0A,
                0x95BF: 0x67C4,
                0x95C0: 0x4E26,
                0x95C1: 0x853D,
                0x95C2: 0x9589,
                0x95C3: 0x965B,
                0x95C4: 0x7C73,
                0x95C5: 0x9801,
                0x95C6: 0x50FB,
                0x95C7: 0x58C1,
                0x95C8: 0x7656,
                0x95C9: 0x78A7,
                0x95CA: 0x5225,
                0x95CB: 0x77A5,
                0x95CC: 0x8511,
                0x95CD: 0x7B86,
                0x95CE: 0x504F,
                0x95CF: 0x5909,
                0x95D0: 0x7247,
                0x95D1: 0x7BC7,
                0x95D2: 0x7DE8,
                0x95D3: 0x8FBA,
                0x95D4: 0x8FD4,
                0x95D5: 0x904D,
                0x95D6: 0x4FBF,
                0x95D7: 0x52C9,
                0x95D8: 0x5A29,
                0x95D9: 0x5F01,
                0x95DA: 0x97AD,
                0x95DB: 0x4FDD,
                0x95DC: 0x8217,
                0x95DD: 0x92EA,
                0x95DE: 0x5703,
                0x95DF: 0x6355,
                0x95E0: 0x6B69,
                0x95E1: 0x752B,
                0x95E2: 0x88DC,
                0x95E3: 0x8F14,
                0x95E4: 0x7A42,
                0x95E5: 0x52DF,
                0x95E6: 0x5893,
                0x95E7: 0x6155,
                0x95E8: 0x620A,
                0x95E9: 0x66AE,
                0x95EA: 0x6BCD,
                0x95EB: 0x7C3F,
                0x95EC: 0x83E9,
                0x95ED: 0x5023,
                0x95EE: 0x4FF8,
                0x95EF: 0x5305,
                0x95F0: 0x5446,
                0x95F1: 0x5831,
                0x95F2: 0x5949,
                0x95F3: 0x5B9D,
                0x95F4: 0x5CF0,
                0x95F5: 0x5CEF,
                0x95F6: 0x5D29,
                0x95F7: 0x5E96,
                0x95F8: 0x62B1,
                0x95F9: 0x6367,
                0x95FA: 0x653E,
                0x95FB: 0x65B9,
                0x95FC: 0x670B,
                0x9640: 0x6CD5,
                0x9641: 0x6CE1,
                0x9642: 0x70F9,
                0x9643: 0x7832,
                0x9644: 0x7E2B,
                0x9645: 0x80DE,
                0x9646: 0x82B3,
                0x9647: 0x840C,
                0x9648: 0x84EC,
                0x9649: 0x8702,
                0x964A: 0x8912,
                0x964B: 0x8A2A,
                0x964C: 0x8C4A,
                0x964D: 0x90A6,
                0x964E: 0x92D2,
                0x964F: 0x98FD,
                0x9650: 0x9CF3,
                0x9651: 0x9D6C,
                0x9652: 0x4E4F,
                0x9653: 0x4EA1,
                0x9654: 0x508D,
                0x9655: 0x5256,
                0x9656: 0x574A,
                0x9657: 0x59A8,
                0x9658: 0x5E3D,
                0x9659: 0x5FD8,
                0x965A: 0x5FD9,
                0x965B: 0x623F,
                0x965C: 0x66B4,
                0x965D: 0x671B,
                0x965E: 0x67D0,
                0x965F: 0x68D2,
                0x9660: 0x5192,
                0x9661: 0x7D21,
                0x9662: 0x80AA,
                0x9663: 0x81A8,
                0x9664: 0x8B00,
                0x9665: 0x8C8C,
                0x9666: 0x8CBF,
                0x9667: 0x927E,
                0x9668: 0x9632,
                0x9669: 0x5420,
                0x966A: 0x982C,
                0x966B: 0x5317,
                0x966C: 0x50D5,
                0x966D: 0x535C,
                0x966E: 0x58A8,
                0x966F: 0x64B2,
                0x9670: 0x6734,
                0x9671: 0x7267,
                0x9672: 0x7766,
                0x9673: 0x7A46,
                0x9674: 0x91E6,
                0x9675: 0x52C3,
                0x9676: 0x6CA1,
                0x9677: 0x6B86,
                0x9678: 0x5800,
                0x9679: 0x5E4C,
                0x967A: 0x5954,
                0x967B: 0x672C,
                0x967C: 0x7FFB,
                0x967D: 0x51E1,
                0x967E: 0x76C6,
                0x9680: 0x6469,
                0x9681: 0x78E8,
                0x9682: 0x9B54,
                0x9683: 0x9EBB,
                0x9684: 0x57CB,
                0x9685: 0x59B9,
                0x9686: 0x6627,
                0x9687: 0x679A,
                0x9688: 0x6BCE,
                0x9689: 0x54E9,
                0x968A: 0x69D9,
                0x968B: 0x5E55,
                0x968C: 0x819C,
                0x968D: 0x6795,
                0x968E: 0x9BAA,
                0x968F: 0x67FE,
                0x9690: 0x9C52,
                0x9691: 0x685D,
                0x9692: 0x4EA6,
                0x9693: 0x4FE3,
                0x9694: 0x53C8,
                0x9695: 0x62B9,
                0x9696: 0x672B,
                0x9697: 0x6CAB,
                0x9698: 0x8FC4,
                0x9699: 0x4FAD,
                0x969A: 0x7E6D,
                0x969B: 0x9EBF,
                0x969C: 0x4E07,
                0x969D: 0x6162,
                0x969E: 0x6E80,
                0x969F: 0x6F2B,
                0x96A0: 0x8513,
                0x96A1: 0x5473,
                0x96A2: 0x672A,
                0x96A3: 0x9B45,
                0x96A4: 0x5DF3,
                0x96A5: 0x7B95,
                0x96A6: 0x5CAC,
                0x96A7: 0x5BC6,
                0x96A8: 0x871C,
                0x96A9: 0x6E4A,
                0x96AA: 0x84D1,
                0x96AB: 0x7A14,
                0x96AC: 0x8108,
                0x96AD: 0x5999,
                0x96AE: 0x7C8D,
                0x96AF: 0x6C11,
                0x96B0: 0x7720,
                0x96B1: 0x52D9,
                0x96B2: 0x5922,
                0x96B3: 0x7121,
                0x96B4: 0x725F,
                0x96B5: 0x77DB,
                0x96B6: 0x9727,
                0x96B7: 0x9D61,
                0x96B8: 0x690B,
                0x96B9: 0x5A7F,
                0x96BA: 0x5A18,
                0x96BB: 0x51A5,
                0x96BC: 0x540D,
                0x96BD: 0x547D,
                0x96BE: 0x660E,
                0x96BF: 0x76DF,
                0x96C0: 0x8FF7,
                0x96C1: 0x9298,
                0x96C2: 0x9CF4,
                0x96C3: 0x59EA,
                0x96C4: 0x725D,
                0x96C5: 0x6EC5,
                0x96C6: 0x514D,
                0x96C7: 0x68C9,
                0x96C8: 0x7DBF,
                0x96C9: 0x7DEC,
                0x96CA: 0x9762,
                0x96CB: 0x9EBA,
                0x96CC: 0x6478,
                0x96CD: 0x6A21,
                0x96CE: 0x8302,
                0x96CF: 0x5984,
                0x96D0: 0x5B5F,
                0x96D1: 0x6BDB,
                0x96D2: 0x731B,
                0x96D3: 0x76F2,
                0x96D4: 0x7DB2,
                0x96D5: 0x8017,
                0x96D6: 0x8499,
                0x96D7: 0x5132,
                0x96D8: 0x6728,
                0x96D9: 0x9ED9,
                0x96DA: 0x76EE,
                0x96DB: 0x6762,
                0x96DC: 0x52FF,
                0x96DD: 0x9905,
                0x96DE: 0x5C24,
                0x96DF: 0x623B,
                0x96E0: 0x7C7E,
                0x96E1: 0x8CB0,
                0x96E2: 0x554F,
                0x96E3: 0x60B6,
                0x96E4: 0x7D0B,
                0x96E5: 0x9580,
                0x96E6: 0x5301,
                0x96E7: 0x4E5F,
                0x96E8: 0x51B6,
                0x96E9: 0x591C,
                0x96EA: 0x723A,
                0x96EB: 0x8036,
                0x96EC: 0x91CE,
                0x96ED: 0x5F25,
                0x96EE: 0x77E2,
                0x96EF: 0x5384,
                0x96F0: 0x5F79,
                0x96F1: 0x7D04,
                0x96F2: 0x85AC,
                0x96F3: 0x8A33,
                0x96F4: 0x8E8D,
                0x96F5: 0x9756,
                0x96F6: 0x67F3,
                0x96F7: 0x85AE,
                0x96F8: 0x9453,
                0x96F9: 0x6109,
                0x96FA: 0x6108,
                0x96FB: 0x6CB9,
                0x96FC: 0x7652,
                0x9740: 0x8AED,
                0x9741: 0x8F38,
                0x9742: 0x552F,
                0x9743: 0x4F51,
                0x9744: 0x512A,
                0x9745: 0x52C7,
                0x9746: 0x53CB,
                0x9747: 0x5BA5,
                0x9748: 0x5E7D,
                0x9749: 0x60A0,
                0x974A: 0x6182,
                0x974B: 0x63D6,
                0x974C: 0x6709,
                0x974D: 0x67DA,
                0x974E: 0x6E67,
                0x974F: 0x6D8C,
                0x9750: 0x7336,
                0x9751: 0x7337,
                0x9752: 0x7531,
                0x9753: 0x7950,
                0x9754: 0x88D5,
                0x9755: 0x8A98,
                0x9756: 0x904A,
                0x9757: 0x9091,
                0x9758: 0x90F5,
                0x9759: 0x96C4,
                0x975A: 0x878D,
                0x975B: 0x5915,
                0x975C: 0x4E88,
                0x975D: 0x4F59,
                0x975E: 0x4E0E,
                0x975F: 0x8A89,
                0x9760: 0x8F3F,
                0x9761: 0x9810,
                0x9762: 0x50AD,
                0x9763: 0x5E7C,
                0x9764: 0x5996,
                0x9765: 0x5BB9,
                0x9766: 0x5EB8,
                0x9767: 0x63DA,
                0x9768: 0x63FA,
                0x9769: 0x64C1,
                0x976A: 0x66DC,
                0x976B: 0x694A,
                0x976C: 0x69D8,
                0x976D: 0x6D0B,
                0x976E: 0x6EB6,
                0x976F: 0x7194,
                0x9770: 0x7528,
                0x9771: 0x7AAF,
                0x9772: 0x7F8A,
                0x9773: 0x8000,
                0x9774: 0x8449,
                0x9775: 0x84C9,
                0x9776: 0x8981,
                0x9777: 0x8B21,
                0x9778: 0x8E0A,
                0x9779: 0x9065,
                0x977A: 0x967D,
                0x977B: 0x990A,
                0x977C: 0x617E,
                0x977D: 0x6291,
                0x977E: 0x6B32,
                0x9780: 0x6C83,
                0x9781: 0x6D74,
                0x9782: 0x7FCC,
                0x9783: 0x7FFC,
                0x9784: 0x6DC0,
                0x9785: 0x7F85,
                0x9786: 0x87BA,
                0x9787: 0x88F8,
                0x9788: 0x6765,
                0x9789: 0x83B1,
                0x978A: 0x983C,
                0x978B: 0x96F7,
                0x978C: 0x6D1B,
                0x978D: 0x7D61,
                0x978E: 0x843D,
                0x978F: 0x916A,
                0x9790: 0x4E71,
                0x9791: 0x5375,
                0x9792: 0x5D50,
                0x9793: 0x6B04,
                0x9794: 0x6FEB,
                0x9795: 0x85CD,
                0x9796: 0x862D,
                0x9797: 0x89A7,
                0x9798: 0x5229,
                0x9799: 0x540F,
                0x979A: 0x5C65,
                0x979B: 0x674E,
                0x979C: 0x68A8,
                0x979D: 0x7406,
                0x979E: 0x7483,
                0x979F: 0x75E2,
                0x97A0: 0x88CF,
                0x97A1: 0x88E1,
                0x97A2: 0x91CC,
                0x97A3: 0x96E2,
                0x97A4: 0x9678,
                0x97A5: 0x5F8B,
                0x97A6: 0x7387,
                0x97A7: 0x7ACB,
                0x97A8: 0x844E,
                0x97A9: 0x63A0,
                0x97AA: 0x7565,
                0x97AB: 0x5289,
                0x97AC: 0x6D41,
                0x97AD: 0x6E9C,
                0x97AE: 0x7409,
                0x97AF: 0x7559,
                0x97B0: 0x786B,
                0x97B1: 0x7C92,
                0x97B2: 0x9686,
                0x97B3: 0x7ADC,
                0x97B4: 0x9F8D,
                0x97B5: 0x4FB6,
                0x97B6: 0x616E,
                0x97B7: 0x65C5,
                0x97B8: 0x865C,
                0x97B9: 0x4E86,
                0x97BA: 0x4EAE,
                0x97BB: 0x50DA,
                0x97BC: 0x4E21,
                0x97BD: 0x51CC,
                0x97BE: 0x5BEE,
                0x97BF: 0x6599,
                0x97C0: 0x6881,
                0x97C1: 0x6DBC,
                0x97C2: 0x731F,
                0x97C3: 0x7642,
                0x97C4: 0x77AD,
                0x97C5: 0x7A1C,
                0x97C6: 0x7CE7,
                0x97C7: 0x826F,
                0x97C8: 0x8AD2,
                0x97C9: 0x907C,
                0x97CA: 0x91CF,
                0x97CB: 0x9675,
                0x97CC: 0x9818,
                0x97CD: 0x529B,
                0x97CE: 0x7DD1,
                0x97CF: 0x502B,
                0x97D0: 0x5398,
                0x97D1: 0x6797,
                0x97D2: 0x6DCB,
                0x97D3: 0x71D0,
                0x97D4: 0x7433,
                0x97D5: 0x81E8,
                0x97D6: 0x8F2A,
                0x97D7: 0x96A3,
                0x97D8: 0x9C57,
                0x97D9: 0x9E9F,
                0x97DA: 0x7460,
                0x97DB: 0x5841,
                0x97DC: 0x6D99,
                0x97DD: 0x7D2F,
                0x97DE: 0x985E,
                0x97DF: 0x4EE4,
                0x97E0: 0x4F36,
                0x97E1: 0x4F8B,
                0x97E2: 0x51B7,
                0x97E3: 0x52B1,
                0x97E4: 0x5DBA,
                0x97E5: 0x601C,
                0x97E6: 0x73B2,
                0x97E7: 0x793C,
                0x97E8: 0x82D3,
                0x97E9: 0x9234,
                0x97EA: 0x96B7,
                0x97EB: 0x96F6,
                0x97EC: 0x970A,
                0x97ED: 0x9E97,
                0x97EE: 0x9F62,
                0x97EF: 0x66A6,
                0x97F0: 0x6B74,
                0x97F1: 0x5217,
                0x97F2: 0x52A3,
                0x97F3: 0x70C8,
                0x97F4: 0x88C2,
                0x97F5: 0x5EC9,
                0x97F6: 0x604B,
                0x97F7: 0x6190,
                0x97F8: 0x6F23,
                0x97F9: 0x7149,
                0x97FA: 0x7C3E,
                0x97FB: 0x7DF4,
                0x97FC: 0x806F,
                0x9840: 0x84EE,
                0x9841: 0x9023,
                0x9842: 0x932C,
                0x9843: 0x5442,
                0x9844: 0x9B6F,
                0x9845: 0x6AD3,
                0x9846: 0x7089,
                0x9847: 0x8CC2,
                0x9848: 0x8DEF,
                0x9849: 0x9732,
                0x984A: 0x52B4,
                0x984B: 0x5A41,
                0x984C: 0x5ECA,
                0x984D: 0x5F04,
                0x984E: 0x6717,
                0x984F: 0x697C,
                0x9850: 0x6994,
                0x9851: 0x6D6A,
                0x9852: 0x6F0F,
                0x9853: 0x7262,
                0x9854: 0x72FC,
                0x9855: 0x7BED,
                0x9856: 0x8001,
                0x9857: 0x807E,
                0x9858: 0x874B,
                0x9859: 0x90CE,
                0x985A: 0x516D,
                0x985B: 0x9E93,
                0x985C: 0x7984,
                0x985D: 0x808B,
                0x985E: 0x9332,
                0x985F: 0x8AD6,
                0x9860: 0x502D,
                0x9861: 0x548C,
                0x9862: 0x8A71,
                0x9863: 0x6B6A,
                0x9864: 0x8CC4,
                0x9865: 0x8107,
                0x9866: 0x60D1,
                0x9867: 0x67A0,
                0x9868: 0x9DF2,
                0x9869: 0x4E99,
                0x986A: 0x4E98,
                0x986B: 0x9C10,
                0x986C: 0x8A6B,
                0x986D: 0x85C1,
                0x986E: 0x8568,
                0x986F: 0x6900,
                0x9870: 0x6E7E,
                0x9871: 0x7897,
                0x9872: 0x8155,
                0x989F: 0x5F0C,
                0x98A0: 0x4E10,
                0x98A1: 0x4E15,
                0x98A2: 0x4E2A,
                0x98A3: 0x4E31,
                0x98A4: 0x4E36,
                0x98A5: 0x4E3C,
                0x98A6: 0x4E3F,
                0x98A7: 0x4E42,
                0x98A8: 0x4E56,
                0x98A9: 0x4E58,
                0x98AA: 0x4E82,
                0x98AB: 0x4E85,
                0x98AC: 0x8C6B,
                0x98AD: 0x4E8A,
                0x98AE: 0x8212,
                0x98AF: 0x5F0D,
                0x98B0: 0x4E8E,
                0x98B1: 0x4E9E,
                0x98B2: 0x4E9F,
                0x98B3: 0x4EA0,
                0x98B4: 0x4EA2,
                0x98B5: 0x4EB0,
                0x98B6: 0x4EB3,
                0x98B7: 0x4EB6,
                0x98B8: 0x4ECE,
                0x98B9: 0x4ECD,
                0x98BA: 0x4EC4,
                0x98BB: 0x4EC6,
                0x98BC: 0x4EC2,
                0x98BD: 0x4ED7,
                0x98BE: 0x4EDE,
                0x98BF: 0x4EED,
                0x98C0: 0x4EDF,
                0x98C1: 0x4EF7,
                0x98C2: 0x4F09,
                0x98C3: 0x4F5A,
                0x98C4: 0x4F30,
                0x98C5: 0x4F5B,
                0x98C6: 0x4F5D,
                0x98C7: 0x4F57,
                0x98C8: 0x4F47,
                0x98C9: 0x4F76,
                0x98CA: 0x4F88,
                0x98CB: 0x4F8F,
                0x98CC: 0x4F98,
                0x98CD: 0x4F7B,
                0x98CE: 0x4F69,
                0x98CF: 0x4F70,
                0x98D0: 0x4F91,
                0x98D1: 0x4F6F,
                0x98D2: 0x4F86,
                0x98D3: 0x4F96,
                0x98D4: 0x5118,
                0x98D5: 0x4FD4,
                0x98D6: 0x4FDF,
                0x98D7: 0x4FCE,
                0x98D8: 0x4FD8,
                0x98D9: 0x4FDB,
                0x98DA: 0x4FD1,
                0x98DB: 0x4FDA,
                0x98DC: 0x4FD0,
                0x98DD: 0x4FE4,
                0x98DE: 0x4FE5,
                0x98DF: 0x501A,
                0x98E0: 0x5028,
                0x98E1: 0x5014,
                0x98E2: 0x502A,
                0x98E3: 0x5025,
                0x98E4: 0x5005,
                0x98E5: 0x4F1C,
                0x98E6: 0x4FF6,
                0x98E7: 0x5021,
                0x98E8: 0x5029,
                0x98E9: 0x502C,
                0x98EA: 0x4FFE,
                0x98EB: 0x4FEF,
                0x98EC: 0x5011,
                0x98ED: 0x5006,
                0x98EE: 0x5043,
                0x98EF: 0x5047,
                0x98F0: 0x6703,
                0x98F1: 0x5055,
                0x98F2: 0x5050,
                0x98F3: 0x5048,
                0x98F4: 0x505A,
                0x98F5: 0x5056,
                0x98F6: 0x506C,
                0x98F7: 0x5078,
                0x98F8: 0x5080,
                0x98F9: 0x509A,
                0x98FA: 0x5085,
                0x98FB: 0x50B4,
                0x98FC: 0x50B2,
                0x9940: 0x50C9,
                0x9941: 0x50CA,
                0x9942: 0x50B3,
                0x9943: 0x50C2,
                0x9944: 0x50D6,
                0x9945: 0x50DE,
                0x9946: 0x50E5,
                0x9947: 0x50ED,
                0x9948: 0x50E3,
                0x9949: 0x50EE,
                0x994A: 0x50F9,
                0x994B: 0x50F5,
                0x994C: 0x5109,
                0x994D: 0x5101,
                0x994E: 0x5102,
                0x994F: 0x5116,
                0x9950: 0x5115,
                0x9951: 0x5114,
                0x9952: 0x511A,
                0x9953: 0x5121,
                0x9954: 0x513A,
                0x9955: 0x5137,
                0x9956: 0x513C,
                0x9957: 0x513B,
                0x9958: 0x513F,
                0x9959: 0x5140,
                0x995A: 0x5152,
                0x995B: 0x514C,
                0x995C: 0x5154,
                0x995D: 0x5162,
                0x995E: 0x7AF8,
                0x995F: 0x5169,
                0x9960: 0x516A,
                0x9961: 0x516E,
                0x9962: 0x5180,
                0x9963: 0x5182,
                0x9964: 0x56D8,
                0x9965: 0x518C,
                0x9966: 0x5189,
                0x9967: 0x518F,
                0x9968: 0x5191,
                0x9969: 0x5193,
                0x996A: 0x5195,
                0x996B: 0x5196,
                0x996C: 0x51A4,
                0x996D: 0x51A6,
                0x996E: 0x51A2,
                0x996F: 0x51A9,
                0x9970: 0x51AA,
                0x9971: 0x51AB,
                0x9972: 0x51B3,
                0x9973: 0x51B1,
                0x9974: 0x51B2,
                0x9975: 0x51B0,
                0x9976: 0x51B5,
                0x9977: 0x51BD,
                0x9978: 0x51C5,
                0x9979: 0x51C9,
                0x997A: 0x51DB,
                0x997B: 0x51E0,
                0x997C: 0x8655,
                0x997D: 0x51E9,
                0x997E: 0x51ED,
                0x9980: 0x51F0,
                0x9981: 0x51F5,
                0x9982: 0x51FE,
                0x9983: 0x5204,
                0x9984: 0x520B,
                0x9985: 0x5214,
                0x9986: 0x520E,
                0x9987: 0x5227,
                0x9988: 0x522A,
                0x9989: 0x522E,
                0x998A: 0x5233,
                0x998B: 0x5239,
                0x998C: 0x524F,
                0x998D: 0x5244,
                0x998E: 0x524B,
                0x998F: 0x524C,
                0x9990: 0x525E,
                0x9991: 0x5254,
                0x9992: 0x526A,
                0x9993: 0x5274,
                0x9994: 0x5269,
                0x9995: 0x5273,
                0x9996: 0x527F,
                0x9997: 0x527D,
                0x9998: 0x528D,
                0x9999: 0x5294,
                0x999A: 0x5292,
                0x999B: 0x5271,
                0x999C: 0x5288,
                0x999D: 0x5291,
                0x999E: 0x8FA8,
                0x999F: 0x8FA7,
                0x99A0: 0x52AC,
                0x99A1: 0x52AD,
                0x99A2: 0x52BC,
                0x99A3: 0x52B5,
                0x99A4: 0x52C1,
                0x99A5: 0x52CD,
                0x99A6: 0x52D7,
                0x99A7: 0x52DE,
                0x99A8: 0x52E3,
                0x99A9: 0x52E6,
                0x99AA: 0x98ED,
                0x99AB: 0x52E0,
                0x99AC: 0x52F3,
                0x99AD: 0x52F5,
                0x99AE: 0x52F8,
                0x99AF: 0x52F9,
                0x99B0: 0x5306,
                0x99B1: 0x5308,
                0x99B2: 0x7538,
                0x99B3: 0x530D,
                0x99B4: 0x5310,
                0x99B5: 0x530F,
                0x99B6: 0x5315,
                0x99B7: 0x531A,
                0x99B8: 0x5323,
                0x99B9: 0x532F,
                0x99BA: 0x5331,
                0x99BB: 0x5333,
                0x99BC: 0x5338,
                0x99BD: 0x5340,
                0x99BE: 0x5346,
                0x99BF: 0x5345,
                0x99C0: 0x4E17,
                0x99C1: 0x5349,
                0x99C2: 0x534D,
                0x99C3: 0x51D6,
                0x99C4: 0x535E,
                0x99C5: 0x5369,
                0x99C6: 0x536E,
                0x99C7: 0x5918,
                0x99C8: 0x537B,
                0x99C9: 0x5377,
                0x99CA: 0x5382,
                0x99CB: 0x5396,
                0x99CC: 0x53A0,
                0x99CD: 0x53A6,
                0x99CE: 0x53A5,
                0x99CF: 0x53AE,
                0x99D0: 0x53B0,
                0x99D1: 0x53B6,
                0x99D2: 0x53C3,
                0x99D3: 0x7C12,
                0x99D4: 0x96D9,
                0x99D5: 0x53DF,
                0x99D6: 0x66FC,
                0x99D7: 0x71EE,
                0x99D8: 0x53EE,
                0x99D9: 0x53E8,
                0x99DA: 0x53ED,
                0x99DB: 0x53FA,
                0x99DC: 0x5401,
                0x99DD: 0x543D,
                0x99DE: 0x5440,
                0x99DF: 0x542C,
                0x99E0: 0x542D,
                0x99E1: 0x543C,
                0x99E2: 0x542E,
                0x99E3: 0x5436,
                0x99E4: 0x5429,
                0x99E5: 0x541D,
                0x99E6: 0x544E,
                0x99E7: 0x548F,
                0x99E8: 0x5475,
                0x99E9: 0x548E,
                0x99EA: 0x545F,
                0x99EB: 0x5471,
                0x99EC: 0x5477,
                0x99ED: 0x5470,
                0x99EE: 0x5492,
                0x99EF: 0x547B,
                0x99F0: 0x5480,
                0x99F1: 0x5476,
                0x99F2: 0x5484,
                0x99F3: 0x5490,
                0x99F4: 0x5486,
                0x99F5: 0x54C7,
                0x99F6: 0x54A2,
                0x99F7: 0x54B8,
                0x99F8: 0x54A5,
                0x99F9: 0x54AC,
                0x99FA: 0x54C4,
                0x99FB: 0x54C8,
                0x99FC: 0x54A8,
                0x9A40: 0x54AB,
                0x9A41: 0x54C2,
                0x9A42: 0x54A4,
                0x9A43: 0x54BE,
                0x9A44: 0x54BC,
                0x9A45: 0x54D8,
                0x9A46: 0x54E5,
                0x9A47: 0x54E6,
                0x9A48: 0x550F,
                0x9A49: 0x5514,
                0x9A4A: 0x54FD,
                0x9A4B: 0x54EE,
                0x9A4C: 0x54ED,
                0x9A4D: 0x54FA,
                0x9A4E: 0x54E2,
                0x9A4F: 0x5539,
                0x9A50: 0x5540,
                0x9A51: 0x5563,
                0x9A52: 0x554C,
                0x9A53: 0x552E,
                0x9A54: 0x555C,
                0x9A55: 0x5545,
                0x9A56: 0x5556,
                0x9A57: 0x5557,
                0x9A58: 0x5538,
                0x9A59: 0x5533,
                0x9A5A: 0x555D,
                0x9A5B: 0x5599,
                0x9A5C: 0x5580,
                0x9A5D: 0x54AF,
                0x9A5E: 0x558A,
                0x9A5F: 0x559F,
                0x9A60: 0x557B,
                0x9A61: 0x557E,
                0x9A62: 0x5598,
                0x9A63: 0x559E,
                0x9A64: 0x55AE,
                0x9A65: 0x557C,
                0x9A66: 0x5583,
                0x9A67: 0x55A9,
                0x9A68: 0x5587,
                0x9A69: 0x55A8,
                0x9A6A: 0x55DA,
                0x9A6B: 0x55C5,
                0x9A6C: 0x55DF,
                0x9A6D: 0x55C4,
                0x9A6E: 0x55DC,
                0x9A6F: 0x55E4,
                0x9A70: 0x55D4,
                0x9A71: 0x5614,
                0x9A72: 0x55F7,
                0x9A73: 0x5616,
                0x9A74: 0x55FE,
                0x9A75: 0x55FD,
                0x9A76: 0x561B,
                0x9A77: 0x55F9,
                0x9A78: 0x564E,
                0x9A79: 0x5650,
                0x9A7A: 0x71DF,
                0x9A7B: 0x5634,
                0x9A7C: 0x5636,
                0x9A7D: 0x5632,
                0x9A7E: 0x5638,
                0x9A80: 0x566B,
                0x9A81: 0x5664,
                0x9A82: 0x562F,
                0x9A83: 0x566C,
                0x9A84: 0x566A,
                0x9A85: 0x5686,
                0x9A86: 0x5680,
                0x9A87: 0x568A,
                0x9A88: 0x56A0,
                0x9A89: 0x5694,
                0x9A8A: 0x568F,
                0x9A8B: 0x56A5,
                0x9A8C: 0x56AE,
                0x9A8D: 0x56B6,
                0x9A8E: 0x56B4,
                0x9A8F: 0x56C2,
                0x9A90: 0x56BC,
                0x9A91: 0x56C1,
                0x9A92: 0x56C3,
                0x9A93: 0x56C0,
                0x9A94: 0x56C8,
                0x9A95: 0x56CE,
                0x9A96: 0x56D1,
                0x9A97: 0x56D3,
                0x9A98: 0x56D7,
                0x9A99: 0x56EE,
                0x9A9A: 0x56F9,
                0x9A9B: 0x5700,
                0x9A9C: 0x56FF,
                0x9A9D: 0x5704,
                0x9A9E: 0x5709,
                0x9A9F: 0x5708,
                0x9AA0: 0x570B,
                0x9AA1: 0x570D,
                0x9AA2: 0x5713,
                0x9AA3: 0x5718,
                0x9AA4: 0x5716,
                0x9AA5: 0x55C7,
                0x9AA6: 0x571C,
                0x9AA7: 0x5726,
                0x9AA8: 0x5737,
                0x9AA9: 0x5738,
                0x9AAA: 0x574E,
                0x9AAB: 0x573B,
                0x9AAC: 0x5740,
                0x9AAD: 0x574F,
                0x9AAE: 0x5769,
                0x9AAF: 0x57C0,
                0x9AB0: 0x5788,
                0x9AB1: 0x5761,
                0x9AB2: 0x577F,
                0x9AB3: 0x5789,
                0x9AB4: 0x5793,
                0x9AB5: 0x57A0,
                0x9AB6: 0x57B3,
                0x9AB7: 0x57A4,
                0x9AB8: 0x57AA,
                0x9AB9: 0x57B0,
                0x9ABA: 0x57C3,
                0x9ABB: 0x57C6,
                0x9ABC: 0x57D4,
                0x9ABD: 0x57D2,
                0x9ABE: 0x57D3,
                0x9ABF: 0x580A,
                0x9AC0: 0x57D6,
                0x9AC1: 0x57E3,
                0x9AC2: 0x580B,
                0x9AC3: 0x5819,
                0x9AC4: 0x581D,
                0x9AC5: 0x5872,
                0x9AC6: 0x5821,
                0x9AC7: 0x5862,
                0x9AC8: 0x584B,
                0x9AC9: 0x5870,
                0x9ACA: 0x6BC0,
                0x9ACB: 0x5852,
                0x9ACC: 0x583D,
                0x9ACD: 0x5879,
                0x9ACE: 0x5885,
                0x9ACF: 0x58B9,
                0x9AD0: 0x589F,
                0x9AD1: 0x58AB,
                0x9AD2: 0x58BA,
                0x9AD3: 0x58DE,
                0x9AD4: 0x58BB,
                0x9AD5: 0x58B8,
                0x9AD6: 0x58AE,
                0x9AD7: 0x58C5,
                0x9AD8: 0x58D3,
                0x9AD9: 0x58D1,
                0x9ADA: 0x58D7,
                0x9ADB: 0x58D9,
                0x9ADC: 0x58D8,
                0x9ADD: 0x58E5,
                0x9ADE: 0x58DC,
                0x9ADF: 0x58E4,
                0x9AE0: 0x58DF,
                0x9AE1: 0x58EF,
                0x9AE2: 0x58FA,
                0x9AE3: 0x58F9,
                0x9AE4: 0x58FB,
                0x9AE5: 0x58FC,
                0x9AE6: 0x58FD,
                0x9AE7: 0x5902,
                0x9AE8: 0x590A,
                0x9AE9: 0x5910,
                0x9AEA: 0x591B,
                0x9AEB: 0x68A6,
                0x9AEC: 0x5925,
                0x9AED: 0x592C,
                0x9AEE: 0x592D,
                0x9AEF: 0x5932,
                0x9AF0: 0x5938,
                0x9AF1: 0x593E,
                0x9AF2: 0x7AD2,
                0x9AF3: 0x5955,
                0x9AF4: 0x5950,
                0x9AF5: 0x594E,
                0x9AF6: 0x595A,
                0x9AF7: 0x5958,
                0x9AF8: 0x5962,
                0x9AF9: 0x5960,
                0x9AFA: 0x5967,
                0x9AFB: 0x596C,
                0x9AFC: 0x5969,
                0x9B40: 0x5978,
                0x9B41: 0x5981,
                0x9B42: 0x599D,
                0x9B43: 0x4F5E,
                0x9B44: 0x4FAB,
                0x9B45: 0x59A3,
                0x9B46: 0x59B2,
                0x9B47: 0x59C6,
                0x9B48: 0x59E8,
                0x9B49: 0x59DC,
                0x9B4A: 0x598D,
                0x9B4B: 0x59D9,
                0x9B4C: 0x59DA,
                0x9B4D: 0x5A25,
                0x9B4E: 0x5A1F,
                0x9B4F: 0x5A11,
                0x9B50: 0x5A1C,
                0x9B51: 0x5A09,
                0x9B52: 0x5A1A,
                0x9B53: 0x5A40,
                0x9B54: 0x5A6C,
                0x9B55: 0x5A49,
                0x9B56: 0x5A35,
                0x9B57: 0x5A36,
                0x9B58: 0x5A62,
                0x9B59: 0x5A6A,
                0x9B5A: 0x5A9A,
                0x9B5B: 0x5ABC,
                0x9B5C: 0x5ABE,
                0x9B5D: 0x5ACB,
                0x9B5E: 0x5AC2,
                0x9B5F: 0x5ABD,
                0x9B60: 0x5AE3,
                0x9B61: 0x5AD7,
                0x9B62: 0x5AE6,
                0x9B63: 0x5AE9,
                0x9B64: 0x5AD6,
                0x9B65: 0x5AFA,
                0x9B66: 0x5AFB,
                0x9B67: 0x5B0C,
                0x9B68: 0x5B0B,
                0x9B69: 0x5B16,
                0x9B6A: 0x5B32,
                0x9B6B: 0x5AD0,
                0x9B6C: 0x5B2A,
                0x9B6D: 0x5B36,
                0x9B6E: 0x5B3E,
                0x9B6F: 0x5B43,
                0x9B70: 0x5B45,
                0x9B71: 0x5B40,
                0x9B72: 0x5B51,
                0x9B73: 0x5B55,
                0x9B74: 0x5B5A,
                0x9B75: 0x5B5B,
                0x9B76: 0x5B65,
                0x9B77: 0x5B69,
                0x9B78: 0x5B70,
                0x9B79: 0x5B73,
                0x9B7A: 0x5B75,
                0x9B7B: 0x5B78,
                0x9B7C: 0x6588,
                0x9B7D: 0x5B7A,
                0x9B7E: 0x5B80,
                0x9B80: 0x5B83,
                0x9B81: 0x5BA6,
                0x9B82: 0x5BB8,
                0x9B83: 0x5BC3,
                0x9B84: 0x5BC7,
                0x9B85: 0x5BC9,
                0x9B86: 0x5BD4,
                0x9B87: 0x5BD0,
                0x9B88: 0x5BE4,
                0x9B89: 0x5BE6,
                0x9B8A: 0x5BE2,
                0x9B8B: 0x5BDE,
                0x9B8C: 0x5BE5,
                0x9B8D: 0x5BEB,
                0x9B8E: 0x5BF0,
                0x9B8F: 0x5BF6,
                0x9B90: 0x5BF3,
                0x9B91: 0x5C05,
                0x9B92: 0x5C07,
                0x9B93: 0x5C08,
                0x9B94: 0x5C0D,
                0x9B95: 0x5C13,
                0x9B96: 0x5C20,
                0x9B97: 0x5C22,
                0x9B98: 0x5C28,
                0x9B99: 0x5C38,
                0x9B9A: 0x5C39,
                0x9B9B: 0x5C41,
                0x9B9C: 0x5C46,
                0x9B9D: 0x5C4E,
                0x9B9E: 0x5C53,
                0x9B9F: 0x5C50,
                0x9BA0: 0x5C4F,
                0x9BA1: 0x5B71,
                0x9BA2: 0x5C6C,
                0x9BA3: 0x5C6E,
                0x9BA4: 0x4E62,
                0x9BA5: 0x5C76,
                0x9BA6: 0x5C79,
                0x9BA7: 0x5C8C,
                0x9BA8: 0x5C91,
                0x9BA9: 0x5C94,
                0x9BAA: 0x599B,
                0x9BAB: 0x5CAB,
                0x9BAC: 0x5CBB,
                0x9BAD: 0x5CB6,
                0x9BAE: 0x5CBC,
                0x9BAF: 0x5CB7,
                0x9BB0: 0x5CC5,
                0x9BB1: 0x5CBE,
                0x9BB2: 0x5CC7,
                0x9BB3: 0x5CD9,
                0x9BB4: 0x5CE9,
                0x9BB5: 0x5CFD,
                0x9BB6: 0x5CFA,
                0x9BB7: 0x5CED,
                0x9BB8: 0x5D8C,
                0x9BB9: 0x5CEA,
                0x9BBA: 0x5D0B,
                0x9BBB: 0x5D15,
                0x9BBC: 0x5D17,
                0x9BBD: 0x5D5C,
                0x9BBE: 0x5D1F,
                0x9BBF: 0x5D1B,
                0x9BC0: 0x5D11,
                0x9BC1: 0x5D14,
                0x9BC2: 0x5D22,
                0x9BC3: 0x5D1A,
                0x9BC4: 0x5D19,
                0x9BC5: 0x5D18,
                0x9BC6: 0x5D4C,
                0x9BC7: 0x5D52,
                0x9BC8: 0x5D4E,
                0x9BC9: 0x5D4B,
                0x9BCA: 0x5D6C,
                0x9BCB: 0x5D73,
                0x9BCC: 0x5D76,
                0x9BCD: 0x5D87,
                0x9BCE: 0x5D84,
                0x9BCF: 0x5D82,
                0x9BD0: 0x5DA2,
                0x9BD1: 0x5D9D,
                0x9BD2: 0x5DAC,
                0x9BD3: 0x5DAE,
                0x9BD4: 0x5DBD,
                0x9BD5: 0x5D90,
                0x9BD6: 0x5DB7,
                0x9BD7: 0x5DBC,
                0x9BD8: 0x5DC9,
                0x9BD9: 0x5DCD,
                0x9BDA: 0x5DD3,
                0x9BDB: 0x5DD2,
                0x9BDC: 0x5DD6,
                0x9BDD: 0x5DDB,
                0x9BDE: 0x5DEB,
                0x9BDF: 0x5DF2,
                0x9BE0: 0x5DF5,
                0x9BE1: 0x5E0B,
                0x9BE2: 0x5E1A,
                0x9BE3: 0x5E19,
                0x9BE4: 0x5E11,
                0x9BE5: 0x5E1B,
                0x9BE6: 0x5E36,
                0x9BE7: 0x5E37,
                0x9BE8: 0x5E44,
                0x9BE9: 0x5E43,
                0x9BEA: 0x5E40,
                0x9BEB: 0x5E4E,
                0x9BEC: 0x5E57,
                0x9BED: 0x5E54,
                0x9BEE: 0x5E5F,
                0x9BEF: 0x5E62,
                0x9BF0: 0x5E64,
                0x9BF1: 0x5E47,
                0x9BF2: 0x5E75,
                0x9BF3: 0x5E76,
                0x9BF4: 0x5E7A,
                0x9BF5: 0x9EBC,
                0x9BF6: 0x5E7F,
                0x9BF7: 0x5EA0,
                0x9BF8: 0x5EC1,
                0x9BF9: 0x5EC2,
                0x9BFA: 0x5EC8,
                0x9BFB: 0x5ED0,
                0x9BFC: 0x5ECF,
                0x9C40: 0x5ED6,
                0x9C41: 0x5EE3,
                0x9C42: 0x5EDD,
                0x9C43: 0x5EDA,
                0x9C44: 0x5EDB,
                0x9C45: 0x5EE2,
                0x9C46: 0x5EE1,
                0x9C47: 0x5EE8,
                0x9C48: 0x5EE9,
                0x9C49: 0x5EEC,
                0x9C4A: 0x5EF1,
                0x9C4B: 0x5EF3,
                0x9C4C: 0x5EF0,
                0x9C4D: 0x5EF4,
                0x9C4E: 0x5EF8,
                0x9C4F: 0x5EFE,
                0x9C50: 0x5F03,
                0x9C51: 0x5F09,
                0x9C52: 0x5F5D,
                0x9C53: 0x5F5C,
                0x9C54: 0x5F0B,
                0x9C55: 0x5F11,
                0x9C56: 0x5F16,
                0x9C57: 0x5F29,
                0x9C58: 0x5F2D,
                0x9C59: 0x5F38,
                0x9C5A: 0x5F41,
                0x9C5B: 0x5F48,
                0x9C5C: 0x5F4C,
                0x9C5D: 0x5F4E,
                0x9C5E: 0x5F2F,
                0x9C5F: 0x5F51,
                0x9C60: 0x5F56,
                0x9C61: 0x5F57,
                0x9C62: 0x5F59,
                0x9C63: 0x5F61,
                0x9C64: 0x5F6D,
                0x9C65: 0x5F73,
                0x9C66: 0x5F77,
                0x9C67: 0x5F83,
                0x9C68: 0x5F82,
                0x9C69: 0x5F7F,
                0x9C6A: 0x5F8A,
                0x9C6B: 0x5F88,
                0x9C6C: 0x5F91,
                0x9C6D: 0x5F87,
                0x9C6E: 0x5F9E,
                0x9C6F: 0x5F99,
                0x9C70: 0x5F98,
                0x9C71: 0x5FA0,
                0x9C72: 0x5FA8,
                0x9C73: 0x5FAD,
                0x9C74: 0x5FBC,
                0x9C75: 0x5FD6,
                0x9C76: 0x5FFB,
                0x9C77: 0x5FE4,
                0x9C78: 0x5FF8,
                0x9C79: 0x5FF1,
                0x9C7A: 0x5FDD,
                0x9C7B: 0x60B3,
                0x9C7C: 0x5FFF,
                0x9C7D: 0x6021,
                0x9C7E: 0x6060,
                0x9C80: 0x6019,
                0x9C81: 0x6010,
                0x9C82: 0x6029,
                0x9C83: 0x600E,
                0x9C84: 0x6031,
                0x9C85: 0x601B,
                0x9C86: 0x6015,
                0x9C87: 0x602B,
                0x9C88: 0x6026,
                0x9C89: 0x600F,
                0x9C8A: 0x603A,
                0x9C8B: 0x605A,
                0x9C8C: 0x6041,
                0x9C8D: 0x606A,
                0x9C8E: 0x6077,
                0x9C8F: 0x605F,
                0x9C90: 0x604A,
                0x9C91: 0x6046,
                0x9C92: 0x604D,
                0x9C93: 0x6063,
                0x9C94: 0x6043,
                0x9C95: 0x6064,
                0x9C96: 0x6042,
                0x9C97: 0x606C,
                0x9C98: 0x606B,
                0x9C99: 0x6059,
                0x9C9A: 0x6081,
                0x9C9B: 0x608D,
                0x9C9C: 0x60E7,
                0x9C9D: 0x6083,
                0x9C9E: 0x609A,
                0x9C9F: 0x6084,
                0x9CA0: 0x609B,
                0x9CA1: 0x6096,
                0x9CA2: 0x6097,
                0x9CA3: 0x6092,
                0x9CA4: 0x60A7,
                0x9CA5: 0x608B,
                0x9CA6: 0x60E1,
                0x9CA7: 0x60B8,
                0x9CA8: 0x60E0,
                0x9CA9: 0x60D3,
                0x9CAA: 0x60B4,
                0x9CAB: 0x5FF0,
                0x9CAC: 0x60BD,
                0x9CAD: 0x60C6,
                0x9CAE: 0x60B5,
                0x9CAF: 0x60D8,
                0x9CB0: 0x614D,
                0x9CB1: 0x6115,
                0x9CB2: 0x6106,
                0x9CB3: 0x60F6,
                0x9CB4: 0x60F7,
                0x9CB5: 0x6100,
                0x9CB6: 0x60F4,
                0x9CB7: 0x60FA,
                0x9CB8: 0x6103,
                0x9CB9: 0x6121,
                0x9CBA: 0x60FB,
                0x9CBB: 0x60F1,
                0x9CBC: 0x610D,
                0x9CBD: 0x610E,
                0x9CBE: 0x6147,
                0x9CBF: 0x613E,
                0x9CC0: 0x6128,
                0x9CC1: 0x6127,
                0x9CC2: 0x614A,
                0x9CC3: 0x613F,
                0x9CC4: 0x613C,
                0x9CC5: 0x612C,
                0x9CC6: 0x6134,
                0x9CC7: 0x613D,
                0x9CC8: 0x6142,
                0x9CC9: 0x6144,
                0x9CCA: 0x6173,
                0x9CCB: 0x6177,
                0x9CCC: 0x6158,
                0x9CCD: 0x6159,
                0x9CCE: 0x615A,
                0x9CCF: 0x616B,
                0x9CD0: 0x6174,
                0x9CD1: 0x616F,
                0x9CD2: 0x6165,
                0x9CD3: 0x6171,
                0x9CD4: 0x615F,
                0x9CD5: 0x615D,
                0x9CD6: 0x6153,
                0x9CD7: 0x6175,
                0x9CD8: 0x6199,
                0x9CD9: 0x6196,
                0x9CDA: 0x6187,
                0x9CDB: 0x61AC,
                0x9CDC: 0x6194,
                0x9CDD: 0x619A,
                0x9CDE: 0x618A,
                0x9CDF: 0x6191,
                0x9CE0: 0x61AB,
                0x9CE1: 0x61AE,
                0x9CE2: 0x61CC,
                0x9CE3: 0x61CA,
                0x9CE4: 0x61C9,
                0x9CE5: 0x61F7,
                0x9CE6: 0x61C8,
                0x9CE7: 0x61C3,
                0x9CE8: 0x61C6,
                0x9CE9: 0x61BA,
                0x9CEA: 0x61CB,
                0x9CEB: 0x7F79,
                0x9CEC: 0x61CD,
                0x9CED: 0x61E6,
                0x9CEE: 0x61E3,
                0x9CEF: 0x61F6,
                0x9CF0: 0x61FA,
                0x9CF1: 0x61F4,
                0x9CF2: 0x61FF,
                0x9CF3: 0x61FD,
                0x9CF4: 0x61FC,
                0x9CF5: 0x61FE,
                0x9CF6: 0x6200,
                0x9CF7: 0x6208,
                0x9CF8: 0x6209,
                0x9CF9: 0x620D,
                0x9CFA: 0x620C,
                0x9CFB: 0x6214,
                0x9CFC: 0x621B,
                0x9D40: 0x621E,
                0x9D41: 0x6221,
                0x9D42: 0x622A,
                0x9D43: 0x622E,
                0x9D44: 0x6230,
                0x9D45: 0x6232,
                0x9D46: 0x6233,
                0x9D47: 0x6241,
                0x9D48: 0x624E,
                0x9D49: 0x625E,
                0x9D4A: 0x6263,
                0x9D4B: 0x625B,
                0x9D4C: 0x6260,
                0x9D4D: 0x6268,
                0x9D4E: 0x627C,
                0x9D4F: 0x6282,
                0x9D50: 0x6289,
                0x9D51: 0x627E,
                0x9D52: 0x6292,
                0x9D53: 0x6293,
                0x9D54: 0x6296,
                0x9D55: 0x62D4,
                0x9D56: 0x6283,
                0x9D57: 0x6294,
                0x9D58: 0x62D7,
                0x9D59: 0x62D1,
                0x9D5A: 0x62BB,
                0x9D5B: 0x62CF,
                0x9D5C: 0x62FF,
                0x9D5D: 0x62C6,
                0x9D5E: 0x64D4,
                0x9D5F: 0x62C8,
                0x9D60: 0x62DC,
                0x9D61: 0x62CC,
                0x9D62: 0x62CA,
                0x9D63: 0x62C2,
                0x9D64: 0x62C7,
                0x9D65: 0x629B,
                0x9D66: 0x62C9,
                0x9D67: 0x630C,
                0x9D68: 0x62EE,
                0x9D69: 0x62F1,
                0x9D6A: 0x6327,
                0x9D6B: 0x6302,
                0x9D6C: 0x6308,
                0x9D6D: 0x62EF,
                0x9D6E: 0x62F5,
                0x9D6F: 0x6350,
                0x9D70: 0x633E,
                0x9D71: 0x634D,
                0x9D72: 0x641C,
                0x9D73: 0x634F,
                0x9D74: 0x6396,
                0x9D75: 0x638E,
                0x9D76: 0x6380,
                0x9D77: 0x63AB,
                0x9D78: 0x6376,
                0x9D79: 0x63A3,
                0x9D7A: 0x638F,
                0x9D7B: 0x6389,
                0x9D7C: 0x639F,
                0x9D7D: 0x63B5,
                0x9D7E: 0x636B,
                0x9D80: 0x6369,
                0x9D81: 0x63BE,
                0x9D82: 0x63E9,
                0x9D83: 0x63C0,
                0x9D84: 0x63C6,
                0x9D85: 0x63E3,
                0x9D86: 0x63C9,
                0x9D87: 0x63D2,
                0x9D88: 0x63F6,
                0x9D89: 0x63C4,
                0x9D8A: 0x6416,
                0x9D8B: 0x6434,
                0x9D8C: 0x6406,
                0x9D8D: 0x6413,
                0x9D8E: 0x6426,
                0x9D8F: 0x6436,
                0x9D90: 0x651D,
                0x9D91: 0x6417,
                0x9D92: 0x6428,
                0x9D93: 0x640F,
                0x9D94: 0x6467,
                0x9D95: 0x646F,
                0x9D96: 0x6476,
                0x9D97: 0x644E,
                0x9D98: 0x652A,
                0x9D99: 0x6495,
                0x9D9A: 0x6493,
                0x9D9B: 0x64A5,
                0x9D9C: 0x64A9,
                0x9D9D: 0x6488,
                0x9D9E: 0x64BC,
                0x9D9F: 0x64DA,
                0x9DA0: 0x64D2,
                0x9DA1: 0x64C5,
                0x9DA2: 0x64C7,
                0x9DA3: 0x64BB,
                0x9DA4: 0x64D8,
                0x9DA5: 0x64C2,
                0x9DA6: 0x64F1,
                0x9DA7: 0x64E7,
                0x9DA8: 0x8209,
                0x9DA9: 0x64E0,
                0x9DAA: 0x64E1,
                0x9DAB: 0x62AC,
                0x9DAC: 0x64E3,
                0x9DAD: 0x64EF,
                0x9DAE: 0x652C,
                0x9DAF: 0x64F6,
                0x9DB0: 0x64F4,
                0x9DB1: 0x64F2,
                0x9DB2: 0x64FA,
                0x9DB3: 0x6500,
                0x9DB4: 0x64FD,
                0x9DB5: 0x6518,
                0x9DB6: 0x651C,
                0x9DB7: 0x6505,
                0x9DB8: 0x6524,
                0x9DB9: 0x6523,
                0x9DBA: 0x652B,
                0x9DBB: 0x6534,
                0x9DBC: 0x6535,
                0x9DBD: 0x6537,
                0x9DBE: 0x6536,
                0x9DBF: 0x6538,
                0x9DC0: 0x754B,
                0x9DC1: 0x6548,
                0x9DC2: 0x6556,
                0x9DC3: 0x6555,
                0x9DC4: 0x654D,
                0x9DC5: 0x6558,
                0x9DC6: 0x655E,
                0x9DC7: 0x655D,
                0x9DC8: 0x6572,
                0x9DC9: 0x6578,
                0x9DCA: 0x6582,
                0x9DCB: 0x6583,
                0x9DCC: 0x8B8A,
                0x9DCD: 0x659B,
                0x9DCE: 0x659F,
                0x9DCF: 0x65AB,
                0x9DD0: 0x65B7,
                0x9DD1: 0x65C3,
                0x9DD2: 0x65C6,
                0x9DD3: 0x65C1,
                0x9DD4: 0x65C4,
                0x9DD5: 0x65CC,
                0x9DD6: 0x65D2,
                0x9DD7: 0x65DB,
                0x9DD8: 0x65D9,
                0x9DD9: 0x65E0,
                0x9DDA: 0x65E1,
                0x9DDB: 0x65F1,
                0x9DDC: 0x6772,
                0x9DDD: 0x660A,
                0x9DDE: 0x6603,
                0x9DDF: 0x65FB,
                0x9DE0: 0x6773,
                0x9DE1: 0x6635,
                0x9DE2: 0x6636,
                0x9DE3: 0x6634,
                0x9DE4: 0x661C,
                0x9DE5: 0x664F,
                0x9DE6: 0x6644,
                0x9DE7: 0x6649,
                0x9DE8: 0x6641,
                0x9DE9: 0x665E,
                0x9DEA: 0x665D,
                0x9DEB: 0x6664,
                0x9DEC: 0x6667,
                0x9DED: 0x6668,
                0x9DEE: 0x665F,
                0x9DEF: 0x6662,
                0x9DF0: 0x6670,
                0x9DF1: 0x6683,
                0x9DF2: 0x6688,
                0x9DF3: 0x668E,
                0x9DF4: 0x6689,
                0x9DF5: 0x6684,
                0x9DF6: 0x6698,
                0x9DF7: 0x669D,
                0x9DF8: 0x66C1,
                0x9DF9: 0x66B9,
                0x9DFA: 0x66C9,
                0x9DFB: 0x66BE,
                0x9DFC: 0x66BC,
                0x9E40: 0x66C4,
                0x9E41: 0x66B8,
                0x9E42: 0x66D6,
                0x9E43: 0x66DA,
                0x9E44: 0x66E0,
                0x9E45: 0x663F,
                0x9E46: 0x66E6,
                0x9E47: 0x66E9,
                0x9E48: 0x66F0,
                0x9E49: 0x66F5,
                0x9E4A: 0x66F7,
                0x9E4B: 0x670F,
                0x9E4C: 0x6716,
                0x9E4D: 0x671E,
                0x9E4E: 0x6726,
                0x9E4F: 0x6727,
                0x9E50: 0x9738,
                0x9E51: 0x672E,
                0x9E52: 0x673F,
                0x9E53: 0x6736,
                0x9E54: 0x6741,
                0x9E55: 0x6738,
                0x9E56: 0x6737,
                0x9E57: 0x6746,
                0x9E58: 0x675E,
                0x9E59: 0x6760,
                0x9E5A: 0x6759,
                0x9E5B: 0x6763,
                0x9E5C: 0x6764,
                0x9E5D: 0x6789,
                0x9E5E: 0x6770,
                0x9E5F: 0x67A9,
                0x9E60: 0x677C,
                0x9E61: 0x676A,
                0x9E62: 0x678C,
                0x9E63: 0x678B,
                0x9E64: 0x67A6,
                0x9E65: 0x67A1,
                0x9E66: 0x6785,
                0x9E67: 0x67B7,
                0x9E68: 0x67EF,
                0x9E69: 0x67B4,
                0x9E6A: 0x67EC,
                0x9E6B: 0x67B3,
                0x9E6C: 0x67E9,
                0x9E6D: 0x67B8,
                0x9E6E: 0x67E4,
                0x9E6F: 0x67DE,
                0x9E70: 0x67DD,
                0x9E71: 0x67E2,
                0x9E72: 0x67EE,
                0x9E73: 0x67B9,
                0x9E74: 0x67CE,
                0x9E75: 0x67C6,
                0x9E76: 0x67E7,
                0x9E77: 0x6A9C,
                0x9E78: 0x681E,
                0x9E79: 0x6846,
                0x9E7A: 0x6829,
                0x9E7B: 0x6840,
                0x9E7C: 0x684D,
                0x9E7D: 0x6832,
                0x9E7E: 0x684E,
                0x9E80: 0x68B3,
                0x9E81: 0x682B,
                0x9E82: 0x6859,
                0x9E83: 0x6863,
                0x9E84: 0x6877,
                0x9E85: 0x687F,
                0x9E86: 0x689F,
                0x9E87: 0x688F,
                0x9E88: 0x68AD,
                0x9E89: 0x6894,
                0x9E8A: 0x689D,
                0x9E8B: 0x689B,
                0x9E8C: 0x6883,
                0x9E8D: 0x6AAE,
                0x9E8E: 0x68B9,
                0x9E8F: 0x6874,
                0x9E90: 0x68B5,
                0x9E91: 0x68A0,
                0x9E92: 0x68BA,
                0x9E93: 0x690F,
                0x9E94: 0x688D,
                0x9E95: 0x687E,
                0x9E96: 0x6901,
                0x9E97: 0x68CA,
                0x9E98: 0x6908,
                0x9E99: 0x68D8,
                0x9E9A: 0x6922,
                0x9E9B: 0x6926,
                0x9E9C: 0x68E1,
                0x9E9D: 0x690C,
                0x9E9E: 0x68CD,
                0x9E9F: 0x68D4,
                0x9EA0: 0x68E7,
                0x9EA1: 0x68D5,
                0x9EA2: 0x6936,
                0x9EA3: 0x6912,
                0x9EA4: 0x6904,
                0x9EA5: 0x68D7,
                0x9EA6: 0x68E3,
                0x9EA7: 0x6925,
                0x9EA8: 0x68F9,
                0x9EA9: 0x68E0,
                0x9EAA: 0x68EF,
                0x9EAB: 0x6928,
                0x9EAC: 0x692A,
                0x9EAD: 0x691A,
                0x9EAE: 0x6923,
                0x9EAF: 0x6921,
                0x9EB0: 0x68C6,
                0x9EB1: 0x6979,
                0x9EB2: 0x6977,
                0x9EB3: 0x695C,
                0x9EB4: 0x6978,
                0x9EB5: 0x696B,
                0x9EB6: 0x6954,
                0x9EB7: 0x697E,
                0x9EB8: 0x696E,
                0x9EB9: 0x6939,
                0x9EBA: 0x6974,
                0x9EBB: 0x693D,
                0x9EBC: 0x6959,
                0x9EBD: 0x6930,
                0x9EBE: 0x6961,
                0x9EBF: 0x695E,
                0x9EC0: 0x695D,
                0x9EC1: 0x6981,
                0x9EC2: 0x696A,
                0x9EC3: 0x69B2,
                0x9EC4: 0x69AE,
                0x9EC5: 0x69D0,
                0x9EC6: 0x69BF,
                0x9EC7: 0x69C1,
                0x9EC8: 0x69D3,
                0x9EC9: 0x69BE,
                0x9ECA: 0x69CE,
                0x9ECB: 0x5BE8,
                0x9ECC: 0x69CA,
                0x9ECD: 0x69DD,
                0x9ECE: 0x69BB,
                0x9ECF: 0x69C3,
                0x9ED0: 0x69A7,
                0x9ED1: 0x6A2E,
                0x9ED2: 0x6991,
                0x9ED3: 0x69A0,
                0x9ED4: 0x699C,
                0x9ED5: 0x6995,
                0x9ED6: 0x69B4,
                0x9ED7: 0x69DE,
                0x9ED8: 0x69E8,
                0x9ED9: 0x6A02,
                0x9EDA: 0x6A1B,
                0x9EDB: 0x69FF,
                0x9EDC: 0x6B0A,
                0x9EDD: 0x69F9,
                0x9EDE: 0x69F2,
                0x9EDF: 0x69E7,
                0x9EE0: 0x6A05,
                0x9EE1: 0x69B1,
                0x9EE2: 0x6A1E,
                0x9EE3: 0x69ED,
                0x9EE4: 0x6A14,
                0x9EE5: 0x69EB,
                0x9EE6: 0x6A0A,
                0x9EE7: 0x6A12,
                0x9EE8: 0x6AC1,
                0x9EE9: 0x6A23,
                0x9EEA: 0x6A13,
                0x9EEB: 0x6A44,
                0x9EEC: 0x6A0C,
                0x9EED: 0x6A72,
                0x9EEE: 0x6A36,
                0x9EEF: 0x6A78,
                0x9EF0: 0x6A47,
                0x9EF1: 0x6A62,
                0x9EF2: 0x6A59,
                0x9EF3: 0x6A66,
                0x9EF4: 0x6A48,
                0x9EF5: 0x6A38,
                0x9EF6: 0x6A22,
                0x9EF7: 0x6A90,
                0x9EF8: 0x6A8D,
                0x9EF9: 0x6AA0,
                0x9EFA: 0x6A84,
                0x9EFB: 0x6AA2,
                0x9EFC: 0x6AA3,
                0x9F40: 0x6A97,
                0x9F41: 0x8617,
                0x9F42: 0x6ABB,
                0x9F43: 0x6AC3,
                0x9F44: 0x6AC2,
                0x9F45: 0x6AB8,
                0x9F46: 0x6AB3,
                0x9F47: 0x6AAC,
                0x9F48: 0x6ADE,
                0x9F49: 0x6AD1,
                0x9F4A: 0x6ADF,
                0x9F4B: 0x6AAA,
                0x9F4C: 0x6ADA,
                0x9F4D: 0x6AEA,
                0x9F4E: 0x6AFB,
                0x9F4F: 0x6B05,
                0x9F50: 0x8616,
                0x9F51: 0x6AFA,
                0x9F52: 0x6B12,
                0x9F53: 0x6B16,
                0x9F54: 0x9B31,
                0x9F55: 0x6B1F,
                0x9F56: 0x6B38,
                0x9F57: 0x6B37,
                0x9F58: 0x76DC,
                0x9F59: 0x6B39,
                0x9F5A: 0x98EE,
                0x9F5B: 0x6B47,
                0x9F5C: 0x6B43,
                0x9F5D: 0x6B49,
                0x9F5E: 0x6B50,
                0x9F5F: 0x6B59,
                0x9F60: 0x6B54,
                0x9F61: 0x6B5B,
                0x9F62: 0x6B5F,
                0x9F63: 0x6B61,
                0x9F64: 0x6B78,
                0x9F65: 0x6B79,
                0x9F66: 0x6B7F,
                0x9F67: 0x6B80,
                0x9F68: 0x6B84,
                0x9F69: 0x6B83,
                0x9F6A: 0x6B8D,
                0x9F6B: 0x6B98,
                0x9F6C: 0x6B95,
                0x9F6D: 0x6B9E,
                0x9F6E: 0x6BA4,
                0x9F6F: 0x6BAA,
                0x9F70: 0x6BAB,
                0x9F71: 0x6BAF,
                0x9F72: 0x6BB2,
                0x9F73: 0x6BB1,
                0x9F74: 0x6BB3,
                0x9F75: 0x6BB7,
                0x9F76: 0x6BBC,
                0x9F77: 0x6BC6,
                0x9F78: 0x6BCB,
                0x9F79: 0x6BD3,
                0x9F7A: 0x6BDF,
                0x9F7B: 0x6BEC,
                0x9F7C: 0x6BEB,
                0x9F7D: 0x6BF3,
                0x9F7E: 0x6BEF,
                0x9F80: 0x9EBE,
                0x9F81: 0x6C08,
                0x9F82: 0x6C13,
                0x9F83: 0x6C14,
                0x9F84: 0x6C1B,
                0x9F85: 0x6C24,
                0x9F86: 0x6C23,
                0x9F87: 0x6C5E,
                0x9F88: 0x6C55,
                0x9F89: 0x6C62,
                0x9F8A: 0x6C6A,
                0x9F8B: 0x6C82,
                0x9F8C: 0x6C8D,
                0x9F8D: 0x6C9A,
                0x9F8E: 0x6C81,
                0x9F8F: 0x6C9B,
                0x9F90: 0x6C7E,
                0x9F91: 0x6C68,
                0x9F92: 0x6C73,
                0x9F93: 0x6C92,
                0x9F94: 0x6C90,
                0x9F95: 0x6CC4,
                0x9F96: 0x6CF1,
                0x9F97: 0x6CD3,
                0x9F98: 0x6CBD,
                0x9F99: 0x6CD7,
                0x9F9A: 0x6CC5,
                0x9F9B: 0x6CDD,
                0x9F9C: 0x6CAE,
                0x9F9D: 0x6CB1,
                0x9F9E: 0x6CBE,
                0x9F9F: 0x6CBA,
                0x9FA0: 0x6CDB,
                0x9FA1: 0x6CEF,
                0x9FA2: 0x6CD9,
                0x9FA3: 0x6CEA,
                0x9FA4: 0x6D1F,
                0x9FA5: 0x884D,
                0x9FA6: 0x6D36,
                0x9FA7: 0x6D2B,
                0x9FA8: 0x6D3D,
                0x9FA9: 0x6D38,
                0x9FAA: 0x6D19,
                0x9FAB: 0x6D35,
                0x9FAC: 0x6D33,
                0x9FAD: 0x6D12,
                0x9FAE: 0x6D0C,
                0x9FAF: 0x6D63,
                0x9FB0: 0x6D93,
                0x9FB1: 0x6D64,
                0x9FB2: 0x6D5A,
                0x9FB3: 0x6D79,
                0x9FB4: 0x6D59,
                0x9FB5: 0x6D8E,
                0x9FB6: 0x6D95,
                0x9FB7: 0x6FE4,
                0x9FB8: 0x6D85,
                0x9FB9: 0x6DF9,
                0x9FBA: 0x6E15,
                0x9FBB: 0x6E0A,
                0x9FBC: 0x6DB5,
                0x9FBD: 0x6DC7,
                0x9FBE: 0x6DE6,
                0x9FBF: 0x6DB8,
                0x9FC0: 0x6DC6,
                0x9FC1: 0x6DEC,
                0x9FC2: 0x6DDE,
                0x9FC3: 0x6DCC,
                0x9FC4: 0x6DE8,
                0x9FC5: 0x6DD2,
                0x9FC6: 0x6DC5,
                0x9FC7: 0x6DFA,
                0x9FC8: 0x6DD9,
                0x9FC9: 0x6DE4,
                0x9FCA: 0x6DD5,
                0x9FCB: 0x6DEA,
                0x9FCC: 0x6DEE,
                0x9FCD: 0x6E2D,
                0x9FCE: 0x6E6E,
                0x9FCF: 0x6E2E,
                0x9FD0: 0x6E19,
                0x9FD1: 0x6E72,
                0x9FD2: 0x6E5F,
                0x9FD3: 0x6E3E,
                0x9FD4: 0x6E23,
                0x9FD5: 0x6E6B,
                0x9FD6: 0x6E2B,
                0x9FD7: 0x6E76,
                0x9FD8: 0x6E4D,
                0x9FD9: 0x6E1F,
                0x9FDA: 0x6E43,
                0x9FDB: 0x6E3A,
                0x9FDC: 0x6E4E,
                0x9FDD: 0x6E24,
                0x9FDE: 0x6EFF,
                0x9FDF: 0x6E1D,
                0x9FE0: 0x6E38,
                0x9FE1: 0x6E82,
                0x9FE2: 0x6EAA,
                0x9FE3: 0x6E98,
                0x9FE4: 0x6EC9,
                0x9FE5: 0x6EB7,
                0x9FE6: 0x6ED3,
                0x9FE7: 0x6EBD,
                0x9FE8: 0x6EAF,
                0x9FE9: 0x6EC4,
                0x9FEA: 0x6EB2,
                0x9FEB: 0x6ED4,
                0x9FEC: 0x6ED5,
                0x9FED: 0x6E8F,
                0x9FEE: 0x6EA5,
                0x9FEF: 0x6EC2,
                0x9FF0: 0x6E9F,
                0x9FF1: 0x6F41,
                0x9FF2: 0x6F11,
                0x9FF3: 0x704C,
                0x9FF4: 0x6EEC,
                0x9FF5: 0x6EF8,
                0x9FF6: 0x6EFE,
                0x9FF7: 0x6F3F,
                0x9FF8: 0x6EF2,
                0x9FF9: 0x6F31,
                0x9FFA: 0x6EEF,
                0x9FFB: 0x6F32,
                0x9FFC: 0x6ECC,
                0xA1: 0xFF61,
                0xA2: 0xFF62,
                0xA3: 0xFF63,
                0xA4: 0xFF64,
                0xA5: 0xFF65,
                0xA6: 0xFF66,
                0xA7: 0xFF67,
                0xA8: 0xFF68,
                0xA9: 0xFF69,
                0xAA: 0xFF6A,
                0xAB: 0xFF6B,
                0xAC: 0xFF6C,
                0xAD: 0xFF6D,
                0xAE: 0xFF6E,
                0xAF: 0xFF6F,
                0xB0: 0xFF70,
                0xB1: 0xFF71,
                0xB2: 0xFF72,
                0xB3: 0xFF73,
                0xB4: 0xFF74,
                0xB5: 0xFF75,
                0xB6: 0xFF76,
                0xB7: 0xFF77,
                0xB8: 0xFF78,
                0xB9: 0xFF79,
                0xBA: 0xFF7A,
                0xBB: 0xFF7B,
                0xBC: 0xFF7C,
                0xBD: 0xFF7D,
                0xBE: 0xFF7E,
                0xBF: 0xFF7F,
                0xC0: 0xFF80,
                0xC1: 0xFF81,
                0xC2: 0xFF82,
                0xC3: 0xFF83,
                0xC4: 0xFF84,
                0xC5: 0xFF85,
                0xC6: 0xFF86,
                0xC7: 0xFF87,
                0xC8: 0xFF88,
                0xC9: 0xFF89,
                0xCA: 0xFF8A,
                0xCB: 0xFF8B,
                0xCC: 0xFF8C,
                0xCD: 0xFF8D,
                0xCE: 0xFF8E,
                0xCF: 0xFF8F,
                0xD0: 0xFF90,
                0xD1: 0xFF91,
                0xD2: 0xFF92,
                0xD3: 0xFF93,
                0xD4: 0xFF94,
                0xD5: 0xFF95,
                0xD6: 0xFF96,
                0xD7: 0xFF97,
                0xD8: 0xFF98,
                0xD9: 0xFF99,
                0xDA: 0xFF9A,
                0xDB: 0xFF9B,
                0xDC: 0xFF9C,
                0xDD: 0xFF9D,
                0xDE: 0xFF9E,
                0xDF: 0xFF9F,
                0xE040: 0x6F3E,
                0xE041: 0x6F13,
                0xE042: 0x6EF7,
                0xE043: 0x6F86,
                0xE044: 0x6F7A,
                0xE045: 0x6F78,
                0xE046: 0x6F81,
                0xE047: 0x6F80,
                0xE048: 0x6F6F,
                0xE049: 0x6F5B,
                0xE04A: 0x6FF3,
                0xE04B: 0x6F6D,
                0xE04C: 0x6F82,
                0xE04D: 0x6F7C,
                0xE04E: 0x6F58,
                0xE04F: 0x6F8E,
                0xE050: 0x6F91,
                0xE051: 0x6FC2,
                0xE052: 0x6F66,
                0xE053: 0x6FB3,
                0xE054: 0x6FA3,
                0xE055: 0x6FA1,
                0xE056: 0x6FA4,
                0xE057: 0x6FB9,
                0xE058: 0x6FC6,
                0xE059: 0x6FAA,
                0xE05A: 0x6FDF,
                0xE05B: 0x6FD5,
                0xE05C: 0x6FEC,
                0xE05D: 0x6FD4,
                0xE05E: 0x6FD8,
                0xE05F: 0x6FF1,
                0xE060: 0x6FEE,
                0xE061: 0x6FDB,
                0xE062: 0x7009,
                0xE063: 0x700B,
                0xE064: 0x6FFA,
                0xE065: 0x7011,
                0xE066: 0x7001,
                0xE067: 0x700F,
                0xE068: 0x6FFE,
                0xE069: 0x701B,
                0xE06A: 0x701A,
                0xE06B: 0x6F74,
                0xE06C: 0x701D,
                0xE06D: 0x7018,
                0xE06E: 0x701F,
                0xE06F: 0x7030,
                0xE070: 0x703E,
                0xE071: 0x7032,
                0xE072: 0x7051,
                0xE073: 0x7063,
                0xE074: 0x7099,
                0xE075: 0x7092,
                0xE076: 0x70AF,
                0xE077: 0x70F1,
                0xE078: 0x70AC,
                0xE079: 0x70B8,
                0xE07A: 0x70B3,
                0xE07B: 0x70AE,
                0xE07C: 0x70DF,
                0xE07D: 0x70CB,
                0xE07E: 0x70DD,
                0xE080: 0x70D9,
                0xE081: 0x7109,
                0xE082: 0x70FD,
                0xE083: 0x711C,
                0xE084: 0x7119,
                0xE085: 0x7165,
                0xE086: 0x7155,
                0xE087: 0x7188,
                0xE088: 0x7166,
                0xE089: 0x7162,
                0xE08A: 0x714C,
                0xE08B: 0x7156,
                0xE08C: 0x716C,
                0xE08D: 0x718F,
                0xE08E: 0x71FB,
                0xE08F: 0x7184,
                0xE090: 0x7195,
                0xE091: 0x71A8,
                0xE092: 0x71AC,
                0xE093: 0x71D7,
                0xE094: 0x71B9,
                0xE095: 0x71BE,
                0xE096: 0x71D2,
                0xE097: 0x71C9,
                0xE098: 0x71D4,
                0xE099: 0x71CE,
                0xE09A: 0x71E0,
                0xE09B: 0x71EC,
                0xE09C: 0x71E7,
                0xE09D: 0x71F5,
                0xE09E: 0x71FC,
                0xE09F: 0x71F9,
                0xE0A0: 0x71FF,
                0xE0A1: 0x720D,
                0xE0A2: 0x7210,
                0xE0A3: 0x721B,
                0xE0A4: 0x7228,
                0xE0A5: 0x722D,
                0xE0A6: 0x722C,
                0xE0A7: 0x7230,
                0xE0A8: 0x7232,
                0xE0A9: 0x723B,
                0xE0AA: 0x723C,
                0xE0AB: 0x723F,
                0xE0AC: 0x7240,
                0xE0AD: 0x7246,
                0xE0AE: 0x724B,
                0xE0AF: 0x7258,
                0xE0B0: 0x7274,
                0xE0B1: 0x727E,
                0xE0B2: 0x7282,
                0xE0B3: 0x7281,
                0xE0B4: 0x7287,
                0xE0B5: 0x7292,
                0xE0B6: 0x7296,
                0xE0B7: 0x72A2,
                0xE0B8: 0x72A7,
                0xE0B9: 0x72B9,
                0xE0BA: 0x72B2,
                0xE0BB: 0x72C3,
                0xE0BC: 0x72C6,
                0xE0BD: 0x72C4,
                0xE0BE: 0x72CE,
                0xE0BF: 0x72D2,
                0xE0C0: 0x72E2,
                0xE0C1: 0x72E0,
                0xE0C2: 0x72E1,
                0xE0C3: 0x72F9,
                0xE0C4: 0x72F7,
                0xE0C5: 0x500F,
                0xE0C6: 0x7317,
                0xE0C7: 0x730A,
                0xE0C8: 0x731C,
                0xE0C9: 0x7316,
                0xE0CA: 0x731D,
                0xE0CB: 0x7334,
                0xE0CC: 0x732F,
                0xE0CD: 0x7329,
                0xE0CE: 0x7325,
                0xE0CF: 0x733E,
                0xE0D0: 0x734E,
                0xE0D1: 0x734F,
                0xE0D2: 0x9ED8,
                0xE0D3: 0x7357,
                0xE0D4: 0x736A,
                0xE0D5: 0x7368,
                0xE0D6: 0x7370,
                0xE0D7: 0x7378,
                0xE0D8: 0x7375,
                0xE0D9: 0x737B,
                0xE0DA: 0x737A,
                0xE0DB: 0x73C8,
                0xE0DC: 0x73B3,
                0xE0DD: 0x73CE,
                0xE0DE: 0x73BB,
                0xE0DF: 0x73C0,
                0xE0E0: 0x73E5,
                0xE0E1: 0x73EE,
                0xE0E2: 0x73DE,
                0xE0E3: 0x74A2,
                0xE0E4: 0x7405,
                0xE0E5: 0x746F,
                0xE0E6: 0x7425,
                0xE0E7: 0x73F8,
                0xE0E8: 0x7432,
                0xE0E9: 0x743A,
                0xE0EA: 0x7455,
                0xE0EB: 0x743F,
                0xE0EC: 0x745F,
                0xE0ED: 0x7459,
                0xE0EE: 0x7441,
                0xE0EF: 0x745C,
                0xE0F0: 0x7469,
                0xE0F1: 0x7470,
                0xE0F2: 0x7463,
                0xE0F3: 0x746A,
                0xE0F4: 0x7476,
                0xE0F5: 0x747E,
                0xE0F6: 0x748B,
                0xE0F7: 0x749E,
                0xE0F8: 0x74A7,
                0xE0F9: 0x74CA,
                0xE0FA: 0x74CF,
                0xE0FB: 0x74D4,
                0xE0FC: 0x73F1,
                0xE140: 0x74E0,
                0xE141: 0x74E3,
                0xE142: 0x74E7,
                0xE143: 0x74E9,
                0xE144: 0x74EE,
                0xE145: 0x74F2,
                0xE146: 0x74F0,
                0xE147: 0x74F1,
                0xE148: 0x74F8,
                0xE149: 0x74F7,
                0xE14A: 0x7504,
                0xE14B: 0x7503,
                0xE14C: 0x7505,
                0xE14D: 0x750C,
                0xE14E: 0x750E,
                0xE14F: 0x750D,
                0xE150: 0x7515,
                0xE151: 0x7513,
                0xE152: 0x751E,
                0xE153: 0x7526,
                0xE154: 0x752C,
                0xE155: 0x753C,
                0xE156: 0x7544,
                0xE157: 0x754D,
                0xE158: 0x754A,
                0xE159: 0x7549,
                0xE15A: 0x755B,
                0xE15B: 0x7546,
                0xE15C: 0x755A,
                0xE15D: 0x7569,
                0xE15E: 0x7564,
                0xE15F: 0x7567,
                0xE160: 0x756B,
                0xE161: 0x756D,
                0xE162: 0x7578,
                0xE163: 0x7576,
                0xE164: 0x7586,
                0xE165: 0x7587,
                0xE166: 0x7574,
                0xE167: 0x758A,
                0xE168: 0x7589,
                0xE169: 0x7582,
                0xE16A: 0x7594,
                0xE16B: 0x759A,
                0xE16C: 0x759D,
                0xE16D: 0x75A5,
                0xE16E: 0x75A3,
                0xE16F: 0x75C2,
                0xE170: 0x75B3,
                0xE171: 0x75C3,
                0xE172: 0x75B5,
                0xE173: 0x75BD,
                0xE174: 0x75B8,
                0xE175: 0x75BC,
                0xE176: 0x75B1,
                0xE177: 0x75CD,
                0xE178: 0x75CA,
                0xE179: 0x75D2,
                0xE17A: 0x75D9,
                0xE17B: 0x75E3,
                0xE17C: 0x75DE,
                0xE17D: 0x75FE,
                0xE17E: 0x75FF,
                0xE180: 0x75FC,
                0xE181: 0x7601,
                0xE182: 0x75F0,
                0xE183: 0x75FA,
                0xE184: 0x75F2,
                0xE185: 0x75F3,
                0xE186: 0x760B,
                0xE187: 0x760D,
                0xE188: 0x7609,
                0xE189: 0x761F,
                0xE18A: 0x7627,
                0xE18B: 0x7620,
                0xE18C: 0x7621,
                0xE18D: 0x7622,
                0xE18E: 0x7624,
                0xE18F: 0x7634,
                0xE190: 0x7630,
                0xE191: 0x763B,
                0xE192: 0x7647,
                0xE193: 0x7648,
                0xE194: 0x7646,
                0xE195: 0x765C,
                0xE196: 0x7658,
                0xE197: 0x7661,
                0xE198: 0x7662,
                0xE199: 0x7668,
                0xE19A: 0x7669,
                0xE19B: 0x766A,
                0xE19C: 0x7667,
                0xE19D: 0x766C,
                0xE19E: 0x7670,
                0xE19F: 0x7672,
                0xE1A0: 0x7676,
                0xE1A1: 0x7678,
                0xE1A2: 0x767C,
                0xE1A3: 0x7680,
                0xE1A4: 0x7683,
                0xE1A5: 0x7688,
                0xE1A6: 0x768B,
                0xE1A7: 0x768E,
                0xE1A8: 0x7696,
                0xE1A9: 0x7693,
                0xE1AA: 0x7699,
                0xE1AB: 0x769A,
                0xE1AC: 0x76B0,
                0xE1AD: 0x76B4,
                0xE1AE: 0x76B8,
                0xE1AF: 0x76B9,
                0xE1B0: 0x76BA,
                0xE1B1: 0x76C2,
                0xE1B2: 0x76CD,
                0xE1B3: 0x76D6,
                0xE1B4: 0x76D2,
                0xE1B5: 0x76DE,
                0xE1B6: 0x76E1,
                0xE1B7: 0x76E5,
                0xE1B8: 0x76E7,
                0xE1B9: 0x76EA,
                0xE1BA: 0x862F,
                0xE1BB: 0x76FB,
                0xE1BC: 0x7708,
                0xE1BD: 0x7707,
                0xE1BE: 0x7704,
                0xE1BF: 0x7729,
                0xE1C0: 0x7724,
                0xE1C1: 0x771E,
                0xE1C2: 0x7725,
                0xE1C3: 0x7726,
                0xE1C4: 0x771B,
                0xE1C5: 0x7737,
                0xE1C6: 0x7738,
                0xE1C7: 0x7747,
                0xE1C8: 0x775A,
                0xE1C9: 0x7768,
                0xE1CA: 0x776B,
                0xE1CB: 0x775B,
                0xE1CC: 0x7765,
                0xE1CD: 0x777F,
                0xE1CE: 0x777E,
                0xE1CF: 0x7779,
                0xE1D0: 0x778E,
                0xE1D1: 0x778B,
                0xE1D2: 0x7791,
                0xE1D3: 0x77A0,
                0xE1D4: 0x779E,
                0xE1D5: 0x77B0,
                0xE1D6: 0x77B6,
                0xE1D7: 0x77B9,
                0xE1D8: 0x77BF,
                0xE1D9: 0x77BC,
                0xE1DA: 0x77BD,
                0xE1DB: 0x77BB,
                0xE1DC: 0x77C7,
                0xE1DD: 0x77CD,
                0xE1DE: 0x77D7,
                0xE1DF: 0x77DA,
                0xE1E0: 0x77DC,
                0xE1E1: 0x77E3,
                0xE1E2: 0x77EE,
                0xE1E3: 0x77FC,
                0xE1E4: 0x780C,
                0xE1E5: 0x7812,
                0xE1E6: 0x7926,
                0xE1E7: 0x7820,
                0xE1E8: 0x792A,
                0xE1E9: 0x7845,
                0xE1EA: 0x788E,
                0xE1EB: 0x7874,
                0xE1EC: 0x7886,
                0xE1ED: 0x787C,
                0xE1EE: 0x789A,
                0xE1EF: 0x788C,
                0xE1F0: 0x78A3,
                0xE1F1: 0x78B5,
                0xE1F2: 0x78AA,
                0xE1F3: 0x78AF,
                0xE1F4: 0x78D1,
                0xE1F5: 0x78C6,
                0xE1F6: 0x78CB,
                0xE1F7: 0x78D4,
                0xE1F8: 0x78BE,
                0xE1F9: 0x78BC,
                0xE1FA: 0x78C5,
                0xE1FB: 0x78CA,
                0xE1FC: 0x78EC,
                0xE240: 0x78E7,
                0xE241: 0x78DA,
                0xE242: 0x78FD,
                0xE243: 0x78F4,
                0xE244: 0x7907,
                0xE245: 0x7912,
                0xE246: 0x7911,
                0xE247: 0x7919,
                0xE248: 0x792C,
                0xE249: 0x792B,
                0xE24A: 0x7940,
                0xE24B: 0x7960,
                0xE24C: 0x7957,
                0xE24D: 0x795F,
                0xE24E: 0x795A,
                0xE24F: 0x7955,
                0xE250: 0x7953,
                0xE251: 0x797A,
                0xE252: 0x797F,
                0xE253: 0x798A,
                0xE254: 0x799D,
                0xE255: 0x79A7,
                0xE256: 0x9F4B,
                0xE257: 0x79AA,
                0xE258: 0x79AE,
                0xE259: 0x79B3,
                0xE25A: 0x79B9,
                0xE25B: 0x79BA,
                0xE25C: 0x79C9,
                0xE25D: 0x79D5,
                0xE25E: 0x79E7,
                0xE25F: 0x79EC,
                0xE260: 0x79E1,
                0xE261: 0x79E3,
                0xE262: 0x7A08,
                0xE263: 0x7A0D,
                0xE264: 0x7A18,
                0xE265: 0x7A19,
                0xE266: 0x7A20,
                0xE267: 0x7A1F,
                0xE268: 0x7980,
                0xE269: 0x7A31,
                0xE26A: 0x7A3B,
                0xE26B: 0x7A3E,
                0xE26C: 0x7A37,
                0xE26D: 0x7A43,
                0xE26E: 0x7A57,
                0xE26F: 0x7A49,
                0xE270: 0x7A61,
                0xE271: 0x7A62,
                0xE272: 0x7A69,
                0xE273: 0x9F9D,
                0xE274: 0x7A70,
                0xE275: 0x7A79,
                0xE276: 0x7A7D,
                0xE277: 0x7A88,
                0xE278: 0x7A97,
                0xE279: 0x7A95,
                0xE27A: 0x7A98,
                0xE27B: 0x7A96,
                0xE27C: 0x7AA9,
                0xE27D: 0x7AC8,
                0xE27E: 0x7AB0,
                0xE280: 0x7AB6,
                0xE281: 0x7AC5,
                0xE282: 0x7AC4,
                0xE283: 0x7ABF,
                0xE284: 0x9083,
                0xE285: 0x7AC7,
                0xE286: 0x7ACA,
                0xE287: 0x7ACD,
                0xE288: 0x7ACF,
                0xE289: 0x7AD5,
                0xE28A: 0x7AD3,
                0xE28B: 0x7AD9,
                0xE28C: 0x7ADA,
                0xE28D: 0x7ADD,
                0xE28E: 0x7AE1,
                0xE28F: 0x7AE2,
                0xE290: 0x7AE6,
                0xE291: 0x7AED,
                0xE292: 0x7AF0,
                0xE293: 0x7B02,
                0xE294: 0x7B0F,
                0xE295: 0x7B0A,
                0xE296: 0x7B06,
                0xE297: 0x7B33,
                0xE298: 0x7B18,
                0xE299: 0x7B19,
                0xE29A: 0x7B1E,
                0xE29B: 0x7B35,
                0xE29C: 0x7B28,
                0xE29D: 0x7B36,
                0xE29E: 0x7B50,
                0xE29F: 0x7B7A,
                0xE2A0: 0x7B04,
                0xE2A1: 0x7B4D,
                0xE2A2: 0x7B0B,
                0xE2A3: 0x7B4C,
                0xE2A4: 0x7B45,
                0xE2A5: 0x7B75,
                0xE2A6: 0x7B65,
                0xE2A7: 0x7B74,
                0xE2A8: 0x7B67,
                0xE2A9: 0x7B70,
                0xE2AA: 0x7B71,
                0xE2AB: 0x7B6C,
                0xE2AC: 0x7B6E,
                0xE2AD: 0x7B9D,
                0xE2AE: 0x7B98,
                0xE2AF: 0x7B9F,
                0xE2B0: 0x7B8D,
                0xE2B1: 0x7B9C,
                0xE2B2: 0x7B9A,
                0xE2B3: 0x7B8B,
                0xE2B4: 0x7B92,
                0xE2B5: 0x7B8F,
                0xE2B6: 0x7B5D,
                0xE2B7: 0x7B99,
                0xE2B8: 0x7BCB,
                0xE2B9: 0x7BC1,
                0xE2BA: 0x7BCC,
                0xE2BB: 0x7BCF,
                0xE2BC: 0x7BB4,
                0xE2BD: 0x7BC6,
                0xE2BE: 0x7BDD,
                0xE2BF: 0x7BE9,
                0xE2C0: 0x7C11,
                0xE2C1: 0x7C14,
                0xE2C2: 0x7BE6,
                0xE2C3: 0x7BE5,
                0xE2C4: 0x7C60,
                0xE2C5: 0x7C00,
                0xE2C6: 0x7C07,
                0xE2C7: 0x7C13,
                0xE2C8: 0x7BF3,
                0xE2C9: 0x7BF7,
                0xE2CA: 0x7C17,
                0xE2CB: 0x7C0D,
                0xE2CC: 0x7BF6,
                0xE2CD: 0x7C23,
                0xE2CE: 0x7C27,
                0xE2CF: 0x7C2A,
                0xE2D0: 0x7C1F,
                0xE2D1: 0x7C37,
                0xE2D2: 0x7C2B,
                0xE2D3: 0x7C3D,
                0xE2D4: 0x7C4C,
                0xE2D5: 0x7C43,
                0xE2D6: 0x7C54,
                0xE2D7: 0x7C4F,
                0xE2D8: 0x7C40,
                0xE2D9: 0x7C50,
                0xE2DA: 0x7C58,
                0xE2DB: 0x7C5F,
                0xE2DC: 0x7C64,
                0xE2DD: 0x7C56,
                0xE2DE: 0x7C65,
                0xE2DF: 0x7C6C,
                0xE2E0: 0x7C75,
                0xE2E1: 0x7C83,
                0xE2E2: 0x7C90,
                0xE2E3: 0x7CA4,
                0xE2E4: 0x7CAD,
                0xE2E5: 0x7CA2,
                0xE2E6: 0x7CAB,
                0xE2E7: 0x7CA1,
                0xE2E8: 0x7CA8,
                0xE2E9: 0x7CB3,
                0xE2EA: 0x7CB2,
                0xE2EB: 0x7CB1,
                0xE2EC: 0x7CAE,
                0xE2ED: 0x7CB9,
                0xE2EE: 0x7CBD,
                0xE2EF: 0x7CC0,
                0xE2F0: 0x7CC5,
                0xE2F1: 0x7CC2,
                0xE2F2: 0x7CD8,
                0xE2F3: 0x7CD2,
                0xE2F4: 0x7CDC,
                0xE2F5: 0x7CE2,
                0xE2F6: 0x9B3B,
                0xE2F7: 0x7CEF,
                0xE2F8: 0x7CF2,
                0xE2F9: 0x7CF4,
                0xE2FA: 0x7CF6,
                0xE2FB: 0x7CFA,
                0xE2FC: 0x7D06,
                0xE340: 0x7D02,
                0xE341: 0x7D1C,
                0xE342: 0x7D15,
                0xE343: 0x7D0A,
                0xE344: 0x7D45,
                0xE345: 0x7D4B,
                0xE346: 0x7D2E,
                0xE347: 0x7D32,
                0xE348: 0x7D3F,
                0xE349: 0x7D35,
                0xE34A: 0x7D46,
                0xE34B: 0x7D73,
                0xE34C: 0x7D56,
                0xE34D: 0x7D4E,
                0xE34E: 0x7D72,
                0xE34F: 0x7D68,
                0xE350: 0x7D6E,
                0xE351: 0x7D4F,
                0xE352: 0x7D63,
                0xE353: 0x7D93,
                0xE354: 0x7D89,
                0xE355: 0x7D5B,
                0xE356: 0x7D8F,
                0xE357: 0x7D7D,
                0xE358: 0x7D9B,
                0xE359: 0x7DBA,
                0xE35A: 0x7DAE,
                0xE35B: 0x7DA3,
                0xE35C: 0x7DB5,
                0xE35D: 0x7DC7,
                0xE35E: 0x7DBD,
                0xE35F: 0x7DAB,
                0xE360: 0x7E3D,
                0xE361: 0x7DA2,
                0xE362: 0x7DAF,
                0xE363: 0x7DDC,
                0xE364: 0x7DB8,
                0xE365: 0x7D9F,
                0xE366: 0x7DB0,
                0xE367: 0x7DD8,
                0xE368: 0x7DDD,
                0xE369: 0x7DE4,
                0xE36A: 0x7DDE,
                0xE36B: 0x7DFB,
                0xE36C: 0x7DF2,
                0xE36D: 0x7DE1,
                0xE36E: 0x7E05,
                0xE36F: 0x7E0A,
                0xE370: 0x7E23,
                0xE371: 0x7E21,
                0xE372: 0x7E12,
                0xE373: 0x7E31,
                0xE374: 0x7E1F,
                0xE375: 0x7E09,
                0xE376: 0x7E0B,
                0xE377: 0x7E22,
                0xE378: 0x7E46,
                0xE379: 0x7E66,
                0xE37A: 0x7E3B,
                0xE37B: 0x7E35,
                0xE37C: 0x7E39,
                0xE37D: 0x7E43,
                0xE37E: 0x7E37,
                0xE380: 0x7E32,
                0xE381: 0x7E3A,
                0xE382: 0x7E67,
                0xE383: 0x7E5D,
                0xE384: 0x7E56,
                0xE385: 0x7E5E,
                0xE386: 0x7E59,
                0xE387: 0x7E5A,
                0xE388: 0x7E79,
                0xE389: 0x7E6A,
                0xE38A: 0x7E69,
                0xE38B: 0x7E7C,
                0xE38C: 0x7E7B,
                0xE38D: 0x7E83,
                0xE38E: 0x7DD5,
                0xE38F: 0x7E7D,
                0xE390: 0x8FAE,
                0xE391: 0x7E7F,
                0xE392: 0x7E88,
                0xE393: 0x7E89,
                0xE394: 0x7E8C,
                0xE395: 0x7E92,
                0xE396: 0x7E90,
                0xE397: 0x7E93,
                0xE398: 0x7E94,
                0xE399: 0x7E96,
                0xE39A: 0x7E8E,
                0xE39B: 0x7E9B,
                0xE39C: 0x7E9C,
                0xE39D: 0x7F38,
                0xE39E: 0x7F3A,
                0xE39F: 0x7F45,
                0xE3A0: 0x7F4C,
                0xE3A1: 0x7F4D,
                0xE3A2: 0x7F4E,
                0xE3A3: 0x7F50,
                0xE3A4: 0x7F51,
                0xE3A5: 0x7F55,
                0xE3A6: 0x7F54,
                0xE3A7: 0x7F58,
                0xE3A8: 0x7F5F,
                0xE3A9: 0x7F60,
                0xE3AA: 0x7F68,
                0xE3AB: 0x7F69,
                0xE3AC: 0x7F67,
                0xE3AD: 0x7F78,
                0xE3AE: 0x7F82,
                0xE3AF: 0x7F86,
                0xE3B0: 0x7F83,
                0xE3B1: 0x7F88,
                0xE3B2: 0x7F87,
                0xE3B3: 0x7F8C,
                0xE3B4: 0x7F94,
                0xE3B5: 0x7F9E,
                0xE3B6: 0x7F9D,
                0xE3B7: 0x7F9A,
                0xE3B8: 0x7FA3,
                0xE3B9: 0x7FAF,
                0xE3BA: 0x7FB2,
                0xE3BB: 0x7FB9,
                0xE3BC: 0x7FAE,
                0xE3BD: 0x7FB6,
                0xE3BE: 0x7FB8,
                0xE3BF: 0x8B71,
                0xE3C0: 0x7FC5,
                0xE3C1: 0x7FC6,
                0xE3C2: 0x7FCA,
                0xE3C3: 0x7FD5,
                0xE3C4: 0x7FD4,
                0xE3C5: 0x7FE1,
                0xE3C6: 0x7FE6,
                0xE3C7: 0x7FE9,
                0xE3C8: 0x7FF3,
                0xE3C9: 0x7FF9,
                0xE3CA: 0x98DC,
                0xE3CB: 0x8006,
                0xE3CC: 0x8004,
                0xE3CD: 0x800B,
                0xE3CE: 0x8012,
                0xE3CF: 0x8018,
                0xE3D0: 0x8019,
                0xE3D1: 0x801C,
                0xE3D2: 0x8021,
                0xE3D3: 0x8028,
                0xE3D4: 0x803F,
                0xE3D5: 0x803B,
                0xE3D6: 0x804A,
                0xE3D7: 0x8046,
                0xE3D8: 0x8052,
                0xE3D9: 0x8058,
                0xE3DA: 0x805A,
                0xE3DB: 0x805F,
                0xE3DC: 0x8062,
                0xE3DD: 0x8068,
                0xE3DE: 0x8073,
                0xE3DF: 0x8072,
                0xE3E0: 0x8070,
                0xE3E1: 0x8076,
                0xE3E2: 0x8079,
                0xE3E3: 0x807D,
                0xE3E4: 0x807F,
                0xE3E5: 0x8084,
                0xE3E6: 0x8086,
                0xE3E7: 0x8085,
                0xE3E8: 0x809B,
                0xE3E9: 0x8093,
                0xE3EA: 0x809A,
                0xE3EB: 0x80AD,
                0xE3EC: 0x5190,
                0xE3ED: 0x80AC,
                0xE3EE: 0x80DB,
                0xE3EF: 0x80E5,
                0xE3F0: 0x80D9,
                0xE3F1: 0x80DD,
                0xE3F2: 0x80C4,
                0xE3F3: 0x80DA,
                0xE3F4: 0x80D6,
                0xE3F5: 0x8109,
                0xE3F6: 0x80EF,
                0xE3F7: 0x80F1,
                0xE3F8: 0x811B,
                0xE3F9: 0x8129,
                0xE3FA: 0x8123,
                0xE3FB: 0x812F,
                0xE3FC: 0x814B,
                0xE440: 0x968B,
                0xE441: 0x8146,
                0xE442: 0x813E,
                0xE443: 0x8153,
                0xE444: 0x8151,
                0xE445: 0x80FC,
                0xE446: 0x8171,
                0xE447: 0x816E,
                0xE448: 0x8165,
                0xE449: 0x8166,
                0xE44A: 0x8174,
                0xE44B: 0x8183,
                0xE44C: 0x8188,
                0xE44D: 0x818A,
                0xE44E: 0x8180,
                0xE44F: 0x8182,
                0xE450: 0x81A0,
                0xE451: 0x8195,
                0xE452: 0x81A4,
                0xE453: 0x81A3,
                0xE454: 0x815F,
                0xE455: 0x8193,
                0xE456: 0x81A9,
                0xE457: 0x81B0,
                0xE458: 0x81B5,
                0xE459: 0x81BE,
                0xE45A: 0x81B8,
                0xE45B: 0x81BD,
                0xE45C: 0x81C0,
                0xE45D: 0x81C2,
                0xE45E: 0x81BA,
                0xE45F: 0x81C9,
                0xE460: 0x81CD,
                0xE461: 0x81D1,
                0xE462: 0x81D9,
                0xE463: 0x81D8,
                0xE464: 0x81C8,
                0xE465: 0x81DA,
                0xE466: 0x81DF,
                0xE467: 0x81E0,
                0xE468: 0x81E7,
                0xE469: 0x81FA,
                0xE46A: 0x81FB,
                0xE46B: 0x81FE,
                0xE46C: 0x8201,
                0xE46D: 0x8202,
                0xE46E: 0x8205,
                0xE46F: 0x8207,
                0xE470: 0x820A,
                0xE471: 0x820D,
                0xE472: 0x8210,
                0xE473: 0x8216,
                0xE474: 0x8229,
                0xE475: 0x822B,
                0xE476: 0x8238,
                0xE477: 0x8233,
                0xE478: 0x8240,
                0xE479: 0x8259,
                0xE47A: 0x8258,
                0xE47B: 0x825D,
                0xE47C: 0x825A,
                0xE47D: 0x825F,
                0xE47E: 0x8264,
                0xE480: 0x8262,
                0xE481: 0x8268,
                0xE482: 0x826A,
                0xE483: 0x826B,
                0xE484: 0x822E,
                0xE485: 0x8271,
                0xE486: 0x8277,
                0xE487: 0x8278,
                0xE488: 0x827E,
                0xE489: 0x828D,
                0xE48A: 0x8292,
                0xE48B: 0x82AB,
                0xE48C: 0x829F,
                0xE48D: 0x82BB,
                0xE48E: 0x82AC,
                0xE48F: 0x82E1,
                0xE490: 0x82E3,
                0xE491: 0x82DF,
                0xE492: 0x82D2,
                0xE493: 0x82F4,
                0xE494: 0x82F3,
                0xE495: 0x82FA,
                0xE496: 0x8393,
                0xE497: 0x8303,
                0xE498: 0x82FB,
                0xE499: 0x82F9,
                0xE49A: 0x82DE,
                0xE49B: 0x8306,
                0xE49C: 0x82DC,
                0xE49D: 0x8309,
                0xE49E: 0x82D9,
                0xE49F: 0x8335,
                0xE4A0: 0x8334,
                0xE4A1: 0x8316,
                0xE4A2: 0x8332,
                0xE4A3: 0x8331,
                0xE4A4: 0x8340,
                0xE4A5: 0x8339,
                0xE4A6: 0x8350,
                0xE4A7: 0x8345,
                0xE4A8: 0x832F,
                0xE4A9: 0x832B,
                0xE4AA: 0x8317,
                0xE4AB: 0x8318,
                0xE4AC: 0x8385,
                0xE4AD: 0x839A,
                0xE4AE: 0x83AA,
                0xE4AF: 0x839F,
                0xE4B0: 0x83A2,
                0xE4B1: 0x8396,
                0xE4B2: 0x8323,
                0xE4B3: 0x838E,
                0xE4B4: 0x8387,
                0xE4B5: 0x838A,
                0xE4B6: 0x837C,
                0xE4B7: 0x83B5,
                0xE4B8: 0x8373,
                0xE4B9: 0x8375,
                0xE4BA: 0x83A0,
                0xE4BB: 0x8389,
                0xE4BC: 0x83A8,
                0xE4BD: 0x83F4,
                0xE4BE: 0x8413,
                0xE4BF: 0x83EB,
                0xE4C0: 0x83CE,
                0xE4C1: 0x83FD,
                0xE4C2: 0x8403,
                0xE4C3: 0x83D8,
                0xE4C4: 0x840B,
                0xE4C5: 0x83C1,
                0xE4C6: 0x83F7,
                0xE4C7: 0x8407,
                0xE4C8: 0x83E0,
                0xE4C9: 0x83F2,
                0xE4CA: 0x840D,
                0xE4CB: 0x8422,
                0xE4CC: 0x8420,
                0xE4CD: 0x83BD,
                0xE4CE: 0x8438,
                0xE4CF: 0x8506,
                0xE4D0: 0x83FB,
                0xE4D1: 0x846D,
                0xE4D2: 0x842A,
                0xE4D3: 0x843C,
                0xE4D4: 0x855A,
                0xE4D5: 0x8484,
                0xE4D6: 0x8477,
                0xE4D7: 0x846B,
                0xE4D8: 0x84AD,
                0xE4D9: 0x846E,
                0xE4DA: 0x8482,
                0xE4DB: 0x8469,
                0xE4DC: 0x8446,
                0xE4DD: 0x842C,
                0xE4DE: 0x846F,
                0xE4DF: 0x8479,
                0xE4E0: 0x8435,
                0xE4E1: 0x84CA,
                0xE4E2: 0x8462,
                0xE4E3: 0x84B9,
                0xE4E4: 0x84BF,
                0xE4E5: 0x849F,
                0xE4E6: 0x84D9,
                0xE4E7: 0x84CD,
                0xE4E8: 0x84BB,
                0xE4E9: 0x84DA,
                0xE4EA: 0x84D0,
                0xE4EB: 0x84C1,
                0xE4EC: 0x84C6,
                0xE4ED: 0x84D6,
                0xE4EE: 0x84A1,
                0xE4EF: 0x8521,
                0xE4F0: 0x84FF,
                0xE4F1: 0x84F4,
                0xE4F2: 0x8517,
                0xE4F3: 0x8518,
                0xE4F4: 0x852C,
                0xE4F5: 0x851F,
                0xE4F6: 0x8515,
                0xE4F7: 0x8514,
                0xE4F8: 0x84FC,
                0xE4F9: 0x8540,
                0xE4FA: 0x8563,
                0xE4FB: 0x8558,
                0xE4FC: 0x8548,
                0xE540: 0x8541,
                0xE541: 0x8602,
                0xE542: 0x854B,
                0xE543: 0x8555,
                0xE544: 0x8580,
                0xE545: 0x85A4,
                0xE546: 0x8588,
                0xE547: 0x8591,
                0xE548: 0x858A,
                0xE549: 0x85A8,
                0xE54A: 0x856D,
                0xE54B: 0x8594,
                0xE54C: 0x859B,
                0xE54D: 0x85EA,
                0xE54E: 0x8587,
                0xE54F: 0x859C,
                0xE550: 0x8577,
                0xE551: 0x857E,
                0xE552: 0x8590,
                0xE553: 0x85C9,
                0xE554: 0x85BA,
                0xE555: 0x85CF,
                0xE556: 0x85B9,
                0xE557: 0x85D0,
                0xE558: 0x85D5,
                0xE559: 0x85DD,
                0xE55A: 0x85E5,
                0xE55B: 0x85DC,
                0xE55C: 0x85F9,
                0xE55D: 0x860A,
                0xE55E: 0x8613,
                0xE55F: 0x860B,
                0xE560: 0x85FE,
                0xE561: 0x85FA,
                0xE562: 0x8606,
                0xE563: 0x8622,
                0xE564: 0x861A,
                0xE565: 0x8630,
                0xE566: 0x863F,
                0xE567: 0x864D,
                0xE568: 0x4E55,
                0xE569: 0x8654,
                0xE56A: 0x865F,
                0xE56B: 0x8667,
                0xE56C: 0x8671,
                0xE56D: 0x8693,
                0xE56E: 0x86A3,
                0xE56F: 0x86A9,
                0xE570: 0x86AA,
                0xE571: 0x868B,
                0xE572: 0x868C,
                0xE573: 0x86B6,
                0xE574: 0x86AF,
                0xE575: 0x86C4,
                0xE576: 0x86C6,
                0xE577: 0x86B0,
                0xE578: 0x86C9,
                0xE579: 0x8823,
                0xE57A: 0x86AB,
                0xE57B: 0x86D4,
                0xE57C: 0x86DE,
                0xE57D: 0x86E9,
                0xE57E: 0x86EC,
                0xE580: 0x86DF,
                0xE581: 0x86DB,
                0xE582: 0x86EF,
                0xE583: 0x8712,
                0xE584: 0x8706,
                0xE585: 0x8708,
                0xE586: 0x8700,
                0xE587: 0x8703,
                0xE588: 0x86FB,
                0xE589: 0x8711,
                0xE58A: 0x8709,
                0xE58B: 0x870D,
                0xE58C: 0x86F9,
                0xE58D: 0x870A,
                0xE58E: 0x8734,
                0xE58F: 0x873F,
                0xE590: 0x8737,
                0xE591: 0x873B,
                0xE592: 0x8725,
                0xE593: 0x8729,
                0xE594: 0x871A,
                0xE595: 0x8760,
                0xE596: 0x875F,
                0xE597: 0x8778,
                0xE598: 0x874C,
                0xE599: 0x874E,
                0xE59A: 0x8774,
                0xE59B: 0x8757,
                0xE59C: 0x8768,
                0xE59D: 0x876E,
                0xE59E: 0x8759,
                0xE59F: 0x8753,
                0xE5A0: 0x8763,
                0xE5A1: 0x876A,
                0xE5A2: 0x8805,
                0xE5A3: 0x87A2,
                0xE5A4: 0x879F,
                0xE5A5: 0x8782,
                0xE5A6: 0x87AF,
                0xE5A7: 0x87CB,
                0xE5A8: 0x87BD,
                0xE5A9: 0x87C0,
                0xE5AA: 0x87D0,
                0xE5AB: 0x96D6,
                0xE5AC: 0x87AB,
                0xE5AD: 0x87C4,
                0xE5AE: 0x87B3,
                0xE5AF: 0x87C7,
                0xE5B0: 0x87C6,
                0xE5B1: 0x87BB,
                0xE5B2: 0x87EF,
                0xE5B3: 0x87F2,
                0xE5B4: 0x87E0,
                0xE5B5: 0x880F,
                0xE5B6: 0x880D,
                0xE5B7: 0x87FE,
                0xE5B8: 0x87F6,
                0xE5B9: 0x87F7,
                0xE5BA: 0x880E,
                0xE5BB: 0x87D2,
                0xE5BC: 0x8811,
                0xE5BD: 0x8816,
                0xE5BE: 0x8815,
                0xE5BF: 0x8822,
                0xE5C0: 0x8821,
                0xE5C1: 0x8831,
                0xE5C2: 0x8836,
                0xE5C3: 0x8839,
                0xE5C4: 0x8827,
                0xE5C5: 0x883B,
                0xE5C6: 0x8844,
                0xE5C7: 0x8842,
                0xE5C8: 0x8852,
                0xE5C9: 0x8859,
                0xE5CA: 0x885E,
                0xE5CB: 0x8862,
                0xE5CC: 0x886B,
                0xE5CD: 0x8881,
                0xE5CE: 0x887E,
                0xE5CF: 0x889E,
                0xE5D0: 0x8875,
                0xE5D1: 0x887D,
                0xE5D2: 0x88B5,
                0xE5D3: 0x8872,
                0xE5D4: 0x8882,
                0xE5D5: 0x8897,
                0xE5D6: 0x8892,
                0xE5D7: 0x88AE,
                0xE5D8: 0x8899,
                0xE5D9: 0x88A2,
                0xE5DA: 0x888D,
                0xE5DB: 0x88A4,
                0xE5DC: 0x88B0,
                0xE5DD: 0x88BF,
                0xE5DE: 0x88B1,
                0xE5DF: 0x88C3,
                0xE5E0: 0x88C4,
                0xE5E1: 0x88D4,
                0xE5E2: 0x88D8,
                0xE5E3: 0x88D9,
                0xE5E4: 0x88DD,
                0xE5E5: 0x88F9,
                0xE5E6: 0x8902,
                0xE5E7: 0x88FC,
                0xE5E8: 0x88F4,
                0xE5E9: 0x88E8,
                0xE5EA: 0x88F2,
                0xE5EB: 0x8904,
                0xE5EC: 0x890C,
                0xE5ED: 0x890A,
                0xE5EE: 0x8913,
                0xE5EF: 0x8943,
                0xE5F0: 0x891E,
                0xE5F1: 0x8925,
                0xE5F2: 0x892A,
                0xE5F3: 0x892B,
                0xE5F4: 0x8941,
                0xE5F5: 0x8944,
                0xE5F6: 0x893B,
                0xE5F7: 0x8936,
                0xE5F8: 0x8938,
                0xE5F9: 0x894C,
                0xE5FA: 0x891D,
                0xE5FB: 0x8960,
                0xE5FC: 0x895E,
                0xE640: 0x8966,
                0xE641: 0x8964,
                0xE642: 0x896D,
                0xE643: 0x896A,
                0xE644: 0x896F,
                0xE645: 0x8974,
                0xE646: 0x8977,
                0xE647: 0x897E,
                0xE648: 0x8983,
                0xE649: 0x8988,
                0xE64A: 0x898A,
                0xE64B: 0x8993,
                0xE64C: 0x8998,
                0xE64D: 0x89A1,
                0xE64E: 0x89A9,
                0xE64F: 0x89A6,
                0xE650: 0x89AC,
                0xE651: 0x89AF,
                0xE652: 0x89B2,
                0xE653: 0x89BA,
                0xE654: 0x89BD,
                0xE655: 0x89BF,
                0xE656: 0x89C0,
                0xE657: 0x89DA,
                0xE658: 0x89DC,
                0xE659: 0x89DD,
                0xE65A: 0x89E7,
                0xE65B: 0x89F4,
                0xE65C: 0x89F8,
                0xE65D: 0x8A03,
                0xE65E: 0x8A16,
                0xE65F: 0x8A10,
                0xE660: 0x8A0C,
                0xE661: 0x8A1B,
                0xE662: 0x8A1D,
                0xE663: 0x8A25,
                0xE664: 0x8A36,
                0xE665: 0x8A41,
                0xE666: 0x8A5B,
                0xE667: 0x8A52,
                0xE668: 0x8A46,
                0xE669: 0x8A48,
                0xE66A: 0x8A7C,
                0xE66B: 0x8A6D,
                0xE66C: 0x8A6C,
                0xE66D: 0x8A62,
                0xE66E: 0x8A85,
                0xE66F: 0x8A82,
                0xE670: 0x8A84,
                0xE671: 0x8AA8,
                0xE672: 0x8AA1,
                0xE673: 0x8A91,
                0xE674: 0x8AA5,
                0xE675: 0x8AA6,
                0xE676: 0x8A9A,
                0xE677: 0x8AA3,
                0xE678: 0x8AC4,
                0xE679: 0x8ACD,
                0xE67A: 0x8AC2,
                0xE67B: 0x8ADA,
                0xE67C: 0x8AEB,
                0xE67D: 0x8AF3,
                0xE67E: 0x8AE7,
                0xE680: 0x8AE4,
                0xE681: 0x8AF1,
                0xE682: 0x8B14,
                0xE683: 0x8AE0,
                0xE684: 0x8AE2,
                0xE685: 0x8AF7,
                0xE686: 0x8ADE,
                0xE687: 0x8ADB,
                0xE688: 0x8B0C,
                0xE689: 0x8B07,
                0xE68A: 0x8B1A,
                0xE68B: 0x8AE1,
                0xE68C: 0x8B16,
                0xE68D: 0x8B10,
                0xE68E: 0x8B17,
                0xE68F: 0x8B20,
                0xE690: 0x8B33,
                0xE691: 0x97AB,
                0xE692: 0x8B26,
                0xE693: 0x8B2B,
                0xE694: 0x8B3E,
                0xE695: 0x8B28,
                0xE696: 0x8B41,
                0xE697: 0x8B4C,
                0xE698: 0x8B4F,
                0xE699: 0x8B4E,
                0xE69A: 0x8B49,
                0xE69B: 0x8B56,
                0xE69C: 0x8B5B,
                0xE69D: 0x8B5A,
                0xE69E: 0x8B6B,
                0xE69F: 0x8B5F,
                0xE6A0: 0x8B6C,
                0xE6A1: 0x8B6F,
                0xE6A2: 0x8B74,
                0xE6A3: 0x8B7D,
                0xE6A4: 0x8B80,
                0xE6A5: 0x8B8C,
                0xE6A6: 0x8B8E,
                0xE6A7: 0x8B92,
                0xE6A8: 0x8B93,
                0xE6A9: 0x8B96,
                0xE6AA: 0x8B99,
                0xE6AB: 0x8B9A,
                0xE6AC: 0x8C3A,
                0xE6AD: 0x8C41,
                0xE6AE: 0x8C3F,
                0xE6AF: 0x8C48,
                0xE6B0: 0x8C4C,
                0xE6B1: 0x8C4E,
                0xE6B2: 0x8C50,
                0xE6B3: 0x8C55,
                0xE6B4: 0x8C62,
                0xE6B5: 0x8C6C,
                0xE6B6: 0x8C78,
                0xE6B7: 0x8C7A,
                0xE6B8: 0x8C82,
                0xE6B9: 0x8C89,
                0xE6BA: 0x8C85,
                0xE6BB: 0x8C8A,
                0xE6BC: 0x8C8D,
                0xE6BD: 0x8C8E,
                0xE6BE: 0x8C94,
                0xE6BF: 0x8C7C,
                0xE6C0: 0x8C98,
                0xE6C1: 0x621D,
                0xE6C2: 0x8CAD,
                0xE6C3: 0x8CAA,
                0xE6C4: 0x8CBD,
                0xE6C5: 0x8CB2,
                0xE6C6: 0x8CB3,
                0xE6C7: 0x8CAE,
                0xE6C8: 0x8CB6,
                0xE6C9: 0x8CC8,
                0xE6CA: 0x8CC1,
                0xE6CB: 0x8CE4,
                0xE6CC: 0x8CE3,
                0xE6CD: 0x8CDA,
                0xE6CE: 0x8CFD,
                0xE6CF: 0x8CFA,
                0xE6D0: 0x8CFB,
                0xE6D1: 0x8D04,
                0xE6D2: 0x8D05,
                0xE6D3: 0x8D0A,
                0xE6D4: 0x8D07,
                0xE6D5: 0x8D0F,
                0xE6D6: 0x8D0D,
                0xE6D7: 0x8D10,
                0xE6D8: 0x9F4E,
                0xE6D9: 0x8D13,
                0xE6DA: 0x8CCD,
                0xE6DB: 0x8D14,
                0xE6DC: 0x8D16,
                0xE6DD: 0x8D67,
                0xE6DE: 0x8D6D,
                0xE6DF: 0x8D71,
                0xE6E0: 0x8D73,
                0xE6E1: 0x8D81,
                0xE6E2: 0x8D99,
                0xE6E3: 0x8DC2,
                0xE6E4: 0x8DBE,
                0xE6E5: 0x8DBA,
                0xE6E6: 0x8DCF,
                0xE6E7: 0x8DDA,
                0xE6E8: 0x8DD6,
                0xE6E9: 0x8DCC,
                0xE6EA: 0x8DDB,
                0xE6EB: 0x8DCB,
                0xE6EC: 0x8DEA,
                0xE6ED: 0x8DEB,
                0xE6EE: 0x8DDF,
                0xE6EF: 0x8DE3,
                0xE6F0: 0x8DFC,
                0xE6F1: 0x8E08,
                0xE6F2: 0x8E09,
                0xE6F3: 0x8DFF,
                0xE6F4: 0x8E1D,
                0xE6F5: 0x8E1E,
                0xE6F6: 0x8E10,
                0xE6F7: 0x8E1F,
                0xE6F8: 0x8E42,
                0xE6F9: 0x8E35,
                0xE6FA: 0x8E30,
                0xE6FB: 0x8E34,
                0xE6FC: 0x8E4A,
                0xE740: 0x8E47,
                0xE741: 0x8E49,
                0xE742: 0x8E4C,
                0xE743: 0x8E50,
                0xE744: 0x8E48,
                0xE745: 0x8E59,
                0xE746: 0x8E64,
                0xE747: 0x8E60,
                0xE748: 0x8E2A,
                0xE749: 0x8E63,
                0xE74A: 0x8E55,
                0xE74B: 0x8E76,
                0xE74C: 0x8E72,
                0xE74D: 0x8E7C,
                0xE74E: 0x8E81,
                0xE74F: 0x8E87,
                0xE750: 0x8E85,
                0xE751: 0x8E84,
                0xE752: 0x8E8B,
                0xE753: 0x8E8A,
                0xE754: 0x8E93,
                0xE755: 0x8E91,
                0xE756: 0x8E94,
                0xE757: 0x8E99,
                0xE758: 0x8EAA,
                0xE759: 0x8EA1,
                0xE75A: 0x8EAC,
                0xE75B: 0x8EB0,
                0xE75C: 0x8EC6,
                0xE75D: 0x8EB1,
                0xE75E: 0x8EBE,
                0xE75F: 0x8EC5,
                0xE760: 0x8EC8,
                0xE761: 0x8ECB,
                0xE762: 0x8EDB,
                0xE763: 0x8EE3,
                0xE764: 0x8EFC,
                0xE765: 0x8EFB,
                0xE766: 0x8EEB,
                0xE767: 0x8EFE,
                0xE768: 0x8F0A,
                0xE769: 0x8F05,
                0xE76A: 0x8F15,
                0xE76B: 0x8F12,
                0xE76C: 0x8F19,
                0xE76D: 0x8F13,
                0xE76E: 0x8F1C,
                0xE76F: 0x8F1F,
                0xE770: 0x8F1B,
                0xE771: 0x8F0C,
                0xE772: 0x8F26,
                0xE773: 0x8F33,
                0xE774: 0x8F3B,
                0xE775: 0x8F39,
                0xE776: 0x8F45,
                0xE777: 0x8F42,
                0xE778: 0x8F3E,
                0xE779: 0x8F4C,
                0xE77A: 0x8F49,
                0xE77B: 0x8F46,
                0xE77C: 0x8F4E,
                0xE77D: 0x8F57,
                0xE77E: 0x8F5C,
                0xE780: 0x8F62,
                0xE781: 0x8F63,
                0xE782: 0x8F64,
                0xE783: 0x8F9C,
                0xE784: 0x8F9F,
                0xE785: 0x8FA3,
                0xE786: 0x8FAD,
                0xE787: 0x8FAF,
                0xE788: 0x8FB7,
                0xE789: 0x8FDA,
                0xE78A: 0x8FE5,
                0xE78B: 0x8FE2,
                0xE78C: 0x8FEA,
                0xE78D: 0x8FEF,
                0xE78E: 0x9087,
                0xE78F: 0x8FF4,
                0xE790: 0x9005,
                0xE791: 0x8FF9,
                0xE792: 0x8FFA,
                0xE793: 0x9011,
                0xE794: 0x9015,
                0xE795: 0x9021,
                0xE796: 0x900D,
                0xE797: 0x901E,
                0xE798: 0x9016,
                0xE799: 0x900B,
                0xE79A: 0x9027,
                0xE79B: 0x9036,
                0xE79C: 0x9035,
                0xE79D: 0x9039,
                0xE79E: 0x8FF8,
                0xE79F: 0x904F,
                0xE7A0: 0x9050,
                0xE7A1: 0x9051,
                0xE7A2: 0x9052,
                0xE7A3: 0x900E,
                0xE7A4: 0x9049,
                0xE7A5: 0x903E,
                0xE7A6: 0x9056,
                0xE7A7: 0x9058,
                0xE7A8: 0x905E,
                0xE7A9: 0x9068,
                0xE7AA: 0x906F,
                0xE7AB: 0x9076,
                0xE7AC: 0x96A8,
                0xE7AD: 0x9072,
                0xE7AE: 0x9082,
                0xE7AF: 0x907D,
                0xE7B0: 0x9081,
                0xE7B1: 0x9080,
                0xE7B2: 0x908A,
                0xE7B3: 0x9089,
                0xE7B4: 0x908F,
                0xE7B5: 0x90A8,
                0xE7B6: 0x90AF,
                0xE7B7: 0x90B1,
                0xE7B8: 0x90B5,
                0xE7B9: 0x90E2,
                0xE7BA: 0x90E4,
                0xE7BB: 0x6248,
                0xE7BC: 0x90DB,
                0xE7BD: 0x9102,
                0xE7BE: 0x9112,
                0xE7BF: 0x9119,
                0xE7C0: 0x9132,
                0xE7C1: 0x9130,
                0xE7C2: 0x914A,
                0xE7C3: 0x9156,
                0xE7C4: 0x9158,
                0xE7C5: 0x9163,
                0xE7C6: 0x9165,
                0xE7C7: 0x9169,
                0xE7C8: 0x9173,
                0xE7C9: 0x9172,
                0xE7CA: 0x918B,
                0xE7CB: 0x9189,
                0xE7CC: 0x9182,
                0xE7CD: 0x91A2,
                0xE7CE: 0x91AB,
                0xE7CF: 0x91AF,
                0xE7D0: 0x91AA,
                0xE7D1: 0x91B5,
                0xE7D2: 0x91B4,
                0xE7D3: 0x91BA,
                0xE7D4: 0x91C0,
                0xE7D5: 0x91C1,
                0xE7D6: 0x91C9,
                0xE7D7: 0x91CB,
                0xE7D8: 0x91D0,
                0xE7D9: 0x91D6,
                0xE7DA: 0x91DF,
                0xE7DB: 0x91E1,
                0xE7DC: 0x91DB,
                0xE7DD: 0x91FC,
                0xE7DE: 0x91F5,
                0xE7DF: 0x91F6,
                0xE7E0: 0x921E,
                0xE7E1: 0x91FF,
                0xE7E2: 0x9214,
                0xE7E3: 0x922C,
                0xE7E4: 0x9215,
                0xE7E5: 0x9211,
                0xE7E6: 0x925E,
                0xE7E7: 0x9257,
                0xE7E8: 0x9245,
                0xE7E9: 0x9249,
                0xE7EA: 0x9264,
                0xE7EB: 0x9248,
                0xE7EC: 0x9295,
                0xE7ED: 0x923F,
                0xE7EE: 0x924B,
                0xE7EF: 0x9250,
                0xE7F0: 0x929C,
                0xE7F1: 0x9296,
                0xE7F2: 0x9293,
                0xE7F3: 0x929B,
                0xE7F4: 0x925A,
                0xE7F5: 0x92CF,
                0xE7F6: 0x92B9,
                0xE7F7: 0x92B7,
                0xE7F8: 0x92E9,
                0xE7F9: 0x930F,
                0xE7FA: 0x92FA,
                0xE7FB: 0x9344,
                0xE7FC: 0x932E,
                0xE840: 0x9319,
                0xE841: 0x9322,
                0xE842: 0x931A,
                0xE843: 0x9323,
                0xE844: 0x933A,
                0xE845: 0x9335,
                0xE846: 0x933B,
                0xE847: 0x935C,
                0xE848: 0x9360,
                0xE849: 0x937C,
                0xE84A: 0x936E,
                0xE84B: 0x9356,
                0xE84C: 0x93B0,
                0xE84D: 0x93AC,
                0xE84E: 0x93AD,
                0xE84F: 0x9394,
                0xE850: 0x93B9,
                0xE851: 0x93D6,
                0xE852: 0x93D7,
                0xE853: 0x93E8,
                0xE854: 0x93E5,
                0xE855: 0x93D8,
                0xE856: 0x93C3,
                0xE857: 0x93DD,
                0xE858: 0x93D0,
                0xE859: 0x93C8,
                0xE85A: 0x93E4,
                0xE85B: 0x941A,
                0xE85C: 0x9414,
                0xE85D: 0x9413,
                0xE85E: 0x9403,
                0xE85F: 0x9407,
                0xE860: 0x9410,
                0xE861: 0x9436,
                0xE862: 0x942B,
                0xE863: 0x9435,
                0xE864: 0x9421,
                0xE865: 0x943A,
                0xE866: 0x9441,
                0xE867: 0x9452,
                0xE868: 0x9444,
                0xE869: 0x945B,
                0xE86A: 0x9460,
                0xE86B: 0x9462,
                0xE86C: 0x945E,
                0xE86D: 0x946A,
                0xE86E: 0x9229,
                0xE86F: 0x9470,
                0xE870: 0x9475,
                0xE871: 0x9477,
                0xE872: 0x947D,
                0xE873: 0x945A,
                0xE874: 0x947C,
                0xE875: 0x947E,
                0xE876: 0x9481,
                0xE877: 0x947F,
                0xE878: 0x9582,
                0xE879: 0x9587,
                0xE87A: 0x958A,
                0xE87B: 0x9594,
                0xE87C: 0x9596,
                0xE87D: 0x9598,
                0xE87E: 0x9599,
                0xE880: 0x95A0,
                0xE881: 0x95A8,
                0xE882: 0x95A7,
                0xE883: 0x95AD,
                0xE884: 0x95BC,
                0xE885: 0x95BB,
                0xE886: 0x95B9,
                0xE887: 0x95BE,
                0xE888: 0x95CA,
                0xE889: 0x6FF6,
                0xE88A: 0x95C3,
                0xE88B: 0x95CD,
                0xE88C: 0x95CC,
                0xE88D: 0x95D5,
                0xE88E: 0x95D4,
                0xE88F: 0x95D6,
                0xE890: 0x95DC,
                0xE891: 0x95E1,
                0xE892: 0x95E5,
                0xE893: 0x95E2,
                0xE894: 0x9621,
                0xE895: 0x9628,
                0xE896: 0x962E,
                0xE897: 0x962F,
                0xE898: 0x9642,
                0xE899: 0x964C,
                0xE89A: 0x964F,
                0xE89B: 0x964B,
                0xE89C: 0x9677,
                0xE89D: 0x965C,
                0xE89E: 0x965E,
                0xE89F: 0x965D,
                0xE8A0: 0x965F,
                0xE8A1: 0x9666,
                0xE8A2: 0x9672,
                0xE8A3: 0x966C,
                0xE8A4: 0x968D,
                0xE8A5: 0x9698,
                0xE8A6: 0x9695,
                0xE8A7: 0x9697,
                0xE8A8: 0x96AA,
                0xE8A9: 0x96A7,
                0xE8AA: 0x96B1,
                0xE8AB: 0x96B2,
                0xE8AC: 0x96B0,
                0xE8AD: 0x96B4,
                0xE8AE: 0x96B6,
                0xE8AF: 0x96B8,
                0xE8B0: 0x96B9,
                0xE8B1: 0x96CE,
                0xE8B2: 0x96CB,
                0xE8B3: 0x96C9,
                0xE8B4: 0x96CD,
                0xE8B5: 0x894D,
                0xE8B6: 0x96DC,
                0xE8B7: 0x970D,
                0xE8B8: 0x96D5,
                0xE8B9: 0x96F9,
                0xE8BA: 0x9704,
                0xE8BB: 0x9706,
                0xE8BC: 0x9708,
                0xE8BD: 0x9713,
                0xE8BE: 0x970E,
                0xE8BF: 0x9711,
                0xE8C0: 0x970F,
                0xE8C1: 0x9716,
                0xE8C2: 0x9719,
                0xE8C3: 0x9724,
                0xE8C4: 0x972A,
                0xE8C5: 0x9730,
                0xE8C6: 0x9739,
                0xE8C7: 0x973D,
                0xE8C8: 0x973E,
                0xE8C9: 0x9744,
                0xE8CA: 0x9746,
                0xE8CB: 0x9748,
                0xE8CC: 0x9742,
                0xE8CD: 0x9749,
                0xE8CE: 0x975C,
                0xE8CF: 0x9760,
                0xE8D0: 0x9764,
                0xE8D1: 0x9766,
                0xE8D2: 0x9768,
                0xE8D3: 0x52D2,
                0xE8D4: 0x976B,
                0xE8D5: 0x9771,
                0xE8D6: 0x9779,
                0xE8D7: 0x9785,
                0xE8D8: 0x977C,
                0xE8D9: 0x9781,
                0xE8DA: 0x977A,
                0xE8DB: 0x9786,
                0xE8DC: 0x978B,
                0xE8DD: 0x978F,
                0xE8DE: 0x9790,
                0xE8DF: 0x979C,
                0xE8E0: 0x97A8,
                0xE8E1: 0x97A6,
                0xE8E2: 0x97A3,
                0xE8E3: 0x97B3,
                0xE8E4: 0x97B4,
                0xE8E5: 0x97C3,
                0xE8E6: 0x97C6,
                0xE8E7: 0x97C8,
                0xE8E8: 0x97CB,
                0xE8E9: 0x97DC,
                0xE8EA: 0x97ED,
                0xE8EB: 0x9F4F,
                0xE8EC: 0x97F2,
                0xE8ED: 0x7ADF,
                0xE8EE: 0x97F6,
                0xE8EF: 0x97F5,
                0xE8F0: 0x980F,
                0xE8F1: 0x980C,
                0xE8F2: 0x9838,
                0xE8F3: 0x9824,
                0xE8F4: 0x9821,
                0xE8F5: 0x9837,
                0xE8F6: 0x983D,
                0xE8F7: 0x9846,
                0xE8F8: 0x984F,
                0xE8F9: 0x984B,
                0xE8FA: 0x986B,
                0xE8FB: 0x986F,
                0xE8FC: 0x9870,
                0xE940: 0x9871,
                0xE941: 0x9874,
                0xE942: 0x9873,
                0xE943: 0x98AA,
                0xE944: 0x98AF,
                0xE945: 0x98B1,
                0xE946: 0x98B6,
                0xE947: 0x98C4,
                0xE948: 0x98C3,
                0xE949: 0x98C6,
                0xE94A: 0x98E9,
                0xE94B: 0x98EB,
                0xE94C: 0x9903,
                0xE94D: 0x9909,
                0xE94E: 0x9912,
                0xE94F: 0x9914,
                0xE950: 0x9918,
                0xE951: 0x9921,
                0xE952: 0x991D,
                0xE953: 0x991E,
                0xE954: 0x9924,
                0xE955: 0x9920,
                0xE956: 0x992C,
                0xE957: 0x992E,
                0xE958: 0x993D,
                0xE959: 0x993E,
                0xE95A: 0x9942,
                0xE95B: 0x9949,
                0xE95C: 0x9945,
                0xE95D: 0x9950,
                0xE95E: 0x994B,
                0xE95F: 0x9951,
                0xE960: 0x9952,
                0xE961: 0x994C,
                0xE962: 0x9955,
                0xE963: 0x9997,
                0xE964: 0x9998,
                0xE965: 0x99A5,
                0xE966: 0x99AD,
                0xE967: 0x99AE,
                0xE968: 0x99BC,
                0xE969: 0x99DF,
                0xE96A: 0x99DB,
                0xE96B: 0x99DD,
                0xE96C: 0x99D8,
                0xE96D: 0x99D1,
                0xE96E: 0x99ED,
                0xE96F: 0x99EE,
                0xE970: 0x99F1,
                0xE971: 0x99F2,
                0xE972: 0x99FB,
                0xE973: 0x99F8,
                0xE974: 0x9A01,
                0xE975: 0x9A0F,
                0xE976: 0x9A05,
                0xE977: 0x99E2,
                0xE978: 0x9A19,
                0xE979: 0x9A2B,
                0xE97A: 0x9A37,
                0xE97B: 0x9A45,
                0xE97C: 0x9A42,
                0xE97D: 0x9A40,
                0xE97E: 0x9A43,
                0xE980: 0x9A3E,
                0xE981: 0x9A55,
                0xE982: 0x9A4D,
                0xE983: 0x9A5B,
                0xE984: 0x9A57,
                0xE985: 0x9A5F,
                0xE986: 0x9A62,
                0xE987: 0x9A65,
                0xE988: 0x9A64,
                0xE989: 0x9A69,
                0xE98A: 0x9A6B,
                0xE98B: 0x9A6A,
                0xE98C: 0x9AAD,
                0xE98D: 0x9AB0,
                0xE98E: 0x9ABC,
                0xE98F: 0x9AC0,
                0xE990: 0x9ACF,
                0xE991: 0x9AD1,
                0xE992: 0x9AD3,
                0xE993: 0x9AD4,
                0xE994: 0x9ADE,
                0xE995: 0x9ADF,
                0xE996: 0x9AE2,
                0xE997: 0x9AE3,
                0xE998: 0x9AE6,
                0xE999: 0x9AEF,
                0xE99A: 0x9AEB,
                0xE99B: 0x9AEE,
                0xE99C: 0x9AF4,
                0xE99D: 0x9AF1,
                0xE99E: 0x9AF7,
                0xE99F: 0x9AFB,
                0xE9A0: 0x9B06,
                0xE9A1: 0x9B18,
                0xE9A2: 0x9B1A,
                0xE9A3: 0x9B1F,
                0xE9A4: 0x9B22,
                0xE9A5: 0x9B23,
                0xE9A6: 0x9B25,
                0xE9A7: 0x9B27,
                0xE9A8: 0x9B28,
                0xE9A9: 0x9B29,
                0xE9AA: 0x9B2A,
                0xE9AB: 0x9B2E,
                0xE9AC: 0x9B2F,
                0xE9AD: 0x9B32,
                0xE9AE: 0x9B44,
                0xE9AF: 0x9B43,
                0xE9B0: 0x9B4F,
                0xE9B1: 0x9B4D,
                0xE9B2: 0x9B4E,
                0xE9B3: 0x9B51,
                0xE9B4: 0x9B58,
                0xE9B5: 0x9B74,
                0xE9B6: 0x9B93,
                0xE9B7: 0x9B83,
                0xE9B8: 0x9B91,
                0xE9B9: 0x9B96,
                0xE9BA: 0x9B97,
                0xE9BB: 0x9B9F,
                0xE9BC: 0x9BA0,
                0xE9BD: 0x9BA8,
                0xE9BE: 0x9BB4,
                0xE9BF: 0x9BC0,
                0xE9C0: 0x9BCA,
                0xE9C1: 0x9BB9,
                0xE9C2: 0x9BC6,
                0xE9C3: 0x9BCF,
                0xE9C4: 0x9BD1,
                0xE9C5: 0x9BD2,
                0xE9C6: 0x9BE3,
                0xE9C7: 0x9BE2,
                0xE9C8: 0x9BE4,
                0xE9C9: 0x9BD4,
                0xE9CA: 0x9BE1,
                0xE9CB: 0x9C3A,
                0xE9CC: 0x9BF2,
                0xE9CD: 0x9BF1,
                0xE9CE: 0x9BF0,
                0xE9CF: 0x9C15,
                0xE9D0: 0x9C14,
                0xE9D1: 0x9C09,
                0xE9D2: 0x9C13,
                0xE9D3: 0x9C0C,
                0xE9D4: 0x9C06,
                0xE9D5: 0x9C08,
                0xE9D6: 0x9C12,
                0xE9D7: 0x9C0A,
                0xE9D8: 0x9C04,
                0xE9D9: 0x9C2E,
                0xE9DA: 0x9C1B,
                0xE9DB: 0x9C25,
                0xE9DC: 0x9C24,
                0xE9DD: 0x9C21,
                0xE9DE: 0x9C30,
                0xE9DF: 0x9C47,
                0xE9E0: 0x9C32,
                0xE9E1: 0x9C46,
                0xE9E2: 0x9C3E,
                0xE9E3: 0x9C5A,
                0xE9E4: 0x9C60,
                0xE9E5: 0x9C67,
                0xE9E6: 0x9C76,
                0xE9E7: 0x9C78,
                0xE9E8: 0x9CE7,
                0xE9E9: 0x9CEC,
                0xE9EA: 0x9CF0,
                0xE9EB: 0x9D09,
                0xE9EC: 0x9D08,
                0xE9ED: 0x9CEB,
                0xE9EE: 0x9D03,
                0xE9EF: 0x9D06,
                0xE9F0: 0x9D2A,
                0xE9F1: 0x9D26,
                0xE9F2: 0x9DAF,
                0xE9F3: 0x9D23,
                0xE9F4: 0x9D1F,
                0xE9F5: 0x9D44,
                0xE9F6: 0x9D15,
                0xE9F7: 0x9D12,
                0xE9F8: 0x9D41,
                0xE9F9: 0x9D3F,
                0xE9FA: 0x9D3E,
                0xE9FB: 0x9D46,
                0xE9FC: 0x9D48,
                0xEA40: 0x9D5D,
                0xEA41: 0x9D5E,
                0xEA42: 0x9D64,
                0xEA43: 0x9D51,
                0xEA44: 0x9D50,
                0xEA45: 0x9D59,
                0xEA46: 0x9D72,
                0xEA47: 0x9D89,
                0xEA48: 0x9D87,
                0xEA49: 0x9DAB,
                0xEA4A: 0x9D6F,
                0xEA4B: 0x9D7A,
                0xEA4C: 0x9D9A,
                0xEA4D: 0x9DA4,
                0xEA4E: 0x9DA9,
                0xEA4F: 0x9DB2,
                0xEA50: 0x9DC4,
                0xEA51: 0x9DC1,
                0xEA52: 0x9DBB,
                0xEA53: 0x9DB8,
                0xEA54: 0x9DBA,
                0xEA55: 0x9DC6,
                0xEA56: 0x9DCF,
                0xEA57: 0x9DC2,
                0xEA58: 0x9DD9,
                0xEA59: 0x9DD3,
                0xEA5A: 0x9DF8,
                0xEA5B: 0x9DE6,
                0xEA5C: 0x9DED,
                0xEA5D: 0x9DEF,
                0xEA5E: 0x9DFD,
                0xEA5F: 0x9E1A,
                0xEA60: 0x9E1B,
                0xEA61: 0x9E1E,
                0xEA62: 0x9E75,
                0xEA63: 0x9E79,
                0xEA64: 0x9E7D,
                0xEA65: 0x9E81,
                0xEA66: 0x9E88,
                0xEA67: 0x9E8B,
                0xEA68: 0x9E8C,
                0xEA69: 0x9E92,
                0xEA6A: 0x9E95,
                0xEA6B: 0x9E91,
                0xEA6C: 0x9E9D,
                0xEA6D: 0x9EA5,
                0xEA6E: 0x9EA9,
                0xEA6F: 0x9EB8,
                0xEA70: 0x9EAA,
                0xEA71: 0x9EAD,
                0xEA72: 0x9761,
                0xEA73: 0x9ECC,
                0xEA74: 0x9ECE,
                0xEA75: 0x9ECF,
                0xEA76: 0x9ED0,
                0xEA77: 0x9ED4,
                0xEA78: 0x9EDC,
                0xEA79: 0x9EDE,
                0xEA7A: 0x9EDD,
                0xEA7B: 0x9EE0,
                0xEA7C: 0x9EE5,
                0xEA7D: 0x9EE8,
                0xEA7E: 0x9EEF,
                0xEA80: 0x9EF4,
                0xEA81: 0x9EF6,
                0xEA82: 0x9EF7,
                0xEA83: 0x9EF9,
                0xEA84: 0x9EFB,
                0xEA85: 0x9EFC,
                0xEA86: 0x9EFD,
                0xEA87: 0x9F07,
                0xEA88: 0x9F08,
                0xEA89: 0x76B7,
                0xEA8A: 0x9F15,
                0xEA8B: 0x9F21,
                0xEA8C: 0x9F2C,
                0xEA8D: 0x9F3E,
                0xEA8E: 0x9F4A,
                0xEA8F: 0x9F52,
                0xEA90: 0x9F54,
                0xEA91: 0x9F63,
                0xEA92: 0x9F5F,
                0xEA93: 0x9F60,
                0xEA94: 0x9F61,
                0xEA95: 0x9F66,
                0xEA96: 0x9F67,
                0xEA97: 0x9F6C,
                0xEA98: 0x9F6A,
                0xEA99: 0x9F77,
                0xEA9A: 0x9F72,
                0xEA9B: 0x9F76,
                0xEA9C: 0x9F95,
                0xEA9D: 0x9F9C,
                0xEA9E: 0x9FA0,
                0xEA9F: 0x582F,
                0xEAA0: 0x69C7,
                0xEAA1: 0x9059,
                0xEAA2: 0x7464,
                0xEAA3: 0x51DC,
                0xEAA4: 0x7199
            };
        /***/ },
        /* 9 */ /***/ function(module1, exports, __webpack_require__) {
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            var GenericGF_1 = __webpack_require__(1);
            var GenericGFPoly_1 = __webpack_require__(2);
            function runEuclideanAlgorithm(field, a, b, R) {
                var _a;
                // Assume a's degree is >= b's
                if (a.degree() < b.degree()) _a = [
                    b,
                    a
                ], a = _a[0], b = _a[1];
                var rLast = a;
                var r = b;
                var tLast = field.zero;
                var t = field.one;
                // Run Euclidean algorithm until r's degree is less than R/2
                while(r.degree() >= R / 2){
                    var rLastLast = rLast;
                    var tLastLast = tLast;
                    rLast = r;
                    tLast = t;
                    // Divide rLastLast by rLast, with quotient in q and remainder in r
                    if (rLast.isZero()) // Euclidean algorithm already terminated?
                    return null;
                    r = rLastLast;
                    var q = field.zero;
                    var denominatorLeadingTerm = rLast.getCoefficient(rLast.degree());
                    var dltInverse = field.inverse(denominatorLeadingTerm);
                    while(r.degree() >= rLast.degree() && !r.isZero()){
                        var degreeDiff = r.degree() - rLast.degree();
                        var scale = field.multiply(r.getCoefficient(r.degree()), dltInverse);
                        q = q.addOrSubtract(field.buildMonomial(degreeDiff, scale));
                        r = r.addOrSubtract(rLast.multiplyByMonomial(degreeDiff, scale));
                    }
                    t = q.multiplyPoly(tLast).addOrSubtract(tLastLast);
                    if (r.degree() >= rLast.degree()) return null;
                }
                var sigmaTildeAtZero = t.getCoefficient(0);
                if (sigmaTildeAtZero === 0) return null;
                var inverse = field.inverse(sigmaTildeAtZero);
                return [
                    t.multiply(inverse),
                    r.multiply(inverse)
                ];
            }
            function findErrorLocations(field, errorLocator) {
                // This is a direct application of Chien's search
                var numErrors = errorLocator.degree();
                if (numErrors === 1) return [
                    errorLocator.getCoefficient(1)
                ];
                var result = new Array(numErrors);
                var errorCount = 0;
                for(var i = 1; i < field.size && errorCount < numErrors; i++)if (errorLocator.evaluateAt(i) === 0) {
                    result[errorCount] = field.inverse(i);
                    errorCount++;
                }
                if (errorCount !== numErrors) return null;
                return result;
            }
            function findErrorMagnitudes(field, errorEvaluator, errorLocations) {
                // This is directly applying Forney's Formula
                var s = errorLocations.length;
                var result = new Array(s);
                for(var i = 0; i < s; i++){
                    var xiInverse = field.inverse(errorLocations[i]);
                    var denominator = 1;
                    for(var j = 0; j < s; j++)if (i !== j) denominator = field.multiply(denominator, GenericGF_1.addOrSubtractGF(1, field.multiply(errorLocations[j], xiInverse)));
                    result[i] = field.multiply(errorEvaluator.evaluateAt(xiInverse), field.inverse(denominator));
                    if (field.generatorBase !== 0) result[i] = field.multiply(result[i], xiInverse);
                }
                return result;
            }
            function decode(bytes, twoS) {
                var outputBytes = new Uint8ClampedArray(bytes.length);
                outputBytes.set(bytes);
                var field = new GenericGF_1.default(0x011D, 256, 0); // x^8 + x^4 + x^3 + x^2 + 1
                var poly = new GenericGFPoly_1.default(field, outputBytes);
                var syndromeCoefficients = new Uint8ClampedArray(twoS);
                var error = false;
                for(var s = 0; s < twoS; s++){
                    var evaluation = poly.evaluateAt(field.exp(s + field.generatorBase));
                    syndromeCoefficients[syndromeCoefficients.length - 1 - s] = evaluation;
                    if (evaluation !== 0) error = true;
                }
                if (!error) return outputBytes;
                var syndrome = new GenericGFPoly_1.default(field, syndromeCoefficients);
                var sigmaOmega = runEuclideanAlgorithm(field, field.buildMonomial(twoS, 1), syndrome, twoS);
                if (sigmaOmega === null) return null;
                var errorLocations = findErrorLocations(field, sigmaOmega[0]);
                if (errorLocations == null) return null;
                var errorMagnitudes = findErrorMagnitudes(field, sigmaOmega[1], errorLocations);
                for(var i = 0; i < errorLocations.length; i++){
                    var position = outputBytes.length - 1 - field.log(errorLocations[i]);
                    if (position < 0) return null;
                    outputBytes[position] = GenericGF_1.addOrSubtractGF(outputBytes[position], errorMagnitudes[i]);
                }
                return outputBytes;
            }
            exports.decode = decode;
        /***/ },
        /* 10 */ /***/ function(module1, exports, __webpack_require__) {
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            exports.VERSIONS = [
                {
                    infoBits: null,
                    versionNumber: 1,
                    alignmentPatternCenters: [],
                    errorCorrectionLevels: [
                        {
                            ecCodewordsPerBlock: 7,
                            ecBlocks: [
                                {
                                    numBlocks: 1,
                                    dataCodewordsPerBlock: 19
                                }
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 10,
                            ecBlocks: [
                                {
                                    numBlocks: 1,
                                    dataCodewordsPerBlock: 16
                                }
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 13,
                            ecBlocks: [
                                {
                                    numBlocks: 1,
                                    dataCodewordsPerBlock: 13
                                }
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 17,
                            ecBlocks: [
                                {
                                    numBlocks: 1,
                                    dataCodewordsPerBlock: 9
                                }
                            ]
                        }
                    ]
                },
                {
                    infoBits: null,
                    versionNumber: 2,
                    alignmentPatternCenters: [
                        6,
                        18
                    ],
                    errorCorrectionLevels: [
                        {
                            ecCodewordsPerBlock: 10,
                            ecBlocks: [
                                {
                                    numBlocks: 1,
                                    dataCodewordsPerBlock: 34
                                }
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 16,
                            ecBlocks: [
                                {
                                    numBlocks: 1,
                                    dataCodewordsPerBlock: 28
                                }
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 22,
                            ecBlocks: [
                                {
                                    numBlocks: 1,
                                    dataCodewordsPerBlock: 22
                                }
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 28,
                            ecBlocks: [
                                {
                                    numBlocks: 1,
                                    dataCodewordsPerBlock: 16
                                }
                            ]
                        }
                    ]
                },
                {
                    infoBits: null,
                    versionNumber: 3,
                    alignmentPatternCenters: [
                        6,
                        22
                    ],
                    errorCorrectionLevels: [
                        {
                            ecCodewordsPerBlock: 15,
                            ecBlocks: [
                                {
                                    numBlocks: 1,
                                    dataCodewordsPerBlock: 55
                                }
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 26,
                            ecBlocks: [
                                {
                                    numBlocks: 1,
                                    dataCodewordsPerBlock: 44
                                }
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 18,
                            ecBlocks: [
                                {
                                    numBlocks: 2,
                                    dataCodewordsPerBlock: 17
                                }
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 22,
                            ecBlocks: [
                                {
                                    numBlocks: 2,
                                    dataCodewordsPerBlock: 13
                                }
                            ]
                        }
                    ]
                },
                {
                    infoBits: null,
                    versionNumber: 4,
                    alignmentPatternCenters: [
                        6,
                        26
                    ],
                    errorCorrectionLevels: [
                        {
                            ecCodewordsPerBlock: 20,
                            ecBlocks: [
                                {
                                    numBlocks: 1,
                                    dataCodewordsPerBlock: 80
                                }
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 18,
                            ecBlocks: [
                                {
                                    numBlocks: 2,
                                    dataCodewordsPerBlock: 32
                                }
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 26,
                            ecBlocks: [
                                {
                                    numBlocks: 2,
                                    dataCodewordsPerBlock: 24
                                }
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 16,
                            ecBlocks: [
                                {
                                    numBlocks: 4,
                                    dataCodewordsPerBlock: 9
                                }
                            ]
                        }
                    ]
                },
                {
                    infoBits: null,
                    versionNumber: 5,
                    alignmentPatternCenters: [
                        6,
                        30
                    ],
                    errorCorrectionLevels: [
                        {
                            ecCodewordsPerBlock: 26,
                            ecBlocks: [
                                {
                                    numBlocks: 1,
                                    dataCodewordsPerBlock: 108
                                }
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 24,
                            ecBlocks: [
                                {
                                    numBlocks: 2,
                                    dataCodewordsPerBlock: 43
                                }
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 18,
                            ecBlocks: [
                                {
                                    numBlocks: 2,
                                    dataCodewordsPerBlock: 15
                                },
                                {
                                    numBlocks: 2,
                                    dataCodewordsPerBlock: 16
                                }
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 22,
                            ecBlocks: [
                                {
                                    numBlocks: 2,
                                    dataCodewordsPerBlock: 11
                                },
                                {
                                    numBlocks: 2,
                                    dataCodewordsPerBlock: 12
                                }
                            ]
                        }
                    ]
                },
                {
                    infoBits: null,
                    versionNumber: 6,
                    alignmentPatternCenters: [
                        6,
                        34
                    ],
                    errorCorrectionLevels: [
                        {
                            ecCodewordsPerBlock: 18,
                            ecBlocks: [
                                {
                                    numBlocks: 2,
                                    dataCodewordsPerBlock: 68
                                }
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 16,
                            ecBlocks: [
                                {
                                    numBlocks: 4,
                                    dataCodewordsPerBlock: 27
                                }
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 24,
                            ecBlocks: [
                                {
                                    numBlocks: 4,
                                    dataCodewordsPerBlock: 19
                                }
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 28,
                            ecBlocks: [
                                {
                                    numBlocks: 4,
                                    dataCodewordsPerBlock: 15
                                }
                            ]
                        }
                    ]
                },
                {
                    infoBits: 0x07C94,
                    versionNumber: 7,
                    alignmentPatternCenters: [
                        6,
                        22,
                        38
                    ],
                    errorCorrectionLevels: [
                        {
                            ecCodewordsPerBlock: 20,
                            ecBlocks: [
                                {
                                    numBlocks: 2,
                                    dataCodewordsPerBlock: 78
                                }
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 18,
                            ecBlocks: [
                                {
                                    numBlocks: 4,
                                    dataCodewordsPerBlock: 31
                                }
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 18,
                            ecBlocks: [
                                {
                                    numBlocks: 2,
                                    dataCodewordsPerBlock: 14
                                },
                                {
                                    numBlocks: 4,
                                    dataCodewordsPerBlock: 15
                                }
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 26,
                            ecBlocks: [
                                {
                                    numBlocks: 4,
                                    dataCodewordsPerBlock: 13
                                },
                                {
                                    numBlocks: 1,
                                    dataCodewordsPerBlock: 14
                                }
                            ]
                        }
                    ]
                },
                {
                    infoBits: 0x085BC,
                    versionNumber: 8,
                    alignmentPatternCenters: [
                        6,
                        24,
                        42
                    ],
                    errorCorrectionLevels: [
                        {
                            ecCodewordsPerBlock: 24,
                            ecBlocks: [
                                {
                                    numBlocks: 2,
                                    dataCodewordsPerBlock: 97
                                }
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 22,
                            ecBlocks: [
                                {
                                    numBlocks: 2,
                                    dataCodewordsPerBlock: 38
                                },
                                {
                                    numBlocks: 2,
                                    dataCodewordsPerBlock: 39
                                }
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 22,
                            ecBlocks: [
                                {
                                    numBlocks: 4,
                                    dataCodewordsPerBlock: 18
                                },
                                {
                                    numBlocks: 2,
                                    dataCodewordsPerBlock: 19
                                }
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 26,
                            ecBlocks: [
                                {
                                    numBlocks: 4,
                                    dataCodewordsPerBlock: 14
                                },
                                {
                                    numBlocks: 2,
                                    dataCodewordsPerBlock: 15
                                }
                            ]
                        }
                    ]
                },
                {
                    infoBits: 0x09A99,
                    versionNumber: 9,
                    alignmentPatternCenters: [
                        6,
                        26,
                        46
                    ],
                    errorCorrectionLevels: [
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 2,
                                    dataCodewordsPerBlock: 116
                                }
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 22,
                            ecBlocks: [
                                {
                                    numBlocks: 3,
                                    dataCodewordsPerBlock: 36
                                },
                                {
                                    numBlocks: 2,
                                    dataCodewordsPerBlock: 37
                                }
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 20,
                            ecBlocks: [
                                {
                                    numBlocks: 4,
                                    dataCodewordsPerBlock: 16
                                },
                                {
                                    numBlocks: 4,
                                    dataCodewordsPerBlock: 17
                                }
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 24,
                            ecBlocks: [
                                {
                                    numBlocks: 4,
                                    dataCodewordsPerBlock: 12
                                },
                                {
                                    numBlocks: 4,
                                    dataCodewordsPerBlock: 13
                                }
                            ]
                        }
                    ]
                },
                {
                    infoBits: 0x0A4D3,
                    versionNumber: 10,
                    alignmentPatternCenters: [
                        6,
                        28,
                        50
                    ],
                    errorCorrectionLevels: [
                        {
                            ecCodewordsPerBlock: 18,
                            ecBlocks: [
                                {
                                    numBlocks: 2,
                                    dataCodewordsPerBlock: 68
                                },
                                {
                                    numBlocks: 2,
                                    dataCodewordsPerBlock: 69
                                }
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 26,
                            ecBlocks: [
                                {
                                    numBlocks: 4,
                                    dataCodewordsPerBlock: 43
                                },
                                {
                                    numBlocks: 1,
                                    dataCodewordsPerBlock: 44
                                }
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 24,
                            ecBlocks: [
                                {
                                    numBlocks: 6,
                                    dataCodewordsPerBlock: 19
                                },
                                {
                                    numBlocks: 2,
                                    dataCodewordsPerBlock: 20
                                }
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 28,
                            ecBlocks: [
                                {
                                    numBlocks: 6,
                                    dataCodewordsPerBlock: 15
                                },
                                {
                                    numBlocks: 2,
                                    dataCodewordsPerBlock: 16
                                }
                            ]
                        }
                    ]
                },
                {
                    infoBits: 0x0BBF6,
                    versionNumber: 11,
                    alignmentPatternCenters: [
                        6,
                        30,
                        54
                    ],
                    errorCorrectionLevels: [
                        {
                            ecCodewordsPerBlock: 20,
                            ecBlocks: [
                                {
                                    numBlocks: 4,
                                    dataCodewordsPerBlock: 81
                                }
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 1,
                                    dataCodewordsPerBlock: 50
                                },
                                {
                                    numBlocks: 4,
                                    dataCodewordsPerBlock: 51
                                }
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 28,
                            ecBlocks: [
                                {
                                    numBlocks: 4,
                                    dataCodewordsPerBlock: 22
                                },
                                {
                                    numBlocks: 4,
                                    dataCodewordsPerBlock: 23
                                }
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 24,
                            ecBlocks: [
                                {
                                    numBlocks: 3,
                                    dataCodewordsPerBlock: 12
                                },
                                {
                                    numBlocks: 8,
                                    dataCodewordsPerBlock: 13
                                }
                            ]
                        }
                    ]
                },
                {
                    infoBits: 0x0C762,
                    versionNumber: 12,
                    alignmentPatternCenters: [
                        6,
                        32,
                        58
                    ],
                    errorCorrectionLevels: [
                        {
                            ecCodewordsPerBlock: 24,
                            ecBlocks: [
                                {
                                    numBlocks: 2,
                                    dataCodewordsPerBlock: 92
                                },
                                {
                                    numBlocks: 2,
                                    dataCodewordsPerBlock: 93
                                }
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 22,
                            ecBlocks: [
                                {
                                    numBlocks: 6,
                                    dataCodewordsPerBlock: 36
                                },
                                {
                                    numBlocks: 2,
                                    dataCodewordsPerBlock: 37
                                }
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 26,
                            ecBlocks: [
                                {
                                    numBlocks: 4,
                                    dataCodewordsPerBlock: 20
                                },
                                {
                                    numBlocks: 6,
                                    dataCodewordsPerBlock: 21
                                }
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 28,
                            ecBlocks: [
                                {
                                    numBlocks: 7,
                                    dataCodewordsPerBlock: 14
                                },
                                {
                                    numBlocks: 4,
                                    dataCodewordsPerBlock: 15
                                }
                            ]
                        }
                    ]
                },
                {
                    infoBits: 0x0D847,
                    versionNumber: 13,
                    alignmentPatternCenters: [
                        6,
                        34,
                        62
                    ],
                    errorCorrectionLevels: [
                        {
                            ecCodewordsPerBlock: 26,
                            ecBlocks: [
                                {
                                    numBlocks: 4,
                                    dataCodewordsPerBlock: 107
                                }
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 22,
                            ecBlocks: [
                                {
                                    numBlocks: 8,
                                    dataCodewordsPerBlock: 37
                                },
                                {
                                    numBlocks: 1,
                                    dataCodewordsPerBlock: 38
                                }
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 24,
                            ecBlocks: [
                                {
                                    numBlocks: 8,
                                    dataCodewordsPerBlock: 20
                                },
                                {
                                    numBlocks: 4,
                                    dataCodewordsPerBlock: 21
                                }
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 22,
                            ecBlocks: [
                                {
                                    numBlocks: 12,
                                    dataCodewordsPerBlock: 11
                                },
                                {
                                    numBlocks: 4,
                                    dataCodewordsPerBlock: 12
                                }
                            ]
                        }
                    ]
                },
                {
                    infoBits: 0x0E60D,
                    versionNumber: 14,
                    alignmentPatternCenters: [
                        6,
                        26,
                        46,
                        66
                    ],
                    errorCorrectionLevels: [
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 3,
                                    dataCodewordsPerBlock: 115
                                },
                                {
                                    numBlocks: 1,
                                    dataCodewordsPerBlock: 116
                                }
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 24,
                            ecBlocks: [
                                {
                                    numBlocks: 4,
                                    dataCodewordsPerBlock: 40
                                },
                                {
                                    numBlocks: 5,
                                    dataCodewordsPerBlock: 41
                                }
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 20,
                            ecBlocks: [
                                {
                                    numBlocks: 11,
                                    dataCodewordsPerBlock: 16
                                },
                                {
                                    numBlocks: 5,
                                    dataCodewordsPerBlock: 17
                                }
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 24,
                            ecBlocks: [
                                {
                                    numBlocks: 11,
                                    dataCodewordsPerBlock: 12
                                },
                                {
                                    numBlocks: 5,
                                    dataCodewordsPerBlock: 13
                                }
                            ]
                        }
                    ]
                },
                {
                    infoBits: 0x0F928,
                    versionNumber: 15,
                    alignmentPatternCenters: [
                        6,
                        26,
                        48,
                        70
                    ],
                    errorCorrectionLevels: [
                        {
                            ecCodewordsPerBlock: 22,
                            ecBlocks: [
                                {
                                    numBlocks: 5,
                                    dataCodewordsPerBlock: 87
                                },
                                {
                                    numBlocks: 1,
                                    dataCodewordsPerBlock: 88
                                }
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 24,
                            ecBlocks: [
                                {
                                    numBlocks: 5,
                                    dataCodewordsPerBlock: 41
                                },
                                {
                                    numBlocks: 5,
                                    dataCodewordsPerBlock: 42
                                }
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 5,
                                    dataCodewordsPerBlock: 24
                                },
                                {
                                    numBlocks: 7,
                                    dataCodewordsPerBlock: 25
                                }
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 24,
                            ecBlocks: [
                                {
                                    numBlocks: 11,
                                    dataCodewordsPerBlock: 12
                                },
                                {
                                    numBlocks: 7,
                                    dataCodewordsPerBlock: 13
                                }
                            ]
                        }
                    ]
                },
                {
                    infoBits: 0x10B78,
                    versionNumber: 16,
                    alignmentPatternCenters: [
                        6,
                        26,
                        50,
                        74
                    ],
                    errorCorrectionLevels: [
                        {
                            ecCodewordsPerBlock: 24,
                            ecBlocks: [
                                {
                                    numBlocks: 5,
                                    dataCodewordsPerBlock: 98
                                },
                                {
                                    numBlocks: 1,
                                    dataCodewordsPerBlock: 99
                                }
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 28,
                            ecBlocks: [
                                {
                                    numBlocks: 7,
                                    dataCodewordsPerBlock: 45
                                },
                                {
                                    numBlocks: 3,
                                    dataCodewordsPerBlock: 46
                                }
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 24,
                            ecBlocks: [
                                {
                                    numBlocks: 15,
                                    dataCodewordsPerBlock: 19
                                },
                                {
                                    numBlocks: 2,
                                    dataCodewordsPerBlock: 20
                                }
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 3,
                                    dataCodewordsPerBlock: 15
                                },
                                {
                                    numBlocks: 13,
                                    dataCodewordsPerBlock: 16
                                }
                            ]
                        }
                    ]
                },
                {
                    infoBits: 0x1145D,
                    versionNumber: 17,
                    alignmentPatternCenters: [
                        6,
                        30,
                        54,
                        78
                    ],
                    errorCorrectionLevels: [
                        {
                            ecCodewordsPerBlock: 28,
                            ecBlocks: [
                                {
                                    numBlocks: 1,
                                    dataCodewordsPerBlock: 107
                                },
                                {
                                    numBlocks: 5,
                                    dataCodewordsPerBlock: 108
                                }
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 28,
                            ecBlocks: [
                                {
                                    numBlocks: 10,
                                    dataCodewordsPerBlock: 46
                                },
                                {
                                    numBlocks: 1,
                                    dataCodewordsPerBlock: 47
                                }
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 28,
                            ecBlocks: [
                                {
                                    numBlocks: 1,
                                    dataCodewordsPerBlock: 22
                                },
                                {
                                    numBlocks: 15,
                                    dataCodewordsPerBlock: 23
                                }
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 28,
                            ecBlocks: [
                                {
                                    numBlocks: 2,
                                    dataCodewordsPerBlock: 14
                                },
                                {
                                    numBlocks: 17,
                                    dataCodewordsPerBlock: 15
                                }
                            ]
                        }
                    ]
                },
                {
                    infoBits: 0x12A17,
                    versionNumber: 18,
                    alignmentPatternCenters: [
                        6,
                        30,
                        56,
                        82
                    ],
                    errorCorrectionLevels: [
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 5,
                                    dataCodewordsPerBlock: 120
                                },
                                {
                                    numBlocks: 1,
                                    dataCodewordsPerBlock: 121
                                }
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 26,
                            ecBlocks: [
                                {
                                    numBlocks: 9,
                                    dataCodewordsPerBlock: 43
                                },
                                {
                                    numBlocks: 4,
                                    dataCodewordsPerBlock: 44
                                }
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 28,
                            ecBlocks: [
                                {
                                    numBlocks: 17,
                                    dataCodewordsPerBlock: 22
                                },
                                {
                                    numBlocks: 1,
                                    dataCodewordsPerBlock: 23
                                }
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 28,
                            ecBlocks: [
                                {
                                    numBlocks: 2,
                                    dataCodewordsPerBlock: 14
                                },
                                {
                                    numBlocks: 19,
                                    dataCodewordsPerBlock: 15
                                }
                            ]
                        }
                    ]
                },
                {
                    infoBits: 0x13532,
                    versionNumber: 19,
                    alignmentPatternCenters: [
                        6,
                        30,
                        58,
                        86
                    ],
                    errorCorrectionLevels: [
                        {
                            ecCodewordsPerBlock: 28,
                            ecBlocks: [
                                {
                                    numBlocks: 3,
                                    dataCodewordsPerBlock: 113
                                },
                                {
                                    numBlocks: 4,
                                    dataCodewordsPerBlock: 114
                                }
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 26,
                            ecBlocks: [
                                {
                                    numBlocks: 3,
                                    dataCodewordsPerBlock: 44
                                },
                                {
                                    numBlocks: 11,
                                    dataCodewordsPerBlock: 45
                                }
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 26,
                            ecBlocks: [
                                {
                                    numBlocks: 17,
                                    dataCodewordsPerBlock: 21
                                },
                                {
                                    numBlocks: 4,
                                    dataCodewordsPerBlock: 22
                                }
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 26,
                            ecBlocks: [
                                {
                                    numBlocks: 9,
                                    dataCodewordsPerBlock: 13
                                },
                                {
                                    numBlocks: 16,
                                    dataCodewordsPerBlock: 14
                                }
                            ]
                        }
                    ]
                },
                {
                    infoBits: 0x149A6,
                    versionNumber: 20,
                    alignmentPatternCenters: [
                        6,
                        34,
                        62,
                        90
                    ],
                    errorCorrectionLevels: [
                        {
                            ecCodewordsPerBlock: 28,
                            ecBlocks: [
                                {
                                    numBlocks: 3,
                                    dataCodewordsPerBlock: 107
                                },
                                {
                                    numBlocks: 5,
                                    dataCodewordsPerBlock: 108
                                }
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 26,
                            ecBlocks: [
                                {
                                    numBlocks: 3,
                                    dataCodewordsPerBlock: 41
                                },
                                {
                                    numBlocks: 13,
                                    dataCodewordsPerBlock: 42
                                }
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 15,
                                    dataCodewordsPerBlock: 24
                                },
                                {
                                    numBlocks: 5,
                                    dataCodewordsPerBlock: 25
                                }
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 28,
                            ecBlocks: [
                                {
                                    numBlocks: 15,
                                    dataCodewordsPerBlock: 15
                                },
                                {
                                    numBlocks: 10,
                                    dataCodewordsPerBlock: 16
                                }
                            ]
                        }
                    ]
                },
                {
                    infoBits: 0x15683,
                    versionNumber: 21,
                    alignmentPatternCenters: [
                        6,
                        28,
                        50,
                        72,
                        94
                    ],
                    errorCorrectionLevels: [
                        {
                            ecCodewordsPerBlock: 28,
                            ecBlocks: [
                                {
                                    numBlocks: 4,
                                    dataCodewordsPerBlock: 116
                                },
                                {
                                    numBlocks: 4,
                                    dataCodewordsPerBlock: 117
                                }
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 26,
                            ecBlocks: [
                                {
                                    numBlocks: 17,
                                    dataCodewordsPerBlock: 42
                                }
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 28,
                            ecBlocks: [
                                {
                                    numBlocks: 17,
                                    dataCodewordsPerBlock: 22
                                },
                                {
                                    numBlocks: 6,
                                    dataCodewordsPerBlock: 23
                                }
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 19,
                                    dataCodewordsPerBlock: 16
                                },
                                {
                                    numBlocks: 6,
                                    dataCodewordsPerBlock: 17
                                }
                            ]
                        }
                    ]
                },
                {
                    infoBits: 0x168C9,
                    versionNumber: 22,
                    alignmentPatternCenters: [
                        6,
                        26,
                        50,
                        74,
                        98
                    ],
                    errorCorrectionLevels: [
                        {
                            ecCodewordsPerBlock: 28,
                            ecBlocks: [
                                {
                                    numBlocks: 2,
                                    dataCodewordsPerBlock: 111
                                },
                                {
                                    numBlocks: 7,
                                    dataCodewordsPerBlock: 112
                                }
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 28,
                            ecBlocks: [
                                {
                                    numBlocks: 17,
                                    dataCodewordsPerBlock: 46
                                }
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 7,
                                    dataCodewordsPerBlock: 24
                                },
                                {
                                    numBlocks: 16,
                                    dataCodewordsPerBlock: 25
                                }
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 24,
                            ecBlocks: [
                                {
                                    numBlocks: 34,
                                    dataCodewordsPerBlock: 13
                                }
                            ]
                        }
                    ]
                },
                {
                    infoBits: 0x177EC,
                    versionNumber: 23,
                    alignmentPatternCenters: [
                        6,
                        30,
                        54,
                        74,
                        102
                    ],
                    errorCorrectionLevels: [
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 4,
                                    dataCodewordsPerBlock: 121
                                },
                                {
                                    numBlocks: 5,
                                    dataCodewordsPerBlock: 122
                                }
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 28,
                            ecBlocks: [
                                {
                                    numBlocks: 4,
                                    dataCodewordsPerBlock: 47
                                },
                                {
                                    numBlocks: 14,
                                    dataCodewordsPerBlock: 48
                                }
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 11,
                                    dataCodewordsPerBlock: 24
                                },
                                {
                                    numBlocks: 14,
                                    dataCodewordsPerBlock: 25
                                }
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 16,
                                    dataCodewordsPerBlock: 15
                                },
                                {
                                    numBlocks: 14,
                                    dataCodewordsPerBlock: 16
                                }
                            ]
                        }
                    ]
                },
                {
                    infoBits: 0x18EC4,
                    versionNumber: 24,
                    alignmentPatternCenters: [
                        6,
                        28,
                        54,
                        80,
                        106
                    ],
                    errorCorrectionLevels: [
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 6,
                                    dataCodewordsPerBlock: 117
                                },
                                {
                                    numBlocks: 4,
                                    dataCodewordsPerBlock: 118
                                }
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 28,
                            ecBlocks: [
                                {
                                    numBlocks: 6,
                                    dataCodewordsPerBlock: 45
                                },
                                {
                                    numBlocks: 14,
                                    dataCodewordsPerBlock: 46
                                }
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 11,
                                    dataCodewordsPerBlock: 24
                                },
                                {
                                    numBlocks: 16,
                                    dataCodewordsPerBlock: 25
                                }
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 30,
                                    dataCodewordsPerBlock: 16
                                },
                                {
                                    numBlocks: 2,
                                    dataCodewordsPerBlock: 17
                                }
                            ]
                        }
                    ]
                },
                {
                    infoBits: 0x191E1,
                    versionNumber: 25,
                    alignmentPatternCenters: [
                        6,
                        32,
                        58,
                        84,
                        110
                    ],
                    errorCorrectionLevels: [
                        {
                            ecCodewordsPerBlock: 26,
                            ecBlocks: [
                                {
                                    numBlocks: 8,
                                    dataCodewordsPerBlock: 106
                                },
                                {
                                    numBlocks: 4,
                                    dataCodewordsPerBlock: 107
                                }
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 28,
                            ecBlocks: [
                                {
                                    numBlocks: 8,
                                    dataCodewordsPerBlock: 47
                                },
                                {
                                    numBlocks: 13,
                                    dataCodewordsPerBlock: 48
                                }
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 7,
                                    dataCodewordsPerBlock: 24
                                },
                                {
                                    numBlocks: 22,
                                    dataCodewordsPerBlock: 25
                                }
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 22,
                                    dataCodewordsPerBlock: 15
                                },
                                {
                                    numBlocks: 13,
                                    dataCodewordsPerBlock: 16
                                }
                            ]
                        }
                    ]
                },
                {
                    infoBits: 0x1AFAB,
                    versionNumber: 26,
                    alignmentPatternCenters: [
                        6,
                        30,
                        58,
                        86,
                        114
                    ],
                    errorCorrectionLevels: [
                        {
                            ecCodewordsPerBlock: 28,
                            ecBlocks: [
                                {
                                    numBlocks: 10,
                                    dataCodewordsPerBlock: 114
                                },
                                {
                                    numBlocks: 2,
                                    dataCodewordsPerBlock: 115
                                }
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 28,
                            ecBlocks: [
                                {
                                    numBlocks: 19,
                                    dataCodewordsPerBlock: 46
                                },
                                {
                                    numBlocks: 4,
                                    dataCodewordsPerBlock: 47
                                }
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 28,
                            ecBlocks: [
                                {
                                    numBlocks: 28,
                                    dataCodewordsPerBlock: 22
                                },
                                {
                                    numBlocks: 6,
                                    dataCodewordsPerBlock: 23
                                }
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 33,
                                    dataCodewordsPerBlock: 16
                                },
                                {
                                    numBlocks: 4,
                                    dataCodewordsPerBlock: 17
                                }
                            ]
                        }
                    ]
                },
                {
                    infoBits: 0x1B08E,
                    versionNumber: 27,
                    alignmentPatternCenters: [
                        6,
                        34,
                        62,
                        90,
                        118
                    ],
                    errorCorrectionLevels: [
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 8,
                                    dataCodewordsPerBlock: 122
                                },
                                {
                                    numBlocks: 4,
                                    dataCodewordsPerBlock: 123
                                }
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 28,
                            ecBlocks: [
                                {
                                    numBlocks: 22,
                                    dataCodewordsPerBlock: 45
                                },
                                {
                                    numBlocks: 3,
                                    dataCodewordsPerBlock: 46
                                }
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 8,
                                    dataCodewordsPerBlock: 23
                                },
                                {
                                    numBlocks: 26,
                                    dataCodewordsPerBlock: 24
                                }
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 12,
                                    dataCodewordsPerBlock: 15
                                },
                                {
                                    numBlocks: 28,
                                    dataCodewordsPerBlock: 16
                                }
                            ]
                        }
                    ]
                },
                {
                    infoBits: 0x1CC1A,
                    versionNumber: 28,
                    alignmentPatternCenters: [
                        6,
                        26,
                        50,
                        74,
                        98,
                        122
                    ],
                    errorCorrectionLevels: [
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 3,
                                    dataCodewordsPerBlock: 117
                                },
                                {
                                    numBlocks: 10,
                                    dataCodewordsPerBlock: 118
                                }
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 28,
                            ecBlocks: [
                                {
                                    numBlocks: 3,
                                    dataCodewordsPerBlock: 45
                                },
                                {
                                    numBlocks: 23,
                                    dataCodewordsPerBlock: 46
                                }
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 4,
                                    dataCodewordsPerBlock: 24
                                },
                                {
                                    numBlocks: 31,
                                    dataCodewordsPerBlock: 25
                                }
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 11,
                                    dataCodewordsPerBlock: 15
                                },
                                {
                                    numBlocks: 31,
                                    dataCodewordsPerBlock: 16
                                }
                            ]
                        }
                    ]
                },
                {
                    infoBits: 0x1D33F,
                    versionNumber: 29,
                    alignmentPatternCenters: [
                        6,
                        30,
                        54,
                        78,
                        102,
                        126
                    ],
                    errorCorrectionLevels: [
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 7,
                                    dataCodewordsPerBlock: 116
                                },
                                {
                                    numBlocks: 7,
                                    dataCodewordsPerBlock: 117
                                }
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 28,
                            ecBlocks: [
                                {
                                    numBlocks: 21,
                                    dataCodewordsPerBlock: 45
                                },
                                {
                                    numBlocks: 7,
                                    dataCodewordsPerBlock: 46
                                }
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 1,
                                    dataCodewordsPerBlock: 23
                                },
                                {
                                    numBlocks: 37,
                                    dataCodewordsPerBlock: 24
                                }
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 19,
                                    dataCodewordsPerBlock: 15
                                },
                                {
                                    numBlocks: 26,
                                    dataCodewordsPerBlock: 16
                                }
                            ]
                        }
                    ]
                },
                {
                    infoBits: 0x1ED75,
                    versionNumber: 30,
                    alignmentPatternCenters: [
                        6,
                        26,
                        52,
                        78,
                        104,
                        130
                    ],
                    errorCorrectionLevels: [
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 5,
                                    dataCodewordsPerBlock: 115
                                },
                                {
                                    numBlocks: 10,
                                    dataCodewordsPerBlock: 116
                                }
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 28,
                            ecBlocks: [
                                {
                                    numBlocks: 19,
                                    dataCodewordsPerBlock: 47
                                },
                                {
                                    numBlocks: 10,
                                    dataCodewordsPerBlock: 48
                                }
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 15,
                                    dataCodewordsPerBlock: 24
                                },
                                {
                                    numBlocks: 25,
                                    dataCodewordsPerBlock: 25
                                }
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 23,
                                    dataCodewordsPerBlock: 15
                                },
                                {
                                    numBlocks: 25,
                                    dataCodewordsPerBlock: 16
                                }
                            ]
                        }
                    ]
                },
                {
                    infoBits: 0x1F250,
                    versionNumber: 31,
                    alignmentPatternCenters: [
                        6,
                        30,
                        56,
                        82,
                        108,
                        134
                    ],
                    errorCorrectionLevels: [
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 13,
                                    dataCodewordsPerBlock: 115
                                },
                                {
                                    numBlocks: 3,
                                    dataCodewordsPerBlock: 116
                                }
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 28,
                            ecBlocks: [
                                {
                                    numBlocks: 2,
                                    dataCodewordsPerBlock: 46
                                },
                                {
                                    numBlocks: 29,
                                    dataCodewordsPerBlock: 47
                                }
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 42,
                                    dataCodewordsPerBlock: 24
                                },
                                {
                                    numBlocks: 1,
                                    dataCodewordsPerBlock: 25
                                }
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 23,
                                    dataCodewordsPerBlock: 15
                                },
                                {
                                    numBlocks: 28,
                                    dataCodewordsPerBlock: 16
                                }
                            ]
                        }
                    ]
                },
                {
                    infoBits: 0x209D5,
                    versionNumber: 32,
                    alignmentPatternCenters: [
                        6,
                        34,
                        60,
                        86,
                        112,
                        138
                    ],
                    errorCorrectionLevels: [
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 17,
                                    dataCodewordsPerBlock: 115
                                }
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 28,
                            ecBlocks: [
                                {
                                    numBlocks: 10,
                                    dataCodewordsPerBlock: 46
                                },
                                {
                                    numBlocks: 23,
                                    dataCodewordsPerBlock: 47
                                }
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 10,
                                    dataCodewordsPerBlock: 24
                                },
                                {
                                    numBlocks: 35,
                                    dataCodewordsPerBlock: 25
                                }
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 19,
                                    dataCodewordsPerBlock: 15
                                },
                                {
                                    numBlocks: 35,
                                    dataCodewordsPerBlock: 16
                                }
                            ]
                        }
                    ]
                },
                {
                    infoBits: 0x216F0,
                    versionNumber: 33,
                    alignmentPatternCenters: [
                        6,
                        30,
                        58,
                        86,
                        114,
                        142
                    ],
                    errorCorrectionLevels: [
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 17,
                                    dataCodewordsPerBlock: 115
                                },
                                {
                                    numBlocks: 1,
                                    dataCodewordsPerBlock: 116
                                }
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 28,
                            ecBlocks: [
                                {
                                    numBlocks: 14,
                                    dataCodewordsPerBlock: 46
                                },
                                {
                                    numBlocks: 21,
                                    dataCodewordsPerBlock: 47
                                }
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 29,
                                    dataCodewordsPerBlock: 24
                                },
                                {
                                    numBlocks: 19,
                                    dataCodewordsPerBlock: 25
                                }
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 11,
                                    dataCodewordsPerBlock: 15
                                },
                                {
                                    numBlocks: 46,
                                    dataCodewordsPerBlock: 16
                                }
                            ]
                        }
                    ]
                },
                {
                    infoBits: 0x228BA,
                    versionNumber: 34,
                    alignmentPatternCenters: [
                        6,
                        34,
                        62,
                        90,
                        118,
                        146
                    ],
                    errorCorrectionLevels: [
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 13,
                                    dataCodewordsPerBlock: 115
                                },
                                {
                                    numBlocks: 6,
                                    dataCodewordsPerBlock: 116
                                }
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 28,
                            ecBlocks: [
                                {
                                    numBlocks: 14,
                                    dataCodewordsPerBlock: 46
                                },
                                {
                                    numBlocks: 23,
                                    dataCodewordsPerBlock: 47
                                }
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 44,
                                    dataCodewordsPerBlock: 24
                                },
                                {
                                    numBlocks: 7,
                                    dataCodewordsPerBlock: 25
                                }
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 59,
                                    dataCodewordsPerBlock: 16
                                },
                                {
                                    numBlocks: 1,
                                    dataCodewordsPerBlock: 17
                                }
                            ]
                        }
                    ]
                },
                {
                    infoBits: 0x2379F,
                    versionNumber: 35,
                    alignmentPatternCenters: [
                        6,
                        30,
                        54,
                        78,
                        102,
                        126,
                        150
                    ],
                    errorCorrectionLevels: [
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 12,
                                    dataCodewordsPerBlock: 121
                                },
                                {
                                    numBlocks: 7,
                                    dataCodewordsPerBlock: 122
                                }
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 28,
                            ecBlocks: [
                                {
                                    numBlocks: 12,
                                    dataCodewordsPerBlock: 47
                                },
                                {
                                    numBlocks: 26,
                                    dataCodewordsPerBlock: 48
                                }
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 39,
                                    dataCodewordsPerBlock: 24
                                },
                                {
                                    numBlocks: 14,
                                    dataCodewordsPerBlock: 25
                                }
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 22,
                                    dataCodewordsPerBlock: 15
                                },
                                {
                                    numBlocks: 41,
                                    dataCodewordsPerBlock: 16
                                }
                            ]
                        }
                    ]
                },
                {
                    infoBits: 0x24B0B,
                    versionNumber: 36,
                    alignmentPatternCenters: [
                        6,
                        24,
                        50,
                        76,
                        102,
                        128,
                        154
                    ],
                    errorCorrectionLevels: [
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 6,
                                    dataCodewordsPerBlock: 121
                                },
                                {
                                    numBlocks: 14,
                                    dataCodewordsPerBlock: 122
                                }
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 28,
                            ecBlocks: [
                                {
                                    numBlocks: 6,
                                    dataCodewordsPerBlock: 47
                                },
                                {
                                    numBlocks: 34,
                                    dataCodewordsPerBlock: 48
                                }
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 46,
                                    dataCodewordsPerBlock: 24
                                },
                                {
                                    numBlocks: 10,
                                    dataCodewordsPerBlock: 25
                                }
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 2,
                                    dataCodewordsPerBlock: 15
                                },
                                {
                                    numBlocks: 64,
                                    dataCodewordsPerBlock: 16
                                }
                            ]
                        }
                    ]
                },
                {
                    infoBits: 0x2542E,
                    versionNumber: 37,
                    alignmentPatternCenters: [
                        6,
                        28,
                        54,
                        80,
                        106,
                        132,
                        158
                    ],
                    errorCorrectionLevels: [
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 17,
                                    dataCodewordsPerBlock: 122
                                },
                                {
                                    numBlocks: 4,
                                    dataCodewordsPerBlock: 123
                                }
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 28,
                            ecBlocks: [
                                {
                                    numBlocks: 29,
                                    dataCodewordsPerBlock: 46
                                },
                                {
                                    numBlocks: 14,
                                    dataCodewordsPerBlock: 47
                                }
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 49,
                                    dataCodewordsPerBlock: 24
                                },
                                {
                                    numBlocks: 10,
                                    dataCodewordsPerBlock: 25
                                }
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 24,
                                    dataCodewordsPerBlock: 15
                                },
                                {
                                    numBlocks: 46,
                                    dataCodewordsPerBlock: 16
                                }
                            ]
                        }
                    ]
                },
                {
                    infoBits: 0x26A64,
                    versionNumber: 38,
                    alignmentPatternCenters: [
                        6,
                        32,
                        58,
                        84,
                        110,
                        136,
                        162
                    ],
                    errorCorrectionLevels: [
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 4,
                                    dataCodewordsPerBlock: 122
                                },
                                {
                                    numBlocks: 18,
                                    dataCodewordsPerBlock: 123
                                }
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 28,
                            ecBlocks: [
                                {
                                    numBlocks: 13,
                                    dataCodewordsPerBlock: 46
                                },
                                {
                                    numBlocks: 32,
                                    dataCodewordsPerBlock: 47
                                }
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 48,
                                    dataCodewordsPerBlock: 24
                                },
                                {
                                    numBlocks: 14,
                                    dataCodewordsPerBlock: 25
                                }
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 42,
                                    dataCodewordsPerBlock: 15
                                },
                                {
                                    numBlocks: 32,
                                    dataCodewordsPerBlock: 16
                                }
                            ]
                        }
                    ]
                },
                {
                    infoBits: 0x27541,
                    versionNumber: 39,
                    alignmentPatternCenters: [
                        6,
                        26,
                        54,
                        82,
                        110,
                        138,
                        166
                    ],
                    errorCorrectionLevels: [
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 20,
                                    dataCodewordsPerBlock: 117
                                },
                                {
                                    numBlocks: 4,
                                    dataCodewordsPerBlock: 118
                                }
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 28,
                            ecBlocks: [
                                {
                                    numBlocks: 40,
                                    dataCodewordsPerBlock: 47
                                },
                                {
                                    numBlocks: 7,
                                    dataCodewordsPerBlock: 48
                                }
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 43,
                                    dataCodewordsPerBlock: 24
                                },
                                {
                                    numBlocks: 22,
                                    dataCodewordsPerBlock: 25
                                }
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 10,
                                    dataCodewordsPerBlock: 15
                                },
                                {
                                    numBlocks: 67,
                                    dataCodewordsPerBlock: 16
                                }
                            ]
                        }
                    ]
                },
                {
                    infoBits: 0x28C69,
                    versionNumber: 40,
                    alignmentPatternCenters: [
                        6,
                        30,
                        58,
                        86,
                        114,
                        142,
                        170
                    ],
                    errorCorrectionLevels: [
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 19,
                                    dataCodewordsPerBlock: 118
                                },
                                {
                                    numBlocks: 6,
                                    dataCodewordsPerBlock: 119
                                }
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 28,
                            ecBlocks: [
                                {
                                    numBlocks: 18,
                                    dataCodewordsPerBlock: 47
                                },
                                {
                                    numBlocks: 31,
                                    dataCodewordsPerBlock: 48
                                }
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 34,
                                    dataCodewordsPerBlock: 24
                                },
                                {
                                    numBlocks: 34,
                                    dataCodewordsPerBlock: 25
                                }
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 20,
                                    dataCodewordsPerBlock: 15
                                },
                                {
                                    numBlocks: 61,
                                    dataCodewordsPerBlock: 16
                                }
                            ]
                        }
                    ]
                }
            ];
        /***/ },
        /* 11 */ /***/ function(module1, exports, __webpack_require__) {
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            var BitMatrix_1 = __webpack_require__(0);
            function squareToQuadrilateral(p1, p2, p3, p4) {
                var dx3 = p1.x - p2.x + p3.x - p4.x;
                var dy3 = p1.y - p2.y + p3.y - p4.y;
                if (dx3 === 0 && dy3 === 0) return {
                    a11: p2.x - p1.x,
                    a12: p2.y - p1.y,
                    a13: 0,
                    a21: p3.x - p2.x,
                    a22: p3.y - p2.y,
                    a23: 0,
                    a31: p1.x,
                    a32: p1.y,
                    a33: 1
                };
                else {
                    var dx1 = p2.x - p3.x;
                    var dx2 = p4.x - p3.x;
                    var dy1 = p2.y - p3.y;
                    var dy2 = p4.y - p3.y;
                    var denominator = dx1 * dy2 - dx2 * dy1;
                    var a13 = (dx3 * dy2 - dx2 * dy3) / denominator;
                    var a23 = (dx1 * dy3 - dx3 * dy1) / denominator;
                    return {
                        a11: p2.x - p1.x + a13 * p2.x,
                        a12: p2.y - p1.y + a13 * p2.y,
                        a13: a13,
                        a21: p4.x - p1.x + a23 * p4.x,
                        a22: p4.y - p1.y + a23 * p4.y,
                        a23: a23,
                        a31: p1.x,
                        a32: p1.y,
                        a33: 1
                    };
                }
            }
            function quadrilateralToSquare(p1, p2, p3, p4) {
                // Here, the adjoint serves as the inverse:
                var sToQ = squareToQuadrilateral(p1, p2, p3, p4);
                return {
                    a11: sToQ.a22 * sToQ.a33 - sToQ.a23 * sToQ.a32,
                    a12: sToQ.a13 * sToQ.a32 - sToQ.a12 * sToQ.a33,
                    a13: sToQ.a12 * sToQ.a23 - sToQ.a13 * sToQ.a22,
                    a21: sToQ.a23 * sToQ.a31 - sToQ.a21 * sToQ.a33,
                    a22: sToQ.a11 * sToQ.a33 - sToQ.a13 * sToQ.a31,
                    a23: sToQ.a13 * sToQ.a21 - sToQ.a11 * sToQ.a23,
                    a31: sToQ.a21 * sToQ.a32 - sToQ.a22 * sToQ.a31,
                    a32: sToQ.a12 * sToQ.a31 - sToQ.a11 * sToQ.a32,
                    a33: sToQ.a11 * sToQ.a22 - sToQ.a12 * sToQ.a21
                };
            }
            function times(a, b) {
                return {
                    a11: a.a11 * b.a11 + a.a21 * b.a12 + a.a31 * b.a13,
                    a12: a.a12 * b.a11 + a.a22 * b.a12 + a.a32 * b.a13,
                    a13: a.a13 * b.a11 + a.a23 * b.a12 + a.a33 * b.a13,
                    a21: a.a11 * b.a21 + a.a21 * b.a22 + a.a31 * b.a23,
                    a22: a.a12 * b.a21 + a.a22 * b.a22 + a.a32 * b.a23,
                    a23: a.a13 * b.a21 + a.a23 * b.a22 + a.a33 * b.a23,
                    a31: a.a11 * b.a31 + a.a21 * b.a32 + a.a31 * b.a33,
                    a32: a.a12 * b.a31 + a.a22 * b.a32 + a.a32 * b.a33,
                    a33: a.a13 * b.a31 + a.a23 * b.a32 + a.a33 * b.a33
                };
            }
            function extract(image, location) {
                var qToS = quadrilateralToSquare({
                    x: 3.5,
                    y: 3.5
                }, {
                    x: location.dimension - 3.5,
                    y: 3.5
                }, {
                    x: location.dimension - 6.5,
                    y: location.dimension - 6.5
                }, {
                    x: 3.5,
                    y: location.dimension - 3.5
                });
                var sToQ = squareToQuadrilateral(location.topLeft, location.topRight, location.alignmentPattern, location.bottomLeft);
                var transform = times(sToQ, qToS);
                var matrix = BitMatrix_1.BitMatrix.createEmpty(location.dimension, location.dimension);
                var mappingFunction = function mappingFunction(x, y) {
                    var denominator = transform.a13 * x + transform.a23 * y + transform.a33;
                    return {
                        x: (transform.a11 * x + transform.a21 * y + transform.a31) / denominator,
                        y: (transform.a12 * x + transform.a22 * y + transform.a32) / denominator
                    };
                };
                for(var y = 0; y < location.dimension; y++)for(var x = 0; x < location.dimension; x++){
                    var xValue = x + 0.5;
                    var yValue = y + 0.5;
                    var sourcePixel = mappingFunction(xValue, yValue);
                    matrix.set(x, y, image.get(Math.floor(sourcePixel.x), Math.floor(sourcePixel.y)));
                }
                return {
                    matrix: matrix,
                    mappingFunction: mappingFunction
                };
            }
            exports.extract = extract;
        /***/ },
        /* 12 */ /***/ function(module1, exports, __webpack_require__) {
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            var MAX_FINDERPATTERNS_TO_SEARCH = 4;
            var MIN_QUAD_RATIO = 0.5;
            var MAX_QUAD_RATIO = 1.5;
            var distance = function distance(a, b) {
                return Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2));
            };
            function sum(values) {
                return values.reduce(function(a, b) {
                    return a + b;
                });
            }
            // Takes three finder patterns and organizes them into topLeft, topRight, etc
            function reorderFinderPatterns(pattern1, pattern2, pattern3) {
                var _a, _b, _c, _d;
                // Find distances between pattern centers
                var oneTwoDistance = distance(pattern1, pattern2);
                var twoThreeDistance = distance(pattern2, pattern3);
                var oneThreeDistance = distance(pattern1, pattern3);
                var bottomLeft;
                var topLeft;
                var topRight;
                // Assume one closest to other two is B; A and C will just be guesses at first
                if (twoThreeDistance >= oneTwoDistance && twoThreeDistance >= oneThreeDistance) _a = [
                    pattern2,
                    pattern1,
                    pattern3
                ], bottomLeft = _a[0], topLeft = _a[1], topRight = _a[2];
                else if (oneThreeDistance >= twoThreeDistance && oneThreeDistance >= oneTwoDistance) _b = [
                    pattern1,
                    pattern2,
                    pattern3
                ], bottomLeft = _b[0], topLeft = _b[1], topRight = _b[2];
                else _c = [
                    pattern1,
                    pattern3,
                    pattern2
                ], bottomLeft = _c[0], topLeft = _c[1], topRight = _c[2];
                // Use cross product to figure out whether bottomLeft (A) and topRight (C) are correct or flipped in relation to topLeft (B)
                // This asks whether BC x BA has a positive z component, which is the arrangement we want. If it's negative, then
                // we've got it flipped around and should swap topRight and bottomLeft.
                if ((topRight.x - topLeft.x) * (bottomLeft.y - topLeft.y) - (topRight.y - topLeft.y) * (bottomLeft.x - topLeft.x) < 0) _d = [
                    topRight,
                    bottomLeft
                ], bottomLeft = _d[0], topRight = _d[1];
                return {
                    bottomLeft: bottomLeft,
                    topLeft: topLeft,
                    topRight: topRight
                };
            }
            // Computes the dimension (number of modules on a side) of the QR Code based on the position of the finder patterns
            function computeDimension(topLeft, topRight, bottomLeft, matrix) {
                var moduleSize = (sum(countBlackWhiteRun(topLeft, bottomLeft, matrix, 5)) / 7 + // Divide by 7 since the ratio is 1:1:3:1:1
                sum(countBlackWhiteRun(topLeft, topRight, matrix, 5)) / 7 + sum(countBlackWhiteRun(bottomLeft, topLeft, matrix, 5)) / 7 + sum(countBlackWhiteRun(topRight, topLeft, matrix, 5)) / 7) / 4;
                if (moduleSize < 1) throw new Error("Invalid module size");
                var topDimension = Math.round(distance(topLeft, topRight) / moduleSize);
                var sideDimension = Math.round(distance(topLeft, bottomLeft) / moduleSize);
                var dimension = Math.floor((topDimension + sideDimension) / 2) + 7;
                switch(dimension % 4){
                    case 0:
                        dimension++;
                        break;
                    case 2:
                        dimension--;
                        break;
                }
                return {
                    dimension: dimension,
                    moduleSize: moduleSize
                };
            }
            // Takes an origin point and an end point and counts the sizes of the black white run from the origin towards the end point.
            // Returns an array of elements, representing the pixel size of the black white run.
            // Uses a variant of http://en.wikipedia.org/wiki/Bresenham's_line_algorithm
            function countBlackWhiteRunTowardsPoint(origin, end, matrix, length) {
                var switchPoints = [
                    {
                        x: Math.floor(origin.x),
                        y: Math.floor(origin.y)
                    }
                ];
                var steep = Math.abs(end.y - origin.y) > Math.abs(end.x - origin.x);
                var fromX;
                var fromY;
                var toX;
                var toY;
                if (steep) {
                    fromX = Math.floor(origin.y);
                    fromY = Math.floor(origin.x);
                    toX = Math.floor(end.y);
                    toY = Math.floor(end.x);
                } else {
                    fromX = Math.floor(origin.x);
                    fromY = Math.floor(origin.y);
                    toX = Math.floor(end.x);
                    toY = Math.floor(end.y);
                }
                var dx = Math.abs(toX - fromX);
                var dy = Math.abs(toY - fromY);
                var error = Math.floor(-dx / 2);
                var xStep = fromX < toX ? 1 : -1;
                var yStep = fromY < toY ? 1 : -1;
                var currentPixel = true;
                // Loop up until x == toX, but not beyond
                for(var x = fromX, y = fromY; x !== toX + xStep; x += xStep){
                    // Does current pixel mean we have moved white to black or vice versa?
                    // Scanning black in state 0,2 and white in state 1, so if we find the wrong
                    // color, advance to next state or end if we are in state 2 already
                    var realX = steep ? y : x;
                    var realY = steep ? x : y;
                    if (matrix.get(realX, realY) !== currentPixel) {
                        currentPixel = !currentPixel;
                        switchPoints.push({
                            x: realX,
                            y: realY
                        });
                        if (switchPoints.length === length + 1) break;
                    }
                    error += dy;
                    if (error > 0) {
                        if (y === toY) break;
                        y += yStep;
                        error -= dx;
                    }
                }
                var distances = [];
                for(var i = 0; i < length; i++)if (switchPoints[i] && switchPoints[i + 1]) distances.push(distance(switchPoints[i], switchPoints[i + 1]));
                else distances.push(0);
                return distances;
            }
            // Takes an origin point and an end point and counts the sizes of the black white run in the origin point
            // along the line that intersects with the end point. Returns an array of elements, representing the pixel sizes
            // of the black white run. Takes a length which represents the number of switches from black to white to look for.
            function countBlackWhiteRun(origin, end, matrix, length) {
                var _a;
                var rise = end.y - origin.y;
                var run = end.x - origin.x;
                var towardsEnd = countBlackWhiteRunTowardsPoint(origin, end, matrix, Math.ceil(length / 2));
                var awayFromEnd = countBlackWhiteRunTowardsPoint(origin, {
                    x: origin.x - run,
                    y: origin.y - rise
                }, matrix, Math.ceil(length / 2));
                var middleValue = towardsEnd.shift() + awayFromEnd.shift() - 1; // Substract one so we don't double count a pixel
                return (_a = awayFromEnd.concat(middleValue)).concat.apply(_a, towardsEnd);
            }
            // Takes in a black white run and an array of expected ratios. Returns the average size of the run as well as the "error" -
            // that is the amount the run diverges from the expected ratio
            function scoreBlackWhiteRun(sequence, ratios) {
                var averageSize = sum(sequence) / sum(ratios);
                var error = 0;
                ratios.forEach(function(ratio, i) {
                    error += Math.pow(sequence[i] - ratio * averageSize, 2);
                });
                return {
                    averageSize: averageSize,
                    error: error
                };
            }
            // Takes an X,Y point and an array of sizes and scores the point against those ratios.
            // For example for a finder pattern takes the ratio list of 1:1:3:1:1 and checks horizontal, vertical and diagonal ratios
            // against that.
            function scorePattern(point, ratios, matrix) {
                try {
                    var horizontalRun = countBlackWhiteRun(point, {
                        x: -1,
                        y: point.y
                    }, matrix, ratios.length);
                    var verticalRun = countBlackWhiteRun(point, {
                        x: point.x,
                        y: -1
                    }, matrix, ratios.length);
                    var topLeftPoint = {
                        x: Math.max(0, point.x - point.y) - 1,
                        y: Math.max(0, point.y - point.x) - 1
                    };
                    var topLeftBottomRightRun = countBlackWhiteRun(point, topLeftPoint, matrix, ratios.length);
                    var bottomLeftPoint = {
                        x: Math.min(matrix.width, point.x + point.y) + 1,
                        y: Math.min(matrix.height, point.y + point.x) + 1
                    };
                    var bottomLeftTopRightRun = countBlackWhiteRun(point, bottomLeftPoint, matrix, ratios.length);
                    var horzError = scoreBlackWhiteRun(horizontalRun, ratios);
                    var vertError = scoreBlackWhiteRun(verticalRun, ratios);
                    var diagDownError = scoreBlackWhiteRun(topLeftBottomRightRun, ratios);
                    var diagUpError = scoreBlackWhiteRun(bottomLeftTopRightRun, ratios);
                    var ratioError = Math.sqrt(horzError.error * horzError.error + vertError.error * vertError.error + diagDownError.error * diagDownError.error + diagUpError.error * diagUpError.error);
                    var avgSize = (horzError.averageSize + vertError.averageSize + diagDownError.averageSize + diagUpError.averageSize) / 4;
                    var sizeError = (Math.pow(horzError.averageSize - avgSize, 2) + Math.pow(vertError.averageSize - avgSize, 2) + Math.pow(diagDownError.averageSize - avgSize, 2) + Math.pow(diagUpError.averageSize - avgSize, 2)) / avgSize;
                    return ratioError + sizeError;
                } catch (_a) {
                    return Infinity;
                }
            }
            function recenterLocation(matrix, p) {
                var leftX = Math.round(p.x);
                while(matrix.get(leftX, Math.round(p.y)))leftX--;
                var rightX = Math.round(p.x);
                while(matrix.get(rightX, Math.round(p.y)))rightX++;
                var x = (leftX + rightX) / 2;
                var topY = Math.round(p.y);
                while(matrix.get(Math.round(x), topY))topY--;
                var bottomY = Math.round(p.y);
                while(matrix.get(Math.round(x), bottomY))bottomY++;
                var y = (topY + bottomY) / 2;
                return {
                    x: x,
                    y: y
                };
            }
            function locate(matrix) {
                var finderPatternQuads = [];
                var activeFinderPatternQuads = [];
                var alignmentPatternQuads = [];
                var activeAlignmentPatternQuads = [];
                var _loop_1 = function _loop_1(y) {
                    var length_1 = 0;
                    var lastBit = false;
                    var scans = [
                        0,
                        0,
                        0,
                        0,
                        0
                    ];
                    var _loop_2 = function _loop_2(x) {
                        var v = matrix.get(x, y);
                        if (v === lastBit) length_1++;
                        else {
                            scans = [
                                scans[1],
                                scans[2],
                                scans[3],
                                scans[4],
                                length_1
                            ];
                            length_1 = 1;
                            lastBit = v;
                            // Do the last 5 color changes ~ match the expected ratio for a finder pattern? 1:1:3:1:1 of b:w:b:w:b
                            var averageFinderPatternBlocksize = sum(scans) / 7;
                            var validFinderPattern = Math.abs(scans[0] - averageFinderPatternBlocksize) < averageFinderPatternBlocksize && Math.abs(scans[1] - averageFinderPatternBlocksize) < averageFinderPatternBlocksize && Math.abs(scans[2] - 3 * averageFinderPatternBlocksize) < 3 * averageFinderPatternBlocksize && Math.abs(scans[3] - averageFinderPatternBlocksize) < averageFinderPatternBlocksize && Math.abs(scans[4] - averageFinderPatternBlocksize) < averageFinderPatternBlocksize && !v; // And make sure the current pixel is white since finder patterns are bordered in white
                            // Do the last 3 color changes ~ match the expected ratio for an alignment pattern? 1:1:1 of w:b:w
                            var averageAlignmentPatternBlocksize = sum(scans.slice(-3)) / 3;
                            var validAlignmentPattern = Math.abs(scans[2] - averageAlignmentPatternBlocksize) < averageAlignmentPatternBlocksize && Math.abs(scans[3] - averageAlignmentPatternBlocksize) < averageAlignmentPatternBlocksize && Math.abs(scans[4] - averageAlignmentPatternBlocksize) < averageAlignmentPatternBlocksize && v; // Is the current pixel black since alignment patterns are bordered in black
                            if (validFinderPattern) {
                                // Compute the start and end x values of the large center black square
                                var endX_1 = x - scans[3] - scans[4];
                                var startX_1 = endX_1 - scans[2];
                                var line = {
                                    startX: startX_1,
                                    endX: endX_1,
                                    y: y
                                };
                                // Is there a quad directly above the current spot? If so, extend it with the new line. Otherwise, create a new quad with
                                // that line as the starting point.
                                var matchingQuads = activeFinderPatternQuads.filter(function(q) {
                                    return startX_1 >= q.bottom.startX && startX_1 <= q.bottom.endX || endX_1 >= q.bottom.startX && startX_1 <= q.bottom.endX || startX_1 <= q.bottom.startX && endX_1 >= q.bottom.endX && scans[2] / (q.bottom.endX - q.bottom.startX) < MAX_QUAD_RATIO && scans[2] / (q.bottom.endX - q.bottom.startX) > MIN_QUAD_RATIO;
                                });
                                if (matchingQuads.length > 0) matchingQuads[0].bottom = line;
                                else activeFinderPatternQuads.push({
                                    top: line,
                                    bottom: line
                                });
                            }
                            if (validAlignmentPattern) {
                                // Compute the start and end x values of the center black square
                                var endX_2 = x - scans[4];
                                var startX_2 = endX_2 - scans[3];
                                var line = {
                                    startX: startX_2,
                                    y: y,
                                    endX: endX_2
                                };
                                // Is there a quad directly above the current spot? If so, extend it with the new line. Otherwise, create a new quad with
                                // that line as the starting point.
                                var matchingQuads = activeAlignmentPatternQuads.filter(function(q) {
                                    return startX_2 >= q.bottom.startX && startX_2 <= q.bottom.endX || endX_2 >= q.bottom.startX && startX_2 <= q.bottom.endX || startX_2 <= q.bottom.startX && endX_2 >= q.bottom.endX && scans[2] / (q.bottom.endX - q.bottom.startX) < MAX_QUAD_RATIO && scans[2] / (q.bottom.endX - q.bottom.startX) > MIN_QUAD_RATIO;
                                });
                                if (matchingQuads.length > 0) matchingQuads[0].bottom = line;
                                else activeAlignmentPatternQuads.push({
                                    top: line,
                                    bottom: line
                                });
                            }
                        }
                    };
                    for(var x = -1; x <= matrix.width; x++)_loop_2(x);
                    finderPatternQuads.push.apply(finderPatternQuads, activeFinderPatternQuads.filter(function(q) {
                        return q.bottom.y !== y && q.bottom.y - q.top.y >= 2;
                    }));
                    activeFinderPatternQuads = activeFinderPatternQuads.filter(function(q) {
                        return q.bottom.y === y;
                    });
                    alignmentPatternQuads.push.apply(alignmentPatternQuads, activeAlignmentPatternQuads.filter(function(q) {
                        return q.bottom.y !== y;
                    }));
                    activeAlignmentPatternQuads = activeAlignmentPatternQuads.filter(function(q) {
                        return q.bottom.y === y;
                    });
                };
                for(var y = 0; y <= matrix.height; y++)_loop_1(y);
                finderPatternQuads.push.apply(finderPatternQuads, activeFinderPatternQuads.filter(function(q) {
                    return q.bottom.y - q.top.y >= 2;
                }));
                alignmentPatternQuads.push.apply(alignmentPatternQuads, activeAlignmentPatternQuads);
                var finderPatternGroups = finderPatternQuads.filter(function(q) {
                    return q.bottom.y - q.top.y >= 2;
                }) // All quads must be at least 2px tall since the center square is larger than a block
                .map(function(q) {
                    var x = (q.top.startX + q.top.endX + q.bottom.startX + q.bottom.endX) / 4;
                    var y = (q.top.y + q.bottom.y + 1) / 2;
                    if (!matrix.get(Math.round(x), Math.round(y))) return;
                    var lengths = [
                        q.top.endX - q.top.startX,
                        q.bottom.endX - q.bottom.startX,
                        q.bottom.y - q.top.y + 1
                    ];
                    var size = sum(lengths) / lengths.length;
                    var score = scorePattern({
                        x: Math.round(x),
                        y: Math.round(y)
                    }, [
                        1,
                        1,
                        3,
                        1,
                        1
                    ], matrix);
                    return {
                        score: score,
                        x: x,
                        y: y,
                        size: size
                    };
                }).filter(function(q) {
                    return !!q;
                }) // Filter out any rejected quads from above
                .sort(function(a, b) {
                    return a.score - b.score;
                })// Now take the top finder pattern options and try to find 2 other options with a similar size.
                .map(function(point, i, finderPatterns) {
                    if (i > MAX_FINDERPATTERNS_TO_SEARCH) return null;
                    var otherPoints = finderPatterns.filter(function(p, ii) {
                        return i !== ii;
                    }).map(function(p) {
                        return {
                            x: p.x,
                            y: p.y,
                            score: p.score + Math.pow(p.size - point.size, 2) / point.size,
                            size: p.size
                        };
                    }).sort(function(a, b) {
                        return a.score - b.score;
                    });
                    if (otherPoints.length < 2) return null;
                    var score = point.score + otherPoints[0].score + otherPoints[1].score;
                    return {
                        points: [
                            point
                        ].concat(otherPoints.slice(0, 2)),
                        score: score
                    };
                }).filter(function(q) {
                    return !!q;
                }) // Filter out any rejected finder patterns from above
                .sort(function(a, b) {
                    return a.score - b.score;
                });
                if (finderPatternGroups.length === 0) return null;
                var _a = reorderFinderPatterns(finderPatternGroups[0].points[0], finderPatternGroups[0].points[1], finderPatternGroups[0].points[2]), topRight = _a.topRight, topLeft = _a.topLeft, bottomLeft = _a.bottomLeft;
                var alignment = findAlignmentPattern(matrix, alignmentPatternQuads, topRight, topLeft, bottomLeft);
                var result = [];
                if (alignment) result.push({
                    alignmentPattern: {
                        x: alignment.alignmentPattern.x,
                        y: alignment.alignmentPattern.y
                    },
                    bottomLeft: {
                        x: bottomLeft.x,
                        y: bottomLeft.y
                    },
                    dimension: alignment.dimension,
                    topLeft: {
                        x: topLeft.x,
                        y: topLeft.y
                    },
                    topRight: {
                        x: topRight.x,
                        y: topRight.y
                    }
                });
                // We normally use the center of the quads as the location of the tracking points, which is optimal for most cases and will account
                // for a skew in the image. However, In some cases, a slight skew might not be real and instead be caused by image compression
                // errors and/or low resolution. For those cases, we'd be better off centering the point exactly in the middle of the black area. We
                // compute and return the location data for the naively centered points as it is little additional work and allows for multiple
                // attempts at decoding harder images.
                var midTopRight = recenterLocation(matrix, topRight);
                var midTopLeft = recenterLocation(matrix, topLeft);
                var midBottomLeft = recenterLocation(matrix, bottomLeft);
                var centeredAlignment = findAlignmentPattern(matrix, alignmentPatternQuads, midTopRight, midTopLeft, midBottomLeft);
                if (centeredAlignment) result.push({
                    alignmentPattern: {
                        x: centeredAlignment.alignmentPattern.x,
                        y: centeredAlignment.alignmentPattern.y
                    },
                    bottomLeft: {
                        x: midBottomLeft.x,
                        y: midBottomLeft.y
                    },
                    topLeft: {
                        x: midTopLeft.x,
                        y: midTopLeft.y
                    },
                    topRight: {
                        x: midTopRight.x,
                        y: midTopRight.y
                    },
                    dimension: centeredAlignment.dimension
                });
                if (result.length === 0) return null;
                return result;
            }
            exports.locate = locate;
            function findAlignmentPattern(matrix, alignmentPatternQuads, topRight, topLeft, bottomLeft) {
                var _a;
                // Now that we've found the three finder patterns we can determine the blockSize and the size of the QR code.
                // We'll use these to help find the alignment pattern but also later when we do the extraction.
                var dimension;
                var moduleSize;
                try {
                    _a = computeDimension(topLeft, topRight, bottomLeft, matrix), dimension = _a.dimension, moduleSize = _a.moduleSize;
                } catch (e) {
                    return null;
                }
                // Now find the alignment pattern
                var bottomRightFinderPattern = {
                    x: topRight.x - topLeft.x + bottomLeft.x,
                    y: topRight.y - topLeft.y + bottomLeft.y
                };
                var modulesBetweenFinderPatterns = (distance(topLeft, bottomLeft) + distance(topLeft, topRight)) / 2 / moduleSize;
                var correctionToTopLeft = 1 - 3 / modulesBetweenFinderPatterns;
                var expectedAlignmentPattern = {
                    x: topLeft.x + correctionToTopLeft * (bottomRightFinderPattern.x - topLeft.x),
                    y: topLeft.y + correctionToTopLeft * (bottomRightFinderPattern.y - topLeft.y)
                };
                var alignmentPatterns = alignmentPatternQuads.map(function(q) {
                    var x = (q.top.startX + q.top.endX + q.bottom.startX + q.bottom.endX) / 4;
                    var y = (q.top.y + q.bottom.y + 1) / 2;
                    if (!matrix.get(Math.floor(x), Math.floor(y))) return;
                    var lengths = [
                        q.top.endX - q.top.startX,
                        q.bottom.endX - q.bottom.startX,
                        q.bottom.y - q.top.y + 1
                    ];
                    var size = sum(lengths) / lengths.length;
                    var sizeScore = scorePattern({
                        x: Math.floor(x),
                        y: Math.floor(y)
                    }, [
                        1,
                        1,
                        1
                    ], matrix);
                    var score = sizeScore + distance({
                        x: x,
                        y: y
                    }, expectedAlignmentPattern);
                    return {
                        x: x,
                        y: y,
                        score: score
                    };
                }).filter(function(v) {
                    return !!v;
                }).sort(function(a, b) {
                    return a.score - b.score;
                });
                // If there are less than 15 modules between finder patterns it's a version 1 QR code and as such has no alignmemnt pattern
                // so we can only use our best guess.
                var alignmentPattern = modulesBetweenFinderPatterns >= 15 && alignmentPatterns.length ? alignmentPatterns[0] : expectedAlignmentPattern;
                return {
                    alignmentPattern: alignmentPattern,
                    dimension: dimension
                };
            }
        /***/ }
    ])["default"];
});


var $2b0cc46421a6d3fe$var$video;
var $2b0cc46421a6d3fe$var$intv;
var $2b0cc46421a6d3fe$export$55e6c60a43cc74e2 = function stop_scan() {
    document.getElementById("qr-screen").style.display = "none";
};
var $2b0cc46421a6d3fe$export$be96fe42679d1b7e = function start_scan(callback) {
    document.getElementById("qr-screen").style.display = "block";
    console.log("start");
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
    if (navigator.getUserMedia) navigator.getUserMedia({
        audio: false,
        video: {
            width: 200,
            height: 200
        }
    }, function(stream) {
        $2b0cc46421a6d3fe$var$video = document.querySelector("video");
        $2b0cc46421a6d3fe$var$video.srcObject = stream;
        $2b0cc46421a6d3fe$var$video.onloadedmetadata = function(e) {
            $2b0cc46421a6d3fe$var$video.play();
            var barcodeCanvas = document.createElement("canvas");
            $2b0cc46421a6d3fe$var$intv = setInterval(function() {
                barcodeCanvas.width = $2b0cc46421a6d3fe$var$video.videoWidth;
                barcodeCanvas.height = $2b0cc46421a6d3fe$var$video.videoHeight;
                var barcodeContext = barcodeCanvas.getContext("2d");
                var imageWidth = Math.max(1, Math.floor($2b0cc46421a6d3fe$var$video.videoWidth)), imageHeight = Math.max(1, Math.floor($2b0cc46421a6d3fe$var$video.videoHeight));
                barcodeContext.drawImage($2b0cc46421a6d3fe$var$video, 0, 0, imageWidth, imageHeight);
                var imageData = barcodeContext.getImageData(0, 0, imageWidth, imageHeight);
                var idd = imageData.data;
                var code = (0, (/*@__PURE__*/$parcel$interopDefault($39e0152360893de3$exports)))(idd, imageWidth, imageHeight);
                if (code) {
                    callback(code.data);
                    $2b0cc46421a6d3fe$export$55e6c60a43cc74e2();
                    clearInterval($2b0cc46421a6d3fe$var$intv);
                }
            }, 1000);
        };
    }, function(err) {
        console.log("The following error occurred: " + err.name);
    });
    else console.log("getUserMedia not supported");
};


var $9fbe31c6ff058869$exports = {};

/*!
    localForage -- Offline Storage, Improved
    Version 1.10.0
    https://localforage.github.io/localForage
    (c) 2013-2017 Mozilla, Apache License 2.0
*/ (function(f) {
    var g;
    $9fbe31c6ff058869$exports = f();
})(function() {
    var define, module1, exports;
    return (function e(t, n, r) {
        function s(o, u) {
            if (!n[o]) {
                if (!t[o]) {
                    var a = undefined;
                    if (!u && a) return a(o, !0);
                    if (i) return i(o, !0);
                    var f = new Error("Cannot find module '" + o + "'");
                    throw f.code = "MODULE_NOT_FOUND", f;
                }
                var l = n[o] = {
                    exports: {}
                };
                t[o][0].call(l.exports, function(e) {
                    var _$n = t[o][1][e];
                    return s(_$n ? _$n : e);
                }, l, l.exports, e, t, n, r);
            }
            return n[o].exports;
        }
        var i = undefined;
        for(var o = 0; o < r.length; o++)s(r[o]);
        return s;
    })({
        1: [
            function(_dereq_, module1, exports) {
                (function(global1) {
                    "use strict";
                    var Mutation = global1.MutationObserver || global1.WebKitMutationObserver;
                    var scheduleDrain;
                    if (Mutation) {
                        var called = 0;
                        var observer = new Mutation(nextTick);
                        var element = global1.document.createTextNode("");
                        observer.observe(element, {
                            characterData: true
                        });
                        scheduleDrain = function scheduleDrain() {
                            element.data = called = ++called % 2;
                        };
                    } else if (!global1.setImmediate && typeof global1.MessageChannel !== "undefined") {
                        var channel = new global1.MessageChannel();
                        channel.port1.onmessage = nextTick;
                        scheduleDrain = function scheduleDrain() {
                            channel.port2.postMessage(0);
                        };
                    } else if ("document" in global1 && "onreadystatechange" in global1.document.createElement("script")) scheduleDrain = function scheduleDrain() {
                        // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
                        // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
                        var scriptEl = global1.document.createElement("script");
                        scriptEl.onreadystatechange = function() {
                            nextTick();
                            scriptEl.onreadystatechange = null;
                            scriptEl.parentNode.removeChild(scriptEl);
                            scriptEl = null;
                        };
                        global1.document.documentElement.appendChild(scriptEl);
                    };
                    else scheduleDrain = function scheduleDrain() {
                        setTimeout(nextTick, 0);
                    };
                    var draining;
                    var queue = [];
                    //named nextTick for less confusing stack traces
                    function nextTick() {
                        draining = true;
                        var i, oldQueue;
                        var len = queue.length;
                        while(len){
                            oldQueue = queue;
                            queue = [];
                            i = -1;
                            while(++i < len)oldQueue[i]();
                            len = queue.length;
                        }
                        draining = false;
                    }
                    module1.exports = immediate;
                    function immediate(task) {
                        if (queue.push(task) === 1 && !draining) scheduleDrain();
                    }
                }).call(this, typeof $parcel$global !== "undefined" ? $parcel$global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
            },
            {}
        ],
        2: [
            function(_dereq_, module1, exports) {
                "use strict";
                var immediate = _dereq_(1);
                /* istanbul ignore next */ function INTERNAL() {}
                var handlers = {};
                var REJECTED = [
                    "REJECTED"
                ];
                var FULFILLED = [
                    "FULFILLED"
                ];
                var PENDING = [
                    "PENDING"
                ];
                module1.exports = Promise1;
                function Promise1(resolver) {
                    if (typeof resolver !== "function") throw new TypeError("resolver must be a function");
                    this.state = PENDING;
                    this.queue = [];
                    this.outcome = void 0;
                    if (resolver !== INTERNAL) safelyResolveThenable(this, resolver);
                }
                Promise1.prototype["catch"] = function(onRejected) {
                    return this.then(null, onRejected);
                };
                Promise1.prototype.then = function(onFulfilled, onRejected) {
                    if (typeof onFulfilled !== "function" && this.state === FULFILLED || typeof onRejected !== "function" && this.state === REJECTED) return this;
                    var promise = new this.constructor(INTERNAL);
                    if (this.state !== PENDING) {
                        var resolver = this.state === FULFILLED ? onFulfilled : onRejected;
                        unwrap(promise, resolver, this.outcome);
                    } else this.queue.push(new QueueItem(promise, onFulfilled, onRejected));
                    return promise;
                };
                function QueueItem(promise, onFulfilled, onRejected) {
                    this.promise = promise;
                    if (typeof onFulfilled === "function") {
                        this.onFulfilled = onFulfilled;
                        this.callFulfilled = this.otherCallFulfilled;
                    }
                    if (typeof onRejected === "function") {
                        this.onRejected = onRejected;
                        this.callRejected = this.otherCallRejected;
                    }
                }
                QueueItem.prototype.callFulfilled = function(value) {
                    handlers.resolve(this.promise, value);
                };
                QueueItem.prototype.otherCallFulfilled = function(value) {
                    unwrap(this.promise, this.onFulfilled, value);
                };
                QueueItem.prototype.callRejected = function(value) {
                    handlers.reject(this.promise, value);
                };
                QueueItem.prototype.otherCallRejected = function(value) {
                    unwrap(this.promise, this.onRejected, value);
                };
                function unwrap(promise, func, value) {
                    immediate(function() {
                        var returnValue;
                        try {
                            returnValue = func(value);
                        } catch (e) {
                            return handlers.reject(promise, e);
                        }
                        if (returnValue === promise) handlers.reject(promise, new TypeError("Cannot resolve promise with itself"));
                        else handlers.resolve(promise, returnValue);
                    });
                }
                handlers.resolve = function(self1, value) {
                    var result = tryCatch(getThen, value);
                    if (result.status === "error") return handlers.reject(self1, result.value);
                    var thenable = result.value;
                    if (thenable) safelyResolveThenable(self1, thenable);
                    else {
                        self1.state = FULFILLED;
                        self1.outcome = value;
                        var i = -1;
                        var len = self1.queue.length;
                        while(++i < len)self1.queue[i].callFulfilled(value);
                    }
                    return self1;
                };
                handlers.reject = function(self1, error) {
                    self1.state = REJECTED;
                    self1.outcome = error;
                    var i = -1;
                    var len = self1.queue.length;
                    while(++i < len)self1.queue[i].callRejected(error);
                    return self1;
                };
                function getThen(obj) {
                    // Make sure we only access the accessor once as required by the spec
                    var then = obj && obj.then;
                    if (obj && (typeof obj === "object" || typeof obj === "function") && typeof then === "function") return function appyThen() {
                        then.apply(obj, arguments);
                    };
                }
                function safelyResolveThenable(self1, thenable) {
                    // Either fulfill, reject or reject with error
                    var called = false;
                    function onError(value) {
                        if (called) return;
                        called = true;
                        handlers.reject(self1, value);
                    }
                    function onSuccess(value) {
                        if (called) return;
                        called = true;
                        handlers.resolve(self1, value);
                    }
                    function tryToUnwrap() {
                        thenable(onSuccess, onError);
                    }
                    var result = tryCatch(tryToUnwrap);
                    if (result.status === "error") onError(result.value);
                }
                function tryCatch(func, value) {
                    var out = {};
                    try {
                        out.value = func(value);
                        out.status = "success";
                    } catch (e) {
                        out.status = "error";
                        out.value = e;
                    }
                    return out;
                }
                Promise1.resolve = resolve;
                function resolve(value) {
                    if (value instanceof this) return value;
                    return handlers.resolve(new this(INTERNAL), value);
                }
                Promise1.reject = reject;
                function reject(reason) {
                    var promise = new this(INTERNAL);
                    return handlers.reject(promise, reason);
                }
                Promise1.all = all;
                function all(iterable) {
                    var self1 = this;
                    if (Object.prototype.toString.call(iterable) !== "[object Array]") return this.reject(new TypeError("must be an array"));
                    var len = iterable.length;
                    var called = false;
                    if (!len) return this.resolve([]);
                    var values = new Array(len);
                    var resolved = 0;
                    var i = -1;
                    var promise = new this(INTERNAL);
                    while(++i < len)allResolver(iterable[i], i);
                    return promise;
                    function allResolver(value, i) {
                        self1.resolve(value).then(resolveFromAll, function(error) {
                            if (!called) {
                                called = true;
                                handlers.reject(promise, error);
                            }
                        });
                        function resolveFromAll(outValue) {
                            values[i] = outValue;
                            if (++resolved === len && !called) {
                                called = true;
                                handlers.resolve(promise, values);
                            }
                        }
                    }
                }
                Promise1.race = race;
                function race(iterable) {
                    var self1 = this;
                    if (Object.prototype.toString.call(iterable) !== "[object Array]") return this.reject(new TypeError("must be an array"));
                    var len = iterable.length;
                    var called = false;
                    if (!len) return this.resolve([]);
                    var i = -1;
                    var promise = new this(INTERNAL);
                    while(++i < len)resolver(iterable[i]);
                    return promise;
                    function resolver(value) {
                        self1.resolve(value).then(function(response) {
                            if (!called) {
                                called = true;
                                handlers.resolve(promise, response);
                            }
                        }, function(error) {
                            if (!called) {
                                called = true;
                                handlers.reject(promise, error);
                            }
                        });
                    }
                }
            },
            {
                "1": 1
            }
        ],
        3: [
            function(_dereq_, module1, exports) {
                (function(global1) {
                    "use strict";
                    if (typeof global1.Promise !== "function") global1.Promise = _dereq_(2);
                }).call(this, typeof $parcel$global !== "undefined" ? $parcel$global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
            },
            {
                "2": 2
            }
        ],
        4: [
            function(_dereq_, module1, exports) {
                "use strict";
                var _typeof = typeof Symbol === "function" && (0, $7bd6d9ddf4a378c5$export$5f0017c582d45a2d)(Symbol.iterator) === "symbol" ? function _typeof(obj) {
                    return typeof obj === "undefined" ? "undefined" : (0, $7bd6d9ddf4a378c5$export$5f0017c582d45a2d)(obj);
                } : function(obj) {
                    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : (0, $7bd6d9ddf4a378c5$export$5f0017c582d45a2d)(obj);
                };
                function _classCallCheck(instance, Constructor) {
                    if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
                }
                function getIDB() {
                    /* global indexedDB,webkitIndexedDB,mozIndexedDB,OIndexedDB,msIndexedDB */ try {
                        if (typeof indexedDB !== "undefined") return indexedDB;
                        if (typeof webkitIndexedDB !== "undefined") return webkitIndexedDB;
                        if (typeof mozIndexedDB !== "undefined") return mozIndexedDB;
                        if (typeof OIndexedDB !== "undefined") return OIndexedDB;
                        if (typeof msIndexedDB !== "undefined") return msIndexedDB;
                    } catch (e) {
                        return;
                    }
                }
                var idb = getIDB();
                function isIndexedDBValid() {
                    try {
                        // Initialize IndexedDB; fall back to vendor-prefixed versions
                        // if needed.
                        if (!idb || !idb.open) return false;
                        // We mimic PouchDB here;
                        //
                        // We test for openDatabase because IE Mobile identifies itself
                        // as Safari. Oh the lulz...
                        var isSafari = typeof openDatabase !== "undefined" && /(Safari|iPhone|iPad|iPod)/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent) && !/BlackBerry/.test(navigator.platform);
                        var hasFetch = typeof fetch === "function" && fetch.toString().indexOf("[native code") !== -1;
                        // Safari <10.1 does not meet our requirements for IDB support
                        // (see: https://github.com/pouchdb/pouchdb/issues/5572).
                        // Safari 10.1 shipped with fetch, we can use that to detect it.
                        // Note: this creates issues with `window.fetch` polyfills and
                        // overrides; see:
                        // https://github.com/localForage/localForage/issues/856
                        return (!isSafari || hasFetch) && typeof indexedDB !== "undefined" && // some outdated implementations of IDB that appear on Samsung
                        // and HTC Android devices <4.4 are missing IDBKeyRange
                        // See: https://github.com/mozilla/localForage/issues/128
                        // See: https://github.com/mozilla/localForage/issues/272
                        typeof IDBKeyRange !== "undefined";
                    } catch (e) {
                        return false;
                    }
                }
                // Abstracts constructing a Blob object, so it also works in older
                // browsers that don't support the native Blob constructor. (i.e.
                // old QtWebKit versions, at least).
                // Abstracts constructing a Blob object, so it also works in older
                // browsers that don't support the native Blob constructor. (i.e.
                // old QtWebKit versions, at least).
                function createBlob(parts, properties) {
                    /* global BlobBuilder,MSBlobBuilder,MozBlobBuilder,WebKitBlobBuilder */ parts = parts || [];
                    properties = properties || {};
                    try {
                        return new Blob(parts, properties);
                    } catch (e) {
                        if (e.name !== "TypeError") throw e;
                        var Builder = typeof BlobBuilder !== "undefined" ? BlobBuilder : typeof MSBlobBuilder !== "undefined" ? MSBlobBuilder : typeof MozBlobBuilder !== "undefined" ? MozBlobBuilder : WebKitBlobBuilder;
                        var builder = new Builder();
                        for(var i = 0; i < parts.length; i += 1)builder.append(parts[i]);
                        return builder.getBlob(properties.type);
                    }
                }
                // This is CommonJS because lie is an external dependency, so Rollup
                // can just ignore it.
                if (typeof Promise === "undefined") // In the "nopromises" build this will just throw if you don't have
                // a global promise object, but it would throw anyway later.
                _dereq_(3);
                var Promise$1 = Promise;
                function executeCallback(promise, callback) {
                    if (callback) promise.then(function(result) {
                        callback(null, result);
                    }, function(error) {
                        callback(error);
                    });
                }
                function executeTwoCallbacks(promise, callback, errorCallback) {
                    if (typeof callback === "function") promise.then(callback);
                    if (typeof errorCallback === "function") promise["catch"](errorCallback);
                }
                function normalizeKey(key) {
                    // Cast the key to a string, as that's all we can set as a key.
                    if (typeof key !== "string") {
                        console.warn(key + " used as a key, but it is not a string.");
                        key = String(key);
                    }
                    return key;
                }
                function getCallback() {
                    if (arguments.length && typeof arguments[arguments.length - 1] === "function") return arguments[arguments.length - 1];
                }
                // Some code originally from async_storage.js in
                // [Gaia](https://github.com/mozilla-b2g/gaia).
                var DETECT_BLOB_SUPPORT_STORE = "local-forage-detect-blob-support";
                var supportsBlobs = void 0;
                var dbContexts = {};
                var toString = Object.prototype.toString;
                // Transaction Modes
                var READ_ONLY = "readonly";
                var READ_WRITE = "readwrite";
                // Transform a binary string to an array buffer, because otherwise
                // weird stuff happens when you try to work with the binary string directly.
                // It is known.
                // From http://stackoverflow.com/questions/14967647/ (continues on next line)
                // encode-decode-image-with-base64-breaks-image (2013-04-21)
                function _binStringToArrayBuffer(bin) {
                    var _$length = bin.length;
                    var buf = new ArrayBuffer(_$length);
                    var arr = new Uint8Array(buf);
                    for(var i = 0; i < _$length; i++)arr[i] = bin.charCodeAt(i);
                    return buf;
                }
                //
                // Blobs are not supported in all versions of IndexedDB, notably
                // Chrome <37 and Android <5. In those versions, storing a blob will throw.
                //
                // Various other blob bugs exist in Chrome v37-42 (inclusive).
                // Detecting them is expensive and confusing to users, and Chrome 37-42
                // is at very low usage worldwide, so we do a hacky userAgent check instead.
                //
                // content-type bug: https://code.google.com/p/chromium/issues/detail?id=408120
                // 404 bug: https://code.google.com/p/chromium/issues/detail?id=447916
                // FileReader bug: https://code.google.com/p/chromium/issues/detail?id=447836
                //
                // Code borrowed from PouchDB. See:
                // https://github.com/pouchdb/pouchdb/blob/master/packages/node_modules/pouchdb-adapter-idb/src/blobSupport.js
                //
                function _checkBlobSupportWithoutCaching(idb) {
                    return new Promise$1(function(resolve) {
                        var txn = idb.transaction(DETECT_BLOB_SUPPORT_STORE, READ_WRITE);
                        var blob = createBlob([
                            ""
                        ]);
                        txn.objectStore(DETECT_BLOB_SUPPORT_STORE).put(blob, "key");
                        txn.onabort = function(e) {
                            // If the transaction aborts now its due to not being able to
                            // write to the database, likely due to the disk being full
                            e.preventDefault();
                            e.stopPropagation();
                            resolve(false);
                        };
                        txn.oncomplete = function() {
                            var matchedChrome = navigator.userAgent.match(/Chrome\/(\d+)/);
                            var matchedEdge = navigator.userAgent.match(/Edge\//);
                            // MS Edge pretends to be Chrome 42:
                            // https://msdn.microsoft.com/en-us/library/hh869301%28v=vs.85%29.aspx
                            resolve(matchedEdge || !matchedChrome || parseInt(matchedChrome[1], 10) >= 43);
                        };
                    })["catch"](function() {
                        return false; // error, so assume unsupported
                    });
                }
                function _checkBlobSupport(idb) {
                    if (typeof supportsBlobs === "boolean") return Promise$1.resolve(supportsBlobs);
                    return _checkBlobSupportWithoutCaching(idb).then(function(value) {
                        supportsBlobs = value;
                        return supportsBlobs;
                    });
                }
                function _deferReadiness(dbInfo) {
                    var dbContext = dbContexts[dbInfo.name];
                    // Create a deferred object representing the current database operation.
                    var deferredOperation = {};
                    deferredOperation.promise = new Promise$1(function(resolve, reject) {
                        deferredOperation.resolve = resolve;
                        deferredOperation.reject = reject;
                    });
                    // Enqueue the deferred operation.
                    dbContext.deferredOperations.push(deferredOperation);
                    // Chain its promise to the database readiness.
                    if (!dbContext.dbReady) dbContext.dbReady = deferredOperation.promise;
                    else dbContext.dbReady = dbContext.dbReady.then(function() {
                        return deferredOperation.promise;
                    });
                }
                function _advanceReadiness(dbInfo) {
                    var dbContext = dbContexts[dbInfo.name];
                    // Dequeue a deferred operation.
                    var deferredOperation = dbContext.deferredOperations.pop();
                    // Resolve its promise (which is part of the database readiness
                    // chain of promises).
                    if (deferredOperation) {
                        deferredOperation.resolve();
                        return deferredOperation.promise;
                    }
                }
                function _rejectReadiness(dbInfo, err) {
                    var dbContext = dbContexts[dbInfo.name];
                    // Dequeue a deferred operation.
                    var deferredOperation = dbContext.deferredOperations.pop();
                    // Reject its promise (which is part of the database readiness
                    // chain of promises).
                    if (deferredOperation) {
                        deferredOperation.reject(err);
                        return deferredOperation.promise;
                    }
                }
                function _getConnection(dbInfo, upgradeNeeded) {
                    return new Promise$1(function(resolve, reject) {
                        dbContexts[dbInfo.name] = dbContexts[dbInfo.name] || createDbContext();
                        if (dbInfo.db) {
                            if (upgradeNeeded) {
                                _deferReadiness(dbInfo);
                                dbInfo.db.close();
                            } else return resolve(dbInfo.db);
                        }
                        var dbArgs = [
                            dbInfo.name
                        ];
                        if (upgradeNeeded) dbArgs.push(dbInfo.version);
                        var openreq = idb.open.apply(idb, dbArgs);
                        if (upgradeNeeded) openreq.onupgradeneeded = function(e) {
                            var db = openreq.result;
                            try {
                                db.createObjectStore(dbInfo.storeName);
                                if (e.oldVersion <= 1) // Added when support for blob shims was added
                                db.createObjectStore(DETECT_BLOB_SUPPORT_STORE);
                            } catch (ex) {
                                if (ex.name === "ConstraintError") console.warn('The database "' + dbInfo.name + '"' + " has been upgraded from version " + e.oldVersion + " to version " + e.newVersion + ', but the storage "' + dbInfo.storeName + '" already exists.');
                                else throw ex;
                            }
                        };
                        openreq.onerror = function(e) {
                            e.preventDefault();
                            reject(openreq.error);
                        };
                        openreq.onsuccess = function() {
                            var db = openreq.result;
                            db.onversionchange = function(e) {
                                // Triggered when the database is modified (e.g. adding an objectStore) or
                                // deleted (even when initiated by other sessions in different tabs).
                                // Closing the connection here prevents those operations from being blocked.
                                // If the database is accessed again later by this instance, the connection
                                // will be reopened or the database recreated as needed.
                                e.target.close();
                            };
                            resolve(db);
                            _advanceReadiness(dbInfo);
                        };
                    });
                }
                function _getOriginalConnection(dbInfo) {
                    return _getConnection(dbInfo, false);
                }
                function _getUpgradedConnection(dbInfo) {
                    return _getConnection(dbInfo, true);
                }
                function _isUpgradeNeeded(dbInfo, defaultVersion) {
                    if (!dbInfo.db) return true;
                    var isNewStore = !dbInfo.db.objectStoreNames.contains(dbInfo.storeName);
                    var isDowngrade = dbInfo.version < dbInfo.db.version;
                    var isUpgrade = dbInfo.version > dbInfo.db.version;
                    if (isDowngrade) {
                        // If the version is not the default one
                        // then warn for impossible downgrade.
                        if (dbInfo.version !== defaultVersion) console.warn('The database "' + dbInfo.name + '"' + " can't be downgraded from version " + dbInfo.db.version + " to version " + dbInfo.version + ".");
                        // Align the versions to prevent errors.
                        dbInfo.version = dbInfo.db.version;
                    }
                    if (isUpgrade || isNewStore) {
                        // If the store is new then increment the version (if needed).
                        // This will trigger an "upgradeneeded" event which is required
                        // for creating a store.
                        if (isNewStore) {
                            var incVersion = dbInfo.db.version + 1;
                            if (incVersion > dbInfo.version) dbInfo.version = incVersion;
                        }
                        return true;
                    }
                    return false;
                }
                // encode a blob for indexeddb engines that don't support blobs
                function _encodeBlob(blob) {
                    return new Promise$1(function(resolve, reject) {
                        var reader = new FileReader();
                        reader.onerror = reject;
                        reader.onloadend = function(e) {
                            var base64 = btoa(e.target.result || "");
                            resolve({
                                __local_forage_encoded_blob: true,
                                data: base64,
                                type: blob.type
                            });
                        };
                        reader.readAsBinaryString(blob);
                    });
                }
                // decode an encoded blob
                function _decodeBlob(encodedBlob) {
                    var arrayBuff = _binStringToArrayBuffer(atob(encodedBlob.data));
                    return createBlob([
                        arrayBuff
                    ], {
                        type: encodedBlob.type
                    });
                }
                // is this one of our fancy encoded blobs?
                function _isEncodedBlob(value) {
                    return value && value.__local_forage_encoded_blob;
                }
                // Specialize the default `ready()` function by making it dependent
                // on the current database operations. Thus, the driver will be actually
                // ready when it's been initialized (default) *and* there are no pending
                // operations on the database (initiated by some other instances).
                function _fullyReady(callback) {
                    var self1 = this;
                    var promise = self1._initReady().then(function() {
                        var dbContext = dbContexts[self1._dbInfo.name];
                        if (dbContext && dbContext.dbReady) return dbContext.dbReady;
                    });
                    executeTwoCallbacks(promise, callback, callback);
                    return promise;
                }
                // Try to establish a new db connection to replace the
                // current one which is broken (i.e. experiencing
                // InvalidStateError while creating a transaction).
                function _tryReconnect(dbInfo) {
                    _deferReadiness(dbInfo);
                    var dbContext = dbContexts[dbInfo.name];
                    var forages = dbContext.forages;
                    for(var i = 0; i < forages.length; i++){
                        var forage = forages[i];
                        if (forage._dbInfo.db) {
                            forage._dbInfo.db.close();
                            forage._dbInfo.db = null;
                        }
                    }
                    dbInfo.db = null;
                    return _getOriginalConnection(dbInfo).then(function(db) {
                        dbInfo.db = db;
                        if (_isUpgradeNeeded(dbInfo)) // Reopen the database for upgrading.
                        return _getUpgradedConnection(dbInfo);
                        return db;
                    }).then(function(db) {
                        // store the latest db reference
                        // in case the db was upgraded
                        dbInfo.db = dbContext.db = db;
                        for(var i = 0; i < forages.length; i++)forages[i]._dbInfo.db = db;
                    })["catch"](function(err) {
                        _rejectReadiness(dbInfo, err);
                        throw err;
                    });
                }
                // FF doesn't like Promises (micro-tasks) and IDDB store operations,
                // so we have to do it with callbacks
                function createTransaction(dbInfo, mode, callback, retries) {
                    if (retries === undefined) retries = 1;
                    try {
                        var tx = dbInfo.db.transaction(dbInfo.storeName, mode);
                        callback(null, tx);
                    } catch (err) {
                        if (retries > 0 && (!dbInfo.db || err.name === "InvalidStateError" || err.name === "NotFoundError")) return Promise$1.resolve().then(function() {
                            if (!dbInfo.db || err.name === "NotFoundError" && !dbInfo.db.objectStoreNames.contains(dbInfo.storeName) && dbInfo.version <= dbInfo.db.version) {
                                // increase the db version, to create the new ObjectStore
                                if (dbInfo.db) dbInfo.version = dbInfo.db.version + 1;
                                // Reopen the database for upgrading.
                                return _getUpgradedConnection(dbInfo);
                            }
                        }).then(function() {
                            return _tryReconnect(dbInfo).then(function() {
                                createTransaction(dbInfo, mode, callback, retries - 1);
                            });
                        })["catch"](callback);
                        callback(err);
                    }
                }
                function createDbContext() {
                    return {
                        // Running localForages sharing a database.
                        forages: [],
                        // Shared database.
                        db: null,
                        // Database readiness (promise).
                        dbReady: null,
                        // Deferred operations on the database.
                        deferredOperations: []
                    };
                }
                // Open the IndexedDB database (automatically creates one if one didn't
                // previously exist), using any options set in the config.
                function _initStorage(options) {
                    var self1 = this;
                    var dbInfo = {
                        db: null
                    };
                    if (options) for(var i in options)dbInfo[i] = options[i];
                    // Get the current context of the database;
                    var dbContext = dbContexts[dbInfo.name];
                    // ...or create a new context.
                    if (!dbContext) {
                        dbContext = createDbContext();
                        // Register the new context in the global container.
                        dbContexts[dbInfo.name] = dbContext;
                    }
                    // Register itself as a running localForage in the current context.
                    dbContext.forages.push(self1);
                    // Replace the default `ready()` function with the specialized one.
                    if (!self1._initReady) {
                        self1._initReady = self1.ready;
                        self1.ready = _fullyReady;
                    }
                    // Create an array of initialization states of the related localForages.
                    var initPromises = [];
                    function ignoreErrors() {
                        // Don't handle errors here,
                        // just makes sure related localForages aren't pending.
                        return Promise$1.resolve();
                    }
                    for(var j = 0; j < dbContext.forages.length; j++){
                        var forage = dbContext.forages[j];
                        if (forage !== self1) // Don't wait for itself...
                        initPromises.push(forage._initReady()["catch"](ignoreErrors));
                    }
                    // Take a snapshot of the related localForages.
                    var forages = dbContext.forages.slice(0);
                    // Initialize the connection process only when
                    // all the related localForages aren't pending.
                    return Promise$1.all(initPromises).then(function() {
                        dbInfo.db = dbContext.db;
                        // Get the connection or open a new one without upgrade.
                        return _getOriginalConnection(dbInfo);
                    }).then(function(db) {
                        dbInfo.db = db;
                        if (_isUpgradeNeeded(dbInfo, self1._defaultConfig.version)) // Reopen the database for upgrading.
                        return _getUpgradedConnection(dbInfo);
                        return db;
                    }).then(function(db) {
                        dbInfo.db = dbContext.db = db;
                        self1._dbInfo = dbInfo;
                        // Share the final connection amongst related localForages.
                        for(var k = 0; k < forages.length; k++){
                            var forage = forages[k];
                            if (forage !== self1) {
                                // Self is already up-to-date.
                                forage._dbInfo.db = dbInfo.db;
                                forage._dbInfo.version = dbInfo.version;
                            }
                        }
                    });
                }
                function getItem(key, callback) {
                    var self1 = this;
                    key = normalizeKey(key);
                    var promise = new Promise$1(function(resolve, reject) {
                        self1.ready().then(function() {
                            createTransaction(self1._dbInfo, READ_ONLY, function(err, transaction) {
                                if (err) return reject(err);
                                try {
                                    var store = transaction.objectStore(self1._dbInfo.storeName);
                                    var req = store.get(key);
                                    req.onsuccess = function() {
                                        var value = req.result;
                                        if (value === undefined) value = null;
                                        if (_isEncodedBlob(value)) value = _decodeBlob(value);
                                        resolve(value);
                                    };
                                    req.onerror = function() {
                                        reject(req.error);
                                    };
                                } catch (e) {
                                    reject(e);
                                }
                            });
                        })["catch"](reject);
                    });
                    executeCallback(promise, callback);
                    return promise;
                }
                // Iterate over all items stored in database.
                function iterate(iterator, callback) {
                    var self1 = this;
                    var promise = new Promise$1(function(resolve, reject) {
                        self1.ready().then(function() {
                            createTransaction(self1._dbInfo, READ_ONLY, function(err, transaction) {
                                if (err) return reject(err);
                                try {
                                    var store = transaction.objectStore(self1._dbInfo.storeName);
                                    var req = store.openCursor();
                                    var iterationNumber = 1;
                                    req.onsuccess = function() {
                                        var cursor = req.result;
                                        if (cursor) {
                                            var value = cursor.value;
                                            if (_isEncodedBlob(value)) value = _decodeBlob(value);
                                            var result = iterator(value, cursor.key, iterationNumber++);
                                            // when the iterator callback returns any
                                            // (non-`undefined`) value, then we stop
                                            // the iteration immediately
                                            if (result !== void 0) resolve(result);
                                            else cursor["continue"]();
                                        } else resolve();
                                    };
                                    req.onerror = function() {
                                        reject(req.error);
                                    };
                                } catch (e) {
                                    reject(e);
                                }
                            });
                        })["catch"](reject);
                    });
                    executeCallback(promise, callback);
                    return promise;
                }
                function setItem(key, value, callback) {
                    var self1 = this;
                    key = normalizeKey(key);
                    var promise = new Promise$1(function(resolve, reject) {
                        var dbInfo;
                        self1.ready().then(function() {
                            dbInfo = self1._dbInfo;
                            if (toString.call(value) === "[object Blob]") return _checkBlobSupport(dbInfo.db).then(function(blobSupport) {
                                if (blobSupport) return value;
                                return _encodeBlob(value);
                            });
                            return value;
                        }).then(function(value) {
                            createTransaction(self1._dbInfo, READ_WRITE, function(err, transaction) {
                                if (err) return reject(err);
                                try {
                                    var store = transaction.objectStore(self1._dbInfo.storeName);
                                    // The reason we don't _save_ null is because IE 10 does
                                    // not support saving the `null` type in IndexedDB. How
                                    // ironic, given the bug below!
                                    // See: https://github.com/mozilla/localForage/issues/161
                                    if (value === null) value = undefined;
                                    var req = store.put(value, key);
                                    transaction.oncomplete = function() {
                                        // Cast to undefined so the value passed to
                                        // callback/promise is the same as what one would get out
                                        // of `getItem()` later. This leads to some weirdness
                                        // (setItem('foo', undefined) will return `null`), but
                                        // it's not my fault localStorage is our baseline and that
                                        // it's weird.
                                        if (value === undefined) value = null;
                                        resolve(value);
                                    };
                                    transaction.onabort = transaction.onerror = function() {
                                        var _$err = req.error ? req.error : req.transaction.error;
                                        reject(_$err);
                                    };
                                } catch (e) {
                                    reject(e);
                                }
                            });
                        })["catch"](reject);
                    });
                    executeCallback(promise, callback);
                    return promise;
                }
                function removeItem(key, callback) {
                    var self1 = this;
                    key = normalizeKey(key);
                    var promise = new Promise$1(function(resolve, reject) {
                        self1.ready().then(function() {
                            createTransaction(self1._dbInfo, READ_WRITE, function(err, transaction) {
                                if (err) return reject(err);
                                try {
                                    var store = transaction.objectStore(self1._dbInfo.storeName);
                                    // We use a Grunt task to make this safe for IE and some
                                    // versions of Android (including those used by Cordova).
                                    // Normally IE won't like `.delete()` and will insist on
                                    // using `['delete']()`, but we have a build step that
                                    // fixes this for us now.
                                    var req = store["delete"](key);
                                    transaction.oncomplete = function() {
                                        resolve();
                                    };
                                    transaction.onerror = function() {
                                        reject(req.error);
                                    };
                                    // The request will be also be aborted if we've exceeded our storage
                                    // space.
                                    transaction.onabort = function() {
                                        var _$err = req.error ? req.error : req.transaction.error;
                                        reject(_$err);
                                    };
                                } catch (e) {
                                    reject(e);
                                }
                            });
                        })["catch"](reject);
                    });
                    executeCallback(promise, callback);
                    return promise;
                }
                function clear(callback) {
                    var self1 = this;
                    var promise = new Promise$1(function(resolve, reject) {
                        self1.ready().then(function() {
                            createTransaction(self1._dbInfo, READ_WRITE, function(err, transaction) {
                                if (err) return reject(err);
                                try {
                                    var store = transaction.objectStore(self1._dbInfo.storeName);
                                    var req = store.clear();
                                    transaction.oncomplete = function() {
                                        resolve();
                                    };
                                    transaction.onabort = transaction.onerror = function() {
                                        var _$err = req.error ? req.error : req.transaction.error;
                                        reject(_$err);
                                    };
                                } catch (e) {
                                    reject(e);
                                }
                            });
                        })["catch"](reject);
                    });
                    executeCallback(promise, callback);
                    return promise;
                }
                function length(callback) {
                    var self1 = this;
                    var promise = new Promise$1(function(resolve, reject) {
                        self1.ready().then(function() {
                            createTransaction(self1._dbInfo, READ_ONLY, function(err, transaction) {
                                if (err) return reject(err);
                                try {
                                    var store = transaction.objectStore(self1._dbInfo.storeName);
                                    var req = store.count();
                                    req.onsuccess = function() {
                                        resolve(req.result);
                                    };
                                    req.onerror = function() {
                                        reject(req.error);
                                    };
                                } catch (e) {
                                    reject(e);
                                }
                            });
                        })["catch"](reject);
                    });
                    executeCallback(promise, callback);
                    return promise;
                }
                function key(n, callback) {
                    var self1 = this;
                    var promise = new Promise$1(function(resolve, reject) {
                        if (n < 0) {
                            resolve(null);
                            return;
                        }
                        self1.ready().then(function() {
                            createTransaction(self1._dbInfo, READ_ONLY, function(err, transaction) {
                                if (err) return reject(err);
                                try {
                                    var store = transaction.objectStore(self1._dbInfo.storeName);
                                    var advanced = false;
                                    var req = store.openKeyCursor();
                                    req.onsuccess = function() {
                                        var cursor = req.result;
                                        if (!cursor) {
                                            // this means there weren't enough keys
                                            resolve(null);
                                            return;
                                        }
                                        if (n === 0) // We have the first key, return it if that's what they
                                        // wanted.
                                        resolve(cursor.key);
                                        else if (!advanced) {
                                            // Otherwise, ask the cursor to skip ahead n
                                            // records.
                                            advanced = true;
                                            cursor.advance(n);
                                        } else // When we get here, we've got the nth key.
                                        resolve(cursor.key);
                                    };
                                    req.onerror = function() {
                                        reject(req.error);
                                    };
                                } catch (e) {
                                    reject(e);
                                }
                            });
                        })["catch"](reject);
                    });
                    executeCallback(promise, callback);
                    return promise;
                }
                function keys(callback) {
                    var self1 = this;
                    var promise = new Promise$1(function(resolve, reject) {
                        self1.ready().then(function() {
                            createTransaction(self1._dbInfo, READ_ONLY, function(err, transaction) {
                                if (err) return reject(err);
                                try {
                                    var store = transaction.objectStore(self1._dbInfo.storeName);
                                    var req = store.openKeyCursor();
                                    var _$keys = [];
                                    req.onsuccess = function() {
                                        var cursor = req.result;
                                        if (!cursor) {
                                            resolve(_$keys);
                                            return;
                                        }
                                        _$keys.push(cursor.key);
                                        cursor["continue"]();
                                    };
                                    req.onerror = function() {
                                        reject(req.error);
                                    };
                                } catch (e) {
                                    reject(e);
                                }
                            });
                        })["catch"](reject);
                    });
                    executeCallback(promise, callback);
                    return promise;
                }
                function dropInstance(options, callback) {
                    callback = getCallback.apply(this, arguments);
                    var currentConfig = this.config();
                    options = typeof options !== "function" && options || {};
                    if (!options.name) {
                        options.name = options.name || currentConfig.name;
                        options.storeName = options.storeName || currentConfig.storeName;
                    }
                    var self1 = this;
                    var promise;
                    if (!options.name) promise = Promise$1.reject("Invalid arguments");
                    else {
                        var isCurrentDb = options.name === currentConfig.name && self1._dbInfo.db;
                        var dbPromise = isCurrentDb ? Promise$1.resolve(self1._dbInfo.db) : _getOriginalConnection(options).then(function(db) {
                            var dbContext = dbContexts[options.name];
                            var forages = dbContext.forages;
                            dbContext.db = db;
                            for(var i = 0; i < forages.length; i++)forages[i]._dbInfo.db = db;
                            return db;
                        });
                        if (!options.storeName) promise = dbPromise.then(function(db) {
                            _deferReadiness(options);
                            var dbContext = dbContexts[options.name];
                            var forages = dbContext.forages;
                            db.close();
                            for(var i = 0; i < forages.length; i++){
                                var forage = forages[i];
                                forage._dbInfo.db = null;
                            }
                            var dropDBPromise = new Promise$1(function(resolve, reject) {
                                var req = idb.deleteDatabase(options.name);
                                req.onerror = function() {
                                    var _$db = req.result;
                                    if (_$db) _$db.close();
                                    reject(req.error);
                                };
                                req.onblocked = function() {
                                    // Closing all open connections in onversionchange handler should prevent this situation, but if
                                    // we do get here, it just means the request remains pending - eventually it will succeed or error
                                    console.warn('dropInstance blocked for database "' + options.name + '" until all open connections are closed');
                                };
                                req.onsuccess = function() {
                                    var _$db = req.result;
                                    if (_$db) _$db.close();
                                    resolve(_$db);
                                };
                            });
                            return dropDBPromise.then(function(db) {
                                dbContext.db = db;
                                for(var i = 0; i < forages.length; i++){
                                    var _forage = forages[i];
                                    _advanceReadiness(_forage._dbInfo);
                                }
                            })["catch"](function(err) {
                                (_rejectReadiness(options, err) || Promise$1.resolve())["catch"](function() {});
                                throw err;
                            });
                        });
                        else promise = dbPromise.then(function(db) {
                            if (!db.objectStoreNames.contains(options.storeName)) return;
                            var newVersion = db.version + 1;
                            _deferReadiness(options);
                            var dbContext = dbContexts[options.name];
                            var forages = dbContext.forages;
                            db.close();
                            for(var i = 0; i < forages.length; i++){
                                var forage = forages[i];
                                forage._dbInfo.db = null;
                                forage._dbInfo.version = newVersion;
                            }
                            var dropObjectPromise = new Promise$1(function(resolve, reject) {
                                var req = idb.open(options.name, newVersion);
                                req.onerror = function(err) {
                                    var _$db = req.result;
                                    _$db.close();
                                    reject(err);
                                };
                                req.onupgradeneeded = function() {
                                    var _$db = req.result;
                                    _$db.deleteObjectStore(options.storeName);
                                };
                                req.onsuccess = function() {
                                    var _$db = req.result;
                                    _$db.close();
                                    resolve(_$db);
                                };
                            });
                            return dropObjectPromise.then(function(db) {
                                dbContext.db = db;
                                for(var j = 0; j < forages.length; j++){
                                    var _forage2 = forages[j];
                                    _forage2._dbInfo.db = db;
                                    _advanceReadiness(_forage2._dbInfo);
                                }
                            })["catch"](function(err) {
                                (_rejectReadiness(options, err) || Promise$1.resolve())["catch"](function() {});
                                throw err;
                            });
                        });
                    }
                    executeCallback(promise, callback);
                    return promise;
                }
                var asyncStorage = {
                    _driver: "asyncStorage",
                    _initStorage: _initStorage,
                    _support: isIndexedDBValid(),
                    iterate: iterate,
                    getItem: getItem,
                    setItem: setItem,
                    removeItem: removeItem,
                    clear: clear,
                    length: length,
                    key: key,
                    keys: keys,
                    dropInstance: dropInstance
                };
                function isWebSQLValid() {
                    return typeof openDatabase === "function";
                }
                // Sadly, the best way to save binary data in WebSQL/localStorage is serializing
                // it to Base64, so this is how we store it to prevent very strange errors with less
                // verbose ways of binary <-> string data storage.
                var BASE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
                var BLOB_TYPE_PREFIX = "~~local_forage_type~";
                var BLOB_TYPE_PREFIX_REGEX = /^~~local_forage_type~([^~]+)~/;
                var SERIALIZED_MARKER = "__lfsc__:";
                var SERIALIZED_MARKER_LENGTH = SERIALIZED_MARKER.length;
                // OMG the serializations!
                var TYPE_ARRAYBUFFER = "arbf";
                var TYPE_BLOB = "blob";
                var TYPE_INT8ARRAY = "si08";
                var TYPE_UINT8ARRAY = "ui08";
                var TYPE_UINT8CLAMPEDARRAY = "uic8";
                var TYPE_INT16ARRAY = "si16";
                var TYPE_INT32ARRAY = "si32";
                var TYPE_UINT16ARRAY = "ur16";
                var TYPE_UINT32ARRAY = "ui32";
                var TYPE_FLOAT32ARRAY = "fl32";
                var TYPE_FLOAT64ARRAY = "fl64";
                var TYPE_SERIALIZED_MARKER_LENGTH = SERIALIZED_MARKER_LENGTH + TYPE_ARRAYBUFFER.length;
                var toString$1 = Object.prototype.toString;
                function stringToBuffer(serializedString) {
                    // Fill the string into a ArrayBuffer.
                    var bufferLength = serializedString.length * 0.75;
                    var len = serializedString.length;
                    var i;
                    var p = 0;
                    var encoded1, encoded2, encoded3, encoded4;
                    if (serializedString[serializedString.length - 1] === "=") {
                        bufferLength--;
                        if (serializedString[serializedString.length - 2] === "=") bufferLength--;
                    }
                    var buffer = new ArrayBuffer(bufferLength);
                    var bytes = new Uint8Array(buffer);
                    for(i = 0; i < len; i += 4){
                        encoded1 = BASE_CHARS.indexOf(serializedString[i]);
                        encoded2 = BASE_CHARS.indexOf(serializedString[i + 1]);
                        encoded3 = BASE_CHARS.indexOf(serializedString[i + 2]);
                        encoded4 = BASE_CHARS.indexOf(serializedString[i + 3]);
                        /*jslint bitwise: true */ bytes[p++] = encoded1 << 2 | encoded2 >> 4;
                        bytes[p++] = (encoded2 & 15) << 4 | encoded3 >> 2;
                        bytes[p++] = (encoded3 & 3) << 6 | encoded4 & 63;
                    }
                    return buffer;
                }
                // Converts a buffer to a string to store, serialized, in the backend
                // storage library.
                function bufferToString(buffer) {
                    // base64-arraybuffer
                    var bytes = new Uint8Array(buffer);
                    var base64String = "";
                    var i;
                    for(i = 0; i < bytes.length; i += 3){
                        /*jslint bitwise: true */ base64String += BASE_CHARS[bytes[i] >> 2];
                        base64String += BASE_CHARS[(bytes[i] & 3) << 4 | bytes[i + 1] >> 4];
                        base64String += BASE_CHARS[(bytes[i + 1] & 15) << 2 | bytes[i + 2] >> 6];
                        base64String += BASE_CHARS[bytes[i + 2] & 63];
                    }
                    if (bytes.length % 3 === 2) base64String = base64String.substring(0, base64String.length - 1) + "=";
                    else if (bytes.length % 3 === 1) base64String = base64String.substring(0, base64String.length - 2) + "==";
                    return base64String;
                }
                // Serialize a value, afterwards executing a callback (which usually
                // instructs the `setItem()` callback/promise to be executed). This is how
                // we store binary data with localStorage.
                function serialize(value, callback) {
                    var valueType = "";
                    if (value) valueType = toString$1.call(value);
                    // Cannot use `value instanceof ArrayBuffer` or such here, as these
                    // checks fail when running the tests using casper.js...
                    //
                    // TODO: See why those tests fail and use a better solution.
                    if (value && (valueType === "[object ArrayBuffer]" || value.buffer && toString$1.call(value.buffer) === "[object ArrayBuffer]")) {
                        // Convert binary arrays to a string and prefix the string with
                        // a special marker.
                        var buffer;
                        var marker = SERIALIZED_MARKER;
                        if (value instanceof ArrayBuffer) {
                            buffer = value;
                            marker += TYPE_ARRAYBUFFER;
                        } else {
                            buffer = value.buffer;
                            if (valueType === "[object Int8Array]") marker += TYPE_INT8ARRAY;
                            else if (valueType === "[object Uint8Array]") marker += TYPE_UINT8ARRAY;
                            else if (valueType === "[object Uint8ClampedArray]") marker += TYPE_UINT8CLAMPEDARRAY;
                            else if (valueType === "[object Int16Array]") marker += TYPE_INT16ARRAY;
                            else if (valueType === "[object Uint16Array]") marker += TYPE_UINT16ARRAY;
                            else if (valueType === "[object Int32Array]") marker += TYPE_INT32ARRAY;
                            else if (valueType === "[object Uint32Array]") marker += TYPE_UINT32ARRAY;
                            else if (valueType === "[object Float32Array]") marker += TYPE_FLOAT32ARRAY;
                            else if (valueType === "[object Float64Array]") marker += TYPE_FLOAT64ARRAY;
                            else callback(new Error("Failed to get type for BinaryArray"));
                        }
                        callback(marker + bufferToString(buffer));
                    } else if (valueType === "[object Blob]") {
                        // Conver the blob to a binaryArray and then to a string.
                        var fileReader = new FileReader();
                        fileReader.onload = function() {
                            // Backwards-compatible prefix for the blob type.
                            var str = BLOB_TYPE_PREFIX + value.type + "~" + bufferToString(this.result);
                            callback(SERIALIZED_MARKER + TYPE_BLOB + str);
                        };
                        fileReader.readAsArrayBuffer(value);
                    } else try {
                        callback(JSON.stringify(value));
                    } catch (e) {
                        console.error("Couldn't convert value into a JSON string: ", value);
                        callback(null, e);
                    }
                }
                // Deserialize data we've inserted into a value column/field. We place
                // special markers into our strings to mark them as encoded; this isn't
                // as nice as a meta field, but it's the only sane thing we can do whilst
                // keeping localStorage support intact.
                //
                // Oftentimes this will just deserialize JSON content, but if we have a
                // special marker (SERIALIZED_MARKER, defined above), we will extract
                // some kind of arraybuffer/binary data/typed array out of the string.
                function deserialize(value) {
                    // If we haven't marked this string as being specially serialized (i.e.
                    // something other than serialized JSON), we can just return it and be
                    // done with it.
                    if (value.substring(0, SERIALIZED_MARKER_LENGTH) !== SERIALIZED_MARKER) return JSON.parse(value);
                    // The following code deals with deserializing some kind of Blob or
                    // TypedArray. First we separate out the type of data we're dealing
                    // with from the data itself.
                    var serializedString = value.substring(TYPE_SERIALIZED_MARKER_LENGTH);
                    var type = value.substring(SERIALIZED_MARKER_LENGTH, TYPE_SERIALIZED_MARKER_LENGTH);
                    var blobType;
                    // Backwards-compatible blob type serialization strategy.
                    // DBs created with older versions of localForage will simply not have the blob type.
                    if (type === TYPE_BLOB && BLOB_TYPE_PREFIX_REGEX.test(serializedString)) {
                        var matcher = serializedString.match(BLOB_TYPE_PREFIX_REGEX);
                        blobType = matcher[1];
                        serializedString = serializedString.substring(matcher[0].length);
                    }
                    var buffer = stringToBuffer(serializedString);
                    // Return the right type based on the code/type set during
                    // serialization.
                    switch(type){
                        case TYPE_ARRAYBUFFER:
                            return buffer;
                        case TYPE_BLOB:
                            return createBlob([
                                buffer
                            ], {
                                type: blobType
                            });
                        case TYPE_INT8ARRAY:
                            return new Int8Array(buffer);
                        case TYPE_UINT8ARRAY:
                            return new Uint8Array(buffer);
                        case TYPE_UINT8CLAMPEDARRAY:
                            return new Uint8ClampedArray(buffer);
                        case TYPE_INT16ARRAY:
                            return new Int16Array(buffer);
                        case TYPE_UINT16ARRAY:
                            return new Uint16Array(buffer);
                        case TYPE_INT32ARRAY:
                            return new Int32Array(buffer);
                        case TYPE_UINT32ARRAY:
                            return new Uint32Array(buffer);
                        case TYPE_FLOAT32ARRAY:
                            return new Float32Array(buffer);
                        case TYPE_FLOAT64ARRAY:
                            return new Float64Array(buffer);
                        default:
                            throw new Error("Unkown type: " + type);
                    }
                }
                var localforageSerializer = {
                    serialize: serialize,
                    deserialize: deserialize,
                    stringToBuffer: stringToBuffer,
                    bufferToString: bufferToString
                };
                /*
 * Includes code from:
 *
 * base64-arraybuffer
 * https://github.com/niklasvh/base64-arraybuffer
 *
 * Copyright (c) 2012 Niklas von Hertzen
 * Licensed under the MIT license.
 */ function createDbTable(t, dbInfo, callback, errorCallback) {
                    t.executeSql("CREATE TABLE IF NOT EXISTS " + dbInfo.storeName + " " + "(id INTEGER PRIMARY KEY, key unique, value)", [], callback, errorCallback);
                }
                // Open the WebSQL database (automatically creates one if one didn't
                // previously exist), using any options set in the config.
                function _initStorage$1(options) {
                    var self1 = this;
                    var dbInfo = {
                        db: null
                    };
                    if (options) for(var i in options)dbInfo[i] = typeof options[i] !== "string" ? options[i].toString() : options[i];
                    var dbInfoPromise = new Promise$1(function(resolve, reject) {
                        // Open the database; the openDatabase API will automatically
                        // create it for us if it doesn't exist.
                        try {
                            dbInfo.db = openDatabase(dbInfo.name, String(dbInfo.version), dbInfo.description, dbInfo.size);
                        } catch (e) {
                            return reject(e);
                        }
                        // Create our key/value table if it doesn't exist.
                        dbInfo.db.transaction(function(t) {
                            createDbTable(t, dbInfo, function() {
                                self1._dbInfo = dbInfo;
                                resolve();
                            }, function(t, error) {
                                reject(error);
                            });
                        }, reject);
                    });
                    dbInfo.serializer = localforageSerializer;
                    return dbInfoPromise;
                }
                function tryExecuteSql(t, dbInfo, sqlStatement, args, callback, errorCallback) {
                    t.executeSql(sqlStatement, args, callback, function(t, error) {
                        if (error.code === error.SYNTAX_ERR) t.executeSql("SELECT name FROM sqlite_master WHERE type='table' AND name = ?", [
                            dbInfo.storeName
                        ], function(t, results) {
                            if (!results.rows.length) // if the table is missing (was deleted)
                            // re-create it table and retry
                            createDbTable(t, dbInfo, function() {
                                t.executeSql(sqlStatement, args, callback, errorCallback);
                            }, errorCallback);
                            else errorCallback(t, error);
                        }, errorCallback);
                        else errorCallback(t, error);
                    }, errorCallback);
                }
                function getItem$1(key, callback) {
                    var self1 = this;
                    key = normalizeKey(key);
                    var promise = new Promise$1(function(resolve, reject) {
                        self1.ready().then(function() {
                            var dbInfo = self1._dbInfo;
                            dbInfo.db.transaction(function(t) {
                                tryExecuteSql(t, dbInfo, "SELECT * FROM " + dbInfo.storeName + " WHERE key = ? LIMIT 1", [
                                    key
                                ], function(t, results) {
                                    var result = results.rows.length ? results.rows.item(0).value : null;
                                    // Check to see if this is serialized content we need to
                                    // unpack.
                                    if (result) result = dbInfo.serializer.deserialize(result);
                                    resolve(result);
                                }, function(t, error) {
                                    reject(error);
                                });
                            });
                        })["catch"](reject);
                    });
                    executeCallback(promise, callback);
                    return promise;
                }
                function iterate$1(iterator, callback) {
                    var self1 = this;
                    var promise = new Promise$1(function(resolve, reject) {
                        self1.ready().then(function() {
                            var dbInfo = self1._dbInfo;
                            dbInfo.db.transaction(function(t) {
                                tryExecuteSql(t, dbInfo, "SELECT * FROM " + dbInfo.storeName, [], function(t, results) {
                                    var rows = results.rows;
                                    var _$length = rows.length;
                                    for(var i = 0; i < _$length; i++){
                                        var item = rows.item(i);
                                        var result = item.value;
                                        // Check to see if this is serialized content
                                        // we need to unpack.
                                        if (result) result = dbInfo.serializer.deserialize(result);
                                        result = iterator(result, item.key, i + 1);
                                        // void(0) prevents problems with redefinition
                                        // of `undefined`.
                                        if (result !== void 0) {
                                            resolve(result);
                                            return;
                                        }
                                    }
                                    resolve();
                                }, function(t, error) {
                                    reject(error);
                                });
                            });
                        })["catch"](reject);
                    });
                    executeCallback(promise, callback);
                    return promise;
                }
                function _setItem(key, value, callback, retriesLeft) {
                    var self1 = this;
                    key = normalizeKey(key);
                    var promise = new Promise$1(function(resolve, reject) {
                        self1.ready().then(function() {
                            // The localStorage API doesn't return undefined values in an
                            // "expected" way, so undefined is always cast to null in all
                            // drivers. See: https://github.com/mozilla/localForage/pull/42
                            if (value === undefined) value = null;
                            // Save the original value to pass to the callback.
                            var originalValue = value;
                            var dbInfo = self1._dbInfo;
                            dbInfo.serializer.serialize(value, function(value, error) {
                                if (error) reject(error);
                                else dbInfo.db.transaction(function(t) {
                                    tryExecuteSql(t, dbInfo, "INSERT OR REPLACE INTO " + dbInfo.storeName + " " + "(key, value) VALUES (?, ?)", [
                                        key,
                                        value
                                    ], function() {
                                        resolve(originalValue);
                                    }, function(t, error) {
                                        reject(error);
                                    });
                                }, function(sqlError) {
                                    // The transaction failed; check
                                    // to see if it's a quota error.
                                    if (sqlError.code === sqlError.QUOTA_ERR) {
                                        // We reject the callback outright for now, but
                                        // it's worth trying to re-run the transaction.
                                        // Even if the user accepts the prompt to use
                                        // more storage on Safari, this error will
                                        // be called.
                                        //
                                        // Try to re-run the transaction.
                                        if (retriesLeft > 0) {
                                            resolve(_setItem.apply(self1, [
                                                key,
                                                originalValue,
                                                callback,
                                                retriesLeft - 1
                                            ]));
                                            return;
                                        }
                                        reject(sqlError);
                                    }
                                });
                            });
                        })["catch"](reject);
                    });
                    executeCallback(promise, callback);
                    return promise;
                }
                function setItem$1(key, value, callback) {
                    return _setItem.apply(this, [
                        key,
                        value,
                        callback,
                        1
                    ]);
                }
                function removeItem$1(key, callback) {
                    var self1 = this;
                    key = normalizeKey(key);
                    var promise = new Promise$1(function(resolve, reject) {
                        self1.ready().then(function() {
                            var dbInfo = self1._dbInfo;
                            dbInfo.db.transaction(function(t) {
                                tryExecuteSql(t, dbInfo, "DELETE FROM " + dbInfo.storeName + " WHERE key = ?", [
                                    key
                                ], function() {
                                    resolve();
                                }, function(t, error) {
                                    reject(error);
                                });
                            });
                        })["catch"](reject);
                    });
                    executeCallback(promise, callback);
                    return promise;
                }
                // Deletes every item in the table.
                // TODO: Find out if this resets the AUTO_INCREMENT number.
                function clear$1(callback) {
                    var self1 = this;
                    var promise = new Promise$1(function(resolve, reject) {
                        self1.ready().then(function() {
                            var dbInfo = self1._dbInfo;
                            dbInfo.db.transaction(function(t) {
                                tryExecuteSql(t, dbInfo, "DELETE FROM " + dbInfo.storeName, [], function() {
                                    resolve();
                                }, function(t, error) {
                                    reject(error);
                                });
                            });
                        })["catch"](reject);
                    });
                    executeCallback(promise, callback);
                    return promise;
                }
                // Does a simple `COUNT(key)` to get the number of items stored in
                // localForage.
                function length$1(callback) {
                    var self1 = this;
                    var promise = new Promise$1(function(resolve, reject) {
                        self1.ready().then(function() {
                            var dbInfo = self1._dbInfo;
                            dbInfo.db.transaction(function(t) {
                                // Ahhh, SQL makes this one soooooo easy.
                                tryExecuteSql(t, dbInfo, "SELECT COUNT(key) as c FROM " + dbInfo.storeName, [], function(t, results) {
                                    var result = results.rows.item(0).c;
                                    resolve(result);
                                }, function(t, error) {
                                    reject(error);
                                });
                            });
                        })["catch"](reject);
                    });
                    executeCallback(promise, callback);
                    return promise;
                }
                // Return the key located at key index X; essentially gets the key from a
                // `WHERE id = ?`. This is the most efficient way I can think to implement
                // this rarely-used (in my experience) part of the API, but it can seem
                // inconsistent, because we do `INSERT OR REPLACE INTO` on `setItem()`, so
                // the ID of each key will change every time it's updated. Perhaps a stored
                // procedure for the `setItem()` SQL would solve this problem?
                // TODO: Don't change ID on `setItem()`.
                function key$1(n, callback) {
                    var self1 = this;
                    var promise = new Promise$1(function(resolve, reject) {
                        self1.ready().then(function() {
                            var dbInfo = self1._dbInfo;
                            dbInfo.db.transaction(function(t) {
                                tryExecuteSql(t, dbInfo, "SELECT key FROM " + dbInfo.storeName + " WHERE id = ? LIMIT 1", [
                                    n + 1
                                ], function(t, results) {
                                    var result = results.rows.length ? results.rows.item(0).key : null;
                                    resolve(result);
                                }, function(t, error) {
                                    reject(error);
                                });
                            });
                        })["catch"](reject);
                    });
                    executeCallback(promise, callback);
                    return promise;
                }
                function keys$1(callback) {
                    var self1 = this;
                    var promise = new Promise$1(function(resolve, reject) {
                        self1.ready().then(function() {
                            var dbInfo = self1._dbInfo;
                            dbInfo.db.transaction(function(t) {
                                tryExecuteSql(t, dbInfo, "SELECT key FROM " + dbInfo.storeName, [], function(t, results) {
                                    var _$keys = [];
                                    for(var i = 0; i < results.rows.length; i++)_$keys.push(results.rows.item(i).key);
                                    resolve(_$keys);
                                }, function(t, error) {
                                    reject(error);
                                });
                            });
                        })["catch"](reject);
                    });
                    executeCallback(promise, callback);
                    return promise;
                }
                // https://www.w3.org/TR/webdatabase/#databases
                // > There is no way to enumerate or delete the databases available for an origin from this API.
                function getAllStoreNames(db) {
                    return new Promise$1(function(resolve, reject) {
                        db.transaction(function(t) {
                            t.executeSql("SELECT name FROM sqlite_master WHERE type='table' AND name <> '__WebKitDatabaseInfoTable__'", [], function(t, results) {
                                var storeNames = [];
                                for(var i = 0; i < results.rows.length; i++)storeNames.push(results.rows.item(i).name);
                                resolve({
                                    db: db,
                                    storeNames: storeNames
                                });
                            }, function(t, error) {
                                reject(error);
                            });
                        }, function(sqlError) {
                            reject(sqlError);
                        });
                    });
                }
                function dropInstance$1(options, callback) {
                    callback = getCallback.apply(this, arguments);
                    var currentConfig = this.config();
                    options = typeof options !== "function" && options || {};
                    if (!options.name) {
                        options.name = options.name || currentConfig.name;
                        options.storeName = options.storeName || currentConfig.storeName;
                    }
                    var self1 = this;
                    var promise;
                    if (!options.name) promise = Promise$1.reject("Invalid arguments");
                    else promise = new Promise$1(function(resolve) {
                        var db;
                        if (options.name === currentConfig.name) // use the db reference of the current instance
                        db = self1._dbInfo.db;
                        else db = openDatabase(options.name, "", "", 0);
                        if (!options.storeName) // drop all database tables
                        resolve(getAllStoreNames(db));
                        else resolve({
                            db: db,
                            storeNames: [
                                options.storeName
                            ]
                        });
                    }).then(function(operationInfo) {
                        return new Promise$1(function(resolve, reject) {
                            operationInfo.db.transaction(function(t) {
                                function dropTable(storeName) {
                                    return new Promise$1(function(resolve, reject) {
                                        t.executeSql("DROP TABLE IF EXISTS " + storeName, [], function() {
                                            resolve();
                                        }, function(t, error) {
                                            reject(error);
                                        });
                                    });
                                }
                                var operations = [];
                                for(var i = 0, len = operationInfo.storeNames.length; i < len; i++)operations.push(dropTable(operationInfo.storeNames[i]));
                                Promise$1.all(operations).then(function() {
                                    resolve();
                                })["catch"](function(e) {
                                    reject(e);
                                });
                            }, function(sqlError) {
                                reject(sqlError);
                            });
                        });
                    });
                    executeCallback(promise, callback);
                    return promise;
                }
                var webSQLStorage = {
                    _driver: "webSQLStorage",
                    _initStorage: _initStorage$1,
                    _support: isWebSQLValid(),
                    iterate: iterate$1,
                    getItem: getItem$1,
                    setItem: setItem$1,
                    removeItem: removeItem$1,
                    clear: clear$1,
                    length: length$1,
                    key: key$1,
                    keys: keys$1,
                    dropInstance: dropInstance$1
                };
                function isLocalStorageValid() {
                    try {
                        return typeof localStorage !== "undefined" && "setItem" in localStorage && // in IE8 typeof localStorage.setItem === 'object'
                        !!localStorage.setItem;
                    } catch (e) {
                        return false;
                    }
                }
                function _getKeyPrefix(options, defaultConfig) {
                    var keyPrefix = options.name + "/";
                    if (options.storeName !== defaultConfig.storeName) keyPrefix += options.storeName + "/";
                    return keyPrefix;
                }
                // Check if localStorage throws when saving an item
                function checkIfLocalStorageThrows() {
                    var localStorageTestKey = "_localforage_support_test";
                    try {
                        localStorage.setItem(localStorageTestKey, true);
                        localStorage.removeItem(localStorageTestKey);
                        return false;
                    } catch (e) {
                        return true;
                    }
                }
                // Check if localStorage is usable and allows to save an item
                // This method checks if localStorage is usable in Safari Private Browsing
                // mode, or in any other case where the available quota for localStorage
                // is 0 and there wasn't any saved items yet.
                function _isLocalStorageUsable() {
                    return !checkIfLocalStorageThrows() || localStorage.length > 0;
                }
                // Config the localStorage backend, using options set in the config.
                function _initStorage$2(options) {
                    var self1 = this;
                    var dbInfo = {};
                    if (options) for(var i in options)dbInfo[i] = options[i];
                    dbInfo.keyPrefix = _getKeyPrefix(options, self1._defaultConfig);
                    if (!_isLocalStorageUsable()) return Promise$1.reject();
                    self1._dbInfo = dbInfo;
                    dbInfo.serializer = localforageSerializer;
                    return Promise$1.resolve();
                }
                // Remove all keys from the datastore, effectively destroying all data in
                // the app's key/value store!
                function clear$2(callback) {
                    var self1 = this;
                    var promise = self1.ready().then(function() {
                        var keyPrefix = self1._dbInfo.keyPrefix;
                        for(var i = localStorage.length - 1; i >= 0; i--){
                            var _$key = localStorage.key(i);
                            if (_$key.indexOf(keyPrefix) === 0) localStorage.removeItem(_$key);
                        }
                    });
                    executeCallback(promise, callback);
                    return promise;
                }
                // Retrieve an item from the store. Unlike the original async_storage
                // library in Gaia, we don't modify return values at all. If a key's value
                // is `undefined`, we pass that value to the callback function.
                function getItem$2(key, callback) {
                    var self1 = this;
                    key = normalizeKey(key);
                    var promise = self1.ready().then(function() {
                        var dbInfo = self1._dbInfo;
                        var result = localStorage.getItem(dbInfo.keyPrefix + key);
                        // If a result was found, parse it from the serialized
                        // string into a JS object. If result isn't truthy, the key
                        // is likely undefined and we'll pass it straight to the
                        // callback.
                        if (result) result = dbInfo.serializer.deserialize(result);
                        return result;
                    });
                    executeCallback(promise, callback);
                    return promise;
                }
                // Iterate over all items in the store.
                function iterate$2(iterator, callback) {
                    var self1 = this;
                    var promise = self1.ready().then(function() {
                        var dbInfo = self1._dbInfo;
                        var keyPrefix = dbInfo.keyPrefix;
                        var keyPrefixLength = keyPrefix.length;
                        var _$length = localStorage.length;
                        // We use a dedicated iterator instead of the `i` variable below
                        // so other keys we fetch in localStorage aren't counted in
                        // the `iterationNumber` argument passed to the `iterate()`
                        // callback.
                        //
                        // See: github.com/mozilla/localForage/pull/435#discussion_r38061530
                        var iterationNumber = 1;
                        for(var i = 0; i < _$length; i++){
                            var _$key = localStorage.key(i);
                            if (_$key.indexOf(keyPrefix) !== 0) continue;
                            var value = localStorage.getItem(_$key);
                            // If a result was found, parse it from the serialized
                            // string into a JS object. If result isn't truthy, the
                            // key is likely undefined and we'll pass it straight
                            // to the iterator.
                            if (value) value = dbInfo.serializer.deserialize(value);
                            value = iterator(value, _$key.substring(keyPrefixLength), iterationNumber++);
                            if (value !== void 0) return value;
                        }
                    });
                    executeCallback(promise, callback);
                    return promise;
                }
                // Same as localStorage's key() method, except takes a callback.
                function key$2(n, callback) {
                    var self1 = this;
                    var promise = self1.ready().then(function() {
                        var dbInfo = self1._dbInfo;
                        var result;
                        try {
                            result = localStorage.key(n);
                        } catch (error) {
                            result = null;
                        }
                        // Remove the prefix from the key, if a key is found.
                        if (result) result = result.substring(dbInfo.keyPrefix.length);
                        return result;
                    });
                    executeCallback(promise, callback);
                    return promise;
                }
                function keys$2(callback) {
                    var self1 = this;
                    var promise = self1.ready().then(function() {
                        var dbInfo = self1._dbInfo;
                        var _$length = localStorage.length;
                        var _$keys = [];
                        for(var i = 0; i < _$length; i++){
                            var itemKey = localStorage.key(i);
                            if (itemKey.indexOf(dbInfo.keyPrefix) === 0) _$keys.push(itemKey.substring(dbInfo.keyPrefix.length));
                        }
                        return _$keys;
                    });
                    executeCallback(promise, callback);
                    return promise;
                }
                // Supply the number of keys in the datastore to the callback function.
                function length$2(callback) {
                    var self1 = this;
                    var promise = self1.keys().then(function(keys) {
                        return keys.length;
                    });
                    executeCallback(promise, callback);
                    return promise;
                }
                // Remove an item from the store, nice and simple.
                function removeItem$2(key, callback) {
                    var self1 = this;
                    key = normalizeKey(key);
                    var promise = self1.ready().then(function() {
                        var dbInfo = self1._dbInfo;
                        localStorage.removeItem(dbInfo.keyPrefix + key);
                    });
                    executeCallback(promise, callback);
                    return promise;
                }
                // Set a key's value and run an optional callback once the value is set.
                // Unlike Gaia's implementation, the callback function is passed the value,
                // in case you want to operate on that value only after you're sure it
                // saved, or something like that.
                function setItem$2(key, value, callback) {
                    var self1 = this;
                    key = normalizeKey(key);
                    var promise = self1.ready().then(function() {
                        // Convert undefined values to null.
                        // https://github.com/mozilla/localForage/pull/42
                        if (value === undefined) value = null;
                        // Save the original value to pass to the callback.
                        var originalValue = value;
                        return new Promise$1(function(resolve, reject) {
                            var dbInfo = self1._dbInfo;
                            dbInfo.serializer.serialize(value, function(value, error) {
                                if (error) reject(error);
                                else try {
                                    localStorage.setItem(dbInfo.keyPrefix + key, value);
                                    resolve(originalValue);
                                } catch (e) {
                                    // localStorage capacity exceeded.
                                    // TODO: Make this a specific error/event.
                                    if (e.name === "QuotaExceededError" || e.name === "NS_ERROR_DOM_QUOTA_REACHED") reject(e);
                                    reject(e);
                                }
                            });
                        });
                    });
                    executeCallback(promise, callback);
                    return promise;
                }
                function dropInstance$2(options, callback) {
                    callback = getCallback.apply(this, arguments);
                    options = typeof options !== "function" && options || {};
                    if (!options.name) {
                        var currentConfig = this.config();
                        options.name = options.name || currentConfig.name;
                        options.storeName = options.storeName || currentConfig.storeName;
                    }
                    var self1 = this;
                    var promise;
                    if (!options.name) promise = Promise$1.reject("Invalid arguments");
                    else promise = new Promise$1(function(resolve) {
                        if (!options.storeName) resolve(options.name + "/");
                        else resolve(_getKeyPrefix(options, self1._defaultConfig));
                    }).then(function(keyPrefix) {
                        for(var i = localStorage.length - 1; i >= 0; i--){
                            var _$key = localStorage.key(i);
                            if (_$key.indexOf(keyPrefix) === 0) localStorage.removeItem(_$key);
                        }
                    });
                    executeCallback(promise, callback);
                    return promise;
                }
                var localStorageWrapper = {
                    _driver: "localStorageWrapper",
                    _initStorage: _initStorage$2,
                    _support: isLocalStorageValid(),
                    iterate: iterate$2,
                    getItem: getItem$2,
                    setItem: setItem$2,
                    removeItem: removeItem$2,
                    clear: clear$2,
                    length: length$2,
                    key: key$2,
                    keys: keys$2,
                    dropInstance: dropInstance$2
                };
                var sameValue = function sameValue(x, y) {
                    return x === y || typeof x === "number" && typeof y === "number" && isNaN(x) && isNaN(y);
                };
                var includes = function includes(array, searchElement) {
                    var len = array.length;
                    var i = 0;
                    while(i < len){
                        if (sameValue(array[i], searchElement)) return true;
                        i++;
                    }
                    return false;
                };
                var isArray = Array.isArray || function(arg) {
                    return Object.prototype.toString.call(arg) === "[object Array]";
                };
                // Drivers are stored here when `defineDriver()` is called.
                // They are shared across all instances of localForage.
                var DefinedDrivers = {};
                var DriverSupport = {};
                var DefaultDrivers = {
                    INDEXEDDB: asyncStorage,
                    WEBSQL: webSQLStorage,
                    LOCALSTORAGE: localStorageWrapper
                };
                var DefaultDriverOrder = [
                    DefaultDrivers.INDEXEDDB._driver,
                    DefaultDrivers.WEBSQL._driver,
                    DefaultDrivers.LOCALSTORAGE._driver
                ];
                var OptionalDriverMethods = [
                    "dropInstance"
                ];
                var LibraryMethods = [
                    "clear",
                    "getItem",
                    "iterate",
                    "key",
                    "keys",
                    "length",
                    "removeItem",
                    "setItem"
                ].concat(OptionalDriverMethods);
                var DefaultConfig = {
                    description: "",
                    driver: DefaultDriverOrder.slice(),
                    name: "localforage",
                    // Default DB size is _JUST UNDER_ 5MB, as it's the highest size
                    // we can use without a prompt.
                    size: 4980736,
                    storeName: "keyvaluepairs",
                    version: 1.0
                };
                function callWhenReady(localForageInstance, libraryMethod) {
                    localForageInstance[libraryMethod] = function() {
                        var _args = arguments;
                        return localForageInstance.ready().then(function() {
                            return localForageInstance[libraryMethod].apply(localForageInstance, _args);
                        });
                    };
                }
                function extend() {
                    for(var i = 1; i < arguments.length; i++){
                        var arg = arguments[i];
                        if (arg) {
                            for(var _key in arg)if (arg.hasOwnProperty(_key)) {
                                if (isArray(arg[_key])) arguments[0][_key] = arg[_key].slice();
                                else arguments[0][_key] = arg[_key];
                            }
                        }
                    }
                    return arguments[0];
                }
                var LocalForage = function() {
                    function LocalForage(options) {
                        _classCallCheck(this, LocalForage);
                        for(var driverTypeKey in DefaultDrivers)if (DefaultDrivers.hasOwnProperty(driverTypeKey)) {
                            var driver = DefaultDrivers[driverTypeKey];
                            var driverName = driver._driver;
                            this[driverTypeKey] = driverName;
                            if (!DefinedDrivers[driverName]) // we don't need to wait for the promise,
                            // since the default drivers can be defined
                            // in a blocking manner
                            this.defineDriver(driver);
                        }
                        this._defaultConfig = extend({}, DefaultConfig);
                        this._config = extend({}, this._defaultConfig, options);
                        this._driverSet = null;
                        this._initDriver = null;
                        this._ready = false;
                        this._dbInfo = null;
                        this._wrapLibraryMethodsWithReady();
                        this.setDriver(this._config.driver)["catch"](function() {});
                    }
                    // Set any config values for localForage; can be called anytime before
                    // the first API call (e.g. `getItem`, `setItem`).
                    // We loop through options so we don't overwrite existing config
                    // values.
                    LocalForage.prototype.config = function config(options) {
                        // If the options argument is an object, we use it to set values.
                        // Otherwise, we return either a specified config value or all
                        // config values.
                        if ((typeof options === "undefined" ? "undefined" : _typeof(options)) === "object") {
                            // If localforage is ready and fully initialized, we can't set
                            // any new configuration values. Instead, we return an error.
                            if (this._ready) return new Error("Can't call config() after localforage has been used.");
                            for(var i in options){
                                if (i === "storeName") options[i] = options[i].replace(/\W/g, "_");
                                if (i === "version" && typeof options[i] !== "number") return new Error("Database version must be a number.");
                                this._config[i] = options[i];
                            }
                            // after all config options are set and
                            // the driver option is used, try setting it
                            if ("driver" in options && options.driver) return this.setDriver(this._config.driver);
                            return true;
                        } else if (typeof options === "string") return this._config[options];
                        else return this._config;
                    };
                    // Used to define a custom driver, shared across all instances of
                    // localForage.
                    LocalForage.prototype.defineDriver = function defineDriver(driverObject, callback, errorCallback) {
                        var promise = new Promise$1(function(resolve, reject) {
                            try {
                                var driverName = driverObject._driver;
                                var complianceError = new Error("Custom driver not compliant; see https://mozilla.github.io/localForage/#definedriver");
                                // A driver name should be defined and not overlap with the
                                // library-defined, default drivers.
                                if (!driverObject._driver) {
                                    reject(complianceError);
                                    return;
                                }
                                var driverMethods = LibraryMethods.concat("_initStorage");
                                for(var i = 0, len = driverMethods.length; i < len; i++){
                                    var driverMethodName = driverMethods[i];
                                    // when the property is there,
                                    // it should be a method even when optional
                                    var isRequired = !includes(OptionalDriverMethods, driverMethodName);
                                    if ((isRequired || driverObject[driverMethodName]) && typeof driverObject[driverMethodName] !== "function") {
                                        reject(complianceError);
                                        return;
                                    }
                                }
                                var configureMissingMethods = function configureMissingMethods() {
                                    var methodNotImplementedFactory = function methodNotImplementedFactory(methodName) {
                                        return function() {
                                            var error = new Error("Method " + methodName + " is not implemented by the current driver");
                                            var promise = Promise$1.reject(error);
                                            executeCallback(promise, arguments[arguments.length - 1]);
                                            return promise;
                                        };
                                    };
                                    for(var _i = 0, _len = OptionalDriverMethods.length; _i < _len; _i++){
                                        var optionalDriverMethod = OptionalDriverMethods[_i];
                                        if (!driverObject[optionalDriverMethod]) driverObject[optionalDriverMethod] = methodNotImplementedFactory(optionalDriverMethod);
                                    }
                                };
                                configureMissingMethods();
                                var setDriverSupport = function setDriverSupport(support) {
                                    if (DefinedDrivers[driverName]) console.info("Redefining LocalForage driver: " + driverName);
                                    DefinedDrivers[driverName] = driverObject;
                                    DriverSupport[driverName] = support;
                                    // don't use a then, so that we can define
                                    // drivers that have simple _support methods
                                    // in a blocking manner
                                    resolve();
                                };
                                if ("_support" in driverObject) {
                                    if (driverObject._support && typeof driverObject._support === "function") driverObject._support().then(setDriverSupport, reject);
                                    else setDriverSupport(!!driverObject._support);
                                } else setDriverSupport(true);
                            } catch (e) {
                                reject(e);
                            }
                        });
                        executeTwoCallbacks(promise, callback, errorCallback);
                        return promise;
                    };
                    LocalForage.prototype.driver = function driver() {
                        return this._driver || null;
                    };
                    LocalForage.prototype.getDriver = function getDriver(driverName, callback, errorCallback) {
                        var getDriverPromise = DefinedDrivers[driverName] ? Promise$1.resolve(DefinedDrivers[driverName]) : Promise$1.reject(new Error("Driver not found."));
                        executeTwoCallbacks(getDriverPromise, callback, errorCallback);
                        return getDriverPromise;
                    };
                    LocalForage.prototype.getSerializer = function getSerializer(callback) {
                        var serializerPromise = Promise$1.resolve(localforageSerializer);
                        executeTwoCallbacks(serializerPromise, callback);
                        return serializerPromise;
                    };
                    LocalForage.prototype.ready = function ready(callback) {
                        var self1 = this;
                        var promise = self1._driverSet.then(function() {
                            if (self1._ready === null) self1._ready = self1._initDriver();
                            return self1._ready;
                        });
                        executeTwoCallbacks(promise, callback, callback);
                        return promise;
                    };
                    LocalForage.prototype.setDriver = function setDriver(drivers, callback, errorCallback) {
                        var self1 = this;
                        if (!isArray(drivers)) drivers = [
                            drivers
                        ];
                        var supportedDrivers = this._getSupportedDrivers(drivers);
                        function setDriverToConfig() {
                            self1._config.driver = self1.driver();
                        }
                        function extendSelfWithDriver(driver) {
                            self1._extend(driver);
                            setDriverToConfig();
                            self1._ready = self1._initStorage(self1._config);
                            return self1._ready;
                        }
                        function initDriver(supportedDrivers) {
                            return function() {
                                var currentDriverIndex = 0;
                                function driverPromiseLoop() {
                                    while(currentDriverIndex < supportedDrivers.length){
                                        var driverName = supportedDrivers[currentDriverIndex];
                                        currentDriverIndex++;
                                        self1._dbInfo = null;
                                        self1._ready = null;
                                        return self1.getDriver(driverName).then(extendSelfWithDriver)["catch"](driverPromiseLoop);
                                    }
                                    setDriverToConfig();
                                    var error = new Error("No available storage method found.");
                                    self1._driverSet = Promise$1.reject(error);
                                    return self1._driverSet;
                                }
                                return driverPromiseLoop();
                            };
                        }
                        // There might be a driver initialization in progress
                        // so wait for it to finish in order to avoid a possible
                        // race condition to set _dbInfo
                        var oldDriverSetDone = this._driverSet !== null ? this._driverSet["catch"](function() {
                            return Promise$1.resolve();
                        }) : Promise$1.resolve();
                        this._driverSet = oldDriverSetDone.then(function() {
                            var driverName = supportedDrivers[0];
                            self1._dbInfo = null;
                            self1._ready = null;
                            return self1.getDriver(driverName).then(function(driver) {
                                self1._driver = driver._driver;
                                setDriverToConfig();
                                self1._wrapLibraryMethodsWithReady();
                                self1._initDriver = initDriver(supportedDrivers);
                            });
                        })["catch"](function() {
                            setDriverToConfig();
                            var error = new Error("No available storage method found.");
                            self1._driverSet = Promise$1.reject(error);
                            return self1._driverSet;
                        });
                        executeTwoCallbacks(this._driverSet, callback, errorCallback);
                        return this._driverSet;
                    };
                    LocalForage.prototype.supports = function supports(driverName) {
                        return !!DriverSupport[driverName];
                    };
                    LocalForage.prototype._extend = function _extend(libraryMethodsAndProperties) {
                        extend(this, libraryMethodsAndProperties);
                    };
                    LocalForage.prototype._getSupportedDrivers = function _getSupportedDrivers(drivers) {
                        var supportedDrivers = [];
                        for(var i = 0, len = drivers.length; i < len; i++){
                            var driverName = drivers[i];
                            if (this.supports(driverName)) supportedDrivers.push(driverName);
                        }
                        return supportedDrivers;
                    };
                    LocalForage.prototype._wrapLibraryMethodsWithReady = function _wrapLibraryMethodsWithReady() {
                        // Add a stub for each driver API method that delays the call to the
                        // corresponding driver method until localForage is ready. These stubs
                        // will be replaced by the driver methods as soon as the driver is
                        // loaded, so there is no performance impact.
                        for(var i = 0, len = LibraryMethods.length; i < len; i++)callWhenReady(this, LibraryMethods[i]);
                    };
                    LocalForage.prototype.createInstance = function createInstance(options) {
                        return new LocalForage(options);
                    };
                    return LocalForage;
                }();
                // The actual localForage object that we expose as a module or via a
                // global. It's extended by pulling in one of our other libraries.
                var localforage_js = new LocalForage();
                module1.exports = localforage_js;
            },
            {
                "3": 3
            }
        ]
    }, {}, [
        4
    ])(4);
});


/**
 * Finite State Machine generation utilities
 */ /**
 * Define a basic state machine state. j is the list of character transitions,
 * jr is the list of regex-match transitions, jd is the default state to
 * transition to t is the accepting token type, if any. If this is the terminal
 * state, then it does not emit a token.
 * @param {string|class} token to emit
 */ function $410e7a787f87a2b4$var$State(token) {
    this.j = {}; // IMPLEMENTATION 1
    // this.j = []; // IMPLEMENTATION 2
    this.jr = [];
    this.jd = null;
    this.t = token;
}
/**
 * Take the transition from this state to the next one on the given input.
 * If this state does not exist deterministically, will create it.
 *
 * @param {string} input character or token to transition on
 * @param {string|class} [token] token or multi-token to emit when reaching
 * this state
 */ $410e7a787f87a2b4$var$State.prototype = {
    /**
   * @param {State} state
   */ accepts: function accepts() {
        return !!this.t;
    },
    /**
   * Short for "take transition", this is a method for building/working with
   * state machines.
   *
   * If a state already exists for the given input, returns it.
   *
   * If a token is specified, that state will emit that token when reached by
   * the linkify engine.
   *
   * If no state exists, it will be initialized with some default transitions
   * that resemble existing default transitions.
   *
   * If a state is given for the second argument, that state will be
   * transitioned to on the given input regardless of what that input
   * previously did.
   *
   * @param {string} input character or token to transition on
   * @param {Token|State} tokenOrState transition to a matching state
   * @returns State taken after the given input
   */ tt: function tt(input, tokenOrState) {
        if (tokenOrState && tokenOrState.j) {
            // State, default a basic transition
            this.j[input] = tokenOrState;
            return tokenOrState;
        } // See if there's a direct state transition (not regex or default)
        var token = tokenOrState;
        var nextState = this.j[input];
        if (nextState) {
            if (token) nextState.t = token;
             // overrwites previous token
            return nextState;
        } // Create a new state for this input
        nextState = $410e7a787f87a2b4$var$makeState(); // Take the transition using the usual default mechanisms
        var templateState = $410e7a787f87a2b4$var$takeT(this, input);
        if (templateState) {
            // Some default state transition, make a prime state based on this one
            Object.assign(nextState.j, templateState.j);
            nextState.jr.append(templateState.jr);
            nextState.jr = templateState.jd;
            nextState.t = token || templateState.t;
        } else nextState.t = token;
        this.j[input] = nextState;
        return nextState;
    }
};
/**
 * Utility function to create state without using new keyword (reduced file size
 * when minified)
 */ var $410e7a787f87a2b4$var$makeState = function makeState() {
    return new $410e7a787f87a2b4$var$State();
};
/**
 * Similar to previous except it is an accepting state that emits a token
 * @param {Token} token
 */ var $410e7a787f87a2b4$var$makeAcceptingState = function makeAcceptingState(token) {
    return new $410e7a787f87a2b4$var$State(token);
};
/**
 * Create a transition from startState to nextState via the given character
 * @param {State} startState transition from thie starting state
 * @param {Token} input via this input character or other concrete token type
 * @param {State} nextState to this next state
 */ var $410e7a787f87a2b4$var$makeT = function makeT(startState, input, nextState) {
    // IMPLEMENTATION 1: Add to object (fast)
    if (!startState.j[input]) startState.j[input] = nextState;
     // IMPLEMENTATION 2: Add to array (slower)
// startState.j.push([input, nextState]);
};
/**
 *
 * @param {State} startState stransition from this starting state
 * @param {RegExp} regex Regular expression to match on input
 * @param {State} nextState transition to this next state if there's are regex match
 */ var $410e7a787f87a2b4$var$makeRegexT = function makeRegexT(startState, regex, nextState) {
    startState.jr.push([
        regex,
        nextState
    ]);
};
/**
 * Follow the transition from the given character to the next state
 * @param {State} state
 * @param {Token} input character or other concrete token type to transition
 * @returns {?State} the next state, if any
 */ var $410e7a787f87a2b4$var$takeT = function takeT(state, input) {
    // IMPLEMENTATION 1: Object key lookup (faster)
    var nextState = state.j[input];
    if (nextState) return nextState;
     // IMPLEMENTATION 2: List lookup (slower)
    // Loop through all the state transitions and see if there's a match
    // for (let i = 0; i < state.j.length; i++) {
    //	const val = state.j[i][0];
    //	const nextState = state.j[i][1];
    // 	if (input === val) { return nextState; }
    // }
    for(var i = 0; i < state.jr.length; i++){
        var regex = state.jr[i][0];
        var _nextState = state.jr[i][1];
        if (regex.test(input)) return _nextState;
    } // Nowhere left to jump! Return default, if any
    return state.jd;
};
/**
 * Similar to makeT, but takes a list of characters that all transition to the
 * same nextState startState
 * @param {State} startState
 * @param {Array} chars
 * @param {State} nextState
 */ var $410e7a787f87a2b4$var$makeMultiT = function makeMultiT(startState, chars, nextState) {
    for(var i = 0; i < chars.length; i++)$410e7a787f87a2b4$var$makeT(startState, chars[i], nextState);
};
/**
 * Set up a list of multiple transitions at once. transitions is a list of
 * tuples, where the first element is the transitions character and the second
 * is the state to transition to
 * @param {State} startState
 * @param {Array} transitions
 */ var $410e7a787f87a2b4$var$makeBatchT = function makeBatchT(startState, transitions) {
    for(var i = 0; i < transitions.length; i++){
        var input = transitions[i][0];
        var nextState = transitions[i][1];
        $410e7a787f87a2b4$var$makeT(startState, input, nextState);
    }
};
/**
 * For state machines that transition on characters only; given a non-empty
 * target string, generates states (if required) for each consecutive substring
 * of characters starting from the beginning of the string. The final state will
 * have a special value, as specified in options. All other "in between"
 * substrings will have a default end state.
 *
 * This turns the state machine into a Trie-like data structure (rather than a
 * intelligently-designed DFA).
 * @param {State} state
 * @param {string} str
 * @param {Token} endStateFactory
 * @param {Token} defaultStateFactory
 */ var $410e7a787f87a2b4$var$makeChainT = function makeChainT(state, str, endState, defaultStateFactory) {
    var i = 0, len = str.length, nextState; // Find the next state without a jump to the next character
    while(i < len && (nextState = state.j[str[i]])){
        state = nextState;
        i++;
    }
    if (i >= len) return [];
     // no new tokens were added
    while(i < len - 1){
        nextState = defaultStateFactory();
        $410e7a787f87a2b4$var$makeT(state, str[i], nextState);
        state = nextState;
        i++;
    }
    $410e7a787f87a2b4$var$makeT(state, str[len - 1], endState);
};
/******************************************************************************
	Text Tokens
	Tokens composed of strings
******************************************************************************/ // A valid web domain token
var $410e7a787f87a2b4$var$DOMAIN = "DOMAIN";
var $410e7a787f87a2b4$var$LOCALHOST = "LOCALHOST"; // special case of domain
// Valid top-level domain (see tlds.js)
var $410e7a787f87a2b4$var$TLD = "TLD"; // Any sequence of digits 0-9
var $410e7a787f87a2b4$var$NUM = "NUM"; // A web URL protocol. Supported types include
// - `http:`
// - `https:`
// - `ftp:`
// - `ftps:`
// - user-defined custom protocols
var $410e7a787f87a2b4$var$PROTOCOL = "PROTOCOL"; // Start of the email URI protocol
var $410e7a787f87a2b4$var$MAILTO = "MAILTO"; // mailto:
// Any number of consecutive whitespace characters that are not newline
var $410e7a787f87a2b4$var$WS = "WS"; // New line (unix style)
var $410e7a787f87a2b4$var$NL = "NL"; // \n
// Opening/closing bracket classes
var $410e7a787f87a2b4$var$OPENBRACE = "OPENBRACE"; // {
var $410e7a787f87a2b4$var$OPENBRACKET = "OPENBRACKET"; // [
var $410e7a787f87a2b4$var$OPENANGLEBRACKET = "OPENANGLEBRACKET"; // <
var $410e7a787f87a2b4$var$OPENPAREN = "OPENPAREN"; // (
var $410e7a787f87a2b4$var$CLOSEBRACE = "CLOSEBRACE"; // }
var $410e7a787f87a2b4$var$CLOSEBRACKET = "CLOSEBRACKET"; // ]
var $410e7a787f87a2b4$var$CLOSEANGLEBRACKET = "CLOSEANGLEBRACKET"; // >
var $410e7a787f87a2b4$var$CLOSEPAREN = "CLOSEPAREN"; // )
// Various symbols
var $410e7a787f87a2b4$var$AMPERSAND = "AMPERSAND"; // &
var $410e7a787f87a2b4$var$APOSTROPHE = "APOSTROPHE"; // '
var $410e7a787f87a2b4$var$ASTERISK = "ASTERISK"; // *
var $410e7a787f87a2b4$var$AT = "AT"; // @
var $410e7a787f87a2b4$var$BACKSLASH = "BACKSLASH"; // \
var $410e7a787f87a2b4$var$BACKTICK = "BACKTICK"; // `
var $410e7a787f87a2b4$var$CARET = "CARET"; // ^
var $410e7a787f87a2b4$var$COLON = "COLON"; // :
var $410e7a787f87a2b4$var$COMMA = "COMMA"; // ,
var $410e7a787f87a2b4$var$DOLLAR = "DOLLAR"; // $
var $410e7a787f87a2b4$var$DOT = "DOT"; // .
var $410e7a787f87a2b4$var$EQUALS = "EQUALS"; // =
var $410e7a787f87a2b4$var$EXCLAMATION = "EXCLAMATION"; // !
var $410e7a787f87a2b4$var$HYPHEN = "HYPHEN"; // -
var $410e7a787f87a2b4$var$PERCENT = "PERCENT"; // %
var $410e7a787f87a2b4$var$PIPE = "PIPE"; // |
var $410e7a787f87a2b4$var$PLUS = "PLUS"; // +
var $410e7a787f87a2b4$var$POUND = "POUND"; // #
var $410e7a787f87a2b4$var$QUERY = "QUERY"; // ?
var $410e7a787f87a2b4$var$QUOTE = "QUOTE"; // "
var $410e7a787f87a2b4$var$SEMI = "SEMI"; // ;
var $410e7a787f87a2b4$var$SLASH = "SLASH"; // /
var $410e7a787f87a2b4$var$TILDE = "TILDE"; // ~
var $410e7a787f87a2b4$var$UNDERSCORE = "UNDERSCORE"; // _
// Default token - anything that is not one of the above
var $410e7a787f87a2b4$var$SYM = "SYM";
var $410e7a787f87a2b4$var$text = /*#__PURE__*/ Object.freeze({
    __proto__: null,
    DOMAIN: $410e7a787f87a2b4$var$DOMAIN,
    LOCALHOST: $410e7a787f87a2b4$var$LOCALHOST,
    TLD: $410e7a787f87a2b4$var$TLD,
    NUM: $410e7a787f87a2b4$var$NUM,
    PROTOCOL: $410e7a787f87a2b4$var$PROTOCOL,
    MAILTO: $410e7a787f87a2b4$var$MAILTO,
    WS: $410e7a787f87a2b4$var$WS,
    NL: $410e7a787f87a2b4$var$NL,
    OPENBRACE: $410e7a787f87a2b4$var$OPENBRACE,
    OPENBRACKET: $410e7a787f87a2b4$var$OPENBRACKET,
    OPENANGLEBRACKET: $410e7a787f87a2b4$var$OPENANGLEBRACKET,
    OPENPAREN: $410e7a787f87a2b4$var$OPENPAREN,
    CLOSEBRACE: $410e7a787f87a2b4$var$CLOSEBRACE,
    CLOSEBRACKET: $410e7a787f87a2b4$var$CLOSEBRACKET,
    CLOSEANGLEBRACKET: $410e7a787f87a2b4$var$CLOSEANGLEBRACKET,
    CLOSEPAREN: $410e7a787f87a2b4$var$CLOSEPAREN,
    AMPERSAND: $410e7a787f87a2b4$var$AMPERSAND,
    APOSTROPHE: $410e7a787f87a2b4$var$APOSTROPHE,
    ASTERISK: $410e7a787f87a2b4$var$ASTERISK,
    AT: $410e7a787f87a2b4$var$AT,
    BACKSLASH: $410e7a787f87a2b4$var$BACKSLASH,
    BACKTICK: $410e7a787f87a2b4$var$BACKTICK,
    CARET: $410e7a787f87a2b4$var$CARET,
    COLON: $410e7a787f87a2b4$var$COLON,
    COMMA: $410e7a787f87a2b4$var$COMMA,
    DOLLAR: $410e7a787f87a2b4$var$DOLLAR,
    DOT: $410e7a787f87a2b4$var$DOT,
    EQUALS: $410e7a787f87a2b4$var$EQUALS,
    EXCLAMATION: $410e7a787f87a2b4$var$EXCLAMATION,
    HYPHEN: $410e7a787f87a2b4$var$HYPHEN,
    PERCENT: $410e7a787f87a2b4$var$PERCENT,
    PIPE: $410e7a787f87a2b4$var$PIPE,
    PLUS: $410e7a787f87a2b4$var$PLUS,
    POUND: $410e7a787f87a2b4$var$POUND,
    QUERY: $410e7a787f87a2b4$var$QUERY,
    QUOTE: $410e7a787f87a2b4$var$QUOTE,
    SEMI: $410e7a787f87a2b4$var$SEMI,
    SLASH: $410e7a787f87a2b4$var$SLASH,
    TILDE: $410e7a787f87a2b4$var$TILDE,
    UNDERSCORE: $410e7a787f87a2b4$var$UNDERSCORE,
    SYM: $410e7a787f87a2b4$var$SYM
});
// NOTE: punycode versions of IDNs are not included here because these will not
// be as commonly used without the http prefix anyway and linkify will already
// force-encode those.
// To be updated with the values in this list
// http://data.iana.org/TLD/tlds-alpha-by-domain.txt
// Version 2021022800, Last Updated Sun Feb 28 07:07:01 2021 UTC
var $410e7a787f87a2b4$var$tlds = "aaa aarp abarth abb abbott abbvie abc able abogado abudhabi ac academy accenture accountant accountants aco actor ad adac ads adult ae aeg aero aetna af afamilycompany afl africa ag agakhan agency ai aig airbus airforce airtel akdn al alfaromeo alibaba alipay allfinanz allstate ally alsace alstom am amazon americanexpress americanfamily amex amfam amica amsterdam analytics android anquan anz ao aol apartments app apple aq aquarelle ar arab aramco archi army arpa art arte as asda asia associates at athleta attorney au auction audi audible audio auspost author auto autos avianca aw aws ax axa az azure ba baby baidu banamex bananarepublic band bank bar barcelona barclaycard barclays barefoot bargains baseball basketball bauhaus bayern bb bbc bbt bbva bcg bcn bd be beats beauty beer bentley berlin best bestbuy bet bf bg bh bharti bi bible bid bike bing bingo bio biz bj black blackfriday blockbuster blog bloomberg blue bm bms bmw bn bnpparibas bo boats boehringer bofa bom bond boo book booking bosch bostik boston bot boutique box br bradesco bridgestone broadway broker brother brussels bs bt budapest bugatti build builders business buy buzz bv bw by bz bzh ca cab cafe cal call calvinklein cam camera camp cancerresearch canon capetown capital capitalone car caravan cards care career careers cars casa case cash casino cat catering catholic cba cbn cbre cbs cc cd center ceo cern cf cfa cfd cg ch chanel channel charity chase chat cheap chintai christmas chrome church ci cipriani circle cisco citadel citi citic city cityeats ck cl claims cleaning click clinic clinique clothing cloud club clubmed cm cn co coach codes coffee college cologne com comcast commbank community company compare computer comsec condos construction consulting contact contractors cooking cookingchannel cool coop corsica country coupon coupons courses cpa cr credit creditcard creditunion cricket crown crs cruise cruises csc cu cuisinella cv cw cx cy cymru cyou cz dabur dad dance data date dating datsun day dclk dds de deal dealer deals degree delivery dell deloitte delta democrat dental dentist desi design dev dhl diamonds diet digital direct directory discount discover dish diy dj dk dm dnp do docs doctor dog domains dot download drive dtv dubai duck dunlop dupont durban dvag dvr dz earth eat ec eco edeka edu education ee eg email emerck energy engineer engineering enterprises epson equipment er ericsson erni es esq estate et etisalat eu eurovision eus events exchange expert exposed express extraspace fage fail fairwinds faith family fan fans farm farmers fashion fast fedex feedback ferrari ferrero fi fiat fidelity fido film final finance financial fire firestone firmdale fish fishing fit fitness fj fk flickr flights flir florist flowers fly fm fo foo food foodnetwork football ford forex forsale forum foundation fox fr free fresenius frl frogans frontdoor frontier ftr fujitsu fujixerox fun fund furniture futbol fyi ga gal gallery gallo gallup game games gap garden gay gb gbiz gd gdn ge gea gent genting george gf gg ggee gh gi gift gifts gives giving gl glade glass gle global globo gm gmail gmbh gmo gmx gn godaddy gold goldpoint golf goo goodyear goog google gop got gov gp gq gr grainger graphics gratis green gripe grocery group gs gt gu guardian gucci guge guide guitars guru gw gy hair hamburg hangout haus hbo hdfc hdfcbank health healthcare help helsinki here hermes hgtv hiphop hisamitsu hitachi hiv hk hkt hm hn hockey holdings holiday homedepot homegoods homes homesense honda horse hospital host hosting hot hoteles hotels hotmail house how hr hsbc ht hu hughes hyatt hyundai ibm icbc ice icu id ie ieee ifm ikano il im imamat imdb immo immobilien in inc industries infiniti info ing ink institute insurance insure int international intuit investments io ipiranga iq ir irish is ismaili ist istanbul it itau itv iveco jaguar java jcb je jeep jetzt jewelry jio jll jm jmp jnj jo jobs joburg jot joy jp jpmorgan jprs juegos juniper kaufen kddi ke kerryhotels kerrylogistics kerryproperties kfh kg kh ki kia kim kinder kindle kitchen kiwi km kn koeln komatsu kosher kp kpmg kpn kr krd kred kuokgroup kw ky kyoto kz la lacaixa lamborghini lamer lancaster lancia land landrover lanxess lasalle lat latino latrobe law lawyer lb lc lds lease leclerc lefrak legal lego lexus lgbt li lidl life lifeinsurance lifestyle lighting like lilly limited limo lincoln linde link lipsy live living lixil lk llc llp loan loans locker locus loft lol london lotte lotto love lpl lplfinancial lr ls lt ltd ltda lu lundbeck luxe luxury lv ly ma macys madrid maif maison makeup man management mango map market marketing markets marriott marshalls maserati mattel mba mc mckinsey md me med media meet melbourne meme memorial men menu merckmsd mg mh miami microsoft mil mini mint mit mitsubishi mk ml mlb mls mm mma mn mo mobi mobile moda moe moi mom monash money monster mormon mortgage moscow moto motorcycles mov movie mp mq mr ms msd mt mtn mtr mu museum mutual mv mw mx my mz na nab nagoya name nationwide natura navy nba nc ne nec net netbank netflix network neustar new news next nextdirect nexus nf nfl ng ngo nhk ni nico nike nikon ninja nissan nissay nl no nokia northwesternmutual norton now nowruz nowtv np nr nra nrw ntt nu nyc nz obi observer off office okinawa olayan olayangroup oldnavy ollo om omega one ong onl online onyourside ooo open oracle orange org organic origins osaka otsuka ott ovh pa page panasonic paris pars partners parts party passagens pay pccw pe pet pf pfizer pg ph pharmacy phd philips phone photo photography photos physio pics pictet pictures pid pin ping pink pioneer pizza pk pl place play playstation plumbing plus pm pn pnc pohl poker politie porn post pr pramerica praxi press prime pro prod productions prof progressive promo properties property protection pru prudential ps pt pub pw pwc py qa qpon quebec quest qvc racing radio raid re read realestate realtor realty recipes red redstone redumbrella rehab reise reisen reit reliance ren rent rentals repair report republican rest restaurant review reviews rexroth rich richardli ricoh ril rio rip rmit ro rocher rocks rodeo rogers room rs rsvp ru rugby ruhr run rw rwe ryukyu sa saarland safe safety sakura sale salon samsclub samsung sandvik sandvikcoromant sanofi sap sarl sas save saxo sb sbi sbs sc sca scb schaeffler schmidt scholarships school schule schwarz science scjohnson scot sd se search seat secure security seek select sener services ses seven sew sex sexy sfr sg sh shangrila sharp shaw shell shia shiksha shoes shop shopping shouji show showtime si silk sina singles site sj sk ski skin sky skype sl sling sm smart smile sn sncf so soccer social softbank software sohu solar solutions song sony soy spa space sport spot spreadbetting sr srl ss st stada staples star statebank statefarm stc stcgroup stockholm storage store stream studio study style su sucks supplies supply support surf surgery suzuki sv swatch swiftcover swiss sx sy sydney systems sz tab taipei talk taobao target tatamotors tatar tattoo tax taxi tc tci td tdk team tech technology tel temasek tennis teva tf tg th thd theater theatre tiaa tickets tienda tiffany tips tires tirol tj tjmaxx tjx tk tkmaxx tl tm tmall tn to today tokyo tools top toray toshiba total tours town toyota toys tr trade trading training travel travelchannel travelers travelersinsurance trust trv tt tube tui tunes tushu tv tvs tw tz ua ubank ubs ug uk unicom university uno uol ups us uy uz va vacations vana vanguard vc ve vegas ventures verisign versicherung vet vg vi viajes video vig viking villas vin vip virgin visa vision viva vivo vlaanderen vn vodka volkswagen volvo vote voting voto voyage vu vuelos wales walmart walter wang wanggou watch watches weather weatherchannel webcam weber website wed wedding weibo weir wf whoswho wien wiki williamhill win windows wine winners wme wolterskluwer woodside work works world wow ws wtc wtf xbox xerox xfinity xihuan xin xxx xyz yachts yahoo yamaxun yandex ye yodobashi yoga yokohama you youtube yt yun za zappos zara zero zip zm zone zuerich zw verm\xf6gensberater-ctb verm\xf6gensberatung-pwb \u03B5\u03BB \u03B5\u03C5 \u0431\u0433 \u0431\u0435\u043B \u0434\u0435\u0442\u0438 \u0435\u044E \u043A\u0430\u0442\u043E\u043B\u0438\u043A \u043A\u043E\u043C \u049B\u0430\u0437 \u043C\u043A\u0434 \u043C\u043E\u043D \u043C\u043E\u0441\u043A\u0432\u0430 \u043E\u043D\u043B\u0430\u0439\u043D \u043E\u0440\u0433 \u0440\u0443\u0441 \u0440\u0444 \u0441\u0430\u0439\u0442 \u0441\u0440\u0431 \u0443\u043A\u0440 \u10D2\u10D4 \u0570\u0561\u0575 \u05D9\u05E9\u05E8\u05D0\u05DC \u05E7\u05D5\u05DD \u0627\u0628\u0648\u0638\u0628\u064A \u0627\u062A\u0635\u0627\u0644\u0627\u062A \u0627\u0631\u0627\u0645\u0643\u0648 \u0627\u0644\u0627\u0631\u062F\u0646 \u0627\u0644\u0628\u062D\u0631\u064A\u0646 \u0627\u0644\u062C\u0632\u0627\u0626\u0631 \u0627\u0644\u0633\u0639\u0648\u062F\u064A\u0629 \u0627\u0644\u0639\u0644\u064A\u0627\u0646 \u0627\u0644\u0645\u063A\u0631\u0628 \u0627\u0645\u0627\u0631\u0627\u062A \u0627\u06CC\u0631\u0627\u0646 \u0628\u0627\u0631\u062A \u0628\u0627\u0632\u0627\u0631 \u0628\u06BE\u0627\u0631\u062A \u0628\u064A\u062A\u0643 \u067E\u0627\u06A9\u0633\u062A\u0627\u0646 \u0680\u0627\u0631\u062A \u062A\u0648\u0646\u0633 \u0633\u0648\u062F\u0627\u0646 \u0633\u0648\u0631\u064A\u0629 \u0634\u0628\u0643\u0629 \u0639\u0631\u0627\u0642 \u0639\u0631\u0628 \u0639\u0645\u0627\u0646 \u0641\u0644\u0633\u0637\u064A\u0646 \u0642\u0637\u0631 \u0643\u0627\u062B\u0648\u0644\u064A\u0643 \u0643\u0648\u0645 \u0645\u0635\u0631 \u0645\u0644\u064A\u0633\u064A\u0627 \u0645\u0648\u0631\u064A\u062A\u0627\u0646\u064A\u0627 \u0645\u0648\u0642\u0639 \u0647\u0645\u0631\u0627\u0647 \u0915\u0949\u092E \u0928\u0947\u091F \u092D\u093E\u0930\u0924 \u092D\u093E\u0930\u0924\u092E\u094D \u092D\u093E\u0930\u094B\u0924 \u0938\u0902\u0917\u0920\u0928 \u09AC\u09BE\u0982\u09B2\u09BE \u09AD\u09BE\u09B0\u09A4 \u09AD\u09BE\u09F0\u09A4 \u0A2D\u0A3E\u0A30\u0A24 \u0AAD\u0ABE\u0AB0\u0AA4 \u0B2D\u0B3E\u0B30\u0B24 \u0B87\u0BA8\u0BCD\u0BA4\u0BBF\u0BAF\u0BBE \u0B87\u0BB2\u0B99\u0BCD\u0B95\u0BC8 \u0B9A\u0BBF\u0B99\u0BCD\u0B95\u0BAA\u0BCD\u0BAA\u0BC2\u0BB0\u0BCD \u0C2D\u0C3E\u0C30\u0C24\u0C4D \u0CAD\u0CBE\u0CB0\u0CA4 \u0D2D\u0D3E\u0D30\u0D24\u0D02 \u0DBD\u0D82\u0D9A\u0DCF \u0E04\u0E2D\u0E21 \u0E44\u0E17\u0E22 \u0EA5\u0EB2\u0EA7 \uB2F7\uB137 \uB2F7\uCEF4 \uC0BC\uC131 \uD55C\uAD6D \u30A2\u30DE\u30BE\u30F3 \u30B0\u30FC\u30B0\u30EB \u30AF\u30E9\u30A6\u30C9 \u30B3\u30E0 \u30B9\u30C8\u30A2 \u30BB\u30FC\u30EB \u30D5\u30A1\u30C3\u30B7\u30E7\u30F3 \u30DD\u30A4\u30F3\u30C8 \u307F\u3093\u306A \u4E16\u754C \u4E2D\u4FE1 \u4E2D\u56FD \u4E2D\u570B \u4E2D\u6587\u7F51 \u4E9A\u9A6C\u900A \u4F01\u4E1A \u4F5B\u5C71 \u4FE1\u606F \u5065\u5EB7 \u516B\u5366 \u516C\u53F8 \u516C\u76CA \u53F0\u6E7E \u53F0\u7063 \u5546\u57CE \u5546\u5E97 \u5546\u6807 \u5609\u91CC \u5609\u91CC\u5927\u9152\u5E97 \u5728\u7EBF \u5927\u4F17\u6C7D\u8F66 \u5927\u62FF \u5929\u4E3B\u6559 \u5A31\u4E50 \u5BB6\u96FB \u5E7F\u4E1C \u5FAE\u535A \u6148\u5584 \u6211\u7231\u4F60 \u624B\u673A \u62DB\u8058 \u653F\u52A1 \u653F\u5E9C \u65B0\u52A0\u5761 \u65B0\u95FB \u65F6\u5C1A \u66F8\u7C4D \u673A\u6784 \u6DE1\u9A6C\u9521 \u6E38\u620F \u6FB3\u9580 \u70B9\u770B \u79FB\u52A8 \u7EC4\u7EC7\u673A\u6784 \u7F51\u5740 \u7F51\u5E97 \u7F51\u7AD9 \u7F51\u7EDC \u8054\u901A \u8BFA\u57FA\u4E9A \u8C37\u6B4C \u8D2D\u7269 \u901A\u8CA9 \u96C6\u56E2 \u96FB\u8A0A\u76C8\u79D1 \u98DE\u5229\u6D66 \u98DF\u54C1 \u9910\u5385 \u9999\u683C\u91CC\u62C9 \u9999\u6E2F".split(" ");
/**
	The scanner provides an interface that takes a string of text as input, and
	outputs an array of tokens instances that can be used for easy URL parsing.

	@module linkify
	@submodule scanner
	@main scanner
*/ var $410e7a787f87a2b4$var$LETTER = /(?:[A-Za-z\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0560-\u0588\u05D0-\u05EA\u05EF-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u0870-\u0887\u0889-\u088E\u08A0-\u08C9\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C5D\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D04-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E86-\u0E8A\u0E8C-\u0EA3\u0EA5\u0EA7-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16F1-\u16F8\u1700-\u1711\u171F-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1878\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4C\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1C90-\u1CBA\u1CBD-\u1CBF\u1CE9-\u1CEC\u1CEE-\u1CF3\u1CF5\u1CF6\u1CFA\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312F\u3131-\u318E\u31A0-\u31BF\u31F0-\u31FF\u3400-\u4DBF\u4E00-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA7CA\uA7D0\uA7D1\uA7D3\uA7D5-\uA7D9\uA7F2-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA8FE\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB69\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF2D-\uDF40\uDF42-\uDF49\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF]|\uD801[\uDC00-\uDC9D\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDD70-\uDD7A\uDD7C-\uDD8A\uDD8C-\uDD92\uDD94\uDD95\uDD97-\uDDA1\uDDA3-\uDDB1\uDDB3-\uDDB9\uDDBB\uDDBC\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67\uDF80-\uDF85\uDF87-\uDFB0\uDFB2-\uDFBA]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE35\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2\uDD00-\uDD23\uDE80-\uDEA9\uDEB0\uDEB1\uDF00-\uDF1C\uDF27\uDF30-\uDF45\uDF70-\uDF81\uDFB0-\uDFC4\uDFE0-\uDFF6]|\uD804[\uDC03-\uDC37\uDC71\uDC72\uDC75\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD44\uDD47\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC5F-\uDC61\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDEB8\uDF00-\uDF1A\uDF40-\uDF46]|\uD806[\uDC00-\uDC2B\uDCA0-\uDCDF\uDCFF-\uDD06\uDD09\uDD0C-\uDD13\uDD15\uDD16\uDD18-\uDD2F\uDD3F\uDD41\uDDA0-\uDDA7\uDDAA-\uDDD0\uDDE1\uDDE3\uDE00\uDE0B-\uDE32\uDE3A\uDE50\uDE5C-\uDE89\uDE9D\uDEB0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC72-\uDC8F\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD30\uDD46\uDD60-\uDD65\uDD67\uDD68\uDD6A-\uDD89\uDD98\uDEE0-\uDEF2\uDFB0]|\uD808[\uDC00-\uDF99]|\uD809[\uDC80-\uDD43]|\uD80B[\uDF90-\uDFF0]|[\uD80C\uD81C-\uD820\uD822\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879\uD880-\uD883][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE70-\uDEBE\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDE40-\uDE7F\uDF00-\uDF4A\uDF50\uDF93-\uDF9F\uDFE0\uDFE1\uDFE3]|\uD821[\uDC00-\uDFF7]|\uD823[\uDC00-\uDCD5\uDD00-\uDD08]|\uD82B[\uDFF0-\uDFF3\uDFF5-\uDFFB\uDFFD\uDFFE]|\uD82C[\uDC00-\uDD22\uDD50-\uDD52\uDD64-\uDD67\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD837[\uDF00-\uDF1E]|\uD838[\uDD00-\uDD2C\uDD37-\uDD3D\uDD4E\uDE90-\uDEAD\uDEC0-\uDEEB]|\uD839[\uDFE0-\uDFE6\uDFE8-\uDFEB\uDFED\uDFEE\uDFF0-\uDFFE]|\uD83A[\uDC00-\uDCC4\uDD00-\uDD43\uDD4B]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDEDF\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF38\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]|\uD884[\uDC00-\uDF4A])/; // Any Unicode character with letter data type
var $410e7a787f87a2b4$var$EMOJI = /(?:[#\*0-9\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u23CF\u23E9-\u23F3\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB-\u25FE\u2600-\u2604\u260E\u2611\u2614\u2615\u2618\u261D\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u2648-\u2653\u265F\u2660\u2663\u2665\u2666\u2668\u267B\u267E\u267F\u2692-\u2697\u2699\u269B\u269C\u26A0\u26A1\u26A7\u26AA\u26AB\u26B0\u26B1\u26BD\u26BE\u26C4\u26C5\u26C8\u26CE\u26CF\u26D1\u26D3\u26D4\u26E9\u26EA\u26F0-\u26F5\u26F7-\u26FA\u26FD\u2702\u2705\u2708-\u270D\u270F\u2712\u2714\u2716\u271D\u2721\u2728\u2733\u2734\u2744\u2747\u274C\u274E\u2753-\u2755\u2757\u2763\u2764\u2795-\u2797\u27A1\u27B0\u27BF\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B50\u2B55\u3030\u303D\u3297\u3299]|\uD83C[\uDC04\uDCCF\uDD70\uDD71\uDD7E\uDD7F\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE02\uDE1A\uDE2F\uDE32-\uDE3A\uDE50\uDE51\uDF00-\uDF21\uDF24-\uDF93\uDF96\uDF97\uDF99-\uDF9B\uDF9E-\uDFF0\uDFF3-\uDFF5\uDFF7-\uDFFF]|\uD83D[\uDC00-\uDCFD\uDCFF-\uDD3D\uDD49-\uDD4E\uDD50-\uDD67\uDD6F\uDD70\uDD73-\uDD7A\uDD87\uDD8A-\uDD8D\uDD90\uDD95\uDD96\uDDA4\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA-\uDE4F\uDE80-\uDEC5\uDECB-\uDED2\uDED5-\uDED7\uDEDD-\uDEE5\uDEE9\uDEEB\uDEEC\uDEF0\uDEF3-\uDEFC\uDFE0-\uDFEB\uDFF0]|\uD83E[\uDD0C-\uDD3A\uDD3C-\uDD45\uDD47-\uDDFF\uDE70-\uDE74\uDE78-\uDE7C\uDE80-\uDE86\uDE90-\uDEAC\uDEB0-\uDEBA\uDEC0-\uDEC5\uDED0-\uDED9\uDEE0-\uDEE7\uDEF0-\uDEF6])/; // Any Unicode emoji character
var $410e7a787f87a2b4$var$EMOJI_VARIATION = /\uFE0F/; // Variation selector, follows heart and others
var $410e7a787f87a2b4$var$DIGIT = /\d/;
var $410e7a787f87a2b4$var$SPACE = /\s/;
/**
 * Initialize the scanner character-based state machine for the given start state
 * @return {State} scanner starting state
 */ function $410e7a787f87a2b4$var$init$2() {
    var customProtocols = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    // Frequently used states
    var S_START = $410e7a787f87a2b4$var$makeState();
    var S_NUM = $410e7a787f87a2b4$var$makeAcceptingState($410e7a787f87a2b4$var$NUM);
    var S_DOMAIN = $410e7a787f87a2b4$var$makeAcceptingState($410e7a787f87a2b4$var$DOMAIN);
    var S_DOMAIN_HYPHEN = $410e7a787f87a2b4$var$makeState(); // domain followed by 1 or more hyphen characters
    var S_WS = $410e7a787f87a2b4$var$makeAcceptingState($410e7a787f87a2b4$var$WS);
    var DOMAIN_REGEX_TRANSITIONS = [
        [
            $410e7a787f87a2b4$var$DIGIT,
            S_DOMAIN
        ],
        [
            $410e7a787f87a2b4$var$LETTER,
            S_DOMAIN
        ],
        [
            $410e7a787f87a2b4$var$EMOJI,
            S_DOMAIN
        ],
        [
            $410e7a787f87a2b4$var$EMOJI_VARIATION,
            S_DOMAIN
        ]
    ]; // Create a state which emits a domain token
    var makeDomainState = function makeDomainState() {
        var state = $410e7a787f87a2b4$var$makeAcceptingState($410e7a787f87a2b4$var$DOMAIN);
        state.j = {
            "-": S_DOMAIN_HYPHEN
        };
        state.jr = [].concat(DOMAIN_REGEX_TRANSITIONS);
        return state;
    }; // Create a state which does not emit a domain state but the usual alphanumeric
    // transitions are domains
    var makeNearDomainState = function makeNearDomainState(token) {
        var state = makeDomainState();
        state.t = token;
        return state;
    }; // States for special URL symbols that accept immediately after start
    $410e7a787f87a2b4$var$makeBatchT(S_START, [
        [
            "'",
            $410e7a787f87a2b4$var$makeAcceptingState($410e7a787f87a2b4$var$APOSTROPHE)
        ],
        [
            "{",
            $410e7a787f87a2b4$var$makeAcceptingState($410e7a787f87a2b4$var$OPENBRACE)
        ],
        [
            "[",
            $410e7a787f87a2b4$var$makeAcceptingState($410e7a787f87a2b4$var$OPENBRACKET)
        ],
        [
            "<",
            $410e7a787f87a2b4$var$makeAcceptingState($410e7a787f87a2b4$var$OPENANGLEBRACKET)
        ],
        [
            "(",
            $410e7a787f87a2b4$var$makeAcceptingState($410e7a787f87a2b4$var$OPENPAREN)
        ],
        [
            "}",
            $410e7a787f87a2b4$var$makeAcceptingState($410e7a787f87a2b4$var$CLOSEBRACE)
        ],
        [
            "]",
            $410e7a787f87a2b4$var$makeAcceptingState($410e7a787f87a2b4$var$CLOSEBRACKET)
        ],
        [
            ">",
            $410e7a787f87a2b4$var$makeAcceptingState($410e7a787f87a2b4$var$CLOSEANGLEBRACKET)
        ],
        [
            ")",
            $410e7a787f87a2b4$var$makeAcceptingState($410e7a787f87a2b4$var$CLOSEPAREN)
        ],
        [
            "&",
            $410e7a787f87a2b4$var$makeAcceptingState($410e7a787f87a2b4$var$AMPERSAND)
        ],
        [
            "*",
            $410e7a787f87a2b4$var$makeAcceptingState($410e7a787f87a2b4$var$ASTERISK)
        ],
        [
            "@",
            $410e7a787f87a2b4$var$makeAcceptingState($410e7a787f87a2b4$var$AT)
        ],
        [
            "`",
            $410e7a787f87a2b4$var$makeAcceptingState($410e7a787f87a2b4$var$BACKTICK)
        ],
        [
            "^",
            $410e7a787f87a2b4$var$makeAcceptingState($410e7a787f87a2b4$var$CARET)
        ],
        [
            ":",
            $410e7a787f87a2b4$var$makeAcceptingState($410e7a787f87a2b4$var$COLON)
        ],
        [
            ",",
            $410e7a787f87a2b4$var$makeAcceptingState($410e7a787f87a2b4$var$COMMA)
        ],
        [
            "$",
            $410e7a787f87a2b4$var$makeAcceptingState($410e7a787f87a2b4$var$DOLLAR)
        ],
        [
            ".",
            $410e7a787f87a2b4$var$makeAcceptingState($410e7a787f87a2b4$var$DOT)
        ],
        [
            "=",
            $410e7a787f87a2b4$var$makeAcceptingState($410e7a787f87a2b4$var$EQUALS)
        ],
        [
            "!",
            $410e7a787f87a2b4$var$makeAcceptingState($410e7a787f87a2b4$var$EXCLAMATION)
        ],
        [
            "-",
            $410e7a787f87a2b4$var$makeAcceptingState($410e7a787f87a2b4$var$HYPHEN)
        ],
        [
            "%",
            $410e7a787f87a2b4$var$makeAcceptingState($410e7a787f87a2b4$var$PERCENT)
        ],
        [
            "|",
            $410e7a787f87a2b4$var$makeAcceptingState($410e7a787f87a2b4$var$PIPE)
        ],
        [
            "+",
            $410e7a787f87a2b4$var$makeAcceptingState($410e7a787f87a2b4$var$PLUS)
        ],
        [
            "#",
            $410e7a787f87a2b4$var$makeAcceptingState($410e7a787f87a2b4$var$POUND)
        ],
        [
            "?",
            $410e7a787f87a2b4$var$makeAcceptingState($410e7a787f87a2b4$var$QUERY)
        ],
        [
            '"',
            $410e7a787f87a2b4$var$makeAcceptingState($410e7a787f87a2b4$var$QUOTE)
        ],
        [
            "/",
            $410e7a787f87a2b4$var$makeAcceptingState($410e7a787f87a2b4$var$SLASH)
        ],
        [
            ";",
            $410e7a787f87a2b4$var$makeAcceptingState($410e7a787f87a2b4$var$SEMI)
        ],
        [
            "~",
            $410e7a787f87a2b4$var$makeAcceptingState($410e7a787f87a2b4$var$TILDE)
        ],
        [
            "_",
            $410e7a787f87a2b4$var$makeAcceptingState($410e7a787f87a2b4$var$UNDERSCORE)
        ],
        [
            "\\",
            $410e7a787f87a2b4$var$makeAcceptingState($410e7a787f87a2b4$var$BACKSLASH)
        ]
    ]); // Whitespace jumps
    // Tokens of only non-newline whitespace are arbitrarily long
    $410e7a787f87a2b4$var$makeT(S_START, "\n", $410e7a787f87a2b4$var$makeAcceptingState($410e7a787f87a2b4$var$NL));
    $410e7a787f87a2b4$var$makeRegexT(S_START, $410e7a787f87a2b4$var$SPACE, S_WS); // If any whitespace except newline, more whitespace!
    $410e7a787f87a2b4$var$makeT(S_WS, "\n", $410e7a787f87a2b4$var$makeState()); // non-accepting state
    $410e7a787f87a2b4$var$makeRegexT(S_WS, $410e7a787f87a2b4$var$SPACE, S_WS); // Generates states for top-level domains
    // Note that this is most accurate when tlds are in alphabetical order
    for(var i = 0; i < $410e7a787f87a2b4$var$tlds.length; i++)$410e7a787f87a2b4$var$makeChainT(S_START, $410e7a787f87a2b4$var$tlds[i], makeNearDomainState($410e7a787f87a2b4$var$TLD), makeDomainState);
     // Collect the states generated by different protocls
    var S_PROTOCOL_FILE = makeDomainState();
    var S_PROTOCOL_FTP = makeDomainState();
    var S_PROTOCOL_HTTP = makeDomainState();
    var S_MAILTO = makeDomainState();
    $410e7a787f87a2b4$var$makeChainT(S_START, "file", S_PROTOCOL_FILE, makeDomainState);
    $410e7a787f87a2b4$var$makeChainT(S_START, "ftp", S_PROTOCOL_FTP, makeDomainState);
    $410e7a787f87a2b4$var$makeChainT(S_START, "http", S_PROTOCOL_HTTP, makeDomainState);
    $410e7a787f87a2b4$var$makeChainT(S_START, "mailto", S_MAILTO, makeDomainState); // Protocol states
    var S_PROTOCOL_SECURE = makeDomainState();
    var S_FULL_PROTOCOL = $410e7a787f87a2b4$var$makeAcceptingState($410e7a787f87a2b4$var$PROTOCOL); // Full protocol ends with COLON
    var S_FULL_MAILTO = $410e7a787f87a2b4$var$makeAcceptingState($410e7a787f87a2b4$var$MAILTO); // Mailto ends with COLON
    // Secure protocols (end with 's')
    $410e7a787f87a2b4$var$makeT(S_PROTOCOL_FTP, "s", S_PROTOCOL_SECURE);
    $410e7a787f87a2b4$var$makeT(S_PROTOCOL_FTP, ":", S_FULL_PROTOCOL);
    $410e7a787f87a2b4$var$makeT(S_PROTOCOL_HTTP, "s", S_PROTOCOL_SECURE);
    $410e7a787f87a2b4$var$makeT(S_PROTOCOL_HTTP, ":", S_FULL_PROTOCOL); // Become protocol tokens after a COLON
    $410e7a787f87a2b4$var$makeT(S_PROTOCOL_FILE, ":", S_FULL_PROTOCOL);
    $410e7a787f87a2b4$var$makeT(S_PROTOCOL_SECURE, ":", S_FULL_PROTOCOL);
    $410e7a787f87a2b4$var$makeT(S_MAILTO, ":", S_FULL_MAILTO); // Register custom protocols
    var S_CUSTOM_PROTOCOL = makeDomainState();
    for(var _i = 0; _i < customProtocols.length; _i++)$410e7a787f87a2b4$var$makeChainT(S_START, customProtocols[_i], S_CUSTOM_PROTOCOL, makeDomainState);
    $410e7a787f87a2b4$var$makeT(S_CUSTOM_PROTOCOL, ":", S_FULL_PROTOCOL); // Localhost
    $410e7a787f87a2b4$var$makeChainT(S_START, "localhost", makeNearDomainState($410e7a787f87a2b4$var$LOCALHOST), makeDomainState); // Everything else
    // DOMAINs make more DOMAINs
    // Number and character transitions
    $410e7a787f87a2b4$var$makeRegexT(S_START, $410e7a787f87a2b4$var$DIGIT, S_NUM);
    $410e7a787f87a2b4$var$makeRegexT(S_START, $410e7a787f87a2b4$var$LETTER, S_DOMAIN);
    $410e7a787f87a2b4$var$makeRegexT(S_START, $410e7a787f87a2b4$var$EMOJI, S_DOMAIN);
    $410e7a787f87a2b4$var$makeRegexT(S_START, $410e7a787f87a2b4$var$EMOJI_VARIATION, S_DOMAIN);
    $410e7a787f87a2b4$var$makeRegexT(S_NUM, $410e7a787f87a2b4$var$DIGIT, S_NUM);
    $410e7a787f87a2b4$var$makeRegexT(S_NUM, $410e7a787f87a2b4$var$LETTER, S_DOMAIN); // number becomes DOMAIN
    $410e7a787f87a2b4$var$makeRegexT(S_NUM, $410e7a787f87a2b4$var$EMOJI, S_DOMAIN); // number becomes DOMAIN
    $410e7a787f87a2b4$var$makeRegexT(S_NUM, $410e7a787f87a2b4$var$EMOJI_VARIATION, S_DOMAIN); // number becomes DOMAIN
    $410e7a787f87a2b4$var$makeT(S_NUM, "-", S_DOMAIN_HYPHEN); // Default domain transitions
    $410e7a787f87a2b4$var$makeT(S_DOMAIN, "-", S_DOMAIN_HYPHEN);
    $410e7a787f87a2b4$var$makeT(S_DOMAIN_HYPHEN, "-", S_DOMAIN_HYPHEN);
    $410e7a787f87a2b4$var$makeRegexT(S_DOMAIN, $410e7a787f87a2b4$var$DIGIT, S_DOMAIN);
    $410e7a787f87a2b4$var$makeRegexT(S_DOMAIN, $410e7a787f87a2b4$var$LETTER, S_DOMAIN);
    $410e7a787f87a2b4$var$makeRegexT(S_DOMAIN, $410e7a787f87a2b4$var$EMOJI, S_DOMAIN);
    $410e7a787f87a2b4$var$makeRegexT(S_DOMAIN, $410e7a787f87a2b4$var$EMOJI_VARIATION, S_DOMAIN);
    $410e7a787f87a2b4$var$makeRegexT(S_DOMAIN_HYPHEN, $410e7a787f87a2b4$var$DIGIT, S_DOMAIN);
    $410e7a787f87a2b4$var$makeRegexT(S_DOMAIN_HYPHEN, $410e7a787f87a2b4$var$LETTER, S_DOMAIN);
    $410e7a787f87a2b4$var$makeRegexT(S_DOMAIN_HYPHEN, $410e7a787f87a2b4$var$EMOJI, S_DOMAIN);
    $410e7a787f87a2b4$var$makeRegexT(S_DOMAIN_HYPHEN, $410e7a787f87a2b4$var$EMOJI_VARIATION, S_DOMAIN); // Set default transition for start state (some symbol)
    S_START.jd = $410e7a787f87a2b4$var$makeAcceptingState($410e7a787f87a2b4$var$SYM);
    return S_START;
}
/**
	Given a string, returns an array of TOKEN instances representing the
	composition of that string.

	@method run
	@param {State} start scanner starting state
	@param {string} str input string to scan
	@return {{t: string, v: string, s: number, l: number}[]} list of tokens, each with a type and value
*/ function $410e7a787f87a2b4$var$run$1(start, str) {
    // State machine is not case sensitive, so input is tokenized in lowercased
    // form (still returns the regular case though) Uses selective `toLowerCase`
    // is used because lowercasing the entire string causes the length and
    // character position to vary in some non-English strings with V8-based
    // runtimes.
    var iterable = $410e7a787f87a2b4$var$stringToArray(str.replace(/[A-Z]/g, function(c) {
        return c.toLowerCase();
    }));
    var charCount = iterable.length; // <= len if there are emojis, etc
    var tokens = []; // return value
    // cursor through the string itself, accounting for characters that have
    // width with length 2 such as emojis
    var cursor = 0; // Cursor through the array-representation of the string
    var charCursor = 0; // Tokenize the string
    while(charCursor < charCount){
        var state = start;
        var nextState = null;
        var tokenLength = 0;
        var latestAccepting = null;
        var sinceAccepts = -1;
        var charsSinceAccepts = -1;
        while(charCursor < charCount && (nextState = $410e7a787f87a2b4$var$takeT(state, iterable[charCursor]))){
            state = nextState; // Keep track of the latest accepting state
            if (state.accepts()) {
                sinceAccepts = 0;
                charsSinceAccepts = 0;
                latestAccepting = state;
            } else if (sinceAccepts >= 0) {
                sinceAccepts += iterable[charCursor].length;
                charsSinceAccepts++;
            }
            tokenLength += iterable[charCursor].length;
            cursor += iterable[charCursor].length;
            charCursor++;
        } // Roll back to the latest accepting state
        cursor -= sinceAccepts;
        charCursor -= charsSinceAccepts;
        tokenLength -= sinceAccepts; // No more jumps, just make a new token from the last accepting one
        // TODO: If possible, don't output v, instead output range where values ocur
        tokens.push({
            t: latestAccepting.t,
            // token type/name
            v: str.substr(cursor - tokenLength, tokenLength),
            // string value
            s: cursor - tokenLength,
            // start index
            e: cursor // end index (excluding)
        });
    }
    return tokens;
}
/**
 * Convert a String to an Array of characters, taking into account that some
 * characters like emojis take up two string indexes.
 *
 * Adapted from core-js (MIT license)
 * https://github.com/zloirock/core-js/blob/2d69cf5f99ab3ea3463c395df81e5a15b68f49d9/packages/core-js/internals/string-multibyte.js
 *
 * @function stringToArray
 * @param {string} str
 * @returns {string[]}
 */ function $410e7a787f87a2b4$var$stringToArray(str) {
    var result = [];
    var len = str.length;
    var index = 0;
    while(index < len){
        var first = str.charCodeAt(index);
        var second = void 0;
        var char = first < 0xd800 || first > 0xdbff || index + 1 === len || (second = str.charCodeAt(index + 1)) < 0xdc00 || second > 0xdfff ? str[index] // single character
         : str.slice(index, index + 2); // two-index characters
        result.push(char);
        index += char.length;
    }
    return result;
}
function $410e7a787f87a2b4$var$_typeof(obj) {
    "@babel/helpers - typeof";
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") $410e7a787f87a2b4$var$_typeof = function _typeof(obj) {
        return typeof obj;
    };
    else $410e7a787f87a2b4$var$_typeof = function _typeof(obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
    return $410e7a787f87a2b4$var$_typeof(obj);
}
/**
 * @property {string} defaultProtocol
 * @property {{[string]: (event) => void}]} [events]
 */ var $410e7a787f87a2b4$var$defaults = {
    defaultProtocol: "http",
    events: null,
    format: $410e7a787f87a2b4$var$noop,
    formatHref: $410e7a787f87a2b4$var$noop,
    nl2br: false,
    tagName: "a",
    target: null,
    rel: null,
    validate: true,
    truncate: 0,
    className: null,
    attributes: null,
    ignoreTags: []
};
/**
 * @class Options
 * @param {Object} [opts] Set option properties besides the defaults
 */ function $410e7a787f87a2b4$export$c019608e5b5bb4cb(opts) {
    opts = opts || {};
    this.defaultProtocol = "defaultProtocol" in opts ? opts.defaultProtocol : $410e7a787f87a2b4$var$defaults.defaultProtocol;
    this.events = "events" in opts ? opts.events : $410e7a787f87a2b4$var$defaults.events;
    this.format = "format" in opts ? opts.format : $410e7a787f87a2b4$var$defaults.format;
    this.formatHref = "formatHref" in opts ? opts.formatHref : $410e7a787f87a2b4$var$defaults.formatHref;
    this.nl2br = "nl2br" in opts ? opts.nl2br : $410e7a787f87a2b4$var$defaults.nl2br;
    this.tagName = "tagName" in opts ? opts.tagName : $410e7a787f87a2b4$var$defaults.tagName;
    this.target = "target" in opts ? opts.target : $410e7a787f87a2b4$var$defaults.target;
    this.rel = "rel" in opts ? opts.rel : $410e7a787f87a2b4$var$defaults.rel;
    this.validate = "validate" in opts ? opts.validate : $410e7a787f87a2b4$var$defaults.validate;
    this.truncate = "truncate" in opts ? opts.truncate : $410e7a787f87a2b4$var$defaults.truncate;
    this.className = "className" in opts ? opts.className : $410e7a787f87a2b4$var$defaults.className;
    this.attributes = opts.attributes || $410e7a787f87a2b4$var$defaults.attributes;
    this.ignoreTags = []; // Make all tags names upper case
    var ignoredTags = "ignoreTags" in opts ? opts.ignoreTags : $410e7a787f87a2b4$var$defaults.ignoreTags;
    for(var i = 0; i < ignoredTags.length; i++)this.ignoreTags.push(ignoredTags[i].toUpperCase());
}
$410e7a787f87a2b4$export$c019608e5b5bb4cb.prototype = {
    /**
   * Given the token, return all options for how it should be displayed
   */ resolve: function resolve(token) {
        var href = token.toHref(this.defaultProtocol);
        return {
            formatted: this.get("format", token.toString(), token),
            formattedHref: this.get("formatHref", href, token),
            tagName: this.get("tagName", href, token),
            className: this.get("className", href, token),
            target: this.get("target", href, token),
            rel: this.get("rel", href, token),
            events: this.getObject("events", href, token),
            attributes: this.getObject("attributes", href, token),
            truncate: this.get("truncate", href, token)
        };
    },
    /**
   * Returns true or false based on whether a token should be displayed as a
   * link based on the user options. By default,
   */ check: function check(token) {
        return this.get("validate", token.toString(), token);
    },
    // Private methods
    /**
   * Resolve an option's value based on the value of the option and the given
   * params.
   * @param {string} key Name of option to use
   * @param operator will be passed to the target option if it's method
   * @param {MultiToken} token The token from linkify.tokenize
   */ get: function get(key, operator, token) {
        var option = this[key];
        if (!option) return option;
        var optionValue;
        switch($410e7a787f87a2b4$var$_typeof(option)){
            case "function":
                return option(operator, token.t);
            case "object":
                optionValue = token.t in option ? option[token.t] : $410e7a787f87a2b4$var$defaults[key];
                return typeof optionValue === "function" ? optionValue(operator, token.t) : optionValue;
        }
        return option;
    },
    getObject: function getObject(key, operator, token) {
        var option = this[key];
        return typeof option === "function" ? option(operator, token.t) : option;
    }
};
function $410e7a787f87a2b4$var$noop(val) {
    return val;
}
var $410e7a787f87a2b4$export$41c562ebe57d11e2 = /*#__PURE__*/ Object.freeze({
    __proto__: null,
    defaults: $410e7a787f87a2b4$var$defaults,
    Options: $410e7a787f87a2b4$export$c019608e5b5bb4cb
});
/******************************************************************************
	Multi-Tokens
	Tokens composed of arrays of TextTokens
******************************************************************************/ function $410e7a787f87a2b4$var$inherits(parent, child) {
    var props = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var extended = Object.create(parent.prototype);
    for(var p in props)extended[p] = props[p];
    extended.constructor = child;
    child.prototype = extended;
    return child;
}
/**
	Abstract class used for manufacturing tokens of text tokens. That is rather
	than the value for a token being a small string of text, it's value an array
	of text tokens.

	Used for grouping together URLs, emails, hashtags, and other potential
	creations.

	@class MultiToken
	@param {string} value
	@param {{t: string, v: string, s: number, e: number}[]} tokens
	@abstract
*/ function $410e7a787f87a2b4$var$MultiToken() {}
$410e7a787f87a2b4$var$MultiToken.prototype = {
    /**
  	String representing the type for this token
  	@property t
  	@default 'token'
  */ t: "token",
    /**
  	Is this multitoken a link?
  	@property isLink
  	@default false
  */ isLink: false,
    /**
  	Return the string this token represents.
  	@method toString
  	@return {string}
  */ toString: function toString() {
        return this.v;
    },
    /**
  	What should the value for this token be in the `href` HTML attribute?
  	Returns the `.toString` value by default.
  		@method toHref
  	@return {string}
  */ toHref: function toHref() {
        return this.toString();
    },
    /**
   * The start index of this token in the original input string
   * @returns {number}
   */ startIndex: function startIndex() {
        return this.tk[0].s;
    },
    /**
   * The end index of this token in the original input string (up to this
   * index but not including it)
   * @returns {number}
   */ endIndex: function endIndex() {
        return this.tk[this.tk.length - 1].e;
    },
    /**
  	Returns a hash of relevant values for this token, which includes keys
  	* type - Kind of token ('url', 'email', etc.)
  	* value - Original text
  	* href - The value that should be added to the anchor tag's href
  		attribute
  		@method toObject
  	@param {string} [protocol] `'http'` by default
  */ toObject: function toObject() {
        var protocol = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : $410e7a787f87a2b4$var$defaults.defaultProtocol;
        return {
            type: this.t,
            value: this.v,
            isLink: this.isLink,
            href: this.toHref(protocol),
            start: this.startIndex(),
            end: this.endIndex()
        };
    }
}; // Base token
/**
 * Create a new token that can be emitted by the parser state machine
 * @param {string} type readable type of the token
 * @param {object} props properties to assign or override, including isLink = true or false
 * @returns {(value: string, tokens: {t: string, v: string, s: number, e: number}) => MultiToken} new token class
 */ function $410e7a787f87a2b4$var$createTokenClass(type, props) {
    function Token(value, tokens) {
        this.t = type;
        this.v = value;
        this.tk = tokens;
    }
    $410e7a787f87a2b4$var$inherits($410e7a787f87a2b4$var$MultiToken, Token, props);
    return Token;
}
/**
	Represents an arbitrarily mailto email address with the prefix included
	@class MailtoEmail
	@extends MultiToken
*/ var $410e7a787f87a2b4$var$MailtoEmail = $410e7a787f87a2b4$var$createTokenClass("email", {
    isLink: true
});
/**
	Represents a list of tokens making up a valid email address
	@class Email
	@extends MultiToken
*/ var $410e7a787f87a2b4$var$Email = $410e7a787f87a2b4$var$createTokenClass("email", {
    isLink: true,
    toHref: function toHref() {
        return "mailto:" + this.toString();
    }
});
/**
	Represents some plain text
	@class Text
	@extends MultiToken
*/ var $410e7a787f87a2b4$var$Text = $410e7a787f87a2b4$var$createTokenClass("text");
/**
	Multi-linebreak token - represents a line break
	@class Nl
	@extends MultiToken
*/ var $410e7a787f87a2b4$var$Nl = $410e7a787f87a2b4$var$createTokenClass("nl");
/**
	Represents a list of text tokens making up a valid URL
	@class Url
	@extends MultiToken
*/ var $410e7a787f87a2b4$var$Url = $410e7a787f87a2b4$var$createTokenClass("url", {
    isLink: true,
    /**
  	Lowercases relevant parts of the domain and adds the protocol if
  	required. Note that this will not escape unsafe HTML characters in the
  	URL.
  		@method href
  	@param {string} protocol
  	@return {string}
  */ toHref: function toHref() {
        var protocol = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : $410e7a787f87a2b4$var$defaults.defaultProtocol;
        var tokens = this.tk;
        var hasProtocol = false;
        var hasSlashSlash = false;
        var result = [];
        var i = 0; // Make the first part of the domain lowercase
        // Lowercase protocol
        while(tokens[i].t === $410e7a787f87a2b4$var$PROTOCOL){
            hasProtocol = true;
            result.push(tokens[i].v);
            i++;
        } // Skip slash-slash
        while(tokens[i].t === $410e7a787f87a2b4$var$SLASH){
            hasSlashSlash = true;
            result.push(tokens[i].v);
            i++;
        } // Continue pushing characters
        for(; i < tokens.length; i++)result.push(tokens[i].v);
        result = result.join("");
        if (!(hasProtocol || hasSlashSlash)) result = "".concat(protocol, "://").concat(result);
        return result;
    },
    hasProtocol: function hasProtocol() {
        return this.tk[0].t === $410e7a787f87a2b4$var$PROTOCOL;
    }
});
var $410e7a787f87a2b4$var$multi = /*#__PURE__*/ Object.freeze({
    __proto__: null,
    MultiToken: $410e7a787f87a2b4$var$MultiToken,
    Base: $410e7a787f87a2b4$var$MultiToken,
    createTokenClass: $410e7a787f87a2b4$var$createTokenClass,
    MailtoEmail: $410e7a787f87a2b4$var$MailtoEmail,
    Email: $410e7a787f87a2b4$var$Email,
    Text: $410e7a787f87a2b4$var$Text,
    Nl: $410e7a787f87a2b4$var$Nl,
    Url: $410e7a787f87a2b4$var$Url
});
/**
	Not exactly parser, more like the second-stage scanner (although we can
	theoretically hotswap the code here with a real parser in the future... but
	for a little URL-finding utility abstract syntax trees may be a little
	overkill).

	URL format: http://en.wikipedia.org/wiki/URI_scheme
	Email format: http://en.wikipedia.org/wiki/Email_address (links to RFC in
	reference)

	@module linkify
	@submodule parser
	@main run
*/ /**
 * Generate the parser multi token-based state machine
 * @returns {State} the starting state
 */ function $410e7a787f87a2b4$var$init$1() {
    // The universal starting state.
    var S_START = $410e7a787f87a2b4$var$makeState(); // Intermediate states for URLs. Note that domains that begin with a protocol
    // are treated slighly differently from those that don't.
    var S_PROTOCOL = $410e7a787f87a2b4$var$makeState(); // e.g., 'http:'
    var S_MAILTO = $410e7a787f87a2b4$var$makeState(); // 'mailto:'
    var S_PROTOCOL_SLASH = $410e7a787f87a2b4$var$makeState(); // e.g., 'http:/''
    var S_PROTOCOL_SLASH_SLASH = $410e7a787f87a2b4$var$makeState(); // e.g.,'http://'
    var S_DOMAIN = $410e7a787f87a2b4$var$makeState(); // parsed string ends with a potential domain name (A)
    var S_DOMAIN_DOT = $410e7a787f87a2b4$var$makeState(); // (A) domain followed by DOT
    var S_TLD = $410e7a787f87a2b4$var$makeAcceptingState($410e7a787f87a2b4$var$Url); // (A) Simplest possible URL with no query string
    var S_TLD_COLON = $410e7a787f87a2b4$var$makeState(); // (A) URL followed by colon (potential port number here)
    var S_TLD_PORT = $410e7a787f87a2b4$var$makeAcceptingState($410e7a787f87a2b4$var$Url); // TLD followed by a port number
    var S_URL = $410e7a787f87a2b4$var$makeAcceptingState($410e7a787f87a2b4$var$Url); // Long URL with optional port and maybe query string
    var S_URL_NON_ACCEPTING = $410e7a787f87a2b4$var$makeState(); // URL followed by some symbols (will not be part of the final URL)
    var S_URL_OPENBRACE = $410e7a787f87a2b4$var$makeState(); // URL followed by {
    var S_URL_OPENBRACKET = $410e7a787f87a2b4$var$makeState(); // URL followed by [
    var S_URL_OPENANGLEBRACKET = $410e7a787f87a2b4$var$makeState(); // URL followed by <
    var S_URL_OPENPAREN = $410e7a787f87a2b4$var$makeState(); // URL followed by (
    var S_URL_OPENBRACE_Q = $410e7a787f87a2b4$var$makeAcceptingState($410e7a787f87a2b4$var$Url); // URL followed by { and some symbols that the URL can end it
    var S_URL_OPENBRACKET_Q = $410e7a787f87a2b4$var$makeAcceptingState($410e7a787f87a2b4$var$Url); // URL followed by [ and some symbols that the URL can end it
    var S_URL_OPENANGLEBRACKET_Q = $410e7a787f87a2b4$var$makeAcceptingState($410e7a787f87a2b4$var$Url); // URL followed by < and some symbols that the URL can end it
    var S_URL_OPENPAREN_Q = $410e7a787f87a2b4$var$makeAcceptingState($410e7a787f87a2b4$var$Url); // URL followed by ( and some symbols that the URL can end it
    var S_URL_OPENBRACE_SYMS = $410e7a787f87a2b4$var$makeState(); // S_URL_OPENBRACE_Q followed by some symbols it cannot end it
    var S_URL_OPENBRACKET_SYMS = $410e7a787f87a2b4$var$makeState(); // S_URL_OPENBRACKET_Q followed by some symbols it cannot end it
    var S_URL_OPENANGLEBRACKET_SYMS = $410e7a787f87a2b4$var$makeState(); // S_URL_OPENANGLEBRACKET_Q followed by some symbols it cannot end it
    var S_URL_OPENPAREN_SYMS = $410e7a787f87a2b4$var$makeState(); // S_URL_OPENPAREN_Q followed by some symbols it cannot end it
    var S_EMAIL_DOMAIN = $410e7a787f87a2b4$var$makeState(); // parsed string starts with local email info + @ with a potential domain name (C)
    var S_EMAIL_DOMAIN_DOT = $410e7a787f87a2b4$var$makeState(); // (C) domain followed by DOT
    var S_EMAIL = $410e7a787f87a2b4$var$makeAcceptingState($410e7a787f87a2b4$var$Email); // (C) Possible email address (could have more tlds)
    var S_EMAIL_COLON = $410e7a787f87a2b4$var$makeState(); // (C) URL followed by colon (potential port number here)
    var S_EMAIL_PORT = $410e7a787f87a2b4$var$makeAcceptingState($410e7a787f87a2b4$var$Email); // (C) Email address with a port
    var S_MAILTO_EMAIL = $410e7a787f87a2b4$var$makeAcceptingState($410e7a787f87a2b4$var$MailtoEmail); // Email that begins with the mailto prefix (D)
    var S_MAILTO_EMAIL_NON_ACCEPTING = $410e7a787f87a2b4$var$makeState(); // (D) Followed by some non-query string chars
    var S_LOCALPART = $410e7a787f87a2b4$var$makeState(); // Local part of the email address
    var S_LOCALPART_AT = $410e7a787f87a2b4$var$makeState(); // Local part of the email address plus @
    var S_LOCALPART_DOT = $410e7a787f87a2b4$var$makeState(); // Local part of the email address plus '.' (localpart cannot end in .)
    var S_NL = $410e7a787f87a2b4$var$makeAcceptingState($410e7a787f87a2b4$var$Nl); // single new line
    // Make path from start to protocol (with '//')
    $410e7a787f87a2b4$var$makeT(S_START, $410e7a787f87a2b4$var$NL, S_NL);
    $410e7a787f87a2b4$var$makeT(S_START, $410e7a787f87a2b4$var$PROTOCOL, S_PROTOCOL);
    $410e7a787f87a2b4$var$makeT(S_START, $410e7a787f87a2b4$var$MAILTO, S_MAILTO);
    $410e7a787f87a2b4$var$makeT(S_PROTOCOL, $410e7a787f87a2b4$var$SLASH, S_PROTOCOL_SLASH);
    $410e7a787f87a2b4$var$makeT(S_PROTOCOL_SLASH, $410e7a787f87a2b4$var$SLASH, S_PROTOCOL_SLASH_SLASH); // The very first potential domain name
    $410e7a787f87a2b4$var$makeT(S_START, $410e7a787f87a2b4$var$TLD, S_DOMAIN);
    $410e7a787f87a2b4$var$makeT(S_START, $410e7a787f87a2b4$var$DOMAIN, S_DOMAIN);
    $410e7a787f87a2b4$var$makeT(S_START, $410e7a787f87a2b4$var$LOCALHOST, S_TLD);
    $410e7a787f87a2b4$var$makeT(S_START, $410e7a787f87a2b4$var$NUM, S_DOMAIN); // Force URL for protocol followed by anything sane
    $410e7a787f87a2b4$var$makeT(S_PROTOCOL_SLASH_SLASH, $410e7a787f87a2b4$var$TLD, S_URL);
    $410e7a787f87a2b4$var$makeT(S_PROTOCOL_SLASH_SLASH, $410e7a787f87a2b4$var$DOMAIN, S_URL);
    $410e7a787f87a2b4$var$makeT(S_PROTOCOL_SLASH_SLASH, $410e7a787f87a2b4$var$NUM, S_URL);
    $410e7a787f87a2b4$var$makeT(S_PROTOCOL_SLASH_SLASH, $410e7a787f87a2b4$var$LOCALHOST, S_URL); // Account for dots and hyphens
    // hyphens are usually parts of domain names
    $410e7a787f87a2b4$var$makeT(S_DOMAIN, $410e7a787f87a2b4$var$DOT, S_DOMAIN_DOT);
    $410e7a787f87a2b4$var$makeT(S_EMAIL_DOMAIN, $410e7a787f87a2b4$var$DOT, S_EMAIL_DOMAIN_DOT); // Hyphen can jump back to a domain name
    // After the first domain and a dot, we can find either a URL or another domain
    $410e7a787f87a2b4$var$makeT(S_DOMAIN_DOT, $410e7a787f87a2b4$var$TLD, S_TLD);
    $410e7a787f87a2b4$var$makeT(S_DOMAIN_DOT, $410e7a787f87a2b4$var$DOMAIN, S_DOMAIN);
    $410e7a787f87a2b4$var$makeT(S_DOMAIN_DOT, $410e7a787f87a2b4$var$NUM, S_DOMAIN);
    $410e7a787f87a2b4$var$makeT(S_DOMAIN_DOT, $410e7a787f87a2b4$var$LOCALHOST, S_DOMAIN);
    $410e7a787f87a2b4$var$makeT(S_EMAIL_DOMAIN_DOT, $410e7a787f87a2b4$var$TLD, S_EMAIL);
    $410e7a787f87a2b4$var$makeT(S_EMAIL_DOMAIN_DOT, $410e7a787f87a2b4$var$DOMAIN, S_EMAIL_DOMAIN);
    $410e7a787f87a2b4$var$makeT(S_EMAIL_DOMAIN_DOT, $410e7a787f87a2b4$var$NUM, S_EMAIL_DOMAIN);
    $410e7a787f87a2b4$var$makeT(S_EMAIL_DOMAIN_DOT, $410e7a787f87a2b4$var$LOCALHOST, S_EMAIL_DOMAIN); // S_TLD accepts! But the URL could be longer, try to find a match greedily
    // The `run` function should be able to "rollback" to the accepting state
    $410e7a787f87a2b4$var$makeT(S_TLD, $410e7a787f87a2b4$var$DOT, S_DOMAIN_DOT);
    $410e7a787f87a2b4$var$makeT(S_EMAIL, $410e7a787f87a2b4$var$DOT, S_EMAIL_DOMAIN_DOT); // Become real URLs after `SLASH` or `COLON NUM SLASH`
    // Here PSS and non-PSS converge
    $410e7a787f87a2b4$var$makeT(S_TLD, $410e7a787f87a2b4$var$COLON, S_TLD_COLON);
    $410e7a787f87a2b4$var$makeT(S_TLD, $410e7a787f87a2b4$var$SLASH, S_URL);
    $410e7a787f87a2b4$var$makeT(S_TLD_COLON, $410e7a787f87a2b4$var$NUM, S_TLD_PORT);
    $410e7a787f87a2b4$var$makeT(S_TLD_PORT, $410e7a787f87a2b4$var$SLASH, S_URL);
    $410e7a787f87a2b4$var$makeT(S_EMAIL, $410e7a787f87a2b4$var$COLON, S_EMAIL_COLON);
    $410e7a787f87a2b4$var$makeT(S_EMAIL_COLON, $410e7a787f87a2b4$var$NUM, S_EMAIL_PORT); // Types of characters the URL can definitely end in
    var qsAccepting = [
        $410e7a787f87a2b4$var$AMPERSAND,
        $410e7a787f87a2b4$var$ASTERISK,
        $410e7a787f87a2b4$var$AT,
        $410e7a787f87a2b4$var$BACKSLASH,
        $410e7a787f87a2b4$var$BACKTICK,
        $410e7a787f87a2b4$var$CARET,
        $410e7a787f87a2b4$var$DOLLAR,
        $410e7a787f87a2b4$var$DOMAIN,
        $410e7a787f87a2b4$var$EQUALS,
        $410e7a787f87a2b4$var$HYPHEN,
        $410e7a787f87a2b4$var$LOCALHOST,
        $410e7a787f87a2b4$var$NUM,
        $410e7a787f87a2b4$var$PERCENT,
        $410e7a787f87a2b4$var$PIPE,
        $410e7a787f87a2b4$var$PLUS,
        $410e7a787f87a2b4$var$POUND,
        $410e7a787f87a2b4$var$PROTOCOL,
        $410e7a787f87a2b4$var$SLASH,
        $410e7a787f87a2b4$var$SYM,
        $410e7a787f87a2b4$var$TILDE,
        $410e7a787f87a2b4$var$TLD,
        $410e7a787f87a2b4$var$UNDERSCORE
    ]; // Types of tokens that can follow a URL and be part of the query string
    // but cannot be the very last characters
    // Characters that cannot appear in the URL at all should be excluded
    var qsNonAccepting = [
        $410e7a787f87a2b4$var$APOSTROPHE,
        $410e7a787f87a2b4$var$CLOSEANGLEBRACKET,
        $410e7a787f87a2b4$var$CLOSEBRACE,
        $410e7a787f87a2b4$var$CLOSEBRACKET,
        $410e7a787f87a2b4$var$CLOSEPAREN,
        $410e7a787f87a2b4$var$COLON,
        $410e7a787f87a2b4$var$COMMA,
        $410e7a787f87a2b4$var$DOT,
        $410e7a787f87a2b4$var$EXCLAMATION,
        $410e7a787f87a2b4$var$OPENANGLEBRACKET,
        $410e7a787f87a2b4$var$OPENBRACE,
        $410e7a787f87a2b4$var$OPENBRACKET,
        $410e7a787f87a2b4$var$OPENPAREN,
        $410e7a787f87a2b4$var$QUERY,
        $410e7a787f87a2b4$var$QUOTE,
        $410e7a787f87a2b4$var$SEMI
    ]; // These states are responsible primarily for determining whether or not to
    // include the final round bracket.
    // URL, followed by an opening bracket
    $410e7a787f87a2b4$var$makeT(S_URL, $410e7a787f87a2b4$var$OPENBRACE, S_URL_OPENBRACE);
    $410e7a787f87a2b4$var$makeT(S_URL, $410e7a787f87a2b4$var$OPENBRACKET, S_URL_OPENBRACKET);
    $410e7a787f87a2b4$var$makeT(S_URL, $410e7a787f87a2b4$var$OPENANGLEBRACKET, S_URL_OPENANGLEBRACKET);
    $410e7a787f87a2b4$var$makeT(S_URL, $410e7a787f87a2b4$var$OPENPAREN, S_URL_OPENPAREN); // URL with extra symbols at the end, followed by an opening bracket
    $410e7a787f87a2b4$var$makeT(S_URL_NON_ACCEPTING, $410e7a787f87a2b4$var$OPENBRACE, S_URL_OPENBRACE);
    $410e7a787f87a2b4$var$makeT(S_URL_NON_ACCEPTING, $410e7a787f87a2b4$var$OPENBRACKET, S_URL_OPENBRACKET);
    $410e7a787f87a2b4$var$makeT(S_URL_NON_ACCEPTING, $410e7a787f87a2b4$var$OPENANGLEBRACKET, S_URL_OPENANGLEBRACKET);
    $410e7a787f87a2b4$var$makeT(S_URL_NON_ACCEPTING, $410e7a787f87a2b4$var$OPENPAREN, S_URL_OPENPAREN); // Closing bracket component. This character WILL be included in the URL
    $410e7a787f87a2b4$var$makeT(S_URL_OPENBRACE, $410e7a787f87a2b4$var$CLOSEBRACE, S_URL);
    $410e7a787f87a2b4$var$makeT(S_URL_OPENBRACKET, $410e7a787f87a2b4$var$CLOSEBRACKET, S_URL);
    $410e7a787f87a2b4$var$makeT(S_URL_OPENANGLEBRACKET, $410e7a787f87a2b4$var$CLOSEANGLEBRACKET, S_URL);
    $410e7a787f87a2b4$var$makeT(S_URL_OPENPAREN, $410e7a787f87a2b4$var$CLOSEPAREN, S_URL);
    $410e7a787f87a2b4$var$makeT(S_URL_OPENBRACE_Q, $410e7a787f87a2b4$var$CLOSEBRACE, S_URL);
    $410e7a787f87a2b4$var$makeT(S_URL_OPENBRACKET_Q, $410e7a787f87a2b4$var$CLOSEBRACKET, S_URL);
    $410e7a787f87a2b4$var$makeT(S_URL_OPENANGLEBRACKET_Q, $410e7a787f87a2b4$var$CLOSEANGLEBRACKET, S_URL);
    $410e7a787f87a2b4$var$makeT(S_URL_OPENPAREN_Q, $410e7a787f87a2b4$var$CLOSEPAREN, S_URL);
    $410e7a787f87a2b4$var$makeT(S_URL_OPENBRACE_SYMS, $410e7a787f87a2b4$var$CLOSEBRACE, S_URL);
    $410e7a787f87a2b4$var$makeT(S_URL_OPENBRACKET_SYMS, $410e7a787f87a2b4$var$CLOSEBRACKET, S_URL);
    $410e7a787f87a2b4$var$makeT(S_URL_OPENANGLEBRACKET_SYMS, $410e7a787f87a2b4$var$CLOSEANGLEBRACKET, S_URL);
    $410e7a787f87a2b4$var$makeT(S_URL_OPENPAREN_SYMS, $410e7a787f87a2b4$var$CLOSEPAREN, S_URL); // URL that beings with an opening bracket, followed by a symbols.
    // Note that the final state can still be `S_URL_OPENBRACE_Q` (if the URL only
    // has a single opening bracket for some reason).
    $410e7a787f87a2b4$var$makeMultiT(S_URL_OPENBRACE, qsAccepting, S_URL_OPENBRACE_Q);
    $410e7a787f87a2b4$var$makeMultiT(S_URL_OPENBRACKET, qsAccepting, S_URL_OPENBRACKET_Q);
    $410e7a787f87a2b4$var$makeMultiT(S_URL_OPENANGLEBRACKET, qsAccepting, S_URL_OPENANGLEBRACKET_Q);
    $410e7a787f87a2b4$var$makeMultiT(S_URL_OPENPAREN, qsAccepting, S_URL_OPENPAREN_Q);
    $410e7a787f87a2b4$var$makeMultiT(S_URL_OPENBRACE, qsNonAccepting, S_URL_OPENBRACE_SYMS);
    $410e7a787f87a2b4$var$makeMultiT(S_URL_OPENBRACKET, qsNonAccepting, S_URL_OPENBRACKET_SYMS);
    $410e7a787f87a2b4$var$makeMultiT(S_URL_OPENANGLEBRACKET, qsNonAccepting, S_URL_OPENANGLEBRACKET_SYMS);
    $410e7a787f87a2b4$var$makeMultiT(S_URL_OPENPAREN, qsNonAccepting, S_URL_OPENPAREN_SYMS); // URL that begins with an opening bracket, followed by some symbols
    $410e7a787f87a2b4$var$makeMultiT(S_URL_OPENBRACE_Q, qsAccepting, S_URL_OPENBRACE_Q);
    $410e7a787f87a2b4$var$makeMultiT(S_URL_OPENBRACKET_Q, qsAccepting, S_URL_OPENBRACKET_Q);
    $410e7a787f87a2b4$var$makeMultiT(S_URL_OPENANGLEBRACKET_Q, qsAccepting, S_URL_OPENANGLEBRACKET_Q);
    $410e7a787f87a2b4$var$makeMultiT(S_URL_OPENPAREN_Q, qsAccepting, S_URL_OPENPAREN_Q);
    $410e7a787f87a2b4$var$makeMultiT(S_URL_OPENBRACE_Q, qsNonAccepting, S_URL_OPENBRACE_Q);
    $410e7a787f87a2b4$var$makeMultiT(S_URL_OPENBRACKET_Q, qsNonAccepting, S_URL_OPENBRACKET_Q);
    $410e7a787f87a2b4$var$makeMultiT(S_URL_OPENANGLEBRACKET_Q, qsNonAccepting, S_URL_OPENANGLEBRACKET_Q);
    $410e7a787f87a2b4$var$makeMultiT(S_URL_OPENPAREN_Q, qsNonAccepting, S_URL_OPENPAREN_Q);
    $410e7a787f87a2b4$var$makeMultiT(S_URL_OPENBRACE_SYMS, qsAccepting, S_URL_OPENBRACE_Q);
    $410e7a787f87a2b4$var$makeMultiT(S_URL_OPENBRACKET_SYMS, qsAccepting, S_URL_OPENBRACKET_Q);
    $410e7a787f87a2b4$var$makeMultiT(S_URL_OPENANGLEBRACKET_SYMS, qsAccepting, S_URL_OPENANGLEBRACKET_Q);
    $410e7a787f87a2b4$var$makeMultiT(S_URL_OPENPAREN_SYMS, qsAccepting, S_URL_OPENPAREN_Q);
    $410e7a787f87a2b4$var$makeMultiT(S_URL_OPENBRACE_SYMS, qsNonAccepting, S_URL_OPENBRACE_SYMS);
    $410e7a787f87a2b4$var$makeMultiT(S_URL_OPENBRACKET_SYMS, qsNonAccepting, S_URL_OPENBRACKET_SYMS);
    $410e7a787f87a2b4$var$makeMultiT(S_URL_OPENANGLEBRACKET_SYMS, qsNonAccepting, S_URL_OPENANGLEBRACKET_SYMS);
    $410e7a787f87a2b4$var$makeMultiT(S_URL_OPENPAREN_SYMS, qsNonAccepting, S_URL_OPENPAREN_SYMS); // Account for the query string
    $410e7a787f87a2b4$var$makeMultiT(S_URL, qsAccepting, S_URL);
    $410e7a787f87a2b4$var$makeMultiT(S_URL_NON_ACCEPTING, qsAccepting, S_URL);
    $410e7a787f87a2b4$var$makeMultiT(S_URL, qsNonAccepting, S_URL_NON_ACCEPTING);
    $410e7a787f87a2b4$var$makeMultiT(S_URL_NON_ACCEPTING, qsNonAccepting, S_URL_NON_ACCEPTING); // Email address-specific state definitions
    // Note: We are not allowing '/' in email addresses since this would interfere
    // with real URLs
    // For addresses with the mailto prefix
    // 'mailto:' followed by anything sane is a valid email
    $410e7a787f87a2b4$var$makeT(S_MAILTO, $410e7a787f87a2b4$var$TLD, S_MAILTO_EMAIL);
    $410e7a787f87a2b4$var$makeT(S_MAILTO, $410e7a787f87a2b4$var$DOMAIN, S_MAILTO_EMAIL);
    $410e7a787f87a2b4$var$makeT(S_MAILTO, $410e7a787f87a2b4$var$NUM, S_MAILTO_EMAIL);
    $410e7a787f87a2b4$var$makeT(S_MAILTO, $410e7a787f87a2b4$var$LOCALHOST, S_MAILTO_EMAIL); // Greedily get more potential valid email values
    $410e7a787f87a2b4$var$makeMultiT(S_MAILTO_EMAIL, qsAccepting, S_MAILTO_EMAIL);
    $410e7a787f87a2b4$var$makeMultiT(S_MAILTO_EMAIL, qsNonAccepting, S_MAILTO_EMAIL_NON_ACCEPTING);
    $410e7a787f87a2b4$var$makeMultiT(S_MAILTO_EMAIL_NON_ACCEPTING, qsAccepting, S_MAILTO_EMAIL);
    $410e7a787f87a2b4$var$makeMultiT(S_MAILTO_EMAIL_NON_ACCEPTING, qsNonAccepting, S_MAILTO_EMAIL_NON_ACCEPTING); // For addresses without the mailto prefix
    // Tokens allowed in the localpart of the email
    var localpartAccepting = [
        $410e7a787f87a2b4$var$AMPERSAND,
        $410e7a787f87a2b4$var$APOSTROPHE,
        $410e7a787f87a2b4$var$ASTERISK,
        $410e7a787f87a2b4$var$BACKSLASH,
        $410e7a787f87a2b4$var$BACKTICK,
        $410e7a787f87a2b4$var$CARET,
        $410e7a787f87a2b4$var$CLOSEBRACE,
        $410e7a787f87a2b4$var$DOLLAR,
        $410e7a787f87a2b4$var$DOMAIN,
        $410e7a787f87a2b4$var$EQUALS,
        $410e7a787f87a2b4$var$HYPHEN,
        $410e7a787f87a2b4$var$NUM,
        $410e7a787f87a2b4$var$OPENBRACE,
        $410e7a787f87a2b4$var$PERCENT,
        $410e7a787f87a2b4$var$PIPE,
        $410e7a787f87a2b4$var$PLUS,
        $410e7a787f87a2b4$var$POUND,
        $410e7a787f87a2b4$var$QUERY,
        $410e7a787f87a2b4$var$SLASH,
        $410e7a787f87a2b4$var$SYM,
        $410e7a787f87a2b4$var$TILDE,
        $410e7a787f87a2b4$var$TLD,
        $410e7a787f87a2b4$var$UNDERSCORE
    ]; // Some of the tokens in `localpartAccepting` are already accounted for here and
    // will not be overwritten (don't worry)
    $410e7a787f87a2b4$var$makeMultiT(S_DOMAIN, localpartAccepting, S_LOCALPART);
    $410e7a787f87a2b4$var$makeT(S_DOMAIN, $410e7a787f87a2b4$var$AT, S_LOCALPART_AT);
    $410e7a787f87a2b4$var$makeMultiT(S_TLD, localpartAccepting, S_LOCALPART);
    $410e7a787f87a2b4$var$makeT(S_TLD, $410e7a787f87a2b4$var$AT, S_LOCALPART_AT);
    $410e7a787f87a2b4$var$makeMultiT(S_DOMAIN_DOT, localpartAccepting, S_LOCALPART); // Now in localpart of address
    // TODO: IP addresses and what if the email starts with numbers?
    $410e7a787f87a2b4$var$makeMultiT(S_LOCALPART, localpartAccepting, S_LOCALPART);
    $410e7a787f87a2b4$var$makeT(S_LOCALPART, $410e7a787f87a2b4$var$AT, S_LOCALPART_AT); // close to an email address now
    $410e7a787f87a2b4$var$makeT(S_LOCALPART, $410e7a787f87a2b4$var$DOT, S_LOCALPART_DOT);
    $410e7a787f87a2b4$var$makeMultiT(S_LOCALPART_DOT, localpartAccepting, S_LOCALPART);
    $410e7a787f87a2b4$var$makeT(S_LOCALPART_AT, $410e7a787f87a2b4$var$TLD, S_EMAIL_DOMAIN);
    $410e7a787f87a2b4$var$makeT(S_LOCALPART_AT, $410e7a787f87a2b4$var$DOMAIN, S_EMAIL_DOMAIN);
    $410e7a787f87a2b4$var$makeT(S_LOCALPART_AT, $410e7a787f87a2b4$var$NUM, S_EMAIL_DOMAIN);
    $410e7a787f87a2b4$var$makeT(S_LOCALPART_AT, $410e7a787f87a2b4$var$LOCALHOST, S_EMAIL); // States following `@` defined above
    return S_START;
}
/**
 * Run the parser state machine on a list of scanned string-based tokens to
 * create a list of multi tokens, each of which represents a URL, email address,
 * plain text, etc.
 *
 * @param {State} start parser start state
 * @param {string} input the original input used to generate the given tokens
 * @param {{t: string, v: string, s: number, e: number}[]} tokens list of scanned tokens
 * @returns {MultiToken[]}
 */ function $410e7a787f87a2b4$var$run(start, input, tokens) {
    var len = tokens.length;
    var cursor = 0;
    var multis = [];
    var textTokens = [];
    while(cursor < len){
        var state = start;
        var secondState = null;
        var nextState = null;
        var multiLength = 0;
        var latestAccepting = null;
        var sinceAccepts = -1;
        while(cursor < len && !(secondState = $410e7a787f87a2b4$var$takeT(state, tokens[cursor].t)))// Starting tokens with nowhere to jump to.
        // Consider these to be just plain text
        textTokens.push(tokens[cursor++]);
        while(cursor < len && (nextState = secondState || $410e7a787f87a2b4$var$takeT(state, tokens[cursor].t))){
            // Get the next state
            secondState = null;
            state = nextState; // Keep track of the latest accepting state
            if (state.accepts()) {
                sinceAccepts = 0;
                latestAccepting = state;
            } else if (sinceAccepts >= 0) sinceAccepts++;
            cursor++;
            multiLength++;
        }
        if (sinceAccepts < 0) // No accepting state was found, part of a regular text token
        // Add all the tokens we looked at to the text tokens array
        for(var i = cursor - multiLength; i < cursor; i++)textTokens.push(tokens[i]);
        else {
            // Accepting state!
            // First close off the textTokens (if available)
            if (textTokens.length > 0) {
                multis.push($410e7a787f87a2b4$var$parserCreateMultiToken($410e7a787f87a2b4$var$Text, input, textTokens));
                textTokens = [];
            } // Roll back to the latest accepting state
            cursor -= sinceAccepts;
            multiLength -= sinceAccepts; // Create a new multitoken
            var Multi = latestAccepting.t;
            var subtokens = tokens.slice(cursor - multiLength, cursor);
            multis.push($410e7a787f87a2b4$var$parserCreateMultiToken(Multi, input, subtokens));
        }
    } // Finally close off the textTokens (if available)
    if (textTokens.length > 0) multis.push($410e7a787f87a2b4$var$parserCreateMultiToken($410e7a787f87a2b4$var$Text, input, textTokens));
    return multis;
}
/**
 * Utility function for instantiating a new multitoken with all the relevant
 * fields during parsing.
 * @param {Class<MultiToken>} Multi class to instantiate
 * @param {string} input original input string
 * @param {{t: string, v: string, s: number, e: number}[]} tokens consecutive tokens scanned from input string
 * @returns {MultiToken}
 */ function $410e7a787f87a2b4$var$parserCreateMultiToken(Multi, input, tokens) {
    var startIdx = tokens[0].s;
    var endIdx = tokens[tokens.length - 1].e;
    var value = input.substr(startIdx, endIdx - startIdx);
    return new Multi(value, tokens);
}
var $410e7a787f87a2b4$var$warn = typeof console !== "undefined" && console && console.warn || function() {}; // Side-effect initialization state
var $410e7a787f87a2b4$var$INIT = {
    scanner: null,
    parser: null,
    pluginQueue: [],
    customProtocols: [],
    initialized: false
};
/**
 * De-register all plugins and reset the internal state-machine. Used for
 * testing; not required in practice.
 * @private
 */ function $410e7a787f87a2b4$export$aad8462122ac592b() {
    $410e7a787f87a2b4$var$INIT.scanner = null;
    $410e7a787f87a2b4$var$INIT.parser = null;
    $410e7a787f87a2b4$var$INIT.pluginQueue = [];
    $410e7a787f87a2b4$var$INIT.customProtocols = [];
    $410e7a787f87a2b4$var$INIT.initialized = false;
}
/**
 * Register a linkify extension plugin
 * @param {string} name of plugin to register
 * @param {Function} plugin function that accepts mutable linkify state
 */ function $410e7a787f87a2b4$export$7612db19fb8beb1e(name, plugin) {
    for(var i = 0; i < $410e7a787f87a2b4$var$INIT.pluginQueue.length; i++)if (name === $410e7a787f87a2b4$var$INIT.pluginQueue[i][0]) {
        $410e7a787f87a2b4$var$warn('linkifyjs: plugin "'.concat(name, '" already registered - will be overwritten'));
        $410e7a787f87a2b4$var$INIT.pluginQueue[i] = [
            name,
            plugin
        ];
        return;
    }
    $410e7a787f87a2b4$var$INIT.pluginQueue.push([
        name,
        plugin
    ]);
    if ($410e7a787f87a2b4$var$INIT.initialized) $410e7a787f87a2b4$var$warn('linkifyjs: already initialized - will not register plugin "'.concat(name, '" until you manually call linkify.init(). To avoid this warning, please register all plugins before invoking linkify the first time.'));
}
/**
 * Detect URLs with the following additional protocol. Anything following
 * "protocol:" will be considered a link.
 * @param {string} protocol
 */ function $410e7a787f87a2b4$export$821627edc2d26f5f(protocol) {
    if ($410e7a787f87a2b4$var$INIT.initialized) $410e7a787f87a2b4$var$warn('linkifyjs: already initialized - will not register custom protocol "'.concat(protocol, '" until you manually call linkify.init(). To avoid this warning, please register all custom protocols before invoking linkify the first time.'));
    if (!/^[a-z-]+$/.test(protocol)) throw Error("linkifyjs: protocols containing characters other than a-z or - (hyphen) are not supported");
    $410e7a787f87a2b4$var$INIT.customProtocols.push(protocol);
}
/**
 * Initialize the linkify state machine. Called automatically the first time
 * linkify is called on a string, but may be called manually as well.
 */ function $410e7a787f87a2b4$export$2cd8252107eb640b() {
    // Initialize state machines
    $410e7a787f87a2b4$var$INIT.scanner = {
        start: $410e7a787f87a2b4$var$init$2($410e7a787f87a2b4$var$INIT.customProtocols),
        tokens: $410e7a787f87a2b4$var$text
    };
    $410e7a787f87a2b4$var$INIT.parser = {
        start: $410e7a787f87a2b4$var$init$1(),
        tokens: $410e7a787f87a2b4$var$multi
    };
    var utils = {
        createTokenClass: $410e7a787f87a2b4$var$createTokenClass
    }; // Initialize plugins
    for(var i = 0; i < $410e7a787f87a2b4$var$INIT.pluginQueue.length; i++)$410e7a787f87a2b4$var$INIT.pluginQueue[i][1]({
        scanner: $410e7a787f87a2b4$var$INIT.scanner,
        parser: $410e7a787f87a2b4$var$INIT.parser,
        utils: utils
    });
    $410e7a787f87a2b4$var$INIT.initialized = true;
}
/**
	Parse a string into tokens that represent linkable and non-linkable sub-components
	@param {string} str
	@return {MultiToken[]} tokens
*/ function $410e7a787f87a2b4$export$660b2ee2d4fb4eff(str) {
    if (!$410e7a787f87a2b4$var$INIT.initialized) $410e7a787f87a2b4$export$2cd8252107eb640b();
    return $410e7a787f87a2b4$var$run($410e7a787f87a2b4$var$INIT.parser.start, str, $410e7a787f87a2b4$var$run$1($410e7a787f87a2b4$var$INIT.scanner.start, str));
}
/**
	Find a list of linkable items in the given string.
	@param {string} str string to find links in
	@param {string} [type] (optional) only find links of a specific type, e.g.,
	'url' or 'email'
*/ function $410e7a787f87a2b4$export$71aa6c912b956294(str) {
    var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var tokens = $410e7a787f87a2b4$export$660b2ee2d4fb4eff(str);
    var filtered = [];
    for(var i = 0; i < tokens.length; i++){
        var token = tokens[i];
        if (token.isLink && (!type || token.t === type)) filtered.push(token.toObject());
    }
    return filtered;
}
/**
 * Is the given string valid linkable text of some sort. Note that this does not
 * trim the text for you.
 *
 * Optionally pass in a second `type` param, which is the type of link to test
 * for.
 *
 * For example,
 *
 *     linkify.test(str, 'email');
 *
 * Returns `true` if str is a valid email.
 * @param {string} str string to test for links
 * @param {string} [type] optional specific link type to look for
 * @returns boolean true/false
 */ function $410e7a787f87a2b4$export$e0969da9b8fb378d(str) {
    var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var tokens = $410e7a787f87a2b4$export$660b2ee2d4fb4eff(str);
    return tokens.length === 1 && tokens[0].isLink && (!type || tokens[0].t === type);
}


var $fa8308bd2c5b6d7e$exports = {};
"use strict";
var $b51300f8ed8264b6$exports = {};
"use strict";

var $hPUTp = parcelRequire("hPUTp");

$hPUTp.trust = (parcelRequire("hc09f"));

$hPUTp.fragment = (parcelRequire("uUr9B"));
$b51300f8ed8264b6$exports = $hPUTp;


var $5eb9873530869c78$exports = {};
"use strict";

var $dXPdz = parcelRequire("dXPdz");

var $fBKqb = parcelRequire("fBKqb");

$5eb9873530869c78$exports = (parcelRequire("8ohAQ"))(typeof window !== "undefined" ? window : null, $dXPdz, $fBKqb.redraw);



var $fBKqb = parcelRequire("fBKqb");
var $fa8308bd2c5b6d7e$var$m = function m() {
    return $b51300f8ed8264b6$exports.apply(this, arguments);
};
$fa8308bd2c5b6d7e$var$m.m = $b51300f8ed8264b6$exports;
$fa8308bd2c5b6d7e$var$m.trust = $b51300f8ed8264b6$exports.trust;
$fa8308bd2c5b6d7e$var$m.fragment = $b51300f8ed8264b6$exports.fragment;
$fa8308bd2c5b6d7e$var$m.Fragment = "[";
$fa8308bd2c5b6d7e$var$m.mount = $fBKqb.mount;

$fa8308bd2c5b6d7e$var$m.route = (parcelRequire("jFffZ"));

$fa8308bd2c5b6d7e$var$m.render = (parcelRequire("iHb4t"));
$fa8308bd2c5b6d7e$var$m.redraw = $fBKqb.redraw;
$fa8308bd2c5b6d7e$var$m.request = $5eb9873530869c78$exports.request;
$fa8308bd2c5b6d7e$var$m.jsonp = $5eb9873530869c78$exports.jsonp;

$fa8308bd2c5b6d7e$var$m.parseQueryString = (parcelRequire("iahK6"));

$fa8308bd2c5b6d7e$var$m.buildQueryString = (parcelRequire("6KLd1"));

$fa8308bd2c5b6d7e$var$m.parsePathname = (parcelRequire("1bhZB"));

$fa8308bd2c5b6d7e$var$m.buildPathname = (parcelRequire("bGJ5a"));

$fa8308bd2c5b6d7e$var$m.vnode = (parcelRequire("ahPL4"));

$fa8308bd2c5b6d7e$var$m.PromisePolyfill = (parcelRequire("4kqT7"));

$fa8308bd2c5b6d7e$var$m.censor = (parcelRequire("1Zud9"));
$fa8308bd2c5b6d7e$exports = $fa8308bd2c5b6d7e$var$m;


var $fc3b5a28c7651bef$exports = {};
/*
 * QRious v4.0.2
 * Copyright (C) 2017 Alasdair Mercer
 * Copyright (C) 2010 Tom Zerucha
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */ (function(global, factory) {
    $fc3b5a28c7651bef$exports = factory();
})($fc3b5a28c7651bef$exports, function() {
    "use strict";
    /*
   * Copyright (C) 2017 Alasdair Mercer, !ninja
   *
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to deal
   * in the Software without restriction, including without limitation the rights
   * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   *
   * The above copyright notice and this permission notice shall be included in all
   * copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
   * SOFTWARE.
   */ /**
   * A bare-bones constructor for surrogate prototype swapping.
   *
   * @private
   * @constructor
   */ var Constructor = /* istanbul ignore next */ function Constructor() {};
    /**
   * A reference to <code>Object.prototype.hasOwnProperty</code>.
   *
   * @private
   * @type {Function}
   */ var hasOwnProperty = Object.prototype.hasOwnProperty;
    /**
   * A reference to <code>Array.prototype.slice</code>.
   *
   * @private
   * @type {Function}
   */ var slice = Array.prototype.slice;
    /**
   * Creates an object which inherits the given <code>prototype</code>.
   *
   * Optionally, the created object can be extended further with the specified <code>properties</code>.
   *
   * @param {Object} prototype - the prototype to be inherited by the created object
   * @param {Object} [properties] - the optional properties to be extended by the created object
   * @return {Object} The newly created object.
   * @private
   */ function createObject(prototype, properties) {
        var result;
        /* istanbul ignore next */ if (typeof Object.create === "function") result = Object.create(prototype);
        else {
            Constructor.prototype = prototype;
            result = new Constructor();
            Constructor.prototype = null;
        }
        if (properties) extendObject(true, result, properties);
        return result;
    }
    /**
   * Extends the constructor to which this method is associated with the <code>prototype</code> and/or
   * <code>statics</code> provided.
   *
   * If <code>name</code> is provided, it will be used as the class name and can be accessed via a special
   * <code>class_</code> property on the child constructor, otherwise the class name of the super constructor will be used
   * instead. The class name may also be used string representation for instances of the child constructor (via
   * <code>toString</code>), but this is not applicable to the <i>lite</i> version of Nevis.
   *
   * If <code>constructor</code> is provided, it will be used as the constructor for the child, otherwise a simple
   * constructor which only calls the super constructor will be used instead.
   *
   * The super constructor can be accessed via a special <code>super_</code> property on the child constructor.
   *
   * @param {string} [name=this.class_] - the class name to be used for the child constructor
   * @param {Function} [constructor] - the constructor for the child
   * @param {Object} [prototype] - the prototype properties to be defined for the child
   * @param {Object} [statics] - the static properties to be defined for the child
   * @return {Function} The child <code>constructor</code> provided or the one created if none was given.
   * @public
   */ function extend(name, constructor, prototype, statics) {
        var superConstructor = this;
        if (typeof name !== "string") {
            statics = prototype;
            prototype = constructor;
            constructor = name;
            name = null;
        }
        if (typeof constructor !== "function") {
            statics = prototype;
            prototype = constructor;
            constructor = function constructor() {
                return superConstructor.apply(this, arguments);
            };
        }
        extendObject(false, constructor, superConstructor, statics);
        constructor.prototype = createObject(superConstructor.prototype, prototype);
        constructor.prototype.constructor = constructor;
        constructor.class_ = name || superConstructor.class_;
        constructor.super_ = superConstructor;
        return constructor;
    }
    /**
   * Extends the specified <code>target</code> object with the properties in each of the <code>sources</code> provided.
   *
   * if any source is <code>null</code> it will be ignored.
   *
   * @param {boolean} own - <code>true</code> to only copy <b>own</b> properties from <code>sources</code> onto
   * <code>target</code>; otherwise <code>false</code>
   * @param {Object} target - the target object which should be extended
   * @param {...Object} [sources] - the source objects whose properties are to be copied onto <code>target</code>
   * @return {void}
   * @private
   */ function extendObject(own, target, sources) {
        sources = slice.call(arguments, 2);
        var property;
        var source;
        for(var i = 0, length = sources.length; i < length; i++){
            source = sources[i];
            for(property in source)if (!own || hasOwnProperty.call(source, property)) target[property] = source[property];
        }
    }
    var extend_1 = extend;
    /**
   * The base class from which all others should extend.
   *
   * @public
   * @constructor
   */ function Nevis() {}
    Nevis.class_ = "Nevis";
    Nevis.super_ = Object;
    /**
   * Extends the constructor to which this method is associated with the <code>prototype</code> and/or
   * <code>statics</code> provided.
   *
   * If <code>name</code> is provided, it will be used as the class name and can be accessed via a special
   * <code>class_</code> property on the child constructor, otherwise the class name of the super constructor will be used
   * instead. The class name may also be used string representation for instances of the child constructor (via
   * <code>toString</code>), but this is not applicable to the <i>lite</i> version of Nevis.
   *
   * If <code>constructor</code> is provided, it will be used as the constructor for the child, otherwise a simple
   * constructor which only calls the super constructor will be used instead.
   *
   * The super constructor can be accessed via a special <code>super_</code> property on the child constructor.
   *
   * @param {string} [name=this.class_] - the class name to be used for the child constructor
   * @param {Function} [constructor] - the constructor for the child
   * @param {Object} [prototype] - the prototype properties to be defined for the child
   * @param {Object} [statics] - the static properties to be defined for the child
   * @return {Function} The child <code>constructor</code> provided or the one created if none was given.
   * @public
   * @static
   * @memberof Nevis
   */ Nevis.extend = extend_1;
    var nevis = Nevis;
    var lite = nevis;
    /**
   * Responsible for rendering a QR code {@link Frame} on a specific type of element.
   *
   * A renderer may be dependant on the rendering of another element, so the ordering of their execution is important.
   *
   * The rendering of a element can be deferred by disabling the renderer initially, however, any attempt get the element
   * from the renderer will result in it being immediately enabled and the element being rendered.
   *
   * @param {QRious} qrious - the {@link QRious} instance to be used
   * @param {*} element - the element onto which the QR code is to be rendered
   * @param {boolean} [enabled] - <code>true</code> this {@link Renderer} is enabled; otherwise <code>false</code>.
   * @public
   * @class
   * @extends Nevis
   */ var Renderer = lite.extend(function(qrious, element, enabled) {
        /**
     * The {@link QRious} instance.
     *
     * @protected
     * @type {QRious}
     * @memberof Renderer#
     */ this.qrious = qrious;
        /**
     * The element onto which this {@link Renderer} is rendering the QR code.
     *
     * @protected
     * @type {*}
     * @memberof Renderer#
     */ this.element = element;
        this.element.qrious = qrious;
        /**
     * Whether this {@link Renderer} is enabled.
     *
     * @protected
     * @type {boolean}
     * @memberof Renderer#
     */ this.enabled = Boolean(enabled);
    }, {
        /**
     * Draws the specified QR code <code>frame</code> on the underlying element.
     *
     * Implementations of {@link Renderer} <b>must</b> override this method with their own specific logic.
     *
     * @param {Frame} frame - the {@link Frame} to be drawn
     * @return {void}
     * @protected
     * @abstract
     * @memberof Renderer#
     */ draw: function draw(frame) {},
        /**
     * Returns the element onto which this {@link Renderer} is rendering the QR code.
     *
     * If this method is called while this {@link Renderer} is disabled, it will be immediately enabled and rendered
     * before the element is returned.
     *
     * @return {*} The element.
     * @public
     * @memberof Renderer#
     */ getElement: function getElement() {
            if (!this.enabled) {
                this.enabled = true;
                this.render();
            }
            return this.element;
        },
        /**
     * Calculates the size (in pixel units) to represent an individual module within the QR code based on the
     * <code>frame</code> provided.
     *
     * Any configured padding will be excluded from the returned size.
     *
     * The returned value will be at least one, even in cases where the size of the QR code does not fit its contents.
     * This is done so that the inevitable clipping is handled more gracefully since this way at least something is
     * displayed instead of just a blank space filled by the background color.
     *
     * @param {Frame} frame - the {@link Frame} from which the module size is to be derived
     * @return {number} The pixel size for each module in the QR code which will be no less than one.
     * @protected
     * @memberof Renderer#
     */ getModuleSize: function getModuleSize(frame) {
            var qrious = this.qrious;
            var padding = qrious.padding || 0;
            var pixels = Math.floor((qrious.size - padding * 2) / frame.width);
            return Math.max(1, pixels);
        },
        /**
     * Calculates the offset/padding (in pixel units) to be inserted before the QR code based on the <code>frame</code>
     * provided.
     *
     * The returned value will be zero if there is no available offset or if the size of the QR code does not fit its
     * contents. It will never be a negative value. This is done so that the inevitable clipping appears more naturally
     * and it is not clipped from all directions.
     *
     * @param {Frame} frame - the {@link Frame} from which the offset is to be derived
     * @return {number} The pixel offset for the QR code which will be no less than zero.
     * @protected
     * @memberof Renderer#
     */ getOffset: function getOffset(frame) {
            var qrious = this.qrious;
            var padding = qrious.padding;
            if (padding != null) return padding;
            var moduleSize = this.getModuleSize(frame);
            var offset = Math.floor((qrious.size - moduleSize * frame.width) / 2);
            return Math.max(0, offset);
        },
        /**
     * Renders a QR code on the underlying element based on the <code>frame</code> provided.
     *
     * @param {Frame} frame - the {@link Frame} to be rendered
     * @return {void}
     * @public
     * @memberof Renderer#
     */ render: function render(frame) {
            if (this.enabled) {
                this.resize();
                this.reset();
                this.draw(frame);
            }
        },
        /**
     * Resets the underlying element, effectively clearing any previously rendered QR code.
     *
     * Implementations of {@link Renderer} <b>must</b> override this method with their own specific logic.
     *
     * @return {void}
     * @protected
     * @abstract
     * @memberof Renderer#
     */ reset: function reset() {},
        /**
     * Ensures that the size of the underlying element matches that defined on the associated {@link QRious} instance.
     *
     * Implementations of {@link Renderer} <b>must</b> override this method with their own specific logic.
     *
     * @return {void}
     * @protected
     * @abstract
     * @memberof Renderer#
     */ resize: function resize() {}
    });
    var Renderer_1 = Renderer;
    /**
   * An implementation of {@link Renderer} for working with <code>canvas</code> elements.
   *
   * @public
   * @class
   * @extends Renderer
   */ var CanvasRenderer = Renderer_1.extend({
        /**
     * @override
     */ draw: function draw(frame) {
            var i, j;
            var qrious = this.qrious;
            var moduleSize = this.getModuleSize(frame);
            var offset = this.getOffset(frame);
            var context = this.element.getContext("2d");
            context.fillStyle = qrious.foreground;
            context.globalAlpha = qrious.foregroundAlpha;
            for(i = 0; i < frame.width; i++){
                for(j = 0; j < frame.width; j++)if (frame.buffer[j * frame.width + i]) context.fillRect(moduleSize * i + offset, moduleSize * j + offset, moduleSize, moduleSize);
            }
        },
        /**
     * @override
     */ reset: function reset() {
            var qrious = this.qrious;
            var context = this.element.getContext("2d");
            var size = qrious.size;
            context.lineWidth = 1;
            context.clearRect(0, 0, size, size);
            context.fillStyle = qrious.background;
            context.globalAlpha = qrious.backgroundAlpha;
            context.fillRect(0, 0, size, size);
        },
        /**
     * @override
     */ resize: function resize() {
            var element = this.element;
            element.width = element.height = this.qrious.size;
        }
    });
    var CanvasRenderer_1 = CanvasRenderer;
    /* eslint no-multi-spaces: "off" */ /**
   * Contains alignment pattern information.
   *
   * @public
   * @class
   * @extends Nevis
   */ var Alignment = lite.extend(null, {
        /**
     * The alignment pattern block.
     *
     * @public
     * @static
     * @type {number[]}
     * @memberof Alignment
     */ BLOCK: [
            0,
            11,
            15,
            19,
            23,
            27,
            31,
            16,
            18,
            20,
            22,
            24,
            26,
            28,
            20,
            22,
            24,
            24,
            26,
            28,
            28,
            22,
            24,
            24,
            26,
            26,
            28,
            28,
            24,
            24,
            26,
            26,
            26,
            28,
            28,
            24,
            26,
            26,
            26,
            28,
            28
        ]
    });
    var Alignment_1 = Alignment;
    /* eslint no-multi-spaces: "off" */ /**
   * Contains error correction information.
   *
   * @public
   * @class
   * @extends Nevis
   */ var ErrorCorrection = lite.extend(null, {
        /**
     * The error correction blocks.
     *
     * There are four elements per version. The first two indicate the number of blocks, then the data width, and finally
     * the ECC width.
     *
     * @public
     * @static
     * @type {number[]}
     * @memberof ErrorCorrection
     */ BLOCKS: [
            1,
            0,
            19,
            7,
            1,
            0,
            16,
            10,
            1,
            0,
            13,
            13,
            1,
            0,
            9,
            17,
            1,
            0,
            34,
            10,
            1,
            0,
            28,
            16,
            1,
            0,
            22,
            22,
            1,
            0,
            16,
            28,
            1,
            0,
            55,
            15,
            1,
            0,
            44,
            26,
            2,
            0,
            17,
            18,
            2,
            0,
            13,
            22,
            1,
            0,
            80,
            20,
            2,
            0,
            32,
            18,
            2,
            0,
            24,
            26,
            4,
            0,
            9,
            16,
            1,
            0,
            108,
            26,
            2,
            0,
            43,
            24,
            2,
            2,
            15,
            18,
            2,
            2,
            11,
            22,
            2,
            0,
            68,
            18,
            4,
            0,
            27,
            16,
            4,
            0,
            19,
            24,
            4,
            0,
            15,
            28,
            2,
            0,
            78,
            20,
            4,
            0,
            31,
            18,
            2,
            4,
            14,
            18,
            4,
            1,
            13,
            26,
            2,
            0,
            97,
            24,
            2,
            2,
            38,
            22,
            4,
            2,
            18,
            22,
            4,
            2,
            14,
            26,
            2,
            0,
            116,
            30,
            3,
            2,
            36,
            22,
            4,
            4,
            16,
            20,
            4,
            4,
            12,
            24,
            2,
            2,
            68,
            18,
            4,
            1,
            43,
            26,
            6,
            2,
            19,
            24,
            6,
            2,
            15,
            28,
            4,
            0,
            81,
            20,
            1,
            4,
            50,
            30,
            4,
            4,
            22,
            28,
            3,
            8,
            12,
            24,
            2,
            2,
            92,
            24,
            6,
            2,
            36,
            22,
            4,
            6,
            20,
            26,
            7,
            4,
            14,
            28,
            4,
            0,
            107,
            26,
            8,
            1,
            37,
            22,
            8,
            4,
            20,
            24,
            12,
            4,
            11,
            22,
            3,
            1,
            115,
            30,
            4,
            5,
            40,
            24,
            11,
            5,
            16,
            20,
            11,
            5,
            12,
            24,
            5,
            1,
            87,
            22,
            5,
            5,
            41,
            24,
            5,
            7,
            24,
            30,
            11,
            7,
            12,
            24,
            5,
            1,
            98,
            24,
            7,
            3,
            45,
            28,
            15,
            2,
            19,
            24,
            3,
            13,
            15,
            30,
            1,
            5,
            107,
            28,
            10,
            1,
            46,
            28,
            1,
            15,
            22,
            28,
            2,
            17,
            14,
            28,
            5,
            1,
            120,
            30,
            9,
            4,
            43,
            26,
            17,
            1,
            22,
            28,
            2,
            19,
            14,
            28,
            3,
            4,
            113,
            28,
            3,
            11,
            44,
            26,
            17,
            4,
            21,
            26,
            9,
            16,
            13,
            26,
            3,
            5,
            107,
            28,
            3,
            13,
            41,
            26,
            15,
            5,
            24,
            30,
            15,
            10,
            15,
            28,
            4,
            4,
            116,
            28,
            17,
            0,
            42,
            26,
            17,
            6,
            22,
            28,
            19,
            6,
            16,
            30,
            2,
            7,
            111,
            28,
            17,
            0,
            46,
            28,
            7,
            16,
            24,
            30,
            34,
            0,
            13,
            24,
            4,
            5,
            121,
            30,
            4,
            14,
            47,
            28,
            11,
            14,
            24,
            30,
            16,
            14,
            15,
            30,
            6,
            4,
            117,
            30,
            6,
            14,
            45,
            28,
            11,
            16,
            24,
            30,
            30,
            2,
            16,
            30,
            8,
            4,
            106,
            26,
            8,
            13,
            47,
            28,
            7,
            22,
            24,
            30,
            22,
            13,
            15,
            30,
            10,
            2,
            114,
            28,
            19,
            4,
            46,
            28,
            28,
            6,
            22,
            28,
            33,
            4,
            16,
            30,
            8,
            4,
            122,
            30,
            22,
            3,
            45,
            28,
            8,
            26,
            23,
            30,
            12,
            28,
            15,
            30,
            3,
            10,
            117,
            30,
            3,
            23,
            45,
            28,
            4,
            31,
            24,
            30,
            11,
            31,
            15,
            30,
            7,
            7,
            116,
            30,
            21,
            7,
            45,
            28,
            1,
            37,
            23,
            30,
            19,
            26,
            15,
            30,
            5,
            10,
            115,
            30,
            19,
            10,
            47,
            28,
            15,
            25,
            24,
            30,
            23,
            25,
            15,
            30,
            13,
            3,
            115,
            30,
            2,
            29,
            46,
            28,
            42,
            1,
            24,
            30,
            23,
            28,
            15,
            30,
            17,
            0,
            115,
            30,
            10,
            23,
            46,
            28,
            10,
            35,
            24,
            30,
            19,
            35,
            15,
            30,
            17,
            1,
            115,
            30,
            14,
            21,
            46,
            28,
            29,
            19,
            24,
            30,
            11,
            46,
            15,
            30,
            13,
            6,
            115,
            30,
            14,
            23,
            46,
            28,
            44,
            7,
            24,
            30,
            59,
            1,
            16,
            30,
            12,
            7,
            121,
            30,
            12,
            26,
            47,
            28,
            39,
            14,
            24,
            30,
            22,
            41,
            15,
            30,
            6,
            14,
            121,
            30,
            6,
            34,
            47,
            28,
            46,
            10,
            24,
            30,
            2,
            64,
            15,
            30,
            17,
            4,
            122,
            30,
            29,
            14,
            46,
            28,
            49,
            10,
            24,
            30,
            24,
            46,
            15,
            30,
            4,
            18,
            122,
            30,
            13,
            32,
            46,
            28,
            48,
            14,
            24,
            30,
            42,
            32,
            15,
            30,
            20,
            4,
            117,
            30,
            40,
            7,
            47,
            28,
            43,
            22,
            24,
            30,
            10,
            67,
            15,
            30,
            19,
            6,
            118,
            30,
            18,
            31,
            47,
            28,
            34,
            34,
            24,
            30,
            20,
            61,
            15,
            30
        ],
        /**
     * The final format bits with mask (level << 3 | mask).
     *
     * @public
     * @static
     * @type {number[]}
     * @memberof ErrorCorrection
     */ FINAL_FORMAT: [
            // L
            0x77c4,
            0x72f3,
            0x7daa,
            0x789d,
            0x662f,
            0x6318,
            0x6c41,
            0x6976,
            // M
            0x5412,
            0x5125,
            0x5e7c,
            0x5b4b,
            0x45f9,
            0x40ce,
            0x4f97,
            0x4aa0,
            // Q
            0x355f,
            0x3068,
            0x3f31,
            0x3a06,
            0x24b4,
            0x2183,
            0x2eda,
            0x2bed,
            // H
            0x1689,
            0x13be,
            0x1ce7,
            0x19d0,
            0x0762,
            0x0255,
            0x0d0c,
            0x083b
        ],
        /**
     * A map of human-readable ECC levels.
     *
     * @public
     * @static
     * @type {Object.<string, number>}
     * @memberof ErrorCorrection
     */ LEVELS: {
            L: 1,
            M: 2,
            Q: 3,
            H: 4
        }
    });
    var ErrorCorrection_1 = ErrorCorrection;
    /**
   * Contains Galois field information.
   *
   * @public
   * @class
   * @extends Nevis
   */ var Galois = lite.extend(null, {
        /**
     * The Galois field exponent table.
     *
     * @public
     * @static
     * @type {number[]}
     * @memberof Galois
     */ EXPONENT: [
            0x01,
            0x02,
            0x04,
            0x08,
            0x10,
            0x20,
            0x40,
            0x80,
            0x1d,
            0x3a,
            0x74,
            0xe8,
            0xcd,
            0x87,
            0x13,
            0x26,
            0x4c,
            0x98,
            0x2d,
            0x5a,
            0xb4,
            0x75,
            0xea,
            0xc9,
            0x8f,
            0x03,
            0x06,
            0x0c,
            0x18,
            0x30,
            0x60,
            0xc0,
            0x9d,
            0x27,
            0x4e,
            0x9c,
            0x25,
            0x4a,
            0x94,
            0x35,
            0x6a,
            0xd4,
            0xb5,
            0x77,
            0xee,
            0xc1,
            0x9f,
            0x23,
            0x46,
            0x8c,
            0x05,
            0x0a,
            0x14,
            0x28,
            0x50,
            0xa0,
            0x5d,
            0xba,
            0x69,
            0xd2,
            0xb9,
            0x6f,
            0xde,
            0xa1,
            0x5f,
            0xbe,
            0x61,
            0xc2,
            0x99,
            0x2f,
            0x5e,
            0xbc,
            0x65,
            0xca,
            0x89,
            0x0f,
            0x1e,
            0x3c,
            0x78,
            0xf0,
            0xfd,
            0xe7,
            0xd3,
            0xbb,
            0x6b,
            0xd6,
            0xb1,
            0x7f,
            0xfe,
            0xe1,
            0xdf,
            0xa3,
            0x5b,
            0xb6,
            0x71,
            0xe2,
            0xd9,
            0xaf,
            0x43,
            0x86,
            0x11,
            0x22,
            0x44,
            0x88,
            0x0d,
            0x1a,
            0x34,
            0x68,
            0xd0,
            0xbd,
            0x67,
            0xce,
            0x81,
            0x1f,
            0x3e,
            0x7c,
            0xf8,
            0xed,
            0xc7,
            0x93,
            0x3b,
            0x76,
            0xec,
            0xc5,
            0x97,
            0x33,
            0x66,
            0xcc,
            0x85,
            0x17,
            0x2e,
            0x5c,
            0xb8,
            0x6d,
            0xda,
            0xa9,
            0x4f,
            0x9e,
            0x21,
            0x42,
            0x84,
            0x15,
            0x2a,
            0x54,
            0xa8,
            0x4d,
            0x9a,
            0x29,
            0x52,
            0xa4,
            0x55,
            0xaa,
            0x49,
            0x92,
            0x39,
            0x72,
            0xe4,
            0xd5,
            0xb7,
            0x73,
            0xe6,
            0xd1,
            0xbf,
            0x63,
            0xc6,
            0x91,
            0x3f,
            0x7e,
            0xfc,
            0xe5,
            0xd7,
            0xb3,
            0x7b,
            0xf6,
            0xf1,
            0xff,
            0xe3,
            0xdb,
            0xab,
            0x4b,
            0x96,
            0x31,
            0x62,
            0xc4,
            0x95,
            0x37,
            0x6e,
            0xdc,
            0xa5,
            0x57,
            0xae,
            0x41,
            0x82,
            0x19,
            0x32,
            0x64,
            0xc8,
            0x8d,
            0x07,
            0x0e,
            0x1c,
            0x38,
            0x70,
            0xe0,
            0xdd,
            0xa7,
            0x53,
            0xa6,
            0x51,
            0xa2,
            0x59,
            0xb2,
            0x79,
            0xf2,
            0xf9,
            0xef,
            0xc3,
            0x9b,
            0x2b,
            0x56,
            0xac,
            0x45,
            0x8a,
            0x09,
            0x12,
            0x24,
            0x48,
            0x90,
            0x3d,
            0x7a,
            0xf4,
            0xf5,
            0xf7,
            0xf3,
            0xfb,
            0xeb,
            0xcb,
            0x8b,
            0x0b,
            0x16,
            0x2c,
            0x58,
            0xb0,
            0x7d,
            0xfa,
            0xe9,
            0xcf,
            0x83,
            0x1b,
            0x36,
            0x6c,
            0xd8,
            0xad,
            0x47,
            0x8e,
            0x00
        ],
        /**
     * The Galois field log table.
     *
     * @public
     * @static
     * @type {number[]}
     * @memberof Galois
     */ LOG: [
            0xff,
            0x00,
            0x01,
            0x19,
            0x02,
            0x32,
            0x1a,
            0xc6,
            0x03,
            0xdf,
            0x33,
            0xee,
            0x1b,
            0x68,
            0xc7,
            0x4b,
            0x04,
            0x64,
            0xe0,
            0x0e,
            0x34,
            0x8d,
            0xef,
            0x81,
            0x1c,
            0xc1,
            0x69,
            0xf8,
            0xc8,
            0x08,
            0x4c,
            0x71,
            0x05,
            0x8a,
            0x65,
            0x2f,
            0xe1,
            0x24,
            0x0f,
            0x21,
            0x35,
            0x93,
            0x8e,
            0xda,
            0xf0,
            0x12,
            0x82,
            0x45,
            0x1d,
            0xb5,
            0xc2,
            0x7d,
            0x6a,
            0x27,
            0xf9,
            0xb9,
            0xc9,
            0x9a,
            0x09,
            0x78,
            0x4d,
            0xe4,
            0x72,
            0xa6,
            0x06,
            0xbf,
            0x8b,
            0x62,
            0x66,
            0xdd,
            0x30,
            0xfd,
            0xe2,
            0x98,
            0x25,
            0xb3,
            0x10,
            0x91,
            0x22,
            0x88,
            0x36,
            0xd0,
            0x94,
            0xce,
            0x8f,
            0x96,
            0xdb,
            0xbd,
            0xf1,
            0xd2,
            0x13,
            0x5c,
            0x83,
            0x38,
            0x46,
            0x40,
            0x1e,
            0x42,
            0xb6,
            0xa3,
            0xc3,
            0x48,
            0x7e,
            0x6e,
            0x6b,
            0x3a,
            0x28,
            0x54,
            0xfa,
            0x85,
            0xba,
            0x3d,
            0xca,
            0x5e,
            0x9b,
            0x9f,
            0x0a,
            0x15,
            0x79,
            0x2b,
            0x4e,
            0xd4,
            0xe5,
            0xac,
            0x73,
            0xf3,
            0xa7,
            0x57,
            0x07,
            0x70,
            0xc0,
            0xf7,
            0x8c,
            0x80,
            0x63,
            0x0d,
            0x67,
            0x4a,
            0xde,
            0xed,
            0x31,
            0xc5,
            0xfe,
            0x18,
            0xe3,
            0xa5,
            0x99,
            0x77,
            0x26,
            0xb8,
            0xb4,
            0x7c,
            0x11,
            0x44,
            0x92,
            0xd9,
            0x23,
            0x20,
            0x89,
            0x2e,
            0x37,
            0x3f,
            0xd1,
            0x5b,
            0x95,
            0xbc,
            0xcf,
            0xcd,
            0x90,
            0x87,
            0x97,
            0xb2,
            0xdc,
            0xfc,
            0xbe,
            0x61,
            0xf2,
            0x56,
            0xd3,
            0xab,
            0x14,
            0x2a,
            0x5d,
            0x9e,
            0x84,
            0x3c,
            0x39,
            0x53,
            0x47,
            0x6d,
            0x41,
            0xa2,
            0x1f,
            0x2d,
            0x43,
            0xd8,
            0xb7,
            0x7b,
            0xa4,
            0x76,
            0xc4,
            0x17,
            0x49,
            0xec,
            0x7f,
            0x0c,
            0x6f,
            0xf6,
            0x6c,
            0xa1,
            0x3b,
            0x52,
            0x29,
            0x9d,
            0x55,
            0xaa,
            0xfb,
            0x60,
            0x86,
            0xb1,
            0xbb,
            0xcc,
            0x3e,
            0x5a,
            0xcb,
            0x59,
            0x5f,
            0xb0,
            0x9c,
            0xa9,
            0xa0,
            0x51,
            0x0b,
            0xf5,
            0x16,
            0xeb,
            0x7a,
            0x75,
            0x2c,
            0xd7,
            0x4f,
            0xae,
            0xd5,
            0xe9,
            0xe6,
            0xe7,
            0xad,
            0xe8,
            0x74,
            0xd6,
            0xf4,
            0xea,
            0xa8,
            0x50,
            0x58,
            0xaf
        ]
    });
    var Galois_1 = Galois;
    /**
   * Contains version pattern information.
   *
   * @public
   * @class
   * @extends Nevis
   */ var Version = lite.extend(null, {
        /**
     * The version pattern block.
     *
     * @public
     * @static
     * @type {number[]}
     * @memberof Version
     */ BLOCK: [
            0xc94,
            0x5bc,
            0xa99,
            0x4d3,
            0xbf6,
            0x762,
            0x847,
            0x60d,
            0x928,
            0xb78,
            0x45d,
            0xa17,
            0x532,
            0x9a6,
            0x683,
            0x8c9,
            0x7ec,
            0xec4,
            0x1e1,
            0xfab,
            0x08e,
            0xc1a,
            0x33f,
            0xd75,
            0x250,
            0x9d5,
            0x6f0,
            0x8ba,
            0x79f,
            0xb0b,
            0x42e,
            0xa64,
            0x541,
            0xc69
        ]
    });
    var Version_1 = Version;
    /**
   * Generates information for a QR code frame based on a specific value to be encoded.
   *
   * @param {Frame~Options} options - the options to be used
   * @public
   * @class
   * @extends Nevis
   */ var Frame = lite.extend(function(options) {
        var dataBlock, eccBlock, index, neccBlock1, neccBlock2;
        var valueLength = options.value.length;
        this._badness = [];
        this._level = ErrorCorrection_1.LEVELS[options.level];
        this._polynomial = [];
        this._value = options.value;
        this._version = 0;
        this._stringBuffer = [];
        while(this._version < 40){
            this._version++;
            index = (this._level - 1) * 4 + (this._version - 1) * 16;
            neccBlock1 = ErrorCorrection_1.BLOCKS[index++];
            neccBlock2 = ErrorCorrection_1.BLOCKS[index++];
            dataBlock = ErrorCorrection_1.BLOCKS[index++];
            eccBlock = ErrorCorrection_1.BLOCKS[index];
            index = dataBlock * (neccBlock1 + neccBlock2) + neccBlock2 - 3 + (this._version <= 9);
            if (valueLength <= index) break;
        }
        this._dataBlock = dataBlock;
        this._eccBlock = eccBlock;
        this._neccBlock1 = neccBlock1;
        this._neccBlock2 = neccBlock2;
        /**
     * The data width is based on version.
     *
     * @public
     * @type {number}
     * @memberof Frame#
     */ // FIXME: Ensure that it fits instead of being truncated.
        var width = this.width = 17 + 4 * this._version;
        /**
     * The image buffer.
     *
     * @public
     * @type {number[]}
     * @memberof Frame#
     */ this.buffer = Frame._createArray(width * width);
        this._ecc = Frame._createArray(dataBlock + (dataBlock + eccBlock) * (neccBlock1 + neccBlock2) + neccBlock2);
        this._mask = Frame._createArray((width * (width + 1) + 1) / 2);
        this._insertFinders();
        this._insertAlignments();
        // Insert single foreground cell.
        this.buffer[8 + width * (width - 8)] = 1;
        this._insertTimingGap();
        this._reverseMask();
        this._insertTimingRowAndColumn();
        this._insertVersion();
        this._syncMask();
        this._convertBitStream(valueLength);
        this._calculatePolynomial();
        this._appendEccToData();
        this._interleaveBlocks();
        this._pack();
        this._finish();
    }, {
        _addAlignment: function _addAlignment(x, y) {
            var i;
            var buffer = this.buffer;
            var width = this.width;
            buffer[x + width * y] = 1;
            for(i = -2; i < 2; i++){
                buffer[x + i + width * (y - 2)] = 1;
                buffer[x - 2 + width * (y + i + 1)] = 1;
                buffer[x + 2 + width * (y + i)] = 1;
                buffer[x + i + 1 + width * (y + 2)] = 1;
            }
            for(i = 0; i < 2; i++){
                this._setMask(x - 1, y + i);
                this._setMask(x + 1, y - i);
                this._setMask(x - i, y - 1);
                this._setMask(x + i, y + 1);
            }
        },
        _appendData: function _appendData(data, dataLength, ecc, eccLength) {
            var bit, i, j;
            var polynomial = this._polynomial;
            var stringBuffer = this._stringBuffer;
            for(i = 0; i < eccLength; i++)stringBuffer[ecc + i] = 0;
            for(i = 0; i < dataLength; i++){
                bit = Galois_1.LOG[stringBuffer[data + i] ^ stringBuffer[ecc]];
                if (bit !== 255) for(j = 1; j < eccLength; j++)stringBuffer[ecc + j - 1] = stringBuffer[ecc + j] ^ Galois_1.EXPONENT[Frame._modN(bit + polynomial[eccLength - j])];
                else for(j = ecc; j < ecc + eccLength; j++)stringBuffer[j] = stringBuffer[j + 1];
                stringBuffer[ecc + eccLength - 1] = bit === 255 ? 0 : Galois_1.EXPONENT[Frame._modN(bit + polynomial[0])];
            }
        },
        _appendEccToData: function _appendEccToData() {
            var i;
            var data = 0;
            var dataBlock = this._dataBlock;
            var ecc = this._calculateMaxLength();
            var eccBlock = this._eccBlock;
            for(i = 0; i < this._neccBlock1; i++){
                this._appendData(data, dataBlock, ecc, eccBlock);
                data += dataBlock;
                ecc += eccBlock;
            }
            for(i = 0; i < this._neccBlock2; i++){
                this._appendData(data, dataBlock + 1, ecc, eccBlock);
                data += dataBlock + 1;
                ecc += eccBlock;
            }
        },
        _applyMask: function _applyMask(mask) {
            var r3x, r3y, x, y;
            var buffer = this.buffer;
            var width = this.width;
            switch(mask){
                case 0:
                    for(y = 0; y < width; y++){
                        for(x = 0; x < width; x++)if (!(x + y & 1) && !this._isMasked(x, y)) buffer[x + y * width] ^= 1;
                    }
                    break;
                case 1:
                    for(y = 0; y < width; y++){
                        for(x = 0; x < width; x++)if (!(y & 1) && !this._isMasked(x, y)) buffer[x + y * width] ^= 1;
                    }
                    break;
                case 2:
                    for(y = 0; y < width; y++)for(r3x = 0, x = 0; x < width; x++, r3x++){
                        if (r3x === 3) r3x = 0;
                        if (!r3x && !this._isMasked(x, y)) buffer[x + y * width] ^= 1;
                    }
                    break;
                case 3:
                    for(r3y = 0, y = 0; y < width; y++, r3y++){
                        if (r3y === 3) r3y = 0;
                        for(r3x = r3y, x = 0; x < width; x++, r3x++){
                            if (r3x === 3) r3x = 0;
                            if (!r3x && !this._isMasked(x, y)) buffer[x + y * width] ^= 1;
                        }
                    }
                    break;
                case 4:
                    for(y = 0; y < width; y++)for(r3x = 0, r3y = y >> 1 & 1, x = 0; x < width; x++, r3x++){
                        if (r3x === 3) {
                            r3x = 0;
                            r3y = !r3y;
                        }
                        if (!r3y && !this._isMasked(x, y)) buffer[x + y * width] ^= 1;
                    }
                    break;
                case 5:
                    for(r3y = 0, y = 0; y < width; y++, r3y++){
                        if (r3y === 3) r3y = 0;
                        for(r3x = 0, x = 0; x < width; x++, r3x++){
                            if (r3x === 3) r3x = 0;
                            if (!((x & y & 1) + !(!r3x | !r3y)) && !this._isMasked(x, y)) buffer[x + y * width] ^= 1;
                        }
                    }
                    break;
                case 6:
                    for(r3y = 0, y = 0; y < width; y++, r3y++){
                        if (r3y === 3) r3y = 0;
                        for(r3x = 0, x = 0; x < width; x++, r3x++){
                            if (r3x === 3) r3x = 0;
                            if (!((x & y & 1) + (r3x && r3x === r3y) & 1) && !this._isMasked(x, y)) buffer[x + y * width] ^= 1;
                        }
                    }
                    break;
                case 7:
                    for(r3y = 0, y = 0; y < width; y++, r3y++){
                        if (r3y === 3) r3y = 0;
                        for(r3x = 0, x = 0; x < width; x++, r3x++){
                            if (r3x === 3) r3x = 0;
                            if (!((r3x && r3x === r3y) + (x + y & 1) & 1) && !this._isMasked(x, y)) buffer[x + y * width] ^= 1;
                        }
                    }
                    break;
            }
        },
        _calculateMaxLength: function _calculateMaxLength() {
            return this._dataBlock * (this._neccBlock1 + this._neccBlock2) + this._neccBlock2;
        },
        _calculatePolynomial: function _calculatePolynomial() {
            var i, j;
            var eccBlock = this._eccBlock;
            var polynomial = this._polynomial;
            polynomial[0] = 1;
            for(i = 0; i < eccBlock; i++){
                polynomial[i + 1] = 1;
                for(j = i; j > 0; j--)polynomial[j] = polynomial[j] ? polynomial[j - 1] ^ Galois_1.EXPONENT[Frame._modN(Galois_1.LOG[polynomial[j]] + i)] : polynomial[j - 1];
                polynomial[0] = Galois_1.EXPONENT[Frame._modN(Galois_1.LOG[polynomial[0]] + i)];
            }
            // Use logs for generator polynomial to save calculation step.
            for(i = 0; i <= eccBlock; i++)polynomial[i] = Galois_1.LOG[polynomial[i]];
        },
        _checkBadness: function _checkBadness() {
            var b, b1, h, x, y;
            var bad = 0;
            var badness = this._badness;
            var buffer = this.buffer;
            var width = this.width;
            // Blocks of same colour.
            for(y = 0; y < width - 1; y++){
                for(x = 0; x < width - 1; x++)// All foreground colour.
                if (buffer[x + width * y] && buffer[x + 1 + width * y] && buffer[x + width * (y + 1)] && buffer[x + 1 + width * (y + 1)] || // All background colour.
                !(buffer[x + width * y] || buffer[x + 1 + width * y] || buffer[x + width * (y + 1)] || buffer[x + 1 + width * (y + 1)])) bad += Frame.N2;
            }
            var bw = 0;
            // X runs.
            for(y = 0; y < width; y++){
                h = 0;
                badness[0] = 0;
                for(b = 0, x = 0; x < width; x++){
                    b1 = buffer[x + width * y];
                    if (b === b1) badness[h]++;
                    else badness[++h] = 1;
                    b = b1;
                    bw += b ? 1 : -1;
                }
                bad += this._getBadness(h);
            }
            if (bw < 0) bw = -bw;
            var count = 0;
            var big = bw;
            big += big << 2;
            big <<= 1;
            while(big > width * width){
                big -= width * width;
                count++;
            }
            bad += count * Frame.N4;
            // Y runs.
            for(x = 0; x < width; x++){
                h = 0;
                badness[0] = 0;
                for(b = 0, y = 0; y < width; y++){
                    b1 = buffer[x + width * y];
                    if (b === b1) badness[h]++;
                    else badness[++h] = 1;
                    b = b1;
                }
                bad += this._getBadness(h);
            }
            return bad;
        },
        _convertBitStream: function _convertBitStream(length) {
            var bit, i;
            var ecc = this._ecc;
            var version = this._version;
            // Convert string to bit stream. 8-bit data to QR-coded 8-bit data (numeric, alphanumeric, or kanji not supported).
            for(i = 0; i < length; i++)ecc[i] = this._value.charCodeAt(i);
            var stringBuffer = this._stringBuffer = ecc.slice();
            var maxLength = this._calculateMaxLength();
            if (length >= maxLength - 2) {
                length = maxLength - 2;
                if (version > 9) length--;
            }
            // Shift and re-pack to insert length prefix.
            var index = length;
            if (version > 9) {
                stringBuffer[index + 2] = 0;
                stringBuffer[index + 3] = 0;
                while(index--){
                    bit = stringBuffer[index];
                    stringBuffer[index + 3] |= 255 & bit << 4;
                    stringBuffer[index + 2] = bit >> 4;
                }
                stringBuffer[2] |= 255 & length << 4;
                stringBuffer[1] = length >> 4;
                stringBuffer[0] = 0x40 | length >> 12;
            } else {
                stringBuffer[index + 1] = 0;
                stringBuffer[index + 2] = 0;
                while(index--){
                    bit = stringBuffer[index];
                    stringBuffer[index + 2] |= 255 & bit << 4;
                    stringBuffer[index + 1] = bit >> 4;
                }
                stringBuffer[1] |= 255 & length << 4;
                stringBuffer[0] = 0x40 | length >> 4;
            }
            // Fill to end with pad pattern.
            index = length + 3 - (version < 10);
            while(index < maxLength){
                stringBuffer[index++] = 0xec;
                stringBuffer[index++] = 0x11;
            }
        },
        _getBadness: function _getBadness(length) {
            var i;
            var badRuns = 0;
            var badness = this._badness;
            for(i = 0; i <= length; i++)if (badness[i] >= 5) badRuns += Frame.N1 + badness[i] - 5;
            // FBFFFBF as in finder.
            for(i = 3; i < length - 1; i += 2)if (badness[i - 2] === badness[i + 2] && badness[i + 2] === badness[i - 1] && badness[i - 1] === badness[i + 1] && badness[i - 1] * 3 === badness[i] && // Background around the foreground pattern? Not part of the specs.
            (badness[i - 3] === 0 || i + 3 > length || badness[i - 3] * 3 >= badness[i] * 4 || badness[i + 3] * 3 >= badness[i] * 4)) badRuns += Frame.N3;
            return badRuns;
        },
        _finish: function _finish() {
            // Save pre-mask copy of frame.
            this._stringBuffer = this.buffer.slice();
            var currentMask, i;
            var bit = 0;
            var mask = 30000;
            /*
       * Using for instead of while since in original Arduino code if an early mask was "good enough" it wouldn't try for
       * a better one since they get more complex and take longer.
       */ for(i = 0; i < 8; i++){
                // Returns foreground-background imbalance.
                this._applyMask(i);
                currentMask = this._checkBadness();
                // Is current mask better than previous best?
                if (currentMask < mask) {
                    mask = currentMask;
                    bit = i;
                }
                // Don't increment "i" to a void redoing mask.
                if (bit === 7) break;
                // Reset for next pass.
                this.buffer = this._stringBuffer.slice();
            }
            // Redo best mask as none were "good enough" (i.e. last wasn't bit).
            if (bit !== i) this._applyMask(bit);
            // Add in final mask/ECC level bytes.
            mask = ErrorCorrection_1.FINAL_FORMAT[bit + (this._level - 1 << 3)];
            var buffer = this.buffer;
            var width = this.width;
            // Low byte.
            for(i = 0; i < 8; i++, mask >>= 1)if (mask & 1) {
                buffer[width - 1 - i + width * 8] = 1;
                if (i < 6) buffer[8 + width * i] = 1;
                else buffer[8 + width * (i + 1)] = 1;
            }
            // High byte.
            for(i = 0; i < 7; i++, mask >>= 1)if (mask & 1) {
                buffer[8 + width * (width - 7 + i)] = 1;
                if (i) buffer[6 - i + width * 8] = 1;
                else buffer[7 + width * 8] = 1;
            }
        },
        _interleaveBlocks: function _interleaveBlocks() {
            var i, j;
            var dataBlock = this._dataBlock;
            var ecc = this._ecc;
            var eccBlock = this._eccBlock;
            var k = 0;
            var maxLength = this._calculateMaxLength();
            var neccBlock1 = this._neccBlock1;
            var neccBlock2 = this._neccBlock2;
            var stringBuffer = this._stringBuffer;
            for(i = 0; i < dataBlock; i++){
                for(j = 0; j < neccBlock1; j++)ecc[k++] = stringBuffer[i + j * dataBlock];
                for(j = 0; j < neccBlock2; j++)ecc[k++] = stringBuffer[neccBlock1 * dataBlock + i + j * (dataBlock + 1)];
            }
            for(j = 0; j < neccBlock2; j++)ecc[k++] = stringBuffer[neccBlock1 * dataBlock + i + j * (dataBlock + 1)];
            for(i = 0; i < eccBlock; i++)for(j = 0; j < neccBlock1 + neccBlock2; j++)ecc[k++] = stringBuffer[maxLength + i + j * eccBlock];
            this._stringBuffer = ecc;
        },
        _insertAlignments: function _insertAlignments() {
            var i, x, y;
            var version = this._version;
            var width = this.width;
            if (version > 1) {
                i = Alignment_1.BLOCK[version];
                y = width - 7;
                for(;;){
                    x = width - 7;
                    while(x > i - 3){
                        this._addAlignment(x, y);
                        if (x < i) break;
                        x -= i;
                    }
                    if (y <= i + 9) break;
                    y -= i;
                    this._addAlignment(6, y);
                    this._addAlignment(y, 6);
                }
            }
        },
        _insertFinders: function _insertFinders() {
            var i, j, x, y;
            var buffer = this.buffer;
            var width = this.width;
            for(i = 0; i < 3; i++){
                j = 0;
                y = 0;
                if (i === 1) j = width - 7;
                if (i === 2) y = width - 7;
                buffer[y + 3 + width * (j + 3)] = 1;
                for(x = 0; x < 6; x++){
                    buffer[y + x + width * j] = 1;
                    buffer[y + width * (j + x + 1)] = 1;
                    buffer[y + 6 + width * (j + x)] = 1;
                    buffer[y + x + 1 + width * (j + 6)] = 1;
                }
                for(x = 1; x < 5; x++){
                    this._setMask(y + x, j + 1);
                    this._setMask(y + 1, j + x + 1);
                    this._setMask(y + 5, j + x);
                    this._setMask(y + x + 1, j + 5);
                }
                for(x = 2; x < 4; x++){
                    buffer[y + x + width * (j + 2)] = 1;
                    buffer[y + 2 + width * (j + x + 1)] = 1;
                    buffer[y + 4 + width * (j + x)] = 1;
                    buffer[y + x + 1 + width * (j + 4)] = 1;
                }
            }
        },
        _insertTimingGap: function _insertTimingGap() {
            var x, y;
            var width = this.width;
            for(y = 0; y < 7; y++){
                this._setMask(7, y);
                this._setMask(width - 8, y);
                this._setMask(7, y + width - 7);
            }
            for(x = 0; x < 8; x++){
                this._setMask(x, 7);
                this._setMask(x + width - 8, 7);
                this._setMask(x, width - 8);
            }
        },
        _insertTimingRowAndColumn: function _insertTimingRowAndColumn() {
            var x;
            var buffer = this.buffer;
            var width = this.width;
            for(x = 0; x < width - 14; x++)if (x & 1) {
                this._setMask(8 + x, 6);
                this._setMask(6, 8 + x);
            } else {
                buffer[8 + x + width * 6] = 1;
                buffer[6 + width * (8 + x)] = 1;
            }
        },
        _insertVersion: function _insertVersion() {
            var i, j, x, y;
            var buffer = this.buffer;
            var version = this._version;
            var width = this.width;
            if (version > 6) {
                i = Version_1.BLOCK[version - 7];
                j = 17;
                for(x = 0; x < 6; x++){
                    for(y = 0; y < 3; y++, j--)if (1 & (j > 11 ? version >> j - 12 : i >> j)) {
                        buffer[5 - x + width * (2 - y + width - 11)] = 1;
                        buffer[2 - y + width - 11 + width * (5 - x)] = 1;
                    } else {
                        this._setMask(5 - x, 2 - y + width - 11);
                        this._setMask(2 - y + width - 11, 5 - x);
                    }
                }
            }
        },
        _isMasked: function _isMasked(x, y) {
            var bit = Frame._getMaskBit(x, y);
            return this._mask[bit] === 1;
        },
        _pack: function _pack() {
            var bit, i, j;
            var k = 1;
            var v = 1;
            var width = this.width;
            var x = width - 1;
            var y = width - 1;
            // Interleaved data and ECC codes.
            var length = (this._dataBlock + this._eccBlock) * (this._neccBlock1 + this._neccBlock2) + this._neccBlock2;
            for(i = 0; i < length; i++){
                bit = this._stringBuffer[i];
                for(j = 0; j < 8; j++, bit <<= 1){
                    if (0x80 & bit) this.buffer[x + width * y] = 1;
                    // Find next fill position.
                    do {
                        if (v) x--;
                        else {
                            x++;
                            if (k) {
                                if (y !== 0) y--;
                                else {
                                    x -= 2;
                                    k = !k;
                                    if (x === 6) {
                                        x--;
                                        y = 9;
                                    }
                                }
                            } else if (y !== width - 1) y++;
                            else {
                                x -= 2;
                                k = !k;
                                if (x === 6) {
                                    x--;
                                    y -= 8;
                                }
                            }
                        }
                        v = !v;
                    }while (this._isMasked(x, y));
                }
            }
        },
        _reverseMask: function _reverseMask() {
            var x, y;
            var width = this.width;
            for(x = 0; x < 9; x++)this._setMask(x, 8);
            for(x = 0; x < 8; x++){
                this._setMask(x + width - 8, 8);
                this._setMask(8, x);
            }
            for(y = 0; y < 7; y++)this._setMask(8, y + width - 7);
        },
        _setMask: function _setMask(x, y) {
            var bit = Frame._getMaskBit(x, y);
            this._mask[bit] = 1;
        },
        _syncMask: function _syncMask() {
            var x, y;
            var width = this.width;
            for(y = 0; y < width; y++){
                for(x = 0; x <= y; x++)if (this.buffer[x + width * y]) this._setMask(x, y);
            }
        }
    }, {
        _createArray: function _createArray(length) {
            var i;
            var array = [];
            for(i = 0; i < length; i++)array[i] = 0;
            return array;
        },
        _getMaskBit: function _getMaskBit(x, y) {
            var bit;
            if (x > y) {
                bit = x;
                x = y;
                y = bit;
            }
            bit = y;
            bit += y * y;
            bit >>= 1;
            bit += x;
            return bit;
        },
        _modN: function _modN(x) {
            while(x >= 255){
                x -= 255;
                x = (x >> 8) + (x & 255);
            }
            return x;
        },
        // *Badness* coefficients.
        N1: 3,
        N2: 3,
        N3: 40,
        N4: 10
    });
    var Frame_1 = Frame;
    /**
   * The options used by {@link Frame}.
   *
   * @typedef {Object} Frame~Options
   * @property {string} level - The ECC level to be used.
   * @property {string} value - The value to be encoded.
   */ /**
   * An implementation of {@link Renderer} for working with <code>img</code> elements.
   *
   * This depends on {@link CanvasRenderer} being executed first as this implementation simply applies the data URL from
   * the rendered <code>canvas</code> element as the <code>src</code> for the <code>img</code> element being rendered.
   *
   * @public
   * @class
   * @extends Renderer
   */ var ImageRenderer = Renderer_1.extend({
        /**
     * @override
     */ draw: function draw() {
            this.element.src = this.qrious.toDataURL();
        },
        /**
     * @override
     */ reset: function reset() {
            this.element.src = "";
        },
        /**
     * @override
     */ resize: function resize() {
            var element = this.element;
            element.width = element.height = this.qrious.size;
        }
    });
    var ImageRenderer_1 = ImageRenderer;
    /**
   * Defines an available option while also configuring how values are applied to the target object.
   *
   * Optionally, a default value can be specified as well a value transformer for greater control over how the option
   * value is applied.
   *
   * If no value transformer is specified, then any specified option will be applied directly. All values are maintained
   * on the target object itself as a field using the option name prefixed with a single underscore.
   *
   * When an option is specified as modifiable, the {@link OptionManager} will be required to include a setter for the
   * property that is defined on the target object that uses the option name.
   *
   * @param {string} name - the name to be used
   * @param {boolean} [modifiable] - <code>true</code> if the property defined on target objects should include a setter;
   * otherwise <code>false</code>
   * @param {*} [defaultValue] - the default value to be used
   * @param {Option~ValueTransformer} [valueTransformer] - the value transformer to be used
   * @public
   * @class
   * @extends Nevis
   */ var Option = lite.extend(function(name, modifiable, defaultValue, valueTransformer) {
        /**
     * The name for this {@link Option}.
     *
     * @public
     * @type {string}
     * @memberof Option#
     */ this.name = name;
        /**
     * Whether a setter should be included on the property defined on target objects for this {@link Option}.
     *
     * @public
     * @type {boolean}
     * @memberof Option#
     */ this.modifiable = Boolean(modifiable);
        /**
     * The default value for this {@link Option}.
     *
     * @public
     * @type {*}
     * @memberof Option#
     */ this.defaultValue = defaultValue;
        this._valueTransformer = valueTransformer;
    }, {
        /**
     * Transforms the specified <code>value</code> so that it can be applied for this {@link Option}.
     *
     * If a value transformer has been specified for this {@link Option}, it will be called upon to transform
     * <code>value</code>. Otherwise, <code>value</code> will be returned directly.
     *
     * @param {*} value - the value to be transformed
     * @return {*} The transformed value or <code>value</code> if no value transformer is specified.
     * @public
     * @memberof Option#
     */ transform: function transform(value) {
            var transformer = this._valueTransformer;
            if (typeof transformer === "function") return transformer(value, this);
            return value;
        }
    });
    var Option_1 = Option;
    /**
   * Returns a transformed value for the specified <code>value</code> to be applied for the <code>option</code> provided.
   *
   * @callback Option~ValueTransformer
   * @param {*} value - the value to be transformed
   * @param {Option} option - the {@link Option} for which <code>value</code> is being transformed
   * @return {*} The transform value.
   */ /**
   * Contains utility methods that are useful throughout the library.
   *
   * @public
   * @class
   * @extends Nevis
   */ var Utilities = lite.extend(null, {
        /**
     * Returns the absolute value of a given number.
     *
     * This method is simply a convenient shorthand for <code>Math.abs</code> while ensuring that nulls are returned as
     * <code>null</code> instead of zero.
     *
     * @param {number} value - the number whose absolute value is to be returned
     * @return {number} The absolute value of <code>value</code> or <code>null</code> if <code>value</code> is
     * <code>null</code>.
     * @public
     * @static
     * @memberof Utilities
     */ abs: function abs(value) {
            return value != null ? Math.abs(value) : null;
        },
        /**
     * Returns whether the specified <code>object</code> has a property with the specified <code>name</code> as an own
     * (not inherited) property.
     *
     * @param {Object} object - the object on which the property is to be checked
     * @param {string} name - the name of the property to be checked
     * @return {boolean} <code>true</code> if <code>object</code> has an own property with <code>name</code>.
     * @public
     * @static
     * @memberof Utilities
     */ hasOwn: function hasOwn(object, name) {
            return Object.prototype.hasOwnProperty.call(object, name);
        },
        /**
     * A non-operation method that does absolutely nothing.
     *
     * @return {void}
     * @public
     * @static
     * @memberof Utilities
     */ noop: function noop() {},
        /**
     * Transforms the specified <code>string</code> to upper case while remaining null-safe.
     *
     * @param {string} string - the string to be transformed to upper case
     * @return {string} <code>string</code> transformed to upper case if <code>string</code> is not <code>null</code>.
     * @public
     * @static
     * @memberof Utilities
     */ toUpperCase: function toUpperCase(string) {
            return string != null ? string.toUpperCase() : null;
        }
    });
    var Utilities_1 = Utilities;
    /**
   * Manages multiple {@link Option} instances that are intended to be used by multiple implementations.
   *
   * Although the option definitions are shared between targets, the values are maintained on the targets themselves.
   *
   * @param {Option[]} options - the options to be used
   * @public
   * @class
   * @extends Nevis
   */ var OptionManager = lite.extend(function(options) {
        /**
     * The available options for this {@link OptionManager}.
     *
     * @public
     * @type {Object.<string, Option>}
     * @memberof OptionManager#
     */ this.options = {};
        options.forEach(function(option) {
            this.options[option.name] = option;
        }, this);
    }, {
        /**
     * Returns whether an option with the specified <code>name</code> is available.
     *
     * @param {string} name - the name of the {@link Option} whose existence is to be checked
     * @return {boolean} <code>true</code> if an {@link Option} exists with <code>name</code>; otherwise
     * <code>false</code>.
     * @public
     * @memberof OptionManager#
     */ exists: function exists(name) {
            return this.options[name] != null;
        },
        /**
     * Returns the value of the option with the specified <code>name</code> on the <code>target</code> object provided.
     *
     * @param {string} name - the name of the {@link Option} whose value on <code>target</code> is to be returned
     * @param {Object} target - the object from which the value of the named {@link Option} is to be returned
     * @return {*} The value of the {@link Option} with <code>name</code> on <code>target</code>.
     * @public
     * @memberof OptionManager#
     */ get: function get(name, target) {
            return OptionManager._get(this.options[name], target);
        },
        /**
     * Returns a copy of all of the available options on the <code>target</code> object provided.
     *
     * @param {Object} target - the object from which the option name/value pairs are to be returned
     * @return {Object.<string, *>} A hash containing the name/value pairs of all options on <code>target</code>.
     * @public
     * @memberof OptionManager#
     */ getAll: function getAll(target) {
            var name;
            var options = this.options;
            var result = {};
            for(name in options)if (Utilities_1.hasOwn(options, name)) result[name] = OptionManager._get(options[name], target);
            return result;
        },
        /**
     * Initializes the available options for the <code>target</code> object provided and then applies the initial values
     * within the speciifed <code>options</code>.
     *
     * This method will throw an error if any of the names within <code>options</code> does not match an available option.
     *
     * This involves setting the default values and defining properties for all of the available options on
     * <code>target</code> before finally calling {@link OptionMananger#setAll} with <code>options</code> and
     * <code>target</code>. Any options that are configured to be modifiable will have a setter included in their defined
     * property that will allow its corresponding value to be modified.
     *
     * If a change handler is specified, it will be called whenever the value changes on <code>target</code> for a
     * modifiable option, but only when done so via the defined property's setter.
     *
     * @param {Object.<string, *>} options - the name/value pairs of the initial options to be set
     * @param {Object} target - the object on which the options are to be initialized
     * @param {Function} [changeHandler] - the function to be called whenever the value of an modifiable option changes on
     * <code>target</code>
     * @return {void}
     * @throws {Error} If <code>options</code> contains an invalid option name.
     * @public
     * @memberof OptionManager#
     */ init: function init(options, target, changeHandler) {
            if (typeof changeHandler !== "function") changeHandler = Utilities_1.noop;
            var name, option;
            for(name in this.options)if (Utilities_1.hasOwn(this.options, name)) {
                option = this.options[name];
                OptionManager._set(option, option.defaultValue, target);
                OptionManager._createAccessor(option, target, changeHandler);
            }
            this._setAll(options, target, true);
        },
        /**
     * Sets the value of the option with the specified <code>name</code> on the <code>target</code> object provided to
     * <code>value</code>.
     *
     * This method will throw an error if <code>name</code> does not match an available option or matches an option that
     * cannot be modified.
     *
     * If <code>value</code> is <code>null</code> and the {@link Option} has a default value configured, then that default
     * value will be used instead. If the {@link Option} also has a value transformer configured, it will be used to
     * transform whichever value was determined to be used.
     *
     * This method returns whether the value of the underlying field on <code>target</code> was changed as a result.
     *
     * @param {string} name - the name of the {@link Option} whose value is to be set
     * @param {*} value - the value to be set for the named {@link Option} on <code>target</code>
     * @param {Object} target - the object on which <code>value</code> is to be set for the named {@link Option}
     * @return {boolean} <code>true</code> if the underlying field on <code>target</code> was changed; otherwise
     * <code>false</code>.
     * @throws {Error} If <code>name</code> is invalid or is for an option that cannot be modified.
     * @public
     * @memberof OptionManager#
     */ set: function set(name, value, target) {
            return this._set(name, value, target);
        },
        /**
     * Sets all of the specified <code>options</code> on the <code>target</code> object provided to their corresponding
     * values.
     *
     * This method will throw an error if any of the names within <code>options</code> does not match an available option
     * or matches an option that cannot be modified.
     *
     * If any value within <code>options</code> is <code>null</code> and the corresponding {@link Option} has a default
     * value configured, then that default value will be used instead. If an {@link Option} also has a value transformer
     * configured, it will be used to transform whichever value was determined to be used.
     *
     * This method returns whether the value for any of the underlying fields on <code>target</code> were changed as a
     * result.
     *
     * @param {Object.<string, *>} options - the name/value pairs of options to be set
     * @param {Object} target - the object on which the options are to be set
     * @return {boolean} <code>true</code> if any of the underlying fields on <code>target</code> were changed; otherwise
     * <code>false</code>.
     * @throws {Error} If <code>options</code> contains an invalid option name or an option that cannot be modiifed.
     * @public
     * @memberof OptionManager#
     */ setAll: function setAll(options, target) {
            return this._setAll(options, target);
        },
        _set: function _set(name, value, target, allowUnmodifiable) {
            var option = this.options[name];
            if (!option) throw new Error("Invalid option: " + name);
            if (!option.modifiable && !allowUnmodifiable) throw new Error("Option cannot be modified: " + name);
            return OptionManager._set(option, value, target);
        },
        _setAll: function _setAll(options, target, allowUnmodifiable) {
            if (!options) return false;
            var name;
            var changed = false;
            for(name in options)if (Utilities_1.hasOwn(options, name) && this._set(name, options[name], target, allowUnmodifiable)) changed = true;
            return changed;
        }
    }, {
        _createAccessor: function _createAccessor(option, target, changeHandler) {
            var descriptor = {
                get: function get() {
                    return OptionManager._get(option, target);
                }
            };
            if (option.modifiable) descriptor.set = function(value) {
                if (OptionManager._set(option, value, target)) changeHandler(value, option);
            };
            Object.defineProperty(target, option.name, descriptor);
        },
        _get: function _get(option, target) {
            return target["_" + option.name];
        },
        _set: function _set(option, value, target) {
            var fieldName = "_" + option.name;
            var oldValue = target[fieldName];
            var newValue = option.transform(value != null ? value : option.defaultValue);
            target[fieldName] = newValue;
            return newValue !== oldValue;
        }
    });
    var OptionManager_1 = OptionManager;
    /**
   * Called whenever the value of a modifiable {@link Option} is changed on a target object via the defined property's
   * setter.
   *
   * @callback OptionManager~ChangeHandler
   * @param {*} value - the new value for <code>option</code> on the target object
   * @param {Option} option - the modifable {@link Option} whose value has changed on the target object.
   * @return {void}
   */ /**
   * A basic manager for {@link Service} implementations that are mapped to simple names.
   *
   * @public
   * @class
   * @extends Nevis
   */ var ServiceManager = lite.extend(function() {
        this._services = {};
    }, {
        /**
     * Returns the {@link Service} being managed with the specified <code>name</code>.
     *
     * @param {string} name - the name of the {@link Service} to be returned
     * @return {Service} The {@link Service} is being managed with <code>name</code>.
     * @throws {Error} If no {@link Service} is being managed with <code>name</code>.
     * @public
     * @memberof ServiceManager#
     */ getService: function getService(name) {
            var service = this._services[name];
            if (!service) throw new Error("Service is not being managed with name: " + name);
            return service;
        },
        /**
     * Sets the {@link Service} implementation to be managed for the specified <code>name</code> to the
     * <code>service</code> provided.
     *
     * @param {string} name - the name of the {@link Service} to be managed with <code>name</code>
     * @param {Service} service - the {@link Service} implementation to be managed
     * @return {void}
     * @throws {Error} If a {@link Service} is already being managed with the same <code>name</code>.
     * @public
     * @memberof ServiceManager#
     */ setService: function setService(name, service) {
            if (this._services[name]) throw new Error("Service is already managed with name: " + name);
            if (service) this._services[name] = service;
        }
    });
    var ServiceManager_1 = ServiceManager;
    var optionManager = new OptionManager_1([
        new Option_1("background", true, "white"),
        new Option_1("backgroundAlpha", true, 1, Utilities_1.abs),
        new Option_1("element"),
        new Option_1("foreground", true, "black"),
        new Option_1("foregroundAlpha", true, 1, Utilities_1.abs),
        new Option_1("level", true, "L", Utilities_1.toUpperCase),
        new Option_1("mime", true, "image/png"),
        new Option_1("padding", true, null, Utilities_1.abs),
        new Option_1("size", true, 100, Utilities_1.abs),
        new Option_1("value", true, "")
    ]);
    var serviceManager = new ServiceManager_1();
    /**
   * Enables configuration of a QR code generator which uses HTML5 <code>canvas</code> for rendering.
   *
   * @param {QRious~Options} [options] - the options to be used
   * @throws {Error} If any <code>options</code> are invalid.
   * @public
   * @class
   * @extends Nevis
   */ var QRious = lite.extend(function(options) {
        optionManager.init(options, this, this.update.bind(this));
        var element = optionManager.get("element", this);
        var elementService = serviceManager.getService("element");
        var canvas = element && elementService.isCanvas(element) ? element : elementService.createCanvas();
        var image = element && elementService.isImage(element) ? element : elementService.createImage();
        this._canvasRenderer = new CanvasRenderer_1(this, canvas, true);
        this._imageRenderer = new ImageRenderer_1(this, image, image === element);
        this.update();
    }, {
        /**
     * Returns all of the options configured for this {@link QRious}.
     *
     * Any changes made to the returned object will not be reflected in the options themselves or their corresponding
     * underlying fields.
     *
     * @return {Object.<string, *>} A copy of the applied options.
     * @public
     * @memberof QRious#
     */ get: function get() {
            return optionManager.getAll(this);
        },
        /**
     * Sets all of the specified <code>options</code> and automatically updates this {@link QRious} if any of the
     * underlying fields are changed as a result.
     *
     * This is the preferred method for updating multiple options at one time to avoid unnecessary updates between
     * changes.
     *
     * @param {QRious~Options} options - the options to be set
     * @return {void}
     * @throws {Error} If any <code>options</code> are invalid or cannot be modified.
     * @public
     * @memberof QRious#
     */ set: function set(options) {
            if (optionManager.setAll(options, this)) this.update();
        },
        /**
     * Returns the image data URI for the generated QR code using the <code>mime</code> provided.
     *
     * @param {string} [mime] - the MIME type for the image
     * @return {string} The image data URI for the QR code.
     * @public
     * @memberof QRious#
     */ toDataURL: function toDataURL(mime) {
            return this.canvas.toDataURL(mime || this.mime);
        },
        /**
     * Updates this {@link QRious} by generating a new {@link Frame} and re-rendering the QR code.
     *
     * @return {void}
     * @protected
     * @memberof QRious#
     */ update: function update() {
            var frame = new Frame_1({
                level: this.level,
                value: this.value
            });
            this._canvasRenderer.render(frame);
            this._imageRenderer.render(frame);
        }
    }, {
        /**
     * Configures the <code>service</code> provided to be used by all {@link QRious} instances.
     *
     * @param {Service} service - the {@link Service} to be configured
     * @return {void}
     * @throws {Error} If a {@link Service} has already been configured with the same name.
     * @public
     * @static
     * @memberof QRious
     */ use: function use(service) {
            serviceManager.setService(service.getName(), service);
        }
    });
    Object.defineProperties(QRious.prototype, {
        canvas: {
            /**
       * Returns the <code>canvas</code> element being used to render the QR code for this {@link QRious}.
       *
       * @return {*} The <code>canvas</code> element.
       * @public
       * @memberof QRious#
       * @alias canvas
       */ get: function get() {
                return this._canvasRenderer.getElement();
            }
        },
        image: {
            /**
       * Returns the <code>img</code> element being used to render the QR code for this {@link QRious}.
       *
       * @return {*} The <code>img</code> element.
       * @public
       * @memberof QRious#
       * @alias image
       */ get: function get() {
                return this._imageRenderer.getElement();
            }
        }
    });
    var QRious_1$2 = QRious;
    /**
   * The options used by {@link QRious}.
   *
   * @typedef {Object} QRious~Options
   * @property {string} [background="white"] - The background color to be applied to the QR code.
   * @property {number} [backgroundAlpha=1] - The background alpha to be applied to the QR code.
   * @property {*} [element] - The element to be used to render the QR code which may either be an <code>canvas</code> or
   * <code>img</code>. The element(s) will be created if needed.
   * @property {string} [foreground="black"] - The foreground color to be applied to the QR code.
   * @property {number} [foregroundAlpha=1] - The foreground alpha to be applied to the QR code.
   * @property {string} [level="L"] - The error correction level to be applied to the QR code.
   * @property {string} [mime="image/png"] - The MIME type to be used to render the image for the QR code.
   * @property {number} [padding] - The padding for the QR code in pixels.
   * @property {number} [size=100] - The size of the QR code in pixels.
   * @property {string} [value=""] - The value to be encoded within the QR code.
   */ var index = QRious_1$2;
    /**
   * Defines a service contract that must be met by all implementations.
   *
   * @public
   * @class
   * @extends Nevis
   */ var Service = lite.extend({
        /**
     * Returns the name of this {@link Service}.
     *
     * @return {string} The service name.
     * @public
     * @abstract
     * @memberof Service#
     */ getName: function getName() {}
    });
    var Service_1 = Service;
    /**
   * A service for working with elements.
   *
   * @public
   * @class
   * @extends Service
   */ var ElementService = Service_1.extend({
        /**
     * Creates an instance of a canvas element.
     *
     * Implementations of {@link ElementService} <b>must</b> override this method with their own specific logic.
     *
     * @return {*} The newly created canvas element.
     * @public
     * @abstract
     * @memberof ElementService#
     */ createCanvas: function createCanvas() {},
        /**
     * Creates an instance of a image element.
     *
     * Implementations of {@link ElementService} <b>must</b> override this method with their own specific logic.
     *
     * @return {*} The newly created image element.
     * @public
     * @abstract
     * @memberof ElementService#
     */ createImage: function createImage() {},
        /**
     * @override
     */ getName: function getName() {
            return "element";
        },
        /**
     * Returns whether the specified <code>element</code> is a canvas.
     *
     * Implementations of {@link ElementService} <b>must</b> override this method with their own specific logic.
     *
     * @param {*} element - the element to be checked
     * @return {boolean} <code>true</code> if <code>element</code> is a canvas; otherwise <code>false</code>.
     * @public
     * @abstract
     * @memberof ElementService#
     */ isCanvas: function isCanvas(element) {},
        /**
     * Returns whether the specified <code>element</code> is an image.
     *
     * Implementations of {@link ElementService} <b>must</b> override this method with their own specific logic.
     *
     * @param {*} element - the element to be checked
     * @return {boolean} <code>true</code> if <code>element</code> is an image; otherwise <code>false</code>.
     * @public
     * @abstract
     * @memberof ElementService#
     */ isImage: function isImage(element) {}
    });
    var ElementService_1 = ElementService;
    /**
   * An implementation of {@link ElementService} intended for use within a browser environment.
   *
   * @public
   * @class
   * @extends ElementService
   */ var BrowserElementService = ElementService_1.extend({
        /**
     * @override
     */ createCanvas: function createCanvas() {
            return document.createElement("canvas");
        },
        /**
     * @override
     */ createImage: function createImage() {
            return document.createElement("img");
        },
        /**
     * @override
     */ isCanvas: function isCanvas(element) {
            return element instanceof HTMLCanvasElement;
        },
        /**
     * @override
     */ isImage: function isImage(element) {
            return element instanceof HTMLImageElement;
        }
    });
    var BrowserElementService_1 = BrowserElementService;
    index.use(new BrowserElementService_1());
    var QRious_1 = index;
    return QRious_1;
});


"use strict";
var $17d11d58618cc814$export$471f7ae5c4103ae1 = "";
var $17d11d58618cc814$export$a5a6e0b888b2c992 = {};
var $17d11d58618cc814$export$57fcf9ca838ce2c6 = "h";
var $17d11d58618cc814$var$links = "";
var $17d11d58618cc814$var$chat_data = [];
var $17d11d58618cc814$var$lastPeerId = null;
var $17d11d58618cc814$var$peer = null;
var $17d11d58618cc814$var$conn = null;
var $17d11d58618cc814$var$room_favorits = [];
var $17d11d58618cc814$var$debug = false;
if ($17d11d58618cc814$var$debug) window.onerror = function(msg, url, linenumber) {
    alert("Error message: " + msg + "\nURL: " + url + "\nLine Number: " + linenumber);
    return true;
};
//load settings
(0, (/*@__PURE__*/$parcel$interopDefault($9fbe31c6ff058869$exports))).getItem("settings").then(function(value) {
    $17d11d58618cc814$export$a5a6e0b888b2c992 = value;
    if ($17d11d58618cc814$export$a5a6e0b888b2c992 == null) $17d11d58618cc814$export$a5a6e0b888b2c992 = {
        nickname: "DEFAULT",
        server_url: "-",
        server_path: "-",
        server_port: "-"
    };
}).catch(function(err) {
    console.log(err);
});
//load room favorits
(0, (/*@__PURE__*/$parcel$interopDefault($9fbe31c6ff058869$exports))).getItem("roomfavorits").then(function(value) {
    if (value != null) $17d11d58618cc814$var$room_favorits = value;
}).catch(function(err) {
    console.log(err);
});
var $17d11d58618cc814$var$warning_leave_chat = function warning_leave_chat() {
    $17d11d58618cc814$export$471f7ae5c4103ae1 = "confirm";
    if (confirm("Do you really want leave the room?")) {
        (0, (/*@__PURE__*/$parcel$interopDefault($fa8308bd2c5b6d7e$exports))).route.set("/start");
        setTimeout(function() {
            $17d11d58618cc814$export$471f7ae5c4103ae1 = "";
        }, 1000);
    } else setTimeout(function() {
        $17d11d58618cc814$export$471f7ae5c4103ae1 = "";
    }, 1000);
};
var $17d11d58618cc814$var$addToFavorit = function addToFavorit() {
    console.log(typeof $17d11d58618cc814$var$room_favorits === "undefined" ? "undefined" : (0, $7bd6d9ddf4a378c5$export$5f0017c582d45a2d)($17d11d58618cc814$var$room_favorits));
    $17d11d58618cc814$var$room_favorits.push($17d11d58618cc814$export$57fcf9ca838ce2c6);
    console.log("favorits: " + $17d11d58618cc814$var$room_favorits);
    (0, (/*@__PURE__*/$parcel$interopDefault($9fbe31c6ff058869$exports))).setItem("roomfavorits", $17d11d58618cc814$var$room_favorits).then(function(value) {
        // Do other things once the value has been saved.
        (0, $162001cafa2b40fd$export$6593825dc0f3a767)("favorit saved", 2000);
        (0, (/*@__PURE__*/$parcel$interopDefault($fa8308bd2c5b6d7e$exports))).route.set("/chat");
    }).catch(function(err) {
        // This code runs if there were any errors
        console.log(err);
    });
    console.log($17d11d58618cc814$var$room_favorits);
};
var $17d11d58618cc814$var$server_config = {
    iceServers: [
        {
            urls: "stun:stun.l.google.com:19302"
        },
        {
            urls: "stun:iphone-stun.strato-iphone.de:3478"
        },
        {
            urls: "stun:numb.viagenie.ca:3478"
        },
        {
            urls: "stun:openrelay.metered.ca:80"
        },
        {
            urls: "turn:openrelay.metered.ca:80",
            username: "openrelayproject",
            credential: "openrelayproject"
        },
        {
            urls: "turn:openrelay.metered.ca:443",
            username: "openrelayproject",
            credential: "openrelayproject"
        },
        {
            urls: "turn:openrelay.metered.ca:443?transport=tcp",
            username: "openrelayproject",
            credential: "openrelayproject"
        }
    ]
};
var $17d11d58618cc814$var$focus_last_article = function focus_last_article() {
    setTimeout(function() {
        var a = document.querySelectorAll("div#app article");
        a[a.length - 1].focus();
    }, 1000);
};
function $17d11d58618cc814$var$sendMessage(msg, type) {
    if ($17d11d58618cc814$var$conn && $17d11d58618cc814$var$conn.open) {
        if (type == "image") {
            // Encode the file using the FileReader API
            var reader = new FileReader();
            reader.onloadend = function() {
                //add image to feed
                var src = URL.createObjectURL(msg.blob);
                $17d11d58618cc814$var$chat_data.push({
                    username: $17d11d58618cc814$export$a5a6e0b888b2c992.nickname,
                    content: "",
                    datetime: new Date(),
                    image: src
                });
                msg = {
                    file: reader.result,
                    filename: msg.filename,
                    filetype: msg.type
                };
                $17d11d58618cc814$var$conn.send(msg);
                (0, (/*@__PURE__*/$parcel$interopDefault($fa8308bd2c5b6d7e$exports))).redraw();
                $17d11d58618cc814$var$focus_last_article();
            };
            reader.readAsDataURL(msg.blob);
        }
        if (type == "text") {
            if (msg == "") return false;
            msg = {
                text: msg
            };
            $17d11d58618cc814$var$chat_data.push({
                nickname: $17d11d58618cc814$export$a5a6e0b888b2c992.nickname,
                content: msg.text,
                datetime: new Date()
            });
            $17d11d58618cc814$var$conn.send(msg);
            (0, (/*@__PURE__*/$parcel$interopDefault($fa8308bd2c5b6d7e$exports))).redraw();
            $17d11d58618cc814$var$focus_last_article();
        }
        document.querySelector("div#message-input input").value = "";
    } else (0, $162001cafa2b40fd$export$6593825dc0f3a767)("There is no one connected to the room, you cannot broadcast.", 10000);
}
var $17d11d58618cc814$var$close_connection = function close_connection() {
    $17d11d58618cc814$var$conn.close();
};
var $17d11d58618cc814$var$list_peers = function list_peers() {
    try {
        $17d11d58618cc814$var$peer.listAllPeers(function(res) {
            (0, $162001cafa2b40fd$export$6593825dc0f3a767)(res, 3000);
        });
    } catch (e) {
        (0, $162001cafa2b40fd$export$6593825dc0f3a767)(e, 3000);
    }
};
function $17d11d58618cc814$var$ready() {
    $17d11d58618cc814$var$conn.on("data", function(data) {
        if (data.file) $17d11d58618cc814$var$chat_data.push({
            nickname: $17d11d58618cc814$export$a5a6e0b888b2c992.nickname,
            content: "",
            datetime: new Date(),
            image: data.file
        });
        if (data.text) $17d11d58618cc814$var$chat_data.push({
            nickname: $17d11d58618cc814$export$a5a6e0b888b2c992.nickname,
            content: data.text,
            datetime: new Date()
        });
        (0, (/*@__PURE__*/$parcel$interopDefault($fa8308bd2c5b6d7e$exports))).redraw();
        $17d11d58618cc814$var$focus_last_article();
    });
    $17d11d58618cc814$var$conn.on("close", function() {
        $17d11d58618cc814$var$conn = null;
        (0, $162001cafa2b40fd$export$6593825dc0f3a767)("connection closed", 1000);
    });
}
function $17d11d58618cc814$var$initialize() {
    // Create own peer object with connection to shared PeerJS server
    $17d11d58618cc814$var$peer = new Peer({
        debug: 3,
        referrerPolicy: "origin-when-cross-origin"
    });
    $17d11d58618cc814$var$peer.on("open", function(id) {
        if ($17d11d58618cc814$var$peer.id === null) $17d11d58618cc814$var$peer.id = $17d11d58618cc814$var$lastPeerId;
        else $17d11d58618cc814$var$lastPeerId = $17d11d58618cc814$var$peer.id;
        $17d11d58618cc814$export$57fcf9ca838ce2c6 = $17d11d58618cc814$var$peer.id;
        console.log("ccm" + $17d11d58618cc814$export$57fcf9ca838ce2c6);
    });
    $17d11d58618cc814$var$peer.on("connection", function(c) {
        $17d11d58618cc814$var$ready();
    });
    $17d11d58618cc814$var$peer.on("disconnected", function() {
        // Workaround for peer.reconnect deleting previous id
        $17d11d58618cc814$var$peer.id = $17d11d58618cc814$var$lastPeerId;
        $17d11d58618cc814$var$peer._lastServerId = $17d11d58618cc814$var$lastPeerId;
        $17d11d58618cc814$var$peer.reconnect();
    });
    $17d11d58618cc814$var$peer.on("close", function() {
        (0, $162001cafa2b40fd$export$6593825dc0f3a767)("connection closed", 1000);
        $17d11d58618cc814$var$conn = null;
    });
    $17d11d58618cc814$var$peer.on("error", function(err) {
        console.log(err);
    });
}
function $17d11d58618cc814$var$join(id) {
    // Close old connection
    if ($17d11d58618cc814$var$conn) $17d11d58618cc814$var$conn.close();
    // Create connection to destination peer
    $17d11d58618cc814$var$conn = $17d11d58618cc814$var$peer.connect(id, {
        reliable: true
    });
    $17d11d58618cc814$var$conn.on("open", function() {
        (0, $162001cafa2b40fd$export$6593825dc0f3a767)("Connected", 5000);
    });
    // Handle incoming data (messages only since this is the signal sender)
    $17d11d58618cc814$var$conn.on("data", function(data) {
        if (data.file) $17d11d58618cc814$var$chat_data.push({
            nickname: $17d11d58618cc814$export$a5a6e0b888b2c992.nickname,
            content: "",
            datetime: new Date(),
            image: data.file
        });
        if (data.text) $17d11d58618cc814$var$chat_data.push({
            nickname: $17d11d58618cc814$export$a5a6e0b888b2c992.nickname,
            content: data.text,
            datetime: new Date()
        });
        (0, (/*@__PURE__*/$parcel$interopDefault($fa8308bd2c5b6d7e$exports))).redraw();
        $17d11d58618cc814$var$focus_last_article();
    });
    $17d11d58618cc814$var$conn.on("close", function() {
        (0, $162001cafa2b40fd$export$6593825dc0f3a767)("Connection is closed", 10000);
    });
}
//create peer
var $17d11d58618cc814$var$create_peer = function create_peer() {
    (0, (/*@__PURE__*/$parcel$interopDefault($fa8308bd2c5b6d7e$exports))).route.set("/chat");
    $17d11d58618cc814$var$peer = new Peer({
        debug: 3,
        referrerPolicy: "origin-when-cross-origin"
    });
    $17d11d58618cc814$var$peer.on("open", function(id) {
        // Workaround for peer.reconnect deleting previous id
        if ($17d11d58618cc814$var$peer.id === null) $17d11d58618cc814$var$peer.id = $17d11d58618cc814$var$lastPeerId;
        else $17d11d58618cc814$var$lastPeerId = $17d11d58618cc814$var$peer.id;
        $17d11d58618cc814$export$57fcf9ca838ce2c6 = $17d11d58618cc814$var$peer.id;
        //make qr code
        var qrs = new (0, (/*@__PURE__*/$parcel$interopDefault($fc3b5a28c7651bef$exports)))();
        qrs.set({
            background: "white",
            foreground: "black",
            level: "H",
            padding: 5,
            size: 200,
            value: $17d11d58618cc814$var$lastPeerId
        });
        $17d11d58618cc814$var$chat_data.push({
            nickname: $17d11d58618cc814$export$a5a6e0b888b2c992.nickname,
            content: "room created",
            datetime: new Date(),
            image: qrs.toDataURL()
        });
        (0, $162001cafa2b40fd$export$247be4ede8e3a24a)("<img src='assets/image/pencil.svg'>", "", "<img src='assets/image/option.svg'>");
        (0, (/*@__PURE__*/$parcel$interopDefault($fa8308bd2c5b6d7e$exports))).redraw();
    });
    $17d11d58618cc814$var$peer.on("connection", function(c) {
        $17d11d58618cc814$var$conn = c;
        (0, $162001cafa2b40fd$export$6593825dc0f3a767)("Connected");
        $17d11d58618cc814$var$ready();
    });
    $17d11d58618cc814$var$peer.on("disconnected", function() {
        (0, $162001cafa2b40fd$export$6593825dc0f3a767)("Connection lost. Please reconnect", 3000);
        // Workaround for peer.reconnect deleting previous id
        $17d11d58618cc814$var$peer.id = $17d11d58618cc814$var$lastPeerId;
        $17d11d58618cc814$var$peer._lastServerId = $17d11d58618cc814$var$lastPeerId;
        $17d11d58618cc814$var$peer.reconnect();
    });
    $17d11d58618cc814$var$peer.on("close", function() {
        $17d11d58618cc814$var$conn = null;
        (0, $162001cafa2b40fd$export$6593825dc0f3a767)("Connection destroyed", 3000);
    });
    $17d11d58618cc814$var$peer.on("error", function(err) {
        console.log(err);
    });
};
//connect to peer
var $17d11d58618cc814$var$connect_to_peer = function connect_to_peer(_id) {
    (0, (/*@__PURE__*/$parcel$interopDefault($fa8308bd2c5b6d7e$exports))).route.set("/chat");
    $17d11d58618cc814$var$initialize();
    setTimeout(function() {
        $17d11d58618cc814$var$join(_id);
    }, 2000);
};
var $17d11d58618cc814$var$handleImage = function handleImage(t) {
    (0, (/*@__PURE__*/$parcel$interopDefault($fa8308bd2c5b6d7e$exports))).route.set("/chat");
    if (t != "") $17d11d58618cc814$var$sendMessage(t, "image");
    var a = document.querySelectorAll("div#app article");
    a[a.length - 1].focus();
    $17d11d58618cc814$export$471f7ae5c4103ae1 = "";
};
var $17d11d58618cc814$var$time_parse = function time_parse(value) {
    var t = new Date(value);
    return t.getDate() + " " + (0, $162001cafa2b40fd$export$af5de1609f06c8e6)[t.getMonth()] + " " + t.getFullYear() + ", " + t.getHours() + ":" + t.getMinutes();
};
//callback qr-code scan
var $17d11d58618cc814$var$scan_callback = function scan_callback(n) {
    (0, $2b0cc46421a6d3fe$export$55e6c60a43cc74e2)();
    $17d11d58618cc814$var$connect_to_peer(n);
    $17d11d58618cc814$var$chat_data.push({
        content: "connected",
        datetime: new Date()
    });
    (0, (/*@__PURE__*/$parcel$interopDefault($fa8308bd2c5b6d7e$exports))).redraw();
};
//callback geolocation
var $17d11d58618cc814$var$geolocation_callback = function geolocation_callback(e) {
    console.log(e.coords.latitude);
    var link_url = "https://www.openstreetmap.org/#map=19/" + e.coords.latitude + "/" + e.coords.longitude;
    $17d11d58618cc814$var$chat_data.push({
        content: link_url,
        datetime: new Date()
    });
    $17d11d58618cc814$var$sendMessage(link_url, "text");
    (0, (/*@__PURE__*/$parcel$interopDefault($fa8308bd2c5b6d7e$exports))).route.set("/chat");
};
var $17d11d58618cc814$var$root = document.getElementById("app");
var $17d11d58618cc814$var$settings_page = {
    view: function view() {
        return (0, (/*@__PURE__*/$parcel$interopDefault($fa8308bd2c5b6d7e$exports)))("div", {
            class: "flex justify-content-spacearound",
            id: "settings_page"
        }, [
            (0, (/*@__PURE__*/$parcel$interopDefault($fa8308bd2c5b6d7e$exports)))("div", {
                tabindex: 0,
                class: "item input-parent  flex width-100 justify-content-spacearound",
                oncreate: function(param) {
                    var dom = param.dom;
                    return setTimeout(function() {
                        dom.focus();
                    }, 500);
                }
            }, [
                (0, (/*@__PURE__*/$parcel$interopDefault($fa8308bd2c5b6d7e$exports)))("label", {
                    for: "Nickname"
                }, "Nickname"),
                (0, (/*@__PURE__*/$parcel$interopDefault($fa8308bd2c5b6d7e$exports)))("input", {
                    id: "nickname",
                    placeholder: "nickname",
                    value: $17d11d58618cc814$export$a5a6e0b888b2c992.nickname
                })
            ]),
            (0, (/*@__PURE__*/$parcel$interopDefault($fa8308bd2c5b6d7e$exports)))("H2", {}, "Server Settings"),
            (0, (/*@__PURE__*/$parcel$interopDefault($fa8308bd2c5b6d7e$exports)))("div", {
                tabindex: 1,
                class: "item input-parent  flex width-100 justify-content-spacearound"
            }, [
                (0, (/*@__PURE__*/$parcel$interopDefault($fa8308bd2c5b6d7e$exports)))("label", {
                    for: "server_url"
                }, "URL"),
                (0, (/*@__PURE__*/$parcel$interopDefault($fa8308bd2c5b6d7e$exports)))("input", {
                    id: "server_url",
                    placeholder: "Server URL",
                    value: $17d11d58618cc814$export$a5a6e0b888b2c992.server_url
                })
            ]),
            (0, (/*@__PURE__*/$parcel$interopDefault($fa8308bd2c5b6d7e$exports)))("div", {
                tabindex: 2,
                class: "item input-parent  flex width-100 justify-content-spacearound"
            }, [
                (0, (/*@__PURE__*/$parcel$interopDefault($fa8308bd2c5b6d7e$exports)))("label", {
                    for: "server_path"
                }, "Path"),
                (0, (/*@__PURE__*/$parcel$interopDefault($fa8308bd2c5b6d7e$exports)))("input", {
                    id: "server_path",
                    placeholder: "Path",
                    value: $17d11d58618cc814$export$a5a6e0b888b2c992.server_path
                })
            ]),
            (0, (/*@__PURE__*/$parcel$interopDefault($fa8308bd2c5b6d7e$exports)))("div", {
                tabindex: 3,
                class: "item input-parent  flex width-100 justify-content-spacearound"
            }, [
                (0, (/*@__PURE__*/$parcel$interopDefault($fa8308bd2c5b6d7e$exports)))("label", {
                    for: "server_port"
                }, "Port"),
                (0, (/*@__PURE__*/$parcel$interopDefault($fa8308bd2c5b6d7e$exports)))("input", {
                    id: "server_port",
                    placeholder: "Port",
                    value: $17d11d58618cc814$export$a5a6e0b888b2c992.server_port
                })
            ]),
            (0, (/*@__PURE__*/$parcel$interopDefault($fa8308bd2c5b6d7e$exports)))("button", {
                tabindex: 4,
                class: "item",
                "data-function": "save-settings",
                onclick: function onclick() {
                    $17d11d58618cc814$export$a5a6e0b888b2c992.nickname = document.getElementById("nickname").value;
                    $17d11d58618cc814$export$a5a6e0b888b2c992.server_url = document.getElementById("server_url").value;
                    $17d11d58618cc814$export$a5a6e0b888b2c992.server_path = document.getElementById("server_path").value;
                    $17d11d58618cc814$export$a5a6e0b888b2c992.server_port = document.getElementById("server_port").value;
                    (0, (/*@__PURE__*/$parcel$interopDefault($9fbe31c6ff058869$exports))).setItem("settings", $17d11d58618cc814$export$a5a6e0b888b2c992).then(function(value) {
                        // Do other things once the value has been saved.
                        (0, $162001cafa2b40fd$export$6593825dc0f3a767)("settings saved", 2000);
                        window.location.replace("/start");
                    }).catch(function(err) {
                        // This code runs if there were any errors
                        console.log(err);
                    });
                }
            }, "save settings")
        ]);
    }
};
var $17d11d58618cc814$var$options = {
    view: function view() {
        (0, $162001cafa2b40fd$export$247be4ede8e3a24a)("", "select", "");
        return (0, (/*@__PURE__*/$parcel$interopDefault($fa8308bd2c5b6d7e$exports)))("div", {
            class: "flex justify-content-spacearound",
            id: "login"
        }, [
            (0, (/*@__PURE__*/$parcel$interopDefault($fa8308bd2c5b6d7e$exports)))("button", {
                oncreate: function(param) {
                    var dom = param.dom;
                    return setTimeout(function() {
                        dom.focus();
                    }, 500);
                },
                class: "item",
                tabindex: 0,
                onclick: function onclick() {
                    (0, $162001cafa2b40fd$export$6714d0f9237d35de)($17d11d58618cc814$var$handleImage);
                }
            }, "share image"),
            (0, (/*@__PURE__*/$parcel$interopDefault($fa8308bd2c5b6d7e$exports)))("button", {
                class: "item",
                tabindex: 1,
                onclick: function onclick() {
                    (0, $162001cafa2b40fd$export$33d904bed5c25b69)($17d11d58618cc814$var$geolocation_callback);
                }
            }, "share location"),
            (0, (/*@__PURE__*/$parcel$interopDefault($fa8308bd2c5b6d7e$exports)))("button", {
                class: "item",
                tabindex: 2,
                onclick: function onclick() {
                    $17d11d58618cc814$var$addToFavorit();
                }
            }, "add room to favorits")
        ]);
    }
};
var $17d11d58618cc814$var$login = {
    view: function view() {
        return (0, (/*@__PURE__*/$parcel$interopDefault($fa8308bd2c5b6d7e$exports)))("div", {
            class: "flex justify-content-spacearound",
            id: "login"
        }, [
            (0, (/*@__PURE__*/$parcel$interopDefault($fa8308bd2c5b6d7e$exports)))("div", {
                class: "item input-parent  flex width-100 justify-content-spacearound",
                tabindex: 0
            }, [
                (0, (/*@__PURE__*/$parcel$interopDefault($fa8308bd2c5b6d7e$exports)))("input", {
                    id: "username",
                    placeholder: "username"
                })
            ]),
            (0, (/*@__PURE__*/$parcel$interopDefault($fa8308bd2c5b6d7e$exports)))("div", {
                id: "login-icon-box"
            }),
            (0, (/*@__PURE__*/$parcel$interopDefault($fa8308bd2c5b6d7e$exports)))("button", {
                class: "item",
                "data-function": "login-check",
                tabindex: 1,
                onclick: function onclick() {
                    $17d11d58618cc814$export$a5a6e0b888b2c992.username = document.getElementById("username").value;
                    window.location.replace("/start");
                }
            }, "enter")
        ]);
    }
};
var $17d11d58618cc814$var$start = {
    view: function view() {
        return (0, (/*@__PURE__*/$parcel$interopDefault($fa8308bd2c5b6d7e$exports)))("div", {
            class: "flex justify-content-spacearound",
            id: "start",
            oncreate: function() {
                (0, $162001cafa2b40fd$export$247be4ede8e3a24a)("", "<img src='assets/image/select.svg'>", "<img src='assets/image/option.svg'>");
            }
        }, [
            (0, (/*@__PURE__*/$parcel$interopDefault($fa8308bd2c5b6d7e$exports)))("button", {
                oncreate: function(param) {
                    var dom = param.dom;
                    return setTimeout(function() {
                        dom.focus();
                    }, 500);
                },
                class: "item",
                tabindex: 0,
                onclick: function onclick() {
                    (0, $2b0cc46421a6d3fe$export$be96fe42679d1b7e)($17d11d58618cc814$var$scan_callback);
                },
                onfocus: function() {
                    (0, $162001cafa2b40fd$export$247be4ede8e3a24a)("", "<img src='assets/image/select.svg'>", "");
                }
            }, "connect to room by QR-Code"),
            (0, (/*@__PURE__*/$parcel$interopDefault($fa8308bd2c5b6d7e$exports)))("button", {
                class: "item",
                "data-function": "create-peer",
                tabindex: 1,
                onclick: function onclick() {
                    $17d11d58618cc814$var$create_peer();
                },
                onfocus: function() {
                    (0, $162001cafa2b40fd$export$247be4ede8e3a24a)("", "<img src='assets/image/select.svg'>", "");
                }
            }, "create room"),
            (0, (/*@__PURE__*/$parcel$interopDefault($fa8308bd2c5b6d7e$exports)))("button", {
                class: "item",
                "data-function": "create-peer",
                tabindex: 2,
                onclick: function onclick() {
                    (0, (/*@__PURE__*/$parcel$interopDefault($fa8308bd2c5b6d7e$exports))).route.set("/favorits_page");
                },
                onfocus: function() {
                    (0, $162001cafa2b40fd$export$247be4ede8e3a24a)("", "<img src='assets/image/select.svg'>", "");
                }
            }, "favorits"),
            (0, (/*@__PURE__*/$parcel$interopDefault($fa8308bd2c5b6d7e$exports)))("button", {
                class: "item",
                "data-function": "settings",
                tabindex: 3,
                onclick: function onclick() {
                    (0, (/*@__PURE__*/$parcel$interopDefault($fa8308bd2c5b6d7e$exports))).route.set("/settings_page");
                },
                onfocus: function() {
                    (0, $162001cafa2b40fd$export$247be4ede8e3a24a)("", "<img src='assets/image/select.svg'>", "");
                }
            }, "settings")
        ]);
    }
};
var $17d11d58618cc814$var$links_page = {
    view: function view(vnode) {
        return $17d11d58618cc814$var$links.map(function(item, index) {
            return (0, (/*@__PURE__*/$parcel$interopDefault($fa8308bd2c5b6d7e$exports)))("button", {
                tabindex: index,
                class: "item",
                onclick: function onclick() {
                    window.open(item.href);
                    (0, (/*@__PURE__*/$parcel$interopDefault($fa8308bd2c5b6d7e$exports))).route.set("/chat");
                }
            }, item.href);
        });
    }
};
var $17d11d58618cc814$var$favorits_page = {
    view: function view(vnode) {
        return $17d11d58618cc814$var$room_favorits.map(function(item, index) {
            (0, $162001cafa2b40fd$export$247be4ede8e3a24a)("", "select", "");
            console.log(item);
            return (0, (/*@__PURE__*/$parcel$interopDefault($fa8308bd2c5b6d7e$exports)))("button", {
                class: "item",
                tabindex: index,
                onclick: function onclick() {
                    $17d11d58618cc814$var$connect_to_peer(item);
                }
            }, item);
        });
    }
};
var $17d11d58618cc814$var$chat = {
    view: function view() {
        return (0, (/*@__PURE__*/$parcel$interopDefault($fa8308bd2c5b6d7e$exports)))("div", {
            oncreate: function() {
                (0, $162001cafa2b40fd$export$247be4ede8e3a24a)("<img src='assets/image/pencil.svg'>", "", "<img src='assets/image/option.svg'>");
            }
        }, (0, (/*@__PURE__*/$parcel$interopDefault($fa8308bd2c5b6d7e$exports)))("div", {
            id: "message-input",
            type: "text"
        }, [
            (0, (/*@__PURE__*/$parcel$interopDefault($fa8308bd2c5b6d7e$exports)))("input", {
                type: "text"
            })
        ]), $17d11d58618cc814$var$chat_data.map(function(item, index) {
            return (0, (/*@__PURE__*/$parcel$interopDefault($fa8308bd2c5b6d7e$exports)))("article", {
                class: "item",
                tabindex: index
            }, [
                (0, (/*@__PURE__*/$parcel$interopDefault($fa8308bd2c5b6d7e$exports)))("div", {
                    class: "flex message-head"
                }, [
                    (0, (/*@__PURE__*/$parcel$interopDefault($fa8308bd2c5b6d7e$exports)))("div", $17d11d58618cc814$var$time_parse(item.datetime)),
                    (0, (/*@__PURE__*/$parcel$interopDefault($fa8308bd2c5b6d7e$exports)))("div", {
                        class: "nickname"
                    }, item.nickname)
                ]),
                (0, (/*@__PURE__*/$parcel$interopDefault($fa8308bd2c5b6d7e$exports)))("div", {
                    class: "message-main"
                }, item.content),
                (0, (/*@__PURE__*/$parcel$interopDefault($fa8308bd2c5b6d7e$exports)))("img", {
                    class: "message-media",
                    src: item.image
                })
            ]);
        }));
    }
};
var $17d11d58618cc814$var$intro = {
    view: function view() {
        return (0, (/*@__PURE__*/$parcel$interopDefault($fa8308bd2c5b6d7e$exports)))("div", {
            class: "width-100 height-100",
            id: "intro"
        }, [
            (0, (/*@__PURE__*/$parcel$interopDefault($fa8308bd2c5b6d7e$exports)))("img", {
                src: "./assets/icons/intro.svg",
                oncreate: function() {
                    setTimeout(function() {
                        (0, (/*@__PURE__*/$parcel$interopDefault($fa8308bd2c5b6d7e$exports))).route.set("/start");
                    }, 3000);
                }
            }),
            (0, (/*@__PURE__*/$parcel$interopDefault($fa8308bd2c5b6d7e$exports)))("div", {
                class: "width-100",
                id: "version"
            })
        ]);
    }
};
(0, (/*@__PURE__*/$parcel$interopDefault($fa8308bd2c5b6d7e$exports))).route($17d11d58618cc814$var$root, "/intro", {
    "/intro": $17d11d58618cc814$var$intro,
    "/login": $17d11d58618cc814$var$login,
    "/start": $17d11d58618cc814$var$start,
    "/links_page": $17d11d58618cc814$var$links_page,
    "/chat": $17d11d58618cc814$var$chat,
    "/options": $17d11d58618cc814$var$options,
    "/settings_page": $17d11d58618cc814$var$settings_page,
    "/favorits_page": $17d11d58618cc814$var$favorits_page
});
document.addEventListener("DOMContentLoaded", function(e) {
    (0, $162001cafa2b40fd$export$247be4ede8e3a24a)("", "", "");
    var write = function write() {
        if (document.getElementById("message-input").style.display == "none") {
            document.getElementById("message-input").style.display = "block";
            document.querySelector("div#message-input input").focus();
            $17d11d58618cc814$export$471f7ae5c4103ae1 = "write";
            (0, $162001cafa2b40fd$export$247be4ede8e3a24a)("<img src='assets/image/send.svg'>", "", "<img src='assets/image/option.svg'>");
        } else {
            document.querySelector("div#message-input input").value = "";
            document.getElementById("message-input").style.display = "none";
            $17d11d58618cc814$var$focus_last_article();
            $17d11d58618cc814$export$471f7ae5c4103ae1 = "";
        }
    };
    /////////////////
    ///NAVIGATION
    /////////////////
    var nav = function nav(move) {
        if (document.activeElement.nodeName == "SELECT" || document.activeElement.type == "date" || document.activeElement.type == "time") return false;
        var currentIndex = document.activeElement.tabIndex;
        var next = currentIndex + move;
        var items = 0;
        var b = document.activeElement.parentNode;
        items = b.querySelectorAll(".item");
        if (document.activeElement.parentNode.classList.contains("input-parent")) {
            document.activeElement.parentNode.focus();
            return true;
        }
        var targetElement = 0;
        if (next <= items.length) {
            targetElement = items[next];
            targetElement.focus();
        }
        if (next == items.length) {
            targetElement = items[0];
            targetElement.focus();
        }
        var rect = document.activeElement.getBoundingClientRect();
        var elY = rect.top - document.body.getBoundingClientRect().top + rect.height / 2;
        document.activeElement.parentNode.scrollBy({
            left: 0,
            top: elY - window.innerHeight / 2,
            behavior: "smooth"
        });
    };
    // ////////////////////////////
    // //KEYPAD HANDLER////////////
    // ////////////////////////////
    var longpress = false;
    var longpress_timespan = 1000;
    var timeout;
    function repeat_action(param) {
        param.key;
    }
    // ////////////
    // //LONGPRESS
    // ///////////
    function longpress_action(param) {
        switch(param.key){
            case "0":
                break;
            case "Backspace":
                window.close();
                break;
            case "ArrowLeft":
                break;
        }
    }
    // /////////////
    // //SHORTPRESS
    // ////////////
    function shortpress_action(param) {
        if ($17d11d58618cc814$export$471f7ae5c4103ae1 == "confirm") return false;
        var route = (0, (/*@__PURE__*/$parcel$interopDefault($fa8308bd2c5b6d7e$exports))).route.get();
        //user avatar
        if (route == "/login") {
            var refresh = function refresh() {
                document.getElementById("login-icon-box").innerHTML = "<identicon-svg username='hasard' saturation='95' lightness='60'>";
            };
            //avatar
            var usernameInput = document.querySelector("#username");
            usernameInput.addEventListener("input", function() {
                refresh();
            });
        }
        if (route == "/start") $17d11d58618cc814$var$chat_data = [];
        switch(param.key){
            case "*":
                break;
            case "ArrowUp":
                nav(-1);
                break;
            case "ArrowDown":
                nav(1);
                break;
            case "ArrowRight":
                break;
            case "ArrowLeft":
                break;
            case "SoftRight":
            case "Alt":
                if (route == "/chat") (0, (/*@__PURE__*/$parcel$interopDefault($fa8308bd2c5b6d7e$exports))).route.set("/options");
                break;
            case "SoftLeft":
            case "Control":
                if (route == "/chat" && $17d11d58618cc814$export$471f7ae5c4103ae1 !== "write") {
                    write();
                    break;
                }
                if (route == "/chat" && $17d11d58618cc814$export$471f7ae5c4103ae1 === "write") $17d11d58618cc814$var$sendMessage(document.getElementsByTagName("input")[0].value, "text");
                break;
            case "Enter":
                if (document.activeElement.classList.contains("input-parent")) document.activeElement.children[0].focus();
                if (route == "/chat") {
                    if (document.activeElement.tagName == "ARTICLE") {
                        $17d11d58618cc814$var$links = $410e7a787f87a2b4$export$71aa6c912b956294(document.activeElement.textContent);
                        if ($17d11d58618cc814$var$links.length >= 0) (0, (/*@__PURE__*/$parcel$interopDefault($fa8308bd2c5b6d7e$exports))).route.set("/links_page");
                        $17d11d58618cc814$var$links.forEach(function(e) {
                            console.log(e);
                        });
                    }
                    break;
                }
                break;
            case "Backspace":
                (0, $2b0cc46421a6d3fe$export$55e6c60a43cc74e2)();
                break;
        }
    }
    // ///////////////////////////////
    // //shortpress / longpress logic
    // //////////////////////////////
    function handleKeyDown(evt) {
        if (evt.key === "Backspace" && (0, (/*@__PURE__*/$parcel$interopDefault($fa8308bd2c5b6d7e$exports))).route.get() != "/start") evt.preventDefault();
        if (evt.key === "Backspace") {
            if ((0, (/*@__PURE__*/$parcel$interopDefault($fa8308bd2c5b6d7e$exports))).route.get() === "/chat") {
                $17d11d58618cc814$var$warning_leave_chat();
                return false;
            }
            if ((0, (/*@__PURE__*/$parcel$interopDefault($fa8308bd2c5b6d7e$exports))).route.get() == "/chat" || (0, (/*@__PURE__*/$parcel$interopDefault($fa8308bd2c5b6d7e$exports))).route.get() == "/settings_page" || (0, (/*@__PURE__*/$parcel$interopDefault($fa8308bd2c5b6d7e$exports))).route.get() == "/favorits_page") {
                (0, (/*@__PURE__*/$parcel$interopDefault($fa8308bd2c5b6d7e$exports))).route.set("/start");
                if ($17d11d58618cc814$var$conn) $17d11d58618cc814$var$close_connection();
            }
            if ((0, (/*@__PURE__*/$parcel$interopDefault($fa8308bd2c5b6d7e$exports))).route.get() == "/options" || (0, (/*@__PURE__*/$parcel$interopDefault($fa8308bd2c5b6d7e$exports))).route.get() == "/links_page") (0, (/*@__PURE__*/$parcel$interopDefault($fa8308bd2c5b6d7e$exports))).route.set("/chat");
        }
        if (evt.key === "EndCall") {
            evt.preventDefault();
            window.close();
        }
        if (!evt.repeat) {
            longpress = false;
            timeout = setTimeout(function() {
                longpress = true;
                longpress_action(evt);
            }, longpress_timespan);
        }
        if (evt.repeat) {
            if (evt.key == "Backspace") longpress = false;
            repeat_action(evt);
        }
    }
    function handleKeyUp(evt) {
        if ($17d11d58618cc814$export$471f7ae5c4103ae1.visible === false) return false;
        evt.key == "Backspace" && document.activeElement.tagName;
        clearTimeout(timeout);
        if (!longpress) shortpress_action(evt);
    }
    var handleVisibilityChange = function handleVisibilityChange() {};
    handleVisibilityChange();
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);
    document.addEventListener("visibilitychange", handleVisibilityChange, false);
});

})();
