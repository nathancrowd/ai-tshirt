/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (() => {

eval("const form = document.querySelector('form')\nconst dialog = document.querySelector('.response')\nconst reroll = document.querySelector('.reroll')\nconst close = document.querySelector('.close')\nconst downloadBtn = document.querySelector('.download')\nconst canvas=document.getElementById(\"canvas\");\nconst ctx=canvas.getContext(\"2d\");\nlet currentSrc = ''\nlet currentColor = ''\n\nconst download = () => {\n    let bk=new Image();\n    bk.onload=start;\n    bk.src=currentSrc;\n    let cut=new Image();\n    cut.crossOrigin='anonymous';\n    cut.onload=start;\n    if (currentColor !== 'light') {\n        cut.src= location.origin + location.pathname + \"black-shirt-mask.png\";\n    } else {\n        cut.src= location.origin + location.pathname + \"white-shirt-mask.png\";\n    }\n    let imgcount=2;\n    function start() {\n        canvas.width=bk.width;\n        canvas.height=bk.height;\n        ctx.drawImage(bk,0,0,bk.width,bk.height,0,0,bk.width,bk.height);\n        ctx.globalCompositeOperation='destination-out';\n        ctx.drawImage(cut,0,0,cut.width,cut.height,0,0,bk.width,bk.height);\n        // always clean up -- reset the default compositing mode\n        ctx.globalCompositeOperation='source-over';\n    \n        if (imgcount < 2) {\n            let imgd = ctx.getImageData(0, 0, bk.width,bk.height)\n            let pix = imgd.data\n            let newColor = {r:0,g:0,b:0, a:0};\n    \n            for (var i = 0, n = pix.length; i <n; i += 4) {\n                let r = pix[i]\n                let g = pix[i+1]\n                let b = pix[i+2];\n                if (currentColor !== 'light') {\n                    if(r <= 45 && g <= 45 && b <= 45){ \n                        // Change the white to whatever.\n                        pix[i] = newColor.r;\n                        pix[i+1] = newColor.g;\n                        pix[i+2] = newColor.b;\n                        pix[i+3] = newColor.a;\n                    }\n                } else {\n                    if(r >=230 && g >= 230 && b >= 230){ \n                        // Change the white to whatever.\n                        pix[i] = newColor.r;\n                        pix[i+1] = newColor.g;\n                        pix[i+2] = newColor.b;\n                        pix[i+3] = newColor.a;\n                    }\n                }\n            }\n            ctx.putImageData(imgd, 0, 0)\n        }\n\n        let out = document.createElement('img')\n        out.src = canvas.toDataURL()\n        var link = document.createElement(\"a\");\n\n        document.body.appendChild(link); // for Firefox\n\n        link.setAttribute(\"href\", out.src);\n        link.setAttribute(\"download\", 'my-tshirt.png');\n        link.click();\n        imgcount--\n    }\n}\n\nconst blobToImage = (blob) => {\n    return new Promise(resolve => {\n      const url = URL.createObjectURL(blob)\n      let img = new Image()\n      img.onload = () => {\n        URL.revokeObjectURL(url)\n        resolve(img)\n      }\n      img.src = url\n    })\n  }\n\nconst reset = () => {\n    dialog.close()\n    form.querySelector('input[type=\"text\"]').value = ''\n}\n\nconst onSubmit = async (e = null) => {\n    if (e) {\n        e.preventDefault()\n    }\n    dialog.close()\n    dialog.querySelector('.image-frame').innerHTML=`<p>generating image...</p>`\n    let data = new FormData(form)\n    dialog.showModal()\n    currentColor = data.get('color')\n    fetch(`http://ec2-54-229-148-71.eu-west-1.compute.amazonaws.com:3000/?prompt=${data.get('prompt')}&color=${currentColor}`)\n    .then(r => r.json())\n    .then(r => {\n        currentSrc = `data:image/png;base64, ${r.data[0].b64_json}`\n        dialog.querySelector('.image-frame').innerHTML=`<p>${data.get('prompt')}</p><img src='${currentSrc}' loading='lazy' />`\n    })\n    .catch(err => {\n        console.error(err)\n    })\n}\n\nif (form) {\n    form.addEventListener('submit', e => onSubmit(e))\n    reroll.addEventListener('click', () => onSubmit(), false)\n    close.addEventListener('click', () => reset(), false)\n    downloadBtn.addEventListener('click', () => download(), false)\n}\n\n//# sourceURL=webpack://ai-tshirt/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/index.js"]();
/******/ 	
/******/ })()
;