'use client'

import React, { useEffect } from 'react'
import type { MachFormBlock as MachFormBlockProps } from '@/payload-types'

const forms = {
  employment: {
    id: '10629',
    height: '5508',
    title: 'Application For Employment',
  },
  reservations: {
    id: '11065',
    height: '2205',
    title: 'Group Reservations',
  },
}

export const MachFormBlock: React.FC<MachFormBlockProps> = ({ formType }) => {
  const form = forms[formType || 'employment']

  useEffect(() => {
    // Only run on the client
    if (typeof document === 'undefined') return

    const scriptId = 'machform-script'
    let script = document.getElementById(scriptId) as HTMLScriptElement

    if (!script) {
      script = document.createElement('script')
      script.id = scriptId
      script.async = true
      script.src = '//www.presidentialwaxmuseum.com/machform/js/mf.js'

      const placeholder = document.getElementById('mf_placeholder')
      if (placeholder && placeholder.parentNode) {
        placeholder.parentNode.insertBefore(script, placeholder)
      } else {
        document.body.appendChild(script)
      }
    }
  }, [formType])

  return (
    <div className="container py-12">
      <div
        id="mf_placeholder"
        data-formurl={`//www.presidentialwaxmuseum.com/machform/embed.php?id=${form.id}`}
        data-formheight={form.height}
        data-formtitle={form.title}
        data-paddingbottom="10"
      ></div>
    </div>
  )
}
