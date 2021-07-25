import {React, useState} from 'react'
import imageCompression from 'browser-image-compression'
import { Card } from 'react-bootstrap'

function ImageCompressor() {
    const [compressedLink, setCompressedLink] = useState("http://navparivartan.in/wp-content/uploads/2018/11/placeholder.png") ; 
    const [originalImage, setOriginalImage] = useState("") ; 
    const [originalLink, setOriginalLink] = useState("") ; 
    const [uploadImage, setUploadImage] = useState(false) ; 
    const [outputFileName, setOutput] = useState("") ; 
    const [clicked, setClicked] = useState(false) ; 
    const [outputSize, setOutputSize] = useState(0) ;
    const [inputSize, setInputSize] = useState(0) ;
    const [compressionVal, setVal] = useState(0) ;

    const  handle = (e) => {
    const imageFile = e.target.files[0];
      setOriginalLink(URL.createObjectURL(imageFile));
      setOriginalImage(imageFile);
      setOutput(imageFile.name);
      setUploadImage(true) ;
      setInputSize(imageFile.size/1024/1024) ;
    };
    const click = (e) => {
    e.preventDefault();

    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 500,
      useWebWorker: true
    };

    if (options.maxSizeMB >= originalImage.size / 1024) {
      alert("Image is too small, can't be Compressed!");
      return 0;
    }

    let output;
    imageCompression(originalImage, options).then(x => {
        output = x;
        getVal(x) ;
        setOutputSize(output.size/1024/1024) ;
      const downloadLink = URL.createObjectURL(output);
      setCompressedLink(downloadLink);
    });
    setClicked(true) ;
    return 1;
  };
  const getVal = (x)=>{
        const d = ((x.size/1024/1024)/inputSize)*100 ; 
        setVal(d)
  }
    return (
        <div className="m-5">
        <div className="text-light text-center">
          <h1>Three Simple Steps</h1>
          <h3>1. Upload Image</h3>
          <h3>2. Click on Compress</h3>
          <h3>3. Download Compressed Image</h3>
        </div>

        <div className="row mt-5">
          <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12">
            {uploadImage ? (
                <div>
                    <Card >
                        <Card.Img
                            className="ht"
                            variant="top"
                            src={originalLink}
                        ></Card.Img>
                    </Card>   
                    <h5 >{inputSize} mb</h5>
                </div> 
            ) : (
              <Card.Img
                className="ht"
                variant="top"
                src="http://navparivartan.in/wp-content/uploads/2018/11/placeholder.png"
              ></Card.Img>
            )}
            <div className="d-flex justify-content-center">
              <input
                type="file"
                accept="image/*"
                className="mt-2 btn btn-dark w-75"
                onChange={e => handle(e)}
              />
            </div>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-12 mb-5 mt-5 col-sm-12 d-flex justify-content-center align-items-baseline">
            <br />
            {outputFileName ? (
                <div className="container">
                    <button
                        type="button"
                        className=" btn btn-dark"
                        onClick={(e) =>{ click(e)}}
                    >
                        Compress
                    </button>
                    {compressionVal!==0 ? <h2>compressed by : {compressionVal}%</h2> : null }
                </div>
            ) : (
              <></>
            )}
          </div>

          <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 mt-3">
            <Card.Img variant="top" src={compressedLink}></Card.Img>
            {clicked ? (
                <div>
                    <h5>{outputSize} mb</h5>
                    <div className="d-flex justify-content-center">

                        <a
                        href={compressedLink}
                        download={outputFileName}
                        className="mt-2 btn btn-dark w-75"
                        >
                        Download
                        </a>
                        
                    </div>
                </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    )
}

export default ImageCompressor
