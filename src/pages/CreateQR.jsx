import { Fragment, useEffect, useState, useRef } from 'react'
import { toPng } from 'html-to-image'
import QRCode from 'qrcode'
const CreateQR = () => {
    const [url, setUrl] = useState('')
    const canvasRef = useRef(null)
    const setUrlHandler = (e) => {
        setUrl(e.target.value)
    }

    var opts = {
        errorCorrectionLevel: 'H',
        type: 'image/jpeg',
        quality: 1,
        margin: 1,
        width: 500,
        color: {
            dark: "#010599FF",
            light: "#FFBF60FF"
        }
    }
    useEffect(() => {
        QRCode.toCanvas(document.getElementById('canvas'), url, opts, function (error) {
            if (error) console.error(error)
            console.log('success!');
        })
        document.getElementById('imageQR').src = document.getElementById('canvas').toDataURL()
    })
    const downloadQR = async () => {
        if (canvasRef.current) {
            const dataUrl = await toPng(canvasRef.current)
            const link = document.createElement('a')
            link.download = 'qrcode.png'
            link.href = dataUrl
            link.click()
        }
    }
    return (
        <Fragment>
            <div className='flex flex-col w-screen h-screen bg-black justify-center items-center'>
                <div className='top-0 left-0 z-[-1] fixed w-[500px] h-[700px]' ref={canvasRef}>
                    <div className='w-[500px] h-[200px] bg-[url(./nbi.png)]'>
                    </div>
                    <canvas id='canvas'></canvas>
                </div>
                <div className='w-3/4 h-3/4 px-4 justify-center items-center flex flex-col bg-white'>
                    <h1 className="text-3xl font-bold underline">Create QR</h1>
                    <input className='w-full sm:w-[400px] border-2' type="text" onChange={setUrlHandler} />
                    <div className='overflow-hidden w-full sm:w-[400px]'>
                        <img className='object-cover' id="imageQR" src="" alt="" />
                    </div>
                    <button onClick={downloadQR} className='bg-blue-500 cursor-pointer'>Download</button>
                </div>
            </div>
        </Fragment>
    )
}

export default CreateQR