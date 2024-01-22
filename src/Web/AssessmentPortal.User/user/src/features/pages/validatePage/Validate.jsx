import React from 'react'
import Webcam from "react-webcam";
import Button from "@mui/material/Button";
import { useNavigate } from 'react-router-dom';
import { BlobServiceClient } from '@azure/storage-blob';
import { ACCOUNT_NAME,CONTAINER_NAME,SAS_TOKEN,apiUrlEndPoint } from '../../../constants/azureKeys';


const Validate = () => {
    var buttonfield = true;
    //Disable Right click
    // if (document.addEventListener) {
    //   document.addEventListener('contextmenu', function (e) {
    //     e.preventDefault();
    //   }, false);
    // }

    const uploadToAzureBlobStorage = async (imageData) => {
    const accountName = ACCOUNT_NAME;
    console.log(accountName);
    const containerName = CONTAINER_NAME;
    console.log(containerName);
    const sasToken = SAS_TOKEN; 
    console.log(sasToken);

    const blobServiceClient = new BlobServiceClient(`https://${accountName}.blob.core.windows.net${sasToken}`);
    const containerClient = blobServiceClient.getContainerClient(containerName);
    
    // Generate a unique name for the blob (you may need to handle this differently based on your requirements)
     const blobName = `image-${Date.now()}.jpg`;

    // Convert base64 to binary data without using atob
    const binaryData = Uint8Array.from([...imageData].map(char => char.charCodeAt(0)));

    // Create a Blob from the binary data
    const blob = new Blob([binaryData], { type: 'application/octet-stream' });

    // Upload the Blob to Azure Blob Storage
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    try {
      await blockBlobClient.uploadBrowserData(blob);
      // Return the URL of the uploaded image
      return blockBlobClient.url;
    } catch (error) {
      console.error('Failed to upload to Azure Blob Storage:', error);
      throw error;
    }
    // const apiUrl = apiUrlEndPoint;// Update with your container and blob names
    // const formData = new FormData();
    // formData.append('file', imageData);

    // try {
    //   const response = await fetch(apiUrl, {
    //     method: 'PUT',
    //     body: formData,
    //   });

    //   if (response.ok) {
    //     console.log('Image uploaded successfully.');
    //   } else {
    //     console.error('Failed to upload image:', response.statusText);
    //   }
    // } catch (error) {
    //   console.error('Error uploading image:', error.message);
    // }
      };
    
    //for capturing image
    const webcamRef = React.useRef(null);
    const [imgSrc, setImgSrc] = React.useState(null);
    const capture = React.useCallback(async () => {
      try {
        const imageSrc = webcamRef.current.getScreenshot();
        setImgSrc(imageSrc);
        console.log(imageSrc);
  
        // Upload the image to Azure Blob Storage
        const azureBlobUrl = await uploadToAzureBlobStorage(imageSrc);
        sessionStorage.setItem("azureBlobUrl", azureBlobUrl);
      } catch (error) {
        console.error('Failed to capture and upload image:', error);
      }
    }, [webcamRef, setImgSrc]);
    
    //image as base64
    //console.log(imgSrc);
    if (imgSrc) {
      buttonfield = false;
    }
  
    const navigate = useNavigate();
    function handleClick() {
      let id=sessionStorage.getItem('AssessmentId');
        navigate(`/systemcheck/${id}`);
      }
  return (
    <div className="camera-validate">
    <center>
    <br />
      <h1>Instructions to Follow</h1>
      <p >The room's lighting needs to be sufficiently bright to qualify as "daylight" quality. It is best to have lighting overhead.</p>
        <br />
    </center>
    <table className='camera-validation'>
      <tr>
        <td>
          <center><Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
          /></center>
        </td>
        <td>
          <center>
            {imgSrc && (
              <img
                src={imgSrc}
                alt='img'
              />
            )}</center>

        </td>
      </tr>
    </table>
    <Button id="validateButtons" variant="contained" onClick={capture} sx={{fontSize: '20px'}}>Capture Photo</Button>
    <Button id="validateButton" disabled={buttonfield} variant="contained" onClick={handleClick} sx={{fontSize: '20px'}}>Confirm Validation</Button>
    
  </div>
  )
}

export default Validate;