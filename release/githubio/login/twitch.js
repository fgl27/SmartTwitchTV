// ## Core
;(function($) {
  // Wait five seconds for the API request before timing out.
  var REQUEST_TIMEOUT = 5000;
  var HTTP_CODES = {
    unauthorized: 401
  };

  var Twitch = {
    $: $,
    baseUrl: 'https://api.twitch.tv/kraken/',
    _config: {},
    extend: function(src) {
      $.extend(Twitch, src);
    }
  };

  // Perform requests to the TwitchTV API. This is a fairly low-level
  // interface, so most clients are better served by using a related
  // high-level function if one exists.
  Twitch.api = function(options, callback, force_jsonp) {
    if (!Twitch._config.session) {
      throw new Error('You must call init() before api()');
    }
    var params = options.params || {};
    callback = callback || function() {};

    var authenticated = !!Twitch._config.session.token,
      url = Twitch.baseUrl + (options.url || options.method || '');

    var ajaxOpts = {
      method: options.verb || 'GET',
      dataType: 'json',
      timeout : REQUEST_TIMEOUT,
      headers: {
        'Authorization': 'OAuth ' + Twitch._config.session.token
      }
    }

    if (force_jsonp) {
      if (authenticated) params.oauth_token = Twitch._config.session.token;
      if (options.verb) params._method = options.verb;
      ajaxOpts.dataType = 'jsonp';
    }
    ajaxOpts.url = url + '?' + $.param(params);

    // When using JSONP, any error response will have a
    // `200` HTTP status code with the actual code in the body
    // so we can parse them.
    $.ajax(ajaxOpts).done(function(data) {
      // 204 No Content has no data object
      Twitch.log('Response Data:', data);
      if ( !(data && data.error) ) {
        callback(null, data || null);
        return;
      }

      Twitch.log('API Error:', data.error + ';', data.message);
      if (authenticated && data.status === HTTP_CODES.unauthorized) {
        // Invalid authentication code; destroy our session.
        Twitch.logout(function() {
          callback(data, null);
        });
      } else {
        callback(data, null);
      }
    })
    .fail(function() {
      // Forced fail by request timeout; we have no
      // way of knowing the actual error with JSONP.
      callback(new Error('Request Timeout'), null);
    });
  };

  // Log messages to the browser console if available, prefixed
  // with `[Twitch]`.
  Twitch.log = function(message) {
    Array.prototype.unshift.call(arguments, '[Twitch]');
    if (window.console) {
      console.log.apply(console, arguments);
    }
  };

  window.Twitch = Twitch;
// Support either [jQuery](http://jquery.com) or [Zepto](http://zeptojs.com).
})(window.jQuery || window.Zepto);
// ## Storage
// Persistence layer for the SDK on top of sessionStorage, with
// a cookie fallback for older browsers.
(function() {
  // Adapted from remy's [DOM storage polyfill][].
  // [DOM storage polyfill]: https://gist.github.com/350433

  var store = window.sessionStorage;

  if (!store) {
    (function () {
      var Storage = function (type) {
        function createCookie(name, value, days) {
          var date, expires;

          if (days) {
            date = new Date();
            date.setTime(date.getTime()+(days*24*60*60*1000));
            expires = "; expires="+date.toGMTString();
          } else {
            expires = "";
          }
          document.cookie = name+"="+value+expires+"; path=/";
        }

        function readCookie(name) {
          var nameEQ = name + "=",
              ca = document.cookie.split(';'),
              i, c;

          for (i=0; i < ca.length; i++) {
            c = ca[i];
            while (c.charAt(0)==' ') {
              c = c.substring(1,c.length);
            }

            if (c.indexOf(nameEQ) === 0) {
              return c.substring(nameEQ.length,c.length);
            }
          }
          return null;
        }
        
        function setData(data) {
          data = JSON.stringify(data);
          if (type == 'session') {
            window.name = data;
          } else {
            createCookie('localStorage', data, 365);
          }
        }
        
        function clearData() {
          if (type == 'session') {
            window.name = '';
          } else {
            createCookie('localStorage', '', 365);
          }
        }
        
        function getData() {
          var data = type == 'session' ? window.name : readCookie('localStorage');
          return data ? JSON.parse(data) : {};
        }

        // initialise if there's already data
        var data = getData();

        return {
          length: 0,
          clear: function () {
            data = {};
            this.length = 0;
            clearData();
          },
          getItem: function (key) {
            return data[key] === undefined ? null : data[key];
          },
          key: function (i) {
            // not perfect, but works
            var ctr = 0;
            for (var k in data) {
              if (ctr == i) {
                return k;
              } else {
                ctr++;
              }
            }
            return null;
          },
          removeItem: function (key) {
            delete data[key];
            this.length--;
            setData(data);
          },
          setItem: function (key, value) {
            data[key] = value+''; // forces the value to a string
            this.length++;
            setData(data);
          }
        };
      };

      store = new Storage('session');
    })();
  }

  Twitch.extend({
    _storage: store
  });

})();
// ## Initialization
(function() {

  // Initialize the library.
  //
  // Accepts an options object specifying
  // your appplication's __client id__, recieved after
  // app creation on TwitchTV.
  //
  // Typical initialization:
  //
  //     <script>
  //     Twitch.init({
  //       clientId: YOUR_CLIENT_ID
  //     }, function(err, status) {
  //       console.log('the library is now loaded')
  //     });
  //     </script>
  //
  var init = function(options, callback) {
    if (!options.clientId) {
      throw new Error('client id not specified');
    }

    Twitch._config.clientId = options.clientId;
    Twitch._initSession();

    if (typeof callback === 'function') {
      Twitch.getStatus(callback);
    }
  };

  Twitch.extend({
    init: init
  });
})();
/*jshint expr:true*/
/*global Twitch*/
// ## Authentication
(function() {
  // Key of the sessionStorage object or cookie.
  var SESSION_KEY = 'twitch_oauth_session',
    $ = Twitch.$;
  var parseFragment = function(hash) {
    var match,
      session;

    hash = hash || document.location.hash;

    var hashMatch = function(expr) {
      var match = hash.match(expr);
      return match ? match[1] : null;
    };

    session = {
      token: hashMatch(/access_token=(\w+)/),
      scope: hashMatch(/scope=([\w+]+)/) ? hashMatch(/scope=([\w+]+)/).split('+') : null,
      state: hashMatch(/state=(\w+)/),
      error: hashMatch(/error=(\w+)/),
      errorDescription: hashMatch(/error_description=(\w+)/)
    };

    return session;
  };

  // Update session info from API and store.
  var updateSession = function(callback) {
    Twitch.api({method: '/'}, function(err, response) {
      var session;
      if (err) {
        Twitch.log('error encountered updating session:', err);
        callback && callback(err, null);
        return;
      }

      if (!response.token.valid) {
        // Invalid token. Either it has expired or the user has
        // revoked permission, so clear out our stored data.
        Twitch.logout(callback);
        return;
      }

      callback && callback(null, session);
    });
  };

  // Get the currently stored OAuth token.
  // Useful for sending OAuth tokens to your backend.
  var getToken = function() {
    return Twitch._config.session && Twitch._config.session.token;
  };

  // Get the current authentication status. Will try to use the stored session
  // if possible for speed.
  // The `force` property will trigger an API request to update session data.
  var getStatus = function(options, callback) {
    if (typeof options === 'function') {
        callback = options;
    }
    if (typeof callback !== 'function') {
        callback = function() {};
    }
    if (!Twitch._config.session) {
      throw new Error('You must call init() before getStatus()');
    }

    var makeSession = function(session) {
      // Make a session object for the client.
      return {
        authenticated: !!session.token,
        token: session.token,
        scope: session.scope,
        error: session.error,
        errorDescription: session.errorDescription
      };
    };

    if (options && options.force) {
      updateSession(function(err, session) {
        callback(err, makeSession(session || Twitch._config.session));
      });
    } else {
      callback(null, makeSession(Twitch._config.session));
    }
  };

  // Login and redirect back to current page with an access token
  // The popup parameter can be used to authorize users without
  // leaving your page, as described [here](http://stackoverflow.com/a/3602045/100296).
  // **TODO**: description about setting URI
  //
  // Usage:
  //
  //     Twitch.login({
  //       redirect_uri: 'http://myappurl.com/myoauthreturn',
  //       popup: false,
  //       scope: ['user_read', 'channel_read']
  //     });
  var login = function(options) {
    if (!options.scope) {
      throw new Error('Must specify list of requested scopes');
    }
    var params = {
      response_type: 'token',
      client_id: Twitch._config.clientId,
      // Redirecting to a fragment is forbidden by the OAuth spec,
      // but we might be on a page with one.
      redirect_uri: options.redirect_uri || window.location.href.replace(/#.*$/, ''),
      scope: options.scope.join(' '),
      force_verify: options.force_verify || false
    };

    if (!params.client_id) {
      throw new Error('You must call init() before login()');
    }
    
    var url = Twitch.baseUrl + 'oauth2/authorize?' + $.param(params);

    if (options.popup) {
      Twitch._config.loginPopup = window.open(url,
                          "Login with TwitchTV",
                          "height=600,width=660,resizable=yes,status=yes");
    } else {
      window.location = url;
    }
  };

  // Reset the session and delete from persistent storage, which is
  // akin to logging out. This does not deactivate the access token
  // given to your app, so you can continue to perform actions if
  // your server stored the token.
  //
  // Usage:
  //
  //     Twitch.logout(function(error) {
  //       // the user is now logged out
  //     });
  var logout = function(callback) {
    // Reset the current session
    Twitch._config.session = {};
    // Remove from persistent storage.
    Twitch._storage.removeItem(SESSION_KEY);

    Twitch.events.emit('auth.logout');
    if (typeof callback === 'function') {
      callback(null);
    }
  };

  // Retrieve sessions from persistent storage and
  // persist new ones.
  var initSession = function() {
    var storedSession;

    Twitch._config.session = {};
    // For browsers that do not have the JSON native object,
    // [JSON.js](http://bestiejs.github.com/json3) will work
    // as a drop-in implementation.
    if (window.JSON) {
      storedSession = Twitch._storage.getItem(SESSION_KEY);
      if (storedSession) {
        try {
          Twitch._config.session = JSON.parse(storedSession);
        } catch (e) {
          //
        }
      }
    }

    // If we're on a page with an access token, it's probably a
    // return uri for an authorization attempt. Overwrite with
    // the new params if page has them.
    if (document.location.hash.match(/access_token=(\w+)/)) {
      Twitch._config.session = parseFragment();

      // Persist to session storage on browsers that support it
      // and cookies otherwise.
      if (window.JSON) {
        Twitch._storage.setItem(SESSION_KEY, JSON.stringify(Twitch._config.session));
      }
    }

    getStatus(function(err, status) {
      if (status.authenticated) {
        Twitch.events.emit('auth.login');
      }
    });
  };

  Twitch.extend({
    _initSession: initSession,
    _parseFragment: parseFragment,
    getToken: getToken,
    getStatus: getStatus,
    login: login,
    logout: logout
  });
})();// ## Events
/**
 * EventEmitter v3.1.4
 * https://github.com/Wolfy87/EventEmitter
 *
 * Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php
 * Oliver Caldwell (olivercaldwell.co.uk)
 */

(function() {
  /**
   * EventEmitter class
   * Creates an object with event registering and firing methods
   */
  function EventEmitter() {
    // Initialise required storage variables
    this._events = {};
    this._maxListeners = 10;
  }
  
  /**
   * Event class
   * Contains Event methods and property storage
   *
   * @param {String} type Event type name
   * @param {Function} listener Function to be called when the event is fired
   * @param {Object} scope Object that this should be set to when the listener is called
   * @param {Boolean} once If true then the listener will be removed after the first call
   * @param {Object} instance The parent EventEmitter instance
   */
  function Event(type, listener, scope, once, instance) {
    // Store arguments
    this.type = type;
    this.listener = listener;
    this.scope = scope;
    this.once = once;
    this.instance = instance;
  }
  
  /**
   * Executes the listener
   *
   * @param {Array} args List of arguments to pass to the listener
   * @return {Boolean} If false then it was a once event
   */
  Event.prototype.fire = function(args) {
    this.listener.apply(this.scope || this.instance, args);
    
    // Remove the listener if this is a once only listener
    if(this.once) {
      this.instance.removeListener(this.type, this.listener, this.scope);
      return false;
    }
  };
  
  /**
   * Passes every listener for a specified event to a function one at a time
   *
   * @param {String} type Event type name
   * @param {Function} callback Function to pass each listener to
   * @return {Object} The current EventEmitter instance to allow chaining
   */
  EventEmitter.prototype.eachListener = function(type, callback) {
    // Initialise variables
    var i = null,
      possibleListeners = null,
      result = null;
    
    // Only loop if the type exists
    if(this._events.hasOwnProperty(type)) {
      possibleListeners = this._events[type];
      
      for(i = 0; i < possibleListeners.length; i += 1) {
        result = callback.call(this, possibleListeners[i], i);
        
        if(result === false) {
          i -= 1;
        }
        else if(result === true) {
          break;
        }
      }
    }
    
    // Return the instance to allow chaining
    return this;
  };
  
  /**
   * Adds an event listener for the specified event
   *
   * @param {String} type Event type name
   * @param {Function} listener Function to be called when the event is fired
   * @param {Object} scope Object that this should be set to when the listener is called
   * @param {Boolean} once If true then the listener will be removed after the first call
   * @return {Object} The current EventEmitter instance to allow chaining
   */
  EventEmitter.prototype.addListener = function(type, listener, scope, once) {
    // Create the listener array if it does not exist yet
    if(!this._events.hasOwnProperty(type)) {
      this._events[type] = [];
    }
    
    // Push the new event to the array
    this._events[type].push(new Event(type, listener, scope, once, this));
    
    // Emit the new listener event
    this.emit('newListener', type, listener, scope, once);
    
    // Check if we have exceeded the maxListener count
    // Ignore this check if the count is 0
    // Also don't check if we have already fired a warning
    if(this._maxListeners && !this._events[type].warned && this._events[type].length > this._maxListeners) {
      // The max listener count has been exceeded!
      Twitch.log('Possible EventEmitter memory leak detected. ' + this._events[type].length + ' listeners added. Use emitter.setMaxListeners() to increase limit.');
      
      // Set the flag so it doesn't fire again
      this._events[type].warned = true;
    }
    
    // Return the instance to allow chaining
    return this;
  };
  
  /**
   * Alias of the addListener method
   *
   * @param {String} type Event type name
   * @param {Function} listener Function to be called when the event is fired
   * @param {Object} scope Object that this should be set to when the listener is called
   * @param {Boolean} once If true then the listener will be removed after the first call
   */
  EventEmitter.prototype.on = EventEmitter.prototype.addListener;
  
  /**
   * Alias of the addListener method but will remove the event after the first use
   *
   * @param {String} type Event type name
   * @param {Function} listener Function to be called when the event is fired
   * @param {Object} scope Object that this should be set to when the listener is called
   * @return {Object} The current EventEmitter instance to allow chaining
   */
  EventEmitter.prototype.once = function(type, listener, scope) {
    return this.addListener(type, listener, scope, true);
  };
  
  /**
   * Removes the a listener for the specified event
   *
   * @param {String} type Event type name the listener must have for the event to be removed
   * @param {Function} listener Listener the event must have to be removed
   * @param {Object} scope The scope the event must have to be removed
   * @return {Object} The current EventEmitter instance to allow chaining
   */
  EventEmitter.prototype.removeListener = function(type, listener, scope) {
    this.eachListener(type, function(currentListener, index) {
      // If this is the listener remove it from the array
      // We also compare the scope if it was passed
      if(currentListener.listener === listener && (!scope || currentListener.scope === scope)) {
        this._events[type].splice(index, 1);
      }
    });
    
    // Remove the property if there are no more listeners
    if(this._events[type] && this._events[type].length === 0) {
      delete this._events[type];
    }
    
    // Return the instance to allow chaining
    return this;
  };
  
  /**
   * Alias of the removeListener method
   *
   * @param {String} type Event type name the listener must have for the event to be removed
   * @param {Function} listener Listener the event must have to be removed
   * @param {Object} scope The scope the event must have to be removed
   * @return {Object} The current EventEmitter instance to allow chaining
   */
  EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
  
  /**
   * Removes all listeners for a specified event
   * If no event type is passed it will remove every listener
   *
   * @param {String} type Event type name to remove all listeners from
   * @return {Object} The current EventEmitter instance to allow chaining
   */
  EventEmitter.prototype.removeAllListeners = function(type) {
    // Check for a type, if there is none remove all listeners
    // If there is a type however, just remove the listeners for that type
    if(type && this._events.hasOwnProperty(type)) {
      delete this._events[type];
    }
    else if(!type) {
      this._events = {};
    }
    
    // Return the instance to allow chaining
    return this;
  };
  
  /**
   * Retrieves the array of listeners for a specified event
   *
   * @param {String} type Event type name to return all listeners from
   * @return {Array} Will return either an array of listeners or an empty array if there are none
   */
  EventEmitter.prototype.listeners = function(type) {
    // Return the array of listeners or an empty array if it does not exist
    if(this._events.hasOwnProperty(type)) {
      // It does exist, loop over building the array
      var listeners = [];
      
      this.eachListener(type, function(evt) {
        listeners.push(evt.listener);
      });
      
      return listeners;
    }
    
    return [];
  };
  
  /**
   * Emits an event executing all appropriate listeners
   * All values passed after the type will be passed as arguments to the listeners
   *
   * @param {String} type Event type name to run all listeners from
   * @return {Object} The current EventEmitter instance to allow chaining
   */
  EventEmitter.prototype.emit = function(type) {
    // Calculate the arguments
    var args = [],
      i = null;
    
    for(i = 1; i < arguments.length; i += 1) {
      args.push(arguments[i]);
    }
    
    this.eachListener(type, function(currentListener) {
      return currentListener.fire(args);
    });
    
    // Return the instance to allow chaining
    return this;
  };
  
  /**
   * Sets the max listener count for the EventEmitter
   * When the count of listeners for an event exceeds this limit a warning will be printed
   * Set to 0 for no limit
   *
   * @param {Number} maxListeners The new max listener limit
   * @return {Object} The current EventEmitter instance to allow chaining
   */
  EventEmitter.prototype.setMaxListeners = function(maxListeners) {
    this._maxListeners = maxListeners;
    
    // Return the instance to allow chaining
    return this;
  };
  
  // Export the class
  Twitch.extend({
    events: new EventEmitter()
  });
}());
