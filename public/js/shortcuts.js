

Function.prototype.method = function (name, func) {
    this.prototype[name] = func;
    return this;
};

Function.method('inherits', function (parent) {
    var d = {}, p = (this.prototype = new parent());
    this.method('uber', function uber(name) {
        if (!(name in d)) {
            d[name] = 0;
        }        
        var f, r, t = d[name], v = parent.prototype;
        if (t) {
            while (t) {
                v = v.constructor.prototype;
                t -= 1;
            }
            f = v[name];
        } else {
            f = p[name];
            if (f == this[name]) {
                f = v[name];
            }
        }
        d[name] += 1;
        r = f.apply(this, Array.prototype.slice.apply(arguments, [1]));
        d[name] -= 1;
        return r;
    });
    return this;
});

//add functions from a class to another class
Function.method('swiss', function (parent) {
    for (var i = 1; i < arguments.length; i += 1) {
        var name = arguments[i];
        this.prototype[name] = parent.prototype[name];
    }
    return this;
});


/**
* A generic way to define a getter/setter for
* objects in both the legacy Mozilla way and the new ECMA standard way,
* which should work in I.E. with DOM Elements, but not js objects.
*
* more info on javascript getters and setters:
* John Resig: http://bit.ly/resig-js-gs-2007
* Robert Nyman: http://bit.ly/nyman-js-gs-2009
*
* @author somethingkindawierd@gmail.com (Jon Beebe)
* @param {string} label The property name to get/set.
* @param {function} getter The get function.
* @param {function} setter The set function.
*/
addProperty = function (obj, label, getter, setter) {
    if (Object.defineProperty) {
        Object.defineProperty(
        obj,
        label,
        {
            get: getter,
            set: setter
        }
    );
    }
    else {
        if (getter) {
            obj.__defineGetter__(label, getter);
        }
        if (setter) {
            obj.__defineSetter__(label, setter);
        }
    }

};

/**
* A generic way to define a group of getters/setters for objects
*
* @author somethingkindawierd@gmail.com (Jon Beebe)
* @param {object} p Set of properties and their getter/setter methods.
*/
addProperties = function (obj, p) {

    for (var label in p) {
        if (p.hasOwnProperty(label)) {
            addProperty(obj, label, p[label].get, p[label].set);
        }
    }

};



/////////////////////////////////////////////// X AND Y ON $

$.prototype.move = function (x, y) {
    this.css('left', x);
    this.css('top', y);
}
   
$.prototype.scrollToBottom = function() {
    this.scrollTop(10000000000);
}
     
addProperties($.prototype, {
    id: {
        get: function () {
            return this.attr('id');
        },
        set: function (val) {
            this.attr('id', val);
        }
    },
    x: {
        get: function () {
            return parseInt(this.css('left'));
        },
        set: function (val) {
            this.css('left', val);
        }
    },
    y: {
        get: function () {
            return parseInt(this.css('top'));
        },
        set: function (val) {
            this.css('top', val);
        }
    }
    
});


Math.randint = function (min, max) {
    return Math.floor(Math.random() * (max+1-min) + min);
}

Math.cap = function(val, min, max) {
    if (val < min) return min;
    if (val > max) return max;
    return val;
}


var DIV = "<div></div>";

function copyProps(to, from) {
    for (var prop in from) {
        to[prop] = from[prop];
    }
    
    return to;
}

function fillProps(to, from) {
    for (var prop in from) {
        if (!to[prop]) {
            to[prop] = from[prop];
        }
    }
    
    return to;   
}




function ColorFromRgb(rgb) {
    rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    
    this.r = parseInt(rgb[1]);   
    this.g = parseInt(rgb[2]);
    this.b = parseInt(rgb[3]);
    return this;
}

ColorFromRgb.prototype.toString = function() {
    return "rgb(" + this.r + ","  + this.g + "," + this.b + ")";
}
