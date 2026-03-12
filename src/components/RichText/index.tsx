import { MediaBlock } from '@/blocks/MediaBlock/Component'
import {
  DefaultNodeTypes,
  SerializedBlockNode,
  SerializedLinkNode,
  type DefaultTypedEditorState,
} from '@payloadcms/richtext-lexical'
import {
  JSXConvertersFunction,
  LinkJSXConverter,
  RichText as ConvertRichText,
} from '@payloadcms/richtext-lexical/react'

import { CodeBlock, CodeBlockProps } from '@/blocks/Code/Component'

import type {
  BannerBlock as BannerBlockProps,
  CallToActionBlock as CTABlockProps,
  IframeBlock as IframeBlockProps,
  HoursAddressLinksBlock as HoursAddressLinksBlockProps,
  MediaBlock as MediaBlockProps,
  UnderlineBlock as UnderlineBlockProps,
  MachFormBlock as MachFormBlockProps,
} from '@/payload-types'
import { BannerBlock } from '@/blocks/Banner/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { IframeBlock } from '@/blocks/IframeBlock/Component'
import { HoursAddressLinksBlock } from '@/blocks/HoursAddressLinks/Component'
import { Underline } from '@/components/Underline'
import { MachFormBlock } from '@/blocks/MachForm/Component'
import { cn } from '@/utilities/ui'

type NodeTypes =
  | DefaultNodeTypes
  | SerializedBlockNode<
      | CTABlockProps
      | IframeBlockProps
      | HoursAddressLinksBlockProps
      | MediaBlockProps
      | BannerBlockProps
      | CodeBlockProps
      | UnderlineBlockProps
      | MachFormBlockProps
    >

const internalDocToHref = ({ linkNode }: { linkNode: SerializedLinkNode }) => {
  const { value, relationTo } = linkNode.fields.doc!
  if (typeof value !== 'object') {
    throw new Error('Expected value to be an object')
  }
  const slug = value.slug
  return relationTo === 'posts' ? `/posts/${slug}` : `/${slug}`
}

const jsxConverters: JSXConvertersFunction<NodeTypes> = ({ defaultConverters }) => ({
  ...defaultConverters,
  ...LinkJSXConverter({ internalDocToHref }),
  blocks: {
    banner: ({ node }) => <BannerBlock className="col-start-2 mb-4" {...node.fields} />,
    mediaBlock: ({ node }) => (
      <MediaBlock
        className="col-start-1 col-span-3"
        imgClassName="m-0"
        {...node.fields}
        captionClassName="mx-auto max-w-[48rem]"
        enableGutter={false}
        disableInnerContainer={true}
      />
    ),
    code: ({ node }) => <CodeBlock className="col-start-2" {...node.fields} />,
    cta: ({ node }) => <CallToActionBlock {...node.fields} />,
    /*@ts-expect-error Iframe problems*/
    iframe: ({ node }) => <IframeBlock {...node.fields} />,
    machForm: ({ node }) => <MachFormBlock {...node.fields} />,
    hoursAddressLinks: ({ node }) => <HoursAddressLinksBlock {...node.fields} />,
    underline: ({ node }) => (
      <Underline
        className="my-4"
        reverse={node.fields.direction === 'left'}
        light={node.fields.light||false}
        color={node.fields.color||"default"}
        fullWidth={node.fields.fullWidth||false}
      />
    ),
  },
})

type Props = {
  data: DefaultTypedEditorState
  enableGutter?: boolean
  enableProse?: boolean
} & React.HTMLAttributes<HTMLDivElement>

export default function RichText(props: Props) {
  const { className, enableProse = true, enableGutter = true, ...rest } = props
  return (
    <ConvertRichText
      converters={jsxConverters}
      className={cn(
        'payload-richtext',
        {
          container: enableGutter,
          'max-w-none': !enableGutter,
          'mx-auto prose md:prose-md': enableProse,
        },
        className,
      )}
      {...rest}
    />
  )
}
