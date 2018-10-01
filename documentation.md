## Constants

<dl>
<dt><a href="#opts">opts</a></dt>
<dd></dd>
</dl>

## Functions

<dl>
<dt><a href="#startServer">startServer(string)</a> ⇒ <code>child_process</code></dt>
<dd><p>Asynchronous process creation of a server for tests to run on.
Server should be configured for use by <code>npm run serve</code>, or alternate script name, in package.json.</p>
</dd>
</dl>

<a name="opts"></a>

## opts
**Kind**: global constant  
**Todo**

- [ ] - make this configurable

<a name="startServer"></a>

## startServer(string) ⇒ <code>child_process</code>
Asynchronous process creation of a server for tests to run on.
Server should be configured for use by `npm run serve`, or alternate script name, in package.json.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| string | <code>npmScript</code> | Name of script in package.json which will start server. |

**Example** *(Stop server using &#x60;child_process.kill()&#x60;)*  
```js
// runningServer.kill()
const runningServer = startServer('npm-script-name')
```
