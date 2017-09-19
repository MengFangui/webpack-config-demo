import  './css/common.css';
import layer from './components/layer/layer.js'
const App = function(){
	var dom= document.getElementById('app');
	var Layer = new layer();
	dom.innerHTML = Layer.tpl;
}

new App()
