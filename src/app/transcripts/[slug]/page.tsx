import { getPayload } from 'payload'
import config from '@payload-config'
import { notFound } from 'next/navigation'
import React from 'react'
import { Metadata } from 'next'

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'transcripts',
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
  })

  if (docs.length === 0) {
    return {
      title: 'Transcript Not Found',
    }
  }

  return {
    title: docs[0].title,
  }
}

export default async function TranscriptPage({ params }: PageProps) {
  const { slug } = await params
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'transcripts',
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
  })

  if (docs.length === 0) {
    notFound()
  }

  const transcript = docs[0]

  return (
    <article style={{ maxWidth: '800px', margin: '2rem auto', padding: '0 1rem', fontFamily: 'sans-serif' }}>
      <h1>{transcript.title}</h1>
      <div style={{ whiteSpace: 'pre-wrap' }}>
        {transcript.content}
      </div>
    </article>
  )
}
