import { Fragment, useEffect, useState, useRef } from 'react'
import { toPng } from 'html-to-image'
import QRCode from 'qrcode'
const CreateQR = () => {
    const [url, setUrl] = useState('')
    const [generated, setGenerated] = useState(false)
    const canvasRef = useRef(null)
    const setUrlHandler = (e) => {
        setUrl(e.target.value)
    }

    var opts = {
        errorCorrectionLevel: 'H',
        type: 'image/jpeg',
        quality: 1,
        margin: 1,
        width: 700,
        color: {
            dark: "#000000",
            light: "#FFFF"
        }
    }
    useEffect(() => {
        QRCode.toCanvas(document.getElementById('canvas'), url, opts, function (error) {
            if (error) console.error(error)
            console.log('success!');
        })
        document.getElementById('imageQR').src = document.getElementById('canvas').toDataURL()
        if (document.getElementById('imageQR').src !== '') {
            setGenerated(true)
        }
    })
    const downloadQR = async () => {
        if (canvasRef.current) {
            const dataUrl = await toPng(canvasRef.current, { cacheBust: true })
            const link = document.createElement('a')
            link.download = 'qrcode.png'
            link.href = dataUrl
            link.click()
        }
    }
    return (
        <Fragment>
            <div className='flex flex-col w-screen h-screen bg-white justify-center items-center'>
                <div className='top-0 left-0 z-[-1] fixed w-[700px] h-[1000px]' ref={canvasRef}>
                    <div className='w-[700px] overflow-hidden'>
                        <img src="/nbi.png" className='object-cover' alt="" />
                    </div>
                    <canvas id='canvas'></canvas>
                </div>
                <div className='w-3/4 h-3/4 px-4 justify-center items-center flex flex-col bg-white'>
                    {/* <h1 className="text-3xl font-bold underline">Create QR</h1> */}
                    <input class="w-full sm:w-[400px] mb-5 bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                        type="text" onChange={setUrlHandler} placeholder="Insert your link here..." />
                    <div className='w-full aspect-square sm:h-[400px] sm:w-[400px] bg-cover bg-[url("/qrbg.png")]'>
                        <img className={`object-cover`} id="imageQR" src="" alt="" />
                    </div>
                    <a href="#_" onClick={downloadQR}  class="mt-5 relative px-10 py-3 font-medium text-white transition duration-300 bg-[#249365] rounded-md hover:bg-[#2F9C6F] ease">
                        <span class="absolute bottom-0 left-0 h-full -ml-2">
                            <svg viewBox="0 0 487 487" class="w-auto h-full opacity-100 object-stretch" xmlns="http://www.w3.org/2000/svg"><path d="M0 .3c67 2.1 134.1 4.3 186.3 37 52.2 32.7 89.6 95.8 112.8 150.6 23.2 54.8 32.3 101.4 61.2 149.9 28.9 48.4 77.7 98.8 126.4 149.2H0V.3z" fill="#FFF" fill-rule="nonzero" fill-opacity=".1"></path></svg>
                        </span>
                        <span class="absolute top-0 right-0 w-12 h-full -mr-3">
                            <svg viewBox="0 0 487 487" class="object-cover w-full h-full" xmlns="http://www.w3.org/2000/svg"><path d="M487 486.7c-66.1-3.6-132.3-7.3-186.3-37s-95.9-85.3-126.2-137.2c-30.4-51.8-49.3-99.9-76.5-151.4C70.9 109.6 35.6 54.8.3 0H487v486.7z" fill="#FFF" fill-rule="nonzero" fill-opacity=".1"></path></svg>
                        </span>
                        <span class="relative">Download QR Code</span>
                    </a>
                    
                </div>
            </div>
        </Fragment>
    )
}

export default CreateQR