import { useState, useEffect } from "react"
import { NextPage } from "next"
// import useSwr from "swr"
// import Link from "next/link"
import { GraphQLClient } from "graphql-request"
import fetch from "isomorphic-unfetch"
// import styled from "styled-components"

import { SlackLayout } from "components/SlackLayout"
import { useAuth } from "hooks"

const ENDPOINT = "http://localhost:4000"

const S3_GET_SIGNED_PUT_OBJECT_URL_MUTATION = `
mutation S3(
  $fileName: String!,
  $fileType: String!,
  $fileSize: Int!
) {
  s3: s3GetSignedPutObjectUrl(
    fileName: $fileName,
    fileType: $fileType,
    fileSize: $fileSize
  ) {
    signedPutObjectUrl
    objectUrl
  }
}
`

const UPDATE_AVATAR_URL_MUTATION = `
mutation UpdateAvatarUrl($avatarUrl: String!) {
  updateUserAvatarUrl(avatarUrl: $avatarUrl) {
    PK
    SK
  }
}
`

// Note 's3' field alias
type Response = {
  s3: {
    signedPutObjectUrl: string
    objectUrl: string
  }
}

export default (() => {
  const { token } = useAuth()
  const client = new GraphQLClient(ENDPOINT, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  /**
   * imgSrc is sent directly to S3
   */
  const [imgSrc, setImgSrc] = useState<string>()
  const [reader] = useState(
    (() =>
      typeof FileReader !== "undefined" && new FileReader()) as () => FileReader
  )
  if (reader) {
    reader.onload = (e: ProgressEvent) => {
      console.log(e)
      setImgSrc(reader.result as string)
    }
  }

  /**
   * file is for
   * - header data to S3
   * - to get a signedUrl from the server
   */
  const [file, setFile] = useState<File>()
  useEffect(() => {
    if (file) reader.readAsDataURL(file)
  }, [file])

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFile(file)
    } else {
    }
  }

  const headers = {
    "Content-Type": file?.type,
    /** https://github.com/aws/aws-sdk-js/issues/2482 */
    "Content-Encoding": "base64",
  }

  const [signedUrl, setSignedUrl] = useState("")
  const [objectUrl, setObjectUrl] = useState("")
  const getSignedUrl = () =>
    client
      .request<Response>(S3_GET_SIGNED_PUT_OBJECT_URL_MUTATION, {
        fileName: formatFilename({
          filename: file?.name,
          username: "kevin",
        }),
        fileType: file?.type,
        fileSize: file?.size,
      })
      .then((data) => {
        console.log(data)
        setSignedUrl(data.s3.signedPutObjectUrl)
        setObjectUrl(data.s3.objectUrl)
      })
      .catch((err) => {
        console.log(err)
      })

  const upload = () => {
    fetch(signedUrl, {
      method: "PUT",
      headers: headers as any,
      body: Buffer.from(
        (imgSrc as string).replace(/^data:image\/\w+;base64,/, ""),
        "base64"
      ),
    }).then(() => {
      client.request(UPDATE_AVATAR_URL_MUTATION, {
        avatarUrl: objectUrl,
      })
    })
  }

  return (
    <SlackLayout title={"Profile"}>
      <div>signedUrl: {signedUrl}</div>
      <div>objectUrl: {objectUrl}</div>
      <div>imgSrc: {imgSrc}</div>
      <div>File size(B):{file?.size}</div>

      <div>
        <input
          type={"file"}
          accept={"image/png, image/jpeg"}
          // style={{ display: "none" }}
          onChange={handleFileInputChange}
        />
      </div>
      <div>
        <button onClick={getSignedUrl}>Get Url</button>
      </div>
      <div>
        <button onClick={upload}>Upload to S3</button>
      </div>
    </SlackLayout>
  )
}) as NextPage

/**
 * HELPER
 */
const formatFilename = ({
  filename,
  username,
}: {
  filename?: string
  username?: string
}) => {
  const date = getFormatedDate()
  const randomString = Math.random().toString(36).substring(2, 7)
  const cleanFileName = filename?.toLowerCase().replace(/[^a-z0-9]/g, "-")
  const newFilename = `images/${date}-${randomString}-user${username}-${cleanFileName}`
  return newFilename.substring(0, 60)
}

/**
 * YYYYMMDD
 */
function getFormatedDate() {
  const d = new Date()
  let month = (d.getMonth() + 1).toString()
  let day = d.getDate().toString()
  const year = d.getFullYear().toString()

  if (month.length < 2) month = "0" + month
  if (day.length < 2) day = "0" + day

  return [year, month, day].join("")
}
