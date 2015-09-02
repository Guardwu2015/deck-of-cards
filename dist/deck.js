'use strict';

var Deck = (function () {
  'use strict';

  var memoized = {};

  function prefix(param) {
    if (typeof memoized[param] !== 'undefined') {
      return memoized[param];
    }
    var body = document.body;
    var camelCase = param[0].toUpperCase() + param.slice(1);
    if (typeof body[param] !== 'undefined') {
      memoized[param] = param;
      return param;
    }
    var test = 'webkit' + camelCase;
    if (test) {
      memoized[param] = test;
      return test;
    }
    test = 'moz' + camelCase;
    if (test) {
      memoized[param] = test;
      return test;
    }
    test = 'o' + camelCase;
    if (test) {
      memoized[param] = test;
      return test;
    }
    test = 'ms' + camelCase;
    if (test) {
      memoized[param] = test;
      return test;
    }
  }

  var _____transition = prefix('transition');
  var _____transform = prefix('transform');
  var transformOrigin = prefix('transformOrigin');

  function fan(card, $el) {
    card.fan = function (i, cb) {
      var z = i / 5;
      var delay = i * 10;
      var rot = i / 51 * 260 - 130;
      $el.style[transformOrigin] = '50% 110%';
      setTimeout(function () {
        $el.style[_____transition] = '.3s all cubic-bezier(0.645, 0.045, 0.355, 1.000)';
        $el.style[_____transform] = 'translate(-' + z + 'px, -' + z + 'px)';
        setTimeout(function () {
          $el.style[_____transform] = 'rotate(' + rot + 'deg)';
        }, 300);
      }, delay);
      $el.style.zIndex = i;
      setTimeout(function () {
        cb(i);
      }, 1000 + delay);
    };
  }

  var ____transform = prefix('transform');
  var ____transition = prefix('transition');

  function bysuit(card, $el) {
    var value = card.value;
    var suit = card.suit;

    card.bysuit = function (cb) {
      var i = card.i;
      var delay = i * 10;
      var posX = -(7 - value) * 20;
      var posY = -(1.5 - suit) * 105;

      setTimeout(function () {
        $el.style[____transition] = 'all .5s cubic-bezier(0.645, 0.045, 0.355, 1.000)';
        $el.style[____transform] = 'translate(' + posX + '%,' + posY + '%)';
        $el.style.zIndex = i;
        setTimeout(function () {
          $el.style[____transition] = '';
          cb(i);
        }, 500);
      }, delay);
    };
  }

  var ___transform = prefix('transform');
  var ___transition = prefix('transition');

  function sort(card, $el) {
    card.sort = function (n, cb, reverse) {
      var z = n / 5;

      var delay = n * 10;

      setTimeout(function () {
        $el.style[___transition] = 'all .4s cubic-bezier(0.645, 0.045, 0.355, 1.000)';
        $el.style[___transform] = 'translate(-' + z + 'px, -150%)';
      }, delay);

      setTimeout(function () {
        $el.style.zIndex = n;
      }, 200 + delay);

      setTimeout(function () {
        $el.style[___transform] = 'translate(-' + z + 'px, -' + z + 'px)';
        setTimeout(function () {
          $el.style[___transition] = '';
          card.x = -z;
          card.y = -z;
          cb(n);
        }, 500);
      }, 400 + delay);
    };
  }

  function plusMinus(value) {
    var plusminus = Math.round(Math.random()) ? -1 : 1;
    return plusminus * value;
  }

  var __transform = prefix('transform');
  var __transition = prefix('transition');

  function shuffle(card, $el) {
    card.shuffle = function (n, cb) {
      var i = card.pos;
      var z = i / 5;

      var offsetX = plusMinus(Math.random() * 40 + 30);

      var delay = i * 2;

      $el.style[__transition] = 'all .3s cubic-bezier(0.645, 0.045, 0.355, 1.000)';
      setTimeout(function () {
        $el.style[__transform] = 'translate(' + offsetX + '%, -' + z + 'px)';
      }, delay);

      setTimeout(function () {
        $el.style.zIndex = i;
      }, 150 + delay);

      setTimeout(function () {
        $el.style[__transform] = 'translate(-' + z + 'px, -' + z + 'px)';
        setTimeout(function () {
          n || ($el.style[__transition] = '');
          cb(i);
        }, n ? 100 : 300);
      }, 300 + delay);
    };
  }

  var _transform = prefix('transform');
  var _transition = prefix('transition');

  function intro(card, $el) {
    card.intro = function (i, cb) {
      var z = i / 5;
      $el.style[_transform] = 'translate(-' + z + 'px, -500%)';
      $el.style.opacity = 0;
      $el.style[_transition] = 'all 1s cubic-bezier(0.645, 0.045, 0.355, 1.000)';
      $el.style.zIndex = i;
      setTimeout(function () {
        $el.style[_transform] = 'translate(-' + z + 'px, -' + z + 'px)';
        $el.style.opacity = 1;
        setTimeout(function () {
          $el.style[_transition] = '';
          cb && cb(i);
        }, 1000);
      }, i * 10);
    };
  }

  function createElement(type) {
    return document.createElement(type);
  }

  var transition = prefix('transition');
  var transform = prefix('transform');
  var maxZ = 52;

  function Card(i) {
    var value = i % 13 + 1;
    var name = value === 1 ? 'A' : value === 11 ? 'J' : value === 12 ? 'Q' : value === 13 ? 'K' : value;
    var suit = i / 13 | 0;
    var suitsymbol = suitSymbol(suit);
    var color = suit % 2 ? 'red' : 'black';
    var z = (52 - i) / 5;
    var self = { i: i, value: value, suit: suit, pos: i, $el: $el, mount: mount, unmount: unmount };

    var $el = createElement('div');
    var $suit = createElement('div');
    var $topleft = createElement('div');
    var $bottomright = createElement('div');

    var $root;

    addListener($el, 'mousedown', onMousedown);
    addListener($el, 'touchstart', onMousedown);

    function onMousedown(e) {
      var middlePoint = $root.getBoundingClientRect();
      if (e.type === 'mousedown') {
        addListener(window, 'mousemove', onMousemove);
        addListener(window, 'mouseup', onMouseup);
      } else {
        removeListener(window, 'touchmove', onMousemove);
        removeListener(window, 'touchend', onMouseup);
      }
      $el.style[transition] = '';
      function onMousemove(e) {
        var pos = {};

        if (e.type === 'mousemove') {
          pos.x = e.clientX;
          pos.y = e.clientY;
        } else {
          pos.x = e.touches[0].clientX;
          pos.y = e.touches[0].clientY;
        }
        $el.style[transform] = 'translate(' + (pos.x - middlePoint.left) + 'px, ' + (pos.y - middlePoint.top) + 'px)';
      }

      function onMouseup(e) {
        if (e.type === 'mouseup') {
          removeListener(window, 'mousemove', onMousemove);
          removeListener(window, 'mouseup', onMouseup);
        } else {
          removeListener(window, 'touchmove', onMousemove);
          removeListener(window, 'touchend', onMouseup);
        }
        $el.style.zIndex = maxZ++;
      }
    }

    $el.classList.add('card', color);
    $suit.classList.add('suit');
    $topleft.classList.add('topleft');
    $bottomright.classList.add('bottomright');

    $suit.textContent = suitsymbol;
    $topleft.innerHTML = name + '<br>' + suitsymbol;
    $bottomright.innerHTML = name + '<br>' + suitsymbol;

    $el.style.zIndex = 52 - i;
    $el.style[transform] = 'translate(-' + z + 'px, -' + z + 'px)';

    $el.appendChild($suit);
    $el.appendChild($topleft);
    $el.appendChild($bottomright);

    intro(self, $el);
    shuffle(self, $el);
    sort(self, $el);
    bysuit(self, $el);
    fan(self, $el);

    return self;

    function mount(target) {
      target.appendChild($el);

      $root = target;
    }

    function unmount() {
      $root && $root.removeChild($el);
      $root = null;
    }
  }

  function suitSymbol(value) {
    return value === 0 ? '♠︎' : value === 1 ? '♥︎' : value === 2 ? '♣︎' : '♦';
  }

  function addListener(target, name, listener) {
    target.addEventListener(name, listener);
  }

  function removeListener(target, name, listener) {
    target.removeEventListener(name, listener);
  }

  function shuffleable(deck, cards) {
    var shuffling = -1;
    deck.shuffle = function () {
      deck.queue(shuffle);
    };

    function shuffle(cb) {
      if (shuffling === 0) {
        shuffling = -1;
        cb && cb();
        return;
      }
      if (shuffling === -1) {
        shuffling = 2;
      } else {
        shuffling--;
      }
      cards.sort(function () {
        return Math.random() * 100 - 50;
      });
      cards.forEach(function (card, i) {
        card.pos = i;
        card.shuffle(shuffling, function (i) {
          if (i === 51) {
            shuffle(cb);
          }
        });
      });
      return;
    }
  }

  function queueable(target) {
    var queueing = [];

    target.queue = queue;
    return target;

    function queue(action) {
      if (!action) {
        return;
      }
      queueing.push(action);
      if (queueing.length === 1) {
        next();
      }
    }
    function next() {
      queueing[0](function (err) {
        if (err) {
          throw err;
        }
        queueing = queueing.slice(1);
        if (queueing.length) {
          next();
        }
      });
    }
  }

  function observable(target) {
    var listeners = {};

    target.on = on;
    target.one = one;
    target.off = off;
    target.trigger = trigger;

    return target;

    function on(name, cb, ctx) {
      listeners[name] || (listeners[name] = []);
      listeners[name].push({ cb: cb, ctx: ctx });
    }
    function one(name, cb, ctx) {
      listeners[name] || (listeners[name] = []);
      listeners[name].push({
        cb: cb, ctx: ctx, once: true
      });
    }
    function trigger(name) {
      var self = this;
      var args = Array.prototype.slice(arguments, 1);

      var currentListeners = listeners[name] || [];
      currentListeners.filter(function (listener) {
        listener.cb.apply(self, args);
        return !listener.once;
      });
    }
    function off(name, cb) {
      if (!name) {
        listeners = {};
        return;
      }
      if (!cb) {
        listeners[name] = [];
        return;
      }
      listeners[name] = listeners[name].filter(function (listener) {
        return listener.cb !== cb;
      });
    }
  }

  function deck() {
    var cards = new Array(52);
    var self = observable({ mount: mount, unmount: unmount, cards: cards });
    var $el = createElement('div');
    var $root;

    var card;

    queueable(self);
    shuffleable(self, cards);

    self.sort = sort;
    self.bysuit = bysuit;
    self.fan = fan;

    $el.classList.add('deck');

    self.queue(function (next) {
      for (var i = 0, len = cards.length; i < len; i++) {
        card = cards[i] = Card(i);
        card.intro(i, function (i) {
          if (i === 51) {
            next();
          }
        });
        card.mount($el);
      }
    });
    self.shuffle();
    self.sort();
    return self;

    function mount(root) {
      $root = root;
      $root.appendChild($el);
    }

    function unmount() {
      $root.removeChild($el);
    }

    function fan() {
      self.queue(function (next) {
        cards.forEach(function (card, i) {
          card.fan(i, function (i) {
            if (i === 51) {
              next();
            }
          });
        });
      });
    }

    function bysuit() {
      self.sort(true);
      self.queue(function (next) {
        cards.forEach(function (card) {
          card.bysuit(function (i) {
            if (i === 51) {
              next();
            }
          });
        });
      });
    }

    function sort(reverse) {
      self.queue(function (cb) {
        cards.sort(function (a, b) {
          if (reverse) {
            return a.i - b.i;
          } else {
            return b.i - a.i;
          }
        });
        cards.forEach(function (card, i) {
          card.sort(i, function (i) {
            if (i === 51) {
              cb();
            }
          }, reverse);
        });
      });
    }
  }

  return deck;
})();
