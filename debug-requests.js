// Add this to your browser console to debug all network requests
// This will log every fetch/axios request with full details

// Monitor fetch requests
const originalFetch = window.fetch;
window.fetch = function(...args) {
    console.log('🌐 FETCH REQUEST:', {
        url: args[0],
        options: args[1],
        origin: window.location.origin,
        headers: args[1]?.headers
    });
    
    return originalFetch.apply(this, args)
        .then(response => {
            console.log('✅ FETCH RESPONSE:', {
                url: args[0],
                status: response.status,
                statusText: response.statusText,
                headers: Object.fromEntries(response.headers.entries())
            });
            return response;
        })
        .catch(error => {
            console.error('❌ FETCH ERROR:', {
                url: args[0],
                error: error.message,
                origin: window.location.origin
            });
            throw error;
        });
};

// Monitor XMLHttpRequest (axios uses this)
const originalOpen = XMLHttpRequest.prototype.open;
const originalSend = XMLHttpRequest.prototype.send;
const originalSetRequestHeader = XMLHttpRequest.prototype.setRequestHeader;

XMLHttpRequest.prototype.open = function(method, url, async, user, password) {
    this._method = method;
    this._url = url;
    this._requestHeaders = {};
    console.log('🔗 XHR OPEN:', {
        method: method,
        url: url,
        origin: window.location.origin
    });
    return originalOpen.apply(this, arguments);
};

XMLHttpRequest.prototype.setRequestHeader = function(header, value) {
    this._requestHeaders[header] = value;
    return originalSetRequestHeader.apply(this, arguments);
};

XMLHttpRequest.prototype.send = function(data) {
    console.log('📤 XHR REQUEST:', {
        method: this._method,
        url: this._url,
        origin: window.location.origin,
        headers: this._requestHeaders,
        data: data
    });
    
    this.addEventListener('load', () => {
        console.log('📥 XHR RESPONSE:', {
            url: this._url,
            status: this.status,
            statusText: this.statusText,
            responseHeaders: this.getAllResponseHeaders(),
            response: this.response
        });
    });
    
    this.addEventListener('error', () => {
        console.error('❌ XHR ERROR:', {
            url: this._url,
            status: this.status,
            statusText: this.statusText,
            origin: window.location.origin
        });
    });
    
    return originalSend.apply(this, arguments);
};

console.log('🚀 Request monitoring enabled! Origin:', window.location.origin);
