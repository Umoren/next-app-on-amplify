import styles from '../styles/Home.module.css'
import { Storage } from 'aws-amplify';
import { useState } from 'react'
import Image from 'next/image';

const myLoader = ({ src, width, quality }) => {
  // return `https://example.com/${src}?w=${width}&q=${quality || 75}`
  return `mynextapponamplify1140557-dev.s3.amazonaws.com/${src}?w=${width}&q=${quality || 75}`
}

export default function Home() {
  const [images, getImages] = useState([])
  async function onChange(e) {
    const file = e.target.files[0];
    try {
      await Storage.put(file.name, file, {
        contentType: "image/*", // contentType is optional
      });
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  }

  const getUploadedImage = async () => {
    await Storage.list('') // for listing ALL files without prefix, pass '' instead
      .then((response) => {
        getImages(response.results)
        console.log(response.results[0].key)
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className={styles.container}>

      <main className={styles.main}>
        <div>
          <h1> Nextjs Image Optimization Demo with Amplify Storage</h1>

          <p> This page demonstrates the usage of the next/image component with Amplify Storage as image source.</p>
        </div>

        <div>
          <h3> First upload an Image to Amplify Storage</h3>
          <input type="file" onChange={onChange} />

          <button onClick={getUploadedImage}> get image </button>
        </div>

        <div>
          The Uploaded Image:
          {images.map((image, i) => (
            <div key={i}>

              <Image
                loader={myLoader}
                src={image}
                alt="Picture of the author"
                width={500}
                height={500}
                unoptimized={true}
              />
            </div>
          ))}
        </div>
      </main>

    </div>
  )
}
