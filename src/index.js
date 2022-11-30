const form = document.querySelector('form')
const dialog = document.querySelector('.response')
const reroll = document.querySelector('.reroll')
const close = document.querySelector('.close')
const downloadBtn = document.querySelector('.download')
const canvas=document.getElementById("canvas");
const ctx=canvas.getContext("2d");
let currentSrc = ''
let currentColor = ''

const download = () => {
    let bk=new Image();
    bk.onload=start;
    bk.src=currentSrc;
    let cut=new Image();
    cut.crossOrigin='anonymous';
    cut.onload=start;
    if (currentColor !== 'light') {
        cut.src=location.origin + location.pathname + "/black-shirt-mask.png";
    } else {
        cut.src=location.origin + location.pathname + "/white-shirt-mask.png";
    }
    let imgcount=2;
    function start() {
        canvas.width=bk.width;
        canvas.height=bk.height;
        ctx.drawImage(bk,0,0,bk.width,bk.height,0,0,bk.width,bk.height);
        ctx.globalCompositeOperation='destination-out';
        ctx.drawImage(cut,0,0,cut.width,cut.height,0,0,bk.width,bk.height);
        // always clean up -- reset the default compositing mode
        ctx.globalCompositeOperation='source-over';
    
        if (imgcount < 2) {
            let imgd = ctx.getImageData(0, 0, bk.width,bk.height)
            let pix = imgd.data
            let newColor = {r:0,g:0,b:0, a:0};
    
            for (var i = 0, n = pix.length; i <n; i += 4) {
                let r = pix[i]
                let g = pix[i+1]
                let b = pix[i+2];
                if (currentColor !== 'light') {
                    if(r <= 45 && g <= 45 && b <= 45){ 
                        // Change the white to whatever.
                        pix[i] = newColor.r;
                        pix[i+1] = newColor.g;
                        pix[i+2] = newColor.b;
                        pix[i+3] = newColor.a;
                    }
                } else {
                    if(r >=230 && g >= 230 && b >= 230){ 
                        // Change the white to whatever.
                        pix[i] = newColor.r;
                        pix[i+1] = newColor.g;
                        pix[i+2] = newColor.b;
                        pix[i+3] = newColor.a;
                    }
                }
            }
            ctx.putImageData(imgd, 0, 0)
        }

        let out = document.createElement('img')
        out.src = canvas.toDataURL()
        var link = document.createElement("a");

        document.body.appendChild(link); // for Firefox

        link.setAttribute("href", out.src);
        link.setAttribute("download", 'my-tshirt.png');
        link.click();
        imgcount--
    }
}

const blobToImage = (blob) => {
    return new Promise(resolve => {
      const url = URL.createObjectURL(blob)
      let img = new Image()
      img.onload = () => {
        URL.revokeObjectURL(url)
        resolve(img)
      }
      img.src = url
    })
  }

const reset = () => {
    dialog.close()
    form.querySelector('input[type="text"]').value = ''
}

const onSubmit = async (e = null) => {
    if (e) {
        e.preventDefault()
    }
    dialog.close()
    dialog.querySelector('.image-frame').innerHTML=`<p>generating image...</p>`
    let data = new FormData(form)
    dialog.showModal()
    currentColor = data.get('color')
    fetch(`https://calm-shore-64259.herokuapp.com?prompt=${data.get('prompt')}&color=${currentColor}`)
    .then(r => r.json())
    .then(r => {
        currentSrc = `data:image/png;base64, ${r.data[0].b64_json}`
        dialog.querySelector('.image-frame').innerHTML=`<p>${data.get('prompt')}</p><img src='${currentSrc}' loading='lazy' />`
    })
    .catch(err => {
        console.error(err)
    })
}

if (form) {
    form.addEventListener('submit', e => onSubmit(e))
    reroll.addEventListener('click', () => onSubmit(), false)
    close.addEventListener('click', () => reset(), false)
    downloadBtn.addEventListener('click', () => download(), false)
}